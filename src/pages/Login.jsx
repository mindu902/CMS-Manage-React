import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom';
import { Button, message, Form, Input } from 'antd';
import "./less/Login.less";
import logoImg from '../assets/logo.png';
import {LoginApi} from '../request/api.js';

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    LoginApi({
      username: values.username,
      password: values.password
    }).then(
      res=>{console.log(res)
        if (res.errCode === 0){
          message.success('Log in successfully');
          localStorage.setItem('avatar', res.data.avatar)
          localStorage.setItem('cms-token', res.data['cms-token'])
          localStorage.setItem('editable', res.data.editable)
          localStorage.setItem('player', res.data.player)
          localStorage.setItem('username', res.data.username)
 
          setTimeout(()=>navigate('/'), 1500)
        } else {
          message.error('Wrong password');
        }
      }
    )
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login'>
      <div className='login_box'>
        <img src={logoImg}></img>
        <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size="large" prefix={<UserOutlined/>} placeholder="Please enter username!"/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Please enter password!"/>
        </Form.Item>

        <Form.Item>
          <Link to={"/register"}>Sign up now</Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}
