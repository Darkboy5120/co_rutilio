<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');
require_once('../php/global_uploadFilesFunctions.php');

if ($ci0->getCookie('client_id') !== NULL
  && isset($_POST['username'])
  && isset($_POST['phone'])
  ) {

  $client_id = $ci0->getCookie('client_id');
  $username = $_POST['username'];
  $phone = $_POST['phone'];

  if (isset($_FILES[('image')])) {
    $valid_files = array('image/jpeg', 'image/png', 'image/jpg'); 
    $filefolder = '../files/clients_images/';
  
    //files type validation
    $filetype= $_FILES[('image')]['type'];
    if (!in_array($filetype, $valid_files)) {
      echo -1; exit;//invalid file type error
    }
  }

  //check if the table name already exists
  $mi0->query('
    SELECT id FROM Clients
    WHERE (username = ? OR phone = ?) AND id <> ?',
    $username,
    $phone,
    $client_id
    );
  if ($mi0->result->num_rows > 0) {
    echo -2; $mi0->close(TRUE);//username nor phone already exists error
  }

  //get old url
  $mi0->query('
    SELECT url FROM Clients
    WHERE id = ?',
    $client_id
    );
  $url = $mi0->result->fetch_assoc()['url'];

  //insert table data
  $mi0->query('
    UPDATE Clients
    SET username = ?, phone = ?
    WHERE id = ?',
    $username,
    $phone,
    $client_id
    );
  if ($mi0->result === TRUE) {

    if (isset($_FILES[('image')])) {
      //we update the image type and delete old url
      if ($url != NULL) {
        unlink($url);
      }
       
      $filename = getRandStr();
      $filetype = $_FILES[('image')]['type'];
      $new_url = $filefolder . $filename . parseType($filetype);

      //insert data of file in database
      $mi0->query('
        UPDATE Clients
        SET url = ?
        WHERE id = ?',
        $new_url,
        $client_id
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