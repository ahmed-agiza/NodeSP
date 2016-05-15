var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeSP' });
});

router.post('/fft', function(req, res, next) {
  console.log('/fft');
  var filter = req.body.filter;
  var filePath = path.join(process.cwd(), req.files.audio.path);
  console.log('-----------');
  console.log('PROCESSING GOES HERE');
  console.log('-----------');
  fs.unlink(filePath);
  res.render('fft', { title: 'NodeSP' });
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
