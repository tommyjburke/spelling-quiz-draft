import { useState } from 'react'
import Item from './Item'
import GameBoard from './GameBoard'

export default function PackingList({
   items,
   reScrambleWord,
   onDeleteItem,
   onToggleItem,
   onClearList,
}) {
   const [sortBy, setSortBy] = useState('input')
   const [showMenu, setShowMenu] = useState(true)

   let sortedItems

   // const readWord = (text) => {
   //    const synth = window.speechSynthesis
   //    const utterThis = new SpeechSynthesisUtterance(text)
   //    synth.speak(utterThis)
   // }

   function assembleBoard() {
      console.log('ASSEMBLE BOARD')
      setShowMenu(false)
      console.log('all items: ', items)
   }

   if (sortBy === 'input') sortedItems = items

   if (sortBy === 'description')
      sortedItems = items
         .slice()
         .sort((a, b) => a.description.localeCompare(b.description))

   if (sortBy === 'packed')
      sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))

   if (showMenu) {
      return (
         <div className='list'>
            <ul>
               {sortedItems.map((item) => (
                  <Item
                     item={item}
                     onDeleteItem={onDeleteItem}
                     onToggleItem={onToggleItem}
                     key={item.id}
                     reScrambleWord={reScrambleWord}
                  />
               ))}
            </ul>

            <button onClick={() => assembleBoard()}>ASSEMBLE BOARD</button>

            <div className='actions'>
               <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
               >
                  <option value='input'>Sort by input order</option>
                  <option value='description'>Sort by description</option>
                  <option value='packed'>Sort by packed status</option>
               </select>
               <button onClick={onClearList}>Clear list</button>
            </div>
         </div>
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
