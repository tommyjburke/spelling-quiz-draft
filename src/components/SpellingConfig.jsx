export default function SpellingConfig({
   handleSubmit,
   formData,
   setFormData,
   handleChange,
}) {
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <label>
               Theme:
               <input
                  type='text'
                  name='theme'
                  value={formData.theme}
                  onChange={handleChange}
               />
            </label>
            <br />
            <label>
               User Title:
               <input
                  type='text'
                  name='userTitle'
                  value={formData.userTitle}
                  onChange={handleChange}
               />
            </label>
            <br />
            <label>
               Message:
               <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
               ></textarea>
            </label>
            <br />
            <label>
               Preview Words:
               <input
                  type='checkbox'
                  name='previewWords'
                  checked={formData.previewWords}
                  onChange={handleChange}
               />
            </label>
            <br />
            <label>
               Use Preview Timer:
               <input
                  type='checkbox'
                  name='usePreviewTimer'
                  checked={formData.usePreviewTimer}
                  onChange={handleChange}
               />
            </label>
            <br />
            <label>
               Use Timer:
               <input
                  type='checkbox'
                  name='useTimer'
                  checked={formData.useTimer}
                  onChange={handleChange}
               />
            </label>
            <br />
            <label>
               Words:
               <input
                  type='text'
                  name='words'
                  value={formData.words}
                  onChange={handleChange}
               />
            </label>
            <br />
            <label>
               Min Word Length:
               <input
                  type='number'
                  name='minWordLength'
                  value={formData.minWordLength}
                  onChange={handleChange}
               />
            </label>
            <br />
            <label>
               Max Word Length:
               <input
                  type='number'
                  name='maxWordLength'
                  value={formData.maxWordLength}
                  onChange={handleChange}
               />
            </label>
            <br />
            <button type='submit'>Submit</button>
         </form>
      </div>
   )
}
