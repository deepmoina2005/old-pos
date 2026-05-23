import axios from "axios";

// Type for category data
interface CategoryData {
    id:number,
  name: string;
  description: string; // Assuming it's a string, but you might want a Date type depending on your use case
}

// API call for adding a new category
export const deleteCategoryAPI = async (data: CategoryData) => {
  try {
    const response = await axios.delete(`http://localhost:3000/category/${data.id}`);
    return response.data;  // Return the response data if successful
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error adding category:", error);
    throw error;  // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }
};