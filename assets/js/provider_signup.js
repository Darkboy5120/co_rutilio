const Users = () => {	
	let globals = {
		'error_icon_class' : 'fa-times-circle',
		'success_icon_class' : 'fa-check-circle',
		'fields_regex' : [
			{'regex' : /[^A-Za-z]+/i,
				'not' : 0
				},
			{'regex' : /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
				'not' : 1
				},
			{'regex' : /[^A-Za-z\s]+/i,
				'not' : 0
				},
			{'regex' : /[^0-9]+/i,
				'not' : 0
				},
			{'regex' : /[^A-Za-z0-9]+/g,
				'not' : 0
				}
			]
		};
	
	const signup_validate = function (username, email, restaurant, phone, pwd) {
		if (!username || !email || !restaurant || !phone || !pwd) return 0;
		//else if (pwd != pwdconfirm) return -1;
		return 1;
	};
	
	const signup = function () {
		const log = [
			'Could not create the account',
			'Account created successfully',
			'That username, email, restaurant or phone already exists'
			];
		var submit_button = document.querySelector('form button[type="submit"]');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const username = document.querySelector('#username').value;
		const email = document.querySelector('#email').value;
		const restaurant = document.querySelector('#restaurant').value;
		const phone = document.querySelector('#phone').value;
		const pwd = document.querySelector('#password').value;
		
		const validation = signup_validate(username, email, restaurant, phone, pwd);
		if (validation != 1) {
			switch (validation) {
				case 0: return; break;
			}
			
			return;
		} else {
			var formData = new FormData();
			formData.append('username', username);
			formData.append('email', email);
			formData.append('restaurant', restaurant);
			formData.append('phone', phone);
			formData.append('password', pwd);
			
			fetch('assets/php/provider_signup_createAccount.php', {
			  method: 'POST',
			  body: formData
			})
			.then(response => response.json())
			.then(response => {
				submit_button.innerHTML = default_text;
			
				if (response == 1) {
					alertify.notify(log[1], 'success', 5);
					window.setTimeout(function () {
						location = 'provider_signin.php';
					}, 2000);
				} else if (response == -1) {
					alertify.notify(log[2], 'error', 5);
				} else {
					alertify.notify(log[0], 'error', 5);
				}
			});
		}
	}
	
	const turnInputIcon = function (el, state) {
		var icon = el.parentNode.querySelector('i');
		
		icon.classList.remove(globals.error_icon_class,
			globals.success_icon_class
			);
		
		if (state == 0) icon.style.display = 'none';
		else icon.style.display = 'block';
		
		switch (state) {
			case -1: icon.classList.add(globals.error_icon_class); break;
			case 0: icon.style; break;
			case 1: icon.classList.add(globals.success_icon_class); break;
		}
		
	};
	
	const check_input = Debounce(function (e, field) {
		const expressions = globals.fields_regex[field];
		
		var regex = expressions['regex'];
		var state;
		const value = e.target.value;
		const check = (expressions['not']) ? !regex.test(value) : regex.test(value);
				
		if (!value) state = 0;
		else if (check || value.length < 5) state = -1;
		else if (field == 3 && value.length != 10) state = -1
		else state = 1;
		
		turnInputIcon(e.target, state);
	}, 100);
	
	window.onload = function () {
		
	};
	
	document.querySelector('#username').addEventListener('keyup', (e) => {
		check_input(e, 0);
	});
	document.querySelector('#email').addEventListener('keyup', (e) => {
		check_input(e, 1);
	});
	document.querySelector('#restaurant').addEventListener('keyup', (e) => {
		check_input(e, 2);
	});
	document.querySelector('#phone').addEventListener('keyup', (e) => {
		check_input(e, 3);
	});
	document.querySelector('#password').addEventListener('keyup', (e) => {
		check_input(e, 4);
	});
	document.querySelector('#signup-form').onsubmit = function (e) {
		e.preventDefault();
		e.stopPropagation();
		signup();
	};
};

var user = Users();