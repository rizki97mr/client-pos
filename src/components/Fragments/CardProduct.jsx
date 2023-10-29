import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/utils";
import Button from "../Elements/Button"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from "react-redux";
import { message } from "antd";
import { addtocart } from "../../redux/feature/card/actions";

const CardProduct = (props) => {
    const { children } = props
  return (
    <div className='w-full max-w-xs mx-2 bg-gray-600 border-gray-700 rounded-lg shadow m-2 flex flex-col'>
        {children}                   
    </div>
  )
}

const Header = (props) => {
    const {image, id} = props
    return (
        <Link to={`/product/${id}`}>
            <img 
                src={image}
                alt="product" 
                className='p-3 rounded-t-lg h-56 w-full object-cover'
            />
        </Link>
    )
}

const Body = (props) => {
    const { name, children } = props
    return (
        <div className='px-5 pb-5'>
            <a href="">
                <h5 className='text-xl font-semibold tracking-tight text-white pb-2'>
                    {name.substring(0,15)}
                </h5>
                <p className='text-s text-white'>
                    {children.substring(0,100)}
                </p>
            </a>
        </div>
    ) 
};

const Footer = (props) => {
    const { product } = props;
    const dispatch = useDispatch();

    return (
        <div className='flex items-center justify-between px-5 pb-5'>
            <span className='text-xl font-bold text-white'>Rp {numberWithCommas(product.price)}</span>
            <Button 
                classname="bg-blue-600" 
                onClick={() => {
                    dispatch(addtocart( product ));
                    message.success('item added Sucessfully');
                }}
            >
                <AddShoppingCartIcon />
            </Button>
        </div> 
    )
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;


export default CardProduct;