import { Toast } from 'antd-mobile';

export const showSuccess = (content: string) => {
  Toast.show({
    content,
  });
};

export const showFail = ({ code, message }: { code: number, message: string }) => {
  Toast.show({
    content: `${code}：${message}`,
  });
};
