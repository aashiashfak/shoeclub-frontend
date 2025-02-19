import Spinner from "@/components/Spinner/Spinner";
import { CategoryTable } from "@/components/Tables/CategoryTable";
import {ProductTable} from "@/components/Tables/ProductTable";
import { CategoryServices } from "@/services/categoryServices";
import {useQuery} from "@tanstack/react-query";
import React from "react";

const Categories = () => {
   const {data: categories, isLoading} = useQuery({
      queryKey: ["Categories"],
      queryFn: async () => await CategoryServices.getCategories(),
      refetchOnWindowFocus: false,
    });

  return (
    <div className="p-2 lg:p-6 ">
      <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
      <div className="overflow-x-auto">
        {isLoading && <Spinner />}
        {categories && <CategoryTable categories={categories} />}
      </div>
    </div>
  );
};

export default Categories;
