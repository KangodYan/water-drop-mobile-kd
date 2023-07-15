import { STUDENT_LOGIN } from '@/graphql/student';
import { useMutation } from '@apollo/client';
import {
  Button, Form, Input, Space,
} from 'antd-mobile';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useState } from 'react';

import { showSuccess, showFail } from '@/utils';
import { AUTH_TOKEN } from '@/utils/constants';
import style from './index.module.less';

interface IValue {
  account: string;
  password: string;
}

/**
* 登录页面
*/
export default () => {
  const [visible, setVisible] = useState(false);
  const [login] = useMutation(STUDENT_LOGIN);
  const nav = useNavigate();
  // 登录处理器
  const loginHandler = async (values: IValue) => {
    const res = await login({ variables: values });
    if (res.data.studentLogin.code === 200) {
      // 存储学生token
      localStorage.setItem(AUTH_TOKEN, res.data.studentLogin.data);
      showSuccess(res.data.studentLogin.message);
      nav('/my');
    } else {
      showFail(res.data.studentLogin);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-resources.oss-cn-chengdu.aliyuncs.com/images/henglogo%402x.png" alt="logo" />
      </div>
      <Form
        layout="horizontal"
        onFinish={loginHandler}
        footer={(
          <Button block type="submit" color="primary" size="large" className={style.button}>
            登录
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
            placeholder="请输入密码"
            clearable
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>
      <div>
        <Space className={style.rlSpace}>
          没有账号？去
          <Link to="/register">注册</Link>
        </Space>
      </div>
    </div>
  );
};
