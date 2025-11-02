import axios from "axios";
import { BASE_URL } from "../../constant/config";

export const postLoginUser = async (payload) => {
  console.log("payload", payload);
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    BASE_URL + `/users/auth/login`,
    payload,
    options
  );
  // Check if the response is successful

  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
  } else if (response.status !== 200) {
    throw new Error(response.data.error || "Login failed");
  }
  return response.data;
};

export const postRegisterUser = async (payload) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    BASE_URL + `/users/auth/signup`,
    payload,
    options
  );

  // Check if the response is successful
  if (response.status !== 200) {
    throw new Error(response.data.error || "Signup failed");
  }

  return response.data; // Adjust according to your API response
};
