export default function Item({
   item,
   scrambled,
   onDeleteItem,
   onToggleItem,
   reScrambleWord,
}) {
   const readWord = (text) => {
      const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(text)
      synth.speak(utterThis)
   }

   return (
      <li>
         {/* <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      /> */}
         <tr>
            <td>
               {' '}
               <span
                  className='largeIcon'
                  onClick={() => readWord(item.description)}
               >
                  <span className='largeIcon'>▶️</span>
               </span>
            </td>
            <td>{item.description.length}</td>
            <td style={item.packed ? { textDecoration: 'line-tdrough' } : {}}>
               {/* {item.quantity} */}
               {item.description} {'  '}
            </td>
            <td>{item.scrambled}</td>
            <td>
               {' '}
               <span
                  className='largeIcon'
                  onClick={() => reScrambleWord(item)}
               >
                  ♻️
               </span>
            </td>

            <td>
               {' '}
               <button
                  className='largeIcon'
                  onClick={() => onDeleteItem(item.id)}
               >
                  <span className='largeIcon'>❌</span>
               </button>
            </td>
         </tr>
      </li>
   )
}
