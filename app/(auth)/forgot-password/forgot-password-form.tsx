"use client";
import { useState } from "react";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/util/context/AuthContext";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await nhaxinhService.api.loginResetPasswordCreate({
        email,
      });

      // Assuming the API returns a token
      const token = response.data;

      if (token) {
        toast.success("Send email successfully");
        router.push("/login");
        // Optionally, redirect the user or handle success
      } else {
        setError("Send failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/image/nhaxinhbg.jpg')" }}
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Login form */}
      <div className="relative flex min-h-screen justify-center items-center">
        <Card className="bg-opacity-90 shadow-lg w-full max-w-md p-6 rounded-xl">
          <CardHeader className="flex items-center gap-4">
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <img
              src="/image/nhaxinhlogo.png"
              alt="nhaxinhbg"
              className="w-12 h-12 rounded-md object-cover"
            />
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <Button type="submit" className="w-full">
                  Send email
                </Button>
              </div>
            </form>
            <Button
              variant={"link"}
              onClick={() => router.push("/login")}
              type="button"
              className="w-full mt-5"
            >
              or Login?
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
