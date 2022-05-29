function stage3(){

    let killDistance = 0

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
        constructor({width = 150, height, position, quantity, imageSrc, brickPosition, brickRealPosition, velocity, dir}){
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
            this.velocity = velocity
            this.gravity = 5
            this.dir = dir
        }
        draw(){
            c.fillStyle = 'red'
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
                        50, 
                        40)
                   }
               }
            }
        }
        update(){
        this.draw()
           
                this.position.y[14]+=2
                this.position.y[17] +=2
                this.position.y[19]+=2

                if(this.position.y[14] >= canvas.height && this.position.y[17] >= canvas.height &&
                    this.position.y[19] >= canvas.height){
                    this.position.y[14] = -100
                    this.position.y[17] = -100
                    this.position.y[19] = -100
                }
           
                this.position.y[15] -=2
                this.position.y[18] -=2

                if(this.position.y[15] <= 0 && this.position.y[18] <= 0){
                    this.position.y[15] = canvas.height + 100
                    this.position.y[18] = canvas.height + 100
                }
            
            if(player.position.y + player.height >= platform.position.y[15] &&
                player.position.y + player.height <= platform.position.y[15]+5 &&
                player.position.x + player.width >= platform.position.x[15] &&
                player.position.x <= platform.position.x[15] + platform.width[15]){
                player.position.y -= 3
                
            }
            if(player.position.y + player.height >= platform.position.y[18] &&
                player.position.y + player.height <= platform.position.y[18]+5 &&
                player.position.x + player.width >= platform.position.x[18] &&
                player.position.x <= platform.position.x[18] + platform.width[18]){
                player.position.y -= 3
                
            }


        platform.position.y[8]+= platform.velocity.y

             //droped platform
        if( player.position.x+player.width >= platform.position.x[8] &&
            player.position.x <= platform.position.x[8] + platform.position.x[8] &&
            player.position.y <= platform.position.y[8] + platform.height[8] &&
            player.position.y + player.height + player.velocity.y >= platform.position.y[8]){

                platform.velocity.y += this.gravity
                
            }
    
    //stop player on platform
    
           for(let j = 0; j<this.quantity; j++){
           

                 if((player.position.y + player.height + player.velocity.y >= this.position.y[j] && 
                player.position.y + player.height <= this.position.y[j]) &&
                (player.position.x +  + player.width > this.position.x[j] && 
                 player.position.x < this.position.x[j] + this.width[j])){
        
                     player.velocity.y = 0;

                     //reset double jump
                     jumpCounter = 0
                     clickCount = 3

                }


                //reposition platforms when player move right

            }
    
    // stop enemy left/right platform
    
            if(this.position.x[4] <= newEnemy.position.x + newEnemy.width &&
                newEnemy.position.y + newEnemy.height >= this.position.y[4] &&
                newEnemy.position.y + newEnemy.height >= this.position.y[4] + this.height[4] &&
                newEnemy.position.x + newEnemy.width/2 > player.position.x){
    
                    newEnemy.velocity.x = -1.5
    
            }else if(this.position.x[0] + this.width[0] >= newEnemy.position.x &&
                    newEnemy.position.y + newEnemy.height >= this.position.y[0] &&
                    newEnemy.position.y + newEnemy.height >= this.position.y[0] + this.height[0] &&
                    newEnemy.position.x + newEnemy.width/2 <= player.position.x){
                
                      newEnemy.velocity.x = 1.5
                }
            
        }
    }
    
    const platform = new box({
        position:{
            x: [0,
                 250,
                 450,
                 600,
                 canvas.width - 300,
                 1650,
                 1400,
                 2650,
                 2900,
                 3200,
                 3450,
                 4400,
                 4770,
                 5150,
                 5745,
                 6100,
                 6500,
                 7400,
                 7700,
                 8000,
                 8500,
                 9350
                ],
            y: [canvas.height - 200,
                 100,
                 150,
                 200,
                 canvas.height - 100, 
                 canvas.height- 130, 
                 300, 
                 250, 
                 150, 
                 350,
                 canvas.height - 100,
                 250,
                 350,
                 canvas.height - 100,
                 300,
                 canvas.height - 40,
                 250,
                 150,
                 350,
                 250,
                 canvas.height - 150,
                 canvas.height - 650
                ]
        },
        height: [200,
             40,
             50,
             40,
             100,
             130,
             40,
             40,
             40,
             40,
             100,
             100,
             50,
             100,
             40,
             40,
             100,
             40,
             40,
             40,
             150,
             500
            ],
        width: [150, 
            100, 
            100, 
            100, 
            600, 
            700, 
            100, 
            100, 
            100, 
            100, 
            700,
            150,
            100,
            450,
            150,
            150,
            650,
            150,
            150,
            150,
            1000,
            150
            ],
        quantity: 23,
        velocity: {
            x: 0,
            y: 0
        },
        dir: [0, 1],
        imageSrc: './Tiny Platformer - Forest Asset Pack/Tileset(16x16)/Tileset.png',
        brickPosition: [0, 32]
    })
    
    
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
                this.velocity.y = 0;

                //reset double jump
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
        }
    }



    //weapon consts

    
const weapon = new box({
    position:{
        x: [1100, 1200, 1300, 5250,5350,5450,7600, 7900],
        y: [-10, -10, -10, -10, -10, -10, -10, -10]
    },
    height: [40, 40, 40, 40, 40, 40, 40, 40],
    width: [50, 50, 50, 50, 50, 50, 50, 50],
    quantity: 8,
    imageSrc: './Tiny Platformer - Forest Asset Pack/Tileset(16x16)/Tileset.png',
    brickPosition: [87, 87, 87, 87, 87, 87, 87, 87],
    dir: [0, 0, 0, 0, 0, 0, 0, 0],
    setRectOption: 1,
    scale: 1.5
})




// traps

class trap {
    constructor({
        position,
        width,
        height,
        quantity,
        trapsOn,
        trapsOnCount,
        count,
        imageSrc,
        maxFrame
    }){

    this.position = position
    this.width = width
    this.height = height
    this.quantity = quantity
    this.trapsOn = trapsOn
    this.trapsOnCount = trapsOnCount
    this.count = count
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = 3
    this.maxFrame = maxFrame
    this.changeFrame = 0
    this.delay = 10
    this.hold = 0
    }

    draw(){

        for(let i = 0; i < this.quantity; i++){
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x[i], this.position.y[i], this.width[i], this.height[i])

        c.drawImage(
            this.image,
            this.changeFrame*this.image.width/this.maxFrame,
            0,
            this.image.width/this.maxFrame,
            this.image.height,
            this.position.x[i], 
            this.position.y[i]-50,
            this.width[i],
            this.height[i]*this.scale
            )   

            }
        }


    update(){
        this.draw()
        //traps animatiion speed
        this.hold++
        if(this.hold % this.delay == 0){

            if(this.changeFrame < this.maxFrame-1){
                this.changeFrame++
            }else{
                this.changeFrame = 0
            }
        }

        //traps up

        for(let i = 0; i<Traps.quantity; i++){
            if( this.count[i] == 0 &&
                player.position.x + player.width >= Traps.position.x[i]&&
                player.position.x <= Traps.position.x[i] + Traps.width[i]&&
                player.position.y+player.height <= Traps.position.y[i]){
                    
                    this.trapsOn = true
                    this.trapsOnCount = 1
                    this.count[i]++
                    
                }
        

        if(this.trapsOn && this.trapsOnCount == 1){
            Traps.position.y[i] = Traps.position.y[i] - 80
            this.trapsOn = false
        }

        //killer traps

        if( player.position.x + player.width >= Traps.position.x[i]&&
            player.position.x <= Traps.position.x[i] + Traps.width[i]&&
            player.position.y+player.height <= Traps.position.y[i] + Traps.height[i] &&
            player.position.y+player.height >= Traps.position.y[i]){
                
                player.position.y = -10
                player.position.x = canvas.width/2 + 150

                playerCounter--

                killDistance = platform.position.x[0]

                document.getElementById('playerLives').innerHTML = "lives: " + playerCounter

            }
    }

    }
}


const Traps = new trap({
    position: {
        x: [1750, 2150, 3550, 3750, 3950, 5210, 5470, 6800],
        y: [canvas.height-100, canvas.height-95, canvas.height-75, canvas.height-75, canvas.height-75, canvas.height-75, canvas.height-75,290]
    },
    width: [150,150, 100, 100, 100, 70, 70, 250],
    height: [50,50,50,50,50,50,50,50],
    quantity: [8],
    trapsOn: false,
    count: [0,0,0,0,0,0,0,0],
    trapsOnCount: 0,
    imageSrc: 'Trap/Spike_B.png',
    maxFrame:  10
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
            this.velocity.y[3] = 2
            this.velocity.y[6] = 2
        }else if(this.delay%Math.floor((Math.random()*150)+100) == 0){
            this.velocity.y[1] = 2
            this.velocity.y[4] = 2
            this.velocity.y[7] = 2
        }else if (this.delay%Math.floor((Math.random()*200)+150) == 0){
            this.velocity.y[2] = 2
            this.velocity.y[5] = 2
        }
        ammo1()
        ammo2()
        ammo3()
        ammo4()
        ammo5()
        ammo6()
        ammo7()
        ammo8()

        for(let i = 0; i < this.position.y.length; i++){
            if(player.position.y <= this.position.y[i] &&
                player.position.x + player.width >= this.position.x[i]&&
                player.position.x < this.position.x[i] + this.width&&
                player.position.y + player.height > this.position.y[i] 
                ){
                    
                    
                    player.position.y = -10
                    player.position.x = canvas.width/2 + 150

                    playerCounter--

                    killDistance = platform.position.x[0]

                    document.getElementById('playerLives').innerHTML = "lives: " + playerCounter


                }
        }

    }
}


const ammo = new Ammo({
    position: {
        x: [1107,1207,1307,5255,5355,5455,7605, 7905],
        y: [0,0,0,0,0,0,0,0]
    },
    width: 38,
    height: 17,
    velocity: {
        x: 0,
        y: [0, 0, 0, 0, 0, 0, 0, 0]
    }
})

function ammo1(){
    ammo.position.y[0] += ammo.velocity.y[0]
    if(ammo.position.y[0] >= platform.position.y[5]){
        ammo.position.y[0] = 0
        ammo.velocity.y[0] = 0
    }
}
 function ammo2(){
    ammo.position.y[1] += ammo.velocity.y[1]
    if(ammo.position.y[1] >= platform.position.y[5]){
        ammo.position.y[1] = 0
        ammo.velocity.y[1] = 0
    }
 }
 function ammo3(){
    ammo.position.y[2] += ammo.velocity.y[2]
    if(ammo.position.y[2] >= platform.position.y[5]){
        ammo.position.y[2] = 0
        ammo.velocity.y[2] = 0
    }
 }
 function ammo4(){
    ammo.position.y[3] += ammo.velocity.y[3]
    if(ammo.position.y[3] >= platform.position.y[5]){
        ammo.position.y[3] = 0
        ammo.velocity.y[3] = 0
    }
}
 function ammo5(){
    ammo.position.y[4] += ammo.velocity.y[4]
    if(ammo.position.y[4] >= platform.position.y[5]){
        ammo.position.y[4] = 0
        ammo.velocity.y[4] = 0
    }
 }
 function ammo6(){
    ammo.position.y[5] += ammo.velocity.y[5]
    if(ammo.position.y[5] >= platform.position.y[5]){
        ammo.position.y[5] = 0
        ammo.velocity.y[5] = 0
    }
 }
 function ammo7(){
    ammo.position.y[6] += ammo.velocity.y[6]
    if(ammo.position.y[6] >= platform.position.y[6]){
        ammo.position.y[6] = 0
        ammo.velocity.y[6] = 0
    }
 }
 function ammo8(){
    ammo.position.y[7] += ammo.velocity.y[7]
    if(ammo.position.y[7] >= platform.position.y[7]){
        ammo.position.y[7] = 0
        ammo.velocity.y[7] = 0
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

                for(let i = 0; i <= newPoint.quantity; i++){
                    if(newPoint.position.x[i] < 0){
                        this.velocity.y[i] = 0
                        newPoint.position.y[i] = -20
                        newPoint.position.x[i] = Math.floor(Math.random()*canvas.width)

                    }
                }
    
    
    
        }
    
    // point stop on platform
            for(let i = 0; i<platform.quantity; i++){
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
            c.drawImage(
                this.image,
                (this.image.width/this.maxFrame)*this.changeFrame,
                0,
                this.image.width/this.maxFrame,
                this.height,
                this.position.x-20,
                this.position.y-12,
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
    
    //enemy fall down gravity
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if((this.position.y + this.height + this.velocity.y >= canvas.height)) {
                this.velocity.y = 0;
            }else{
                this.velocity.y += this.gravity
            }
    
    //enemy move left/right
    
            if(this.position.x + this.width/2 <= player.position.x){
                this.velocity.x = 1.5
            }else if (this.position.x + this.width/2 > player.position.x){
                this.velocity.x = -1.5
            }
    
    //after enemy kill transform position
    
            if(this.position.x <= player.position.x + player.width && this.position.x + this.width > player.position.x
                && (this.position.y <= player.position.y + player.height && 
                this.position.y + this.height/3 >= player.position.y + player.height)){
                   this.position.y = -10
                   this.position.x = Math.floor(Math.random()*canvas.width)
            }
    
    //after player kill transform position
    
            if(this.position.x <= player.position.x + player.width && this.position.x + this.width > player.position.x
              && (this.position.y + this.height) - ((this.height/3)*1.5) <= player.position.y + player.height &&
                this.position.y + this.height > player.position.y + player.height){
                  player.position.y = -10
                  player.position.x = Math.floor(Math.random()*canvas.width)
                  playerCounter--
                  document.getElementById('playerLives').innerHTML = "lives: " + playerCounter
                  test()
              }
    
    //stop enemy move, when touch platforms
              
           for(let j = 0; j<platform.quantity; j++){
           
                 if((this.position.y + this.height + this.velocity.y >= platform.position.y[j] && 
                    this.position.y + this.height <= platform.position.y[j]) &&
                    (this.position.x +  + this.width > platform.position.x[j] && 
                    this.position.x < platform.position.x[j] + platform.width[j])){
                        this.velocity.y = 0;
                }
            
                if(this.position.x <= platform.position.x[j] + platform.width[j] &&
                    this.position.x + this.width >= platform.position.x[j] &&
                    this.position.y + this.height > platform.position.y[j] && 
                    this.position.y < platform.position.y[j] + platform.height[j]){
                   
                            this.velocity.x = 0
                            
                }
            }
        }
    }
    
    
    const newEnemy = new enemy ({
        position:{
            x: Math.floor(Math.random()*canvas.width),
            y: 100
        },
        width: 50,
        height: 70,
        velocity:{
            x:0,
            y:0
        },
        imageSrc: './Tiny Platformer - Forest Asset Pack/Sprites/Enemies/Enemy_01/idle.png',
        
        maxFrame: 5
    })
    
    let testTest = false
    function test(){
        testTest = true
        return testTest
       }

let jumpCounter = 0
let firstClick = false
let secondClick = false
let clickCount = 3

    function animation(){
        window.requestAnimationFrame(animation)
        c.fillStyle = 'green'
        c.fillRect(0,0, canvas.width, canvas.height)
        treeBlue.update()
    
        tree.update()
        
        newPoint.update()
       // newEnemy.update()

        weapon.update()
        ammo.update()
        
        player.update()
        Traps.update()
        platform.update()
     
    
        if(playerCounter<=0){
            levelBox.style.visibility = 'visible'
            canvasStyle.style.visibility = 'hidden'
            pointInLocal()
            location.reload()
            playerCounter = 3
        }

        //platform transform after kill
        if(killDistance != 0){
            for(let i = 0; i<platform.quantity; i++){
                platform.position.x[i] -= killDistance
                weapon.position.x[i] -= killDistance
                ammo.position.x[i] -= killDistance
            }
            for(let j = 0; j<Traps.quantity; j++){
                Traps.position.x[j] -= killDistance
            }
            killDistance = 0
        }

        
        //character move code 
        player.velocity.x = 0
        
        player.image = player.players.Idle.image
        player.maxFrame = player.players.Idle.maxFrame
    
    
        if(moveKeys.w.press != true && moveKeys.d.press){
            player.velocity.x = 5
            
            player.image = player.players.Run.image
            player.maxFrame = player.players.Run.maxFrame

            
        if(player.position.x >= canvas.width/2){
            player.velocity.x -=5
            for(let i = 0; i<=platform.quantity; i++){
                platform.position.x[i] -= 5
            }
            for(let i = 0; i<=weapon.quantity; i++){
                weapon.position.x[i] -=5
                ammo.position.x[i] -=5
            }
            for(let i = 0; i <= Traps.quantity; i++){
                Traps.position.x[i]-=5
            }
            for(let i = 0; i <= newPoint.quantity; i++){
                newPoint.position.x[i]-=5
            }
        }

        }else if(moveKeys.w.press != true && moveKeys.a.press){
            player.velocity.x = -5
    
            player.image = player.players.RunLeft.image
            player.maxFrame = player.players.RunLeft.maxFrame


            if(player.position.x <= 150){
                player.velocity.x +=5
                for(let i = 0; i<=platform.quantity; i++){
                    platform.position.x[i] += 5
                }
                for(let i = 0; i<=weapon.quantity; i++){
                    weapon.position.x[i] +=5
                    ammo.position.x[i] +=5
                }
                for(let i = 0; i <= Traps.quantity; i++){
                    Traps.position.x[i]+=5
                }
                for(let i = 0; i <= newPoint.quantity; i++){
                    newPoint.position.x[i]+=5
                }
            }

        }else if(firstClick && jumpCounter == 0 && moveKeys.w.press && moveKeys.a.press != true && moveKeys.d.press != true){
           //double jump first jump
            player.velocity.y = -12
            clickCount = clickCount+1

            jumpCounter = 1

        }else if( moveKeys.a.press && moveKeys.w.press){
            //runJump left
            if(moveKeys.a.press && moveKeys.w.press && firstClick && jumpCounter == 0){

                //2jump left

                player.velocity.y = -12
                clickCount = clickCount+1

                jumpCounter = 1
            }else if(moveKeys.a.press && moveKeys.w.press && secondClick && jumpCounter == 1){
                clickCount = clickCount+1
                player.velocity.y = -13
                jumpCounter = 4
            }
            player.velocity.x = -5
            
           

            if(player.position.x <= 150){
                player.velocity.x +=5
                for(let i = 0; i<=platform.quantity; i++){
                    platform.position.x[i] += 5
                }
                for(let i = 0; i<=weapon.quantity; i++){
                    weapon.position.x[i] +=5
                    ammo.position.x[i] +=5
                }
                for(let i = 0; i <= Traps.quantity; i++){
                    Traps.position.x[i]+=5
                }
                for(let i = 0; i <= newPoint.quantity; i++){
                    newPoint.position.x[i]+=5
                }
            }else{
                player.velocity.x = -5 
            }

            player.image = player.players.RunLeft.image
            player.maxFrame = player.players.RunLeft.maxFrame
        }else if( moveKeys.d.press && moveKeys.w.press){
            
            //runJump right
            
            if(moveKeys.d.press && moveKeys.w.press && firstClick && jumpCounter == 0){
                //only 2 jump right
                player.velocity.y = -12
                clickCount = clickCount+1

                jumpCounter = 1
            }else if(moveKeys.d.press && moveKeys.w.press && secondClick && jumpCounter == 1){
                clickCount = clickCount+1
                player.velocity.y = -13
                jumpCounter = 4
            }

            if(player.position.x >= canvas.width/2){
                for(let i = 0; i<=platform.quantity; i++){
                    platform.position.x[i] -= 5
                }
                for(let i = 0; i<=weapon.quantity; i++){
                    weapon.position.x[i] -=5
                    ammo.position.x[i] -=5
                }
                for(let i = 0; i <= Traps.quantity; i++){
                    Traps.position.x[i]-=5
                }
                for(let i = 0; i <= newPoint.quantity; i++){
                    newPoint.position.x[i]-=5
                }
            }else{
                player.velocity.x = 5 
            }
            console.log(clickCount)
            console.log(jumpCounter)

            player.image = player.players.Run.image
            player.maxFrame = player.players.Run.maxFrame
        }else if(secondClick && jumpCounter == 1 && moveKeys.w.press && moveKeys.a.press != true && moveKeys.d.press != true){
           
            //doublejump second jump
            clickCount = clickCount+1
            player.velocity.y = -13
            jumpCounter = 4
        }
         console.log(clickCount)
        
    }
    
    animation()
    
    window.addEventListener('keydown', (event) => {
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
        }else if(localStorage.getItem('bestScore') > pointCounter){
            bestScoreCounter = localStorage.getItem('bestScore')
        }
    }
    
    }

    
    
    
    
    
    
    
    
    