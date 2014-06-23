VectorEditor = {};

(function() {

  var dialogDiv;

  function createDialog() {
    dialogDiv = $('#vectordialog');
    $('button', dialogDiv).button();
    $(dialogDiv).dialog({
      autoOpen: false,
      modal: true,
      open: function(event, ui) {
        $('.ui-dialog-buttonpane button', dialogDiv.parent()).focus();
//        dialogDiv.append($('<p>uid: ' + $(dialogDiv).dialog('option', 'uid') + '</p>'));
      },
      buttons: {
        Cancel: function() {
          $(this).dialog('close');
        }
      }
    });
  }

  function unitDivClicked(unitDiv) {
    $(dialogDiv).dialog({
      uid:   unitDiv.attr('uid'),
      title: unitDiv.attr('title')
    });
    $(dialogDiv).dialog('open');
  };

  function registerClickEvents() {
    $('#gameboard .unit').click(function() {
      unitDivClicked($(this));
    });
  }

  VectorEditor.init = function() {
    registerClickEvents();
    createDialog();
  };

})();

$(document).ready(function() {
  VectorEditor.init();
});
