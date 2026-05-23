import axios from 'axios';

export const updateProductAPI = async (data: number) => {
  try {
    const response = await axios.delete(`http://localhost:3000/product/${data}`);
    return response
  } catch (error) {
    console.error("Error:" + error);
  }

}
