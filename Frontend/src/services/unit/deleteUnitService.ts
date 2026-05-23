import axios from 'axios';
interface Unit {
  id: number;
  name: string;
  pcs?: string;
}
export const deleteUnitAPI = async (data: Unit) => {
  try {
    const response = await axios.delete(`http://localhost:3000/unit/${data.id}`);
    return response;
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error adding supplier:", error);
    throw error; // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }

}
