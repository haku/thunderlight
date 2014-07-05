GameBoard = {};

(function() {

  function divToUnit(unitDiv) {
    var thrust_points = parseInt(unitDiv.attr('thrust_points'));

    var coord = JSON.parse(unitDiv.attr('coord'));
    var vector = JSON.parse(unitDiv.attr('vector'));
    var next_coord = GameBoard.applyVector(coord, vector);
    var next_coord_2 = GameBoard.applyVector(next_coord, vector);

    var thrust_raw = unitDiv.attr('thrust');
    var thrust = thrust_raw ? JSON.parse(thrust_raw) : null;

    return {
      uid:    unitDiv.attr('uid'),
      title:  unitDiv.attr('title'),
      coord:  coord,
      vector: vector,
      thrust: thrust,
      next_coords: [next_coord, next_coord_2],
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
      $('#gameboard .cell.thrusttarget').removeClass('thrusttarget').off('click').click(cellClickListener);
      if (unitDiv) {
        var u = divToUnit(unitDiv);
        unitDiv.addClass('selected');
        u.next_coords.forEach(function(c) {
          $('#gameboard #cell_' + c[0] + '_' + c[1]).addClass('vectortarget');
        });
        u.possible_thrust_coords.forEach(function(c) {
          $('#gameboard #cell_' + c[0] + '_' + c[1]).addClass('thrusttarget').off('click').click(thrustCellClickFactory(c, u));
        });
      }
    }
  }

  var cellClickListener = function(event) {
    selectUnit(null);
    event.stopPropagation();
  };

  var unitClickListener = function(event) {
    selectUnit($(this));
    event.stopPropagation();
  };

  function thrustCellClickFactory(coords, unit) {
    return function(event) {
      var cellDiv = $(this);
      console.log('TODO thrust cell click', cellDiv.attr('id'), coords, unit);
      event.stopPropagation();
    };
  }

  GameBoard.init = function() {
    $('#toolbar input').button();
    $('#gameboard .cell').click(cellClickListener);
    $('#gameboard .unit').click(unitClickListener);
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

  GameBoard.possibleThrustCoords = function(coord, vector, thrust_points, firstCall = true) {
    var ret = {};

    var noop_coord = GameBoard.applyVector(coord, vector);
    ret[noop_coord] = noop_coord;

    if (thrust_points > 0) {
      ORDINALS.forEach(function(o) {
        var pos_v = $.extend({}, vector);
        pos_v[o] = (pos_v[o] || 0) + 1;
        var pos_c = GameBoard.applyVector(coord, pos_v);
        ret[pos_c] = pos_c;
        if (thrust_points > 1) {
          $.extend(ret, GameBoard.possibleThrustCoords(coord, pos_v, thrust_points - 1, false));
        }
      });
    }
    return firstCall ? objValues(ret) : ret;
  };

  function objValues(obj) {
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  }

})();

$(document).ready(function() {
  GameBoard.init();
});
