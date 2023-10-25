import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts';
import { useLogin } from '../hooks/useLogin';
import { getAllOrder, getInvoices } from '../services/product.service';
import { numberWithCommas } from '../utils/utils';
import { Button } from 'antd';
import { PaginationMedium } from '../components/Fragments/Pagination';


const ReportPage = () => {
    useLogin();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalData, setTotalData] = useState(0);
       
    useLogin();

    useEffect(() => {
        fetchData()
    }, [page])

    const fetchData = async () => {
        const data = await getInvoices({
            limit: limit,
            skip: (page-1) * limit,
        })
        console.log(data.data)
        setOrders(data.data)
        setTotalData(data.count)
    }
    
  
return (
    <DefaultLayout>
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100 shadow-lg">
                <thead className="text-xs text-white uppercase bg-blue-800 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Item
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Item
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delivery Address 
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delivery Fee
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action  
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, orderIndex) => (
                    <tr key={order._id} className="bg-blue-500 border-b border-blue-400">
                        <td scope="row" className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                            {orderIndex + 1}
                        </td>
                        <td scope="row" className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                            {order.order_items?.name}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                            {order.item_count}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                            {order.delivery_address.provinsi}, {order.delivery_address.kabupaten}, {order.delivery_address.kecamatan}, {order.delivery_address.kelurahan}, {order.delivery_address.detail}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                        Rp {numberWithCommas(order.delivery_fee)}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-50 dark:text-blue-100">
                        <Button 
                            className="block bg-blue-900 text-white text-base my-3 justify-right items-right " >
                                Pay
                            </Button>
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                            <button 
                            className="cursor-not-allowed rounded-full px-2 py-1 bg-yellow-400 text-black font-semibold text-base my-3 justify-right items-right " >
                                {order.status}
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center py-3'>
              <PaginationMedium
                  total={totalData}
                  itemsPerPage={limit}
                  currentPage={page}
                  onPageChange={setPage}
              />
            </div>  
        </div>
    </DefaultLayout>
    )
}

export default ReportPage;