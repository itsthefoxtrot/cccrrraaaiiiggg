const LAST_UPDATED = 'May 2026';

const PROJECTS = [
  { title: 'Average',                                    slug: null, newTab: true,   path: 'sites/average/index.html',                               tags: ['interactive', 'tool', 'data visualisation', 'mortality', 'life expectancy', 'website'] },
  { title: 'Genesis',                                    slug: null, newTab: true,   path: 'sites/genesis/index.html',                               tags: ['game', 'idle clicker', 'browser game', 'interactive', 'website'] },
  { title: 'Fallibili',                                  slug: 'fallibili',          path: 'projects/fallibili/fallibili.html',                      tags: ['music', 'ambient', 'field recordings', 'zurich', 'switzerland', 'experimental'] },
  { title: 'Pips',                                       slug: 'pips',               path: 'projects/pips/pips.html',                                tags: ['app', 'iOS', 'design', 'sound', 'interactive', 'alarm', 'mobile'] },
  { title: 'Tardigotchi',                                slug: 'tardigotchi',        path: 'projects/tardigotchi/tardigotchi.html',                  tags: ['video', 'installation', 'interactive', 'art', 'technology', 'award'] },
  { title: 'The Last Man Standing',                      slug: 'lastmanstanding',    path: 'projects/lastmanstanding/lastmanstanding.html',          tags: ['installation', 'interactive', 'performance', 'audio-visual', 'art', 'thesis'] },
  { title: 'Your Life, Maybe',                           slug: null, newTab: true,   path: 'sites/yourlifemaybe/index.html',                         tags: ['interactive', 'tool', 'data visualisation', 'mortality', 'life expectancy', 'calendar', 'website'] },
  { title: 'Be Present. Enjoy.',                         slug: 'bepresent',          path: 'projects/bepresent/bepresent.html',                      tags: ['music', 'noise', 'experimental', 'soundscape', 'sound art', 'harsh noise'] },
  { title: 'Mercedes Benz Fashion Week Berlin Winter',   slug: 'mbfwb-winter',       path: 'projects/mbfwb-winter/mbfwb-winter.html',                tags: ['photography', 'fashion', 'berlin', 'street photography', 'commercial'] },
  { title: 'Mercedes Benz Fashion Week Berlin Spring',   slug: 'mbfwb-spring',       path: 'projects/mbfwb-spring/mbfwb-spring.html',                tags: ['photography', 'fashion', 'berlin', 'street photography', 'film photography', 'leica'] },
  { title: 'Mutuo Mural Promotional Video',              slug: 'mutuo',              path: 'projects/mutuo/mutuo.html',                              tags: ['video', 'film', 'art', 'mural', 'barcelona', 'promotional'] },
  { title: 'Lies &amp; Fabrications',                   slug: 'lies',               path: 'projects/lies/lies.html',                                tags: ['film', 'short film', 'fiction', 'wellington', '48 hour film'] },
  { title: 'Medusa',                                     slug: 'medusa',             path: 'projects/medusa/medusa.html',                            tags: ['photography', 'street photography', 'berlin', 'barcelona', 'film photography', 'leica', 'black and white'] },
  { title: 'The Blue Ones',                              slug: 'the-blue-ones',      path: 'projects/the-blue-ones/the-blue-ones.html',              tags: ['painting', 'fine art', 'acrylic', 'abstract'] },
  { title: 'Untitled',                                   slug: 'untitled',           path: 'projects/untitled/untitled.html',                        tags: ['painting', 'fine art', 'acrylic', 'abstract'] },
  { title: 'The Lanf',                                   slug: 'the-lanf',           path: 'projects/the-lanf/the-lanf.html',                        tags: ['sculpture', 'mask', 'mixed media', 'fine art', 'papier-mache'] },
  { title: 'Seabed',                                     slug: 'seabed',             path: 'projects/seabed/seabed.html',                            tags: ['music', 'ambient', 'soundscape', 'experimental', 'iceland', 'reykjavik'] },
  { title: 'The Walking Fork',                           slug: 'walking-fork',       path: 'projects/walking-fork/walking-fork.html',                tags: ['music', 'experimental', 'synthesizer', 'soundtrack', 'ost'] },
  { title: 'Start to Finish',                            slug: 'starttofinish',      path: 'projects/starttofinish/starttofinish.html',              tags: ['music', 'ambient', 'album', 'wellington', 'new zealand'] },
  { title: 'Slink to Sleep',                             slug: 'slink',              path: 'projects/slink/slink.html',                              tags: ['music', 'ambient', 'album', 'wellington', 'new zealand', 'soundtrack', 'iceland'] },
  { title: 'Field Recordings',                           slug: 'field-recordings',   path: 'projects/field-recordings/field-recordings.html',        tags: ['music', 'field recordings', 'ambient', 'sound art', 'environmental', 'acoustic ecology'] },
  { title: 'Clammy Palms, Bendy Knees &amp; Bobbly Heads', slug: 'clammy',          path: 'projects/clammy/clammy.html',                            tags: ['music', 'ambient', 'soundscape', 'wellington', 'new zealand'] },
  { title: 'Phatic Communication',                       slug: 'phatic',             path: 'projects/phatic/phatic.html',                            tags: ['installation', 'interactive', 'sound art', 'experimental', 'film festival', 'iceland'] },
  { title: 'Design Led Futures',                         slug: 'dlf',                path: 'projects/dlf/dlf.html',                                  tags: ['design', 'installation', 'architecture', 'interactive', 'futures', 'victoria university'] },
  { title: 'Graveside',                                  slug: 'graveside',          path: 'projects/graveside/graveside.html',                      tags: ['installation', 'interactive', 'performance', 'theatre', 'digital design'] },
  { title: 'I Am Derek',                                 slug: 'iamderek',           path: 'projects/iamderek/iamderek.html',                        tags: ['film', 'machinima', 'dark comedy', 'short film', 'second life', 'virtual world'] },
  { title: 'Crowds of Men',                              slug: 'crowds-of-men',      path: 'projects/Crowds%20Of%20Men/crowds-of-men.html',          tags: ['illustration', 'digital art'] },
  { title: 'The Buzzies',                                slug: 'the-buzzies',        path: 'projects/the-buzzies/the-buzzies.html',                  tags: ['illustration', 'design', 'character design', 'digital art', 'branding'] },
  { title: 'Nero Padilla',                               slug: null, newTab: true,    path: 'sites/nero/index.html',                                 tags: ['interactive', 'web', 'website'] },
  { title: 'The Church of Pizza and Next Day Reheats',   slug: null, newTab: true,    path: 'sites/churchofpizza/index.html',                         tags: ['interactive', 'web', 'food', 'website'] },
  { title: 'No Entrada',                                 slug: null, newTab: true,    path: 'sites/no_entrada/index.html',                           tags: ['interactive', 'game', 'experimental', 'browser', 'website'] },
];

class SiteSidebar extends HTMLElement {
  connectedCallback() {
    const root = this.getAttribute('root') || '.';
    const year = new Date().getFullYear();
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

    const link = (slug, href, label, external = false, newTab = false, tags = []) => {
      const active = slug && currentPage === slug ? ' nav-active' : '';
      const target = (external || newTab) ? ' target="_blank"' : '';
      const ext = (external || newTab) ? '<i class="fas fa-external-link-alt"></i> ' : '';
      const tagAttr = tags.length ? ` data-tags="${tags.join(' ')}"` : '';
      return `<a class="sidebar-link${active}" href="${href}"${target}${tagAttr}>${ext}${label}</a>`;
    };

    const projectLinks = PROJECTS.map(p => {
      const href = p.external ? p.path : `${root}/${p.path}`;
      return link(p.slug, href, p.title, p.external, p.newTab, p.tags || []);
    }).join('\n        ');

    const parent = this.parentElement;

    this.outerHTML = `
<aside class="sidebar">
  <div class="sidebar-header">
    <a href="${root}/index.html"><img class="sidebar-logo" src="${root}/images/logo.png" alt="Craig Johnson logo"></a>
    <a class="sidebar-brand" href="${root}/index.html">Craig Johnson</a>
  </div>
  <div class="sidebar-search-wrap">
    <i class="fas fa-search sidebar-search-icon"></i>
    <input class="sidebar-search" type="search" placeholder="Find a project…" aria-label="Search projects">
  </div>
  <nav class="sidebar-projects">
        ${projectLinks}
        <span class="sidebar-empty" style="display:none;">I've got nothing like that… yet.</span>
  </nav>
  <nav class="sidebar-nav">
    ${link('about',        `${root}/about.html`,        'About')}
    ${link('publications', `${root}/publications.html`, 'Publications')}
    ${link('links',        `${root}/links.html`,        'Links')}
  </nav>
  <div class="sidebar-footer">
    <a class="footer-icon" href="https://www.linkedin.com/in/craigjohnsonis/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
    <p class="p-footer">&copy; ${year} Craig Johnson</p>
    <p class="p-footer p-footer-muted">All rights reserved</p>
    <p class="p-footer p-footer-muted">Last update: ${LAST_UPDATED}</p>
    <p class="p-footer"><a href="${root}/projects/data/data.html">Data policy</a></p>
  </div>
</aside>`;

    const sidebar = parent.querySelector('aside.sidebar');

    const search  = sidebar.querySelector('.sidebar-search');
    const links   = sidebar.querySelectorAll('.sidebar-projects .sidebar-link');
    const empty   = sidebar.querySelector('.sidebar-empty');
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let anyVisible = false;
      links.forEach(a => {
        const textMatch = a.textContent.toLowerCase().includes(q);
        const tagMatch  = (a.dataset.tags || '').toLowerCase().includes(q);
        const visible   = !q || textMatch || tagMatch;
        a.style.display = visible ? '' : 'none';
        if (visible) anyVisible = true;
      });
      empty.style.display = q && !anyVisible ? '' : 'none';
    });

    const toggle = document.createElement('button');
    toggle.className = 'sidebar-toggle';
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.prepend(toggle);

    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);

    const open = () => {
      sidebar.classList.add('sidebar-open');
      backdrop.classList.add('active');
      toggle.innerHTML = '<i class="fas fa-times"></i>';
      toggle.setAttribute('aria-label', 'Close navigation');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      sidebar.classList.remove('sidebar-open');
      backdrop.classList.remove('active');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
      toggle.setAttribute('aria-label', 'Open navigation');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => sidebar.classList.contains('sidebar-open') ? close() : open());
    backdrop.addEventListener('click', close);
  }
}

customElements.define('site-sidebar', SiteSidebar);
