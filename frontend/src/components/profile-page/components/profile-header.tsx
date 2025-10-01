// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import type { User } from "@supabase/supabase-js";

export default function ProfileHeader() {
  const { session } = useAuth();
  const user: User | undefined = session?.user;
  const displayName: string = user?.user_metadata.display_name;
  const creationDate: Date = new Date(user?.created_at || "");
  const avatar = user?.user_metadata.avatar_url;
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar? avatar: `src/assets/neutral.png`} alt="Profile" />
              <AvatarFallback className="text-2xl">USERNAME</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{displayName}</h1>
              {/* <Badge variant="secondary">Pro Member</Badge> */}
            </div>
            {/* <p className="text-muted-foreground">Senior Product Designer</p> */}
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {user?.email}
              </div>
              {/* <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                San Francisco, CA
              </div> */}
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Joined{" "}
                {creationDate.toLocaleString("default", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
          {/* <Button variant="default">Edit Profile</Button> */}
        </div>
      </CardContent>
    </Card>
  );
}
