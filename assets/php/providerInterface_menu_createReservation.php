<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');

if ($ci0->getCookie('client_id')
		&& $ci0->getCookie('restaurant_id')
		&& $ci0->getCookie('table_id')
		&& isset($_POST['order'])
		&& isset($_POST['date'])
	) {

	$client_id = $ci0->getCookie('client_id');
	$restaurant_id = $ci0->getCookie('restaurant_id');
	$table_id = $ci0->getCookie('table_id');
	$order = json_decode($_POST['order']);
	$meeting = $_POST['date'];
	$available = '0';

	//check if the table it is available
	$mi0->query('
		SELECT id FROM Tables
		WHERE id = ? AND available = ?',
		$table_id,
		$available
		);
	if ($mi0->result->num_rows > 0) {
		echo -1; $mi0->close(TRUE);
	}

	//check if the dishes are available
	foreach ($order as $dish_id => $amount) {
		$mi0->query('
			SELECT id FROM Dishes
			WHERE id = ? AND available = ?',
			$dish_id,
			$available
			);
		if ($mi0->result->num_rows > 0) {
			echo -2; $mi0->close(TRUE);
		}
	}

	$mi0->query('
		INSERT INTO Reservations (client_id, table_id, meeting)
		VALUES (?, ?, ?)',
		$client_id,
		$table_id,
		$meeting
		);
	if ($mi0->result !== TRUE) {
		echo 0; $mi0->close(TRUE);
	}

	$mi0->query('
		SELECT id FROM Reservations
		WHERE client_id = ?
		ORDER BY id DESC
		LIMIT 1',
		$client_id
		);
	if ($mi0->result->num_rows == 0) {
		echo 0; $mi0->close(TRUE);
	}
	$last_reservation_id = $mi0->result->fetch_assoc()['id'];

	foreach ($order as $dish_id => $amount) {
		$mi0->query('
			SELECT price FROM Dishes
			WHERE id = ? AND available <> ?',
			$dish_id,
			$available
			);
		if ($mi0->result->num_rows == 0) {
			echo -2; $mi0->close(TRUE);
		}
		$dish_price = $mi0->result->fetch_assoc()['price'];
		$total = intval($dish_price) * intval($amount);

 		$mi0->query('
 			INSERT INTO ReservationsDishes (reservation_id, dish_id, amount, total)
 			VALUES (?, ?, ?, ?)',
 			$last_reservation_id,
 			$dish_id,
 			$amount,
 			$total
 			);
 		if ($mi0->result !== TRUE) {
 			echo 0; $mi0->close(TRUE);
 		}
	}
	echo 1;
	
	$mi0->close();
}