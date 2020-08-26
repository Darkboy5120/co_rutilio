<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');

if ($ci0->getCookie('provider_id')
		|| $ci0->getCookie('client_id')
	) {

	if ($ci0->getCookie('client_id') !== NULL) {
		$client_id = $ci0->getCookie('client_id');
		
		$mi0->query('
			SELECT
				Providers.id,
				Providers.restaurant,
				Providers.description,
				Providers.url,
				Favorites.restaurant_id
			FROM
				Providers
			LEFT JOIN
				(Favorites)
			ON
				(Providers.id = Favorites.restaurant_id
					AND Favorites.client_id = ?)',
			$client_id
			);
	} else {
		$mi0->query('
		SELECT
			id, restaurant, description, url
		FROM
			Providers'
		);
	}
	if ($mi0->result->num_rows > 0) {
		echo json_encode($mi0->result->fetch_all(MYSQLI_ASSOC));
	} else {
		echo 0;//generic error
	}
	$mi0->close();
}