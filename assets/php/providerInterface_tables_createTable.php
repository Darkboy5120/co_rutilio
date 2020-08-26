<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');
require_once('../php/global_uploadFilesFunctions.php');

if ($ci0->getCookie('provider_id') !== NULL
  && isset($_POST['name'])
  && isset($_POST['description'])
  && isset($_POST['chairs'])
  && isset($_POST['available'])
  ) {

  $provider_id = $ci0->getCookie('provider_id');
  $name = $_POST['name'];
  $description = $_POST['description'];
  $chairs = $_POST['chairs'];
  $available = $_POST['available'];

  $valid_files = array('image/jpeg', 'image/png', 'image/jpg'); 
  $filefolder = '../files/tables_images/';
  
  //files type validation
  $filetype= $_FILES[('image')]['type'];
  if (!in_array($filetype, $valid_files)) {
    echo -1; exit;//invalid file type error
  }

  //check if table name already exists
  $mi0->query('
    SELECT id FROM Tables
    WHERE name = ?',
    $name
    );
  if ($mi0->result->num_rows > 0) {
    echo -2; $mi0->close(TRUE);//name already exists error
  }

  $filename = getRandStr();
  $filetype = $_FILES[('image')]['type'];
  $url = $filefolder . $filename . parseType($filetype);

  //insert table data
  $mi0->query('
    INSERT INTO Tables (provider_id, name, description, chairs, available, url)
    VALUES (?, ?, ?, ?, ?, ?)',
    $provider_id,
    $name,
    $description,
    $chairs,
    $available,
    $url
    );
  if ($mi0->result === TRUE) {
    //get id of the table we have just post
    $mi0->query('
      SELECT id FROM Tables
      WHERE provider_id = ?
      ORDER BY id DESC
      LIMIT 1',
      $provider_id
      );
    if ($mi0->result->num_rows == 0) {
      echo 0; $mi0->close(TRUE);//generic error
    }
    $last_table_id = $mi0->result->fetch_assoc()['id'];
      
    //here we move the file from the client to server
    $initial_dir = $_FILES[('image')]['tmp_name'];
    $final_dir = $filefolder . $filename . parseType($filetype);
    if(!move_uploaded_file($initial_dir, $final_dir)) {
      echo -3; $mi0->close(TRUE);//move file error
    }

    echo 1;
  } else {
    echo 0;//generic error
  }
  $mi0->close(TRUE);
}