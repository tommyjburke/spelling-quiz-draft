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

      <div key={index}>
         <span>{index + 1}.</span>
         <span>
            {' '}
            <span
               className='largeIcon'
               onClick={() => readWord(item.description)}
            >
               <span className='largeIcon'>🤖</span>
            </span>
            {item.success ? (
               <span
                  className='largeIcon'
                  onClick={() =>
                     playHumanSpeech(item.description)
                  }
               >
                  <span className='largeIcon'>{item.icon}</span>
               </span>
            ) : (
               <span className=''>␀</span>
            )}
         </span>
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
         <span>{item.description.length}</span>
         <span
            style={
               item.packed
                  ? { textDecoration: 'line-tdrough' }
                  : {}
            }
         >
            {/* {item.quantity} */}
            {item.description} {'  '}
         </span>
         <span>{item.scrambled}</span>
         <span>
            {' '}
            <span
               className='largeIcon'
               onClick={() => reScrambleWord(item)}
            >
               ♻️
            </span>
         </span>

         <span>
            {' '}
            <button
               className='largeIcon'
               onClick={() => onDeleteItem(item.id)}
            >
               <span className='largeIcon'>❌</span>
            </button>
         </span>
      </div>
      // </div>
   )
}
