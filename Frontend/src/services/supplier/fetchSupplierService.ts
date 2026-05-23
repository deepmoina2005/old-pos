import axios from "axios";

export const fetchSupplierAPI = async () => {
  try {
    const response = await axios.get("http://localhost:3000/supplier");
    return response; // Return the response data if successful
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error fetching supplier:", error);
    throw error; // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }
}
