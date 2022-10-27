import { useRouter } from "next/router";
import React, { FC } from "react";
import {
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { SubmitButton } from "../../../components/FormComponents";
import Layout from "../../../components/PageLayout/Layout";
import parseID from "../../../utils/parseID";
import { AppRouterTypes, trpc } from "../../../utils/trpc";
// import { ExerciseEditForm } from "../../../components/Forms/ExerciseEditForm";

type ExerciseFormInput = AppRouterTypes["exercises"]["editExercise"]["input"];

type ExerciseEditProps = {
  id: number;
};

const ExerciseEditForm: React.FC<ExerciseEditProps> = ({ id }) => {
  const { data: initialValues } = trpc.exercises.findByID.useQuery(id);
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
  const utils = trpc.useContext();
  const router = useRouter();
  const mutate = trpc.exercises.editExercise.useMutation({
    onSuccess: () => {
      utils.user.getCurrentUser.invalidate();
      router.push("/");
    },
    // onError() {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExerciseFormInput>();
  // status?: string | undefined;
  //   license_author?: string | undefined;
  //   name_original?: string | undefined;
  //   variations?: string | undefined;
  //   name: string;
  //   id: number;
  //   equipment: number[];
  //   licenceId: number;
  //   description: string;
  //   languageId: number;
  //   categoryId: number;
  //   muscles: number[];
  const onSubmit: SubmitHandler<ExerciseFormInput> = (data) => {
    console.log(data);
  };

  // Make sure requirements are all instantiated.
  if (!initialValues || !categories || !equipment) return null;
  if (!languages || !licences || !muscles) return null;
  return (
    <form
      className="grid grid-cols-4 gap-4 py-4 lg:mx-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <HiddenInput register={register} fieldname={'id'} defaultValues={initialValues} /> */}
      <input
        {...register("id")}
        type="hidden"
        defaultValue={initialValues.id}
      />
      <Label id="name" name="name" label_name="Name" />
      <input
        className="col-span-3 rounded-xl p-2 shadow-xl"
        {...register("name")}
        defaultValue={initialValues.name}
      />
      <label htmlFor="category" className="col-span-1">
        Category
      </label>
      <select
        className="col-span-3 rounded-xl p-2 shadow-xl"
        {...register("categoryId")}
        defaultValue={initialValues.categoryId}
      >
        {categories.map((category) => (
          <option
            key={"category_" + category.id.toString()}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
      <TextArea
        id="description"
        name="description"
        label_name="Description"
        register={register}
        required={true}
        defaultValue={initialValues.description}
      />
      <Label id="licence_author" name="licence_author" label_name="Author" />
      <input
        className="col-span-3 rounded-xl p-2 shadow-xl"
        {...register("license_author")}
        defaultValue={initialValues.license_author}
      />
      <label htmlFor="licenceId" className="col-span-1">
        Licence
      </label>
      <select
        className="col-span-3 rounded-xl p-2 shadow-xl"
        {...register("licenceId")}
        defaultValue={initialValues.licenceId}
      >
        {licences.map((licence) => (
          <option key={"licence_" + licence.id.toString()} value={licence.id}>
            {licence.full_name}
          </option>
        ))}
      </select>

      <SubmitButton />
    </form>
  );
};

const EditExercise: React.FC = () => {
  const router = useRouter();
  // const [title, setTitle] = useState("Editing Exercise");
  const title = "Editing Exercise";
  return (
    <Layout title={title}>
      <ExerciseEditForm id={parseID(router.query.id)} />
    </Layout>
  );
};

type InputProps<T extends FieldValues> = {
  id: string;
  label_name?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  defaultValue: string;
};

// The following component is an example of your existing Input Component
function Input<T extends FieldValues>({
  id,
  label_name,
  name,
  register,
  required,
  defaultValue,
}: InputProps<T>) {
  return (
    <>
      <label htmlFor={id} className="col-span-1">
        {label_name ?? name}
      </label>
      <input
        id={id}
        className="col-span-3 rounded-xl p-2 shadow-xl"
        {...register(name, { required })}
        defaultValue={defaultValue}
      />
    </>
  );
}

// The following component is an example of your existing Input Component
function TextArea<T extends FieldValues>({
  id,
  label_name,
  name,
  register,
  required,
  defaultValue,
}: InputProps<T>) {
  return (
    <>
      <Label id={id} label_name={label_name} name={name} />
      <textarea
        id={id}
        className="col-span-3 h-96 rounded-xl p-2 shadow-xl"
        {...register(name, { required })}
        defaultValue={defaultValue}
      />
    </>
  );
}

type LabelProps = {
  id: string;
  name: string;
  label_name?: string;
};

const Label: FC<LabelProps> = ({ id, name, label_name }) => {
  return (
    <label htmlFor={id} className="col-span-1">
      {label_name ?? name}
    </label>
  );
};

export default EditExercise;
