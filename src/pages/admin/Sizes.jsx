import TableHeader from "@/components/PageHeader/TableHeader";
import Spinner from "@/components/Spinner/Spinner";
import {SizeTable} from "@/components/Tables/SizeTable";
import { sizeServices } from "@/services/sizeServices";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import {useLocation} from "react-router-dom";

const Sizes = () => {
  const location = useLocation();
  const product = location.state?.product || null;
  const {id: productID, name} = product;
  const {data: sizes, isLoading} = useQuery({
    queryKey: ["sizes", productID],
    queryFn: async () => await sizeServices.getSizes(productID),
    refetchOnWindowFocus: false,
  });
  console.log("product id in sizes page", productID);
  return (
    <>
      <TableHeader
        title={name}
        link={{pathname: "/admin/size-form", state: {productID}}}
      />
      {isLoading && <Spinner />}
      {sizes && <SizeTable sizes={sizes} productID={productID} />}
    </>
  );
};
export default Sizes;
