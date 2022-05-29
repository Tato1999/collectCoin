
function stage2(){

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)


var i = 0

class Sprite{
    constructor({
        position,
        imageSrc,
        height,
        width
    }){
        this.position = position
        this.height = height
        this.width = width
        this.image = new Image()
        this.image.src = imageSrc
    }
    draw(){
        for(var i = 0; i<5; i++){
        c.drawImage(this.image, this.position.x[i],this.position.y, this.width, this.height)
        }
    }
    update(){
        this.draw()
    }
}



const tree = new Sprite({
    position: {
        x: [0,500,1000,1500],
        y: 0
    },
    imageSrc: './Tiny Platformer - Forest Asset Pack/Background/Layer_01.png',
    height: canvas.height,
    width: 500
})
const treeBlue = new Sprite({
    position: {
        x: [0,500,1000,1500],
        y: 275
    },
    imageSrc: './Tiny Platformer - Forest Asset Pack/Background/Layer_02.png',
    height: 250,
    width: 300
})



class box{
    constructor({width = 150, height, position, quantity, imageSrc, brickPosition, dir, setRectOption, scale}){
        this.position = position
        this.width = width
        this.height = height
        this.quantity = quantity
        this.image = new Image()
        this.image.src = imageSrc
        this.brickPosition = brickPosition
        this.brickRealPosition
        this.realWidth = 0
        this.realHeight = 40
        this.dir = dir
        this.setRectOption = setRectOption
        this.scale = scale
    }
    draw(){
        c.fillStyle = 'black'
        if(this.setRectOption == 1){
            for(i = 0 ; i <= this.quantity; i++){
                c.fillRect(this.position.x[i], this.position.y[i], this.width[i] * this.scale, (this.height[i] * this.scale)-12)
            }
        }
        for(i = 0 ; i <= this.position.x.length-1; i++){
           //c.fillRect(this.position.x[i], this.position.y[i], this.width[i], this.height[i])
           for(let j = 0; j < this.width[i]/50; j++){
               for(let k = 0; k < this.height[i]/40; k++){
                   if((j % 2) == 0 || (k % 2) != 0)   {
                    
                    this.brickRealPosition = this.brickPosition[0]
                    this.realWidth = 32
                    this.realHeight = 60
                       
                   }else{
                       
                    this.brickRealPosition = this.brickPosition[1]
                    this.realWidth = 50
                    this.realHeight = 40
                   }
                c.drawImage(
                    this.image, 
                    this.brickRealPosition,
                    0,
                    this.realWidth, 
                    this.realHeight,
                    this.position.x[i] + (50 * j), 
                    this.position.y[i] + (40 * k),
                    50 * this.scale, 
                    40 * this.scale)
               }
           }
        }
    }
    update(){
        this.draw()


//moving platforms

        for(let j = 0; j<this.quantity; j++){
            if(this.dir[j] == 1){
                this.position.y[j]+=2

                if(this.position.y[j] >= canvas.height){
                    this.position.y[j] = -100
                }
            }else if(this.dir[j] ==2){
                this.position.y[j] -=2

                if(this.position.y[j] <= 0){
                    this.position.y[j] = canvas.height + 100
                }
            }
            if(player.position.y + player.height >= platform.position.y[4] &&
                player.position.y + player.height <= platform.position.y[4]+5 &&
                player.position.x + player.width >= platform.position.x[4] &&
                player.position.x <= platform.position.x[4] + platform.width[4]){
                player.position.y -= 3
                
            }
        }



//stop player on platform

       for(let j = 0; j<this.quantity; j++){
       
             if((player.position.y + player.height + player.velocity.y >= this.position.y[j] && 
            player.position.y + player.height <= this.position.y[j]) &&
            (player.position.x +  + player.width > this.position.x[j] && 
             player.position.x < this.position.x[j] + this.width[j])){
    
                 player.velocity.y = 0
            
                 jumpCounter = 0
                 clickCount = 3
                 

            }
        }

// stop enemy left/right platform
    

        if(this.position.x[0] + this.width[0] >= newEnemy.position.x[0] &&
                newEnemy.position.y[0] + newEnemy.height >= this.position.y[0] &&
                newEnemy.position.y[0] + newEnemy.height >= this.position.y[0] + this.height[0] &&
                newEnemy.position.x[0] + newEnemy.width/2 <= player.position.x){
            
                  newEnemy.velocity.x[0] = 1.5

        }else if(newEnemy.position.x[1] + newEnemy.width >= this.position.y[3]&&
                 newEnemy.position.x[1]+ newEnemy.width <= this.position.y[3] + 10 &&
                 newEnemy.position.y[1] + newEnemy.height >= this.position.y[3] &&
                 newEnemy.position.y[1] + newEnemy.height >= this.position.y[3] + this.height[3] &&
                 newEnemy.position.x[1] + newEnemy.width/2 > player.position.x
                 ){
                    newEnemy.velocity.x[1] = -1.5
                 }
    }
}

const platform = new box({
    position:{
        x: [canvas.width/2 - 150,canvas.width/2 + 150,canvas.width/2 - 220, 150, 900],
        y: [canvas.height - 300, canvas.height - 200,canvas.height - 100, 200, 200]
    },
    height: [300, 70, 70, 40, 40],
    width: [300, 90, 90, 90, 90],
    quantity: 5,
    imageSrc: './Tiny Platformer - Forest Asset Pack/Tileset(16x16)/Tileset.png',
    brickPosition: [0, 32],
    dir: [0, 0, 0, 1, 2],
    scale: 1
})





const weapon = new box({
    position:{
        x: [360, 460, 560],
        y: [-10, -10, -10]
    },
    height: [40, 40, 40],
    width: [50, 50, 50],
    quantity: 3,
    imageSrc: './Tiny Platformer - Forest Asset Pack/Tileset(16x16)/Tileset.png',
    brickPosition: [87, 87, 87],
    dir: [0, 0, 0],
    setRectOption: 1,
    scale: 1.5
})

class Ammo {
    constructor({
        width,
        height,
        position,
        velocity
    }){
    this.position = position
    this.width = width
    this.height = height
    this.velocity = velocity
    this.gravity = 0.2
    this.counter = 0
    this.delay = 0
    }

    draw(){
        for(let i = 0; i < this.position.x.length; i++){
        c.fillStyle = 'black'
        c.fillRect(this.position.x[i], this.position.y[i], this.width, this.height)
        }
    }


    update(){
        this.draw()
        this.delay++
        if(this.delay%Math.floor((Math.random()*100)+50) == 0){
            this.velocity.y[0] = 2  
        }else if(this.delay%Math.floor((Math.random()*150)+100) == 0){
            this.velocity.y[1] = 2
        }else if (this.delay%Math.floor((Math.random()*200)+150) == 0){
            this.velocity.y[2] = 2
        }
        ammo1()
        ammo2()
        ammo3()

        for(let i = 0; i < this.position.y.length; i++){
            if(player.position.y <= this.position.y[i] &&
                player.position.x + player.width >= this.position.x[i]&&
                player.position.x < this.position.x[i] + this.width&&
                player.position.y + player.height > this.position.y[i] 
                ){
                    
                    
                    player.position.y = -10
                    player.position.x = canvas.width/2 + 150

                    playerCounter--

                    document.getElementById('playerLives').innerHTML = "lives: " + playerCounter

                }
        }

    }
}


const ammo = new Ammo({
    position: {
        x: [380,480,580],
        y: [5,5,5]
    },
    width: 38,
    height: 17,
    velocity: {
        x: 0,
        y: [0, 0, 0]
    }
})

function ammo1(){
    ammo.position.y[0] += ammo.velocity.y[0]
    if(ammo.position.y[0] >= platform.position.y[0]){
        ammo.position.y[0] = 5
        ammo.velocity.y[0] = 0
    }
}
 function ammo2(){
    ammo.position.y[1] += ammo.velocity.y[1]
    if(ammo.position.y[1] >= platform.position.y[0]){
        ammo.position.y[1] = 5
        ammo.velocity.y[1] = 0
    }
 }
 function ammo3(){
    ammo.position.y[2] += ammo.velocity.y[2]
    if(ammo.position.y[2] >= platform.position.y[0]){
        ammo.position.y[2] = 5
        ammo.velocity.y[2] = 0
    }
 }

class Player{
    constructor({width, height, position, velocity, imageSrc, maxFrame, players}){
        this.position = position
        this.width = 30
        this.height= 50
        this.gravity = 0.5
        this.velocity = velocity
        this.image = new Image()
        this.image.src = imageSrc
        this.maxFrame = maxFrame
        this.changeFrame = 0
        this.delay = 0
        this.players = players

        for(const sprite in this.players){
            players[sprite].image = new Image()
            players[sprite].image.src = players[sprite].imageSrc
            players[sprite].maxFrame = players[sprite].maxFrame
        }
 }

draw(){
   // c.fillStyle = 'black'
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(
        this.image,
        (this.image.width/this.maxFrame)*this.changeFrame,
        0,
        this.width,
        this.height,
        this.position.x-this.width,
        this.position.y-this.height/2,
        (this.image.width/this.maxFrame)*2,
        (this.height)*2
    )
    }

update(){
        this.draw() 
        this.delay++
       if(this.delay%10 == 0){
            if(this.changeFrame < this.maxFrame-1){
                this.changeFrame++
            }else{
                this.changeFrame = 0
            }
        }

//fall down gravity

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if((this.position.y + this.height + this.velocity.y >= canvas.height)) {
            this.velocity.y = 0
            
            jumpCounter = 0
            clickCount = 3
        }else{
            this.velocity.y += this.gravity
        }

// stop around platform walls

        for(let i = 0 ; i < platform.quantity; i++){

            if(this.position.x <= platform.position.x[i] + platform.width[i] &&
                this.position.x >= platform.position.x[i] &&
                this.position.y + this.height >= platform.position.y[i] &&
                this.position.y + this.height <= platform.position.y[i] + platform.height[i]){

                    moveKeys.a.press = false

            }else if(this.position.x + this.width >= platform.position.x[i] &&
                 this.position.x <= platform.position.x[i] + platform.width[i] &&
                 this.position.y + this.height >= platform.position.y[i] &&
                 this.position.y + this.height <= platform.position.y[i] + platform.height[i]){

                     moveKeys.d.press = false
        
            }else if(this.position.x <= platform.position.x[i] + platform.width[i] &&
                this.position.x + this.width >= platform.position.x[i] &&
                this.position.y <= platform.position.y[i] + platform.height[i] &&
                this.position.y >= (platform.position.y[i] + platform.height[i]-80)){

                    moveKeys.w.press = false
                    player.velocity.y = 5

            }else if(this.position.y <= 0){
                    moveKeys.w.press = false
                    player.velocity.y = 5
            }
        }
        if(player.position.y + player.height >= canvas.height+10){
            player.position.y -= 150
        }
    }
}

const player = new Player({
    position:{
        x: Math.floor(Math.random()*100),
        y: 50
    },
    velocity:{
        x: 0,
        y: 0
    },
    imageSrc: './Tiny Platformer - Forest Asset Pack/Sprites/Player/idle.png',
    players: {
        Idle: {
            imageSrc: './Tiny Platformer - Forest Asset Pack/Sprites/Player/idle.png',
            maxFrame: 5
        },
        Run: {
            imageSrc: './Tiny Platformer - Forest Asset Pack/Sprites/Player/walk.png',
            maxFrame: 6
        },
        RunLeft: {
            imageSrc: './Tiny Platformer - Forest Asset Pack/Sprites/Player/walkLeft.png',
            maxFrame: 6
        },
        Jump: {
            imageSrc: './Tiny Platformer - Forest Asset Pack/Sprites/Player/jump.png',
            maxFrame: 1
        }
    },
    maxFrame: 5

})

// key press boolians

const moveKeys = {
    d :{
        press: false
    },
    a :{
        press: false
    },
    w :{
        press: false
    }
}

//point class and object
let pointCounter = 0

class point{
    constructor({width,height,position,gravity,velocity,counter = 0, quantity}){
        this.position = position
        this.width = 20
        this.height= 20
        this.gravity = 0.1
        this.velocity = velocity
        this.counter = counter
        this.delay = 10
        this.quantity = quantity
    }
    draw(){
        c.fillStyle = 'yellow'
        for(let k = 0; k<newPoint.quantity; k++){
            c.fillRect(this.position.x[k], this.position.y[k], this.width, this.height)
        }
    }
    update(){
        this.draw()

//point fall down gravity

        for(let k = 0; k<newPoint.quantity; k++){
        this.position.y[k] += this.velocity.y[k]
        
        this.counter++
        if((this.position.y[k] + this.height + this.velocity.y[k] >= canvas.height)) {
            this.velocity.y[k] = 0;
        }else{
            this.velocity.y[k] += this.gravity
        }
 //pointCount removeRect
        if(player.position.x + player.width >= newPoint.position.x[k] && 
            player.position.x <= newPoint.position.x[k] + newPoint.width &&
            player.position.y + player.height >= newPoint.position.y[k] &&
            player.position.y + player.height <= newPoint.position.y[k] + newPoint.height){
                 this.velocity.y[k] = 0;
                 newPoint.position.y[k] = -20
                 newPoint.position.x[k] = Math.floor(Math.random()*canvas.width)
                 pointCounter++
                 console.log(pointCounter)
                 document.querySelector('#pointHtml').innerHTML = "Point: " + pointCounter
                 
                 
            }



    }

// point stop on platform
        for(let i = 0; i<5; i++){
            for(let k = 0; k<newPoint.quantity; k++){
                if(this.position.y[k] + this.height + this.velocity.y[k] >= platform.position.y[i] && 
                this.position.y[k] + this.height <= platform.position.y[i] &&
                (this.position.x[k] +  + this.width > platform.position.x[i] && 
                this.position.x[k] < platform.position.x[i] + platform.width[i]) ) {
                 
                    this.velocity.y[k] = 0
                }
            }
        }
    }
}

const newPoint = new point({
    position: {
        x:[Math.floor(Math.random()*1000),Math.floor(Math.random()*1000),Math.floor(Math.random()*1000)],
        y: [-10,-10,-10]
    },
    velocity:{
        x: 0,
        y:[0, 0, 0]
    },
    quantity: 3

})

// lives count

let playerCounter = 3


class enemy  {
    constructor({width,height,position,velocity, imageSrc, maxFrame}){
    this.width = width
    this.height = height
    this.position = position
    this.velocity = velocity
    this.gravity = 0.1
    this.image = new Image()
    this.image.src = imageSrc
    this.maxFrame = maxFrame
    this.changeFrame = 0
    this.delay = 0
    }

    draw(){
       // c.fillStyle = 'black'
       // c.fillRect(this.position.x, this.position.y, this.width, this.height)
       for(let i = 0; i < 2; i++){
        c.drawImage(
            this.image,
            (this.image.width/this.maxFrame)*this.changeFrame,
            0,
            this.image.width/this.maxFrame,
            this.height,
            this.position.x[i]-20,
            this.position.y[i]-12,
            (this.image.width/this.maxFrame)*2,
            (this.height)*2
        )
        
    }
}
    update(){
        this.draw()

        this.delay++
        if(this.delay%10 == 0){
             if(this.changeFrame < this.maxFrame-1){
                 this.changeFrame++
             }else{
                 this.changeFrame = 0
             }
         }

//enemy fall down gravity

    for(let i = 0; i<2; i++){

        this.position.x[i] += this.velocity.x[i]
        this.position.y[i] += this.velocity.y[i]
        if((this.position.y[i] + this.height + this.velocity.y[i] >= canvas.height)) {
            this.velocity.y[i] = 0;
        }else{
            this.velocity.y[i] += this.gravity
        }
    }

//enemy move left/right
    for(let i = 0; i < 2; i++){
        if(this.position.x[i] + this.width/2 <= player.position.x){
            this.velocity.x[i] = 1.5
        }else if (this.position.x[i] + this.width/2 > player.position.x){
            this.velocity.x[i] = -1.5
        }
    }

//after enemy kill transform position
    for(let i = 0 ; i<2; i++){
        if(this.position.x[i] <= player.position.x + player.width && this.position.x[i] + this.width > player.position.x
            && (this.position.y[i] <= player.position.y + player.height && 
            this.position.y[i] + this.height/3 >= player.position.y + player.height)){
               this.position.y[i] = -10
        }
    }

//after player kill transform position
    for(let i = 0; i<2; i++){
        if(this.position.x[i] <= player.position.x + player.width && this.position.x[i] + this.width > player.position.x
          && (this.position.y[i] + this.height) - ((this.height/3)*1.5) <= player.position.y + player.height &&
            this.position.y[i] + this.height > player.position.y + player.height){
              player.position.y = -10
              player.position.x = canvas.width/2 + 150
              playerCounter--
              document.getElementById('playerLives').innerHTML = "lives: " + playerCounter
        }
    }

//stop enemy move, when touch platforms
          
       for(let j = 0; j<5; j++){
        for(let i = 0; i<2; i++){
             if((this.position.y[i] + this.height + this.velocity.y[i] >= platform.position.y[j] && 
                this.position.y[i] + this.height <= platform.position.y[j]) &&
                (this.position.x[i] +  + this.width > platform.position.x[j] && 
                this.position.x[i] < platform.position.x[j] + platform.width[j])){
                    this.velocity.y[i] = 0;
            }
        
            if(this.position.x[i] <= platform.position.x[j] + platform.width[j] &&
                this.position.x[i] + this.width >= platform.position.x[j] &&
                this.position.y[i] + this.height > platform.position.y[j] && 
                this.position.y[i] < platform.position.y[j] + platform.height[j]){
               
                        this.velocity.x[i] = 0
                        
            }
          }
        }
    }
}


const newEnemy = new enemy ({
    position:{
        x: [Math.floor(Math.random()*250) + 750,Math.floor(Math.random()*250)],
        y: [100, 100]
    },
    width: 50,
    height: 70,
    velocity:{
        x:[0,0],
        y:[0,0]
    },
    imageSrc: './Tiny Platformer - Forest Asset Pack/Sprites/Enemies/Enemy_01/idle.png',
    
    maxFrame: 5
})

let firstClick = false
let secondClick = false
let jumpCounter = 0
let clickCount = 3

function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'green'
    c.fillRect(0,0, canvas.width, canvas.height)
    treeBlue.update()

    tree.update()
    
    newPoint.update()
    newEnemy.update()
    
    player.update()
    platform.update()

    weapon.update()
    ammo.update()


     //kill 
     if(playerCounter <= 0){
         pointInLocal()
         location.reload()
        levelBox.style.visibility = 'visible'
        canvasStyle.style.visibility = 'hidden'
        playerCounter = 3
        pointCounter = 0
    }


    //character move code 
    player.velocity.x = 0
        
    player.image = player.players.Idle.image
    player.maxFrame = player.players.Idle.maxFrame


    if(moveKeys.w.press != true && moveKeys.d.press){
        player.velocity.x = 5
        
        player.image = player.players.Run.image
        player.maxFrame = player.players.Run.maxFrame


    }else if(moveKeys.w.press != true && moveKeys.a.press){
        player.velocity.x = -5

        player.image = player.players.RunLeft.image
        player.maxFrame = player.players.RunLeft.maxFrame


    }else if(firstClick && jumpCounter == 0 && moveKeys.w.press && moveKeys.a.press != true && moveKeys.d.press != true){
       //double jump first jump
        player.velocity.y = -10
        clickCount = clickCount+1

        jumpCounter = 1

    }else if( moveKeys.a.press && moveKeys.w.press){
        //runJump left
        if(moveKeys.a.press && moveKeys.w.press && firstClick && jumpCounter == 0){

            //2jump left

            player.velocity.y = -10
            clickCount = clickCount+1

            jumpCounter = 1
        }else if(moveKeys.a.press && moveKeys.w.press && secondClick && jumpCounter == 1){
            clickCount = clickCount+1
            player.velocity.y = -10
            jumpCounter = 4
        }
        player.velocity.x = -5
        


        player.image = player.players.RunLeft.image
        player.maxFrame = player.players.RunLeft.maxFrame
    }else if( moveKeys.d.press && moveKeys.w.press){
        
        //runJump right
        
        if(moveKeys.d.press && moveKeys.w.press && firstClick && jumpCounter == 0){
            //only 2 jump right
            player.velocity.y = -10
            clickCount = clickCount+1

            jumpCounter = 1
        }else if(moveKeys.d.press && moveKeys.w.press && secondClick && jumpCounter == 1){
            clickCount = clickCount+1
            player.velocity.y = -10
            jumpCounter = 4
        }
        player.velocity.x = 5

        player.image = player.players.Run.image
        player.maxFrame = player.players.Run.maxFrame
    }else if(secondClick && jumpCounter == 1 && moveKeys.w.press && moveKeys.a.press != true && moveKeys.d.press != true){
       
        //doublejump second jump
        clickCount = clickCount+1
        player.velocity.y = -10
        jumpCounter = 4
    }
     console.log(clickCount)
    
}

animation()

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch(event.key){
        case 'd' : moveKeys.d.press = true
        break
        
        case 'a' : moveKeys.a.press = true
        break
        
        case 'w' : moveKeys.w.press = true; if(clickCount%2 == 0){
            secondClick = true
            firstClick = false
        }else{
            secondClick = false
            firstClick = true
        }
        break
    }
})



window.addEventListener('keyup', (event) => {
    console.log(event)
    switch(event.key){
        case 'd' : moveKeys.d.press = false
        break
        
        case 'a' : moveKeys.a.press = false
        break
        
        case 'w' : moveKeys.w.press = false
        break
    }
})

let bestScoreCounter


function pointInLocal(){
    if(localStorage.getItem('bestScore') === 'undefined' || 
        localStorage.getItem('bestScore')*1 <= pointCounter ||
        localStorage.getItem('bestScore') === 'null'){
        
            bestScoreCounter = pointCounter
            localStorage.setItem('bestScore', bestScoreCounter)
            console.log("jandaa")
    }else if(localStorage.getItem('bestScore') > pointCounter){
        bestScoreCounter = localStorage.getItem('bestScore')
        console.log('test')
    }
}

}






