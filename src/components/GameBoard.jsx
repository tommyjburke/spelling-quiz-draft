import { isDisabled } from '@testing-library/user-event/dist/utils'
import React, { useState } from 'react'
import { playHumanSpeech } from './humanSpeech.js'

function GameBoard({ items, setShowMenu }) {
   const [userAttempts, setUserAttempts] = useState([])
   const [score, setScore] = useState(0)
   const [incorrect, setIncorrect] = useState(0)
   const [userAnswers, setUserAnswers] = useState(items)
   console.log('userAnswers: ', userAnswers)

   const readWord = (text) => {
      const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(text)
      synth.speak(utterThis)
   }

   const handleGuess = (index, guess) => {
      const newItems = [...items]
      console.log('newItems: ', newItems)

      newItems[index].usersGuess = guess
      console.log('guess: ', guess)

      setUserAttempts(newItems)
      console.log('userAttempts: ', userAttempts)
   }

   const checkGuess = (index, verdict) => {
      const item = items[index]
      console.log('CHECKING item: ', item)
      if (item.usersGuess.toLowerCase() === item.description) {
         // alert('Correct!')
         item.verdict = '✅'
         console.log('item: ', item)
         setScore(score + 1)
      } else {
         setIncorrect(incorrect + 1)
         item.verdict = '❌'
      }
      item.showButton = false
      console.log('CONCLUDING item: ', item)
      console.log('updated items: ', items)
      const numCorrect = items.filter(
         (item) => item.verdict === '✅'
      ).length
      console.log('numCorrect: ', numCorrect)
   }

   const percentage = Math.round(
      (score / items.length) * 100 || 0
   )

   // Function to change the name of a variable
   const changeVariableName = (data, oldName, newName) => {
      return data.map((item) => {
         const newItem = { ...item }
         const oldValue = newItem[oldName]
         delete newItem[oldName]
         newItem[newName] = oldValue
         return newItem
      })
   }

   // Function to change the value of a variable
   const changeVariableValue = (
      data,
      variableName,
      newValue
   ) => {
      return data.map((item) => ({
         ...item,
         [variableName]: newValue,
      }))
   }

   function compileData(originalData) {
      // const newData = changeVariableName(items, 'description', 'word')
      // const updatedData = changeVariableValue(newData, 'packed', true)

      // console.log(updatedData)

      const data = items.map((item) => {
         return {
            id: item.id,
            word: item.description,
            scrambled: item.scrambled,
            usersGuess: '',
            verdict: null,
            showButton: true,
         }
      })
      console.log('data: ', data)
      return data
   }

   return (
      <div className='table-container list2'>
         <button onClick={() => setShowMenu(false)}>
            Close
         </button>
         <button
            className='close'
            onClick={() => setShowMenu(false)}
         ></button>
         <div className='table-container'>
            <h2>
               {' '}
               Questions: {items.length} Score: {score} (
               {percentage}%){' '}
            </h2>

            <div className='table-container'>
               {' '}
               {/* Apply containerStyle to center the table */}
               <table>
                  <tr>
                     <th>*</th>
                     <th>🤖</th>
                     <th>👩‍🦲</th>
                     <th>Scrambled</th>
                     <th>Your Guess</th>
                     <th>Letters</th>
                     <th></th>
                  </tr>
                  {items.map((item, index) => (
                     <tr key={item.id}>
                        <td>({index + 1}) </td>
                        <td>
                           {' '}
                           <span
                              className='largeIcon'
                              onClick={() =>
                                 readWord(item.description)
                              }
                           >
                              ▶️
                           </span>
                        </td>
                        <td>
                           <span
                              className='largeIcon'
                              onClick={() =>
                                 playHumanSpeech(
                                    item.description
                                 )
                              }
                           >
                              {item.success ? '▶️' : ' '}
                           </span>
                        </td>
                        <td>{item.scrambled} </td>
                        <td>
                           <input
                              className='centred'
                              type='text'
                              value={item.usersGuess}
                              onChange={(e) =>
                                 handleGuess(
                                    index,
                                    e.target.value
                                 )
                              }
                              // placeholder='Write here'
                              disabled={
                                 item.verdict === '✅' ||
                                 item.verdict === '❌'
                              }
                           />
                        </td>
                        <td>
                           {item.description.length -
                              item.usersGuess?.length}
                           {}
                        </td>
                        <td>
                           {item.showButton && (
                              <button
                                 onClick={() =>
                                    checkGuess(index)
                                 }
                              >
                                 Check
                              </button>
                           )}{' '}
                           {item.verdict && (
                              <span>{item.verdict}</span>
                           )}
                        </td>
                     </tr>
                  ))}
               </table>
            </div>
         </div>
         <p
            style={{ width: '100%', margin: '0 auto' }}
            className='longString'
         >
            {/* {JSON.stringify(items)} */}
         </p>
         <button onClick={() => compileData(items)}>
            SAVE QUIZ
         </button>
      </div>
   )
}
export default GameBoard
