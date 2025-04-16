import Payments from "@/components/features/payments/payments";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Payments />
    </main>
  );
};

export default page;
