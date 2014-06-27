VectorEditor = {};

(function() {

  ORDINALS = ['n', 'ne', 'se', 's', 'sw', 'nw'];

  var dialogDiv;

  function resetDialog() {
    $('.label', dialogDiv).text('');
  }

  function setDialog(vector) {
    ORDINALS.forEach(function(o) {
      $('.label.' + o,  dialogDiv).text(vector[o]  || '');
    });
  }
  
  function submit(event) {
    $(event.target).button("option", "disabled", true);

    var vector = {};
    ORDINALS.forEach(function(o) {
      var x = $('.label.' + o,  dialogDiv).text();
      if (x) vector[o] = x;
    });
    console.log('vector', vector);

    $.ajax({
      url: '/game_board/vector',
      type: 'POST',
      data: {
        uid: $(dialogDiv).dialog('option', 'uid'),
        vector: vector
      },
      beforeSend: function() {
        $('.ui-dialog-buttonpane button', dialogDiv.parent()).focus();
      },
      success: function(resp) {
        window.location.reload(true);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error', jqXHR, textStatus, errorThrown);
      }
    });
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
        setDialog($(dialogDiv).dialog('option', 'vector'));
        $('.ui-dialog-buttonpane button', dialogDiv.parent()).focus();
      },
      buttons: {
        Set: submit,
        Cancel: function(foo) {
          $(this).dialog('close');
        }
      }
    });
  }

  VectorEditor.init = function() {
    createDialog();
  };

  VectorEditor.editUnitDiv = function(unitDiv) {
    $(dialogDiv).dialog({
      uid:    unitDiv.attr('uid'),
      title:  unitDiv.attr('title'),
      vector: JSON.parse(unitDiv.attr('vector'))
    });
    $(dialogDiv).dialog('open');
  };

})();

$(document).ready(function() {
  VectorEditor.init();
});
