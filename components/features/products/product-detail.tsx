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

  useEffect(() => {
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
                <strong>Giá:</strong> {product.price} VND
              </p>
              <p>
                <strong>Đã bán:</strong> {product.sold}
              </p>
              <p>
                <strong>Danh mục:</strong> {product.categoryName} -{" "}
                {product.subCategoryName}
              </p>
              <p>
                <strong>Kích thước:</strong> {product.dimensionsLength} x{" "}
                {product.dimensionsWidth} x {product.dimensionsHeight} cm
              </p>
              <p>
                <strong>Chất liệu:</strong> {product.materialName}
              </p>
              <p>
                <strong>Bộ sưu tập:</strong> {product.collectionName}
              </p>
              <p>
                <strong>Trọng lượng:</strong> {product.weight} kg
              </p>
              <p>
                <strong>Lắp ráp:</strong>{" "}
                {product.assemblyRequired ? "Cần lắp ráp" : "Không cần lắp ráp"}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {product.active ? "Đang bán" : "Ngừng bán"}
              </p>
              {product.variations && product.variations.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold">Available Variations:</p>
                  <div className="flex gap-2 mt-2">
                    {product.variations.map((variation) => (
                      <div
                        key={variation.variationId}
                        className="border p-2 rounded-lg text-center"
                      >
                        <Image
                          src={variation.imageUrl}
                          alt={variation.color}
                          width={50}
                          height={50}
                          className="rounded-lg"
                        />
                        <p className="text-sm">{variation.color}</p>
                      </div>
                    ))}
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
