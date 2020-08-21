const Users = () => {


	window.onclick = function (e) {
		var current = e.target;
		if (current.hasAttribute('data-menu-remove') || current.hasAttribute('data-menu-add')
			|| current.tagName == 'I') {
			
			var father = e.target.parentNode;
			if (father.hasAttribute('data-menu-add') || father.hasAttribute('data-menu-remove')) {
				current = current.parentNode;
			} else if (current.tagName == 'I') {
				return;
			}
			var display = current.parentNode.querySelector('[data-menu-display]');
			if (current.hasAttribute('data-menu-add')) {
				var remove = current.parentNode.querySelector('[data-menu-remove]');
			}
			const count = parseInt(display.getAttribute('data-menu-display'), 10);
			var card = current.parentNode.parentNode.parentNode;
			if (current.hasAttribute('data-menu-add')) {
				if (count == 0) {
					card.classList.add('bg-dark', 'text-white');
					remove.classList.remove('d-none');
				}
				display.setAttribute('data-menu-display', count+1 );
				display.innerHTML = count+1;
			} else if (current.hasAttribute('data-menu-remove')) {
				if (count == 1) {
					card.classList.remove('bg-dark', 'text-white');
					current.classList.add('d-none');
				}
				display.setAttribute('data-menu-display', count-1 );
				display.innerHTML = count-1;
			}
		}
	};

	$('#on').on('shown.bs.modal', function () {
	  $('#on-date').trigger('focus');
	});

	document.querySelector('#on-create').onclick = function () {
		document.querySelector('#fake-on-create').click();
	};
	document.querySelector('#on-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		location = 'clientInterface_reservations.php';
	};

	return {};
};

var user = Users();