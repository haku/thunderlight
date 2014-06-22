VectorEditor = {};

(function() {

  var dialogDiv;

  function createDialog() {
    dialogDiv = $('<div>editor goes here desu~</div>');
    dialogDiv.hide();
    $('body').append(dialogDiv);

    $(dialogDiv).dialog({
      autoOpen: false,
      modal: true,
      open: function(event, ui) {
        dialogDiv.text('uid: ' + $(dialogDiv).dialog('option', 'uid'));
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
