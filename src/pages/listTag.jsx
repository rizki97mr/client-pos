import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { useLogin } from '../hooks/useLogin';
import { getAllTag } from '../services/product.service';
import { Button, Form, Input, Modal, message } from 'antd'
import axiosDriver from '../config/axios';
import Tag from '../components/Fragments/Tags';

const ListTag = () => {
  const [tags, setTags] = useState([]);
  const [popupModal, setPopupModal] = useState(false)
  useLogin();

  useEffect(() => {
    getAllTag((data) => {
      setTags(data)
    })
  }, [])

  const getAllTags = async () => {
    try {
        let response = await axiosDriver.get("http://localhost:3000/api/tag")
        setTags(response.data)
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
      await axiosDriver.post("http://localhost:3000/api/tag", {name:value.name});
      message.success('item added Sucessfully')
      setPopupModal(false)
      getAllTags();
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
          title="Add Tag" 
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

      <h1 className='font-bold text-2xl my-5'>List Tag</h1>  
      <div className='w-full'>
      <Button onClick={() => setPopupModal(true)}
       className="bg-blue-600 text-white text-base my-3 align-center " >
        Add New Tag
      </Button>
      </div>
      <Tag />
    </DefaultLayout>
  )
}

export default ListTag