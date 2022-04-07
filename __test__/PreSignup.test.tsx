import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { initTestHelpers } from "next-page-tester";
import { getPage } from "next-page-tester";

initTestHelpers();

describe("仮登録画面のテスト", () => {
  it("仮登録場面表示テスト", async () => {
    const { page } = await getPage({
      route: "/auth/presignup",
    });
    render(page);
    expect(await screen.findByText("仮登録フォーム"));
  });
});
