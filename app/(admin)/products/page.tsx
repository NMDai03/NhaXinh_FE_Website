import Products from "@/components/features/products/products";
import Categories from "@/components/features/sub_categories";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Products />
    </main>
  );
};

export default page;
