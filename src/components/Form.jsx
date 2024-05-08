import { useState, useEffect } from 'react'
import { getHumanSpeech } from './humanSpeech.js'
import { verifyHumanSpeech } from './humanSpeech.js'
import DragDrop from './DragDrop.jsx'
import UploadLogo from './UploadLogo.jsx'
import txtIcon from './text-icon.png'

export default function Form({ onAddItems }) {
   const [description, setDescription] = useState('')
   const [quantity, setQuantity] = useState(1)
   // const [scrambled, setScrambled] = useState('')
   const [showWarning, setShowWarning] = useState('')
   const [result, setResult] = useState({
      icon: null,
      blob: null,
   })
   const [audioUrl, setAudioUrl] = useState(null)

   const warning = 'Alphabetical characters only!'

   const scrambleWord = (word) => {
      // Convert the word to an array of characters
      const charArray = word.split('')

      // Shuffle the array using the Fisher-Yates shuffle algorithm
      for (let i = charArray.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1))
         ;[charArray[i], charArray[j]] = [
            charArray[j],
            charArray[i],
         ]
      }

      // Convert the shuffled array back to a string
      const scrambledWord = charArray.join('')

      return scrambledWord
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (!description) return

      const { success, icon } = await verifyHumanSpeech(
         description
      )

      console.log('icon: ', icon)

      const scrambled = scrambleWord(description)

      const newItem = {
         success,
         icon,
         id: Date.now(),
         description,
         scrambled,
         quantity,
         usersGuess: '',
         packed: false,
         verdict: null,
         showButton: true,
      }
      console.log('scrambled', scrambled)

      onAddItems(newItem)

      setDescription('')
      setQuantity(1)
   }

   function handleChange(e) {
      const inputValue = e.target.value.toLowerCase()

      // Regex pattern to match only alphabetical characters
      const pattern = /^[A-Za-z]*$/

      // Check if the input matches the pattern and does not contain spaces
      if (
         pattern.test(inputValue) &&
         !inputValue.includes(' ')
      ) {
         setDescription(inputValue)
      } else {
         // alert('Please enter only alphabetical characters')
         setShowWarning(true)
      }
   }

   useEffect(() => {
      let timeoutId
      if (showWarning) {
         timeoutId = setTimeout(() => {
            setShowWarning(false)
         }, 5000) // 5 seconds
      }
      return () => clearTimeout(timeoutId)
   }, [showWarning])

   return (
      <div>
         <div>
            <form className='add-form' onSubmit={handleSubmit}>
               <h3>Add word:</h3>
               {/* <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
         >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
               <option
                  value={num}
                  key={num}
               >
                  {num}
               </option>
            ))}
         </select> */}
               <input
                  type='text'
                  placeholder='new word...'
                  value={description}
                  // onChange={(e) => setDescription(e.target.value)}
                  onChange={handleChange}
               />
               <button>Add</button>
               <DragDrop onAddItems={onAddItems}>
                  {/* <span className='dropBox'> */}
                  {/* Upload/Drag Txt{' '} */}
                  {/* <img
                        src={txtIcon}
                        alt='txt file'
                        height='50px'
                     /> */}
                  {/* </span> */}
                  <UploadLogo />
               </DragDrop>
            </form>
         </div>
         <div>
            {showWarning && <p className='warning'>{warning}</p>}
         </div>
      </div>
   )
}
