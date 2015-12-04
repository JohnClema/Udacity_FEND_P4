//Strict Mode
"use strict";

//Sprites are images at a location
var Sprite = function(imageURL, x, y) {
  this.imageURL = imageURL;
  this.x = x;
  this.y = y;
};

//Agents can move around
var Agent = function(imageURL, x, y, speed) {
  Sprite.call(this, imageURL, x, y);
  this.speed = speed;
};
Agent.prototype = Object.create(Sprite.prototype);
Agent.prototype.constructor = Agent;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    Agent.call(this, 'images/enemy-bug.png', x, y, speed);
};

Enemy.prototype = Object.create(Agent.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x <= 550){
        this.x += this.speed * dt;
    } else {
        this.x = -2;
    }
    if(player.x >= this.x - 35 && player.x <= this.x + 35){
        if(player.y >= this.y - 35 && player.y <= this.y + 35){
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.imageURL), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    Agent.call(this, 'images/char-boy.png', x, y, speed);
};
Player.prototype = Object.create(Agent.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
  if(this.y < 25) {
        this.reset();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.imageURL), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  if (keyPress == 'left') {
      this.x -= this.speed;
  }
  if (keyPress == 'up') {
      this.y -= this.speed - 20;
  }
  if (keyPress == 'right') {
      this.x += this.speed;
  }
  if (keyPress == 'down') {
      this.y += this.speed - 20;
  }
  console.log('keyPress is: ' + keyPress);
};

Player.prototype.reset = function() {
  this.x = 210;
  this.y = 420;
};

function randomSpeed() {
  return Math.floor((Math.random() * 200) + 100);
}

function enemies(){
    allEnemies.push(new Enemy(-5, 60, randomSpeed()));
    allEnemies.push(new Enemy(-5, 120, randomSpeed()));
    allEnemies.push(new Enemy(-5, 180, randomSpeed()));
    allEnemies.push(new Enemy(-5, 240, randomSpeed()));
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 400, 50);
enemies();



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
