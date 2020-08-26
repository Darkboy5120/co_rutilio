const Users = () => {
	var globals = {
		'reservationsEl' : document.querySelector('#reservations'),
		'reservations' : null
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

	const drawReservations = function () {
		const data = globals.reservations;
		
		if (data.length == 0 || data == 0) {
			globals.reservationsEl.innerHTML = `
				<p>Did not find reservations</p>
			`;
		} else {
			var html = '';
			
			for (var i in data) {
				const r_id = data[i].id;
				const r_meeting = data[i].meeting;
				const r_date = data[i].date;
				const r_table_name = data[i].table_name;
				const r_table_desc = data[i].table_desc;
				const r_table_chairs = data[i].chairs;
				const r_url = (data[i].url != null) ? 'assets' + data[i].url.slice(2) : 'assets/files/img/default.jpg';
				const r_restaurant = data[i].restaurant;
				const r_dishes = data[i].dishes;

				var unit_time = ' mins ago';
				var delay = Math.round((new Date().getTime()- new Date(r_date).getTime()) / 60000);
				if (delay / 60 > 1) {
					unit_time = ' hours ago';
					delay = Math.round(delay / 60);
				}
				if (delay / 24 > 1) {
					unit_time = ' days ago';
					delay = Math.round(delay / 24);	
				}
				if (delay / 30 > 1) {
					unit_time = ' months ago';
					delay = Math.round(delay / 30);	
				}
				if (delay / 12 > 1) {
					unit_time = ' years ago';
					delay = Math.round(delay / 12);	
				}


				var r_dishes_html = '';
				for (var j in r_dishes) {
					r_dishes_html += `
						<div class="d-flex justify-content-between">
							<li class="list-group-item border-0">${r_dishes[j].name}</li>
							<li class="list-group-item border-0">#${r_dishes[j].amount}</li>
						</div>
					`;
				}

				html += `
					<div class="col mt-3">
	          <div class="card" style="width: 18rem;">
	            <img src="${r_url}" class="card-img-top" alt="...">
	            <div class="card-body">
	              <h5 class="card-title">${r_restaurant}</h5>
	              <p class="card-text">${r_table_desc}</p>
	              <h6 class="card-subtitle mb-2 text-muted">${r_table_name}</h6>
	              <p class="card-text">${r_table_desc}</p>
	            </div>
	            <ul class="list-group list-group-flush">
	            	${r_dishes_html}
	            </ul>
	            <div class="card-footer">
	              <small class="text-muted">${delay}${unit_time}</small>
	            </div>
	          </div>
	        </div>
				`;
			}
			
			globals.reservationsEl.innerHTML = html;
		}
	};

	const getReservations = function () {
		fetch('assets/php/clientInterface_reservations_getReservations.php')
		.then(response => response.json())
		.then(response => {
			globals.reservations = response;
			drawReservations();
		});
	};

	getReservations();

	document.querySelector('#signout').onclick = signOut;

	return {
	};
};

var user = Users();