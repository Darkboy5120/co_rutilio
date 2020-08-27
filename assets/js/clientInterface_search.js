const Users = () => {
	var globals = {
		'restaurantsEl' : document.querySelector('#restaurants'),
		'restaurants' : null,
		'restaurantsId' : null,
		'filter' : null
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
				if (data[i].restaurant.search(filter) == -1
					&& data[i].description.search(filter) == -1) continue;
        result.push(data[i]);
      }
    }
    
    if (result.length == 0) return 0;
    else return result;
	};

	const drawRestaurants = function () {
		const data = filter(globals.restaurants);
		
		if (data == 0) {
			globals.restaurantsEl.innerHTML = `
				<p>Did not find restaurants</p>
			`;
		} else {
			var html = '';
			
			for (var i in data) {
				const r_id = data[i].id;
				const r_restaurant = data[i].restaurant;
				const r_description = data[i].description;
				const r_url = (data[i].url != null) ? 'assets' + data[i].url.slice(2) : 'assets/files/img/default.jpg';
				const r_restaurant_id = data[i].restaurant_id;

				const favorite_classes = (r_id == r_restaurant_id) ? 'active bg-danger' : '';

				html += `
					<div class="col mt-3">
	          <div class="card" style="width: 18rem;">
	            <img src="${r_url}" class="card-img-top" alt="...">
	            <div class="card-body">
	              <h5 class="card-title">${r_restaurant}</h5>
	              <p class="card-text">${r_description}</p>
	              <div class="btn-group" role="group" aria-label="Basic example">
	              	<a role="button" class="btn btn-primary" onclick="user.selectRestaurant(\'${r_id}\');">Get in</a>
	              	<a role="button" class="btn btn-secondary ${favorite_classes}" data-favorite="0" onclick="user.toggleFavorite(\'${r_id}\');">
	              		<i class="fas fa-heart"></i></a>
	            	</div>
	            </div>
	          </div>
	        </div>
				`;
			}
			
			globals.restaurantsEl.innerHTML = html;
		}
	};

	const selectRestaurant = async function (r_id) {
		let r0 = await setCookie('restaurant_id', r_id);
		if (r0 == 1) {
			location = 'clientInterface_tables.php';
		}
	};

	const toggleFavorite = Debounce(function (r_id) {
		var formData = new FormData();
		formData.append('id', r_id);
		
		fetch('assets/php/clientInterface_search_toggleFavorite.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
		});
	}, 500);

	const getRestaurants = function () {
		fetch('assets/php/global_getRestaurants.php')
		.then(response => response.json())
		.then(response => {
			globals.restaurants = response;
			drawRestaurants();
		});
	};

	getRestaurants();

	window.onclick = function (e) {
		var current = e.target;
		if (current.tagName == 'I') {
			current = current.parentNode;
		}

		if (current.hasAttribute('data-favorite')) {
			const new_value = (current.getAttribute('data-favorite') == 1)
				? 0 : 1;
			current.setAttribute('data-favorite', new_value);
			current.classList.toggle('active');
			current.classList.toggle('bg-danger');
		}
	};

	document.querySelector('#signout').onclick = signOut;
	document.querySelector('#search').onkeyup = e => {
		globals.filter = e.target.value;
		drawRestaurants();
	};

	return {
		selectRestaurant : function (r_id) {
			return selectRestaurant(r_id);
		},
		toggleFavorite : function (r_id) {
			return toggleFavorite(r_id);
		}
	};
};

var user = Users();
