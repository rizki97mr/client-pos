import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { useLogin } from '../hooks/useLogin';
import { Button, Form, Input, Modal, message } from 'antd'
import axiosDriver from '../config/axios';
import { getAllCategory } from '../services/product.service';
import Category from '../components/Fragments/Tag';



const ListCategory = () => {
  const [categorys, setCategorys] = useState([]);
  const [popupModal, setPopupModal] = useState(false)
  useLogin();

  useEffect(() => {
    getAllCategory((data) => {
      setCategorys(data)
    })
  }, [])

  const getAllCategory = async () => {
    try {
        let response = await axiosDriver.get("http://localhost:3000/api/category")
        setCategorys(response.data)
    } catch (e) {
        console.log(e.message)
    }
}

  const handleSubmit = async (value) => {
  
    try {
      console.log(value)
      // dispatch({
      //   type:'SHOW_LOADING'
      // });
      await axiosDriver.post("http://localhost:3000/api/category", {name:value.name});
      message.success('item added Sucessfully')
      setPopupModal(false)
      getAllCategory();
      // dispatch({type: "HIDE_LOADING"});
    } catch (error) {
      message.error('something wrong')
      console.log(error)
    }
  }

  return (
    <DefaultLayout>
      {/* MODAL Add Tag*/}
      <Modal 
          title="Add Category" 
          open={popupModal} 
          footer={null}
          onCancel={() => setPopupModal(false)}
        >
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item name="name" value='name' label="Name">
            <Input />
          </Form.Item>
          <Form.Item>
          <Button type='primary' htmlType='submit' className='bg-blue-600 text-white my-3'>SAVE</Button>
          </Form.Item>
        </Form>
      </Modal>
      
       <h1 className='font-bold text-2xl my-5'>List Category</h1>  
       <Button onClick={() => setPopupModal(true)}
          className="bg-blue-600 text-white text-base my-3 align-center" >
        Add New Category
      </Button>
      <Category />
    </DefaultLayout>
  )
}
export default ListCategory