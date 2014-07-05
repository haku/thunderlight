GameBoard = {};

(function() {

  var board_id;

  function divToUnit(unitDiv) {
    var thrust_points = parseInt(unitDiv.attr('thrust_points'));

    var coord = JSON.parse(unitDiv.attr('coord'));
    var vector = JSON.parse(unitDiv.attr('vector'));

    var next_vector_raw = unitDiv.attr('next_vector');
    var next_vector = next_vector_raw ? JSON.parse(next_vector_raw) : null;

    var active_vector = next_vector || vector;
    var next_coord = GameBoard.applyVector(coord, active_vector);
    var next_coord_2 = GameBoard.applyVector(next_coord, active_vector);

    return {
      uid:    unitDiv.attr('uid'),
      title:  unitDiv.attr('title'),
      coord:  coord,
      vector: vector,
      next_vector: next_vector,
      next_coords: [next_coord, next_coord_2],
      possible_thrust_coords: GameBoard.possibleThrustCoords(coord, vector, thrust_points)
    };
  }

  function selectUnit(unitDiv, reselect) {
    if (unitDiv && !reselect && unitDiv.hasClass('selected')) {
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
          $('#gameboard #cell_' + c[0] + '_' + c[1]).addClass('thrusttarget').off('click').click(thrustCellClickFactory(unitDiv, u, c));
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

  function thrustCellClickFactory(unitDiv, unit, thrust_coords) {
    return function(event) {
      var vector = thrust_coords[2];
      postVector(unitDiv, unit, vector);
      event.stopPropagation();
    };
  }

  function postVector(unitDiv, unit, newVector) {
    var vector = GameBoard.simplifyVector(newVector);
    $.ajax({
      url: '/board/' + board_id + '/vector',
      type: 'POST',
      data: {
        uid: unit.uid,
        vector: Object.keys(vector).length > 0 ? vector : 'nil'
      },
      beforeSend: function() {
        unitDiv.addClass('inprogress');
      },
      success: function(resp) {
        unitDiv.removeClass('awaitingmovement');
        unitDiv.attr('next_vector', JSON.stringify(vector));
        $('.coordinates', unitDiv).text(stringVector(vector));
        selectUnit(unitDiv, true);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // TODO show this better, perhaps a dlg.
        console.log('error', jqXHR, textStatus, errorThrown);
      },
      complete: function(jqXHR, textStatus) {
        unitDiv.removeClass('inprogress');
      }
    });
  }

  function stringVector(v) {
    return Object.keys(v).map(function(k, i) { return k + v[k] }).join(' ');
  }

  GameBoard.init = function() {
    board_id = $('#gameboard').attr('board_id');
    $('#toolbar input').button();
    $('#gameboard .cell').click(cellClickListener);
    $('#gameboard .unit').click(unitClickListener);
  };

  var ORDINAL_PAIRS = [['n', 's'], ['ne', 'sw'], ['nw', 'se']];

  GameBoard.simplifyVector = function(v) {
    if (arraysEqual(GameBoard.applyVector([0,0], v), [0,0])) return {};

    var ret = {};
    ORDINAL_PAIRS.forEach(function(op) {
      var o = op[0];
      var p = op[1];
      var a = v[o];
      var b = v[p];
      if (a && b) {
        if (a > b) {
          ret[o] = a - b;
        }
        else if (b > a) {
          ret[p] = b - a;
        }
      }
      else if (a) {
        ret[o] = a;
      }
      else if (b) {
        ret[p] = b;
      }
    });
    return ret;
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

  var ORDINALS = ['n', 'ne', 'se', 's', 'sw', 'nw'];

  GameBoard.possibleThrustCoords = function(coord, vector, thrust_points, recursive) {
    var ret = {};

    var noop_coord = GameBoard.applyVector(coord, vector);
    noop_coord.push(vector);
    ret[noop_coord.slice(0,2)] = noop_coord;

    if (thrust_points > 0) {
      ORDINALS.forEach(function(o) {
        var pos_v = $.extend({}, vector);
        pos_v[o] = (pos_v[o] || 0) + 1;
        var pos_c = GameBoard.applyVector(coord, pos_v);
        pos_c.push(pos_v);
        ret[pos_c.slice(0,2)] = pos_c;
        if (thrust_points > 1) {
          $.extend(ret, GameBoard.possibleThrustCoords(coord, pos_v, thrust_points - 1, true));
        }
      });
    }
    return recursive ? ret : objValues(ret);
  };

  function objValues(obj) {
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  }

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

})();

$(document).ready(function() {
  GameBoard.init();
});
