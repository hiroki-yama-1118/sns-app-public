/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import TimelinePage from "../src/pages/timeline/index";
import { TimelineDetailPage } from "../src/components/Timeline/TimelineDetail";
import { render, screen } from "@testing-library/react";
import { Timeline } from "../src/types/type";

// describeでテストのタイトルを定義
describe("Timeline Page Test", () => {
  type Props = {
    detailData: Timeline; //タイムライン詳細データ
    success: () => void; //データの更新
  };
  let dummyProps: Props;

  // itでテストケースを定義
  it("タイムライン詳細ページが上手く表示されるか", () => {
    // ダミーのpropsを定義

    const timelineData = {
      id: 1,
      userId: 1,
      accountName: "佐藤",
      userPhotoPath: "user1.jpeg",
      sentence: "テスト投稿",
      likeCount: 3,
      commentCount: 5,
      updatedTime: "2020-01-01",
      postedTime: "2000-10-10",
      deleted: false,
      myLike: false,
    };

    const successData = () => {
      alert("成功");
    };

    dummyProps = {
      detailData: timelineData,
      success: successData,
    };

    // ダミーのpropsを渡してコンポーネントをレンダー
    render(<TimelineDetailPage {...dummyProps} />);
    // expectで検証したい内容を記述
    expect(screen.getByText("佐藤")).toBeInTheDocument();
    expect(screen.getByText("テスト投稿")).toBeInTheDocument();
  });
});
