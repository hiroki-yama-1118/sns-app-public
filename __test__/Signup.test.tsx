/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { initTestHelpers } from "next-page-tester";
import { getPage } from "next-page-tester";
import { userEvent } from "@storybook/testing-library";
import { setupServer } from "msw/node";
import { rest } from "msw";
import "mutationobserver-shim";
import { useSignup } from "../src/hooks/useSignup";

initTestHelpers();

const handlers = [
  rest.post("http://localhost:8080/signup", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("http://localhost:8080/mail/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "たなか",
          email: "test@test",
        },
      ]),
    );
  }),
];

// jest.mock("../src/hooks/useSignup");

describe("本登録画面のテスト", () => {
  //擬似的なサーバーを作る
  const server = setupServer(...handlers);
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => {
    server.close();
  });

  it("登録入力フォーム未入力のテスト", async () => {
    // const { page } = await getPage({
    //   route: "/auth/signup/1",
    // });
    // render(page);
    // screen.debug();
    // userEvent.click(screen.getByText("本登録フォーム"));
    // expect(await screen.findAllByText("姓名を入力してください"));
    // expect(await screen.findAllByText("名前を入力してください"));
    // expect(await screen.findAllByText("メールアドレスを入力してください"));
    // expect(mockPreSignup).not.toBeCalled(); //モックが一度も呼ばれていない
  });
  // it("仮登録成功時の画面テスト", async () => {
  //   const { page } = await getPage({
  //     route: "/auth/signup",
  //   });
  //   render(page);
  //   expect(await screen.findByText("仮登録フォーム")).toBeInTheDocument();
  //   userEvent.type(screen.getByPlaceholderText("姓"), "田中");
  //   userEvent.type(screen.getByPlaceholderText("名"), "太郎");
  //   userEvent.type(screen.getByPlaceholderText("メールアドレス"), "test");
  //   userEvent.click(screen.getByText("仮登録"));
  //   expect(await screen.findByTestId("loading"));
  // });
});
