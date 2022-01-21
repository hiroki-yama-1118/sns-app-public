import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { FC, useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "../../../components/Button/Button";
import { TextInput } from "../../../components/Form/TextInput";
import { useRouter } from "next/router";
import { JAVA_API_URL } from "../../../utils/const";
import { SelectBox } from "../../../components/Form/SelectBox";
import { AddByHotpepper } from "../../../components/Lunch/AddByHotpepper";
import toast from "react-hot-toast";
import { Restaurant } from "../../../types/type";
import { AddManuallyForm } from "../../../components/Lunch/AddManuallyForm";
import Link from "next/link";

const RestaurantAdd: FC = () => {
  const router = useRouter();
  // 店名で検索するキーワード
  const [searchName, setSearchName] = useState<string>("");

  // データベースに登録済みの店一覧
  const [restautrantsInDB, setRestaurantsInDB] = useState<Array<Restaurant>>(
    [],
  );

  // ホットペッパーからの検索結果
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [hotpeppers, setHotpeppers] = useState<Array<any>>([]);

  // 検索ボタンが押されたかどうか
  const [hasClickedSearch, setHasClickedSearch] = useState<boolean>(false);

  // 登録するお店
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [restaurant, setRestaurant] = useState<any | null>();

  const [manually, setManually] = useState<boolean>(false);

  /**
   * 検索窓のonChangeイベント発動時に実行するメソッド.
   *
   * @remarks
   * setStateを使って検索文字列のstateを更新すると同時に、オートコンプリート検索を行うAPIを叩く
   */
  const inputRestaurantName = useCallback(
    async (e) => {
      setSearchName(e.target.value);

      // const res = await axios.get(`${JAVA_API_URL}/restaurant/search?name=${searchName}`);

      // setRestaurantsInDB(res.data.restaurants);
    },
    [searchName],
  );

  /**
   * ラーセンから1km以内かつ、店名で検索.
   * @remarks
   * &name_anyとすることで漢字でもかなでも検索できる
   */
  const searchByNameIn2km = async () => {
    if (searchName === "") {
      alert("検索文字列を入力してください");
      return;
    }

    // 作成したWebAPIエンドポイントを利用する
    // API Routeを使用することで、APIキーを隠せる
    const res = await axios.get(`/api/hotpepper?name_any=${searchName}`);
    console.log(res.data);

    setHotpeppers(res.data.shops);
    setHasClickedSearch(true);
  };

  /**
   * ホットペッパーからの検索結果から店を選択する.
   *
   * @param hotpepper - 選択した店の情報
   */
  const selectRestaurant = useCallback(
    async (hotpepper) => {
      // すでに登録されているホットペッパーIDかを確認し、登録済みなら詳細ページへ遷移
      // const res = await axios.get(
      //   `${JAVA_API_URL}/restaurants/hp/${hotpepper.id}`,
      // );
      // if (true) {
      //   // router.push(`/lunch/restaurant/${res.data.shop.id}`);
      //   router.push("/lunch/restaurant/1");
      //   toast("登録済みの為、詳細ページへ遷移しました", {
      //     // Custom Icon
      //     icon: "ℹ️",
      //   });
      //   return;
      // }

      alert("選択");
      setRestaurant(hotpepper);
      setHotpeppers([]);
    },
    [setRestaurant],
  );

  /**
   * ページを初期状態に戻す.
   */
  const clear = useCallback(() => {
    setSearchName("");
    setHotpeppers([]);
    setRestaurant(null);
    setHasClickedSearch(false);
    setManually(false);
  }, []);

  return (
    <div className="flex">
      <div className="p-10">
        <h1 className="text-3xl">お店を新規登録するページ</h1>
        <Link href="/lunch/restaurant/search">
          <a className="underline hover:text-blue-800 mt-3">お店を検索するページ</a>
        </Link>
        {/* 表示確認用の仮置き */}
        <AddManuallyForm clear={clear} />

        {/* ホットペッパーにある店を登録する画面 */}
        {restaurant && <AddByHotpepper restaurant={restaurant} clear={clear} />}
        {/* 手入力で店を登録する画面 */}
        {manually && <AddManuallyForm clear={clear} />}
      </div>
    </div>
  );
};

export default RestaurantAdd;
