import { useState } from 'react'

export default function Form({ onAddItems }) {
   const [description, setDescription] = useState('')
   const [quantity, setQuantity] = useState(1)
   // const [scrambled, setScrambled] = useState('')
   const [warning, setWarning] = useState('')

   const scrambleWord = (word) => {
      // Convert the word to an array of characters
      const charArray = word.split('')

      // Shuffle the array using the Fisher-Yates shuffle algorithm
      for (let i = charArray.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1))
         ;[charArray[i], charArray[j]] = [charArray[j], charArray[i]]
      }

      // Convert the shuffled array back to a string
      const scrambledWord = charArray.join('')

      return scrambledWord
   }

   function handleSubmit(e) {
      e.preventDefault()

      if (!description) return

      const scrambled = scrambleWord(description)

      const newItem = {
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
      if (pattern.test(inputValue) && !inputValue.includes(' ')) {
         setDescription(inputValue)
      } else {
         // alert('Please enter only alphabetical characters')
         setWarning('Please enter only alphabetical characters')
      }
   }
   // setDescription(e.target.value)

   return (
      <form
         className='add-form'
         onSubmit={handleSubmit}
      >
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
         <br />
         <br />
         <p style={{ color: 'darkred', fontSize: '14px' }}>{warning}</p>
      </form>
   )
}
