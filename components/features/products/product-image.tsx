import { useState, useEffect } from "react";
import Image from "next/image";

const ProductImage = ({ product }: { product: any }) => {
  const [imageSrc, setImageSrc] = useState("/image/nhaxinhlogo.png");

  useEffect(() => {
    if (product.images?.length) {
      const primaryImage = product.images.find(
        (image: any) => image.isPrimary
      )?.imageUrl;
      if (primaryImage) setImageSrc(primaryImage);
    }
  }, [product.images]);

  console.log(imageSrc, product);

  return (
    <Image
      src={imageSrc}
      alt={product.name || "No name"}
      width={50}
      height={50}
      onError={() => setImageSrc("/image/nhaxinhlogo.png")} // Nếu lỗi ảnh, chuyển sang ảnh mặc định
    />
  );
};

export default ProductImage;
