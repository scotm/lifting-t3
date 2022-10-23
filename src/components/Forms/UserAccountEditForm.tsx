import { User } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { MyTextField } from "../FormComponents";

function validate(values: User) {
  const errors: Partial<User> = {};
  if (!values.name) {
    errors["name"] = "You need to supply a name";
  }
}

const UserAccountEditForm: React.FC = () => {
  const [updated, setUpdated] = useState(false);
  const utils = trpc.useContext();
  const { data: initialValues } = trpc.user.getCurrentUser.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const mutate = trpc.user.setCurrentUserInfo.useMutation({
    onSuccess() {
      utils.user.getCurrentUser.invalidate();
    },
  });

  function onSubmit(values: User) {
    const { name, id } = values;
    mutate.mutate({ name: name ? name : "", id: id });
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  }
  if (!initialValues) return <></>;
  return (
    <>
      {updated && (
        <div className="grid place-items-center">
          <div className="w-1/2 rounded-md bg-indigo-100 p-2 text-center">
            User information updated
          </div>
        </div>
      )}
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
              <MyTextField name="name" label="Your Name" />
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
    </>
  );
};

export default UserAccountEditForm;
