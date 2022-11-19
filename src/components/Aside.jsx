import { Menu, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Aside() {
    const navigate = useNavigate();
    const location = useLocation();
    const [defaultKey, setDefaultKey] = useState('')

    useEffect(()=>{
        let path = location.pathname;
        let key = path.split('/')[1];
        setDefaultKey(key)
    },[location.pathname])

    const handleClick = e => {
        navigate('/' + e.key);
        setDefaultKey(e.key)
    };

    return (
        <Menu
            mode="inline"
            theme="dark"
            style={{width: 180}}
            onClick={handleClick}
            className="aside"
            selectedKeys={[defaultKey]}
            >
            

            <Menu.Item key="listtable"><ReadOutlined />
                <span>See All Articles</span>
            </Menu.Item>

            <Menu.Item key="edit"><EditOutlined />
                <span>Edit Article</span>
            </Menu.Item>

            <Menu.Item key="means"><DatabaseOutlined/>
                <span>Profile Settings</span>
            </Menu.Item>
        </Menu>
    )
}
