import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo } from "react";
import useSWR from "swr";
import { Restaurant } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { GoogleMap } from "./GoogleMap";
import { Star } from "./Star";

/**
 * 店詳細画面のメイン部分のコンポーネント.
 */
export const RestaurantDetailContainer: FC = memo(() => {
  const router = useRouter();

  // idをURLから取得
  const restaurantId = Number(router.query.id);

  const { data, error } = useSWR(`${JAVA_API_URL}/restaurant/${restaurantId}`);

  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  // レストラン情報をdataから抽出
  const restaurant: Restaurant = data.restaurant;

  /**
   * タイプのidから文字列に変換する.
   * @returns 店内かお弁当か両方か
   */
  const typeValue = () => {
    if (restaurant.type === 1) {
      return "店内";
    } else if (restaurant.type === 2) {
      return "お弁当";
    } else if (restaurant.type === 3) {
      return "両方";
    }
  };

  return (
    <div className="flex-col mx-5 xl:mx-24 lg:w-2/3">
      <p className="text-lg lg:text-3xl font-extrabold border-l-8 border-basic mb-5">
        {restaurant.name}
      </p>
      <div className="flex flex-col sm:flex-row items-baseline">
        <span className="mr-8 mb-5 sm:mb-0">
          <Star starCount={restaurant.star} />
        </span>
        ジャンル: {restaurant.genreValue}
        <span className="sm:ml-8">タイプ: {typeValue()}</span>
      </div>
      <div className="mt-5 sm:mt-10">
        <div>
          <Image
            src={`/${restaurant.photoPath}`}
            width={300}
            height={200}
            alt="restaurant photo"
          />
        </div>
        <div className="mt-10">{restaurant.description}</div>
      </div>
      <p className="mt-10">住所: {restaurant.address}</p>
      <p className="mt-10">アクセス: {restaurant.access}</p>
      {/* 緯度と軽度から、googleマップを表示 */}
      <div className="w-5/6 mx-auto">
        <p className="mt-10">Map</p>
        <GoogleMap
          latitude={restaurant.latitude}
          longitude={restaurant.longitude}
        />
      </div>
      <p className="my-10 break-all">
        ホットペッパーURL:
        <div>
          <a href={restaurant.url}>{restaurant.url}</a>
        </div>
      </p>
    </div>
  );
});
