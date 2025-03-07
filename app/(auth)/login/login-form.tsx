import { cn } from "@/lib/utils";
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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="">
      {/* Ảnh nền */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/image/nhaxinhbg.jpg')" }}
      />

      {/* Lớp phủ để tăng độ tương phản */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Form đăng nhập */}
      <div className="relative flex min-h-screen justify-center items-center">
        <Card className="bg-white bg-opacity-90 shadow-lg w-full max-w-md p-6 rounded-xl">
          <CardHeader className="flex items-center gap-4">
            {/* Tiêu đề */}
            <CardTitle className="text-2xl">Login</CardTitle>

            {/* Ảnh */}
            <img
              src="/image/nhaxinhlogo.png"
              alt="nhaxinhbg"
              className="w-12 h-12 rounded-md object-cover"
            />
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
