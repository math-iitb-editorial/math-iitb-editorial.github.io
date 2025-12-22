(function () {
  const year = new Date().getFullYear();
  const footer = `
    <footer class="py-4 mt-5">
      <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div>
            <small>
                © <strong>Nilabha Saha</strong> <span id="year">${year}</span>.
                Content licensed under
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="link-light">
                    CC BY-NC-SA 4.0
                </a>.
            </small>
        </div>
        <div class="d-flex align-items-center gap-3">
          <a class="link-light link-underline-opacity-0" href="/articles.html"><i class="bi bi-journal-text me-1"></i>Articles</a>
          <a class="link-light link-underline-opacity-0" href="/team.html"><i class="bi bi-people me-1"></i>Team</a>
          <a class="link-light link-underline-opacity-0" href="mailto:math.iitb.editorial@gmail.com"><i class="bi bi-envelope me-1"></i>Contact</a>
          <a class="link-light link-underline-opacity-0" href="#"><i class="bi bi-arrow-up-circle"></i></a>
        </div>
      </div>
    </footer>
  `;
  const mount = document.getElementById('site-footer');
  if (mount) mount.innerHTML = footer;
})();
