


// Character Card Template
// $("document").ready(function () {
var characterCardTemplate = $("<div>").addClass(" card");

var cardImage = $("<img>").addClass("card-img-top").appendTo(characterCardTemplate);
var cardTitle = $("<h4>").addClass("card-title text-center mb-1").appendTo(characterCardTemplate);
var health = $("<h6>").addClass("card-subtitle text-center hp").appendTo(characterCardTemplate);
var description = $("<p>").addClass("description").appendTo(characterCardTemplate);
var message = $("#message");

var selectedCharacter;
var enemyDwarfs = [];
var opponent;
var attackMultiplier = 1;

// rendering character selections
dwarfs.forEach(dwarf => {
  health.text(dwarf.stats.hp);
  cardTitle.text(dwarf.name);
  description.text(dwarf.description);
  cardImage.attr("src", dwarf.imageSrc);

  dwarf.html = characterCardTemplate.clone(true, false);
  dwarf.html.hover(function () {
    dwarf.html.find(".description").toggleClass("show-description");
    dwarf.html.toggleClass("player");
    // ??? why is hover function doesn't get called after selecting character
  });

  $("#character-picker").append(dwarf.html);
  // setting up for character selection event
  dwarf.html.click(function () {
    selectCharacter(dwarf);
  });
});



function selectCharacter(char) {
  selectedCharacter = char;
  $(".character-picker-section").empty(); //!!use detach() if want to keep the events with the element
  char.html.find(".description").removeClass("show-description");
  $("#character-selected").append(char.html);
  for (var i = 0; i < 4; i++) {
    var enemy = dwarfs.splice(randomNum(dwarfs.length), 1)[0];
    if (enemy != char) {
      enemyDwarfs.push(enemy);
      enemy.html.addClass("enemy");
      $("#enemy-picker").append(enemy.html);
    }
  }
  enemySelection();
}

function enemySelection() {
  enemyDwarfs.forEach(dwarf => {
    dwarf.html.hover(function () {
      // console.log(this);
      $(this).toggleClass("opponent");
    });
    dwarf.html.click(function () {
      opponent = dwarf;
      $(this).remove();
      $("#opponent").append(this);

      enemyDwarfs.forEach(enemy => {
        enemy.html.unbind('mouseenter mouseleave click');
      });

      setupFight();
    });
  });
}


function setupFight() {
  $(".action-selection").removeClass("hide");
  $("#btn-attack").click(attack)
  $("#btn-smash").click(smash);
}

// fight functions
function attack() {
  var damage = Math.max((selectedCharacter.stats.attack * (attackMultiplier)) - opponent.stats.defence, 0);
  opponent.stats.hp -= damage;
  console.log("causing " + damage + " damage to opponent");
  console.log("multiplier: " + attackMultiplier);
  roundCalculation();
}
function smash() {
  if (!dodge()) {
    var damage = selectedCharacter.stats.attack * 2 * attackMultiplier;
    opponent.stats.hp -= damage

    console.log("causing " + damage + " damage to opponent");
    console.log("multiplier: " + attackMultiplier);
  }
  roundCalculation();
}


// How to properly code a decision tree in turn based games?!?!
function roundCalculation() {
  attackMultiplier++;
  updateUI();
  if (enemyDead()) {
    enemyDwarfs.splice(enemyDwarfs.indexOf(opponent), 1);
    opponent.html.remove();
    if (enemyDwarfs.length <= 0) {
      endGame("Win");
      unbindButtons();
    } else {
      unbindButtons();
      setTimeout(function () {
        enemySelection();
      }, 1500);
    }
  } else {
    counterAttack();
    if (characterDead()) {
      unbindButtons();
      endGame("Lose");
    }
  }
  updateUI();
}

function unbindButtons() {
  $(".action-selection").addClass("hide");
  $("#btn-attack").unbind("click");
  $("#btn-smash").unbind("click");
}

function dodge() {
  return opponent.stats.dodgeChance >= randomNum(100);
}

function counterAttack() {
  selectedCharacter.stats.hp -= Math.max((opponent.stats.counterAttack - selectedCharacter.stats.defence), 0)
}

function updateUI() {
  $("#opponent").find(".hp").text(opponent.stats.hp);
  $("#character-selected").find(".hp").text(selectedCharacter.stats.hp);
}

function enemyDead() {
  return opponent.stats.hp <= 0;

}

function characterDead() {
  return selectedCharacter.stats.hp <= 0;
}

function endGame(msg) {
  var messageText = "Game Over! You " + msg;
  message.text(messageText);
  console.log(messageText);
}
// helper functions
function randomNum(upper) {
  return Math.floor(Math.random() * upper);
}
// });

//TODOLIST
// Refactor code
// include proper win lose fight conditions and end game conditions