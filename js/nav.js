class SiteNav extends HTMLElement {
  connectedCallback() {
    const root = this.getAttribute('root') || '.';
    this.outerHTML = `
  <section id="navigation">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="${root}/index.html">Craig Johnson</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav ml-auto">
            <li class="navbar-item"><a class="nav-link" href="${root}/index.html#bio-text">About</a></li>
            <li class="navbar-item"><a class="nav-link" href="${root}/index.html#projects">Works</a></li>
            <li class="navbar-item"><a class="nav-link" href="${root}/index.html#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </section>`;
  }
}

customElements.define('site-nav', SiteNav);
