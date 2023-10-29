import { useEffect, useState } from 'react';
import CardProduct from '../components/Fragments/CardProduct'
import DefaultLayout from '../components/Layouts/DefaultLayouts';
import { getAllCategory, getAllTag, getProducts } from '../services/product.service';
import { useLogin } from '../hooks/useLogin';
import { PaginationLarge } from '../components/Fragments/Pagination';
import axiosDriver from '../config/axios';


const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [category, setCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isAdmin, setIsAdmin] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalData, setTotalData] = useState(0);
    
   
    useLogin();

    useEffect(() => {
        getMe();
        fetchData();
        getAllCategory((data) => {
            setCategorys(data)
          })
        getAllTag((data) => {
            setTags(data)
          })
    }, [])

    const getMe = async () => {
        try {
            let response = await axiosDriver.get("http://localhost:3000/auth/me")
            setIsAdmin(response.data)
        } catch (e) {
            console.log(e.message)
        }
    }
    

    useEffect(() => {
        fetchData()
    }, [page])

    const fetchData = async () => {
        const data = await getProducts({
            q: search,
            category,
            tags: selectedTags,
            limit: limit,
            skip: (page-1) * limit,
        })
        setProducts(data.data)
        setTotalData(data.count)
    }
    
    const emitSearch = e => {
        e.preventDefault()
        fetchData()
    }

    const handleChange = (e) => {
        // setSearch(products.filter(f => f.name.toLowerCase().includes(e.target.value)))
        setSearch(e.target.value)
    }
    
    const handleCategoryChange = e => {
        setCategory(e.target.value)
    }

    const handleTagChange = e => {
        // console.log(selectedTags)
        // console.log(e.target.checked)
        if(e.target.checked) {
            if(!selectedTags.includes(e.target.value)) {
                setSelectedTags([...selectedTags, e.target.value])
            }
        } else {
            if(selectedTags.includes(e.target.value)) {
                setSelectedTags(selectedTags.filter(tag => tag !== e.target.value))
            }
        }
    }
    
  return (
    <DefaultLayout>
        <div className='justify-center py-3'>
            <div className='flex flex-wrap'>
                <div className='flex-col w-10/12 mb-6 mx-2'>
                <form onSubmit={emitSearch}>
                    <div className="flex">
                    <select onChange={handleCategoryChange} id="category" className="mr-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Category
                                <option>All Category</option>
                                {categorys.map(category => (
                                <option key={category.name} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        <div className="relative w-full">
                            <input type="search" id="search-dropdown" onChange={handleChange} className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search..." />
                            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>     
                </form>
 
                </div>
                <div className='mb-8 ml-2 w-8/12'>
                    <ul className="items-center  my-2 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">   
                    {tags.map(tag => (
                        <li key={tag._id} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input id="checkbox-list" type="checkbox" value={tag.name} onChange={handleTagChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="vue-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tag.name}</label>
                            </div>
                        </li>
                        ))}     
                    </ul>   
                </div>  
            <div className='w-full flex flex-wrap' />
            {products.length > 0 &&
               products.map((product) => (
                <CardProduct key={product._id}>
                    <CardProduct.Header image={"http://localhost:3000/images/products/"+ product.image_url.toLowerCase()} id={product._id} />
                        <CardProduct.Body name={product.name}>
                            {product.description}
                        </CardProduct.Body>
                    <CardProduct.Footer 
                        product={product} 
                    />
                </CardProduct> 
            ))}
            </div>
        
        </div>
        <div className='flex justify-center py-3'>
            <PaginationLarge
                total={totalData}
                itemsPerPage={limit}
                currentPage={page}
                onPageChange={setPage}
            />
        </div>
    </DefaultLayout>
  )
}

export default ProductsPage