GameBoard = {};

(function() {

  function divToUnit(unitDiv) {
    var coord = JSON.parse(unitDiv.attr('coord'));
    var vector = JSON.parse(unitDiv.attr('vector'));

    var thrust_raw = unitDiv.attr('thrust');
    var thrust = thrust_raw ? JSON.parse(thrust_raw) : null;

    var thrust_points = 3; // TODO test value.

    return {
      uid:    unitDiv.attr('uid'),
      title:  unitDiv.attr('title'),
      coord:  coord,
      vector: vector,
      thrust: thrust,
      next_coord: GameBoard.applyVector(coord, vector),
      possible_thrust_coords: GameBoard.possibleThrustCoords(coord, vector, thrust_points)
    };
  }

  function selectUnit(unitDiv) {
    if (unitDiv && unitDiv.hasClass('selected')) {
      VectorEditor.editUnitDiv(unitDiv);
    }
    else {
      $('#gameboard .unit.selected').removeClass('selected');
      $('#gameboard .cell.vectortarget').removeClass('vectortarget');
      $('#gameboard .cell.thrusttarget').removeClass('thrusttarget');
      if (unitDiv) {
        var u = divToUnit(unitDiv);
        unitDiv.addClass('selected');
        $('#gameboard #cell_' + u.next_coord[0] + '_' + u.next_coord[1]).addClass('vectortarget');
        u.possible_thrust_coords.forEach(function(c) {
          $('#gameboard #cell_' + c[0] + '_' + c[1]).addClass('thrusttarget');
        });
      }
    }
  }

  function registerCellClickEvents() {
    $('#gameboard .cell').click(function(event) {
      selectUnit(null);
      event.stopPropagation();
    });
  }

  function registerUnitClickEvents() {
    $('#gameboard .unit').click(function(event) {
      selectUnit($(this));
      event.stopPropagation();
    });
  }

  GameBoard.init = function() {
    $('#toolbar input').button();
    registerCellClickEvents();
    registerUnitClickEvents();
  };

  GameBoard.applyVector = function(coord, v) {
    if (!coord) return [];
    c = coord.slice(0);
    for (var x in v) {
      var m = v[x];
      switch(x) {
        case 'n':
          c[1] -= m;
          break;
        case 'ne':
          c[1] -= Math.floor((m + (c[0] % 2 == 0 ? 0 : 1)) / 2);
          c[0] += m;
          break;
        case 'se':
          c[1] += Math.floor((m + (c[0] % 2 == 0 ? 1 : 0)) / 2);
          c[0] += m;
          break;
        case 's':
          c[1] += m;
          break;
        case 'sw':
          c[1] += Math.floor((m + (c[0] % 2 == 0 ? 1 : 0)) / 2);
          c[0] -= m;
          break;
        case 'nw':
          c[1] -= Math.floor((m + (c[0] % 2 == 0 ? 0 : 1)) / 2);
          c[0] -= m;
          break;
      }
    }
    return c
  };

  ORDINALS = ['n', 'ne', 'se', 's', 'sw', 'nw'];

  GameBoard.possibleThrustCoords = function(coord, vector, thrust_points) {
    var ret = [];

    // Option of doing nothing.
    ret.push(GameBoard.applyVector(coord, vector));
    
    // For now assume thrust_points is always 1.
    ORDINALS.forEach(function(o) {
      var pos_v = $.extend({}, vector);
      pos_v[o] = (pos_v[o] || 0) + 1;
      var pos_c = GameBoard.applyVector(coord, pos_v);
      ret.push(pos_c);
    });


    return ret;
  };

})();

$(document).ready(function() {
  GameBoard.init();
});
