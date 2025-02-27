import { BASE_URL } from "../config/config";

export const loadImage = async (file) => {
  try {
    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: file,
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
