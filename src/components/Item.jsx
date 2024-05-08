import { getHumanSpeech } from './humanSpeech.js'
import { playHumanSpeech } from './humanSpeech.js'

export default function Item({
   item,
   scrambled,
   onDeleteItem,
   onToggleItem,
   reScrambleWord,
   index,
}) {
   const readWord = (text) => {
      const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(text)
      synth.speak(utterThis)
   }

   return (
      // <div key={index}>

      <tr key={index}>
         <td>{index + 1}.</td>

         <td
            className='largeIcon'
            onClick={() => readWord(item.description)}
         >
            <span className='largeIcon'>🤖</span>
         </td>
         {item.success ? (
            <td
               className='largeIcon'
               onClick={() => playHumanSpeech(item.description)}
            >
               <span className='largeIcon'>{item.icon}</span>
            </td>
         ) : (
            <td className=''>␀</td>
         )}

         {/* <td>
               <span
                  className='largeIcon'
                  onClick={() =>
                     handleHumanSpeech(item.description)
                  }
               >
                  <span className='largeIcon'>👩‍🦲</span>
               </span>
            </td> */}
         <td>{item.description.length}</td>
         <td
            style={
               item.packed
                  ? { textDecoration: 'line-tdrough' }
                  : {}
            }
         >
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
      // </div>
   )
}
