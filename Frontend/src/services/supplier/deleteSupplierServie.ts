import axios from "axios";
interface SupplierData {
  id: number;
  name:string;
 } // Assuming you have an ID to identify the supplier
export const deleteSupplierAPI = async (data: SupplierData) => {
  try {
    const response = await axios.delete(`http://localhost:3000/supplier/${data.id}`);
    return response.data; // Return the response data if successful
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error deleting supplier:", error);
    throw error; // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }
}