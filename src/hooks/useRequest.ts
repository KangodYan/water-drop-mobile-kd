import { useCallback, useState } from 'react';
import useMount from './useMount';

/**
 * 使用interface把几个字段弄成一个IOptions，方便扩展和修改
 */
interface IOptions {
  params: Record<string, string>;
  manual?: boolean;
  onSuccess?: (res: unknown) => void;
  onError?: (err: unknown) => void;
}

/**
 * 1 实现组件初始化，发送请求获取数据
 * 2 手动触发请求
 */
const useRequest = (
  service: (params: Record<string, string>) => Promise<unknown>,
  options: IOptions,
) => {
  // 定义data和loading的状态变量，用于在函数后续代码中修改
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  // useCallback用于在多次渲染中缓存函数，返回与之前一样的函数（如果依赖被修改，则返回此次渲染中传递的函数）
  const init = useCallback(async (curParams: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await service(curParams);
      setData(res);
      setLoading(false);
      if (options.onSuccess) {
        options.onSuccess(res);
      }
    } catch (error) {
      setLoading(false);
      if (options.onError) {
        options.onError(error);
      }
    }
  }, [options, service]);

  useMount(() => {
    if (!options.manual) {
      init(options.params);
    }
  });

  const run = (runParams: Record<string, string>) => init(runParams);

  return { loading, data, run };
};

export default useRequest;
