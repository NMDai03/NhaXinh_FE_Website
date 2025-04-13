import { useState, useEffect } from "react";
import { Image } from "antd";

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

  return (
    <Image.PreviewGroup items={product.images.map((i: any) => i.imageUrl)}>
      <Image width={100} src={imageSrc} />
    </Image.PreviewGroup>
  );
};

export default ProductImage;
