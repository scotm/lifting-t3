import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import { AppRouterTypes, trpc } from "../../utils/trpc";
import {
  AddSetButton,
  FormError,
  MySelectField,
  MyTextField,
  RemoveExerciseButton,
} from "../FormComponents";

type WorkoutInput = NonNullable<AppRouterTypes["workout"]["create"]["input"]>;
type ExerciseSets = WorkoutInput["pieces"][number];
type RepPairSubset = ExerciseSets["set"][number];

const default_set: RepPairSubset = {
  weightUnitsId: 1,
  weight: 10,
  reps: 10,
  repetitionUnitsId: 1,
};

const validate = (values: WorkoutInput): FormError<WorkoutInput> => {
  const errors: FormError<WorkoutInput> = {};
  if (!values.name) {
    errors.name = "Please give this workout a name";
  }
  if (values.pieces) {
    if (values.pieces.length === 0) {
      errors.pieces =
        "There should be at least one exercise in a workout template";
    }
    if (values.pieces.some((piece) => piece.set.length === 0)) {
      errors.pieces =
        "There are exercises in this template, without a specific workload. Add a working set to it.";
    }
  }
  return errors;
};

export const WorkoutForm: FC = () => {
  const router = useRouter();
  const { data: exercises } = trpc.exercises.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { data: repetitionunits } = trpc.repetitionUnits.getAll.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );
  const { data: weightunits } = trpc.weightUnits.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const mutation = trpc.workout.create.useMutation();

  // Typeguards for the various arrays
  if (
    !exercises ||
    exercises.length <= 0 ||
    exercises[0] === undefined ||
    !repetitionunits ||
    !weightunits
  ) {
    return null;
  }

  const initialValues: WorkoutInput = {
    name: "",
    difficulty: "CHALLENGING",
    pieces: [{ exerciseId: exercises[0].id, set: [default_set], notes: "" }],
    workoutNotes: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, formikhelpers) => {
        values.pieces.forEach((piece) => {
          piece.exerciseId = Number(piece.exerciseId);
          piece.set.forEach((set) => {
            set.repetitionUnitsId = Number(set.repetitionUnitsId);
          });
        });
        mutation.mutate(values, {
          onSuccess: (response) => router.push(`/workout/${response.id}`),
        });
        formikhelpers.setSubmitting(false);
      }}
      validate={validate}
    >
      {({ isValid, values, isSubmitting }) => {
        return (
          <Form className="grid grid-cols-4 gap-2 py-4 px-4 lg:mx-8">
            <MyTextField name="name" label="Name" />
            <div className="col-span-4 mt-4 text-xl font-bold">Exercises:</div>
            <FieldArray
              name="pieces"
              render={(arrayHelpers) => (
                <>
                  {values.pieces.map((value, index) => (
                    <div
                      key={index}
                      className={`col-span-4 mt-2 grid grid-cols-4 gap-4 rounded-md bg-red-100 p-4`}
                    >
                      <MySelectField
                        name={`pieces.${index}.exerciseId`}
                        label={""}
                        options={exercises}
                        className={`col-span-${
                          values.pieces.length > 1 ? "3" : "4"
                        } rounded-md border-2 border-red-700 bg-red-500 text-white shadow-md`}
                      />
                      {values.pieces.length > 1 && (
                        <RemoveExerciseButton ah={arrayHelpers} index={index} />
                      )}
                      <FieldArray
                        name={`pieces.${index}.set`}
                        render={(ah) => (
                          <>
                            {value.set.length > 0 ? (
                              <>
                                <div className="col-span-1 pl-8 text-lg font-bold">
                                  Sets
                                </div>
                                <div className="col-span-1 col-start-4">
                                  <AddSetButton
                                    ah={ah}
                                    objtoadd={default_set}
                                  />
                                </div>
                              </>
                            ) : (
                              <div className="col-span-4">
                                <AddSetButton ah={ah} objtoadd={default_set} />
                              </div>
                            )}

                            {value.set.map((_, i) => (
                              <div
                                key={`pieces.${index}.set.${i}`}
                                className={`col-span-4 grid grid-cols-4 gap-2`}
                              >
                                <div className="text-center">---</div>
                                <MySelectField
                                  name={`pieces.${index}.set.${i}.reptypeId`}
                                  label={""}
                                  className="col-start-2 mx-1 rounded-xl shadow-xl"
                                  options={repetitionunits}
                                />
                                <MyTextField
                                  name={`pieces.${index}.set.${i}.reps`}
                                  label={""}
                                  className="mx-1 w-full rounded-xl shadow-xl"
                                />
                                <button
                                  className="mx-1 rounded-xl bg-green-600 py-2 px-6 text-white shadow-xl transition duration-300 hover:bg-green-500"
                                  type="button"
                                  onClick={() => {
                                    ah.remove(i);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </>
                        )}
                      />
                    </div>
                  ))}
                  <div className="col-span-4">
                    <button
                      className="rounded-xl bg-red-500 py-2 px-6 text-white shadow-xl transition duration-300 hover:bg-red-400"
                      type="button"
                      onClick={() => {
                        const sets: ExerciseSets = {
                          exerciseId: exercises[0]?.id ?? 0,
                          notes: "",
                          set: [default_set],
                        };
                        arrayHelpers.push(sets);
                      }}
                    >
                      Add {values.pieces.length > 0 ? "Another" : ""} Exercise
                    </button>
                  </div>
                </>
              )}
            />
            <div></div>
            <button
              className="col-span-3 col-start-2 mt-8 rounded-xl bg-red-500 p-2 text-lg font-bold text-white shadow-xl transition duration-300 hover:bg-red-400"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Create Workout Template
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
