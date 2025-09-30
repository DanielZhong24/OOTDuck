import { UserForm } from "@/components/user-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState, type ChangeEvent } from "react";
import FormError from "../components/FormError";

type SignupInputsProps = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMsg: string;
};

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { handleSignup } = useAuth();

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    const signup = await handleSignup(email, password);
    if (signup.pass) {
      setErrorMsg("");
    } else {
      setErrorMsg(signup.error);
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <UserForm
        onSubmit={registerUser}
        children={
          <SignupInputs
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            errorMsg={errorMsg}
          />
        }
      />
    </div>
  );
}

function SignupInputs({
  setEmail,
  setPassword,
  setConfirmPassword,
  errorMsg,
}: SignupInputsProps) {
  return (
    <>
      <Label htmlFor="newEmail">Email</Label>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        id="newEmail"
        type="email"
        placeholder="m@example.com"
        required
      />
      <Label htmlFor="newPassword">Password</Label>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        id="new-password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        id="confirmPassword"
        type="password"
        placeholder="Confirm your password"
      />
      {errorMsg && <FormError message={errorMsg} />}
    </>
  );
}

export default Signup;
