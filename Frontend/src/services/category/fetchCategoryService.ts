import axios from "axios";

// API call for fetching all the category
export const fetchCategoryAPI = async () => {
  try {
    const response = await axios.get("http://localhost:3000/category/");
    return response;  // Return the response data if successful
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error fetching category:", error);
    throw error;  // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }
};