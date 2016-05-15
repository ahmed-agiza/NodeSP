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
      preventDefault = false;
      uploadForm.submit();
    });
    hpfButton.click(function(e){
      e.preventDefault();
      uploadForm.attr('action', '/hpf');
      uploadForm.prepend('<input type="hidden" name="filter" value="hpf" />');
      preventDefault = false;
      uploadForm.submit();
    });
    bpfButton.click(function(e){
      e.preventDefault();
      uploadForm.attr('action', '/bpf');
      uploadForm.prepend('<input type="hidden" name="filter" value="bpf" />');
      preventDefault = false;
      uploadForm.submit();
    });

});
