import React, { useEffect, useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Upload, Form, Input, message } from 'antd';
import {GetUserDataApi, ChangeUserDataApi} from '../request/api'
import "./less/Means.less"
import { connect } from 'react-redux';

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024/ 1024 < 2000;

  if (!isLt2M) {
    message.error('Image must smaller than 200kB!');
  }

  return isJpgOrPng && isLt2M;
};

function Means() {

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  useEffect(()=>{
    GetUserDataApi().then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        sessionStorage.setItem('username', res.data.username)
      } 
    })
  },[])

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onFinish = (values) => {
    if (values.username && values.username !== sessionStorage.getItem('username') 
    && values.password.trim()!==""){
      ChangeUserDataApi({
        username: values.username,
        password: values.password
      }).then(res=>{
        console.log(res)
      })
    }
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        setImageUrl(imageUrl);
        localStorage.setItem('avatar', info.file.response.data.filePath)
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className='means'>
      <Form
      name="basic"
      style={{width:'400px'}}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Edit Username"
        name="username"
      >
        <Input placeholder='please enter new username'/>
      </Form.Item>

      <Form.Item
        label="Edit Password"
        name="password"
      >
        <Input.Password placeholder='please enter new password'/>
      </Form.Item>

     
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" style={{float:'right'}}>
          Submit
        </Button>
      </Form.Item>
      </Form>

      <p>Click below to change avatar</p>
      <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      headers= {{"cms-token":localStorage.getItem('cms-token')}}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%', 
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
    </div>
  )
}

export default Means;