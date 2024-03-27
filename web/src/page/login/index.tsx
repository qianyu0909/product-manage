import './index.css'

import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';

const host = 'http://localhost:3001'

const Login: React.FC = () => {
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const { data } = await axios.post(`${host}/user/login`, values)
    if (data.code === 200) {
      window.localStorage.setItem('userInfo', JSON.stringify(data.data))
      window.location.href = '/#/'
    } else {
      message.error('Account or password error')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const toReg = () => {
    window.location.href = '/#/register'
  }

  return (
    <div className='login-page'>
      <h1>Login</h1>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="reg">
          <Button type="link" onClick={toReg}>Register</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
