var Complex = require('Complex');

module.exports = {
    FFT: function(complexSignal, cb) {
      var PI = 3.14159265358979323846264;

      var numSamples = Object.keys(complexSignal).length;
      if(numSamples & (numSamples -1)) {
        var target = Math.pow(2, new Number(numSamples).toString(2).length);
        for (var i = 0; i < target - numSamples; i++) {
          complexSignal.push(new Complex(0, 0));
        }
        numSamples = Object.keys(complexSignal).length;
      }


      var _fft = function(samples) {
        var size = samples.length;

        if (size == 1)
          return samples;

        var even = [], odd = [];

        for (var i = 0; i < samples.length; i += 2) {
          even.push(samples[i]);
          odd.push(samples[i + 1]);
        }





        even = _fft(even);
        odd = _fft(odd);


        for(var i = 0; i < size / 2; i++) {
          var theta = -2 * PI * i / size;
          var xEven = even[i];
          var xOdd = new Complex(Math.cos(theta), Math.sin(theta)).multiply(odd[i]);

          samples[i] = new Complex(xEven.real, xEven.im).add(xOdd);
          samples[i + size / 2] = new Complex(xEven.real, xEven.im).subtract(xOdd);
        }



        return samples;

      }

      var fftResults = _fft(complexSignal);

      cb(null, fftResults);

    },
    InverseFFT: function(signal, cb) {
      for (var i = 0; i < signal.length; i++)
        signal[i].conjugate();



      signal = this.FFT(signal, function(err, results) {
        if (err)
          return cb(err);

        for (var i = 0; i < results.length; i++) {
          results[i].conjugate();
          results[i].divide(signal.length);
        }

        cb(null, results);
      });

    },
    LowPass: function (fft, cutoff, cb) {
      for(var i = cutoff; i < fft.length; i++) {
        fft[i] = new Complex(0, 0);
      }
      cb(null, fft);
    },
    HighPass: function (fft, cutoff, cb) {
      for(var i = 0; i < cutoff && i < fft.length; i++) {
        fft[i] = new Complex(0, 0);
      }
      cb(null, fft);
    },
    BandPass: function (fft, low, high, cb) {
      for(var i = 0; i < low; i++) {
        fft[i] = new Complex(0, 0);
      }
      for(var i = high; i < fft.length; i++) {
        fft[i] = new Complex(0, 0);
      }
      cb(null, fft);
    }
}
