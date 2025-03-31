import NotificationForm from "@/components/features/notification/notification-form";
import Categories from "@/components/features/sub_categories/sub_categories";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <NotificationForm />
    </main>
  );
};

export default page;
