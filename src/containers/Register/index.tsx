import {
  Button, Form, Input, Space, Toast,
} from 'antd-mobile';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { STUDENT_REGISTER } from '@/graphql/student';
import style from './index.module.less';

interface IValue {
  account: string;
  password: string;
}

/**
* 注册页面
*/
export default () => {
  // Form实例化对象form
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [register] = useMutation(STUDENT_REGISTER);
  const nav = useNavigate();
  // 注册处理器
  const registerHandler = async (values: IValue) => {
    const res = await register({
      variables: values,
    });
    if (res.data.studentRegister.code === 200) {
      Toast.show({
        content: res.data.studentRegister.message,
      });
      nav('/login');
    } else {
      Toast.show({
        content: res.data.studentRegister.message,
      });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-resources.oss-cn-chengdu.aliyuncs.com/images/henglogo%402x.png" alt="logo" />
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={registerHandler}
        footer={(
          <Button block type="submit" color="primary" size="large" className={style.button}>
            注册
          </Button>
        )}
      >
        <Form.Item
          label="账号"
          name="account"
          rules={[{
            required: true,
            message: '账号不能为空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: '有且只能包含小写字母和数字，长度大于 6，小于 10',
          }]}
        >
          <Input placeholder="请输入账号" clearable />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{
            required: true,
            message: '密码不能为空',
          }, {
            pattern: /^[a-z0-9]{6,16}$/,
            message: '只能由英文和数字组成，且长度在6~16之间',
          }]}
          extra={(
            // 使用useState修改元素展示
            <div>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
            )}
        >
          <Input
            placeholder="请输入密码"
            clearable
            type={visible ? 'text' : 'password'}
            // 输入密码时，清空确认密码
            onChange={() => {
              form.setFieldValue('passwordConfirm', '');
            }}
          />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="passwordConfirm"
          rules={[
            {
              validator: (_, value) => {
              // 通过实例化Form之后的对象获取到上一个Form.Item输入的密码
                const password = form.getFieldValue('password');
                if (password === value) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
              message: '两次输入的密码需要一致',
            }]}
          extra={(
            <div>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
            )}
        >
          <Input
            placeholder="确认密码"
            clearable
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>
      <div>
        <Space className={style.rlSpace}>
          已有账号？去
          <Link to="/login">登录</Link>
        </Space>
      </div>
    </div>
  );
};
