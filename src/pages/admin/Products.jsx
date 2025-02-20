import Spinner from "@/components/Spinner/Spinner";
import {ProductTable} from "@/components/Tables/ProductTable";
import {Button} from "@/components/ui/button";
import {ProductServices} from "@/services/productServices";
import {useQuery} from "@tanstack/react-query";
import {Plus} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-between p-2">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Button
          type="button"
          onClick={() => navigate("/admin/product-form")}
          variant="outline"
        >
          <Plus size={16} /> Add Product
        </Button>
      </div>
      <div className="overflow-x-auto">
        {isLoading && <Spinner />}
        {products && <ProductTable products={products} />}
      </div>
    </div>
  );
};

export default Products;
