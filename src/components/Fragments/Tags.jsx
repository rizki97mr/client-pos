import React, { useEffect, useState } from 'react'
import { getAllTag } from '../../services/product.service';



export default function Tag() {
        const [tags, setTags] = useState([]);
       
        useEffect(() => {
          getAllTag((data) => {
            setTags(data)
          })
        }, [])
        return (
                 <ul className="items-center  my-2 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">   
                   {tags.map(tag => (
                      <li key={tag._id} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input id="vue-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                              <label htmlFor="vue-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tag.name}</label>
                          </div>
                      </li>
                        ))}     
                  </ul>
        )
      }