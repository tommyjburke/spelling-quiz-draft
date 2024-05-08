export const scrambleWord = (word) => {
   // Convert the word to an array of characters
   const charArray = word.split('')

   // Shuffle the array using the Fisher-Yates shuffle algorithm
   for (let i = charArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[charArray[i], charArray[j]] = [
         charArray[j],
         charArray[i],
      ]
   }

   // Convert the shuffled array back to a string
   const scrambledWord = charArray.join('')

   return scrambledWord
}
