import { Link, Outlet } from 'react-router-dom'

const navigation = [
   { name: 'Spelling Console', href: '/spelling-console' },
   { name: 'Spelling Custom', href: '/spelling-custom' },
   { name: 'Spelling Practice', href: '/spelling-list' },
]

const header = {
   padding: '30px',
   margin: '30px',
}

export default function NavBar() {
   return (
      <div style={{ display: 'flexInline' }}>
         {navigation.map((item) => (
            <Link key={item.name} to={item.href} style={header}>
               {item.name}
            </Link>
         ))}
         <Outlet />
      </div>
   )
}
