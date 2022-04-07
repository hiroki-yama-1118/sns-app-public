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

initTestHelpers();

// process.env.JAVA_API_URL = "http://localhost:8080";

const handlers = [
  rest.post("http://localhost:8080/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ access: "123xyz" }));
  }),
];

describe("ログイン画面のテスト", () => {
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

  it("ログイン成功時のテスト", async () => {
    const { page } = await getPage({
      route: "/auth/login",
    });
    render(page);
    expect(await screen.findByText("会員登録はコチラから")).toBeInTheDocument();
    userEvent.type(screen.getByPlaceholderText("メールアドレス"), "user1");
    userEvent.type(
      screen.getByPlaceholderText("8文字以上16文字以内"),
      "dummypw",
    );
    userEvent.click(screen.getByText("ログイン"));
    expect(await screen.findByText("つぶやき一覧")).toBeInTheDocument();
  });

  it("ログインに失敗した場合", async () => {
    //サーバー使う
    server.use(
      rest.post("http://localhost:8080/login", (req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );
    const { page } = await getPage({
      route: "/auth/login",
    });
    render(page);
    expect(await screen.findByText("会員登録はコチラから")).toBeInTheDocument();
    userEvent.type(screen.getByPlaceholderText("メールアドレス"), "user1");
    userEvent.type(
      screen.getByPlaceholderText("8文字以上16文字以内"),
      "dummypw",
    );
    userEvent.click(screen.getByText("ログイン"));
    expect(screen.getByText("会員登録はコチラから")).toBeInTheDocument();
  });
});
