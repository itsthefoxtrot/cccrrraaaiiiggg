const LAST_UPDATED = '05/2026';

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const root = this.getAttribute('root') || '.';
    const year = new Date().getFullYear();
    this.outerHTML = `
  <footer class="footer">
    <div class="container-fluid footer-links">
      <a class="footer-icon" href="https://www.linkedin.com/in/craigjohnsonis/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
      <p class="p-footer">Copyright <i class="far fa-copyright"></i> ${year} Craig Johnson. All rights reserved.</p>
      <p class="p-footer">Last update: ${LAST_UPDATED}. <a href="${root}/projects/data/data.html">Data policy</a>.</p>
    </div>
  </footer>`;
  }
}

customElements.define('site-footer', SiteFooter);
