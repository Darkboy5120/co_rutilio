<?php
class MysqlInterface {
  private $query_char = "?";
  public $link;
  public $result;
  public $log;
  
  private function conect ($sname, $uname, $pass, $dbname) {
    $this->link = new mysqli(
      $sname, $uname, $pass, $dbname
      );
    if ($this->link->connect_error) {
      throw new Exception("MysqlInterfaceError: $this->link->error");
    }
  }
  
  private function sanitize ($par) {
    $par = $this->link->real_escape_string($par);
    return $par;
  }
  
  private function parseMetaSql ($meta_sql, $sql_par) {
    $n = count($sql_par);
    $sql = "";
    for ($i = 0; $i < strlen($meta_sql); $i++) {
      if ($meta_sql[$i] == $this->query_char && $n > 0) {
        $current_par = $sql_par[count($sql_par)-$n];
        $sql = $sql . $current_par;
        $n--;
      } else {
        $sql = $sql . $meta_sql[$i];
      }
    }
    return $sql;
  }
  
  public function __construct ($sname, $uname, $pass, $dbname) {
    $this->conect(
      $sname, $uname, $pass, $dbname
      );
  }
  
  public function query ($meta_sql) {
    $sql_par = array();
    for ($i = 0; $i < func_num_args()-1; $i++) {
      $par = func_get_arg($i+1);
      $par = $this->sanitize($par);
      $par = "'" . $par . "'";
      array_push($sql_par, $par);
    }
    $sql = $this->parseMetaSql($meta_sql, $sql_par);
    $this->result = $this->link->query($sql);
    $this->log = $this->link->error;
  }
  
  public function close ($e=FALSE) {
    $this->link->close();
    if ($e === TRUE) {
      exit;
    }
  } 
}

/*
SAMPLE USE

$mi0 = new MysqlInterface(
  'localhost',
  'root',
  '',
  'test'
  );

$user_id = '1';

$mi0->query('
  SELECT
    name, age
  FROM
    Users
  WHERE
    id = ?',
  $user_id
  );
  
$row =  $mi0->result->fetch_assoc();

*/
