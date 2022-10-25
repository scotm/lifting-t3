import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

const set_pairschema = z.object({
  weightUnitsId: z.number().int(),
  weight: z.number(),
  repetitionUnitsId: z.number().int(),
  reps: z.number().int(),
});

const templateExerciseSchema = z.object({
  exerciseId: z.number().int(),
  notes: z.string(),
  set: z.array(set_pairschema).nonempty(),
});

const workoutSchema = z.object({
  name: z.string(),
  workoutNotes: z.string(),
  difficulty: z.enum([
    "TOOEASY",
    "EASY",
    "CHALLENGING",
    "HARD",
    "CANTCOMPLETE",
  ]),
  pieces: z.array(templateExerciseSchema).nonempty(),
});

export const workoutRouter = router({
  create: protectedProcedure.input(workoutSchema).mutation(({ ctx, input }) => {
    const { pieces, ...rest } = input;
    return ctx.prisma.workout.create({
      data: {
        ...rest,
        date: new Date(),
        user: { connect: { id: ctx.session.user.id } },
        pieces: {
          create: pieces.map((piece) => ({
            exercise: { connect: { id: piece.exerciseId } },
            notes: piece.notes,
            sets: {
              create: piece.set.map((set) => ({
                weight: set.weight,
                weightUnits: { connect: { id: set.weightUnitsId } },
                reps: set.reps,
                repetitionUnits: { connect: { id: set.repetitionUnitsId } },
              })),
            },
          })),
        },
      },
    });
  }),
});
