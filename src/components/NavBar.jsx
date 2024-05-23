import { NavLink, Outlet } from 'react-router-dom'
import Footer from './Footer'

const navigation = [
   { name: 'Spelling Console', href: '/spelling-console' },
   { name: 'Spelling Custom', href: '/spelling-custom' },
   { name: 'Spelling Practice', href: '/spelling-list' },
]

const header = {
   // padding: '30px',
   // margin: '30px',
}

export default function NavBar() {
   return (
      <div className='navBarContainer'>
         <div className='navBar'>
            {navigation.map((item) => (
               <NavLink
                  key={item.name}
                  to={item.href}
                  // className='header'
                  className={({ isActive }) => {
                     return isActive
                        ? 'text-primary'
                        : 'text-gray'
                  }}
               >
                  {item.name}
               </NavLink>
            ))}
         </div>
         <>
            {' '}
            <Outlet />
         </>{' '}
         {/* <Footer
               // items={items}
               /> */}
         <div className='footer'>
            © T.J. Burke {new Date().getFullYear()}
         </div>
      </div>
   )
}
