import Header from './Header'
import Form from './Form'
import PackingList from './PackingList'
import Footer from './Footer'
import { useState } from 'react'

export default function SpellingCustom() {
   const [items, setItems] = useState([])
   const [speechSpeed, setSpeechSpeed] = useState(1)

   const readWord = (text) => {
      const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(text)
      synth.speak(utterThis)
   }

   function buildBoard() {
      console.log('BuildBoard')
   }

   const reScrambleWord = (item) => {
      console.log('ITEM: ', item)
      let word = item.description
      const charArray = word.split('')

      for (let i = charArray.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1))
         ;[charArray[i], charArray[j]] = [
            charArray[j],
            charArray[i],
         ]
      }

      // Convert the shuffled array back to a string
      const scrambledWord = charArray.join('')
      console.log('Re-scrambled', scrambledWord)

      // Update the scrambled property of the existing item
      const updatedItem = {
         ...item,
         scrambled: scrambledWord,
      }

      // Update the items array with the updated item
      setItems((prevItems) => {
         const updatedItems = prevItems.map((prevItem) =>
            prevItem === item ? updatedItem : prevItem
         )
         return updatedItems
      })
   }

   function handleAddItems(item) {
      setItems((items) => [...items, item])
   }

   function handleDeleteItem(id) {
      setItems((items) => items.filter((item) => item.id !== id))
   }

   function handleToggleItem(id) {
      setItems((items) =>
         items.map((item) =>
            item.id === id
               ? { ...item, packed: !item.packed }
               : item
         )
      )
   }

   function handleClearList() {
      const confirmed = window.confirm(
         'Are you sure you want to delete all items?'
      )

      if (confirmed) setItems([])
   }
   return (
      <>
         <div className='app'>
            <Header />
            <Form onAddItems={handleAddItems} />
            <PackingList
               items={items}
               onDeleteItem={handleDeleteItem}
               onToggleItem={handleToggleItem}
               onClearList={handleClearList}
               reScrambleWord={reScrambleWord}
               speechSpeed={speechSpeed}
               setSpeechSpeed={setSpeechSpeed}
            />
            <Footer items={items} />
         </div>
      </>
   )
}
