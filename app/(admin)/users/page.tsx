import Users from "@/components/features/users/users";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Users />
    </main>
  );
};

export default page;
