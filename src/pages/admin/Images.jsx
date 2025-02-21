import TableHeader from "@/components/PageHeader/TableHeader";
import {ImageTable} from "@/components/Tables/ImageTable";
import React from "react";
import {useLocation} from "react-router-dom";

const Images = () => {
  const location = useLocation();
  const product = location.state?.product || null;
  const {images, id: productID, name} = product;
  console.log("product id in sizes page", productID);
  return (
    <>
      <TableHeader
        title={name}
        link={{pathname: "/admin/image-form", state: {productID}}}
      />
      <ImageTable images={images} productID={productID} />
    </>
  );
};

export default Images;
