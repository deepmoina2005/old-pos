import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";
import TextArea from "../form/input/TextArea";
import DatePicker from "../form/date-picker";
import axios from "axios";
import ReactSelect from "react-select";

const AddPurchaseProduct = () => {
  const [supplier, setSupplier] = useState<string>("");
  const [taxRate, setTaxRate] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [paymentType, setPaymentType] = useState<number | string>("");
  const [status, setStatus] = useState<number | string>("");
  const [purchaseDate, setPurchaseDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);

  // Demo suppliers data
  const suppliers = [
    { value: "S001", label: "Supplier A" },
    { value: "S002", label: "Supplier B" },
    { value: "S003", label: "Supplier C" },
  ];

  // Demo products data
  const products = [
    { value: "P001", label: "Eco-Friendly Notebook" },
    { value: "P002", label: "Recycled Plastic Bottle" },
    { value: "P003", label: "Organic Cotton T-Shirt" },
    { value: "P004", label: "Reusable Bamboo Straw" },
    { value: "P005", label: "Compostable Phone Case" },
    { value: "P006", label: "Sustainable Wooden Spoon" },
    { value: "P007", label: "Solar Powered Charger" },
    { value: "P008", label: "Upcycled Denim Bag" },
    { value: "P009", label: "Plant-Based Soap Bar" },
    { value: "P010", label: "Biodegradable Trash Bags" },
  ];

  // Function to calculate the Grand Total
  const calculateGrandTotal = () => {
    const total = quantity * pricePerUnit;
    const totalWithTax = total + total * (taxRate / 100);
    const finalTotal = totalWithTax + shipping - discount;
    setGrandTotal(finalTotal);
  };

  const handleSubmit = async () => {
    try {
      const newPurchase = {
        supplier,
        taxRate,
        shipping,
        discount,
        grandTotal,
        receivedAmount,
        notes,
        paymentType,
        status,
        purchaseDate,
        productId,
      };

      const { data } = await axios.post("/api/purchase/add", newPurchase);

      if (data.success) {
        toast.success(data.message);

        // Reset the form fields after success
        setSupplier("");
        setTaxRate(0);
        setShipping(0);
        setDiscount(0);
        setGrandTotal(0);
        setReceivedAmount(0);
        setNotes("");
        setPaymentType("");
        setStatus("");
        setPurchaseDate("");
        setMessage("");
        setProductId("");
        setQuantity(0);
        setPricePerUnit(0);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <ComponentCard title="Add New Purchase">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Select with Search */}
        <div>
          <Label>Select Product</Label>
          <ReactSelect
            options={products}
            placeholder="Select or search product..."
            onChange={(selectedOption) =>
              setProductId(selectedOption?.value || "")
            }
            isClearable
            isSearchable
            styles={{
              control: (base, { isFocused }) => ({
                ...base,
                backgroundColor: "#0000", // Tailwind bg-blue-50
                borderColor: isFocused ? "#3b82f6" : "#d1d5db", // blue-500 or gray-300
                boxShadow: isFocused
                  ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
                  : "none", // blue-500 focus ring
                "&:hover": { borderColor: "#3b82f6" },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "white",
                color: "black",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#6b7280", // gray-500
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>

        {/* Product Expiry Date Picker */}
        <div>
          <Label>Product Expiry</Label>
          <DatePicker
            id="date-picker"
            placeholder="Select a date"
            onChange={(dates, currentDateString) => {
              console.log({ dates, currentDateString });
            }}
          />
        </div>

        {/* Quantity */}
        <div>
          <Label>Quantity</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
              calculateGrandTotal();
            }}
          />
        </div>

        {/* Price Per Unit */}
        <div>
          <Label>Price Per Unit</Label>
          <Input
            type="number"
            value={pricePerUnit}
            onChange={(e) => {
              setPricePerUnit(Number(e.target.value));
              calculateGrandTotal();
            }}
          />
        </div>

        {/* Supplier Select */}
        <div>
          <Label>Supplier</Label>
          <Select
            options={suppliers}
            placeholder="Select Supplier"
            onChange={(val) => setSupplier(val)}
          />
        </div>

        {/* Tax Rate */}
        <div>
          <Label>Tax Rate (%)</Label>
          <Input
            type="number"
            value={taxRate}
            onChange={(e) => {
              setTaxRate(Number(e.target.value));
              calculateGrandTotal();
            }}
          />
        </div>

        {/* Shipping */}
        <div>
          <Label>Shipping</Label>
          <Input
            type="number"
            value={shipping}
            onChange={(e) => {
              setShipping(Number(e.target.value));
              calculateGrandTotal();
            }}
          />
        </div>

        {/* Discount */}
        <div>
          <Label>Discount</Label>
          <Input
            type="number"
            value={discount}
            onChange={(e) => {
              setDiscount(Number(e.target.value));
              calculateGrandTotal();
            }}
          />
        </div>

        {/* Grand Total */}
        <div>
          <Label>Grand Total</Label>
          <Input type="number" value={grandTotal} disabled />
        </div>

        {/* Payment Type */}
        <div>
          <Label>Payment Type</Label>
          <Select
            options={[
              { value: "cash", label: "Cash" },
              { value: "credit", label: "Credit" },
            ]}
            placeholder="Select Payment Type"
            onChange={(val) => setPaymentType(val)}
          />
        </div>

        {/* Status */}
        <div>
          <Label>Status</Label>
          <Select
            options={[
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
            placeholder="Select Status"
            onChange={(val) => setStatus(val)}
          />
        </div>

        {/* Notes */}
        <div className="space-y-6 md:col-span-2">
          <div>
            <Label>Description</Label>
            <TextArea
              value={message}
              onChange={(value) => setMessage(value)}
              rows={6}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            Purchase Product
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddPurchaseProduct;