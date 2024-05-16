import React, { useEffect, useState } from 'react'
import RandomWordSelector from './RandomWordSelector'
import {
   Modal,
   Checkbox,
   Item,
   Slider,
   Button,
   Col,
   Row,
   InputNumber,
} from 'antd'

function analyzeWordLengths(allWords) {
   if (allWords.length === 0) {
      return { shortest: 0, longest: 0 } // Return 0 if the array is empty
   }

   let shortest = allWords[0].length // Initialize shortest with the length of the first word
   let longest = allWords[0].length // Initialize longest with the length of the first word

   for (let i = 1; i < allWords.length; i++) {
      const wordLength = allWords[i].length
      if (wordLength < shortest) {
         shortest = wordLength // Update shortest if current word is shorter
      }
      if (wordLength > longest) {
         longest = wordLength // Update longest if current word is longer
      }
   }

   return { shortest, longest } // Return object containing shortest and longest word lengths
}

export default function WordFilterLength({ key, allWords }) {
   const lengths = analyzeWordLengths(allWords)
   console.log('lengths: ', lengths)

   const min = lengths.shortest
   const max = lengths.longest
   console.log('min', min)
   console.log('max', max)

   const [minLength, setMinLength] = useState(parseInt(min))
   const [maxLength, setMaxLength] = useState(parseInt(max))
   const [filteredWords, setFilteredWords] = useState(allWords)

   //    console.log('FILTERED: ', AllWords)

   const handleMinLengthChange = (e) => {
      const lowerValue = parseInt(e.target.value)
      setMinLength(lowerValue)
      filterWords(lowerValue, maxLength)
   }

   const handleMaxLengthChange = (e) => {
      const upperValue = parseInt(e.target.value)
      setMaxLength(upperValue)
      filterWords(minLength, upperValue)
   }

   const handleWordLengthSlider = (sliderArray) => {
      setMinLength(sliderArray[0])
      setMaxLength(sliderArray[1])
      filterWords(minLength, maxLength)
   }

   const handleSliderBoxLower = (value) => {
      setMinLength(value)
      // setMaxLength(sliderArray[1])
      filterWords(minLength, maxLength)
   }

   const filterWords = () => {
      const filtered = allWords.filter(
         (word) =>
            word.length >= minLength && word.length <= maxLength
      )
      setFilteredWords(filtered)
   }

   useEffect(() => {
      const lengths = analyzeWordLengths(allWords)
      const min = lengths.shortest
      const max = lengths.longest
      setMinLength(min)
      setMaxLength(max)
      filterWords()
   }, [allWords])
   console.log('min: ', min)
   console.log('max: ', max)

   return (
      <div>
         {/* <div>
            <label>Minimum Word Length:</label>
            <input
               type='number'
               value={minLength}
               onChange={handleMinLengthChange}
            />
            <label>Maximum Word Length:</label>
            <input
               type='number'
               value={maxLength}
               onChange={handleMaxLengthChange}
            />
         </div> */}

         <div
            style={{
               display: 'flex',
               // flexDirection: 'row',
               justifyContent: 'center',
               // alignItems: 'center',
               // textAlign: 'center',
               width: '100%',
            }}
         >
            {/* <Row>
               <Col span={3}> */}
            <InputNumber
               min={min}
               max={max}
               value={minLength}
               onChange={(value) => setMinLength(value)}
               style={{
                  margin: '0 12px',
                  width: '60px',
               }}
            />
            {/* </Col>
               <Col span={4}> */}
            <Slider
               style={{ width: '200px' }}
               horizontal
               range
               step={1}
               min={min}
               max={max}
               value={[minLength, maxLength]}
               trackStyle={{
                  backgroundColor: 'lightgreen',
               }}
               railStyle={{ backgroundColor: 'grey' }}
               onChange={(value) => {
                  // setMinLength(value[0])
                  // setMaxLength(value[1])
                  // // setAValue(value)
                  // console.log('Slider: ', value)
                  handleWordLengthSlider(value)
               }}
            />
            {/* </Col>
               <Col span={3}> */}
            <InputNumber
               style={{
                  margin: '0 12px',
                  width: '60px',
               }}
               min={min}
               max={max}
               value={maxLength}
               onChange={(value) => setMaxLength(value)}
            />
            {/* </Col>
            </Row> */}
         </div>

         <h2>Filtered Words:</h2>

         <p>
            {filteredWords.map((word, index) => (
               <span key={index}>{word} </span>
            ))}
         </p>
         <hr />
         <div>
            <h1>RANDOM WORD SELECTOR</h1>
            <RandomWordSelector filteredWords={filteredWords} />
         </div>
         <hr />
      </div>
   )
}
