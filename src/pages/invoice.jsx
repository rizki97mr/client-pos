import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { useParams } from 'react-router-dom';
import { getDetailInvoice } from '../services/product.service';
import { numberWithCommas } from '../utils/utils';

const Invoice = () => {
    const [invoice, setInvoice] = useState ({});
    const {id} = useParams();

    useEffect(() => {
        getDetailInvoice(id, (data) => {
            setInvoice(data)
            console.log(data)
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
                    <div className="text-sm">Date: {invoice.createdAt}</div>
                    <div className="text-sm">Invoice #: INV{invoice._id}</div>
                </div>
            </div>
            <div className="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
                <div className="text-gray-700 mb-2">{invoice.user.full_name}</div>
                <div className="text-gray-700 mb-2">{invoice.delivery_address.kabupaten}, {invoice.delivery_address.provinsi}</div>
                <div className="text-gray-700 mb-2">{invoice.delivery_address.kelurahan}, {invoice.delivery_address.detail}</div>
                <div className="text-gray-700">{invoice.user.email}</div>
            </div>
            <table className="w-full text-left mb-8">
                <thead>
                    <tr>
                        <th className="text-gray-700 font-bold uppercase py-2">Description</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-4 text-gray-700">{invoice.order_items}</td>
                        <td className="py-4 text-gray-700">1</td>
                        <td className="py-4 text-gray-700">$100.00</td>
                        <td className="py-4 text-gray-700">$100.00</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Delivery Fee:</div>
                <div className="text-gray-700">{numberWithCommas(invoice.delivery_fee)}</div>
            </div>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Subtotal:</div>
                <div className="text-gray-700">{numberWithCommas(invoice.sub_total)}</div>
            </div>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Total:</div>
                <div className="text-gray-700 font-bold text-xl">Rp {numberWithCommas(invoice.total)}</div>
            </div>
            <div className="border-t-2 border-gray-300 pt-8 mb-8">
                <div className="text-gray-700 mb-2">Payment is due within 1 days.</div>
                <div className="text-gray-700 mb-2">Please make checks payable to Your virtual acount Number and mail to: rizki@gmail.com</div>
                <div className="text-gray-700">123 Main St., Bandung, Indonesia 12345</div>
            </div>
        </div>
    </DefaultLayout>
  )
}

export default Invoice