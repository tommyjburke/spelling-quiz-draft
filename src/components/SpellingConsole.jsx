import { useState } from 'react'
import spellingData from '../data/spellingLists.json'
import SpellingConfig from './SpellingConfig'

const mainContainer = {
   width: '1000px',
   height: '100vh ',
   padding: '0 1rem 0 1rem',
   maxWidth: '100%', // Ensures responsiveness on smaller screens
   margin: '0 auto', // Centers the container horizontally
   border: '1px solid black', // Optional: for visual debugging
}

const doubleContainer = {
   display: 'flex',
   flexWrap: 'wrap',
   // height: '100vh',
   width: '100%',
   justifyContent: 'space-between',
   border: '1px solid black', // Added for visual debugging
   alignContent: 'flex-start',
   padding: '10px',
}

const left = {
   // alignItems: 'flex-start',
   // textAlign: 'left',
   // alignSelf: 'felx-start',
   // flexGrow: '1',
   // flexShrink: '0',
   width: 'auto',
}

const right = {
   flexGrow: '1',
   // flexShrink: '1',
   width: 'auto%',
}

export default function SpellingConsole() {
   const [selectedId, setSelectedId] = useState(null)
   const [formData, setFormData] = useState({
      theme: '',
      userTitle: '',
      message: '',
      previewWords: false,
      usePreviewTimer: false,
      useTimer: false,
      words: [],
      minWordLength: 0,
      maxWordLength: 0,
   })
   const [currentLevel, setCurrentLevel] = useState(null)
   const [currentWords, setCurrentWords] = useState([])

   const handleButtonClick = (key) => {
      if (!currentLevel) {
         setCurrentLevel(key)
         setCurrentWords([])
      } else {
         const themeData = spellingData[currentLevel]
         if (themeData) {
            const words =
               themeData.find((item) => item.theme === key)
                  ?.words || []
            setCurrentWords(words)
         }
      }
   }

   const handleGoBack = () => {
      setCurrentLevel(null)
      setCurrentWords([])
   }

   const renderButtons = () => {
      const keys = currentLevel
         ? spellingData[currentLevel].map((item) => item.theme)
         : Object.keys(spellingData)
      return (
         <div
            style={{
               display: 'inline-flex',
               width: '100%',
               margin: '0 0px 1rem 0px',
               padding: '0 10px 0 10px ',
               justifyContent: 'space-between',
               border: '0px solid black', // Added for visual debugging
            }}
         >
            {keys.map((key) => (
               <button
                  key={key}
                  onClick={() => handleButtonClick(key)}
                  style={{ flexGrow: '1' }}
               >
                  {key}
               </button>
            ))}
            {currentLevel && (
               <button
                  style={{
                     backgroundColor: 'lightBlue',
                     // alignSelf: 'stretch',
                     flexGrow: '-1',
                  }}
                  onClick={handleGoBack}
               >
                  Go Back
               </button>
            )}
         </div>
      )
   }

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target
      setFormData({
         ...formData,
         [name]: type === 'checkbox' ? checked : value,
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log(JSON.stringify(formData, null, 2))
   }

   return (
      <div style={mainContainer}>
         <h1>SPELLING CONSOLE</h1>
         <div>{renderButtons()}</div>

         <div style={doubleContainer}>
            <div style={left}>
               {currentWords.length > 0 && (
                  <SpellingConfig
                     handleChange={handleChange}
                     handleSubmit={handleSubmit}
                     setFormData={setFormData}
                     formData={formData}
                  />
               )}
            </div>

            {currentWords.length > 0 && (
               <div style={right}>
                  <h3>Words:</h3>
                  <p
                     style={{
                        border: '1px dashed',
                        margin: '1rem',
                        padding: '1.5rem',
                        fontSize: '2rem',
                        borderRadius: '3rem',
                        lineHeight: '1.4',
                        position: 'relative',
                     }}
                  >
                     {currentWords.map((word, index) => (
                        <span key={index}>{word} </span>
                     ))}
                     <br />
                     <span
                        style={{
                           color: 'green',
                           background: 'yellow',
                           padding: '0 1rem 0 1rem',
                           border: 'dotted 1px orange',
                           position: 'absolute',
                           margin: '1rem',
                           right: '0',
                           bottom: '0',
                           opacity: '0.5',
                           borderRadius: '3rem',
                           fontSize: '1.5rem',
                        }}
                     >
                        {currentWords.length} words
                     </span>
                  </p>
               </div>
            )}
         </div>
      </div>
   )
}
