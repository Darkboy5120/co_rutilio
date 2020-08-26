<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');

if ($ci0->getCookie('provider_id') !== NULL
	&& $ci0->getCookie('reservation_id') !== NULL
	&& $ci0->getCookie('client_id') !== NULL
  ) {

	$provider_id = $ci0->getCookie('provider_id');
	$reservation_id = $ci0->getCookie('reservation_id');
	$client_id = $ci0->getCookie('client_id');

	$mi0->query('
		SELECT
			id, username, email, levelpoints, phone, url
		FROM
			CLients
		WHERE
			id = ?',
		$client_id
		);
	if ($mi0->result->num_rows > 0) {
		$client = $mi0->result->fetch_assoc();
		$mi0->query('
			SELECT
				ReservationsDishes.amount,
				Dishes.name
			FROM
				ReservationsDishes
			LEFT JOIN
				(Dishes)
			ON
				(ReservationsDishes.dish_id = Dishes.id)
			WHERE
				ReservationsDishes.reservation_id = ? AND Dishes.provider_id = ?',
			$reservation_id,
			$provider_id
			);
		if ($mi0->result->num_rows == 0) {
			echo 0; $mi0->close(TRUE);
		}
		$client['dishes'] = $mi0->result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($client);
	} else {
		echo 0;
	}
	$mi0->close();
}