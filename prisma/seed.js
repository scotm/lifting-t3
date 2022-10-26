import { PrismaClient } from "@prisma/client";
import { NodeHtmlMarkdown } from "node-html-markdown";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

let pairings = {
  "licenses.json": prisma.licence,
  "categories.json": prisma.category,
  "days_of_week.json": prisma.dayOfWeek,
  "equipment.json": prisma.equipment,
  "languages.json": prisma.language,
  "muscles.json": prisma.muscles,
  "setting_repetition_units.json": prisma.repetitionUnits,
  "setting_weight_units.json": prisma.weightUnits,
};

function getJSONFromFile(filename) {
  let rawdata = fs.readFileSync(__dirname + "/fixtures/" + filename);
  return JSON.parse(rawdata.toString());
}

async function writeToDB(data, prisma_client) {
  data.forEach(async (element) => {
    await prisma_client.upsert({
      where: {
        id: element.id,
      },
      update: {},
      create: element,
    });
  });
}

async function main() {
  // fire in the simple stuff
  for (const [filename, prisma_client] of Object.entries(pairings)) {
    let json_data = getJSONFromFile(filename);
    console.log("Writing " + filename + " to DB");
    await writeToDB(json_data, prisma_client);
  }

  const exerciseBaseData = new Map();
  {
    let filename = "exercise-base-data.json";
    let json_data = getJSONFromFile(filename);
    console.log("Writing " + filename + " to DB");
    json_data.forEach((e) => {
      exerciseBaseData.set(e.id, {
        id: e.id,
        license_author: e.license_author,
        status: e.status,
        uuid: e.uuid,
        licenceId: e.license,
        categoryId: e.category,
        muscles: [
          ...e.muscles.map((x) => {
            return { id: x };
          }),
          ...e.muscles_secondary.map((x) => {
            return { id: x };
          }),
        ],
        equipment: e.equipment.map((x) => {
          return { id: x };
        }),
      });
    });
  }

  {
    const filename = "exercises.json";
    let json_data = getJSONFromFile(filename);
    console.log("Writing " + filename + " to DB");
    const nhm = new NodeHtmlMarkdown();
    const data = json_data.map((element) => {
      return {
        id: element.id,
        license_author: element.license_author,
        name: element.name,
        name_original: element.name_original,
        status: element.status,
        description: nhm.translate(element.description),
        creation_date: new Date(element.creation_date),
        uuid: element.uuid,
        licenceId: element.license,
        languageId: element.language,
        categoryId: exerciseBaseData.get(element.exercise_base).categoryId,
      };
    });
    writeToDB(data, prisma.exercise);
    // await prisma.exercise.createMany({ data: data }).catch((onrejected) => {
    //   console.log("Exception thrown on making many Exercise objects");
    //   console.log(onrejected);
    //   throw new Error("buggered");
    // });
    json_data.map(async (e) => {
      const updateobj = {
        where: {
          id: e.id,
        },
        data: {
          muscles: {
            connect: exerciseBaseData.get(e.exercise_base).muscles,
          },
          equipment: {
            connect: exerciseBaseData.get(e.exercise_base).equipment,
          },
        },
      };
      await prisma.exercise.update(updateobj);
    });
  }

  // Get all the table names and reset their autocounters
  // https://github.com/prisma/prisma/discussions/5256
  const tablenames = await prisma.$queryRaw`SELECT table_name FROM 
    information_schema.tables 
    WHERE table_schema='public' 
    AND table_type='BASE TABLE';`;

  const filteroutnames = new Set([
    "User",
    "Account",
    "Session",
    "VerificationToken",
  ]);

  /** @type {string[]} */
  const tables = tablenames
    .map((e) => e.table_name)
    .filter((e) => e[0] !== "_" && !filteroutnames.has(e));

  // I'm only using table names extracted from the DB itself -
  // so injection risk is low, but worth fixing once the Prisma single-quotes
  // bug is fixed upstream.
  tables.forEach(async (e) => {
    // I need to use the single quotes in order to run the pg_get_serial_sequence function,
    // And single quote usage is broken as of right now.
    // https://github.com/prisma/prisma/discussions/9991
    const query = `SELECT setval(pg_get_serial_sequence('"${e}"', 'id'), 
      coalesce(max(id)+1, 1), false) FROM "${e}";`;
    await prisma.$queryRawUnsafe(query);
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
