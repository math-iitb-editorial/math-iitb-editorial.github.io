(function () {
  const nav = `
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
      <div class="container">
        <a class="navbar-brand fw-semibold" href="/">IITB Math Editorial</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/articles.html">Articles</a></li>
            <li class="nav-item"><a class="nav-link" href="/team.html">Team</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;
  const mount = document.getElementById('site-nav');
  if (mount) mount.innerHTML = nav;

  // Active link highlighting
  const path = location.pathname;
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();
