import { useRef } from 'react';

/**
 * 获取最新value的函数
 * @param value 传参一个T泛型，函数或变量都可能
 */
const useLatest = <T> (value: T) => {
  // 用useRef做一个缓存
  const ref = useRef(value);
  // 给fnRef赋初始值，防止空值
  ref.current = value;
  return ref;
};

export default useLatest;
