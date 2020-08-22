const Users = () => {

	window.onclick = function (e) {
		var current = e.target;
		if (current.tagName == 'INPUT' && current.getAttribute('type') == 'radio') {
			current.parentNode.parentNode.querySelectorAll('input').forEach(e => {
				e.checked = (e.id == current.id) ? true : false;
			});
		}
	};

	$('#ct').on('shown.bs.modal', function () {
	  $('#ct-name').trigger('focus');
	});
	$('#mt').on('shown.bs.modal', function () {
	  $('#mt-name').trigger('focus');
	});

	document.querySelector('#ct-create').onclick = function () {
		document.querySelector('#fake-ct-create').click();
	};
	document.querySelector('#ct-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		$('#ct').modal('hide');
	};
	document.querySelector('#mt-modify').onclick = function () {
		document.querySelector('#fake-mt-modify').click();
	};
	document.querySelector('#mt-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		$('#mt').modal('hide');
	};
	document.querySelector('#dt-delete').onclick = function () {
		$('#dt').modal('hide');
	};

	return {};
};

var user = Users();