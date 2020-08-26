<?php
$rand_str_record = array();
function getRandStr () {
  while (1) {
  $str = '';
  for ($i = 0; $i < 10; $i++) {
    $str = $str . chr(rand(97,122));
  }
    if (!in_array($str, $GLOBALS['rand_str_record'])) break;
  }
  array_push($GLOBALS['rand_str_record'], $str);
  return $str;
}
function zeroFill ($str) {
  for ($i = 0; $i < 11-strlen($str); $i++) {
  $str = '0' . $str;
  }
  return $str;
}
function parseType ($type) {
  $r = '';
  $do = false;
  for ($i = 0; $i < strlen($type); $i++) {
  if ($do) {
    $r = $r . $type[$i];
  } else if ($type[$i] == '/') {
    $do = true;
  }
  }
  return '.' . $r;
}
function parsgetUrlType ($type) {
  $r = '';
  $do = false;
  for ($i = 0; $i < strlen($type); $i++) {
  if ($do) {
    $r = $r . $type[$i];
  } else if ($type[$i] == '/') {
    $do = true;
  }
  }
  return '.' . $r;
}