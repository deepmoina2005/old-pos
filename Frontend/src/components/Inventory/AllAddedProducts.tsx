import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useEffect, useState } from "react";
import { Trash2, PlusCircle, Search } from "lucide-react";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { deleteProductAction, fetchProductAction } from "../../redux/slices/product/productSlice";

export default function AllAddedProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.productList.products)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductAction());
  }, [])
  const handleDelete = (id: number) => {
    dispatch(deleteProductAction(id));
  };


  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {/* Header */}
        <div className="flex justify-between p-4">
          <form className="flex gap-2">
            <div className="relative">
              <span className="absolute -translate-y-1/2 pointer-events-none left-3 mt-5.5">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 xl:w-[430px]"
              />
            </div>
          </form>

          <Button
            onClick={handleAddProduct}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <PlusCircle className="mr-2" />
            Add Product
          </Button>
        </div>

        {/* Table */}
        <div className="p-2 border rounded-lg m-2">
          <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">
              <TableRow>
                <TableCell isHeader className="px-4 py-3">Product Name</TableCell>
                <TableCell isHeader className="px-4 py-3">Product Price</TableCell>
                <TableCell isHeader className="px-4 py-3">Product Delete</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700 text-center text-sm">
              {paginatedProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <TableCell className="px-4 py-3 font-medium text-gray-900 dark:text-white">{product.name}</TableCell>
                  <TableCell className="px-4 py-3">{product.selling_price}</TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 text-gray-500">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="flex items-center gap-2"
        >
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M5.75 12.5h11.5m-11.5 0 4.792-4.791M5.75 12.5l4.792 4.792" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-md ${currentPage === page ? "bg-indigo-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="flex items-center gap-2"
        >
          Next
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M17.25 11.5H5.75m11.5 0-4.792-4.79m4.792 4.79-4.792 4.792" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
