// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";

import { categoryRouter } from "./liftingRouters/categories";
import { equipmentRouter } from "./liftingRouters/equipment";
import { exerciseRouter } from "./liftingRouters/exercises";
import { languageRouter } from "./liftingRouters/languages";
import { licenceRouter } from "./liftingRouters/licences";
import { musclesRouter } from "./liftingRouters/muscles";
import { repetitionUnitsRouter } from "./liftingRouters/repetitionunits";
import { userRouter } from "./liftingRouters/user";
import { workoutTemplateRouter } from "./liftingRouters/workouttemplates";
import { weightUnitsRouter } from "./liftingRouters/weightunits";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  categories: categoryRouter,
  equipment: equipmentRouter,
  exercises: exerciseRouter,
  languages: languageRouter,
  licences: licenceRouter,
  muscles: musclesRouter,
  repetitionUnits: repetitionUnitsRouter,
  user: userRouter,
  weightUnits: weightUnitsRouter,
  workoutTemplates: workoutTemplateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
