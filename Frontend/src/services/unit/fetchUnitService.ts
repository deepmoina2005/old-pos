import axios from 'axios';

export const fetchUnitAPI = async () => {
  try {
    const response = await axios.get("http://localhost:3000/unit");
    return response;
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error adding supplier:", error);
    throw error; // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }

}
