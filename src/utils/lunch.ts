import fetch from "node-fetch";
import type { Restaurant } from "../types/type";
import { JAVA_API_URL } from "./const";
import { orderOptions, searchGenreOptions, searchTypeOptions } from "./options";

/**
 * 全てのレストランのIDを取得するメソッド.
 * @returns 
 */
export const getAllRestaurantsIds: () => Promise<{
  params: {
    id: string;
  };
}[]> = async () => {
  const url = encodeURI(`${JAVA_API_URL}/restaurant?order=${orderOptions[0].name}&genre=${searchGenreOptions[0].id}&type=${searchTypeOptions[0].id}`);
  const res = await fetch(url);
  const json = await res.json();
  const restaurants: Array<Restaurant> = json.restaurant;

  return restaurants.map((restaurant: Restaurant) => {
    return {
      params: {
        id: String(restaurant.id),
      },
    };
  });
};

/**
 * 特定のidを使ってレストラン情報を取得するメソッド.
 * 
 * @param id レストランID
 * @returns レストラン情報
 */
export const getRestaurantData = async (id: number) => {
  const res = await fetch(`${JAVA_API_URL}/restaurant/${id}`);
  const restaurantData = await res.json();

  return restaurantData;
};