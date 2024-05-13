import { useState } from 'react'
import Item from './Item'
import GameBoard from './GameBoard'
import Slider1 from './Slider1'

export default function PackingList({
   items,
   reScrambleWord,
   onDeleteItem,
   onToggleItem,
   onClearList,
   speechSpeed,
   setSpeechSpeed,
}) {
   const [sortBy, setSortBy] = useState('input')
   const [showMenu, setShowMenu] = useState(true)

   let sortedItems

   // const readWord = (text) => {
   //    const synth = window.speechSynthesis
   //    const utterThis = new SpeechSynthesisUtterance(text)
   //    synth.speak(utterThis)
   // }

   function handleSliderChange(event) {
      setSpeechSpeed(parseFloat(event.target.value))
   }

   function assembleBoard() {
      console.log('ASSEMBLE BOARD')
      setShowMenu(false)
      console.log('all items: ', items)
   }

   if (sortBy === 'input') sortedItems = items

   if (sortBy === 'description')
      sortedItems = items
         .slice()
         .sort((a, b) =>
            a.description.localeCompare(b.description)
         )

   if (sortBy === 'packed')
      sortedItems = items
         .slice()
         .sort((a, b) => Number(a.packed) - Number(b.packed))

   if (showMenu) {
      return (
         <>
            {items.length < 1 && (
               <div className='list'>
                  Add word(s) above to begin
               </div>
            )}
            {items.length > 0 && (
               <>
                  <div className='list'>
                     <Slider1
                        value={speechSpeed}
                        onChange={setSpeechSpeed}
                     />

                     <table style={{ width: '640px' }}>
                        <thead>
                           <tr>
                              <th title='question number'> </th>
                              <th title='robot speech'>🤖</th>
                              <th title='human speech'>👩‍🦲</th>
                              <th title='Number of letter in word'>
                                 #Letters
                              </th>
                              <th>word</th>
                              <th title='scrambled spelling'>
                                 scrambled
                              </th>
                              <th title='Click to rescramble spelling'>
                                 ReScramble
                              </th>
                              <th>Delete</th>
                           </tr>
                        </thead>

                        <tbody>
                           {sortedItems.map((item, index) => (
                              <Item
                                 index={index}
                                 item={item}
                                 onDeleteItem={onDeleteItem}
                                 onToggleItem={onToggleItem}
                                 key={item.id}
                                 reScrambleWord={reScrambleWord}
                                 speechSpeed={speechSpeed}
                              />
                           ))}
                        </tbody>
                     </table>

                     <button onClick={() => assembleBoard()}>
                        ASSEMBLE BOARD
                     </button>
                     <div className='actions'>
                        <select
                           value={sortBy}
                           onChange={(e) =>
                              setSortBy(e.target.value)
                           }
                        >
                           <option value='input'>
                              Sort by input order
                           </option>
                           <option value='description'>
                              Sort by description
                           </option>
                           <option value='packed'>
                              Sort by packed status
                           </option>
                        </select>
                        <button onClick={onClearList}>
                           Clear list
                        </button>
                     </div>
                  </div>
               </>
            )}
         </>
      )
   } else {
      return (
         <>
            {/* <div className='list'>

                  &times;
               </button>{' '}
               {JSON.stringify(items)}{' '}
               {items.map((item) => (
                  <div>
                     {item.scrambled}{' '}
                     <input
                        type='text'
                        placeholder='fix spelling'
                        // value={item.usersGuess}
                        // onChange={(e) => setDescription(e.target.value)}
                        onChange={handleSpelling}
                     />
                  </div>
               ))}
            </div>
            <p></p> */}
            <GameBoard items={items} />
         </>
      )
   }
}
