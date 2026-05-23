import axios from 'axios';

export const deleteProductAPI = async (data: number) => {
  try {
    const response = await axios.delete(`http://localhost:3000/unit/${data}`);
    return response;
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error adding supplier:", error);
    throw error; // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }

}
