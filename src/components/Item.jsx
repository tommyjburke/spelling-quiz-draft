import { getHumanSpeech } from './humanSpeech.js'
import { playHumanSpeech } from './humanSpeech.js'
import { Popover } from 'antd'

export default function Item({
   item,
   scrambled,
   onDeleteItem,
   onToggleItem,
   reScrambleWord,
   index,
   speechSpeed,
}) {
   const readWord = (text) => {
      const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(text)
      utterThis.rate = speechSpeed
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
            <span className='largeIcon'>⏯️</span>
         </td>
         {item.hasHumanVoice ? (
            <td
               className='largeIcon'
               onClick={() => playHumanSpeech(item.description)}
            >
               <span className='largeIcon'>⏯️</span>
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
         <Popover
            content={`This word has ${item.description.length} letters`}
         >
            <td>{item.description.length}</td>
         </Popover>
         <td
            style={
               item.packed
                  ? { textDecoration: 'line-through' }
                  : {}
            }
         >
            {/* {item.quantity} */}
            {item.description} {'  '}
         </td>

         <Popover content={item.synonyms} title='Synonyms'>
            <td>{item.scrambled}</td>
         </Popover>

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
