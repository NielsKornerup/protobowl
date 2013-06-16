parse_bolds = function(text){
	if(text.split('{').length != text.split('}').length){
		alert('CORRUPT WALP')
	}
	$('#magic li').remove()
	console.log(text);

	var cur_mode, link, mode, parsed, seg, segments, text, _i, _j, _len, _len1, _ref, _ref1;

	segments = text.replace(/([\{\}\[\]\(\)\-])/g, '`$1`').replace(/\ +/g, ' ` ').replace(/\ +/g, ' ').split('`');

	cur_mode = false;

	parsed = [];

	for (_i = 0, _len = segments.length; _i < _len; _i++) {
	seg = segments[_i];
	if (seg === '{') {
	cur_mode = true;
	} else if (seg === '}') {
	cur_mode = false;
	} else if (seg) {
	parsed.push([cur_mode, seg]);
	}
	}

	for (_j = 0, _len1 = parsed.length; _j < _len1; _j++) {
	_ref = parsed[_j], mode = _ref[0], text = _ref[1];
	link = $("<a>").toggleClass('bold', mode).appendTo($("<li>").appendTo("#magic")).text(text).attr('href', '#');
	var q = text.trim().toLowerCase();
	if(q == "republic" || q == "republica"){
		link.removeClass('bold')	
	}

	if ((_ref1 = text.trim()) === '[' || _ref1 === ']' || _ref1 === ';' || _ref1 === ',' || _ref1 === '(' || _ref1 === ')' || _ref1 === '"' || _ref1 === '' || _ref1 === '”' || _ref1 === '“' || _ref1 === '-') {
	if (text === ' ') link.hide();
	link.removeClass('bold').addClass('unboldable').click(function() {
	return false;
	});

	} else {
	link.click(function() {
	var line;
	$(this).toggleClass('bold');
	line = extract_answerline2();
	$("#preview").text(line)
	console.log(line);
	return false;
	});
	}
	}
	var aline = extract_answerline2();
	$("#preview").text(aline)

}

load_next = function(){
	$('#container').fadeOut('normal', function(){
		$.getJSON('/stalkermode/to_boldly_go', function(e){
			$('#container').data('info', e);
			$("#textmain").text(e.question.replace(/[^a-z0-9]+$/i, '').split('.').reverse()[0] + '.')
			parse_bolds(e.answer)
			if(e.answer.split(' ').length == 1 || e.type != 'qb'){
				$('#submitline').hide()
				$('#submitline').click();
			}else{
				$('#submitline').show()
			}
			$('#container').fadeIn();
		})
	});
	what_remains();
}
extract_answerline2 = function(){
	return $('#magic li a').map(function() {
	var after, before, raw;
	if ($(this).hasClass('bold')) {
	raw = $(this).text();
	before = raw.match(/^\s*/)[0];
	after = raw.match(/\s*$/)[0];
	return "" + before + "{" + (raw.trim()) + "}" + after;
	} else {
	return $(this).text();
	}
	}).toArray().join('~').replace(/~/g, '').replace(/\s+/g, ' ').replace(/\}\s*\{/g, ' ').replace(/\s([\]\)])/g, '$1').replace(/([\[\(])\s/g, '$1');

}
what_remains = function(){
	$.get('/stalkermode/remaining', function(data, status){
		$('#remaining').text(data);
	})
}
$('#submitline').click(function(){
	$('#container').fadeOut('normal');
	var parsed = $('#container').data('info')
	/*
	$.post('/stalkermode/reports/simple_change/' + parsed._id, {answer: extract_answerline2(), fixed: 1}, function(data, status){
		console.log(data, status)
		load_next();
	})
	*/
	$.post('/stalkermode/reports/set_bold', {answer: extract_answerline2(), old: parsed.answer}, function(data, status){
		console.log(data, status)
		load_next();
	})
})
$("#cooper").click(function(){
	var parsed = $('#container').data('info');
	$.post('/stalkermode/reports/report_question/' + parsed._id, {}, function(data, status){
		console.log(data, status);
		$('#submitline').click()
	})
})
$(document).ready(function(){
	load_next()
})