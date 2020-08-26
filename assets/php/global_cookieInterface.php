<?php
class CookieInterface {
  public function setCookie ($cookieName, $cookieValue) {
    //session_start();
    $_SESSION[$cookieName] = $cookieValue;
  }
  public function getCookie ($cookieName) {
    return (isset($_SESSION[$cookieName])) ? $_SESSION[$cookieName] : NULL;
  }
  public function destroy () {
    if (ini_get('session.use_cookies')) {
	  $params = session_get_cookie_params();
	  setcookie(session_name(), '', time() - 42000,
	    $params['path'], $params['domain'],
	    $params['secure'], $params['httponly']
        );
    }
    session_destroy();
  }
  public function __construct () {
    session_start([
      'cookie_lifetime' => 86400
    ]);
  }
}

$ci0 = new CookieInterface();
