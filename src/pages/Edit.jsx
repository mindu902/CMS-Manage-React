import { Button, PageHeader, Form, Input, Modal, Radio, Checkbox, message } from 'antd';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import E from 'wangeditor'
import {ArticleAddApi, ArticleSearchApi, ArticleUpdateApi} from '../request/api'
import {useNavigate, useParams, useLocation} from 'react-router-dom'

let editor = null

export default function Edit() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation()

  const dealData = (errCode, msg) => {
    setIsModalVisible(false)
    if (errCode === 0){
      message.success(msg)
      setTimeout(()=>{
        navigate('/listtable')
      }, 1500)
    }else{ 
      message.error(msg)
    }
  }

  const handleOk = (props) => {
    // setIsModalVisible(false);
      form
        .validateFields()
        .then((values) => {
          // form.resetFields();
          console.log('Received values of form: ', values);
          let {title, subTitle} = values;
          if (params.id){
            ArticleUpdateApi({title, subTitle, content, id:params.id}).then(res=>{
              dealData(res.errCode, res.message)   
            })
          } else {
            ArticleAddApi({title, subTitle, content}).then(
              res => {
                dealData(res.errCode, res.message)
              }
            )}
        })
        .catch(() => {
          return;
        });
  };


  useEffect(()=>{
    editor = new E('#div1')

    editor.config.onchange = (newHtml) => {
      setContent(newHtml)
    }
    editor.create()

    if (params.id){
      ArticleSearchApi({id:params.id}).then(res=>{
        if (res.errCode === 0){
          let {title, subTitle} = res.data;
          editor.txt.html(res.data.content)
          setContent(res.data.content)
          setTitle(res.data.Title)
          setSubTitle(res.data.subTitle)
        }
      })
    }

    return () => {  
      editor.destroy()
    }
  },[])

  return (
    <div>
      <PageHeader
      ghost={false}
      onBack={params.id ? () => window.history.back() : null}
      title="Edit Article"
      subTitle={"Current Date: " +moment(new Date()).format("YYYY-MM-DD")}
      extra={[
        <Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>Submit Article</Button>,
      ]}
    ></PageHeader>

      <div id="div1" style={{padding: '0 20px 20px', backgroundColor: 'white'}}></div>
      <Modal zIndex={99999} title="Fill in the article title" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} okText="Submit" cancelText="cancel">
          <Form
          form={form}
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          autoComplete="off"
          initialValues={{title: title, subTitle:subTitle}}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Subtitle"
            name="SubTitle"
          >
            <Input/>
          </Form.Item>

        </Form>
      </Modal>
    
    </div>
  )
}
