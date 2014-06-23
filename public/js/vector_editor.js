VectorEditor = {};

(function() {

  var dialogDiv;

  function resetDialog() {
    $('.label', dialogDiv).text('');
  }

  function clickFactory(sel, opSel) {
    var lbl = $('.label' + sel, dialogDiv);
    var opLbl = $('.label' + opSel, dialogDiv);
    return function() {
      var v = opLbl.text();
      if (v && (v = parseInt(v)) > 0) {
        v -= 1;
        opLbl.text(v > 0 ? v : '');
      }
      else {
        var v = lbl.text();
        v = v ? parseInt(v) + 1 : 1;
        lbl.text(v > 0 ? v : '');
      }
    };
  }

  function createDialog() {
    dialogDiv = $('#vectordialog');
    $('button', dialogDiv).button();

    $('button.n', dialogDiv).click(clickFactory('.n', '.s'));
    $('button.s', dialogDiv).click(clickFactory('.s', '.n'));
    $('button.ne', dialogDiv).click(clickFactory('.ne', '.sw'));
    $('button.sw', dialogDiv).click(clickFactory('.sw', '.ne'));
    $('button.nw', dialogDiv).click(clickFactory('.nw', '.se'));
    $('button.se', dialogDiv).click(clickFactory('.se', '.nw'));

    $(dialogDiv).dialog({
      autoOpen: false,
      modal: true,
      open: function(event, ui) {
        resetDialog();
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
