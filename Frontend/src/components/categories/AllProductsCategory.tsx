import { useEffect, useState } from "react";
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
import { fetchCategoryAction } from "../../redux/slices/category/categoryListSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { deleteCategoryAction, updateCategoryAction } from "../../redux/slices/category/categoryListSlice";

interface CategoryData {
  id:number;
  name: string;
  description: string;
  status:number;
}
const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-300 ease-in-out after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:after:translate-x-5"></div>
  </label>
);

const AllProductCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productCategories = useSelector((state: RootState) => state.categoryList.categories)
  console.log(productCategories);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const handleDelete = (data: CategoryData) => {
    if (confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(data))
      }
  };

  const handleToggleStatus = (data:CategoryData) => {
    const hitData = {
      id: data.id,
      name: data.name, 
      description: data.description,
      status: data.status == 1 ? 0 : 1 , // Toggle the status
    }
    dispatch(updateCategoryAction(hitData));
  };
  
  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);
  const filteredCategories = productCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between items-center p-4 flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search categories..."
            className="dark:bg-dark-900 h-11 w-full md:w-1/3 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={() => navigate("/add-category")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Category
          </Button>
        </div>

        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {["Category Name", "Description", "Status", "Actions"].map((heading) => (
                <TableCell
                  key={heading}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-xs uppercase dark:text-gray-400"
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {filteredCategories.map((category:any) => (
              <TableRow key={category.id}>
                <TableCell className="px-5 py-4 text-start">{category.name}</TableCell>
                <TableCell className="px-5 py-4 text-start">{category.description}</TableCell>
                <TableCell className="px-5 py-4 text-start">
                  <ToggleSwitch
                    checked={category.status}
                    onChange={() => handleToggleStatus(category)}
                  />
                </TableCell>
                <TableCell className="px-5 py-4 text-start flex gap-2">
                  <button
                    onClick={() => navigate(`/edit-category/${category.id}`)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllProductCategories;