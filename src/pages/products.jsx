import { useEffect, useState } from 'react';
import CardProduct from '../components/Fragments/CardProduct'
import DefaultLayout from '../components/Layouts/DefaultLayouts';
import { getAllTag, getAllitems } from '../services/product.service';
import SearchInput from '../components/Fragments/SearchInput';
import Tag from '../components/Fragments/Tag';
import { useLogin } from '../hooks/useLogin';
import SelectSearch from '../components/Fragments/SelectSearch';




const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState([products]);
    const [tags, setTags] = useState([]);
   
    useLogin();

    useEffect(() => {
        getAllitems((data) => {
           setProducts(data.data)
           setSearch(data.data)
        });
    }, [])

    useEffect(() => {
        getAllTag((data) => {
          setTags(data)
        })
    }, [])

    const handleChange = (e) => {
        setSearch(products.filter(f => f.name.toLowerCase().includes(e.target.value)))
    }
    
  return (
    <DefaultLayout>
        <div className='justify-center py-3'> 
            <div className='flex flex-wrap'>
                {/* <div className='flex-col w-full mb-6 mx-2'>
                    <SelectSearch onChange={handleChange} />
                </div> */}
                <div className='flex-col w-10/12 mb-6 mx-2'>
                    <SearchInput onChange={handleChange} />
                </div>
                <div className='mb-8 ml-2 w-8/12'>
                {tags.map(tag => (
                    <Tag key={tag._id} name={tag.name} />
                ))}     
                </div>  
            <div className='w-full flex flex-wrap' />
            {products.length > 0 &&
               search.map((product) => (
                <CardProduct key={product._id}>
                    <CardProduct.Header image={"http://localhost:3000/images/products/"+ product.image_url.toLowerCase()} id={product._id} />
                        <CardProduct.Body name={product.name}>
                            {product.description}
                        </CardProduct.Body>
                    <CardProduct.Footer 
                        price={product.price} 
                        id={product._id}  
                    />
                </CardProduct> 
            ))}
            </div>
        
        </div>
    </DefaultLayout>
  )
}

export default ProductsPage