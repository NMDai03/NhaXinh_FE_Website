"use client";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Product } from "@/util/services/Api";
import ProductImage from "./product-image";
import { Switch } from "../../ui/switch";
import { toast } from "react-toastify";
import ProductDetailSheet from "./product-detail";
import { Edit } from "lucide-react";
import { nhaxinhService } from "@/util/services/nhaxinhService";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 5;
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const response = await nhaxinhService.api.productGetAllProductsList({
        pageNumber,
        pageSize,
      });
      setProducts(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber]);
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <Card>
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>Recent Products from your store.</CardDescription>
        </div>
        <Button onClick={() => router.push("/products/add-product")}>
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden sm:table-cell">Images</TableHead>
              <TableHead className="hidden sm:table-cell">Name</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Created at</TableHead>
              <TableHead className="text-right">Updated at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: any) => (
              <TableRow key={product.productId}>
                <TableCell>{product.productId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <ProductImage product={product} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <ProductDetailSheet productId={product.productId}>
                    <a className="mr-2 hover:underline hover:cursor-pointer">
                      {product.name}
                    </a>
                  </ProductDetailSheet>
                  {moment().diff(moment(product.createdAt), "days") < 1 && (
                    <Badge variant="secondary">New</Badge>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusSwitch
                    active={product.active}
                    productId={product.productId}
                    fetchProducts={fetchProducts}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {moment(product.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  {moment(product.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      router.push(
                        `/products/update-product/${product.productId}`
                      )
                    }
                  >
                    <Edit size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={pageNumber === 1}
          className="px-4 py-2"
        >
          Previous
        </Button>
        
        <div className="flex flex-col items-center text-center">
          <span className="text-sm">
            Page {pageNumber} of {totalPages || 1}
          </span>
          <span className="text-xs text-gray-500">
            Showing {products.length} of {totalCount} products
          </span>
        </div>
        
        <Button
          onClick={handleNextPage}
          disabled={pageNumber >= totalPages}
          className="px-4 py-2"
        >
          Next
        </Button>
      </div>
      </CardContent>
    </Card>
  );
}

const StatusSwitch = ({
  active,
  productId,
  fetchProducts,
}: {
  active: boolean;
  productId: number;
  fetchProducts: () => void;
}) => {
  const [updating, setUpdating] = useState(false);

  const updateProductStatus = async (value: boolean) => {
    try {
      setUpdating(true);
      const response =
        await nhaxinhService.api.productUpdateProductActivePartialUpdate(
          productId,
          value
        );
      toast.success(response.data.message);
      setUpdating(false);
      fetchProducts();
    } catch (error) {
      toast.error("Error updating product status");
      setUpdating(false);
      console.error("Error updating product status:", error);
    }
  };

  return (
    <Switch
      checked={active}
      onCheckedChange={updateProductStatus}
      disabled={updating}
    />
  );
};
