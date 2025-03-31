import UpdateProduct from "@/components/features/products/update-product";
import React from "react";

type tParams = Promise<{ slug: string[] }>;

const page = async (props: { params: tParams }) => {
  const { slug } = await props.params;
  const productID = slug[1];
  return <UpdateProduct productId={Number(productID)} />;
};

export default page;
