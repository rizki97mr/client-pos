import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../utils/utils";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const [totalPrice, setTotalPrice] = useState(0);

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

    const totalPriceRef = useRef(null);

    useEffect(() => {
        if (cart.length > 0) {
        totalPriceRef.current.style.display = "table-row";
        } else {
        totalPriceRef.current.style.display = "none";
        }
    }, [cart]);

    return (
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
                        <td>{product.name}</td>
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
  )
}

export default TableCart