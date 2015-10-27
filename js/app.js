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
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.imageURL), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    Agent.call(this, 'images/char-boy.png', x, y, speed);
};
Player.prototype = Object.create(Agent.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.imageURL), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  if (keyPress == 'left') {
      player.x -= player.speed;
  }
  if (keyPress == 'up') {
      player.y -= player.speed - 20;
  }
  if (keyPress == 'right') {
      player.x += player.speed;
  }
  if (keyPress == 'down') {
      player.y += player.speed - 20;
  }
  console.log('keyPress is: ' + keyPress);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5, 383, 50);


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
