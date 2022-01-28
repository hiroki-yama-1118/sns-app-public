import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Cookie from "universal-cookie";
import * as yup from "yup";
import axios from "axios";

import { JAVA_API_URL } from "../utils/const";

//バリデーションチェック
const schema = yup.object().shape({
  //メールのバリデーション
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .email("メールアドレス形式で入力してください")
    .max(255, "メールアドレスは255文字以内で入力してください"),
  //パスワードのバリデーション
  password: yup
    .string()
    .required("パスワードを入力してください")
    .max(16, "16文字以内で入力してください"),
});

/**
 * ログインページで使用する機能.
 * @returns
 * - register:入力したデータ
 * - handleSubmit:データを入力した際のリアルタイム更新
 * - errors:エラー
 * - onSubmit:ログインボタンを押した時のメソッド
 */
export const useLogin = () => {

  //useFormから使用するメソッド呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // バリデーション機能を呼び出し
    resolver: yupResolver(schema),
  });

  //ルーターリンク
  const router = useRouter();
  //クッキー
  const cookie = new Cookie();

  /**
   * ログインボタンを押した時のメソッド.
   * @param data 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(`${JAVA_API_URL}/login`, {
        email: data.email,
        password: data.password,
      });
      //ログインに成功した場合
      if (res.data.status === "success") {
        //ログインに成功したらクッキーにログイン情報をセット
        cookie.set("hash", res.data.user.logicalId, { path: "/" });
        cookie.set("loginId", res.data.user.id, { path: "/" });
        //ログインと同時に入力内容をクリア
        clear();
        toast.success("ログインしました");
        //タイムライン画面に遷移する;
        router.push("/timeline");
      } else {
        //ログインに失敗した場合、エラーメッセージアラートを表示
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  /**
   * 入力データをクリア
   */
  const clear = () => {
    reset({
      email: "",
      password: "",
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
