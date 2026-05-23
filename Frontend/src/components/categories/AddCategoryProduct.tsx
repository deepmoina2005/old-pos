import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { addCategoryAction, resetAddCategoryState } from "../../redux/slices/category/categoryListSlice.ts";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";

interface CategoryData {
  name: string;
  description: string;
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

const AddCategoryProduct = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useSelector((state: RootState) => state.addCategory);

  const handleSubmit = () => {
    // Basic validation
    if (!categoryName) {
      alert("Category Name is required!");
      return;
    }

    const newCategory: CategoryData = {
      name: categoryName,
      description: description,
    };

    dispatch(addCategoryAction(newCategory));

    // Reset form fields
    setCategoryName("");
    setDescription("");
  };

  // Navigate on successful add
  useEffect(() => {
    if (isSuccess) {
      navigate("/all-categories");
      dispatch(resetAddCategoryState()); // Reset success state after navigation
    }
  }, [isSuccess, navigate, dispatch]);
  

  return (
    <ComponentCard title="Add New Category">
      <div className="space-y-6">
        <div>
          <Label>Category Name</Label>
          <Input
            placeholder="Enter Category Name"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div>
          <Label>Description</Label>
          <TextArea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e)} // Fixed onChange handler
          />
        </div>

        <div className="flex items-center justify-between mt-5">
          <Label>Status</Label>
          <ToggleSwitch
            checked={status}
            onChange={() => setStatus(!status)}
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            {isLoading ? "Adding..." : "Add Category Product"}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddCategoryProduct;
