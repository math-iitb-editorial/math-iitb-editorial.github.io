(async function(){
  const container = document.getElementById('articles-list');
  if (!container) return;

  try {
    const res = await fetch('/data/articles.json', { cache: 'no-store' });
    const articles = await res.json();

    // newest → oldest
    articles.sort((a,b) => new Date(b.date) - new Date(a.date));

    const cards = articles.map(a => `
      <div class="col-md-6 col-lg-4">
        <div class="card card-custom h-100">
          ${a.thumbnail ? `<img src="${a.thumbnail}" class="card-img-top" alt="${a.thumb_alt || a.title}">` : ''}
          <div class="card-body d-flex flex-column">
            <h3 class="h5"><a class="stretched-link text-decoration-none" href="/article/${a.slug}/">${a.title}</a></h3>
            <p class="text-muted small mb-2">${new Date(a.date).toLocaleDateString()}</p>
            <p class="mb-0">${a.summary}</p>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = cards || `<p class="text-muted">No articles yet. Check back soon.</p>`;
  } catch (e) {
    container.innerHTML = `<div class="alert alert-warning">Could not load articles.</div>`;
    console.error(e);
  }
})();
