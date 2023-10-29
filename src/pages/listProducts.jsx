import React, { useEffect, useRef, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { getAllCategory, getAllTag, getProducts } from '../services/product.service';
import { useLogin } from '../hooks/useLogin';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { numberWithCommas } from '../utils/utils';
import { UploadOutlined } from '@mui/icons-material';
import { Button, Form, Input, Modal, Select, Upload, message } from 'antd'
import axiosDriver from '../config/axios';
import { Link } from 'react-router-dom';
import { PaginationMedium } from '../components/Fragments/Pagination';

const DataProduct = () => {
        const [products, setProducts] = useState([]);
        const [popupModal, setPopupModal] = useState(false)
        const [tags, setTags] = useState([])
        const [categorys, setCategorys] = useState([])
        const formRef = useRef();
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(10);
        const [totalData, setTotalData] = useState(0);
        useLogin();

        const normFile = (e) => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          };
       
    
        useEffect(() => {
            fetchData()
            getAllTag((data) => {
              setTags(data)
            });
            getAllCategory((data) => {
              setCategorys(data)
            });
        }, [page])


        const fetchData = async () => {
          const data = await getProducts({
              limit: limit,
              skip: (page-1) * limit,
          })
          console.log(data)
          setProducts(data.data)
          setTotalData(data.count)
      }

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
                
              await axiosDriver.post("http://localhost:3000/api/products", formData);
              message.success('item added Sucessfully')
              getAllItem();
              setPopupModal(false)
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
        <Button 
            className='bg-blue-600 text-white my-5' 
            onClick={() => setPopupModal(true)}
            >
              Add Product
        </Button>
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
            <div className='flex justify-center py-3'>
              <PaginationMedium
                  total={totalData}
                  itemsPerPage={limit}
                  currentPage={page}
                  onPageChange={setPage}
              />
            </div>  
        </div>

    </DefaultLayout>
  )
}

export default DataProduct