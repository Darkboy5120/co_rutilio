const Users = () => {
	const signin = function () {
		const log = [
			'That username, email or password are wrong',
			'Session started successfully'
			];
		var submit_button = document.querySelector('form button[type="submit"]');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const usernameoremail = document.querySelector('#usernameoremail').value;
		const pwd = document.querySelector('#password').value;
		
		var formData = new FormData();
		formData.append('usernameoremail', usernameoremail);
		formData.append('password', pwd);
		
		fetch('assets/php/client_signin_startSession.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
			submit_button.innerHTML = default_text;
			
			if (response == 1) {
				alertify.notify(log[1], 'success', 5);
				window.setTimeout(function () {
					location = 'clientInterface.php';
				}, 2000);
			} else {
				alertify.notify(log[0], 'error', 5);
			}
		});
	};
	
	document.querySelector('#signin-form').onsubmit = function (e) {
		e.preventDefault();
		e.stopPropagation();
		signin();
	};
};

var user = Users();
