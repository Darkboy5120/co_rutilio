const Users = () => {
	var globals = {
		'dishesEl' : document.querySelector('#dishes'),
		'totalEl' : document.querySelector('#on-total'),
		'dishes' : null,
		'dishId' : null,
		'filter' : null,
		'order' : {}
	};

	const signOut = function () {
		fetch('assets/php/global_signOut.php')
		.then(response => response.json())
		.then(response => {
			if (response == 1) location = 'client_signin.php';
		});
	};

	const setCookie = function (key, value) {
		var formData = new FormData();
		formData.append('key', key);
		formData.append('value', value);
		
		return new Promise(resolve => {
			fetch('assets/php/global_setCookie.php', {
			  method: 'POST',
			  body: formData
			})
			.then(response => response.json())
			.then(response => {
				resolve(response);
			})
		});
	};

	const filter = function (data) {
		var result = [];
		const filter = globals.filter;
		
		if (!filter) {
      result = data;
    } else {
      for (var i in data) {
				if (data[i].name.search(filter) == -1
					&& data[i].price.search(filter) == -1
					&& data[i].description.search(filter) == -1) continue;
        result.push(data[i]);
      }
    }
    
    if (result.length == 0) return 0;
    else return result;
	};

	const drawTotal = function (order) {
		var total = 0;
		const dishes = globals.dishes;
		for (var i in dishes) {
			for (var j in order) {
				if (dishes[i].id == j) {
					total += (parseInt(order[j], 10) * parseInt(dishes[i].price, 10));
					break;
				}
			}
		}
		globals.totalEl.innerHTML = total;
	};

	const drawDishes = function () {
		const data = filter(globals.dishes);
		
		if (data.length == 0 || data == 0) {
			globals.dishesEl.innerHTML = `
				<p>Did not find dishes</p>
			`;
		} else {
			var html = '';
			
			for (var i in data) {
				const d_id = data[i].id;
				const d_name = data[i].name;
				const d_desc = data[i].description;
				const d_price = data[i].price;
				const d_available = data[i].available;
				const d_url = 'assets' + data[i].url.slice(2);
				const d_date = data[i].date;

				const d_available_txt = (d_available == 1)
					? '<b class="text-success">Available</b>'
					: '<b class="text-danger">Unavailable</b>';
				const d_actions = (d_available == 1)
					? `<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group mr-2" role="group" aria-label="First group">
                  <button type="button" class="btn btn-secondary disabled" data-menu-display="0">0</button>
                  <button type="button" class="btn btn-primary" data-menu-add="0"
                  	onclick="user.addDish(\'${d_id}\');"><i class="fas fa-plus"></i></button>
                  <button type="button" class="btn btn-danger d-none" data-menu-remove="0"
                  	onclick="user.removeDish(\'${d_id}\');"><i class="fas fa-minus"></i></button>
                </div>
              </div>`
          : '';

				html += `
					<div class="col mt-3">
          <div class="card" style="width: 18rem;">
            <img src="${d_url}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${d_name}</h5>
              <p class="card-text">${d_desc}</p>
              <div class="d-flex justify-content-between align-items-center">
                <b>$${d_price}</b>
                ${d_available_txt}
              </div>
              ${d_actions}
            </div>
          </div>
        </div>
				`;
			}
			
			globals.dishesEl.innerHTML = html;
		}
	};

	const addDish = function (d_id) {
		var order = globals.order;
		if (order[d_id]) {
			order[d_id] += 1;
		} else {
			order[d_id] = 1;
		}
		globals.order = order;
		drawTotal(order);
	};

	const removeDish = function (d_id) {
		var order = globals.order;
		order[d_id] -= 1;
		if (order[d_id] == 0) {
			delete order[d_id];
		}
		globals.order = order;
		drawTotal(order);
	};

	const makeReservation = function () {
		const log = [
			'Could not create the reservation',
			'Reservation created succefully',
			'That table it is reserved',
			'Some of the dishes are unavailable',
			'You have not order nothing yet'
			];
		var submit_button = document.querySelector('#on-create');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const order = globals.order;
		const date = document.querySelector('#on-date').value;
		
		const validation = !(!Object.keys(order).length || !date);
		if (Object.keys(order).length == 0) {
			submit_button.innerHTML = default_text;
			alertify.notify(log[4], 'error', 5);
		}
		if (!validation) return;
		
		var formData = new FormData();
		formData.append('order', JSON.stringify(order));
		formData.append('date', date);
		
		fetch('assets/php/providerInterface_menu_createReservation.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
			$('#cd').modal('hide');
			submit_button.innerHTML = default_text;
			console.log(response);
			
			if (response == 1) {
				alertify.notify(log[1], 'success', 5);
				window.setTimeout(() => {
					location = 'clientInterface_reservations.php';
				}, 2000);
			} else if (response == -1) {
				alertify.notify(log[2], 'error', 5);
			} else if (response == -2) {
				alertify.notify(log[3], 'error', 5);
			} else {
				alertify.notify(log[0], 'error', 5);
			}
		});
	};

	const getDishes = function () {
		fetch('assets/php/clientInterface_menu_getDishes.php')
		.then(response => response.json())
		.then(response => {
			globals.dishes = response;
			drawDishes();
		});
	};

	getDishes();


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

	document.querySelector('#signout').onclick = signOut;
	document.querySelector('#search').onkeyup = e => {
		globals.filter = e.target.value;
		drawDishes();
	};
	document.querySelector('#on-create').onclick = function () {
		document.querySelector('#fake-on-create').click();
	};
	document.querySelector('#on-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		makeReservation();
	};

	return {
		addDish : function (d_id) {
			return addDish(d_id);
		},
		removeDish : function (d_id) {
			return removeDish(d_id);
		}
	};
};

var user = Users();
