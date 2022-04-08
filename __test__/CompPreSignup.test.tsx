/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { initTestHelpers } from "next-page-tester";
import { getPage } from "next-page-tester";
import { userEvent } from "@storybook/testing-library";

initTestHelpers();

describe("仮登録完了画面のテスト", () => {
  it("仮登録完了画面表示と仮登録画面への遷移テスト", async () => {
    const { page } = await getPage({
      route: "/auth/comppresignup",
    });
    render(page);
    expect(
      await screen.findByText(
        "ご登録いただいたメールアドレス宛にメールを送信しました",
      ),
    ).toBeInTheDocument();
    expect(await screen.findAllByText("コチラ"));
    userEvent.click(screen.getByText("コチラ"));
    expect(await screen.findByText("仮登録フォーム")).toBeInTheDocument();
  });
});
