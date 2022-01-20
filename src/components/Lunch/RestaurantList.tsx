import { FC, memo } from "react";
import useSWR from "swr";
import { Restaurant } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantList: FC = memo(() => {
  const { data: restaurantList, error } = useSWR(`${JAVA_API_URL}/restaurant`);
  console.log(restaurantList);

  if (!error && !restaurantList) {
    return <div className="w-full p-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-full p-10 text-center">データが取得できませんでした</div>;
  }

  if (restaurantList.message === "レストランが1件も登録されていません") {
    return (
      <div className="w-full p-10 text-center">お店が1件も登録されていません🙇‍♀️</div>
    );
  }
  return (
    <div className="w-full">
      {restaurantList?.map((restaurant: Restaurant) => (
        <div key={restaurant.restaurantId}>
          <RestaurantCard {...restaurant} />
        </div>
      ))}
    </div>
  );
});
