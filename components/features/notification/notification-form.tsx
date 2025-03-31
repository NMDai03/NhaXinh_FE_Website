"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";

export default function NotificationForm() {
  const { control, handleSubmit, register, reset } = useForm();
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    nhaxinhService.api.userGetAllUserList().then((response) => {
      setUsers(response.data);
    });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response =
        await nhaxinhService.api.notificationSendNotificationToCustomerCreate({
          body: data.body,
          title: data.title,
          userId: data.userId,
        });

      if (response.data) {
        toast.success("Send notification successfully");
        reset();
      } else {
        toast.error("Send notification failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <CardTitle>Notification form</CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
          <Controller
            name="userId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={0} value="0">
                    All user
                  </SelectItem>
                  {users.map((user: any) => (
                    <SelectItem
                      key={user.userId}
                      value={user.userId.toString()}
                    >
                      {user.firstName + " " + user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Input {...register("title")} placeholder="Title" />
          <Textarea {...register("body")} placeholder="Body" />
          <Button type="submit">Send Notification</Button>
        </form>
      </CardContent>
    </Card>
  );
}
