CREATE TABLE IF NOT EXISTS `Favorites`(
	`client_id` INT UNSIGNED NOT NULL,
	`restaurant_id` INT UNSIGNED NOT NULL,
	`date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(client_id)
		REFERENCES Clients(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY(restaurant_id)
		REFERENCES Providers(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
)ENGINE=INNODB DEFAULT CHARSET=UTF8 DEFAULT COLLATE=UTF8_UNICODE_CI;
