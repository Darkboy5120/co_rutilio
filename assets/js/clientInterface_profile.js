const Users = () => {

	$('#mp').on('shown.bs.modal', function () {
	  $('#mp-username').trigger('focus');
	});

	document.querySelector('#mp-modify').onclick = function () {
		document.querySelector('#fake-mp-modify').click();
	};
	document.querySelector('#mp-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		$('#mp').modal('hide');
	};

	return {};
};

var user = Users();