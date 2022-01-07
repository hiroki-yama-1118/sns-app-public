import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo } from "react";
import { CommentIcon } from "../CommentIcon";
import { FavoBtn } from "../FavoBtn";

type Props = {
  id: number;
  name: string;
  genre: string;
  type: string;
  favarite: number;
  img: string;
};

export const RestaurantCard: FC<Props> = memo((props) => {
  const { id, name, genre, type, img } = props;
  const router = useRouter();

  /**
   * 個別の店情報ページへ遷移するメソッド.
   */
  const goRestaurantDetail = () => {
    router.push(`/lunch/restaurant/${id}`);
  };

  return (
    <div
      onClick={goRestaurantDetail}
      className="flex justify-between w-full px-10 py-5 relative h-auto border border-t-0 border-gray-200 cursor-pointer"
    >
      <div className="relative">
        <p className="text-xl font-extrabold border-l-8 border-basic mb-10 hover:underline">
          {name}
        </p>
        <div className="ml-10">ジャンル: {genre}</div>
        <div className="ml-10">タイプ: {type}</div>
        <div className="ml-10">おすすめ度: ⭐️⭐️⭐️⭐️⭐️</div>
        <div className="absolute bottom-3 left-3">
          <CommentIcon commentCount={300} />
          <FavoBtn />
        </div>
      </div>
      <div className="mx-6 mt-3">
        <Image src={img} width={300} height={200} alt="icon" />
      </div>
    </div>
  );
});