import { useEffect, useState } from 'react';
import CardProduct from '../components/Fragments/CardProduct'
import DefaultLayout from '../components/Layouts/DefaultLayouts';
import { getProducts } from '../services/product.service';
import SearchInput from '../components/Fragments/SearchInput';
import Tag from '../components/Fragments/Tag';
import { useLogin } from '../hooks/useLogin';
import TableCart from '../components/Fragments/TableCart';



const ProductsPage = () => {
    const [products, setProducts] = useState([]);
   
    useLogin();

    useEffect(() => {
        getProducts((data) => {
           setProducts(data)
        });
    }, [])

    
  return (
    <DefaultLayout>
        <div className='flex justify-center py-3'> 
            <div className='flex flex-wrap'>
                <div className='flex-col w-8/12 mb-6 mx-2'><SearchInput /></div>     
                <div className='mb-8 ml-2 w-8/12'><Tag /></div>   
            <div className='w-3/4 flex flex-wrap' />
            {products.length > 0 &&
               products.map((product) => (
                <CardProduct key={product.id}>
                    <CardProduct.Header image={product.image} id={product.id} />
                        <CardProduct.Body name={product.title}>
                            {product.description}
                        </CardProduct.Body>
                    <CardProduct.Footer 
                        price={product.price} 
                        id={product.id}  
                    />
                </CardProduct> 
            ))}
            </div>
            <div className='w-1/4' >
                <h1 className='text-3xl font-bold text-blue-600 ml-5 mb-2'>Cart</h1>
                <TableCart products={products} />
            </div>
        </div>
    </DefaultLayout>
  )
}

export default ProductsPage