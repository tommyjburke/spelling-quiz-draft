import React, { useState, useEffect } from 'react'
import { Slider } from 'antd'

const RandomWordSelector = ({
   wordArray,
   setWordArray,
   filteredWords,
   setFilteredWords,
   tempFilteredWords,
   setTempFilteredWords,
}) => {
   // console.log('RANDOM STARTING', wordArray)
   const [selectedWords, setSelectedWords] =
      useState(filteredWords)
   const [userNumber, setUserNumber] = useState(12)

   const totalNoWords = tempFilteredWords.length

   const initialNumber = parseInt(
      totalNoWords >= 12 ? 12 : totalNoWords
   )

   const handleNumberChange = (value) => {
      // const userNumber = parseInt(e.target.value)
      setUserNumber(value)
   }

   const selectRandomWords = () => {
      const randomWords = []
      // const wordCount = Math.min(
      //    userNumber,
      //    filteredWords.length
      // )
      const shuffledWords = filteredWords.sort(
         () => Math.random() - 0.5
      )

      for (let i = 0; i < userNumber; i++) {
         randomWords.push(shuffledWords[i])
      }

      setSelectedWords(randomWords)
      setTempFilteredWords(randomWords)
      console.log('SELECTED WORDS: ', selectedWords)
   }

   // useEffect(() => {
   //    const totalNoWords = filteredWords.length
   //    // const initialNumber = parseInt(
   //    //    totalNoWords >= 12 ? 12 : totalNoWords
   //    // )

   //    // selectRandomWords()
   // }, [filteredWords])

   return (
      <div className='configBox'>
         <label>Word Limit Shuffler:</label>
         {/* <input
            type='number'
            value={userNumber}
            onChange={handleNumberChange}
         /> */}
         <div
            style={{
               display: 'flex',
               // justifyContent: 'center',
               width: '100%',
            }}
         >
            <Slider
               style={{
                  width: '200px',
                  margin: '10px 1.5rem 10px 1.5rem',
               }}
               // horizontal
               // range
               dots={true}
               step={1}
               min={1}
               max={filteredWords.length}
               value={userNumber}
               // value={[lowerValue, upperValue]}
               trackStyle={{
                  backgroundColor: 'lightgreen',
               }}
               // railStyle={{ backgroundColor: 'grey' }}
               onChange={(value) => {
                  console.log('VALUE: ', value)
                  handleNumberChange(value)
               }}
            />
            {userNumber}
         </div>
         <button onClick={selectRandomWords}>
            Select {userNumber} Random Words
         </button>
         {selectedWords !== filteredWords && (
            <button>CONFIRM</button>
         )}
         {/* <h2>Selected Words:</h2> */}
         {/* <ul>
            {selectedWords.map((word, index) => (
               <li key={index}>{word}</li>
            ))}
         </ul> */}
      </div>
   )
}

export default RandomWordSelector
