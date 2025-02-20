import TableHeader from "@/components/PageHeader/TableHeader";
import { ImageTable } from "@/components/Tables/ImageTable";
import React from "react";
import {useLocation} from "react-router-dom";

const Images = () => {
  const location = useLocation();
  const product = location.state?.product || null;
  console.log("product in sizes page", product);
  return (
    <>
      <TableHeader title={product.name} link="/admin/page-form" />
      <ImageTable images={product.images} />
    </>
  );
};

export default Images;
