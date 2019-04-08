


// Character Card Template
$("document").ready(function () {
  var characterCardTemplate = $("<div>").addClass(" card");

  var cardImage = $("<img>").addClass("card-img-top").appendTo(characterCardTemplate);
  var cardTitle = $("<h4>").addClass("card-title text-center mb-1").appendTo(characterCardTemplate);
  var health = $("<h6>").addClass("card-subtitle text-center hp").appendTo(characterCardTemplate);
  var description = $("<p>").addClass("description").appendTo(characterCardTemplate);

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
      // console.log("hover");
      dwarf.html.find(".description").toggleClass("show-description");
      dwarf.html.toggleClass("player");
      // ??? why is hover function doesn't get called after selecting character
    });
    $("#character-picker").append(dwarf.html);
    // setting up for character selection event
    dwarf.html.click(function () {
      selectedCharacter = dwarf;
      selectCharacter(dwarf);
    });
  });



  function selectCharacter(char) {
    $(".character-picker-section").empty();
    char.html.find(".description").removeClass("show-description");
    $("#character-selected").append(char.html)
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
    $(".action-selection").addClass("hide");
  }


  function setupFight() {
    $(".action-selection").removeClass("hide");
    $("#btn-attack").click(attack)
    $("#btn-smash").click(smash);
  }

  // fight functions
  function attack() {
    var damage = (selectedCharacter.stats.attack * (attackMultiplier)) - opponent.stats.defence;
    opponent.stats.hp -= damage;
    console.log("causing " + damage + " damage to opponent");
    console.log("multiplier: " + attackMultiplier);
    fightResolveFunc();
  }
  function smash() {
    if (!dodge()) {
      var damage = selectedCharacter.stats.attack * 2 * attackMultiplier;
      opponent.stats.hp -= damage

      console.log("causing " + damage + " damage to opponent");
      console.log("multiplier: " + attackMultiplier);
    }
    fightResolveFunc();
  }

  function fightResolveFunc() {
    // console.log("opponent health: " + opponent.stats.hp);
    attackMultiplier++;
    if (!testWinCondition()) {
      counterAttack();
      testLoseCondition();
    } else {
      $("#btn-attack").unbind("click");
      $("#btn-smash").unbind("click");
      setTimeout(function () {
        opponent.html.remove();
        enemySelection();
      }, 3000);
    }
    updateUI();
  }

  function dodge() {
    return opponent.stats.dodgeChance >= randomNum(100);
  }

  function counterAttack() {
    selectedCharacter.stats.hp -= opponent.stats.counterAttack - selectedCharacter.stats.defence
  }

  function updateUI() {
    $("#opponent").find(".hp").text(opponent.stats.hp);
    $("#character-selected").find(".hp").text(selectedCharacter.stats.hp);
  }

  function testWinCondition() {
    return opponent.stats.hp <= 0;

  }

  function testLoseCondition() {
    return selectedCharacter.stats.hp <= 0;
  }

  // helper functions
  function randomNum(upper) {
    return Math.floor(Math.random() * upper);
  }
});