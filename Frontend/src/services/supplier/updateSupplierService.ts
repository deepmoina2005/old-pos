import axios from "axios";
interface SupplierData {
  id: number; // Assuming you have an ID to identify the supplier
name?: string;
phone?: string;
address?: string; // Adjust the type if needed (Date, String, etc.)
}
export const updateSupplierAPI = async (data: SupplierData) => {
  try {
    const response = await axios.put(`http://localhost:3000/supplier/${data.id}`, data);
    return response; // Return the response data if successful
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error updating supplier:", error);
    throw error; // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }
}