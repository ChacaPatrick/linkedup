<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Linkedup - Friends</title>
  <link rel = "icon" href = "title.png"> 

  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<?php
include 'nav.php'; 
?>  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

   <script src="scripts.js"></script>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="friend.js"></script>
    <script src="friend_list.js"> </script>
    
</head>

<body>
  <div class="split left">
  <div class="container">
    <p class="h1 text-center" style="color: white; margin-bottom:10%"><strong>Link up with Friends </strong></p>
    <input id="myInput" class="form-control" type="search" placeholder="Search..">
  </div>
  
  <div class="container text-center">
  <ul class="list-group" style="list-style-type:none;" id="left"></ul>
  </div>
</div>


<div class="split right" >
<div class="container">
  <p class="h1 text-center"><strong>Friends </strong></p>
</div>

  <div class="container text-center" id="right">
  </div>
</div>
 
</body>
</html>