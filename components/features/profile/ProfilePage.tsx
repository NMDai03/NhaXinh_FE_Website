"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";
import { useAuth } from "@/util/context/AuthContext";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>({});
  const [password, setPassword] = useState({ current: "", new: "" });
  const { logout } = useAuth();

  useEffect(() => {
    nhaxinhService.api.profileGetCurrentUserProfileList().then((res) => {
      if (res.status == 200) {
        setProfile(res.data);
      }
    });
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const response = await nhaxinhService.api.profileUpdateProfileImageCreate({
      image: file,
    });

    if (response.status == 200) {
      if (file) {
        const url = URL.createObjectURL(file);
        setProfile({ ...profile, avatarUrl: url });
      }
      toast.success("Update avatar successfully");
    } else {
      toast.error("Failed to update avatar");
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleProfileSubmit = async () => {
    const { firstName, lastName, phone, address } = profile;
    const res = await nhaxinhService.api.profileUpdateProfileCreate({
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      Address: address,
    });
    if (res.status === 200) {
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handlePasswordSubmit = async () => {
    const res = await nhaxinhService.api.profileUpdateProfilePasswordCreate({
      oldPass: password.current,
      newPass: password.new,
    });

    if (res.status === 200) {
      toast.success("Password updated successfully");
      setPassword({ current: "", new: "" });
      logout();
    } else {
      toast.error("Failed to update password");
    }
  };

  return (
    <Tabs defaultValue="profile" className="max-w-xl mx-auto mt-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardContent className="space-y-6 p-6">
            {/* Avatar Update Form */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile?.avatarUrl} />
                <AvatarFallback>{profile?.firstName}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar">Update Avatar</Label>
                <Input type="file" id="avatar" onChange={handleImageChange} />
              </div>
            </div>

            {/* Profile Info Form */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={profile?.firstName || ""}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={profile?.lastName || ""}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input value={profile?.email || ""} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={profile?.phone || ""}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Address</Label>
                <Input
                  name="address"
                  value={profile?.address || ""}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Input
                  value={profile?.active ? "Active" : "Inactive"}
                  disabled
                />
              </div>
              <Button onClick={handleProfileSubmit}>Save Profile</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="grid gap-2">
              <Label>Current Password</Label>
              <Input
                type="password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>New Password</Label>
              <Input
                type="password"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
              />
            </div>
            <Button onClick={handlePasswordSubmit}>Update Password</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
