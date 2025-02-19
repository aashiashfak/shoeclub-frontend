import Spinner from "@/components/Spinner/Spinner";
import {ProductTable} from "@/components/Tables/ProductTable";
import {ProductServices} from "@/services/productServices";
import {useQuery} from "@tanstack/react-query";
import React from "react";

const Products = () => {
  const {data: products, isLoading} = useQuery({
    queryKey: ["products"],
    queryFn: async () => await ProductServices.fetchProducts(),
    refetchOnWindowFocus: false,
  });
  console.log("products", products);
  return (
    <div className="p-2 lg:p-6 ">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>
      <div className="overflow-x-auto">
        {isLoading && <Spinner/>}
        {products && <ProductTable products={products} />}
      </div>
    </div>
  );
};

export default Products;
