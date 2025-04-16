import UpdateProduct from "@/components/features/products/update-product";
import React from "react";

type Params = Promise<{ id: string }>;

const page = async (props: { params: Params }) => {
  const params = await props.params;

  return <UpdateProduct productId={Number(params.id)} />;
};

export default page;
