import { useParams } from 'react-router-dom'
import ksWords from '../media/ksWords.json'
import { Link } from 'react-router-dom'

export default function KSTemplate() {
   const id = useParams().ksId
   console.log(id)

   const array = ksWords[id]

   function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
         // Generate a random index between 0 and i
         const j = Math.floor(Math.random() * (i + 1))

         // Swap elements at indices i and j
         const temp = array[i]
         array[i] = array[j]
         array[j] = temp
      }
      return array
   }

   let myStringedArray = ksWords[id]
      ? ksWords[id].toString()
      : null

   console.log(myStringedArray)

   let shuffled = array ? shuffle(array) : 'INVALID'

   return (
      <div>
         <h1>
            KSTemplate<p>{id}</p>
         </h1>
         {/* {JSON.stringify(ksWords)} */}
         <h1>{myStringedArray}</h1>
         <div>
            <h1>
               <Link to='/'>BACK TO HAPPY GIRAFFE</Link>
            </h1>
            {/* <h1>{shuffled}</h1> */}
         </div>
      </div>
   )
}
