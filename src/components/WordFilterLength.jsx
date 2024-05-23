import React, { useEffect, useState } from 'react'
// import RandomWordSelector from './RandomWordSelector'
import { Slider, InputNumber } from 'antd'

export default function WordFilterLength({
   wordArray,
   setWordArray,
   filteredWords,
   setFilteredWords,
   tempFilteredWords,
   setTempFilteredWords,
}) {
   function analyzeWordLengths(words) {
      if (!words) return
      if (words.length === 0) {
         return { shortest: 0, longest: 0 }
      }
      let shortest = words[0].length
      let longest = words[0].length
      for (let i = 1; i < words.length; i++) {
         const wordLength = words[i].length
         if (wordLength < shortest) {
            shortest = wordLength
         }
         if (wordLength > longest) {
            longest = wordLength
         }
      }
      // console.log('LONGEST', longest)
      // console.log('SHORTEST', shortest)
      setMinLength(shortest)
      setMaxLength(longest)
      return { shortest, longest }
   }

   const [minLength, setMinLength] = useState(0)
   const [maxLength, setMaxLength] = useState(0)
   const [lengths, setLengths] = useState([])

   const [newFiltered, setNewFiltered] = useState(filteredWords)
   const [lowerValue, setLowerValue] = useState(minLength)
   const [upperValue, setUpperValue] = useState(maxLength)

   useEffect(() => {
      const testLengths = analyzeWordLengths(wordArray)
      const min = testLengths.shortest
      const max = testLengths.longest
      setLengths([min, max])
      setMinLength(min)
      setMaxLength(max)
      setLowerValue(min)
      setUpperValue(max)
   }, [wordArray])

   // console.log('LENGTHS STATE: ', lengths)
   // console.log('minL', minLength)
   // console.log('maxL', maxLength)

   const handleWordLengthSlider = (sliderArray) => {
      let lower = sliderArray[0]
      let upper = sliderArray[1]
      // console.log('handle slider', sliderArray)
      // console.log('lower upper', lower, upper)
      filterWords(lower, upper)
   }

   const filterWords = (lower, upper) => {
      const newlyFiltered = filteredWords.filter(
         (word) => word.length >= lower && word.length <= upper
      )
      console.log('NEW FILTERED', newlyFiltered)
      setNewFiltered(newlyFiltered)
      setTempFilteredWords(newlyFiltered)
   }

   if (lengths.length === 0) {
      return null
   }

   return (
      <div className='configBox'>
         <label>
            Filter Word Length ({lowerValue} to {upperValue})
         </label>

         <div>
            <div
               style={{
                  display: 'flex',
                  // justifyContent: 'center',
                  width: '100%',
               }}
            >
               <span className='sliderNumber'> {minLength}</span>

               <Slider
                  style={{
                     width: '200px',
                     margin: '10px 1.2rem 10px 1.2rem',
                  }}
                  // horizontal
                  range
                  // dots={true}
                  step={1}
                  min={minLength}
                  max={maxLength}
                  toolTip={true}
                  defaultValue={[0, 12]}
                  // value={[lowerValue, upperValue]}
                  trackStyle={{
                     backgroundColor: 'lightgreen',
                  }}
                  // railStyle={{ backgroundColor: 'grey' }}
                  onChange={(value) => {
                     // console.log('VALUE: ', value)
                     setLowerValue(value[0])
                     setUpperValue(value[1])
                     handleWordLengthSlider(value)
                  }}
               />

               {maxLength}
               <br />
            </div>
            {filteredWords !== newFiltered && (
               <div style={{ textAlign: 'right' }}>
                  <button
                     className='cancelBtn'
                     onClick={() =>
                        setTempFilteredWords(filteredWords)
                     }
                  >
                     Cancel
                  </button>

                  <button
                     className='confirmBtn flashingBorder'
                     onClick={() =>
                        setFilteredWords(tempFilteredWords)
                     }
                  >
                     Confirm
                  </button>
               </div>
            )}
         </div>
      </div>
   )
}
