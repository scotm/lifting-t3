import { useState } from "react";
import { AppRouterTypes, trpc } from "../../utils/trpc";
import { SubmitHandler, useForm } from "react-hook-form";
import { MessagePlaceHolder, SubmitButton } from "../FormComponents";

type User = AppRouterTypes["user"]["setCurrentUserInfo"]["input"];

const UserAccountEditForm: React.FC = () => {
  const [isShowingMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const utils = trpc.useContext();
  const { data: initialValues } = trpc.user.getCurrentUser.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const showMessage = (message: string, delay_ms?: number) => {
    if (!delay_ms) delay_ms = 3000;
    setMessage(message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, delay_ms);
  };
  const mutate = trpc.user.setCurrentUserInfo.useMutation({
    onSuccess() {
      utils.user.getCurrentUser.invalidate();
      showMessage("User info updated");
    },
    onError() {
      showMessage("Error updating user info", 10000);
    },
  });

  const onSubmit: SubmitHandler<User> = (props) => {
    console.log(props);
    const { name, id } = props;
    mutate.mutate({ name, id });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  if (!initialValues) return <></>;
  initialValues.name = initialValues.name ?? "";
  return (
    <>
      <MessagePlaceHolder show={isShowingMessage} message={message} />
      <form
        className="grid grid-cols-4 gap-4 py-4 lg:mx-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("id")}
          type="hidden"
          defaultValue={initialValues.id}
        />
        <label htmlFor="name" className="col-span-1">
          Name
        </label>
        <input
          className="col-span-3 rounded-xl p-2 shadow-xl"
          {...register("name")}
          defaultValue={initialValues.name}
        />
        {errors.name && <span>This field is required</span>}
        <SubmitButton />
      </form>
    </>
  );
};

export default UserAccountEditForm;
