import { useState, useCallback, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Button } from "../../../components/Button/Button";
import { PostModal } from "../../../components/Modal/PostModal";
import { ReviewList } from "../../../components/Lunch/ReviewList";
import { RestaurantDetailContainer } from "../../../components/Lunch/RestaurantDetailContainer";
import { SubHeader } from "../../../components/Layout/SubHeader";
import { Restaurant } from "../../../types/type";
import { JAVA_API_URL } from "../../../utils/const";
import { loginIdContext } from "../../../providers/LoginIdProvider";
import { useSWRReviews } from "../../../hooks/useSWRReviews";
import { useModal } from "../../../hooks/useModal";

/**
 * お店情報の詳細を表示するページ.
 *
 * @returns お店情報の詳細を表示する画面
 */
const RestaurantDetail: NextPage = () => {
  const router = useRouter();

  // ログインユーザーのハッシュ値
  const { hash } = useContext(loginIdContext);

  // レビュー一覧を再検証・再取得する関数をhooksから取得
  const { reviewsMutate } = useSWRReviews(hash);

  const { modalStatus, openModal, closeModal } = useModal();

  // idをURLから取得
  const restaurantId = Number(router.query.id);

  const { data, error, mutate } = useSWR(
    `${JAVA_API_URL}/restaurant/${restaurantId}`,
  );

  /**
   * 店詳細の情報を更新するメソッド.
   *
   * @remarks
   * レビュー投稿が成功すると呼ばれる。
   */
  const updateData = useCallback(() => {
    reviewsMutate(); // レビュー一覧を再検証・再取得する
    mutate(); // レストラン情報を再検証・再取得する
  }, [mutate, reviewsMutate]);

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

  return (
    <div className="flex">
      <div className="flex-1">
        <SubHeader title="ランチ店詳細" />
        <div
          className="cursor-pointer m-5"
          onClick={() => {
            router.back();
          }}
        >
          ←戻る
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* メインの店情報表示部分 */}
          <RestaurantDetailContainer restaurant={restaurant} />

          {/* レビューエリア */}
          <div className="lg:w-1/3 mt-10 sm:ml-auto">
            <div className="font-bold ml-3">
              この店へのレビュー
              <span className="ml-5">
                <Button label={"レビュー投稿"} size="sm" onClick={openModal} />
              </span>
            </div>
            <ReviewList restaurantId={restaurantId} />
            <PostModal
              isOpen={modalStatus}
              closeModal={closeModal}
              title={"レビュー"}
              restaurantId={restaurantId}
              success={updateData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
