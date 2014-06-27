GameBoard = {};

(function() {

  function divToUnit(unitDiv) {
    var coord = JSON.parse(unitDiv.attr('coord'));
    var vector = JSON.parse(unitDiv.attr('vector'));
    return {
      uid:    unitDiv.attr('uid'),
      title:  unitDiv.attr('title'),
      coord:  coord,
      vector: vector,
      next_coord: GameBoard.applyVector(coord, vector)
    };
  }

  function selectUnit(unitDiv) {
    if (unitDiv && unitDiv.hasClass('selected')) {
      VectorEditor.editUnitDiv(unitDiv);
    }
    else {
      $('#gameboard .unit').removeClass('selected');
      $('#gameboard .cell').removeClass('vectortarget');
      if (unitDiv) {
        var u = divToUnit(unitDiv);
        unitDiv.addClass('selected');
        $('#gameboard #cell_' + u.next_coord[0] + '_' + u.next_coord[1]).addClass('vectortarget');
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

})();

$(document).ready(function() {
  GameBoard.init();
});
