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
  console.log('/fft');
  var filter = req.body.filter;
  var filePath = path.join(process.cwd(), req.files.audio.path);
  console.log('-----------');
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
  console.log('-----------');

});

router.post('/lpf', function(req, res, next) {
  console.log('/lpf');
  var filter = req.body.filter;
  var filePath = path.join(process.cwd(), req.files.audio.path);
  console.log('-----------');
  console.log('PROCESSING GOES HERE');
  console.log('-----------');
  fs.unlink(filePath);
  res.render('lpf', { title: 'NodeSP' });
});

router.post('/lpf', function(req, res, next) {
  console.log('/lpf');
  var filter = req.body.filter;
  var filePath = path.join(process.cwd(), req.files.audio.path);
  console.log('-----------');
  console.log('PROCESSING GOES HERE');
  console.log('-----------');
  fs.unlink(filePath);
  res.render('lpf', { title: 'NodeSP' });
});

router.post('/hpf', function(req, res, next) {
  console.log('/hpf');
  var filter = req.body.filter;
  var filePath = path.join(process.cwd(), req.files.audio.path);
  console.log('-----------');
  console.log('PROCESSING GOES HERE');
  console.log('-----------');
  fs.unlink(filePath);
  res.render('hpf', { title: 'NodeSP' });
});

module.exports = router;
