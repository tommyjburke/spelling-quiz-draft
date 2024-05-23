import NavBar from './NavBar'

export default function Home({ children }) {
   return (
      <>
         <NavBar>{children}</NavBar>
         {/* <footer>footer</footer> */}
      </>
   )
}
