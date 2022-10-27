import { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken } from "next-auth/react";

export default function SignIn(props: { csrfToken: string }) {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
      <label>
        Email address
        <input type="email" id="email" name="email" />
      </label>
      <button type="submit">Sign in with Email</button>
    </form>
  );
}

export async function getServerSideProps(context: CtxOrReq) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
