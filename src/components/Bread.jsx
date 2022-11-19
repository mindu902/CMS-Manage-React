import React, {useState, useEffect} from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Bread() {
    const {pathname} = useLocation();
    const [breadName, setbreadName] = useState('');
    useEffect(()=>{
        switch(pathname){
            case "/listtable":
                setbreadName("See Article Table");
                break;
            case "/eidt":
                setbreadName("Edit Article");
                break;
            case "/means":
                setbreadName("Edit Files");
                break;
            default:
                setbreadName(pathname.includes('edit') ? 'Edit Article': "")
                break;
        }
    }, [pathname])

    return (
        <Breadcrumb style={{height:'30px', lineHeight:'30px'}}>
            <Breadcrumb.Item href='/'>
                <HomeOutlined />
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                <span>{breadName}</span>
            </Breadcrumb.Item>

    </Breadcrumb>
    ) 
}
