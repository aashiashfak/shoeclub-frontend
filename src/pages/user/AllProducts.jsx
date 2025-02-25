import React, {useState, useEffect, useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import Sidebar from "@/components/SideBar/Sidebar";
import CheckboxGroup from "@/components/CheckBox/CheckBoxGroup";
import {ProductServices} from "@/services/productServices";
import ProductCard from "@/components/Cards/ProductCard";
import {CategoryServices} from "@/services/categoryServices";
import Spinner from "@/components/Spinner/Spinner";

const AllProducts = ({isOpen, toggleSidebar}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const debounceTimeout = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async ({search, category, page}) => {
    const params = {page};
    if (search) params.search = search;
    if (category) params.category = category;

    try {
      const response = await ProductServices.getProducts(params);
      return response || {results: [], count: 0};
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const {
    data: productsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["Product", debouncedSearch, selectedCategories, currentPage],
    queryFn: () => {
      const categoryParam = selectedCategories.join(",");
      const searchParam = debouncedSearch ? debouncedSearch : undefined;

      return fetchProducts({
        category: categoryParam,
        search: searchParam,
        page: currentPage,
      });
    },
    refetchOnWindowFocus: false,
  });

  const {data: categories} = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => await CategoryServices.getCategories(),
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);

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
    setCurrentPage(1);
  };

  const handleClearCheckBox = (clearState) => {
    if (clearState === "category") {
      setSelectedCategories([]);
    }
  };

  const totalProducts = productsData?.count || 0;
  const productsPerPage = productsData?.results.length || 0;
  const totalPages = Math.ceil(totalProducts / 3);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (error) return <div>Error: {error.message || "Something went wrong"}</div>;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar title={"Filters"} isOpen={isOpen} toggleSidebar={toggleSidebar}>
        <CheckboxGroup
          title={"category"}
          items={categories || []}
          selectedItems={selectedCategories}
          handleCheckboxChange={handleCheckboxChange}
          clearState={() => handleClearCheckBox("category")}
        />
      </Sidebar>

      {/* Main content */}
      <div className="lg:ml-72 w-full p-2 pb-20">
        {/* Search and Product Count per page */}
        <div className="mb-4 flex justify-between items-center sticky top-[66px] lg:top-[72px] px-1 py-3 z-30 bg-white">
          <input
            type="text"
            placeholder="Search Product by name, category, or description"
            className="w-2/3 p-2 border border-gray-300 rounded-lg shadow-sm"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="text-gray-600 font-medium">
            Products: {productsPerPage}
          </span>
        </div>

        {/* Product Grid */}
        {isLoading && <Spinner />}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {productsData?.results.length > 0
            ? productsData?.results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : !isLoading && (
                <div className="col-span-full text-center text-gray-500">
                  No products found matching your search.
                </div>
              )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === 1
                  ? "text-gray-400"
                  : "text-black hover:bg-gray-200"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 border rounded-lg bg-gray-100">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400"
                  : "text-black hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
