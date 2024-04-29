export default function Stats({ items }) {
   if (items.length === 0)
      return (
         <p className='stats'>
            <b>Start adding some items to your packing list 🚀</b>
         </p>
      )

   const numItems = items.length
   const numPacked = items.filter((item) => item.packed).length
   const percentage = Math.round((numPacked / numItems) * 100)

   return (
      <footer className='stats'>
         <strong>
            {percentage === 100
               ? 'You got everything! Ready to go ✈️'
               : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
         </strong>
      </footer>
   )
}
