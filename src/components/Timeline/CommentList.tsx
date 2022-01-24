import { FC, memo, useContext } from "react";
import Image from "next/image";
import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import { Timeline } from "../../types/type";
import { useRouter } from "next/router";
import { loginIdContext } from "../../providers/LoginIdProvider";

type Props = { commentList: Timeline; getData?: () => void };

export const CommentList: FC<Props> = memo((props) => {
  const { commentList, getData } = props;

  //ログインID
  const loginId = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  return (
    <>
      {commentList ? (
        <div>
          {commentList.map((value, key) => (
            <div key={key} className="flex  border border-t-0 border-gray-200">
              <div className="w-1/5 text-center pt-5 cursor-pointer hover:opacity-50">
                <Image
                  src={`/image/userIcon/${value.userPhotoPath}`}
                  width={100}
                  height={100}
                  alt="icon"
                  onClick={() => {
                    goUserPage(value.userId);
                  }}
                  className="rounded-full"
                />
              </div>
              <div className="w-4/5">
                <div className="text-xl font-extrabold py-3 ml-3">
                  {value.accountName}
                </div>
                <div className="pt-5 pb-5 pl-5 w-8/12">{value.sentence}</div>
                <div className="w-full text-right py-3 pr-5">
                  <FavoBtn
                    postId={value.id}
                    favoCount={value.likeCount}
                    getData={getData}
                    isFavo={value.myLike}
                  />
                  {loginId == value.userId && <TrashBtn postId={value.id} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-10">コメントはありません</div>
      )}
    </>
  );
});
