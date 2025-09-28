import { UserForm } from "@/components/user-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Signup() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <UserForm children={<SignupInputs />} />
    </div>
  );
}

function SignupInputs() {
  return (
    <>
      <Label htmlFor="newEmail">Email</Label>
      <Input id="newEmail" type="email" placeholder="m@example.com" required />
      <Label htmlFor="newPassword">Password</Label>
      <Input
        id="new-password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
    </>
  );
}

export default Signup;
