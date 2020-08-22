const Users = () => {

	window.onclick = function (e) {
		var current = e.target;
		if (current.tagName == 'INPUT' && current.getAttribute('type') == 'radio') {
			current.parentNode.parentNode.querySelectorAll('input').forEach(e => {
				e.checked = (e.id == current.id) ? true : false;
			});
		}
	};

	$('#cd').on('shown.bs.modal', function () {
	  $('#cd-name').trigger('focus');
	});
	$('#md').on('shown.bs.modal', function () {
	  $('#md-name').trigger('focus');
	});

	document.querySelector('#cd-create').onclick = function () {
		document.querySelector('#fake-cd-create').click();
	};
	document.querySelector('#cd-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		$('#cd').modal('hide');
	};
	document.querySelector('#md-modify').onclick = function () {
		document.querySelector('#fake-md-modify').click();
	};
	document.querySelector('#md-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		$('#md').modal('hide');
	};
	document.querySelector('#dd-delete').onclick = function () {
		$('#dd').modal('hide');
	};

	return {};
};

var user = Users();