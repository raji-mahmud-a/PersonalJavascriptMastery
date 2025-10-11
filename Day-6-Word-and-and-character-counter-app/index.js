const CharacterBucket = document.getElementById('CharacterBucket')
const CharacterCountText = document.getElementById('CharacterCountText')
const WordCountText = document.getElementById('WordCountText')

CharacterBucket.addEventListener('input', (e)=> {
  const textBuffer = e.target.value
  CharacterCountText.innerText = `${textBuffer.length} Characters`
  WordCountText.innerText = `${textBuffer.split(" ").length} Words `
})