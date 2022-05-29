var level1 = document.getElementById('levelId1')
var level2 = document.getElementById('levelId2')
var level3 = document.getElementById('levelId3')
var canvasStyle = document.getElementById('canvasStyle')
var levelBox = document.getElementById('levelBox')
var levelCount = 0
var playerCounter
console.log(level1)


level1.addEventListener('click', () => {
    levelCount = 1
    levelBox.style.visibility = 'hidden'
    canvasStyle.style.visibility = 'visible'
    playerCounter = 3
    document.getElementById('playerLives').innerHTML = "lives: " + playerCounter
    if(localStorage.getItem('bestScore')){
        document.getElementById('bestPointHtml').innerHTML = "Best: " + localStorage.getItem('bestScore')
    }
    stage1()
    
})

level2.addEventListener('click', () => {
    levelCount = 2
    levelBox.style.visibility = 'hidden'
    canvasStyle.style.visibility = 'visible'
    playerCounter = 3
     document.getElementById('playerLives').innerHTML = "lives: " + playerCounter
     if(localStorage.getItem('bestScore')){
        document.getElementById('bestPointHtml').innerHTML = "Best: " + localStorage.getItem('bestScore')
    }stage2()
})

level3.addEventListener('click', () => {
    levelCount = 3
    levelBox.style.visibility = 'hidden'
    canvasStyle.style.visibility = 'visible'
    playerCounter = 3
    pointCounter = 0
     document.getElementById('playerLives').innerHTML = "lives: " + playerCounter
     if(localStorage.getItem('bestScore')){
         document.getElementById('bestPointHtml').innerHTML = "Best: " + localStorage.getItem('bestScore')
     }
     stage3()
})


