import './index.css'

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios'

const host = 'http://localhost:3001'

const Register: React.FC = () => {
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

  const toLogin = () => {
    window.location.href = '/#/login'
  }

  return (
    <div className='reg-page'>
      <h1>Register</h1>
      <Form
        name="register"
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

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="reg">
          <Button type="link" onClick={toLogin}>Login</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
