/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import { fetchUnitAction } from "../../redux/slices/unit/unitSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteUnitAction } from "../../redux/slices/unit/unitSlice";

const AllUnitsHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const units = useSelector((state: RootState) => state.unitList.units)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  const itemsPerPage = 10;

  const handleDelete = async (data: any) => {
    await dispatch(deleteUnitAction(data));
  };

  useEffect(() => {
    dispatch(fetchUnitAction());
  }, [dispatch]);
  const filteredUnits = units.filter((unit) =>
    unit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);

  const paginatedUnits = filteredUnits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between items-center p-4 flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search units..."
            className="dark:bg-dark-900 h-11 w-full md:w-1/3 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={() => navigate("/add-unit")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Unit
          </Button>
        </div>

        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {["Unit Name", "Created At", "Updated At", "Actions"].map(
                (heading) => (
                  <TableCell
                    key={heading}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-xs uppercase dark:text-gray-400"
                  >
                    {heading}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedUnits.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell className="px-5 py-4 text-start">{unit.name}</TableCell>
                <TableCell className="px-5 py-4 text-start text-xs text-gray-500">
                  {new Date(unit.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-xs text-gray-500">
                  {new Date(unit.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4 text-start">
                  <button
                    onClick={() => navigate(`/edit-unit/${unit.id}`)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(unit)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-4 py-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="text-sm text-gray-600 dark:text-gray-400 disabled:opacity-50"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-md text-sm ${currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="text-sm text-gray-600 dark:text-gray-400 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUnitsHistory;