// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.height = 50;
    this.width = 80;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 500){
        this.x += (dt) * this.speed;
    }else{
        this.x = -200;
    }

    this.resetSpeed();
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Function to reset the speed of bugs
Enemy.prototype.resetSpeed = function(){
    this.speed = Math.floor(Math.random() * 501);
}
// Function to check collision of the bugs and player
Enemy.prototype.checkCollision = function(){
    if(player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        (player.height - 25) + player.y > this.y){

        player.reset();
        player.lives -=1;
        this.resetSpeed();

        let lives = document.querySelector('.lives');
        lives.textContent = "Lives: " + player.lives;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.lives = 5;
    this.score = 0;

};

Player.prototype.update = function(dt){
    if(this.y <= 0){
        this.score += 1;
        let scores = document.querySelector('.scores');
        scores.textContent = "Score: " + this.score;
        this.reset();
    }

    if(player.lives === 0){
        this.gameLose();
    }

    if(player.score === 7){
        this.gameWon();
        }
    
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

Player.prototype.handleInput = function(key){
    switch(key){
        case 'up':
        this.y -= 90;
        break;
        case 'down':
        if(this.y <= 350){
        this.y += 90;
        }
        break;
        case 'left':
        if(this.x >= 100){
        this.x -= 100;
        }
        break;
        case 'right':
        if(this.x <= 300){
        this.x += 100;
        }
    }
}

Player.prototype.gameLose = function(){
    for(let i=0;i<allEnemies.length;i++){
        allEnemies[i].x = -200;
        allEnemies[i].y = -2000;
        allEnemies[i].speed = 0;
    }
    let lose = document.querySelector('.lose');
     lose.style.visibility = "visible";
    ctx.clearRect(0,0,505,606);
    context.moveTo(0,0);
}

Player.prototype.gameWon = function(){
     for(let i=0;i<allEnemies.length;i++){
        allEnemies[i].x = -200;
        allEnemies[i].y = -2000;
        allEnemies[i].speed = 0;
    }
    let win = document.querySelector('.won');
     win.style.visibility = "visible";
    ctx.clearRect(0,0,505,606);
     context.moveTo(0,0);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(-200,60,170);
let enemy2 = new Enemy(-200,150,500);
let enemy3 = new Enemy(-200,230,800);
var allEnemies = [enemy1,enemy2,enemy3];

var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

