import { Link } from 'react-router-dom'

export default function Error404() {
   return (
      <>
         <h1 className='add-form'>Error404</h1>

         <h1>
            <Link to='/'>BACK TO HAPPY GIRAFFE</Link>
         </h1>
      </>
   )
}
