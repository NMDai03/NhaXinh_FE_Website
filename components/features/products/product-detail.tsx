"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import AddVariationPopUp from "./add-variation";
import EditVariationPopUp from "./edit-variation";

interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  sold: number;
  categoryName: string;
  subCategoryName: string;
  dimensionsLength: number;
  dimensionsWidth: number;
  dimensionsHeight: number;
  materialName: string;
  collectionName: string;
  weight: number;
  assemblyRequired: boolean;
  active: boolean;
  createdAt: string;
  images: { imageUrl: string; isPrimary: boolean }[];
  variations: {
    variationId: number;
    color: string;
    imageUrl: string;
  }[];
}

export default function ProductDetailSheet({
  children,
  productId,
}: {
  children: React.ReactNode;
  productId: number;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = async () => {
    try {
      const response =
        await nhaxinhService.api.productGetProductByIdDetail(productId);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" style={{ overflowY: "auto" }}>
        <SheetTitle>{product?.name}</SheetTitle>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-52 w-full" />
          </div>
        ) : product ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">{product.description}</p>
            <Image
              src={product.images[0]?.imageUrl || "/placeholder.jpg"}
              alt={product.name}
              width={350}
              height={200}
              className="rounded-lg"
            />
            <div className="text-sm space-y-1">
              <p>
                <strong>Price:</strong> {product.price} VND
              </p>
              <p>
                <strong>Sold:</strong> {product.sold}
              </p>
              <p>
                <strong>Category:</strong> {product.categoryName} -{" "}
                {product.subCategoryName}
              </p>
              <p>
                <strong>Size:</strong> {product.dimensionsLength} x{" "}
                {product.dimensionsWidth} x {product.dimensionsHeight} cm
              </p>
              <p>
                <strong>Material:</strong> {product.materialName}
              </p>
              <p>
                <strong>Collection:</strong> {product.collectionName}
              </p>
              <p>
                <strong>Weight:</strong> {product.weight} kg
              </p>
              <p>
                <strong>Assembly Required:</strong>{" "}
                {product.assemblyRequired ? "Cần lắp ráp" : "Không cần lắp ráp"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {product.active ? "Đang bán" : "Ngừng bán"}
              </p>
              {product.variations && product.variations.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold">Available Variations:</p>
                  <div className="flex items-center gap-2 mt-2 h-24 overflow-hidden">
                    {product.variations.map((variation) => (
                      <EditVariationPopUp key={variation.variationId} variation={variation} fetchProductDetail={fetchProduct} productId={productId}>
                        <div className="border p-2 rounded-lg text-center h-full flex flex-col">
                          <Image
                            src={variation.imageUrl}
                            alt={variation.color}
                            width={50}
                            height={50}
                            className="rounded-lg h-2/3 object-cover"
                          />
                          <p className="text-sm h-1/3">{variation.color}</p>
                        </div>
                      </EditVariationPopUp>
                    ))}
                    <AddVariationPopUp
                      productId={productId}
                      fetchProductDetail={fetchProduct}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-red-500">Không tìm thấy sản phẩm.</p>
        )}
      </SheetContent>
    </Sheet>
  );
}
