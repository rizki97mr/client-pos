import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Layouts/DefaultLayouts'
import { useNavigate, useParams } from 'react-router-dom';
import axiosDriver from '../../config/axios';

const EditAddres = () => {
    const [nama, setNama] = useState("");
    const [provinsi, setProvinsi] = useState("");
    const [kabupaten, setKabupaten] = useState("");
    const [kelurahan, setKelurahan] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [detail, setDetail] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();


    // Get Value product to form Edit Product
    useEffect(() => {
        getAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    const getAddress = async () => {
        const response = await axiosDriver.get(`http://localhost:3000/api/delivery-addresses/${id}`);
        setNama(response.data.nama);
        setProvinsi(response.data.provinsi);
        setKabupaten(response.data.kabupaten);
        setKecamatan(response.data.kecamatan);
        setKelurahan(response.data.kelurahan);
        setDetail(response.data.detail);
      };
    
      const editAddress = async(e) => {
        e.preventDefault();
        try {
         await axiosDriver.put(`http://localhost:3000/api/delivery-addresses/${id}`,{
            nama,
            provinsi,
            kabupaten,
            kecamatan,
            kelurahan,
            detail,
          });
          navigate("/dataaddress");
        } catch (error) {
            console.log(error)
        }
      }

      
  return (
    <DefaultLayout>
        <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
            <h1 className="text-xl font-bold text-white capitalize dark:text-white">Edit Product</h1>
            <form onSubmit={editAddress}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="name">Name</label>
                        <input id="name" type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="provinsi">Provinsi</label>
                        <input id="provinsi" type="text" value={provinsi} onChange={(e) => setProvinsi(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="kabupaten">Kabupaten</label>
                        <input id="kabupaten" type="text" value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="kecamatan">Kecamatan</label>
                        <input id="kecamatan" type="text" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="kelurahan">Kelurahan</label>
                        <input id="kelurahan" type="text" value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="detail">Detail</label>
                        <input id="detail" type="text" value={detail} onChange={(e) => setDetail(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                </div>
            </form>
        </section>
      </DefaultLayout>
  )
}

export default EditAddres
