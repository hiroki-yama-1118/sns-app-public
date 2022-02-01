import { FC } from "react";

import { CommentNotion } from "./CommentNotion";
import { LikeNotion } from "./LikeNotion";
import { notion } from "../../types/type";

export type Props = {
  notification: notion; //通知内容
};

/**
 * タイムラインの通知表示コンポ―ネント.
 * @param props - props
 * @returns タイムラインに対する通知→コメントorいいね
 */
export const TimelineNotion: FC<Props> = (props) => {
  const { notification } = props;

  return (
    <>
      {notification.like && (
        <LikeNotion
          notification={notification}
          type="つぶやき"
          sentence={notification.timelineSentence}
        />
      )}
      {notification.comment && (
        <CommentNotion notification={notification} type="つぶやき" />
      )}
    </>
  );
};
