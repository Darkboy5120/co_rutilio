<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');

if ($ci0->getCookie('client_id') !== NULL
	) {

	$client_id = $ci0->getCookie('client_id');
	
	$mi0->query('
		SELECT
			Reservations.id,
			Reservations.meeting,
			Reservations.date,
			Tables.name as table_name,
			Tables.description as table_desc,
			Tables.chairs,
			Providers.restaurant,
			Providers.url
		FROM
			Reservations
		LEFT JOIN
			(Tables, Providers)
		ON
			(Reservations.table_id = Tables.id
				AND Tables.provider_id = Providers.id)
		WHERE
			Reservations.client_id = ?',
		$client_id
		);
	if ($mi0->result->num_rows > 0) {
		$reservations = $mi0->result->fetch_all(MYSQLI_ASSOC);
		for ($i = 0; $i < count($reservations); $i++) {
			$mi0->query('
				SELECT
					ReservationsDishes.amount,
					Dishes.name
				FROM
					ReservationsDishes
				LEFT JOIN
					Dishes
				ON
					(ReservationsDishes.dish_id = Dishes.id)
				WHERE
					ReservationsDishes.reservation_id = ?',
					$reservations[$i]['id']
				);
			if ($mi0->result->num_rows == 0) {
				echo 0; $mi0->close(TRUE);
			}
			$dishes = $mi0->result->fetch_all(MYSQLI_ASSOC);
			$reservations[$i]['dishes'] = $dishes;
		}
		echo json_encode($reservations);
	} else {
		echo 0;//generic error
	}
	$mi0->close();
}