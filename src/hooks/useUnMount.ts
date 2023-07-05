import { useEffect } from 'react';
import useLatest from './useLatest';

/**
 * 组件卸载时运行的函数，固定的不刷新
 * @param fn 请求参数，在=>左边定义
 */
const useUnMount = (fn: () => void) => {
  // 调用自定义hook获取最新value的函数
  const fnRef = useLatest(fn);
  // 两个剪头符号，第一个代表参数传递、第二个代表?
  useEffect(() => () => fnRef.current());
};

export default useUnMount;
