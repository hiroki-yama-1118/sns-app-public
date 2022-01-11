import { NextPage } from "next";
import { useCallback, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../components/Button";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

/**
 * ログアウトページ.
 * @returns ログアウトページ
 */
const Logout: NextPage = () => {
  //ルーターリンク
  const router = useRouter();
  //cookieを使用する
  const cookie = new Cookie();

  const [isOpen, setIsOpen] = useState(true);
  const closeModal = useCallback(() => {
    // console.log(document.referrer);
    setIsOpen(false);
  }, []);

  const logout = useCallback(() => {
    cookie.remove("id");
    router.push("/login");
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          {/* モーダルの背景を暗くする */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* モーダルを画面の中央に配置するための要素 */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* モーダルの中身部分 */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg sm:max-w-2xl p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-text-brown text-center"
                >
                  ログアウトしますか？
                </Dialog.Title>
                <div className="text-center mt-5 mr-3">
                  <Button color="#622d18" label={"はい"} onClick={logout} />
                  <span className="ml-5">
                    <Button
                      backgroundColor="#f6f0ea"
                      color="#622d18"
                      label={"キャンセル"}
                      onClick={closeModal}
                    />
                  </span>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Logout;
