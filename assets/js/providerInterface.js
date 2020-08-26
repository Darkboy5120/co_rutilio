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
				const r_client_id = data[i].client_id;
				const r_client_name = data[i].username;

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

				html += `
					<div class="col mt-3">
	          <div class="card" style="width: 18rem;">
	            <div class="card-body">
	              <h6 class="card-subtitle mb-2 text-muted">${r_table_name}</h6>
	              <p class="card-text">${r_table_desc}</p>
	              <div class="row" style="height: 2em;">
	                <div class="col"><small class="text-muted">To ${r_meeting}</small></div>
	                <div class="col"><a role="button" class="btn btn-primary btn-sm btn-block"
	                	onclick="user.selectReservation(\'${r_id}\', \'${r_client_id}\');">Check</a></div>
	              </div>
	            </div>
	            <div class="card-footer">
	              <small class="text-muted">${delay}${unit_time} by ${r_client_name}</small>
	            </div>
	          </div>
	        </div>
				`;
			}
			
			globals.reservationsEl.innerHTML = html;
		}
	};

const selectReservation = async function (r_id, c_id) {
		let r0 = await setCookie('reservation_id', r_id);
		if (r0 == 1) {
			let r1 = await setCookie('client_id', c_id);
			if (r1 == 1) {
				location = 'providerInterface_reservations.php';
			}
		}
	};

	const getReservations = function () {
		fetch('assets/php/providerInterface_reservations_getReservations.php')
		.then(response => response.json())
		.then(response => {
			globals.reservations = response;
			drawReservations();
		});
	};

	getReservations();

	document.querySelector('#signout').onclick = signOut;

	return {
		selectReservation : function (r_id, c_id) {
			return selectReservation(r_id, c_id);
		}
	};
};

var user = Users();