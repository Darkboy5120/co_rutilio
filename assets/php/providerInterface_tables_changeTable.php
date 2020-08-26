<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');
require_once('../php/global_uploadFilesFunctions.php');

if ($ci0->getCookie('provider_id') !== NULL
  && isset($_POST['id'])
  && isset($_POST['name'])
  && isset($_POST['description'])
  && isset($_POST['chairs'])
  && isset($_POST['available'])
  ) {

  $provider_id = $ci0->getCookie('provider_id');
  $table_id = $_POST['id'];
  $name = $_POST['name'];
  $description = $_POST['description'];
  $chairs = $_POST['chairs'];
  $available = $_POST['available'];

  if (isset($_FILES[('image')])) {
    $valid_files = array('image/jpeg', 'image/png', 'image/jpg'); 
    $filefolder = '../files/tables_images/';
  
    //files type validation
    $filetype= $_FILES[('image')]['type'];
    if (!in_array($filetype, $valid_files)) {
      echo -1; exit;//invalid file type error
    }
  }

  //check if the table name already exists
  $mi0->query('
    SELECT id FROM Tables
    WHERE name = ? AND id <> ?',
    $name,
    $table_id
    );
  if ($mi0->result->num_rows > 0) {
    echo -2; $mi0->close(TRUE);//name already exists error
  }

  //get old url
  $mi0->query('
    SELECT url FROM Tables
    WHERE id = ?',
    $table_id
    );
  $url = $mi0->result->fetch_assoc()['url'];

  //insert table data
  $mi0->query('
    UPDATE Tables
    SET name = ?, description = ?, chairs = ?, available = ?
    WHERE id = ?',
    $name,
    $description,
    $chairs,
    $available,
    $table_id
    );
  if ($mi0->result === TRUE) {

    if (isset($_FILES[('image')])) {
      //we update the image type and delete old url
      unlink($url);
       
      $filename = getRandStr();
      $filetype = $_FILES[('image')]['type'];
      $new_url = $filefolder . $filename . parseType($filetype);

      //insert data of file in database
      $mi0->query('
        UPDATE Tables
        SET url = ?
        WHERE url = ?',
        $new_url,
        $url
      );
      if ($mi0->result !== TRUE) {
        echo -3; $mi0->close(TRUE);//insert error
      }

      //here we move the file from the client to server
      $initial_dir = $_FILES[('image')]['tmp_name'];
      $final_dir = $new_url;
      if(!move_uploaded_file($initial_dir, $final_dir)) {
        echo -4; $mi0->close(TRUE);//move file error
      }
    }

    echo 1;
  } else {
    echo 0;//generic error
  }
  $mi0->close(TRUE);
}