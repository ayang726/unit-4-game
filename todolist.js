/*
-- View Layout:

Character Picker:
Enemies Lineup:
Defender Slot:
  Show defense and block chance as circles or crystals

Action Buttons
  Attack
  Smash

Game message1
Game message2

-- Model:
Character stats (Data):
Health
Attack Damage
Counter attack Damage
Defense
Dodge Chance

Calculations:
receiveDamage(damage, attackType = attack)
testDodging()

-- Controller:
Initialize:
Character selection: 
  Choose from 1 of 7 possible characters, 
  Computer randomly choose 3 from the remaining 6 characters as enemies.
Enemy Selection:
Fight Gameloop:
  Select action(attack/smash (Ignores Defense but can be dodged))
  Calculate damage to enemy
    Test end fight condition win
      Back to Enemy Selection
  Calculate damage received
    Test end fight condition lose
      Go to End game 

End Game:
  Restart



*/
