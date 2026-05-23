import { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import toast from "react-hot-toast";
import Button from "../ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { addProductAction,resetProductState } from "../../redux/slices/product/productSlice.ts";
import { ProductData } from "../../services/product/addProductService";
import { fetchUnitAction } from "../../redux/slices/unit/unitSlice";
import { fetchCategoryAction } from "../../redux/slices/category/categoryListSlice";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<number | null>(null);
  const [unit, setUnit] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const allCategory = useSelector(
    (state: RootState) => state.categoryList.categories
  );
  const allUnits = useSelector((state: RootState) => state.unitList.units);
  const isSuccess = useSelector((state : RootState) => state.productList.isSuccess); 

  useEffect(() => {
    dispatch(fetchUnitAction());
    dispatch(fetchCategoryAction());
    if(isSuccess) resetProductState();
  }, [dispatch]);

  const categories = allCategory.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const unitOptions = allUnits.map((u) => ({
    value: u.id,
    label: u.name,
  }));

  const handleSubmit = async () => {
    if (!productName || !productPrice || !category || !unit) {
      toast.error("Please fill in all required fields.");
      console.log(unit)
      return;
    }

    const newProduct: ProductData = {
      name: productName,
      selling_price: productPrice,
      unit_id: unit,
      brand,
      category_id: category,
    };

    try {
      const result = await dispatch(
        addProductAction({ productData: newProduct })
      );

      if (result.payload) {
        toast.success("Product added successfully");

        // Reset form
        setProductName("");
        setProductPrice(0);
        setBrand("");
        setCategory(null);
        setUnit(null);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <ComponentCard title="Add New Product">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Product Name</Label>
          <Input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <Label>Product Price</Label>
          <Input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <Label>Brand</Label>
          <Input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div>
          <Label>Category</Label>
          <Select
            options={categories}
            placeholder="Select Category"
            value={categories.find((opt) => opt.value === category) || null}
            onChange={(val) => setCategory(val ?? null)}
            isClearable
          />
        </div>

        <div>
          <Label>Unit</Label>
          <Select
            options={unitOptions}
            placeholder="Select Unit"
            value={unitOptions.find((opt) => opt.value === unit) || null}
            onChange={(val) => setUnit(val ?? null)}
            isClearable
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            Add Product
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddProduct;

