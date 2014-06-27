GameBoard = {};

(function() {

  GameBoard.init = function() {
    $('#toolbar input').button();
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
