import Spinner from "@/components/Spinner/Spinner";
import {ProductTable} from "@/components/Tables/ProductTable";
import {Button} from "@/components/ui/button";
import TableHeader from "@/components/PageHeader/TableHeader";
import {ProductServices} from "@/services/productServices";
import {useQuery} from "@tanstack/react-query";
import {Plus} from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const {data: products, isLoading} = useQuery({
    queryKey: ["products"],
    queryFn: async () => await ProductServices.fetchProducts(),
    refetchOnWindowFocus: false,
  });
  console.log("products", products);
  return (
    <div className="p-2 lg:p-6 ">
      <TableHeader title="Products" link="/admin/product-form" />

      <div className="overflow-x-auto">
        {isLoading && <Spinner />}
        {products && <ProductTable products={products} />}
      </div>
    </div>
  );
};

export default Products;
