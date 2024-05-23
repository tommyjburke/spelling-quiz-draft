import { Slider } from 'antd'
import RandomWordSelector from './RandomWordSelector'
import WordFilterLength from './WordFilterLength'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function convertSecondsToMinutes(seconds) {
   const minutes = Math.floor(seconds / 60)
   const remainingSeconds = seconds % 60
   return `${minutes}:${
      remainingSeconds < 10 ? '0' : ''
   }${remainingSeconds}`
}

export default function SpellingConfigForm({
   children,
   formData,
   setFormData,
   lesson,
   wordArray,
   setWordArray,
   filteredWords,
   setFilteredWords,
   tempFilteredWords,
   setTempFilteredWords,
}) {
   const navigate = useNavigate()
   // console.log('LESSON TO FORM: ', lesson)
   const currentDate = new Date()
   let todaysDate = currentDate
      .toLocaleDateString('zh-UK')
      .toString()

   const [timerSeconds, setTimerSeconds] = useState(60)
   const [customTitle, setCustomTitle] = useState(todaysDate)
   const [newUri, setNewUri] = useState('')

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target
      setFormData({
         ...formData,
         [name]: type === 'checkbox' ? checked : value,
      })
   }

   const handleTitleChange = (e) => {
      setCustomTitle(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log('SUBMITTED')
      const gameData2 = {
         timerSeconds: timerSeconds,
         lesson: lesson.name,
         description: lesson.description,
         customTitle: customTitle,
         newWords: filteredWords,
      }

      const uriString = encodeURIComponent(
         JSON.stringify(gameData2)
      )
      // const uriEncrypted = btoa(uriString)

      // console.log('ENCRYPTED: ', uriEncrypted)
      setNewUri(uriString)

      navigate('/ks-test/' + uriString)

      // const encoded = btoa(JSON.stringify(gameData))

      // console.log('e', e)
      // e.preventDefault()
      // console.log(JSON.stringify(formData, null, 2))
      // console.log('uri', uri)
      // // console.log('uri', uri)
      // console.log('encoded', encoded)

      // const encodedData = encodeURIComponent(
      //    JSON.stringify(gameData)
      // )
      // console.log(encodedData)
   }

   return (
      <div>
         <form
            onSubmit={handleSubmit}
            style={{
               padding: '0.3rem',
               display: 'block',
               flexDirection: '',
               alignContent: '',
               fontFamily: 'Permanent Marker',
               fontSize: '1.2rem',
               width: '25rem',
               // margin: '0 0 1rem 0',
            }}
         >
            <div>
               <span
                  style={{
                     backgroundColor: 'yellow',
                     padding: '0 1rem 0 1rem',
                     border: 'orange 1px',
                     borderRadius: '1rem',
                     color: 'red',
                     float: 'right',
                     fontSize: '1rem',
                  }}
               >
                  {filteredWords.length} words
               </span>
            </div>
            <div className='configBox'>
               <label>
                  Lesson:
                  <input
                     type='text'
                     name='Lesson'
                     value={lesson?.name}
                     onChange={handleChange}
                     disabled={true}
                  />
               </label>
            </div>

            <div className='configBox'>
               <label>
                  Custom Title:{' '}
                  <input
                     type='text'
                     name='customTitle'
                     value={customTitle}
                     onChange={handleTitleChange}
                     style={{
                        // fontColor: 'var(--myBrown)',
                        fontSize: '1rem',
                        fontColor: 'red !important',
                     }}
                  />
               </label>
            </div>

            {/* <label>
               Message:
               <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
               ></textarea>
            </label>
            <br /> */}
            {/* <label>
               Preview Words:
               <input
                  type='checkbox'
                  name='previewWords'
                  checked={formData.previewWords}
                  onChange={handleChange}
               />
            </label> */}

            {/* <div
               className='configBox'
               style={{
                  display: 'flex',
                  // justifyContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'flexStart',
                  alignContent: 'flexStart',
                  width: '100%',
                  height: '100%',
               }}
            >
               <label>
                  Use Preview Timer:{' '}
                  <input
                     type='checkbox'
                     name='usePreviewTimer'
                     checked={formData.usePreviewTimer}
                     onChange={handleChange}
                  />
               </label>
            </div> */}

            <div className='configBox'>
               <label>Timer (seconds): </label>
               {/* <input
                     type='checkbox'
                     name='useTimer'
                     checked={formData.useTimer}
                     onChange={handleChange}
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
                        margin: '10px 1.2rem 10px 1.2rem',
                     }}
                     // horizontal

                     dots={true}
                     step={30}
                     min={30}
                     max={360}
                     // value={[lowerValue, upperValue]}
                     trackStyle={{
                        backgroundColor: 'lightgreen',
                     }}
                     // railStyle={{ backgroundColor: 'grey' }}
                     onChange={(value) => {
                        console.log('VALUE: ', value)
                        setTimerSeconds(value)
                     }}
                  />
                  {convertSecondsToMinutes(timerSeconds)}
               </div>
            </div>

            {/* <label>
               # words:
               <input
                  type='text'
                  name='words'
                  value={wordArray.length}
                  onChange={handleChange}
               />
            </label> */}

            {children}

            <button
               onClick={() => handleSubmit}
               type='submit'
               style={{ float: 'right' }}
            >
               Submit
            </button>
            {/* {newUri && (
               <Link to={`/ks-test/${newUri}`}>
                  Go to Your Component
               </Link>
            )} */}
         </form>
      </div>
   )
}
