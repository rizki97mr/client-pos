import React, { useEffect, useRef, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { getAllCategory, getAllTag, getAllitems } from '../services/product.service';
import { useLogin } from '../hooks/useLogin';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { numberWithCommas } from '../utils/utils';
import { UploadOutlined } from '@mui/icons-material';
import { Button, Form, Input, Modal, Select, Upload, message } from 'antd'
import axiosDriver from '../config/axios';
import { Link } from 'react-router-dom';


const ListProductPage = () => {
  const [products, setProducts] = useState([]);
        const [popupModal, setPopupModal] = useState(false)
        const [tags, setTags] = useState([])
        const [categorys, setCategorys] = useState([])
        const formRef = useRef();
        useLogin();

        const normFile = (e) => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          };
       
    
        useEffect(() => {
            getAllitems((data) => {
               setProducts(data.data)
               console.log(data.data)
            });
        }, [])

        useEffect(() => {
            getAllTag((data) => {
              setTags(data)
            })
          }, [])
          
          useEffect(() => {
            getAllCategory((data) => {
              setCategorys(data)
            })
          }, [])

        const getAllItem = async () => {
            try {
                let response = await axiosDriver.get("http://localhost:3000/api/products")
                setProducts(response.data.data)
                console.log(response.data.data)
            } catch (e) {
                console.log(e.message)
            }
        }
        
          const deleteProduct = async (id) => {
            try {
              await axiosDriver.delete(`http://localhost:3000/api/products/${id}`);
              getAllItem();
            } catch (error) {
              console.log(error);
            }
          };
    
        const handleSubmit = async (value) => {
  
            try {
              const file = value.upload[0]?.originFileObj;
          
              const formData = new FormData();
                formData.append("image", file);
                formData.append("name", value.name);
                formData.append("description", value.description);
                formData.append("price", value.price);
                formData.append("tags[]", value.tag);
                formData.append("category", value.category);
                
          
              console.log(value)
              // dispatch({
              //   type:'SHOW_LOADING'
              // });
              await axiosDriver.post("http://localhost:3000/api/products", formData);
              message.success('item added Sucessfully')
            //   formRef.current.reset();
              getAllItem();
              setPopupModal(false)
              // dispatch({type: "HIDE_LOADING"});
            } catch (error) {
              message.error('something wrong')
              console.log(error)
            }
          }
      
  return (
    <DefaultLayout>
        <Modal 
          title="Add Product" 
          open={popupModal} 
          footer={null}
          onCancel={() => setPopupModal(false)}
        >
        <Form layout='vertical' ref={formRef} onFinish={handleSubmit}>
          <Form.Item name="name" value='name' label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name='tag' label="Tag'">
            <Select>
            {tags.map(tag => (
                    <Select.Option key={tag.name} value={tag.name}> {tag.name}</Select.Option>
                ))}        
            </Select>
          </Form.Item>
          <Form.Item name='category' label='Category'>
            <Select>
            {categorys.map(category => (
                    <Select.Option key={category.name} value={category.name} > {category.name}</Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="image"
          >
            <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
          </Form.Item>
          <Form.Item>
          <Button type='primary' htmlType='submit' className='bg-blue-600 text-white my-3'>SAVE</Button>
          </Form.Item>
        </Form>
      </Modal>
        <div className="relative overflow-x-auto  sm:rounded-lg">
        <h1 className='font-bold text-2xl'>Data Product</h1>
        <Button className='bg-blue-600 text-white my-5' onClick={() => setPopupModal(true)}>Add Product</Button>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Image
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Tag
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-32 p-4">
                            <img 
                            src={"http://localhost:3000/images/products/"+ product.image_url.toLowerCase()}
                            alt={product.image} />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.name}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.description}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {/* {product.tags?.map(tag => tag.name).join(', ')} */}
                            {product.tags?.name}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.category?.name}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Rp {numberWithCommas(product.price)}
                        </td>
                        <td className="flex-wrap px-6 py-4 justify-start">
                            <Link to={`/dataproducts/edit/${product._id}`} className="font-medium text-green-600 dark:text-Green-500 hover:underline"><EditOutlined/></Link>
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline mx-3" onClick={() => deleteProduct(product._id)}><DeleteOutlined/></a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
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


// import axios from "axios";
// import axiosDriver from "../config/axios";

// export const getDetailItems = (id, callback) => {
//     axiosDriver.get(`http://localhost:3000/api/products/${id}`)
//         .then((res) => {
//             callback(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

// export const getAllitems = (params, callback) => {
//     axiosDriver.get("http://localhost:3000/api/products",{params})
//         .then((res) => {
//             callback(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

// export const getProducts = async (params) => {
//     try {
//         const response = await axiosDriver.get("http://localhost:3000/api/products",{params})
//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// } 

// export const deleteitems = (_id, callback) => {
//     axiosDriver.get(`http://localhost:3000/api/products/${id}`)
//         .then((res) => {
//             callback(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }



// // export const deleteItems = async (id) => {
// //     try {
// //       await axiosDriver.delete(`http://localhost:3000/api/products/${id}`);
// //       getAllitems();
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// export const getAllTag= (callback) => {
//     axiosDriver.get("http://localhost:3000/api/tag")
//         .then((res) => {
//             callback(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

// export const getAllCategory= (callback) => {
//     axiosDriver.get("http://localhost:3000/api/category")
//         .then((res) => {
//             callback(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

// export const getAllAddres= (callback) => {
//     axiosDriver.get("http://localhost:3000/api/delivery-addresses")
//         .then((res) => {
//             callback(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

// export const getAllOrder= (callback) => {
//     axiosDriver.get("http://localhost:3000/api/orders")
//         .then((res) => {
//             callback(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

