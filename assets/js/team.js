(async function(){
  const yearEl = document.getElementById('team-year');
  const currentWrap = document.getElementById('current-team-cards');
  const prevWrap = document.getElementById('previous-teams-wrapper');
  if (!currentWrap || !prevWrap) return;

  try {
    const idx = await (await fetch('/data/teams/index.json', { cache: 'no-store' })).json();
    const currentYear = idx.current_year;
    const years = Array.from(new Set(idx.years || []));

    // Render CURRENT TEAM
    if (yearEl) yearEl.textContent = currentYear;
    const currentData = await (await fetch(`/data/teams/${currentYear}.json`, { cache: 'no-store' })).json();
    const currentCards = renderTeamYear(currentData, true);
    currentWrap.innerHTML = currentCards;

    // Render PREVIOUS TEAMS (grouped by year, newest → oldest)
    const previousYears = years.filter(y => y !== currentYear)
      .sort((a,b) => parseInt(b.slice(0,4)) - parseInt(a.slice(0,4)));

    if (previousYears.length === 0) {
      prevWrap.innerHTML = `<p class="text-muted">No previous teams yet.</p>`;
    } else {
      prevWrap.innerHTML = previousYears.map(async y => {
        const yData = await (await fetch(`/data/teams/${y}.json`, { cache: 'no-store' })).json();
        return `
          <div class="mb-4">
            <h3 class="h5 mb-3">${y}</h3>
            <div class="row g-4">${renderTeamYear(yData, false)}</div>
          </div>
        `;
      }).length ? (await Promise.all(previousYears.map(async y => {
        const yData = await (await fetch(`/data/teams/${y}.json`)).json();
        return `
          <div class="mb-4">
            <h3 class="h5 mb-3">${y}</h3>
            <div class="row g-4">${renderTeamYear(yData, false)}</div>
          </div>
        `;
      }))).join('') : '';
    }
  } catch (e) {
    currentWrap.innerHTML = `<div class="alert alert-warning">Could not load team data.</div>`;
    console.error(e);
  }

  function personCard(p, roleLabel){
    const img = p.photo ? `<img src="${p.photo}" class="card-img-top" alt="${p.alt || p.name}">` : '';
    const email = p.email ? `<div class="mb-1"><i class="bi bi-envelope"></i> <a href="mailto:${p.email}" class="link-light">${p.email}</a></div>` : '';
    const phone = p.phone ? `<div><i class="bi bi-telephone"></i> ${p.phone}</div>` : '';

    return `
      <div class="col-sm-6 col-lg-4">
        <div class="card card-custom h-100">
          ${img}
          <div class="card-body">
            <span class="badge text-bg-info mb-2">${roleLabel}</span>
            <h3 class="h5 mb-1">${p.name}</h3>
            ${p.title ? `<p class="text-muted small mb-2">${p.title}</p>` : ''}
            <div class="small">
              ${email || ''}
              ${phone || ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTeamYear(data, isCurrent){
    const dgsec = data.department_general_secretary ? personCard(data.department_general_secretary, 'Department General Secretary') : '';
    const chief = data.chief_editor ? personCard(data.chief_editor, 'Chief Editor') : '';
    const editors = (data.editors || []).map(e => personCard(e, 'Editor')).join('');
    // For current team, keep chief first; previous years can be compact
    return `${dgsec}${chief}${editors}`;
  }
})();
