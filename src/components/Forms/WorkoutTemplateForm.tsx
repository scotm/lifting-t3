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

type WorkoutTemplateInput = NonNullable<
  AppRouterTypes["workoutTemplates"]["create"]["input"]
>;
type RepPairSubset = WorkoutTemplateInput["pieces"][number]["rep_pair"][number];

const default_rep_pair: RepPairSubset = {
  reps: 10,
  reptypeId: 1,
};

const validate = (
  values: WorkoutTemplateInput
): FormError<WorkoutTemplateInput> => {
  const errors: FormError<WorkoutTemplateInput> = {};
  if (!values.name) {
    errors.name = "Please give this workout a name";
  }
  if (values.pieces) {
    if (values.pieces.length === 0) {
      errors.pieces =
        "There should be at least one exercise in a workout template";
    }
    if (values.pieces.some((piece) => piece.rep_pair.length === 0)) {
      errors.pieces =
        "There are exercises in this template, without a specific workload. Add a working set to it.";
    }
  }
  return errors;
};

export const WorkoutTemplateForm: FC = () => {
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
  const mutation = trpc.workoutTemplates.create.useMutation();

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

  const initialValues: WorkoutTemplateInput = {
    name: "",
    pieces: [{ exerciseId: exercises[0].id, rep_pair: [default_rep_pair] }],
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, formikhelpers) => {
        values.pieces.forEach((piece) => {
          piece.exerciseId = Number(piece.exerciseId);
          piece.rep_pair.forEach((rep_pair) => {
            rep_pair.reptypeId = Number(rep_pair.reptypeId);
          });
        });
        mutation.mutate(values, {
          onSuccess: (response) =>
            router.push(`/workoutTemplate/${response.id}`),
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
                      className={`col-span-4 mt-2 grid grid-cols-4 gap-4 rounded-md bg-indigo-100 p-4`}
                    >
                      <MySelectField
                        name={`pieces.${index}.exerciseId`}
                        label={""}
                        options={exercises}
                        className={`col-span-${
                          values.pieces.length > 1 ? "3" : "4"
                        } rounded-md border-2 border-indigo-700 bg-indigo-500 p-2 text-white shadow-md`}
                      />
                      {values.pieces.length > 1 && (
                        <RemoveExerciseButton ah={arrayHelpers} index={index} />
                      )}
                      <FieldArray
                        name={`pieces.${index}.rep_pair`}
                        render={(ah) => (
                          <>
                            {value.rep_pair.length > 0 ? (
                              <>
                                <div className="col-span-1 pl-8 text-lg font-bold">
                                  Sets
                                </div>
                                <div className="col-span-1 col-start-4">
                                  <AddSetButton
                                    ah={ah}
                                    objtoadd={default_rep_pair}
                                  />
                                </div>
                              </>
                            ) : (
                              <div className="col-span-4">
                                <AddSetButton
                                  ah={ah}
                                  objtoadd={default_rep_pair}
                                />
                              </div>
                            )}

                            {value.rep_pair.map((_, i) => (
                              <div
                                key={`pieces.${index}.rep_pair.${i}`}
                                className={`col-span-4 grid grid-cols-4 gap-2`}
                              >
                                <div className="text-center">---</div>
                                <MySelectField
                                  name={`pieces.${index}.rep_pair.${i}.reptypeId`}
                                  label={""}
                                  className="col-start-2 mx-1 rounded-xl shadow-xl"
                                  options={repetitionunits}
                                />
                                <MyTextField
                                  name={`pieces.${index}.rep_pair.${i}.reps`}
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
                      className="rounded-xl bg-indigo-500 py-2 px-6 text-white shadow-xl transition duration-300 hover:bg-indigo-400"
                      type="button"
                      onClick={() => {
                        const workoutpiece = {
                          exerciseId: exercises[0]?.id,
                          rep_pair: new Array(1).fill(default_rep_pair),
                        };
                        arrayHelpers.push(workoutpiece);
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
              className="col-span-3 col-start-2 mt-8 rounded-xl bg-indigo-500 p-2 text-lg font-bold text-white shadow-xl transition duration-300 hover:bg-indigo-400"
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
