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
import { LoginChecker } from "../src/components/Auth";
import { useEffect } from "react";

initTestHelpers();

const handlers = [
  rest.post("http://localhost:8080/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ hash: "123xyz" }));
  }),

  rest.get("http://localhost:8080/user/1/test", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "田中",
        hireDate: "2021-10-10",
        serviceFk: "FR",
        serviceName: "FR",
        accountName: "たなか",
        birthDay: "2010-10-10",
        introduction: "よろしく",
        userPhotoPath: "image1.jpg",
      }),
    );
  }),
];

describe("ユーザー画面のテスト", () => {
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

  it("ユーザー画面表示のテスト", async () => {
    // const { page } = await getPage({
    //   route: "/user/1",
    // });
    // render(page);
    // screen.debug();
    // expect(await screen.findByText("ユーザー情報")).toBeInTheDocument();
    // userEvent.type(screen.getByPlaceholderText("メールアドレス"), "user1");
    // userEvent.type(
    //   screen.getByPlaceholderText("8文字以上16文字以内"),
    //   "dummypw1",
    // );
    // userEvent.click(screen.getByText("ログイン"));
    // expect(await screen.findByText("つぶやき一覧")).toBeInTheDocument();
  });

  // it("ログインに失敗した場合", async () => {
  //   //サーバー使う
  //   server.use(
  //     rest.post("http://localhost:8080/login", (req, res, ctx) => {
  //       return res(ctx.status(400));
  //     }),
  //   );
  //   const { page } = await getPage({
  //     route: "/auth/login",
  //   });
  //   render(page);
  //   expect(await screen.findByText("会員登録はコチラから")).toBeInTheDocument();
  //   userEvent.type(screen.getByPlaceholderText("メールアドレス"), "user1");
  //   userEvent.type(
  //     screen.getByPlaceholderText("8文字以上16文字以内"),
  //     "dummypw",
  //   );
  //   userEvent.click(screen.getByText("ログイン"));
  //   expect(screen.getByText("会員登録はコチラから")).toBeInTheDocument();
  // });
});
