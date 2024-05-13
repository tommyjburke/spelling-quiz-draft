export default function Footer({ items }) {
   if (items.length === 0)
      return (
         <p className=' footer '>
            <b>footer test component</b>
         </p>
      )

   const numItems = items.length
   const numPacked = items.filter((item) => item.packed).length
   const percentage = Math.round((numPacked / numItems) * 100)

   return (
      <div className=''>
         <footer className='footer'>
            <strong>
               {percentage === 100
                  ? 'You got everything! Ready to go ✈️'
                  : `  You have ${numItems} words 📣`}
            </strong>
         </footer>
      </div>
   )
}
