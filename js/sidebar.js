const LAST_UPDATED = '05/2026';

const PROJECTS = [
  { title: 'Pips',                                         slug: 'pips',             path: 'projects/pips/pips.html' },
  { title: 'Tardigotchi',                                slug: 'tardigotchi',      path: 'projects/tardigotchi/tardigotchi.html' },
  { title: 'The Last Man Standing',                      slug: 'lastmanstanding',  path: 'projects/lastmanstanding/lastmanstanding.html' },
  { title: 'Be Present. Enjoy.',                         slug: 'bepresent',        path: 'projects/bepresent/bepresent.html' },
  { title: 'Mercedes Benz Fashion Week Berlin Winter',   slug: 'mbfwb-winter',     path: 'projects/mbfwb-winter/mbfwb-winter.html' },
  { title: 'Mercedes Benz Fashion Week Berlin Spring',   slug: 'mbfwb-spring',     path: 'projects/mbfwb-spring/mbfwb-spring.html' },
  { title: 'Mutuo Mural Promotional Video',              slug: 'mutuo',            path: 'projects/mutuo/mutuo.html' },
  { title: 'Lies &amp; Fabrications',                   slug: 'lies',             path: 'projects/lies/lies.html' },
  { title: 'Medusa',                                     slug: 'medusa',           path: 'projects/medusa/medusa.html' },
  { title: 'The Blue Ones',                              slug: 'the-blue-ones',    path: 'projects/the-blue-ones/the-blue-ones.html' },
  { title: 'Untitled',                                   slug: 'untitled',         path: 'projects/untitled/untitled.html' },
  { title: 'The Lanf',                                   slug: 'the-lanf',         path: 'projects/the-lanf/the-lanf.html' },
  { title: 'Seabed',                                     slug: 'seabed',           path: 'projects/seabed/seabed.html' },
  { title: 'The Walking Fork OST',                       slug: 'walking-fork',     path: 'projects/walking-fork/walking-fork.html' },
  { title: 'Start to Finish',                            slug: 'starttofinish',    path: 'projects/starttofinish/starttofinish.html' },
  { title: 'Slink to Sleep',                             slug: 'slink',            path: 'projects/slink/slink.html' },
  { title: 'Field Recordings',                           slug: 'field-recordings', path: 'projects/field-recordings/field-recordings.html' },
  { title: 'Clammy Palms, Bendy Knees &amp; Bobbly Heads', slug: 'clammy',        path: 'projects/clammy/clammy.html' },
  { title: 'Phatic Communication',                       slug: 'phatic',           path: 'projects/phatic/phatic.html' },
  { title: 'Design Led Futures',                         slug: 'dlf',              path: 'projects/dlf/dlf.html' },
  { title: 'Graveside',                                  slug: 'graveside',        path: 'projects/graveside/graveside.html' },
  { title: 'I Am Derek',                                 slug: 'iamderek',         path: 'projects/iamderek/iamderek.html' },
  { title: 'Crowds of Men',                              slug: 'crowds-of-men',    path: 'projects/Crowds%20Of%20Men/crowds-of-men.html' },
  { title: 'The Buzzies',                                slug: 'the-buzzies',      path: 'projects/the-buzzies/the-buzzies.html' },
  { title: 'Genesis',                                    slug: null, newTab: true,   path: 'sites/genesis/index.html' },
  { title: 'Nero Padilla',                               slug: null, external: true, path: 'https://www.cccrrraaaiiiggg.com/sites/nero/index.html' },
  { title: 'The Church of Pizza and Next Day Reheats',   slug: null, external: true, path: 'https://cccrrraaaiiiggg.com/sites/churchofpizza/index.html' },
  { title: 'No Entrada',                                 slug: null, newTab: true,   path: 'sites/no_entrada/index.html' },
];

class SiteSidebar extends HTMLElement {
  connectedCallback() {
    const root = this.getAttribute('root') || '.';
    const year = new Date().getFullYear();
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

    const link = (slug, href, label, external = false, newTab = false) => {
      const active = slug && currentPage === slug ? ' nav-active' : '';
      const target = (external || newTab) ? ' target="_blank"' : '';
      const ext = (external || newTab) ? '<i class="fas fa-external-link-alt"></i> ' : '';
      return `<a class="sidebar-link${active}" href="${href}"${target}>${ext}${label}</a>`;
    };

    const projectLinks = PROJECTS.map(p => {
      const href = p.external ? p.path : `${root}/${p.path}`;
      return link(p.slug, href, p.title, p.external, p.newTab);
    }).join('\n        ');

    const parent = this.parentElement;

    this.outerHTML = `
<aside class="sidebar">
  <div class="sidebar-header">
    <a href="${root}/index.html"><img class="sidebar-logo" src="${root}/images/logo.png" alt="Craig Johnson logo"></a>
    <a class="sidebar-brand" href="${root}/index.html">Craig Johnson</a>
  </div>
  <p class="sidebar-section-label">Selected works</p>
  <nav class="sidebar-projects">
        ${projectLinks}
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
