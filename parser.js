// Generated by CoffeeScript 1.3.3
var answers, checkAnswer, fs, nextQuestion, parseAnswer, readline;

fs = require('fs');

readline = require('readline');

checkAnswer = require('./answerparse').checkAnswer;

parseAnswer = require('./answerparse').parseAnswer;

answers = [];

fs.readFile('sample.txt', 'utf8', function(err, data) {
  var a, against, answer, c, d, i, line, neg, pos, _i, _j, _k, _len, _len1, _len2, _ref, _results;
  if (err) {
    throw err;
  }
  answers = (function() {
    var _i, _len, _ref, _results;
    _ref = data.split("\n");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      _results.push(JSON.parse(line).answer);
    }
    return _results;
  })();
  answers = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = answers.length; _i < _len; _i++) {
      answer = answers[_i];
      if (answer.length < 250) {
        _results.push(answer);
      }
    }
    return _results;
  })();
  answers = answers.sort(function() {
    return Math.random() - 0.5;
  });
  answers = answers.slice(0, 100);
  against = [];
  for (_i = 0, _len = answers.length; _i < _len; _i++) {
    a = answers[_i];
    _ref = parseAnswer(a), pos = _ref[0], neg = _ref[1];
    for (_j = 0, _len1 = pos.length; _j < _len1; _j++) {
      i = pos[_j];
      against.push(i);
    }
  }
  _results = [];
  for (_k = 0, _len2 = answers.length; _k < _len2; _k++) {
    a = answers[_k];
    _results.push((function() {
      var _l, _len3, _results1;
      _results1 = [];
      for (_l = 0, _len3 = against.length; _l < _len3; _l++) {
        d = against[_l];
        _results1.push((function() {
          var _len4, _m, _ref1, _results2;
          _ref1 = d.split(' ');
          _results2 = [];
          for (_m = 0, _len4 = _ref1.length; _m < _len4; _m++) {
            c = _ref1[_m];
            if (checkAnswer(c, a) === true) {
              if (c !== a) {
                _results2.push(console.log(c, a));
              } else {
                _results2.push(void 0);
              }
            } else {
              _results2.push(void 0);
            }
          }
          return _results2;
        })());
      }
      return _results1;
    })());
  }
  return _results;
});

nextQuestion = function() {
  var answer;
  answer = answers.shift();
  return rl.question(answer, function(resp) {
    var answ, opt, _i, _len, _ref;
    _ref = resp.split(',');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      opt = _ref[_i];
      answ = checkAnswer(opt, answer);
      console.log("judgement", answ);
      console.log("--------------------");
    }
    return nextQuestion();
  });
};
