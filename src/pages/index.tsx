import type { NextPage } from "next";
import Link from "next/link";
import { Button } from "../components/Button";
import { MenuBar } from "../components/MenuBar";

const Home: NextPage = () => {
  return (
    <>
      {" "}
      <div className="flex">
        <MenuBar label="メニューバー"></MenuBar>
        <div className="flex-col items-center mt-10 flex">
          <p className="font-mono text-text-brown">
            ランチックスを作るよ テスト
          </p>
          <Button
            label="ボタン"
            onClick={() => {
              alert("ボタンが押されました");
            }}
          />
          <Button
            backgroundColor="#f6f0ea"
            color="#622d18"
            label="SubButton"
            onClick={() => {
              alert("サブ");
            }}
            size="md"
          />
          <Link href="/aaa/test">
            <a className="underline hover:text-blue-800 mt-3">リンクです</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
