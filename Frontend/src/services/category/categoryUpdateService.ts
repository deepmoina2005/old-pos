import axios from "axios";
interface CategoryData {
  id:number;
  name?: string;
  status?:number;
  description?: string; // Assuming it's a string, but you might want a Date type depending on your use case
}
// API call for adding a new category
export const updateCategoryAPI = async (data:CategoryData) => {
  try {
    const response = await axios.put(`http://localhost:3000/category/${data.id}`,data);
    return response;  // Return the response data if successful
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error fetching category:", error);
    throw error;  // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }
};