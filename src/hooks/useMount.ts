import { useEffect } from 'react';

/**
 * 组件加载时运行的函数
 * @param fn 请求参数，在=>左边定义
 */
const useMount = (fn: () => void) => {
  // 一般会在组件内部加一个useEffect，fn处理初始化方法
  useEffect(() => {
    // fn有可能没值，加一个问号弄成可选项
    fn?.();
  }, [fn]);
};

export default useMount;
