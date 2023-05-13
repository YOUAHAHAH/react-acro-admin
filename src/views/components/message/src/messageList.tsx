import { Message } from "@arco-design/web-react";
import { msgProps, msgLoadingProps, msgItemProps } from "./messageType";

const DELAY_TIME = 2000; // 延迟时间

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
  try {
    const messageHandler = typeMap[type];
    if (messageHandler) {
      return () => messageHandler({ ...props }, { ...loadingProps });
    }
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};
