document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.main-content img'));
  if (!images.length) return;

  let current = 0;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-btn lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-btn lightbox-prev" aria-label="Previous">&#8592;</button>
    <img class="lightbox-img" src="" alt="">
    <button class="lightbox-btn lightbox-next" aria-label="Next">&#8594;</button>
    <div class="lightbox-counter"></div>
  `;
  document.body.appendChild(lb);

  const img = lb.querySelector('.lightbox-img');
  const counter = lb.querySelector('.lightbox-counter');
  const single = images.length === 1;

  if (single) {
    lb.querySelector('.lightbox-prev').style.display = 'none';
    lb.querySelector('.lightbox-next').style.display = 'none';
  }

  const show = (index) => {
    current = (index + images.length) % images.length;
    img.src = images[current].src;
    img.alt = images[current].alt;
    if (!single) counter.textContent = `${current + 1} / ${images.length}`;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  };

  images.forEach((image, i) => image.addEventListener('click', () => show(i)));

  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
  lb.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Escape')     close();
  });
});
