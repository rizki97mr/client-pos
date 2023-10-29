import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { useLogin } from '../hooks/useLogin';
import { Button, Form, Input, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import axiosDriver from '../config/axios';
import { Link } from 'react-router-dom';

const ListAddress = () => {
    const [address, setAddress] = useState([]);
    const [popupModal, setPopupModal] = useState(false)
    useLogin();

    useEffect(() => {
        getAllAddres((data) => {
            setAddress(data.data)
        })
    }, [])

    const getAllAddres = async () => {
        try {
            let response = await axiosDriver.get("http://localhost:3000/api/delivery-addresses")
            setAddress(response.data.data)
        } catch (e) {
            console.log(e.message)
        }
    }

    const deleteAddres = async (id) => {
        try {
          await axiosDriver.delete(`http://localhost:3000/api/delivery-addresses/${id}`);
          getAllAddres();
        } catch (error) {
          console.log(error);
        }
      };
    
    const handleSubmit = async (value) => {
        try {
          await axiosDriver.post("http://localhost:3000/api/delivery-addresses", {
            nama:value.nama,
            provinsi:value.provinsi,
            kabupaten:value.kabupaten,
            kecamatan:value.kecamatan,
            kelurahan:value.kelurahan,
            detail:value.detail,
        });
          message.success('item added Sucessfully')
          setPopupModal(false)
          getAllAddres();
        } catch (error) {
          message.error('something wrong')
          console.log(error)
        }
      }

  return (
    <DefaultLayout>
         {/* MODAL Add Tag*/}
      <Modal 
          title="Add Address" 
          open={popupModal} 
          footer={null}
          onCancel={() => setPopupModal(false)}
        >
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item name="nama" value='nama' label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="provinsi" value='provinsi' label="Provinsi">
            <Input />
          </Form.Item>
          <Form.Item name="kabupaten" value='kabupaten' label="Kabupaten">
            <Input />
          </Form.Item>
          <Form.Item name="kecamatan" value='kecamatan' label="Kecamatan">
            <Input />
          </Form.Item>
          <Form.Item name="kelurahan" value='kelurahan' label="Kelurahan">
            <Input />
          </Form.Item>
          <Form.Item name="detail" value='detail' label="Detail Alamat">
            <Input />
          </Form.Item>
          <Form.Item>
          <Button type='primary' htmlType='submit' className='bg-blue-600 text-white my-3'>SAVE</Button>
          </Form.Item>
        </Form>
      </Modal>

       <div className="relative overflow-x-auto  sm:rounded-lg">
        <h1 className='font-bold text-2xl'>Data Address</h1>
        <Button onClick={() => setPopupModal(true)}
          className="bg-blue-600 text-white text-base my-3 align-center" >
        Add New Address
      </Button>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Provinsi
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Kabupaten
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Kecamatan
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Kelurahan
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Detail Alamat
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                {address.map((addres, addressIndex) => (
                    <tr key={addres._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {addressIndex + 1}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {addres.nama}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {addres.provinsi}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {addres.kabupaten}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {addres.kecamatan}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {addres.kelurahan}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {addres.detail}
                        </td>
                        <td className="flex-wrap px-6 py-4 justify-start">
                            <Link to={`/dataaddress/edit/${address._id}`} className="font-medium text-green-600 dark:text-Green-500 hover:underline"><EditOutlined/></Link>
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline mx-3" onClick={() => deleteAddres(addres._id)}><DeleteOutlined/></a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </DefaultLayout>
  )
}

export default ListAddress