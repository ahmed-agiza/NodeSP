var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var Complex = require('Complex');
var DSP = require('../modules/dsp');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeSP' });
});

router.post('/fft', function(req, res, next) {
  var filter = req.body.filter;
  var filePath = path.join(process.cwd(), req.files.audio.path);
  var ndarrayWav = require('ndarray-wav');
  ndarrayWav.open(filePath, function (err, chunkMap, chunkArr) {
    if (err) {
      console.error(err);
      fs.unlink(filePath);
      return res.status(500).json(err);
    }

    var format = chunkMap.fmt;
    var ndSamples = chunkMap.data;
    var sampleData = ndSamples.data;
    var numChannels = ndSamples.shape[0];
    var numSamples = ndSamples.shape[1];
    var formatData = chunkArr[0].data;



    var complexSignal = [];
    for(var key in sampleData) {
      complexSignal.push(new Complex(sampleData[key], 0));
    }
    DSP.FFT(complexSignal, function (err, result) {
      fs.unlink(filePath);
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      /*
      * Wirte Audio File
      *
      *DSP.InverseFFT(result, function(err, inv) {
        ndSamples.data = {};
        var index = 0;
        for (var i = 0; i < inv.length; i++) {
          ndSamples.data[i] = inv[i].real;
        }


        ndarrayWav.write('output.wav', ndSamples, formatData, function (err) {if (err) console.error(err);});
      })
      */


      res.render('fft', { title: 'NodeSP', signal: complexSignal, fft:  result});
    });


  });

});

router.post('/bpf', function(req, res, next) {
  console.log('/bpf');
  var filter = req.body.filter;
  var high = parseInt(req.body.high);
  var low = parseInt(req.body.low);
  var filePath = path.join(process.cwd(), req.files.audio.path);
  var ndarrayWav = require('ndarray-wav');
  ndarrayWav.open(filePath, function (err, chunkMap, chunkArr) {
    if (err) {
      console.error(err);
      fs.unlink(filePath);
      return res.status(500).json(err);
    }

    var format = chunkMap.fmt;
    var ndSamples = chunkMap.data;
    var sampleData = ndSamples.data;
    var numChannels = ndSamples.shape[0];
    var numSamples = ndSamples.shape[1];
    var formatData = chunkArr[0].data;




    var complexSignal = [];
    for(var key in sampleData) {
      complexSignal.push(new Complex(sampleData[key], 0));
    }
    DSP.FFT(complexSignal, function (err, fft) {
      fs.unlink(filePath);
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      DSP.BandPass(fft, low, high, function(err, result) {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }

        DSP.InverseFFT(result, function(err, inv) {
          ndSamples.data = {};
          var index = 0;
          for (var i = 0; i < inv.length; i++) {
            ndSamples.data[i] = inv[i].real;
          }

          var fileName = (Math.random().toString().split('.')[1]) + '.wav';

          ndarrayWav.write('./temp/' + fileName, ndSamples, formatData, function (err) {if (err) console.error(err);});
          res.render('bpf', { title: 'NodeSP', link: '/temp/' + fileName});
        })
      });




    });


  });
});

router.post('/lpf', function(req, res, next) {
  var filter = req.body.filter;
  var cutoff = parseInt(req.body.cutoff);
  var filePath = path.join(process.cwd(), req.files.audio.path);
  var ndarrayWav = require('ndarray-wav');
  ndarrayWav.open(filePath, function (err, chunkMap, chunkArr) {
    if (err) {
      console.error(err);
      fs.unlink(filePath);
      return res.status(500).json(err);
    }

    var format = chunkMap.fmt;
    var ndSamples = chunkMap.data;
    var sampleData = ndSamples.data;
    var numChannels = ndSamples.shape[0];
    var numSamples = ndSamples.shape[1];
    var formatData = chunkArr[0].data;




    var complexSignal = [];
    for(var key in sampleData) {
      complexSignal.push(new Complex(sampleData[key], 0));
    }
    DSP.FFT(complexSignal, function (err, fft) {
      fs.unlink(filePath);
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      DSP.LowPass(fft, cutoff, function(err, result) {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }

        DSP.InverseFFT(result, function(err, inv) {
          ndSamples.data = {};
          var index = 0;
          for (var i = 0; i < inv.length; i++) {
            ndSamples.data[i] = inv[i].real;
          }

          var fileName = (Math.random().toString().split('.')[1]) + '.wav';

          ndarrayWav.write('./temp/' + fileName, ndSamples, formatData, function (err) {if (err) console.error(err);});
          res.render('lpf', { title: 'NodeSP', link: '/temp/' + fileName});
        })
      });




    });


  });
});

router.post('/hpf', function(req, res, next) {
  var filter = req.body.filter;
  var cutoff = parseInt(req.body.cutoff);
  var filePath = path.join(process.cwd(), req.files.audio.path);
  var ndarrayWav = require('ndarray-wav');
  ndarrayWav.open(filePath, function (err, chunkMap, chunkArr) {
    if (err) {
      console.error(err);
      fs.unlink(filePath);
      return res.status(500).json(err);
    }

    var format = chunkMap.fmt;
    var ndSamples = chunkMap.data;
    var sampleData = ndSamples.data;
    var numChannels = ndSamples.shape[0];
    var numSamples = ndSamples.shape[1];
    var formatData = chunkArr[0].data;




    var complexSignal = [];
    for(var key in sampleData) {
      complexSignal.push(new Complex(sampleData[key], 0));
    }
    DSP.FFT(complexSignal, function (err, fft) {
      fs.unlink(filePath);
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      DSP.HighPass(fft, cutoff, function(err, result) {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }

        DSP.InverseFFT(result, function(err, inv) {
          ndSamples.data = {};
          var index = 0;
          for (var i = 0; i < inv.length; i++) {
            ndSamples.data[i] = inv[i].real;
          }

          var fileName = (Math.random().toString().split('.')[1]) + '.wav';

          ndarrayWav.write('./temp/' + fileName, ndSamples, formatData, function (err) {if (err) console.error(err);});
          res.render('hpf', { title: 'NodeSP', link: '/temp/' + fileName});
        })
      });




    });


  });
});

module.exports = router;
