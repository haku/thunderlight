GameBoard = {};

(function() {

  GameBoard.init = function() {
    $('#toolbar input').button();
  };

})();

$(document).ready(function() {
  GameBoard.init();
});
