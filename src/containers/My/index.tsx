import { useMutation } from '@apollo/client';
import {
  Button, Form, Input, ImageUploader,
} from 'antd-mobile';
import classNames from 'classnames';
import { useUploadOSS } from '@/hooks/useUploadOSS';
import { COMMIT_STUDENT_INFO } from '@/graphql/user';
import { IStudent } from '@/utils/types';
import { showFail, showSuccess } from '@/utils';
import { useEffect } from 'react';
import { useUserContext } from '@/hooks/userHooks';
import style from './index.module.less';

const App = () => {
  // 调用封装的上传图片hooks
  const uploadHandler = useUploadOSS();
  // 调用提交学生信息的API
  const [commit] = useMutation(COMMIT_STUDENT_INFO);
  const [form] = Form.useForm();
  // 数据变化更新store数据
  const { store } = useUserContext();
  useEffect(() => {
    if (!store.tel) return;
    form.setFieldsValue({
      tel: store.tel,
      name: store.name,
      avatar: [{
        url: store.avatar,
      }],
    });
  }, [store, form]);

  // 单表提交校验后调用，先把简单的输入弄成IStudent类型传入，avatar单独处理传入
  const onClickHandler = async (values: IStudent & { avatar: [{ url:string }] }) => {
    const res = await commit(
      {
        variables: {
          params: {
            ...values,
            avatar: values.avatar[0]?.url,
          },
        },
      },
    );
    // API调用结果弹窗显示
    if (res.data.commitStudentInfo.code === 200) {
      showSuccess(res.data.commitStudentInfo.message);
      return;
    }
    showFail(res.data.commitStudentInfo.message);
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="" />
      </div>
      <Form
        // form表单实例
        form={form}
        // 多样式引入，form是antd自带样式，formPadding是自定义
        className={classNames(style.form, style.formPadding)}
        // 点击函数，自动传入Item中name的value，封装成map
        onFinish={onClickHandler}
        // 表单尾部按钮
        footer={(
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
      )}
      >
        <Form.Header>请提交个人信息，都是必填的</Form.Header>
        <Form.Item
          name="name"
          label="昵称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tel"
          label="手机号"
          rules={[
            {
              required: true,
            }, {
              pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '手机号格式不正确',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="头像"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ImageUploader
            maxCount={1}
            upload={uploadHandler}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
