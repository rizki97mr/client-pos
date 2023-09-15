import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select, Table, Upload, message } from 'antd'
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import { UploadOutlined } from '@mui/icons-material';
import CardMedia from '@mui/material/CardMedia';
import DefaultLayout from '../components/Layouts/DefaultLayouts';
import { getAllitems } from '../services/product.service';
import { useLogin } from '../hooks/useLogin';


const ListProductPage = () => {
  useLogin();
//   const dispatch = useDispatch()
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false)
  // const [editItem, setEditItems] = useState(null);
  
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

//   const getAllitems = async () => {
//     try {
//     //   dispatch({
//     //     type:'SHOW_LOADING'
//     //   });
//       const { data } = await axios.get("http://localhost:3000/api/products")
//       setItemsData(data.data);
//     //   dispatch({type: "HIDE_LOADING"});
//       console.log(data.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

// useEffect(() => {
//   getAllitems();
// }, [])
useEffect(() => {
  getAllitems((data) => {
     setItemsData(data.data)
  });
}, [])

//data

const columns = [
    {title: 'Image', dataIndex:'image',
    render:(image,record) =>(<CardMedia
    component="img"
    src={
      "http://localhost:3000/images/products/" +
      record.image_url
    }
    alt="food"
  />)},
    {title: 'Name', dataIndex:'name'},
    {title: 'Description', dataIndex:'description'},
    {title:'Price', dataIndex:'price'},
    {title: 'Category', dataIndex:'category.name',
    render:(text, record) => record.category.name
    }, 
    // {title: 'Tag', dataIndex:'tag.name',
    // render:(text, record) => record.tag.name
    // }, 
    {title: 'Actions', dataIndex:"_id", 
    render :(id, record) => (
    <div>
    <EditOutlined 
      style={{ cursor:'pointer' }} 
      // onClick={() => {
      //   setEditItems(record);
      //   setPopupModal(true);
      // }}
    />
    <DeleteOutlined style={{ cursor:'pointer' }}/>
    </div>
    ),
  }
];

// handle submit 
const handleSubmit = async (value) => {
  try {
    console.log(value)
    // dispatch({
    //   type:'SHOW_LOADING'
    // });
    const res = await axios.post("http://localhost:3000/api/products", value);
    message.success('item added Sucessfully')
    getAllitems();
    setPopupModal(false)
    // dispatch({type: "HIDE_LOADING"});
  } catch (error) {
    message.error('something wrong')
    console.log(error)
  }
}

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1 className='font-bold text-2xl'>List Product</h1>
        <Button className='bg-blue-600 text-white my-3' onClick={() => setPopupModal(true)}>Add Product</Button>
        <Table columns={columns} dataSource={itemsData} bordered />

        <Modal 
          title="Add Product" 
          open={popupModal} 
          footer={null}
          onCancel={() => setPopupModal(false)}
        >
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item name="name" value='name' label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name='tag' label='Tag'>
            <Select>
              <Select.Option value='spicy'>spicy</Select.Option>
              <Select.Option value='notspicy'>Not Spicy</Select.Option>
              <Select.Option value='snack'>Snack</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='category' label='Category'>
            <Select>
              <Select.Option value='drinks'>Drinks</Select.Option>
              <Select.Option value='food'>Foods</Select.Option>
              <Select.Option value='snack'>Snack</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="image"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
          </Form.Item>
          <Form.Item>
          <Button type='primary' htmlType='submit' className='bg-blue-600 text-white my-3'>SAVE</Button>
          </Form.Item>
        </Form>
      </Modal>
        </div>
    </DefaultLayout>
  )
}

export default ListProductPage;

{/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Image</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    Product
                </th>
                <th scope="col" class="px-6 py-3">
                    Qty
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-32 p-4">
                    <img src="/docs/images/products/apple-watch.png" alt="Apple Watch"/>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Apple Watch
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center space-x-3">
                        <button class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <div>
                            <input type="number" id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required/>
                        </div>
                        <button class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    $599
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-32 p-4">
                    <img src="/docs/images/products/imac.png" alt="Apple Imac"/>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Imac 27"
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center space-x-3">
                        <button class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <div>
                            <input type="number" id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required/>
                        </div>
                        <button class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    $2499
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-32 p-4">
                    <img src="/docs/images/products/iphone-12.png" alt="Iphone 12"/>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Iphone 12 
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center space-x-3">
                        <button class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <div>
                            <input type="number" id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required/>
                        </div>
                        <button class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    $999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
            </tr>
        </tbody>
    </table>
</div> */}