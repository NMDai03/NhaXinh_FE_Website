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

interface Product {
  productId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5217/api/Product/GetAllProducts?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      console.log("Products:", response.data.items);
      setProducts(response.data.items);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    console.log("Products component mounted");
    fetchProducts();
  }, [pageNumber]);

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
              <TableHead className="hidden sm:table-cell">Name</TableHead>
              <TableHead className="hidden sm:table-cell">
                Description
              </TableHead>
              <TableHead className="text-right">Created at</TableHead>
              <TableHead className="text-right">Updated at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.productId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {product.name} <Badge variant="secondary">New</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {product.description}
                </TableCell>
                <TableCell className="text-right">
                  {moment(product.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  {moment(product.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
          <span>Page {pageNumber}</span>
          <Button onClick={() => setPageNumber((prev) => prev + 1)}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
