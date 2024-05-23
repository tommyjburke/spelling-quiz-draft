import { useState, useRef, useEffect } from 'react'
// import spellingData from '../data/spellingLists.json'
import ksData2 from '../data/ksData2.json'
import SpellingConfigForm from './SpellingConfigForm'
import './SpellingConsole.css'
import useSound from 'use-sound'
import gunshot from '../media/gunshot.mp3'
import WordFilterLength from './WordFilterLength'
import RandomWordSelector from './RandomWordSelector'
import TypewriterEffect from './TypewriterEffect'

const buttonStyle = {
   display: 'inline-flex',
   width: '100%',
   margin: '0 0px 1rem 0px',
   padding: '0 10px 0 10px ',
   justifyContent: 'flex-start',
   border: '0px solid black',
}

const backButtonStyle = {
   backgroundColor: 'lightBlue',
   color: 'black',
   flexGrow: '-1',
}

const leftFormBox = {
   alignItems: 'flex-start',
   textAlign: 'left',
   alignSelf: 'felx-start',
   flexGrow: '1',
   flexShrink: '1',
   width: 'auto',
   flexBasis: '0',
   padding: '5px',
}

const rightWordListBox = {
   flexGrow: '2',
   flexShrink: '2',
   flexBasis: '0',
}

export default function SpellingConsole({ children }) {
   const [shoot] = useSound(gunshot)
   const [formData, setFormData] = useState({
      lesson: '',
      customTitle: '',
      message: '',
      previewWords: false,
      usePreviewWordsTimer: false,
      useGameTimer: false,
      words: [],
      minWordLength: 0,
      maxWordLength: 12,
   })

   const [selectedYear, setSelectedYear] = useState(null)
   const [selectedLesson, setSelectedLesson] = useState(null)
   const [wordArray, setWordArray] = useState([])
   const [filteredWords, setFilteredWords] = useState([])
   const [tempFilteredWords, setTempFilteredWords] = useState([])

   const handleYearClick = (year) => {
      setSelectedYear(year)
      setSelectedLesson(null)
   }

   const handleLessonClick = (lesson) => {
      setSelectedLesson(lesson)
      const words = lesson.wordArray
      setWordArray(words)
      setFilteredWords(words)
      setTempFilteredWords(words)
   }

   const renderYearButtons = () => {
      const years = Object.keys(ksData2.year)

      if (!selectedYear) {
         return (
            <div style={buttonStyle}>
               {years.map((year) => (
                  <button
                     key={year}
                     onClick={() => handleYearClick(year)}
                  >
                     {year}
                  </button>
               ))}
            </div>
         )
      }
      return null
   }

   const renderLessonButtons = () => {
      if (!selectedYear) return null
      const lessons = ksData2.year[selectedYear].lessons
      return (
         <div style={buttonStyle}>
            {lessons.map((lesson) => (
               <button
                  key={lesson.name}
                  onClick={() => handleLessonClick(lesson)}
               >
                  {lesson.name}
               </button>
            ))}
            <button
               style={backButtonStyle}
               onClick={handleGoBack}
            >
               ⏎ Go Back
            </button>
         </div>
      )
   }

   const handleGoBack = () => {
      setSelectedYear(null)
      setSelectedLesson(null)
      setWordArray([])
   }

   const shootWord = (index, word) => {
      shoot()
      console.log(word, index)
      const tempArray = [...filteredWords]
      tempArray.splice(index, 1)
      setFilteredWords(tempArray)
      setTempFilteredWords(tempArray)
      console.log('NEW ARRAY: ', filteredWords)
   }

   return (
      <div className='mainContainer'>
         <h1>KS Spelling Console </h1>
         {/* <div>{renderButtons()}</div> */}
         <div>{renderYearButtons()}</div>

         <div>{selectedYear && renderLessonButtons()}</div>

         <div className='doubleContainer'>
            {wordArray < 1 && <h2>NO WORDS YET...</h2>}
            <div style={leftFormBox}>
               {wordArray?.length > 0 && (
                  <div>
                     CONFIG:{' '}
                     <button
                        className='cancelBtn'
                        style={{
                           position: 'relative',
                           bottom: '5px',
                           right: '-20px',
                        }}
                        onClick={() => {
                           setFilteredWords(wordArray)
                           setTempFilteredWords(wordArray)
                        }}
                     >
                        RESET
                     </button>
                     <SpellingConfigForm
                        setFormData={setFormData}
                        formData={formData}
                        lesson={selectedLesson}
                        wordArray={wordArray}
                        setWordArray={setWordArray}
                        filteredWords={filteredWords}
                        setFilteredWords={setFilteredWords}
                        tempFilteredWords={tempFilteredWords}
                        setTempFilteredWords={
                           setTempFilteredWords
                        }
                     >
                        {' '}
                        <WordFilterLength
                           wordArray={wordArray}
                           setWordArray={setWordArray}
                           filteredWords={filteredWords}
                           setFilteredWords={setFilteredWords}
                           tempFilteredWords={tempFilteredWords}
                           setTempFilteredWords={
                              setTempFilteredWords
                           }
                        />
                        <RandomWordSelector
                           wordArray={wordArray}
                           setWordArray={setWordArray}
                           filteredWords={filteredWords}
                           setFilteredWords={setFilteredWords}
                           tempFilteredWords={tempFilteredWords}
                           setTempFilteredWords={
                              setTempFilteredWords
                           }
                        />
                     </SpellingConfigForm>
                     <div></div>
                  </div>
               )}
            </div>

            {wordArray?.length > 0 && (
               <div style={rightWordListBox}>
                  <div className='wordList'>
                     <h4
                        style={{
                           textDecoration: 'underline',
                           color: 'var(--myYellow)',
                           fontFamily: 'Permanent Marker',
                        }}
                     >
                        {selectedLesson.name} WORDS:{' '}
                        <span
                           style={{
                              backgroundColor: 'yellow',
                              color: 'brown',
                              float: 'right',
                              padding: '2px 5px',
                              borderRadius: '10px',
                           }}
                        >
                           🔫 TO DELETE
                        </span>
                     </h4>{' '}
                     {filteredWords === tempFilteredWords && (
                        <p>
                           {filteredWords.map((word, index) => (
                              <span
                                 className='wordTarget'
                                 key={index}
                                 onClick={() => {
                                    shootWord(index, word)
                                 }}
                              >
                                 {word}{' '}
                              </span>
                           ))}
                           <br />
                           <span className='wordCount'>
                              {filteredWords.length} words
                           </span>
                        </p>
                     )}
                     {filteredWords !== tempFilteredWords && (
                        <p>
                           {' '}
                           <span
                              style={{
                                 color: 'red',
                                 display: 'flexInline',
                              }}
                           >
                              {' '}
                              <TypewriterEffect
                                 text='Filtering........'
                                 isLooping
                              />{' '}
                           </span>
                           <br />
                           {tempFilteredWords.map(
                              (word, index) => (
                                 <span
                                    className='flashingText'
                                    style={{ color: 'yellow' }}
                                    key={index}
                                    // onClick={() => {
                                    //    shootWord(index, word)
                                    // }}
                                 >
                                    {word}{' '}
                                 </span>
                              )
                           )}
                           <br />
                           <span className='wordCount '>
                              FILTERING:{' '}
                              {tempFilteredWords.length} words
                           </span>
                        </p>
                     )}
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
