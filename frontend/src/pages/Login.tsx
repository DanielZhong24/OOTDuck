import { UserForm } from "@/components/user-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <UserForm children={<LoginInputs />} />
    </div>
  );
}

function LoginInputs() {
  return (
    <>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="m@example.com" required />
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="Enter your password" required />
    </>
  );
}

export default Login;
