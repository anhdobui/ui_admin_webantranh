import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'

function Header() {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)
  return (
    <nav className='fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start'>
            <button
              data-drawer-target='logo-sidebar'
              data-drawer-toggle='logo-sidebar'
              aria-controls='logo-sidebar'
              type='button'
              className='inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            >
              <span className='sr-only'>Open sidebar</span>
              <svg
                className='h-6 w-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  clipRule='evenodd'
                  fillRule='evenodd'
                  d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                />
              </svg>
            </button>
            <a href='/' className='ml-2 flex md:mr-24'>
              <span className='self-center whitespace-nowrap text-xl font-semibold sm:text-2xl dark:text-white'>
                Admin
              </span>
            </a>
          </div>
          <div className='flex items-center'>
            <div className='group relative ml-3 flex items-center'>
              <div className=''>
                <button
                  type='button'
                  className='flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                  aria-expanded='false'
                  data-dropdown-toggle='dropdown-user'
                >
                  <span className='sr-only'>Open user menu</span>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                    alt='user'
                  />
                </button>
              </div>
              <div
                className='absolute right-0 top-4 z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base opacity-0 shadow duration-300 group-hover:block group-hover:opacity-100 dark:divide-gray-600 dark:bg-gray-700'
                id='dropdown-user'
              >
                <div className='px-4 py-3' role='none'>
                  <p className='text-sm text-gray-900 dark:text-white' role='none'>
                    Neil Sims
                  </p>
                  <p className='truncate text-sm font-medium text-gray-900 dark:text-gray-300' role='none'>
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className='py-1' role='none'>
                  <li>
                    <a
                      href='/'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                      role='menuitem'
                      onClick={(e) => {
                        e.preventDefault()
                        clearLS()
                        setIsAuthenticated(false)
                        navigate('/')
                      }}
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
