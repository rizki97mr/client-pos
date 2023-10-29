import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { Link, useParams } from 'react-router-dom';
import { getDetailInvoice } from '../services/product.service';
import { numberWithCommas } from '../utils/utils';

const Invoice = () => {
    const [invoices, setInvoices] = useState ({});
    const {id} = useParams();

    useEffect(() => {
        getDetailInvoice(id, (data) => {
            setInvoices(data)
        })
      }, [id])

  return (
    <DefaultLayout>
        <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <img className="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                        alt="Logo" />
                    <div className="text-gray-700 font-semibold text-lg">POS MART</div>
                </div>
                <div className="text-gray-700">
                    <div className="font-bold text-xl mb-2">INVOICE</div>
                    <div className="text-sm">Date: {invoices.createdAt?.substring(0,10)}</div>
                    <div className="text-sm">Invoice #: INV{invoices._id?.substring(0,8)}</div>
                </div>
            </div>
            <div className="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
                <div className="text-gray-700 mb-2">{invoices.user?.full_name}</div>
                <div className="text-gray-700">{invoices.user?.email}</div>
                <div className="text-gray-700 mb-2">{invoices.delivery_address?.kabupaten}, {invoices.delivery_address?.provinsi}</div>
                <div className="text-gray-700 mb-2">{invoices.delivery_address?.kelurahan}, {invoices.delivery_address?.detail}</div>
            </div>
            <table className="w-full text-left mb-8">
                <thead>
                    
                    <tr>
                        <th className="text-gray-700 font-bold uppercase py-2">Items</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                {invoices.order?.order_items.map(invoice => (
                    <tr key={invoice._id}>
                        <td className="py-4 text-gray-700">{invoice.name}</td>
                        <td className="py-4 text-gray-700">{invoice.qty}</td>
                        <td className="py-4 text-gray-700">{invoice.price}</td>
                        <td className="py-4 text-gray-700">{invoice.qty * invoice.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Delivery Fee:</div>
                <div className="text-gray-700">Rp {numberWithCommas(invoices.delivery_fee)}</div>
            </div>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Subtotal:</div>
                <div className="text-gray-700">Rp {numberWithCommas(invoices.sub_total)}</div>
            </div>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Total:</div>
                <div className="text-gray-700 font-bold text-xl">Rp {numberWithCommas(invoices.total)}</div>
            </div>
            <div className="border-t-2 border-gray-300 pt-8 mb-8">
                <div className="text-gray-700 mb-2">Payment is due within 1 days.</div>
                <div className="text-gray-700 mb-2">Please make checks payable to Your virtual acount Number and mail to: rizki@gmail.com</div>
                <div className="text-gray-700">123 Main St., Bandung, Indonesia 12345</div>
            </div>
        </div>
         <Link to={`/`}>           
            <button className="bg-blue-500 text-white text-base font-semibold py-2 px-4 rounded-lg mt-4 w-full">Back to Shop</button>
        </Link>
    </DefaultLayout>
  )
}

export default Invoice