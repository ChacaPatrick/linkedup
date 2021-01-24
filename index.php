<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Linkedup</title>
  <meta name="description" content="The HTML5 Herald">
  <meta name="author" content="SitePoint">

  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <center>
  <img src="logo.png" alt="linkeduplogo" width="230" height="60">
  </center>
</head>

<body>
  <body style="background-color:#343a40">
  <!-- Login Form -->
  <div class="card w-50 mx-auto h-100" >
    <h1 class="card-header text-center" style="background-color: #ff781f;">Login</h1>
    <div class="card-body align-items-center form-group col-xs-3" >
    <div class="container">
    <form>
        <div class="mb-3">
          <label for="loginInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="loginInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="loginInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="loginInputPassword1">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="loginCheck1">
          <label class="form-check-label" for="loginCheck1">Remember me</label>
        </div>
        <button type="submit" id="btnLogin" class="btn btn-primary">Submit</button>
        <a href="register.php">No account? Sign up here </a>
    </form>
  </div>
    
  </div>
  </div>
  
  <script src="scripts.js"></script>

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

  <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->

  <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js"></script>

  <!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-analytics.js"></script>

  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-firestore.js"></script>

  <script src="firebase.js"></script>
  <script src="login.js"></script>



  
</body>
</html>