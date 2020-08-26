const Users = () => {
	var globals = {
		'tablesEl' : document.querySelector('#tables'),
		'tables' : null,
		'tableId' : null,
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
				if (data[i].name.search(filter) == -1
					&& data[i].chairs.search(filter) == -1
					&& data[i].description.search(filter) == -1) continue;
        result.push(data[i]);
      }
    }
    
    if (result.length == 0) return 0;
    else return result;
	};

	const drawTables = function () {
		const data = filter(globals.tables);
		
		if (data == 0) {
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
	              <a role="button" class="btn btn-primary" onclick="user.selectTable(\'${t_id}\');">Choose</a>
	            </div>
	          </div>
	        </div>
				`;
			}
			
			globals.tablesEl.innerHTML = html;
		}
	};

	const selectTable = async function (t_id) {
		let r0 = await setCookie('table_id', t_id);
		if (r0 == 1) {
			location = 'clientInterface_menu.php';
		}
	};

	const getTables = function () {
		fetch('assets/php/clientInterface_tables_getTables.php')
		.then(response => response.json())
		.then(response => {
			globals.tables = response;
			drawTables();
		});
	};

	getTables();

	document.querySelector('#signout').onclick = signOut;
	document.querySelector('#search').onkeyup = e => {
		globals.filter = e.target.value;
		drawTables();
	};

	return {
		selectTable : function (t_id) {
			return selectTable(t_id);
		}
	};
};

var user = Users();