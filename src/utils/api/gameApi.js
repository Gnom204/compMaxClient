import { BASE_URL } from "../config/config";

export const getGames = async () => {
  try {
    const response = await fetch(BASE_URL + "/games");
    const games = await response.json();
    return games;
  } catch (error) {
    console.log(error);
  }
};

export const createGame = async ({
  name,
  genre,
  description,
  price,
  image,
}) => {
  console.log({ name, genre, description, price, image });
  try {
    const response = await fetch(BASE_URL + "/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, genre, description, price, image }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteGame = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/games/" + id, {
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

export const getGameById = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/games/" + id);
    const game = await response.json();
    return game;
  } catch (error) {
    console.log(error);
  }
};
