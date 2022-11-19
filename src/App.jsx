import React, {useState} from 'react'
import "./assets/base.less"
import {Outlet} from 'react-router-dom'
import { Layout } from 'antd';
import logoImg from './assets/logo.png'
import Header from './components/Header'
import Aside from './components/Aside'
import Bread from './components/Bread'


const {Sider, Content } = Layout;

function App(props) {

    return (
        <Layout className='app'>
            <Header/>
            <div className='container'>
                <Aside/>
                <div className='container_box'>
                    <Bread />
                    <div className='container_content'>
                        <Outlet/>
                    </div>
                </div>
            </div>
            <footer>Respect | Copyright &copy; 2022 Author Min</footer>
        </Layout>
        
    )
}


export default App