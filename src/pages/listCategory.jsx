import React from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { useLogin } from '../hooks/useLogin';

const ListCategory = () => {
  useLogin();
  return (
    <DefaultLayout>
        <div class="px-2">
            <h1 tabindex="0" class="focus:outline-none text-sm leading-5 py-4 text-gray-600">List Category</h1>
                <div tabindex="0" class="focus:outline-none flex">
                <div class="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">#dogecoin</div>
                <div class="py-2 px-4 ml-3 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">#crypto</div>
                </div>
        </div>
    </DefaultLayout>
  )
}

export default ListCategory