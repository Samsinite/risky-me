var Attack = function() {
  function Attack(attackingTerritory, defendingTerritory, attackingArmies) {
    this.attackingTerritory = attackingTerritory;
    this.defendingTerritory = defendingTerritory;
    this.attackingArmies = attackingArmies;

    if (!attackingTerritory.army) {
      throw "A territory cannot attack without an army present";
    }

    if (attackingArmies > attackingTerritory.army.troups - 1) {
      throw "Cannot attack territory with a greater number of troups than (attackingTerritory.army.troups - 1)";
    }
  }

  function _attackingDiceNumber() {
    if (this.attackingArmies >= 3) {
      return 3;
    }
    else {
      return this.attackingArmies;
    }
  }

  function _defendingDiceNumber() {
    if (this.defendingTerritory.army.troups > 2) {
      return 2;
    }
    else {
      return this.defendingTerritory.army.troups;
    }
  }

  function _roll() {
    return Math.floor((Math.random() * 6) + 1);
  }

  function _rollDice(numberOfDice) {
    var results = [];

    for (i = 0; i < numberOfDice; i++) {
      results.push(_roll());
    }

    return results;
  }

  Attack.prototype = {
    attack: function() {
      if (attackingArmies > 0) {
        var attackingDiceNumber = this._attackingDiceNumber.call(this),
            defendingDiceNumber = this._defendingDiceNumber.call(this),
            attackingDiceResults = _rollNumberOfDice(attackingDiceNumber),
            defendingDiceResults = _rollNumberOfDice(defendingDiceNumber);



      }
      else {
        return {
          attackingArmyDelta: 0,
          defendingArmyDelta: 0
        }
      }
    }
  };

  return Attack;
};