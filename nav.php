<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <a class="navbar-brand" href="home.php"><img src="logo.png" alt="logo"> </img></a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="edit.php">Edit <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="friend.php">Friends</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="logout" href="#">Logout</a>
      </li>
    </ul>
  </div>
</nav>
<!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->

  <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js"></script>

  <!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-analytics.js"></script>

  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-firestore.js"></script>
<script src="firebase.js"></script>
<script src="nav.js"></script>