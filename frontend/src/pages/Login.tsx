/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserForm } from "@/components/user-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState, type ChangeEvent, type SetStateAction } from "react";
import FormError from "../components/FormError";
import { useNavigate, type NavigateFunction } from "react-router-dom";
type LoginInputProps = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<SetStateAction<string>>;
  errorMsg: string;
};

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { handleLogin } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  const loginUser: (e: React.FormEvent) => Promise<void> = async (e: React.FormEvent) => {
    e.preventDefault();

    const login: any = await handleLogin(email, password);

    if (login.pass) {
      setErrorMsg("");
      navigate("/");
    } else {
      setErrorMsg(login.error);
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <UserForm
        onSubmit={loginUser}
        children={
          <LoginInputs
            setEmail={setEmail}
            setPassword={setPassword}
            errorMsg={errorMsg}
          />
        }
      />
    </div>
  );
}

function LoginInputs({ setEmail, setPassword, errorMsg }: LoginInputProps) {
  return (
    <>
      <Label htmlFor="email">Email</Label>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        id="email"
        type="email"
        placeholder="m@example.com"
        required
      />
      <Label htmlFor="password">Password</Label>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        id="password"
        type="password"
        placeholder="Enter your password"
        required
      />
      {errorMsg && <FormError message={errorMsg} />}
    </>
  );
}

export default Login;
