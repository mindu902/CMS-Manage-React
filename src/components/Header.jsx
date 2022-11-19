import React, { useEffect, useState } from 'react'
import { CaretDownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Divider, message } from 'antd';
import logoImg from '../assets/logo.png'
import defaultAvatar from '../assets/defaultImg.png'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setusername] = useState("Visitor")

    useEffect(()=>{
        let username1 = localStorage.getItem('username')
        let avatar1 = localStorage.getItem('avatar')

        if(username1){
            setusername(username1)
        }

        if(avatar1){
            setAvatar('http://47.93.114.103:6688'+avatar1)
        }
    },[localStorage.getItem('avatar')])

    const logout = () => { 
        message.success('log out successfully')
        localStorage.clear();
        setTimeout(()=>navigate('/login'), 1500)
    }

    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                  Edit profile
                </a>
              ),
            },
            {
                type: 'divider',
              },
            {
              key: '2',
              label: (
                <a target="_blank" rel="noopener noreferrer" onClick={logout}>
                  Log out
                </a>   
              ),
              
            },

          ]}
        />
      );

  return (
    <header>

        <div className='right'>
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Space>
                <img src={defaultAvatar} className="avatar"/>
                <span>{username}</span>
                <CaretDownOutlined />
            </Space>
            </a>
           
        </Dropdown>
        </div>
    </header>
  )
}

export default Header;