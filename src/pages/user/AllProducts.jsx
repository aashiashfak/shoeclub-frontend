import React, {useState, useEffect, useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import Sidebar from "@/components/SideBar/Sidebar";
import CheckboxGroup from "@/components/CheckBox/CheckBoxGroup";
import {ProductServices} from "@/services/productServices";
import {useLocation} from "react-router-dom";
import ProductCard from "@/components/Cards/ProductCard";

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const debounceTimeout = useRef(null);
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async ({search, category}) => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    try {
      const response = await ProductServices.getProducts(params);
      return response || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const queryKey = ["products", debouncedSearch, selectedCategories.join(",")];

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["Product", debouncedSearch, selectedCategories],
    queryFn: () => {
      const categoryParam = selectedCategories.join(",");
      const searchParam = debouncedSearch ? debouncedSearch : undefined;

      const params = {
        category: categoryParam,
        search: searchParam,
      };
      return fetchProducts(params);
    },
    refetchOnWindowFocus: false,
  });

  console.log(" products--------------------------", products);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(query);
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimeout.current);
  }, []);

  const handleCheckboxChange = (item) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((cat) => cat !== item)
        : [...prevSelected, item]
    );
  };

  const handleClearCheckBox = (clearState) => {
    if (clearState === "category") {
      setSelectedCategories([]);
    }
  };

  if (error) return <div>Error: {error.message || "Something went wrong"}</div>;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar title={"Filters"}>
        <CheckboxGroup
          title={"category"}
          items={categories || []}
          selectedItems={selectedCategories}
          handleCheckboxChange={handleCheckboxChange}
          clearState={() => handleClearCheckBox("category")}
        />
      </Sidebar>

      {/* Main content */}
      <div className="lg:ml-72 w-full p-1">
        {/* Search Input */}
        <div className="mb-4 flex justify-center sticky top-[66px] lg:top-[72px] px-1 py-3 z-30 bg-white">
          <input
            type="text"
            placeholder="Search Product by name, category, or description"
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div>loading...</div>
          ) : products?.results.length > 0 ? (
            products?.results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            !isLoading && (
              <div className="col-span-full text-center text-gray-500">
                No Product found matching your search.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
