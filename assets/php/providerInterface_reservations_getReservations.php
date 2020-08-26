<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');

if ($ci0->getCookie('provider_id') !== NULL
	) {

	$provider_id = $ci0->getCookie('provider_id');
	
	$mi0->query('
		SELECT
			Reservations.id,
			Reservations.meeting,
			Reservations.date,
			Tables.name as table_name,
			Tables.description as table_desc,
			Tables.chairs,
			Clients.id as client_id,
			Clients.username
		FROM
			Reservations
		LEFT JOIN
			(Tables, Providers, Clients)
		ON
			(Reservations.table_id = Tables.id
				AND Tables.provider_id = Providers.id
				AND Clients.id = Reservations.client_id)
		WHERE
			Providers.id = ?',
		$provider_id
		);
	if ($mi0->result->num_rows > 0) {
		echo json_encode($mi0->result->fetch_all(MYSQLI_ASSOC));
	} else {
		echo 0;//generic error
	}
	$mi0->close();
}