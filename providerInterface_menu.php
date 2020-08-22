<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/clientInterface.css">

    <title>TimeToFood | Menu</title>
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
            <a class="nav-link" href="providerInterface.php">Reservations <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="providerInterface_tables.php">Tables</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="providerInterface_menu.php">Food menu</a>
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
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#cd">New dish</button>
          </div>
          <input type="text" class="form-control" style="max-width: 20em;" id="exampleInputSearch1" placeholder="Search">
        </div>
      </div>
      <div class="row">
        <div class="col mt-3">
          <div class="card" style="width: 18rem;">
            <img src="assets/files/img/menu1.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Res steak</h5>
              <p class="card-text">Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold.</p>
              <div class="d-flex justify-content-between align-items-center">
                <b>$19</b>
                <b class="text-success">Available</b>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#md">
                      <i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#dd">
                      <i class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col mt-3">
          <div class="card" style="width: 18rem;">
            <img src="assets/files/img/menu1.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Res steak</h5>
              <p class="card-text">Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold.</p>
              <div class="d-flex justify-content-between align-items-center">
                <b>$19</b>
                <b class="text-success">Available</b>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#md">
                      <i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#dd">
                      <i class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col mt-3">
          <div class="card" style="width: 18rem;">
            <img src="assets/files/img/menu1.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Res steak</h5>
              <p class="card-text">Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold.</p>
              <div class="d-flex justify-content-between align-items-center">
                <b>$19</b>
                <b class="text-success">Available</b>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#md">
                      <i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#dd">
                      <i class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col mt-3">
          <div class="card" style="width: 18rem;">
            <img src="assets/files/img/menu1.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Res steak</h5>
              <p class="card-text">Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold.</p>
              <div class="d-flex justify-content-between align-items-center">
                <b>$19</b>
                <b class="text-success">Available</b>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#md">
                      <i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#dd">
                      <i class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col mt-3">
          <div class="card" style="width: 18rem;">
            <img src="assets/files/img/menu1.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Res steak</h5>
              <p class="card-text">Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold.</p>
              <div class="d-flex justify-content-between align-items-center">
                <b>$19</b>
                <b class="text-success">Available</b>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#md">
                      <i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#dd">
                      <i class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col mt-3">
          <div class="card" style="width: 18rem;">
            <img src="assets/files/img/menu1.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Res steak</h5>
              <p class="card-text">Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold.</p>
              <div class="d-flex justify-content-between align-items-center">
                <b>$19</b>
                <b class="text-success">Available</b>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#md">
                      <i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#dd">
                      <i class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal template -->
    <div id="modal-template">
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <!-- Font awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <script src="assets/js/providerInterface_menu_modalTemplate.js"></script>
    <script src="assets/js/providerInterface_menu.js"></script>
  </body>
</html>