import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction } from "react";
import { AppRouterTypes, trpc } from "../../utils/trpc";
import {
  MyCheckboxesFields,
  MySelectField,
  MyTextAreaField,
  MyTextField,
} from "../FormComponents";

type ExerciseInput = AppRouterTypes["exercises"]["editExercise"]["input"];
// We don't need to fill out *all* these fields.
// The API will (eventually) auto-generate the ones missing.
type FormExercise = Omit<ExerciseInput, "muscles" | "equipment"> & {
  muscles: string[];
  equipment: string[];
};
type FormErrors = Partial<{ [n in keyof FormExercise]: string }>;

function validate(values: FormExercise): FormErrors {
  const errors: FormErrors = {};

  // TODO: Add lots more!
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 255) {
    errors.name = "Please use fewer than 255 characters";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (values.categoryId === 1) {
    errors.categoryId = "We need a specific category for this exercise";
  }
  if (values.equipment.length === 0) {
    errors.equipment = "Fill out the necessary equipment";
  }
  if (values.muscles.length === 0) {
    errors.muscles = "Fill out muscles used";
  }
  return errors;
}

type ExerciseFormProps = {
  validate(values: FormExercise): FormErrors;
  initialValues: FormExercise;
  onSubmit(values: FormExercise): void;
};

const ExerciseForm: FC<ExerciseFormProps> = (props) => {
  const { validate, initialValues, onSubmit } = props;
  const { data: languages } = trpc.languages.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { data: licences } = trpc.licences.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { data: categories } = trpc.categories.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { data: muscles } = trpc.muscles.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { data: equipment } = trpc.equipment.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  // const router = useRouter();

  // We don't render anything until these have all returned.
  if (
    languages === undefined ||
    licences === undefined ||
    categories === undefined ||
    muscles === undefined ||
    equipment === undefined
  ) {
    return null;
  }

  return (
    <Formik
      validate={validate}
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="grid grid-cols-4 gap-4 py-4 lg:mx-8">
            <Field type="hidden" name="id" />
            <MyTextField name="name" label="Exercise Name" />
            <MySelectField
              name="categoryId"
              label="Category"
              options={categories}
            />
            <MyTextAreaField name="description" label="Description" />
            <MyTextField name="license_author" label="Author" />
            <MySelectField
              name="licenceId"
              label="Licence"
              options={licences}
            />
            <MyCheckboxesFields
              name="equipment"
              label="Equipment"
              choices={equipment}
            />
            <MyCheckboxesFields
              name="muscles"
              label="Muscles Used"
              choices={muscles}
            />
            <button
              className="col-span-3 col-start-2 rounded-xl bg-indigo-500 p-2 text-white shadow-xl transition duration-300 hover:bg-indigo-400"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export function ExerciseCreateForm() {
  // const router = useRouter();
  const initialValues: FormExercise = {
    id: 0,
    name: "",
    categoryId: 1,
    description: "",
    licenceId: 1,
    languageId: 2,
    license_author: "",
    muscles: [],
    equipment: [],
    variations: "",
  };
  return (
    <ExerciseForm
      validate={validate}
      initialValues={initialValues}
      onSubmit={async (values) => {
        const result = await axios.post(`/api/exercises/`, values);
        console.log(result);
      }}
    />
  );
}

type ExerciseEditFormProps = {
  id: number;
  setTitle?: Dispatch<SetStateAction<string>>;
};

export const ExerciseEditForm: React.FC<ExerciseEditFormProps> = (props) => {
  // Pull in the data from API calls
  const { data: exercise } = trpc.exercises.findByID.useQuery(props.id, {
    refetchOnWindowFocus: false,
  });
  const utils = trpc.useContext();
  const mutation = trpc.exercises.editExercise.useMutation({
    onSuccess: () => {
      utils.exercises.findByID.invalidate(props.id);
      utils.exercises.getAll.invalidate();
      utils.exercises.getFiltered.invalidate();
    },
  });
  const router = useRouter();

  if (!exercise) return null;

  const initialValues: FormExercise = {
    id: exercise.id,
    name: exercise.name,
    categoryId: exercise.categoryId,
    description: exercise.description,
    licenceId: exercise.licenceId,
    languageId: exercise.languageId,
    license_author: exercise.license_author,
    muscles: exercise.muscles
      ? exercise.muscles.map((e) => e.id.toString())
      : [],
    equipment: exercise.equipment
      ? exercise.equipment.map((e) => e.id.toString())
      : [],
    variations: "",
  };

  return (
    <ExerciseForm
      validate={validate}
      initialValues={initialValues}
      onSubmit={async (values: FormExercise) => {
        // A call to the API.
        const otherValues: ExerciseInput = {
          id: values.id,
          name: values.name,
          categoryId: values.categoryId,
          description: values.description,
          licenceId: values.licenceId,
          languageId: values.languageId,
          license_author: values.license_author,
          muscles: values.muscles.map((e) => Number.parseInt(e)),
          equipment: values.equipment.map((e) => Number.parseInt(e)),
          variations: "",
        };
        console.log(otherValues);
        mutation.mutate(otherValues);
        router.push(`/exercises/${values.id}`);
      }}
    />
  );
};
