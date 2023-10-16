import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Layouts/DefaultLayouts'
import { getAllCategory, getAllTag } from '../../services/product.service'
import { useNavigate, useParams } from 'react-router-dom';
import axiosDriver from '../../config/axios';

const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([])
    const [categorys, setCategorys] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

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

    // Get Value product to form Edit Product
    useEffect(() => {
        getProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    const getProduct = async () => {
        const response = await axiosDriver.get(`http://localhost:3000/api/products/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setTag(response.data.tag);
        setCategory(response.data.category);
      };
    
      const editProduct = async(e) => {
        e.preventDefault();
        try {
         await axiosDriver.put(`http://localhost:3000/api/products/${id}`,{
            name,
            price,
            description,
            tags:[tag],
            category,
          });
          navigate("/dataproducts");
        } catch (error) {
            console.log(error)
        }
      }

      
  return (
    <DefaultLayout>
        <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
            <h1 className="text-xl font-bold text-white capitalize dark:text-white">Edit Product</h1>
            <form onSubmit={editProduct}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="name">Name</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="description">Description</label>
                        <input id="" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="Price">Price</label>
                        <input id="price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="tag">Tag</label>
                        <select value={tag} onChange={(e) => setTag(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" >
                            <option value="disabledOption" disabled>Select Tag</option>
                        {tags.map(tag => (
                            <option key={tag._id} value={tag.name}>{tag.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="category">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" >
                            <option value="disabledOption" disabled>Select Category</option>
                        {categorys.map(category => (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">
                        Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span className="">Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1 text-white">or drag and drop</p>
                        </div>
                        <p className="text-xs text-white">
                            PNG, JPG, GIF up to 10MB
                        </p>
                        </div>
                    </div>
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

export default EditProduct
