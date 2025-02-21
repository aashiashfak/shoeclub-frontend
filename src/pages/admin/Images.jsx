import TableHeader from "@/components/PageHeader/TableHeader";
import Spinner from "@/components/Spinner/Spinner";
import {ImageTable} from "@/components/Tables/ImageTable";
import {imageServices} from "@/services/imageServices";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import {useLocation} from "react-router-dom";

const Images = () => {
  const location = useLocation();
  const product = location.state?.product || null;
  const {id: productID, name} = product;
  const {data: images, isLoading} = useQuery({
    queryKey: ["images", productID],
    queryFn: async () => await imageServices.getImages(productID),
    refetchOnWindowFocus: false,
  });
  console.log("product id in sizes page", productID);
  return (
    <>
      <TableHeader
        title={name}
        link={{pathname: "/admin/image-form", state: {productID}}}
      />
      {isLoading && <Spinner/>}
      {images && <ImageTable images={images} productID={productID} />}
    </>
  );
};

export default Images;
