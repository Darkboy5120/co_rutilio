const Users = () => {
	var globals = {
		'infoEl' : document.querySelector('#info'),
		'clientData' : null,
		'clientId' : null
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

	const fillClientDataModal = function () {
		const data = globals.clientData;
		document.querySelector('#mp-username').value = data.username;
		document.querySelector('#mp-phone').value = data.phone;
	};

	const drawInfo = function () {
		const data = globals.clientData;
		
		if (data == 0) {
			globals.infoEl.innerHTML = `
				<p>Did not find infomation</p>
			`;
		} else {
			var html = '';
			
			const c_id = data.id;
			const c_username = data.username;
			const c_email = data.email;
			const c_credit = data.credit;
			const c_phone = data.phone.slice(0, 3) + ' ' + data.phone.slice(3, 6) + ' ' + data.phone.slice(6, 10);
			const c_levelpoints = data.levelpoints;
			const c_url = (data.url != null) ? 'assets' + data.url.slice(2) : 'assets/files/img/default.jpg';

			html += `
				<div class="col mt-3">
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="assets/files/img/default.png" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div class="row" style="height: 2em;">
                    <div class="col"><h5 class="card-title">${c_username}</h5></div>
                    <div class="col">
                      Account level <span class="badge badge-pill badge-info">1</span>
                      <div class="progress">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                  <p class="card-text">You have $${c_credit}</p>
                  <p class="card-text">${c_phone}</p>
                  <div class="row" style="height: 2em;">
                    <div class="col"><p class="card-text"><small class="text-muted">${c_email}</small></p></div>
                    <div class="col">
                      <div class="btn-group" role="group" style="float: right;" aria-label="Button group with nested dropdown">
                        <div class="btn-group" role="group">
                          <button id="btnGroupDrop1" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          </button>
                          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <a class="dropdown-item" role="button" data-toggle="modal" data-target="#mp"
                            	onclick="user.fillClientDataModal();">Edit profile</a>
                          </div>
                        </div>
                        <button type="button" class="btn btn-secondary btn-sm">Recharge</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
			`;
			
			globals.infoEl.innerHTML = html;
		}
	};

	const changeProfile = function () {
		const log = [
			'Could not save the data',
			'Data saved succefully',
			'Invalid file type',
			'That username nor phone already exists'
			];
		var submit_button = document.querySelector('#mp-modify');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const username = document.querySelector('#mp-username').value;
		const phone = document.querySelector('#mp-phone').value;
		const image = document.querySelector('#mp-image').files[0];
		
		const validation = !(!username || !phone);
		if (!validation) return;

		var formData = new FormData();
		formData.append('username', username);
		formData.append('phone', phone);
		if (image) formData.append('image', image);
		
		fetch('assets/php/clientInterface_profile_changeProfile.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
			$('#mp').modal('hide');
			submit_button.innerHTML = default_text;
			
			if (response == 1) {
				alertify.notify(log[1], 'success', 5);
				window.setTimeout(() => {
					getClientData();
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

	const getClientData = function () {
		fetch('assets/php/global_getUserData.php')
		.then(response => response.json())
		.then(response => {
			globals.clientData = response;
			drawInfo();
		});
	};

	getClientData();

	$('#mp').on('shown.bs.modal', function () {
	  $('#mp-username').trigger('focus');
	});

	document.querySelector('#mp-modify').onclick = function () {
		document.querySelector('#fake-mp-modify').click();
	};
	document.querySelector('#mp-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		changeProfile();
	};

	return {
		fillClientDataModal : function () {
			return fillClientDataModal();
		}
	};
};

var user = Users();