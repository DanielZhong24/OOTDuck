/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, LogOut } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/context/supabaseClient";
import FormMsg from "@/components/FormMsg";
import { useEffect } from "react";

export default function ProfileContent() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { handleLogout } = useAuth();

  useEffect(() => {
    setTimeout(() => setSuccess(null), 3000);
  }, [success]);

  useEffect(() => {
    setTimeout(() => setError(null), 3000);
  }, [error]);

  const updateName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!firstName || !lastName) {
        setError("First and last name are required");
        return { pass: false };
      }

      const { data, error } = await supabase.auth.updateUser({
        data: { display_name: `${firstName} ${lastName}` },
      });

      if (error) {
        setError(error.message);
        return { pass: false, message: error.message };
      }

      setSuccess("Profile updated successfully");
      return { pass: true, data };
    } catch (error: any) {
      setError(error.message);
      return { pass: false };
    }
  };

  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      {/* Personal Information */}
      <TabsContent value="personal" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and profile information.
            </CardDescription>
          </CardHeader>
          <form onSubmit={updateName}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFirstName(e.target.value)
                    }
                    id="firstName"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setLastName(e.target.value)
                    }
                    id="lastName"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {error && <FormMsg className="text-red-500" message={error} />}
              {success && <FormMsg className="text-green-500" message={success} />}
              <Button type="submit" variant="default">
                Save Changes
              </Button>
            </CardContent>
          </form>
        </Card>
      </TabsContent>

      {/* Security Settings */}
      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security and authentication.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Change Password</Label>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowChangePassword(!showChangePassword)}
                >
                  <Key className="mr-2 h-4 w-4" />
                  {showChangePassword ? "Cancel" : "Change"}
                </Button>
              </div>

              {/* Inline Change Password Form */}
              {showChangePassword && (
                <div className="space-y-4 rounded-lg border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter new password"
                    />
                  </div>
                  <Button className="w-full">Save Password</Button>
                </div>
              )}
            </div>
          </CardContent>

          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Log Out Account</Label>
              </div>
              <Button
                onClick={handleLogout}
                className="cursor-pointer"
                variant="destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
