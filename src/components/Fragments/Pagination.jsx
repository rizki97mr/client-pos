import React from 'react'

export const PaginationMedium = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange
}) => {
  const totalPage = Math.ceil(total / itemsPerPage)
  const pages = Array.from({length:totalPage}, (_,i) => i + 1)
  const handlePageChange = (page) => {
    if(page === currentPage) return;

    onPageChange(page)
  }
  const handlePrev = () => {
    if(currentPage === 1) return;

    onPageChange(currentPage - 1)
  }
  const handleNext = () => {
    if(currentPage === totalPage) return;

    onPageChange(currentPage + 1)
  }

  // console.log(pages, totalPage, total, itemsPerPage)
  return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <span
                    className="flex items-center justify-center cursor-pointer px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={handlePrev}
                    >
                      Previous
                  </span>
                </li>
                {
                  pages.map((page, index) => (
                <li key={index}>
                <span className={`
                  flex 
                  items-center 
                  justify-center 
                  px-3 h-8 
                  leading-tight
                  ${currentPage === page ? 'text-white' : 'text-gray-500'} 
                  bg-white 
                  cursor-pointer
                  border 
                  border-gray-300 
                  hover:bg-gray-100 
                  hover:text-gray-700 
                  dark:bg-gray-800 
                  dark:border-gray-700 
                  ${currentPage === page ? 'dark:text-white' : 'dark:text-gray-400'}
                  dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => handlePageChange(page)}
                >{page}</span>
                </li>
                ))
              }
                <li>
                <span 
                onClick={handleNext}
                className="flex items-center justify-center cursor-pointer px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                </li>
            </ul>
        </nav>
  )
}

export const PaginationLarge = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange
}) => {
  const totalPage = Math.ceil(total / itemsPerPage)
  const pages = Array.from({length:totalPage}, (_,i) => i + 1)
  const handlePageChange = (page) => {
    if(page === currentPage) return;

    onPageChange(page)
  }
  const handlePrev = () => {
    if(currentPage === 1) return;

    onPageChange(currentPage - 1)
  }
  const handleNext = () => {
    if(currentPage === totalPage) return;

    onPageChange(currentPage + 1)
  }

  // console.log(pages, totalPage, total, itemsPerPage)
  return (
    <nav aria-label="Page navigation example" className='justify-center  py-3'>
        <ul className="inline-flex -space-x-px text-base h-10 py-3 justify-center">
            <li>
                <span
                onClick={handlePrev}
                className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</span>
            </li>
          {
            pages.map((page, index) => (
              <li key={index}>
              <span className={
                `flex 
                items-center 
                justify-center 
                px-4 h-10 
                leading-tight 
                ${currentPage === page ? 'text-white' : 'text-gray-500'}
                bg-white 
                border 
                border-gray-300 
                hover:bg-gray-100 
                hover:text-gray-700 
                dark:bg-gray-800 
                dark:border-gray-700 
                ${currentPage === page ? 'dark:text-white' : 'dark:text-gray-400'}
                dark:hover:bg-gray-700 dark:hover:text-white`}
                onClick={() => handlePageChange(page)}
                >{page}</span>
            </li>
            ))
          }
          <li>
            <span
            onClick={handleNext}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
          </li>
            
        </ul>
    </nav>
  )
}
