var Attack = function() {
  function Attack(attackingTerritory, defendingTerritory, attackingUnits) {
    this.attackingTerritory = attackingTerritory;
    this.defendingTerritory = defendingTerritory;
    this.attackingUnits     = attackingUnits;

    if (!attackingTerritory.army) {
      throw "A territory cannot attack without an army present";
    }

    if (attackingUnits > attackingTerritory.army.units - 1) {
      throw "Cannot attack territory with a greater number of units than (attackingTerritory.army.units - 1)";
    }
  }

  function _attackingDiceNumber() {
    if (this.attackingUnits >= 3) {
      return 3;
    }
    else {
      return this.attackingUnits;
    }
  }

  function _defendingDiceNumber() {
    if (this.defendingTerritory.army.units > 2) {
      return 2;
    }
    else {
      return this.defendingTerritory.army.units;
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

  function _sortRolls(a, b) {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  }

  function _canAttack() {
    return this.attackingUnits > 0 &&
           this.attackingTerritory.army.units > this.attackingUnits &&
           this.defendingTerritory.army.units > 0 &&
           this.attackingTerritory.army.player.id != this.defendingTerritory.army.player.id;
  }

  Attack.prototype = {
    attack: function() {
      if (_canAttack()) {
        var attackingDiceNumber  = _attackingDiceNumber(),
            defendingDiceNumber  = _defendingDiceNumber(),
            attackingDiceResults = _rollNumberOfDice(attackingDiceNumber).sort(_sortRolls),
            defendingDiceResults = _rollNumberOfDice(defendingDiceNumber).sort(_sortRolls),
            attackerLosses       = 0,
            defenderLosses       = 0;

        if (attackingDiceResults[0] > defendingDiceResults[0]) {
          defenderLosses += 1;
        }
        else {
          attackerLosses += 1;
        }

        if (attackingDiceNumber > 1 && defendingDiceNumber > 1) {
          if (attackingDiceResults[1] > defendingDiceResults[1]) {
            defenderLosses += 1;
          }
          else {
            attackerLosses += 1;
          }
        }

        return {
          attackerLosses: attackerLosses,
          defenderLosses: defenderLosses
        }
      }
      else {
        throw "These territories cannot wage war, their state is invalid.";
      }
    }
  };

  return Attack;
};