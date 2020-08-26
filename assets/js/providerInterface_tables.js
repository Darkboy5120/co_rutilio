const Users = () => {
	var globals = {
		'tablesEl' : document.querySelector('#tables'),
		'tables' : null,
		'filter' : null,
		'tableId' : null
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
					&& data[i].chairs.search(filter) == -1) continue;
        result.push(data[i]);
      }
    }
    
    if (result.length == 0) return 0;
    else return result;
	};

	const fillTableModal = function (table_id) {
		const tables = globals.tables;
		for (var i in tables) {
			if (tables[i].id == table_id) {
				document.querySelector('#mt-name').value = tables[i].name;
				document.querySelector('#mt-description').value = tables[i].description;
				document.querySelector('#mt-chairs').value = tables[i].chairs;
				document.querySelector('#mt-unavailable').value = parseInt(tables[i].available, 10);
				document.querySelector('#mt-available').value = !parseInt(tables[i].available, 10);
				return;
			}
		}
	};

	const drawTables = function () {
		const data = filter(globals.tables);
		
		if (data.length == 0 || data == 0) {
			globals.tablesEl.innerHTML = `
				<p>Did not find tables</p>
			`;
		} else {
			var html = '';
			
			for (var i in data) {
				const t_id = data[i].id;
				const t_name = data[i].name;
				const t_desc = data[i].description;
				const t_chairs = data[i].chairs;
				const t_available = data[i].available;
				const t_url = 'assets' + data[i].url.slice(2);
				const t_date = data[i].date;

				const t_available_txt = (t_available == 1)
					? '<b class="text-success">Free</b>'
					: '<b class="text-danger">Reserved</b>';

				html += `
					<div class="col mt-3">
	          <div class="card" style="width: 18rem;">
	            <img src="${t_url}" class="card-img-top" alt="...">
	            <div class="card-body">
	              <h5 class="card-title">${t_name}</h5>
	              <p class="card-text">${t_desc}</p>
	              <div class="d-flex align-items-center justify-content-between">
	                <b>${t_chairs} chairs</b>
	                ${t_available_txt}
	              </div>
	              <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary" onclick="user.changeTableModal(\'${t_id}\');">
                      <i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger" onclick="user.deleteTableModal(\'${t_id}\');">
                      <i class="fas fa-trash"></i></button>
                  </div>
                </div>
	            </div>
	          </div>
	        </div>
				`;
			}
			
			globals.tablesEl.innerHTML = html;
		}
	};

	const createTable = function () {
		const log = [
			'Could not create the table',
			'Table created succefully',
			'Invalid file type',
			'That table already exists'
			];
		var submit_button = document.querySelector('#ct-create');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const name = document.querySelector('#ct-name').value;
		const desc = document.querySelector('#ct-description').value;
		const image = document.querySelector('#ct-image').files[0];
		const chairs = document.querySelector('#ct-chairs').value;
		const available = (document.querySelector('#ct-available').checked)
			? 1
			: 0;
		
		const validation = !(!name || !desc || !chairs || !desc);
		if (!validation) return;
		
		var formData = new FormData();
		formData.append('name', name);
		formData.append('description', desc);
		formData.append('image', image);
		formData.append('chairs', chairs);
		formData.append('available', available);
		
		fetch('assets/php/providerInterface_tables_createTable.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
			$('#ct').modal('hide');
			submit_button.innerHTML = default_text;
			
			if (response == 1) {
				alertify.notify(log[1], 'success', 5);
				window.setTimeout(() => {
					getTables();
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

	const changeTableModal = function (table_id) {
		$('#mt').modal('show');
		globals.tableId = table_id;
		fillTableModal(table_id);
	};
	
	const changeTable = function () {
		const log = [
			'Could not create the table',
			'Table created succefully',
			'Invalid file type',
			'That table already exists'
			];
		var submit_button = document.querySelector('#mt-modify');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const id = globals.tableId;
		const name = document.querySelector('#mt-name').value;
		const desc = document.querySelector('#mt-description').value;
		const image = document.querySelector('#mt-image').files[0];
		const chairs = document.querySelector('#mt-chairs').value;
		const available = (document.querySelector('#mt-available').checked)
			? '1'
			: '0';
		
		const validation = !(!id || !desc || !chairs || !available);
		if (!validation) return;

		var formData = new FormData();
		formData.append('id', id);
		formData.append('name', name);
		formData.append('description', desc);
		formData.append('chairs', chairs);
		formData.append('available', available);
		if (image) formData.append('image', image);
		
		fetch('assets/php/providerInterface_tables_changeTable.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
			$('#mt').modal('hide');
			submit_button.innerHTML = default_text;
			
			if (response == 1) {
				alertify.notify(log[1], 'success', 5);
				window.setTimeout(() => {
					getTables();
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

	const deleteTableModal = function (table_id) {
		$('#dt').modal('show');
		globals.tableId = table_id;
	};
	
	const deleteTable = function () {
		const log = [
			'Could not delete the table',
			'Table deleted succefully'
			];
		var submit_button = document.querySelector('#dt-delete');
		const default_text = submit_button.innerHTML;
		
		submit_button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
		
		const id = globals.tableId;
		
		const validation = !(!id);
		if (!validation) return;

		var formData = new FormData();
		formData.append('id', id);
		
		fetch('assets/php/providerInterface_tables_deleteTable.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.json())
		.then(response => {
			$('#dt').modal('hide');
			submit_button.innerHTML = default_text;
			
			if (response == 1) {
				alertify.notify(log[1], 'success', 5);
				window.setTimeout(() => {
					getTables();
				}, 1000);
			} else {
				alertify.notify(log[0], 'error', 5);
			}
		});
	};

	const getTables = function () {
		fetch('assets/php/global_getTables.php')
		.then(response => response.json())
		.then(response => {
			globals.tables = response;
			drawTables();
		});
	};

	getTables();

	window.onclick = function (e) {
		var current = e.target;
		if (current.tagName == 'INPUT' && current.getAttribute('type') == 'radio') {
			current.parentNode.parentNode.querySelectorAll('input').forEach(e => {
				e.checked = (e.id == current.id) ? true : false;
			});
		}
	};

	$('#ct').on('shown.bs.modal', function () {
	  $('#ct-name').trigger('focus');
	});
	$('#mt').on('shown.bs.modal', function () {
	  $('#mt-name').trigger('focus');
	});

	document.querySelector('#signout').onclick = signOut;
	document.querySelector('#ct-create').onclick = function () {
		document.querySelector('#fake-ct-create').click();
	};
	document.querySelector('#ct-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		createTable();
	};
	document.querySelector('#mt-modify').onclick = function () {
		document.querySelector('#fake-mt-modify').click();
	};
	document.querySelector('#mt-form').onsubmit = function (e) {
		e.preventDefault(); e.stopPropagation();
		changeTable();
	};
	document.querySelector('#dt-delete').onclick = function () {
		deleteTable();
	};
	document.querySelector('#search').onkeyup = e => {
		globals.filter = e.target.value;
		drawTables();
	};

	return {
		changeTableModal : function (table_id) {
			return changeTableModal(table_id);
		},
		deleteTableModal : function (table_id) {
			return deleteTableModal(table_id);
		}
	};
};

var user = Users();