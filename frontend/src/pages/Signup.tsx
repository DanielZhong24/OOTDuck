/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserForm } from "@/components/user-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState, type ChangeEvent } from "react";
import FormMsg from "../components/FormMsg";

type SignupInputsProps = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  errorMsg: string;
};

function Signup() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSignup } = useAuth();

  const registerUser: (e: React.FormEvent) => Promise<void> = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match");
        return;
      }

      if (!fullName.includes(" ") || fullName.trim().split(" ").length < 2) {
        setErrorMsg("Full name must include at least first and last name");
        return;
      }

      const signup = await handleSignup(email, password, fullName);
      if (signup.pass) {
        setErrorMsg("");
      } else {
        setErrorMsg(signup.error);
      }
    } catch (error: any) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <UserForm
        onSubmit={registerUser}
        loading={loading}
        children={
          <SignupInputs
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            setFullName={setFullName}
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
  setFullName,
  errorMsg,
}: SignupInputsProps) {
  return (
    <>
      <Label htmlFor="fullName">Full Name</Label>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
        id="fullName"
        type="text"
        placeholder="John Doe"
        className="placeholder:text-sm md:placeholder:text-base"
        required
      />
      <Label htmlFor="newEmail">Email</Label>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        id="newEmail"
        type="email"
        placeholder="m@example.com"
        className="placeholder:text-sm md:placeholder:text-base"
        required
      />
      <Label htmlFor="newPassword">Password</Label>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        id="new-password"
        type="password"
        placeholder="Enter your password"
        className="placeholder:text-sm md:placeholder:text-base"
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
        className="placeholder:text-sm md:placeholder:text-base"
      />
      {errorMsg && <FormMsg className="text-red-500" message={errorMsg} />}
    </>
  );
}

export default Signup;
