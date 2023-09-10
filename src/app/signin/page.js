import { GoogleSignIn, FacebookSignIn } from "../components/authButtons";

export default async function SignIn() {
  return (
    <div>
      <h1>Login</h1>
      <GoogleSignIn />
    </div>
  );
}
