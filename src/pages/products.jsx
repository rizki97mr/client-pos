import { useEffect, useRef, useState } from 'react';
import CardProduct from '../components/Fragments/CardProduct'
import DefaultLayout from '../components/Layouts/DefaultLayouts';
import { numberWithCommas } from '../utils/utils';
import { getProducts } from '../services/product.service';
import SearchInput from '../components/Fragments/SearchInput';
import Tag from '../components/Fragments/Tag';
import { useLogin } from '../hooks/useLogin';



const ProductsPage = () => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const totalPriceRef = useRef(null);
    useLogin();

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    useEffect(() => {
        getProducts((data) => {
           setProducts(data)
        });
    }, [])

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id);
                return acc + product.price * item.qty;
            }, 0)
            setTotalPrice(sum);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, products])

    useEffect(() => {
        if (cart.length > 0) {
          totalPriceRef.current.style.display = "table-row";
        } else {
          totalPriceRef.current.style.display = "none";
        }
      }, [cart]);

    const handleAddToCart = (id) => {
        if (cart.find((item) => item.id === id)) {
          setCart(
            cart.map((item) =>
              item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
          );
        } else {
          setCart([...cart, { id, qty: 1 }]);
        }
      };
    
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
                        handleAddToCart={handleAddToCart} 
                    />
                </CardProduct> 
            ))}
            </div>
            <div className='w-1/4' >
                <h1 className='text-3xl font-bold text-blue-600 ml-5 mb-2'>Cart</h1>
                <table className='text-left text-base table-auto border-separate border-spacing-x-5' ref={totalPriceRef}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 &&
                          cart.map((item) => {
                            const product = products.find((product) => product.id === item.id);
                            return (
                                <tr key={item.id}>
                                    <td>{product.title}</td>
                                    <td>Rp {numberWithCommas(product.price)}</td>
                                    <td>{item.qty}</td>
                                    <td>Rp {numberWithCommas (item.qty * product.price)}</td>
                                </tr>
                            )
                        })}
                        <tr className='font-bold text-lg' >
                            <td colSpan={3}>Total Price</td>
                            <td>Rp {numberWithCommas(totalPrice)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </DefaultLayout>
  )
}

export default ProductsPage