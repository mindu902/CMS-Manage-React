import React, { useState, useEffect } from 'react'
import './less/ListTable.less'
import { Button, Pagination, Space, Table, message } from 'antd';
import {ArticleListApi, ArticleDelApi} from '../request/api'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function MyTitle(props){
    return (
        <div>
            <a className='table_title' href={"http://codesohigh.com:8765/article/" + props.id} target="_blank">{props.title}</a>
            <p style={{color: '#999'}}>{props.subTitle}</p>
        </div>
    )
}

export default function ListTable() {
      const navigate = useNavigate()
      const [arr, setarr] = useState([])
      const [pagination, setPagination] = useState({current:1, pageSize:10, total:0})

      const getArticleList = (current, pageSize) => {
        ArticleListApi({
            num:current,
            count:pageSize
        }).then(res=>{
            if (res.errCode === 0){
                console.log(res.data);
                let {num, count, total} = res.data;
                setPagination({
                    current: num,
                    pageSize: count,
                    total: total
                })
                let newArr = JSON.parse(JSON.stringify(res.data.arr));
                let myarr = [];
                newArr.map(item=>{
                    let obj = {
                        key: item.id,
                        date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
                        mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle}/>
                    }
                    myarr.push(obj)
                })
                setarr(myarr)
            }
        })
      }

      useEffect(()=>{
        getArticleList(pagination.current, pagination.pageSize);
      }, [])

      const columns = [
        {
          dataIndex: 'mytitle',
          key: 'mytitle',
          width: '60%',
          render: text => <div>{text}</div>,
        },
        {
          dataIndex: 'date',
          key: 'date',
          render: text => <p>{text}</p>
        },
        {
            title: 'Action',
            key: 'action',
            render: text => (
              <Space size="middle">
                <Button type='primary' onClick={()=>navigate('/edit/'+text.key)}>Edit</Button>
                <Button type='danger' onClick={()=>delFn(text.key)}>Delete</Button>
              </Space>
            ),
          },
      ];
    
    const pageChange = (arg) => {
        console.log(arg);
        getArticleList(arg.current, arg.pageSize)
    }

    const delFn = (id) => {
      ArticleDelApi({id}).then(res=>{
        if(res.errCode ===0){
          message.success(res.message)
          getArticleList(1, pagination.pageSize)
        } else {
          message.success(res.message)
        }
      })
    }

    return (
        <div className='list_table'>
            <Table 
                showHeader={false} 
                columns={columns} 
                dataSource={arr} 
                onChange={pageChange} 
                pagination={pagination}/>;
        </div>
    )
}
