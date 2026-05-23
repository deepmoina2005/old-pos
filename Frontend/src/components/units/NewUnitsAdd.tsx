/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { addUnitAction, resetAddCategoryState } from "../../redux/slices/unit/addUnitSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import toast from "react-hot-toast";

const NewUnitsAdd = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [unitName, setUnitName] = useState("");
  const [pcs, setPcs] = useState("");

  const { isSuccess } = useSelector((state: RootState) => state.addUnit);
  const handleSubmit = async () => {

    try {
      const newUnit = {
        name: unitName,
        pcs,
      };

      const { payload } = await dispatch(addUnitAction(newUnit));

      if (payload.message) {
        toast.success("Unit added successfully!");
        setUnitName("");
        setPcs("");
      } else {
        toast.error("Failed to add unit.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(resetAddCategoryState())
    }
  }, [isSuccess, dispatch]);
  return (
    <ComponentCard title="Add New Unit">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Unit Name</Label>
          <Input
            placeholder="Enter Unit Name"
            type="text"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
          />
        </div>

        <div>
          <Label>Pcs</Label>
          <Input
            placeholder="Enter PCS"
            type="text"
            value={pcs}
            onChange={(e) => setPcs(e.target.value)}
          />
        </div>
        <div className="md:col-span-2 flex justify-start">
          <Button
            onClick={handleSubmit}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            Add Unit
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default NewUnitsAdd;