import { useEffect, useState } from 'react';
import CardProduct from '../components/Fragments/CardProduct'
import DefaultLayout from '../components/Layouts/DefaultLayouts';
import { getAllitems, getProducts } from '../services/product.service';
import SearchInput from '../components/Fragments/SearchInput';
import Tag from '../components/Fragments/Tag';
import { useLogin } from '../hooks/useLogin';




const ProductsPage = () => {
    const [products, setProducts] = useState([]);
   
    useLogin();

    useEffect(() => {
        getAllitems((data) => {
           setProducts(data.data)
           console.log(data)
        });
    }, [])

    
  return (
    <DefaultLayout>
        <div className='flex justify-center py-3'> 
            <div className='flex flex-wrap'>
                <div className='flex-col w-full
                 mb-6 mx-2'><SearchInput /></div>     
                <div className='mb-8 ml-2 w-8/12'><Tag /></div>   
            <div className='w-full flex flex-wrap' />
            {products.length > 0 &&
               products.map((product) => (
                <CardProduct key={product.id}>
                    <CardProduct.Header image={product.image} id={product.id} />
                        <CardProduct.Body name={product.name}>
                            {product.description}
                        </CardProduct.Body>
                    <CardProduct.Footer 
                        price={product.price} 
                        id={product.id}  
                    />
                </CardProduct> 
            ))}
            </div>
        
        </div>
    </DefaultLayout>
  )
}

export default ProductsPage