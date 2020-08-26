const Users = () => {
		var globals = {
		'dishesEl' : document.querySelector('#dishes'),
		'dishes' : null,
		'filter' : null,
		'dishId' : null
	};

	const signOut = function () {
		fetch('assets/php/global_signOut.php')
		.then(response => response.json())
		.then(response => {
			if (response == 1) location = 'provider_signin.php';
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
					&& data[i].description.search(filter) == -1
					&& data[i].price.search(filter) == -1) continue;
        result.push(data[i]);
      }
    }
    
    if (result.length == 0) return 0;
    else return result;
	};

	const fillDishModal = function (dish_id) {
		const dishes = globals.dishes;
		for (var i in dishes) {
			if (dishes[i].id == dish_id) {
				document.querySelector('#md-name').value = dishes[i].name;
				document.querySelector('#md-description').value = dishes[i].description;
				document.querySelector('#md-price').value = dishes[i].price;
				document.querySelector('#md-unavailable').value = parseInt(dishes[i].available, 10);
				document.querySelector('#md-available').value = !parseInt(dishes[i].available, 10);
				return;
			}
		}
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

				html += `
					<div class="col mt-3">
	          <div class="card" style="width: 18rem;">
	            <img src="${d_url}" class="card-img-top" alt="...">
	            <div class="card-body">
	              <h5 class="card-title">${d_name}</h5>
	              <p class="card-text">${d_desc}</p>
	              <div class="d-flex align-items-center justify-content-between">
	                <b>${d_price} chairs</b>
	                ${d_available_txt}
	              </div>
	              <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary" onclick="user.changeDishModal(\'${d_id}\');">
                      <i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger" onclick="user.deleteDishModal(\'${d_id}\');">
                      <i class="fas fa-trash"></i></button>
                  </div>
                </div>
	            </div>
	          </div>
	        </div>
				`;
			}
			
			globals.dishesEl.innerHTML = html;
		}
	};

	const createDish = function () {
		const log = [
			'Could not create the dish',
			'Dish created succefully',
			'Invalid file type',
			'That dish already exists'
			];
		var submit_button = document.querySelector('#cd-create');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const name = document.querySelector('#cd-name').value;
		const desc = document.querySelector('#cd-description').value;
		const image = document.querySelector('#cd-image').files[0];
		const price = document.querySelector('#cd-price').value;
		const available = (document.querySelector('#cd-available').checked)
			? 1
			: 0;
		
		const validation = !(!name || !desc || !price || !desc);
		if (!validation) return;
		
		var formData = new FormData();
		formData.append('name', name);
		formData.append('description', desc);
		formData.append('image', image);
		formData.append('price', price);
		formData.append('available', available);
		
		fetch('assets/php/providerInterface_menu_createDish.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
			$('#cd').modal('hide');
			submit_button.innerHTML = default_text;
			
			if (response == 1) {
				alertify.notify(log[1], 'success', 5);
				window.setTimeout(() => {
					getDishes();
				}, 1000);
			} else if (response == -1) {
				alertify.notify(log[2], 'error', 5);
			} else if (response == -2) {
				alertify.notify(log[3], 'error', 5);
			} else {
				alertify.notify(log[0], 'error', 5);
			}
		});
	};

	const changeDishModal = function (dish_id) {
		$('#md').modal('show');
		globals.dishId = dish_id;
		fillDishModal(dish_id);
	};
	
	const changeDish = function () {
		const log = [
			'Could not create the dish',
			'Dish created succefully',
			'Invalid file type',
			'That dish already exists'
			];
		var submit_button = document.querySelector('#md-modify');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const id = globals.dishId;
		const name = document.querySelector('#md-name').value;
		const desc = document.querySelector('#md-description').value;
		const image = document.querySelector('#md-image').files[0];
		const price = document.querySelector('#md-price').value;
		const available = (document.querySelector('#md-available').checked)
			? '1'
			: '0';
		
		const validation = !(!id || !desc || !price || !available);
		if (!validation) return;

		var formData = new FormData();
		formData.append('id', id);
		formData.append('name', name);
		formData.append('description', desc);
		formData.append('price', price);
		formData.append('available', available);
		if (image) formData.append('image', image);
		
		fetch('assets/php/providerInterface_menu_changeDish.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
			$('#md').modal('hide');
			submit_button.innerHTML = default_text;
			
			if (response == 1) {
				alertify.notify(log[1], 'success', 5);
				window.setTimeout(() => {
					getDishes();
				}, 1000);
			} else if (response == -1) {
				alertify.notify(log[2], 'error', 5);
			} else if (response == -2) {
				alertify.notify(log[3], 'error', 5);
			} else {
				alertify.notify(log[0], 'error', 5);
			}
		});
	};

	const deleteDishModal = function (dish_id) {
		$('#dd').modal('show');
		globals.dishId = dish_id;
	};
	
	const deleteDish = function () {
		const log = [
			'Could not delete the dish',
			'Dish deleted succefully'
			];
		var submit_button = document.querySelector('#dd-delete');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const id = globals.dishId;
		
		const validation = !(!id);
		if (!validation) return;

		var formData = new FormData();
		formData.append('id', id);
		
		fetch('assets/php/providerInterface_menu_deleteDish.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
			$('#dd').modal('hide');
			submit_button.innerHTML = default_text;
			
			if (response == 1) {
				alertify.notify(log[1], 'success', 5);
				window.setTimeout(() => {
					getDishes();
				}, 1000);
			} else {
				alertify.notify(log[0], 'error', 5);
			}
		});
	};

	const getDishes = function () {
		fetch('assets/php/global_getDishes.php')
		.then(response => response.json())
		.then(response => {
			globals.dishes = response;
			drawDishes();
		});
	};

	getDishes();

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

	document.querySelector('#signout').onclick = signOut;
	document.querySelector('#cd-create').onclick = function () {
		document.querySelector('#fake-cd-create').click();
	};
	document.querySelector('#cd-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		createDish();
	};
	document.querySelector('#md-modify').onclick = function () {
		document.querySelector('#fake-md-modify').click();
	};
	document.querySelector('#md-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		changeDish();
	};
	document.querySelector('#dd-delete').onclick = function () {
		deleteDish();
	};
	document.querySelector('#search').onkeyup = e => {
		globals.filter = e.target.value;
		drawDishes();
	};

	return {
		changeDishModal : function (dish_id) {
			return changeDishModal(dish_id);
		},
		deleteDishModal : function (dish_id) {
			return deleteDishModal(dish_id);
		}
	};
};

var user = Users();