import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '../graphql/oss';

export const useUploadOSS = () => {
  // 先使用gql语法调用服务端获取OSS信息，[: res1]是取的别名
  const { data: res1 } = useQuery(GET_OSS_INFO);

  const uploadHandler = async (file: File) => {
    // 组装文件上传需要的参数
    const data = res1.getOSSInfo;
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    const key = `images/${filename}`;
    // 创建FormData并传入组装后的参数
    const formData = new FormData();
    formData.append('key', key);
    formData.append('policy', data.policy);
    formData.append('OSSAccessKeyId', data.accessId);
    formData.append('success_action_status', '200');
    formData.append('signature', data.signature);
    formData.append('file', file);
    // 使用 fetch post 带着参数请求阿里云OSS服务端接口，实现文件上传
    const res2 = await fetch(data.host, {
      method: 'POST',
      body: formData,
    });
    // 返回接口响应回来的URL
    return { url: res2.url + key };
  };

  return uploadHandler;
};
