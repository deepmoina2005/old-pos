import axios from "axios";

// Type for product data (no images)
export interface ProductData {
  name: string;
  selling_price: number;
  unit_id: number;
  brand: string;
  category_id: number;
}

// API call to add product without image
export const addProductAPI = async (productData: ProductData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/product/add",
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
