'use strict';

$(document).ready(function(){
    var fftButton = $('#fft');
    var lpfButton = $('#lpf');
    var hpfButton = $('#hpf');
    var bpfButton = $('#bpf');


    var uploadForm = $('#form-process');

    var preventDefault = true;

    uploadForm.submit(function (e) {
      if (preventDefault)
        e.preventDefault();
      console.log('Submit');
    });

    fftButton.click(function(e){
      e.preventDefault();
      uploadForm.attr('action', '/fft');
      uploadForm.prepend('<input type="hidden" name="filter" value="fft" />');
      preventDefault = false;
      uploadForm.submit();
    });
    lpfButton.click(function(e){
      e.preventDefault();
      uploadForm.attr('action', '/lpf');
      uploadForm.prepend('<input type="hidden" name="filter" value="lpf" />');
      var cutoff = prompt("Select cut-off frequency");
      if (cutoff != null) {
        var value = parseInt(cutoff);
        if (!isNaN(value)) {
          uploadForm.prepend('<input type="hidden" name="cutoff" value="' + value + '" />');
          preventDefault = false;
          uploadForm.submit();
        }
      }
    });
    hpfButton.click(function(e){
      e.preventDefault();
      uploadForm.attr('action', '/hpf');
      uploadForm.prepend('<input type="hidden" name="filter" value="hpf" />');
      var cutoff = prompt("Select cut-off frequency");
      if (cutoff != null) {
        var value = parseInt(cutoff);
        if (!isNaN(value)) {
          uploadForm.prepend('<input type="hidden" name="cutoff" value="' + value + '" />');
          preventDefault = false;
          uploadForm.submit();
        }
      }
    });
    bpfButton.click(function(e){
      e.preventDefault();
      uploadForm.attr('action', '/bpf');
      uploadForm.prepend('<input type="hidden" name="filter" value="bpf" />');
      var low = prompt("Select low frequency");
      if (low != null) {
        var valueLow = parseInt(low);
        if (!isNaN(low)) {
          var high = prompt("Select high frequency");
          if (high != null) {
            var valueHigh = parseInt(high);
            if (!isNaN(low)) {
              uploadForm.prepend('<input type="hidden" name="low" value="' + valueLow + '" />');
              uploadForm.prepend('<input type="hidden" name="high" value="' + valueHigh + '" />');
              preventDefault = false;
              uploadForm.submit();
            }
          }
        }
      }
    });

});
