export const playHumanSpeech = async (word) => {
   const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

   try {
      const result = await fetch(url).then((res) => res.json())
      const pronunciation =
         result[0]?.phonetics[0]?.audio ||
         result[0]?.phonetics[1]?.audio ||
         result[0]?.phonetics[2]?.audio ||
         result[0]?.phonetics[3]?.audio

      if (pronunciation) {
         const icon = '👩‍🦲'
         const audio = new Audio(pronunciation)
         console.log('audio: ', audio)
         audio.play()
         return { success: true, icon }
      } else {
         const icon = '❌'
         return { success: false, icon }
      }
   } catch (error) {
      const icon = '❌'
      return { success: false, icon }
   }
}

// Create an in-memory cache to store words and their pronunciations
// Create an in-memory cache to store words and their pronunciations
const cache = new Map()

export const getHumanSpeech = async (word) => {
   // First, check if the word is already in the cache
   if (cache.has(word)) {
      // If it is, retrieve the pronunciation from the cache
      const pronunciation = cache.get(word)
      return { icon: '✓', blob: pronunciation }
   }

   // If the word is not in the cache, fetch it from the API
   const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
   const result = await fetch(url).then((res) => res.json())

   const audioUrl =
      result[0]?.phonetics[0]?.audio ||
      result[0]?.phonetics[1]?.audio ||
      result[0]?.phonetics[2]?.audio ||
      result[0]?.phonetics[3]?.audio

   if (audioUrl) {
      // Fetch the audio file as a blob
      const audioBlob = await fetch(audioUrl).then((res) =>
         res.blob()
      )

      // Store the audio blob in the cache
      cache.set(word, audioBlob)

      return { icon: '✓', blob: audioBlob }
   } else {
      return { icon: '✗', blob: null }
   }
}
