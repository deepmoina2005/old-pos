import axios from 'axios'
interface Unit {
  name: string;
  pcs?: string;
}
export const addUnitAPI = async (data: Unit) => {
  try {
    const response = await axios.post("http://localhost:3000/unit", data);
    return response;
  } catch (error) {
    console.error("Error while adding ", error);
    throw error;
  }
}