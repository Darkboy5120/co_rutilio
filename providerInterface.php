<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/clientInterface.css">

    <title>TimeToFood | Reservations</title>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="index.php">TimeToFood</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link active" href="providerInterface.php">Reservations <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="providerInterface_tables.php">Tables</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="providerInterface_menu.php">Food menu</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="providerInterface_profile.php">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="provider_signin.php">Log out</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-3">
      <div class="row">
        <div class="col mt-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">Big table</h6>
              <p class="card-text">Has 19 chairs and good display to see televition.</p>
              <div class="row" style="height: 2em;">
                <div class="col"><small class="text-muted">To 10/12/2020</small></div>
                <div class="col"><a role="button" href="providerInterface_reservations.php" class="btn btn-primary btn-sm btn-block">Check</a></div>
              </div>
            </div>
            <div class="card-footer">
              <small class="text-muted">3 mins ago by Rutilio</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="https://use.fontawesome.com/0a71ea5010.js"></script>
  </body>
</html>