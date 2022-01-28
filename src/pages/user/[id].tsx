/* eslint-disable prefer-const */
import { useCallback, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import useSWR from "swr";
import Image from "next/image";

import { Button } from "../../components/Button/Button";
import { SubHeader } from "../../components/Layout/SubHeader";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../utils/const";
import { Timeline, Title, UserInfo } from "../../types/type";



/**
 * ユーザー情報画面
 * @returns ユーザー情報を表示するページ
 */
const User: NextPage = () => {
  //ログインID
  const { loginId } = useContext(loginIdContext);
  const { hash } = useContext(loginIdContext);
  //ルーターリンク
  const router = useRouter();

  //URLの後ろからid取得
  const userId = Number(router.query.id);

  //編集ボタンを押した時に呼ばれる
  const editInfo = () => {
    router.push("/user/edit");
  };

  /**
   * 押下投稿の詳細に画面遷移.
   * @remarks IDによって遷移先をタイムラインページかレビューページに分ける
   */
  const goDetailPage = useCallback((postId: number) => {
    if (postId > 100) {
      router.push(`/timeline/${postId}`);
    } else {
      router.push(`/lunch/review/${postId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * APIで初期表示用データ取得.
   */
  const { data: payload, error } = useSWR(
    `${JAVA_API_URL}/user/${userId}/${hash}`,
  );

  const userDatas = payload?.user;
  const userData: UserInfo = userDatas;

  if (!error && !userDatas) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  //タブのタイトル
  const categories: Array<Title> = [
    { id: 1, title: "つぶやき" },
    { id: 2, title: "投稿" },
    { id: 3, title: "いいね履歴つぶやき" },
    { id: 4, title: "いいね履歴投稿" },
    { id: 5, title: "いいね履歴コメント" },
  ];

  return (
    <>
      <div className="flex mb-3">
        {/* ユーザー情報 */}
        <div className="w-full">
          <SubHeader title="ユーザー情報" />
          <div className="border-solid  border-2 border-bgc-200 m-3 shadow-lg rounded-md">
            {userData && (
              <div className=" text-center">
                <div className="mt-1 text-xl font-bold">
                  アカウント名:{userData.accountName}
                </div>
                <div className="w-12/12">
                  <Image
                    src={`/image/userIcon/${userData.userPhotoPath}`}
                    width={80}
                    height={80}
                    alt="icon"
                    className="rounded-full"
                  ></Image>
                </div>
                <div>
                  <div>名前:{userData.name}</div>
                  <div>入社日:{userData.hireDate}</div>
                  <div>職種:{userData.serviceFk}</div>
                  <div>誕生日:{userData.birthDay}</div>
                  <div>自己紹介:{datas.introduction}</div>
                </div>
              </div>
            )}
            {userId == loginId && (
              <div className="text-right mr-10 mb-5">
                <Button
                  label="プロフィール編集"
                  backgroundColor="#f28728"
                  color="white"
                  size="md"
                  onClick={editInfo}
                />
              </div>
            )}
          </div>

          <div className="w-full text-center mb-2">
            <Button
              label="投稿を再読み込み"
              size="lg"
              onClick={() => {
                alert("新しいつぶやき読み込み");
              }}
            />
          </div>

          {/* タブ（履歴表示欄） */}
          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1  rounded-xl shadow-lg ">
                {categories.map((category) => (
                  <Tab
                    key={category.id}
                    className="w-full py-2.5 text-xs font-bold  text-bgc rounded-lg bg-text-brown focus:text-basic focus:bg-bgc hover:text-basic "
                  >
                    {category.title}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                {/* <Tab.Panel
                  key={time.id}
                  className="bg-bgc shadow-lg  rounded-xl p-3 focus:outline-none "
                >
                  <div>
                    {timelineDatas.TimelineList.map((time: any) => (
                      <div
                        key={timelineDatas.TimelineList.id}
                        className=" border border-t-1 mt-1 border-blue-100text-sm font-medium leading-5 focus:outline-none rounded-xl bg-white relative p-3 hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
                        onClick={() => {
                          goDetailPage(timelineDatas.TimelineList.id);
                        }}
                      >
                        {time.sentence}
                      </div>
                    ))}
                  </div>
                </Tab.Panel> */}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
