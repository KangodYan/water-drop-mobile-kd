import {
  Form, Input, Button, Calendar, ImageUploader,
} from 'antd-mobile';

import './App.css';
import { useUploadOSS } from './hooks/useUploadOSS';

// 「调用Graphql服务端接口4」使用useQuery和useMutation获取数据
const App = () => {
  const uploadHandler = useUploadOSS();

  return (
    <div>
      <div>
        <Form
          layout="horizontal"
          footer={(
            <Button block type="submit" color="primary" size="large">
              提交
            </Button>
          )}
        >
          <Form.Item name="name" label="姓名">
            <Input
              placeholder="请输入姓名"
              rules={[{ required: true, message: '姓名不能为空' }]}
            >
              姓名
            </Input>
          </Form.Item>
          <Form.Item name="avatar" label="头像">
            <ImageUploader
              upload={uploadHandler}
            />
          </Form.Item>
        </Form>
        <Calendar />
      </div>
    </div>
  );
};

export default App;
