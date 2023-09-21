import { useEffect, useState } from "react";
import { useParams }from "react-router-dom";
import { getDetailItems } from "../services/product.service";
import DefaultLayout from "../components/Layouts/DefaultLayouts";
import { numberWithCommas } from "../utils/utils";

const DetailProduct = () => {
  const [detail, setDetail] = useState ({});
  const {id} = useParams();

  useEffect(() => {
    getDetailItems(id, (data) => {
        setDetail(data)
    })
  }, [id])



  
  return (
    <DefaultLayout>
        <div className="flex font-sans">
            <div className="flex-none w-48 relative">
                <img src={"http://localhost:3000/images/products/"+ detail.image_url} alt={detail.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <form className="flex-auto p-6">
                <div className="flex flex-wrap">
                <h1 className="flex-auto text-lg font-semibold text-slate-900">
                    {detail.name}
                </h1>
                <div className="text-lg font-semibold text-slate-500">
                    {detail.price}
                </div>
                <div className="w-full text-lg font-semibold text-slate-700 mt-2">
                   {detail.price}
                    {/* Rp {numberWithCommas(detail.price)} */}
                </div>
                </div>
                <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                <div className="space-x-2 flex text-sm">
                    {detail.description}
                </div>
                </div>
                <div className="flex space-x-4 mb-6 text-sm font-medium">
                <div className="flex-auto flex space-x-4">
                    <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                    Add to Cart
                    </button>
                </div>
                </div>
                <p className="text-sm text-slate-700">
                    {detail.description}
                </p>
            </form>
            </div>
    </DefaultLayout>
  )
}

export default DetailProduct;