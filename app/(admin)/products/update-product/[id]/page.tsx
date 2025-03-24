import UpdateProduct from "@/components/features/products/update-product";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <UpdateProduct productId={Number(params.id)} />;
};

export default page;
