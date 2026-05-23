import axios from "axios";

interface SupplierData{
    name: string;
    phone: string;
    address: string; // Adjust the type if needed (Date, String, etc.)
}
export const addSupplierAPI = async (data: SupplierData) => {
  try {
    const response = await axios.post("http://localhost:3000/supplier",data);
    return response.data; // Return the response data if successful
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error adding supplier:", error);
    throw error; // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }
}