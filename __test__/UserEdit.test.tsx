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
import Cookies from "universal-cookie";

initTestHelpers();

const handlers = [
  rest.post("http://localhost:8080/user/edit/1", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("http://localhost:8080/user/1", (req, res, ctx) => {
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

describe("ユーザー編集画面のテスト", () => {
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

  it("ユーザー編集画面のテスト", async () => {
    // const cookies = new Cookies();
    // const hash = cookies.get("hash");
    // server.use(
    //   rest.get(`http://localhost:8080/user/${hash}`, (req, res, ctx) => {
    //     return res(
    //       ctx.status(200),
    //       ctx.json({
    //         name: "田中",
    //         hireDate: "2021-10-10",
    //         serviceFk: "FR",
    //         serviceName: "FR",
    //         accountName: "たなか",
    //         birthDay: "2010-10-10",
    //         introduction: "よろしく",
    //         userPhotoPath: "image1.jpg",
    //       }),
    //     );
    //   }),
    // );
    // const { page } = await getPage({
    //   route: "/user/edit",
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
