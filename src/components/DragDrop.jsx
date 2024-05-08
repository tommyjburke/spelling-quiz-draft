import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { scrambleWord } from './jsFunctions.js'

const fileTypes = ['TXT', 'CSV']
const myStyle = { backgroundColor: 'black' }

function DragDrop({ children, onAddItems }) {
   const [file, setFile] = useState(null)
   const [words, setWords] = useState([])

   function cleanWords(words) {
      return words.map((word) => word.replace(/[^a-z]/g, ''))
   }

   const handleChange = (file) => {
      //   setFile(file)
      console.log('FILE: ', file)
      const reader = new FileReader()

      reader.onload = () => {
         const fileContent = reader.result
         //  let userInput = fileContent.split(',')

         const cleanedWords = Array.from(
            new Set(
               fileContent
                  .split(/[, ]+/) // Split by commas and spaces
                  .map((word) =>
                     word
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z]/g, '')
                  )
                  .filter((word) => word !== '')
            )
         )
         console.log(cleanedWords)

         for (let i = 0; i < cleanedWords.length; i++) {
            const description = cleanedWords[i]
            const scrambled = scrambleWord(description)

            const newItem = {
               success: false,
               icon: '_',
               id: Date.now() + i,
               description,
               scrambled,
               quantity: 0,
               usersGuess: '',
               packed: false,
               verdict: null,
               showButton: true,
            }
            console.log('scrambled', scrambled)

            onAddItems(newItem)

            // arrayOfObjects.push({
            //    id: i,
            //    value: scrambled,
            // })
         }

         const arrayOfObjects = cleanedWords.map(
            (word, index) => ({
               id: index,
               scrambled: scrambleWord(word), // Applying the function to each element
               // Add more properties if needed based on the element
            })
         )
         console.log('NEWOBJECTS: ', arrayOfObjects)
      }

      reader.readAsText(file)
   }

   return (
      <span>
         <FileUploader
            handleChange={handleChange}
            multiple={false}
            name='usersFile'
            types={fileTypes}
            classes='dropBox !important'
            minSize={0}
            maxSize={1}
            //  dropMessageStyle={myStyle}
            hoverTitle='Drop here'
            label='ADD file'
            onSizeError={() => alert('Invalid Size')}
            onTypeError={() => alert('Invalid file type')}
         >
            {children}
         </FileUploader>
      </span>
   )
}

export default DragDrop
