const Users = () => {
	var globals = {
		'reservationEl' : document.querySelector('#reservation'),
		'reservation' : null
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

	const drawReservation = function () {
		const data = globals.reservation;
		
		if (data.length == 0 || data == 0) {
			globals.reservationEl.innerHTML = `
				<p>Did not find data</p>
			`;
		} else {
			var html = '';
			
			const c_id = data.id;
			const c_username = data.username;
			const c_email = data.email;
			const c_phone = data.phone.slice(0, 3) + ' ' + data.phone.slice(3, 6) + ' ' + data.phone.slice(6, 10);
			const c_url = (data.url != null) ? 'assets' + data.url.slice(2) : 'assets/files/img/default.jpg';
			const c_levelpoints = data.levelpoints;
			const c_dishes = data.dishes;

			var c_dishes_html = '';
			for (var j in c_dishes) {
				c_dishes_html += `
					<li class="list-group-item d-flex justify-content-between align-items-center">
            ${c_dishes[j].name}<span>#${c_dishes[j].amount}</span>
          </li>
				`;
			}

			html += `
				<div class="col mt-3">
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${c_url}" class="card-img" alt="...">
              </div>
              <div class="col-sm mt-3">
                <div class="card-body">
                  <div class="row" style="height: 2em;">
                    <div class="col"><h5 class="card-title">${c_username}</h5></div>
                    <div class="col">
                      Account level <span class="badge badge-pill badge-info">2</span>
                      <div class="progress">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                  <p class="card-text">${c_phone}</p>
                  <div class="row" style="height: 2em;">
                    <div class="col"><p class="card-text"><small class="text-muted">${c_email}</small></p></div>
                    <div class="col">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm mt-3 overflow-auto" style="height: 30em;">
          <ul class="list-group">
          	${c_dishes_html}
          </ul>
        </div>
			`;
			
			globals.reservationEl.innerHTML = html;
		}
	};

	const getReservation = function () {
		fetch('assets/php/providerInterface_reservations_getReservation.php')
		.then(response => response.json())
		.then(response => {
			globals.reservation = response;
			drawReservation();
		});
	};

	getReservation();

	document.querySelector('#signout').onclick = signOut;

	return {
	};
};

var user = Users();
