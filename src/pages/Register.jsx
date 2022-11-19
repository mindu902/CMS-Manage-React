import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom';
import { Button, Form, Input, message} from 'antd';
import "./less/Login.less";
import logoImg from '../assets/logo.png';
import {RegisterApi} from '../request/api.js';


export default function Register() {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(
      res=>{console.log(res)
        if (res.errCode === 0){
          message.success('Sign up successfully');
          setTimeout(()=>navigate('/login'), 1500)
        } else {
          message.error('Username already exists');
        }
      }
    )

  };


  return (
    <div className='login'>
      <div className='login_box'>
        <img src={logoImg}></img>
        <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size="large" prefix={<UserOutlined/>} placeholder="Please input your username!"/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Please input your password!"/>
        </Form.Item>

        <Form.Item
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
        <Input.Password size="large" prefix={<LockOutlined />} placeholder='Please confirm the password'/>
      </Form.Item>

        <Form.Item>
          <Link to={"/register"}>Already have an account? Log in now!</Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Sign up
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}
