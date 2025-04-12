import UpdateProduct from "@/components/features/products/update-product";
import React from "react";

export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
};

const page = ({ params }: Props) => {
  const { id } = params;

  return <UpdateProduct productId={Number(id)} />;
};

export default page;
