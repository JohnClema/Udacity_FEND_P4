//Strict Mode
"use strict";

//Game Constants
var GAME_X_ORIGIN = 0;
var GAME_Y_ORIGIN = 0;
var GAME_WIDTH = 505;
var GAME_HEIGHT = 606;
var ENEMY_EXIT_WIDTH = 550;

//Win constants
var WIN_BOUNDARY = 25;

//Player intialisations
var PLAYER_START_X = 210;
var PLAYER_START_Y = 420;
var PLAYER_SPEED = 50;

//Player collision boundary
var PLAYER_BOUNDARY = 35;

var GAME_X_BOUNDARY = GAME_WIDTH - PLAYER_BOUNDARY;
var GAME_Y_BOUNDARY = GAME_HEIGHT - PLAYER_BOUNDARY;

//Sprites are images at a location
var Sprite = function(imageURL, x, y) {
  "use strict";
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
  if (this.x <= ENEMY_EXIT_WIDTH) {
    this.x += this.speed * dt;
  } else {
    this.x = -2;
  }
  if (player.x >= this.x - PLAYER_BOUNDARY && player.x <= this.x + PLAYER_BOUNDARY) {
    if (player.y >= this.y - PLAYER_BOUNDARY && player.y <= this.y + PLAYER_BOUNDARY) {
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
  if (this.y < WIN_BOUNDARY) {
    this.reset();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.imageURL), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
    case 'left':
      var leftPosition = this.x - this.speed;
      if (leftPosition >= GAME_X_ORIGIN) {
        this.x = leftPosition;
      }
      break;
    case 'up':
      var upPosition = this.y - this.speed;
      if (upPosition >= GAME_Y_ORIGIN) {
        this.y = upPosition;
      }
      break;
    case 'right':
      var rightPosition = this.x + this.speed;
      if (rightPosition <= (GAME_WIDTH - PLAYER_BOUNDARY * 2)) {
        this.x = rightPosition;
      }
      break;
    case 'down':
      var downPosition = this.y + this.speed;
      if (downPosition <= (GAME_HEIGHT - PLAYER_BOUNDARY * 4)) {
        this.y = downPosition;
      }
      break;
    default:
      console.log("wrong key for moving player");
  }
};

Player.prototype.reset = function() {
  this.x = PLAYER_START_X;
  this.y = PLAYER_START_Y;
};

function randomSpeed() {
  return Math.floor((Math.random() * 200) + 100);
}

function enemies() {
  for (var i = 0; i < allEnemies.length; i++) {
    allEnemies.push(new Enemy(-5, 60 * i + 1, randomSpeed()));
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(PLAYER_START_X, PLAYER_START_Y, PLAYER_SPEED);
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
