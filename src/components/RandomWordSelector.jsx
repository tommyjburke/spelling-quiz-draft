import React, { useState, useEffect } from 'react'

const RandomWordSelector = ({ filteredWords }) => {
   const totalNoWords = filteredWords.length

   const initialNumber = parseInt(
      totalNoWords >= 12 ? 12 : totalNoWords
   )

   const [selectedWords, setSelectedWords] = useState([])
   // const [number, setNumber] = useState({})
   const [userNumber, setUserNumber] = useState(initialNumber)

   const handleNumberChange = (e) => {
      const userNumber = parseInt(e.target.value)
      setUserNumber(userNumber)
   }

   const selectRandomWords = () => {
      const randomWords = []
      const wordCount = Math.min(
         userNumber,
         filteredWords.length
      )
      const shuffledWords = filteredWords.sort(
         () => Math.random() - 0.5
      ) // Shuffle the words array

      for (let i = 0; i < wordCount; i++) {
         randomWords.push(shuffledWords[i])
      }

      setSelectedWords(randomWords)
   }

   useEffect(() => {
      const totalNoWords = filteredWords.length

      const initialNumber = parseInt(
         totalNoWords >= 12 ? 12 : totalNoWords
      )

      selectRandomWords()
   }, [filteredWords, userNumber])

   return (
      <div>
         <label>Number of Words to Select:</label>
         <input
            type='number'
            value={userNumber}
            onChange={handleNumberChange}
         />
         <button onClick={selectRandomWords}>
            Select Words
         </button>
         <h2>Selected Words:</h2>
         <ul>
            {selectedWords.map((word, index) => (
               <li key={index}>{word}</li>
            ))}
         </ul>
      </div>
   )
}

export default RandomWordSelector
