import { BASE_URL } from "../config/config";

export const getComps = async () => {
  try {
    const response = await fetch(BASE_URL + "/computers");
    const comps = await response.json();
    return comps;
  } catch (error) {
    console.log(error);
  }
};

export const createComp = async ({
  name,
  description,
  image,
  price,
  genre,
}) => {
  try {
    const response = await fetch(BASE_URL + "/computers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, description, image, price, genre }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteComp = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/computers/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCompById = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/computers/" + id);
    const comp = await response.json();
    return comp;
  } catch (error) {
    console.log(error);
  }
};
