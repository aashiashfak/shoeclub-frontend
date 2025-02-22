import Spinner from "@/components/Spinner/Spinner";
import { CategoryTable } from "@/components/Tables/CategoryTable";
import { CategoryServices } from "@/services/categoryServices";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import TableHeader from "@/components/PageHeader/TableHeader";

const Categories = () => {
   const {data: categories, isLoading} = useQuery({
      queryKey: ["Categories"],
      queryFn: async () => await CategoryServices.getCategories(),
      refetchOnWindowFocus: false,
    });

  return (
    <>
      <TableHeader
        title="categories"
        link={{pathname: "/admin/category-form"}}
      />
      <div className="overflow-x-auto">
        {isLoading && <Spinner />}
        {categories && <CategoryTable categories={categories} />}
      </div>
    </>
  );
        

};

export default Categories;
