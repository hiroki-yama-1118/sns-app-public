import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Radio } from "../../components/Form/Radio";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/Form/TextInput";

//バリデーションチェック
const schema = yup.object().shape({
  //アカウント名のバリデーション
  accountName: yup
    .string()
    .required("アカウント名を入力してください")
    .max(30, "アカウント名は30文字以内で入力してください"),
  //入社年のバリデーション
  hireDate: yup.string().required("入社年を入力してください"),
  //誕生日のバリデーション
  birthDate: yup.string().required("誕生日を入力してください"),
  //パスワードのバリデーション
  password: yup
    .string()
    .required("パスワードを入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      "アルファベット（大文字小文字混在）と数字とを組み合わせて入力してください",
    )
    .max(16, "16文字以内で入力してください")
    .min(8, "8文字以上で入力してください"),
  //確認用パスワードのバリデーション
  passwordConf: yup
    .string()
    .required("確認用パスワードを入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      "アルファベット（大文字小文字混在）と数字とを組み合わせて入力してください",
    )
    .max(16, "16文字以内で入力してください")
    .min(8, "8文字以上で入力してください")
    .oneOf([yup.ref("password"), null], "確認用パスワードが一致していません"),
});

/**
 * ユーザー登録画面
 * @returns ユーザー登録するためのページ
 */
const SignUp: NextPage = () => {
  //テストデータ
  const [data] = useState({
    name: "ランチックス",
    email: "xxx@yyy",
  });

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //ルーターリンク
  const router = useRouter();

  //登録ボタンを押した時に呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    //会員登録に成功したら登録完了画面に遷移する
    router.push("/auth/compsignup");
  };

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          本登録フォーム
        </div>
        <form name="SignupForm" noValidate>
          <div className="flex flex-col items-center mt-10 mr-3 ml-3">
          <div className="text-xl mt-3">名前:{data.name}</div>
          <div className="mt-3">メールアドレス:{data.email}</div>
              {/* アカウント名のテキストフォーム */}
              <TextInput
                label="アカウント名"
                type="text"
                fullWidth={true}
                required
                errorMessage={errors.accountName?.message}
                placeholder="アカウント名"
                registers={register("accountName")}
              />
            </div>
            <div className="w-96 mt-3">
              {/* 入社年のテキストフォーム*/}
              <TextInput
                label="入社年"
                type="month"
                fullWidth={true}
                required
                errorMessage={errors.hireDate?.message}
                registers={register("hireDate")}
              />
            </div>
            {/* 職種のラジオボタン */}
            <div className="mt-3">職種を選択してください</div>
            <div className="flex gap-5">
              <Radio id="FR" value="1" name="jobType" defaultChecked />
              <Radio id="Java" value="2" name="jobType" />
              <Radio id="CL" value="3" name="jobType" />
              <Radio id="QA" value="4" name="jobType" />
              <Radio id="ML" value="5" name="jobType" />
              <Radio id="内勤" value="6" name="jobType" />
            </div>
            <div className="w-96 mt-3">
              {/* 誕生日のテキストフォーム */}
              <TextInput
                label="誕生日"
                type="date"
                fullWidth={true}
                required
                errorMessage={errors.birthDate?.message}
                registers={register("birthDate")}
              />
            </div>
            <div className="w-96 mt-3">
              {/* パスワードのテキストフォーム */}
              <TextInput
              label="パスワード"
                type="password"
                fullWidth={true}
                required
                errorMessage={errors.password?.message}
              placeholder="8文字以上16文字以内"
                registers={register("password")}
              />
            </div>
            <div className="w-96 mt-3">
              {/* 確認用パスワードのテキストフォーム */}
              <TextInput
              label="確認用パスワード"
                type="password"
                fullWidth={true}
                required
                errorMessage={errors.passwordConf?.message}
              placeholder="8文字以上16文字以内"
                registers={register("passwordConf")}
              />
            </div>
            <div className="flex gap-3 mt-10 mb-10">
              <Button
                label="登録"
                backgroundColor="#f28728"
                color="white"
                size="md"
                onClick={handleSubmit(onSubmit)}
              />
              <Button
                label="クリア"
                backgroundColor="#f6f0ea"
                color="#f28728"
                size="md"
                onClick={reset}
              />
            </div>{" "}
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUp;
