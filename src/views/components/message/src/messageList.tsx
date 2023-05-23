import { Message } from "@arco-design/web-react";
import { msgProps, msgLoadingProps, msgItemProps } from "./messageType";

const DELAY_TIME = 2000; // 延迟时间

// const style: CSSProperties = {
//   position: "absolute",
//   right: "-5px",
//   top: "-5px",
//   width: "20px",
//   height: "20px",
//   borderRadius: "50%",
//   lineHeight: "20px",
//   textAlign: "center",
//   pointerEvents: "none",
//   background: "var(--color-bg-popup)",
//   border: "1px solid var(--color-neutral-3)"
// };

// const groupingMsgCallback = async (
//   { content, ...rest }: msgItemProps,
//   count: number,
//   duration: number
// ) => {
//   const msg = document.querySelector(".arco-message-content");
//   if (msg) {
//     const numDom = msg.querySelector(".grouping-msg-num");
//     if (numDom) {
//       numDom.innerHTML = count.toString();
//     }
//   }
//   if (count !== 1) return;
//   return Message.success({
//     content: (
//       <>
//         {content}
//         <div style={style} className="grouping-msg-num">
//           {count}
//         </div>
//       </>
//     ),
//     duration,
//     ...rest
//   });
// };

export const MessageList = ({
  type = "info",
  props = {
    content: undefined
  },
  loadingProps = {
    loadingContent: undefined,
    delay: DELAY_TIME
  }
}: msgProps) => {
  // let count = 1;

  const loadMsgCallback = async (
    { id, content, ...rest }: msgItemProps,
    {
      loadingId,
      loadingContent,
      delay = DELAY_TIME,
      ...loadingRest
    }: msgLoadingProps
  ) => {
    Message.loading({
      id: loadingId,
      content: loadingContent,
      ...loadingRest
    });

    return await new Promise(_resolve => {
      setTimeout(() => {
        Message.success({
          id: id,
          content: content,
          ...rest
        });
      }, delay as number);
    }).catch(err => {
      throw new Error(err as string);
    });
  };

  const clearMsgCallback = async ({ content, ...rest }: msgItemProps) => {
    Message.clear();
    return await new Promise(_resolve => {
      Message.success({
        content: content,
        ...rest
      });
    }).catch(err => {
      throw new Error(err as string);
    });
  };

  const typeMap = {
    // success: async ({ duration = 3000, ...rest }: msgItemProps) => {
    //   if (props.grouping) {
    //     const oldTimerId = duration;
    //     return await groupingMsgCallback({ ...rest }, count++, duration);
    //   }
    //   return Message.success(props);
    // },
    success: Message.success,
    warning: Message.warning,
    error: Message.error,
    normal: Message.normal,
    info: Message.info,
    clear: async (props: msgItemProps) => {
      if (props.feedBack === true) await clearMsgCallback(props);
      return Message.clear();
    },
    loading: async (props: msgItemProps, loadingProps: msgLoadingProps) => {
      if (props.id === loadingProps.loadingId) {
        await loadMsgCallback(props, loadingProps);
      }
      return Message.loading(props);
    }
  };

  const messageHandler = typeMap[type];

  if (messageHandler) {
    return () => messageHandler({ ...props }, { ...loadingProps });
  }
};
