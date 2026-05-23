import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

// API for login
export const loginAPI = async (data: LoginData) => {
  const response = await axios.post("http://localhost:3000/auth/login", data);
  return response.data;
};