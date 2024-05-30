import { Logo } from 'src/component/Icons/Icons'
import SidebarNav from 'src/component/SidebarNav/SidebarNav'

function Sidebar() {
  return (
    <aside
      id='logo-sidebar'
      className='fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform sm:translate-x-0 dark:border-gray-700 dark:bg-gray-800'
      aria-label='Sidebar'
    >
      <div className='h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800'>
        <ul className='space-y-2 font-medium'>
          <a
            href='http://localhost:3000/'
            target='_blank'
            className='flex w-full cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
          >
            <Logo />
            <span className='ml-3 flex-1 text-left'>Saatchi Art</span>
          </a>
          <SidebarNav
            path='/'
            title='Dashboard'
            renderSvg={() => (
              <svg
                aria-hidden='true'
                className='h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z' />
                <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z' />
              </svg>
            )}
          />
          {/* <SidebarNav
            path='/user'
            title='Thành viên'
            renderSvg={() => (
              <svg
                fill='currentColor'
                className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 384 512'
              >
               
                <path d='M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM128 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM80 432c0-44.2 35.8-80 80-80h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16z' />
              </svg>
            )}
          /> */}

          <SidebarNav
            menu={[
              {
                title: 'Tranh',
                path: '/product'
              },
              {
                title: 'Chủ đề tranh',
                path: '/topic'
              }
            ]}
            title='Sản phẩm'
            renderSvg={() => (
              <svg
                aria-hidden='true'
                className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          />
          <SidebarNav
            title='Đơn nhập kho'
            path='/bill-inventory'
            // menu={[
            //   {
            //     title: 'Đơn nhập',
            //     path: '/bill-inventory'
            //   }
            //   ,
            //   {
            //     title: 'Tồn kho',
            //     path: '/warehouse'
            //   }
            // ]}
            renderSvg={() => (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 640 512'
                className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
              >
                {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                <path d='M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z' />
              </svg>
            )}
          />
          <SidebarNav
            title='Đơn hàng'
            path='/orders'
            renderSvg={() => (
              <svg
                className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 576 512'
              >
                {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                <path d='M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z' />
              </svg>
            )}
          />
          <SidebarNav
            path='/customer'
            title='Khách hàng'
            renderSvg={() => (
              <svg
                aria-hidden='true'
                className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
              </svg>
            )}
          />
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
