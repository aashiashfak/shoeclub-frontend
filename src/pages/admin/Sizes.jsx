import TableHeader from "@/components/PageHeader/TableHeader";
import Spinner from "@/components/Spinner/Spinner";
import {SizeTable} from "@/components/Tables/SizeTable";
import {sizeServices} from "@/services/sizeServices";
import {useQuery} from "@tanstack/react-query";
import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const Sizes = () => {
  const location = useLocation();
  const product = location.state?.product || null;
  const navigate = useNavigate();
  const {id: productID, name} = product || {};
  useEffect(() => {
    if (!product) {
      navigate(-1);
    }
  }, [product]);
  
  if (!product) {
    return null;
  }
  const {data: sizes, isLoading} = useQuery({
    queryKey: ["sizes", productID],
    queryFn: async () => await sizeServices.getSizes(productID),
    refetchOnWindowFocus: false,
    enabled: !!productID,
  });

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
