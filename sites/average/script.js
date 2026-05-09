const LIFE_EXPECTANCY = {
    'Global Average': 73,
    'Afghanistan': 65, 'Argentina': 77, 'Australia': 83, 'Austria': 82,
    'Bangladesh': 74, 'Belgium': 82, 'Brazil': 76,
    'Canada': 82, 'Chile': 80, 'China': 77, 'Colombia': 77, 'Cuba': 79,
    'Czech Republic': 80, 'Denmark': 81,
    'Egypt': 72, 'Ethiopia': 68,
    'Finland': 82, 'France': 82,
    'Germany': 81, 'Ghana': 65, 'Greece': 82,
    'Hungary': 77,
    'India': 70, 'Indonesia': 71, 'Iran': 77, 'Iraq': 71,
    'Ireland': 82, 'Israel': 83, 'Italy': 83,
    'Japan': 84,
    'Kenya': 67,
    'Malaysia': 76, 'Mexico': 75, 'Morocco': 77,
    'Netherlands': 82, 'New Zealand': 82, 'Nigeria': 55, 'Norway': 83,
    'Pakistan': 68, 'Peru': 77, 'Philippines': 72, 'Poland': 79, 'Portugal': 82,
    'Romania': 76, 'Russia': 73,
    'Saudi Arabia': 76, 'South Africa': 64, 'South Korea': 83,
    'Spain': 83, 'Sweden': 83, 'Switzerland': 84,
    'Taiwan': 81, 'Thailand': 78, 'Turkey': 78,
    'Ukraine': 73, 'United Kingdom': 81, 'United States': 79,
    'Vietnam': 75,
};

const MS_PER_HOUR = 60 * 60 * 1000;

const C_FILLED = [26,  26,  26 ];
const C_EMPTY  = [232, 232, 232];

let birthDate      = null;
let selectedCountry = 'Global Average';
let totalHours = 0;
let cols       = 0;
let rows       = 0;
let cellW      = 1; // float — exact width of one cell in canvas pixels
let cellH      = 1; // float — exact height of one cell in canvas pixels
let activeIdx  = 0;
let ticker     = null;
let canvasEl, ctx;

// ── Country select ────────────────────────────────────

document.getElementById('dob').max = new Date().toISOString().split('T')[0];

const countrySelect = document.getElementById('country');
Object.keys(LIFE_EXPECTANCY)
    .sort((a, b) => {
        if (a === 'Global Average') return -1;
        if (b === 'Global Average') return 1;
        return a.localeCompare(b);
    })
    .forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = `${name}  (avg ${LIFE_EXPECTANCY[name]}y)`;
        countrySelect.appendChild(opt);
    });

// ── Start ─────────────────────────────────────────────

document.getElementById('start').addEventListener('click', () => {
    const dobVal = document.getElementById('dob').value;
    if (!dobVal) return;
    const dob = new Date(dobVal);
    if (isNaN(dob) || dob >= new Date()) return;

    birthDate       = dob;
    selectedCountry = countrySelect.value;
    totalHours      = Math.round((LIFE_EXPECTANCY[selectedCountry] || 73) * 365.2425 * 24);

    document.getElementById('modal').style.display = 'none';
    document.getElementById('info-btn').classList.remove('hidden');

    const { fullHours } = calcTime();
    if (fullHours >= totalHours) {
        document.getElementById('borrowed').classList.remove('hidden');
        return;
    }

    document.getElementById('app').classList.remove('hidden');
    initCanvas();
    startTicker();
});

// ── Time ──────────────────────────────────────────────

function calcTime() {
    const ms         = Date.now() - birthDate.getTime();
    const hoursLived = ms / MS_PER_HOUR;
    const fullHours  = Math.floor(hoursLived);
    return { fullHours, hourProgress: hoursLived - fullHours };
}

// ── Canvas ────────────────────────────────────────────

function initCanvas() {
    canvasEl        = document.getElementById('canvas');
    canvasEl.width  = window.innerWidth;
    canvasEl.height = window.innerHeight;
    ctx             = canvasEl.getContext('2d');

    const W = canvasEl.width;
    const H = canvasEl.height;

    // Divide the ENTIRE viewport into exactly totalHours cells.
    // cols chosen to keep cells as square as possible given the aspect ratio.
    cols  = Math.round(Math.sqrt(totalHours * W / H));
    rows  = Math.ceil(totalHours / cols);
    cellW = W / cols;   // float — cells stretch to fill width exactly
    cellH = H / rows;   // float — cells stretch to fill height exactly

    const { fullHours, hourProgress } = calcTime();
    activeIdx = Math.min(fullHours, totalHours - 1);

    // Bulk-fill the canvas via ImageData — one pass for background,
    // one loop for past hours, then draw the active cell on top.
    const imgData = ctx.createImageData(W, H);
    const d       = imgData.data;

    // Background → empty colour
    for (let i = 0; i < d.length; i += 4) {
        d[i] = C_EMPTY[0]; d[i+1] = C_EMPTY[1]; d[i+2] = C_EMPTY[2]; d[i+3] = 255;
    }

    // Past hours → filled colour
    for (let i = 0; i < fullHours && i < totalHours; i++) {
        writeCell(d, W, H, i, C_FILLED);
    }

    ctx.putImageData(imgData, 0, 0);
    paintActiveCell(activeIdx, hourProgress);
}

// ── Cell helpers ──────────────────────────────────────

// Returns the integer pixel bounds of cell idx, sharing edges with neighbours.
function cellBounds(idx) {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x0  = Math.round(col       * cellW);
    const x1  = Math.round((col + 1) * cellW);
    const y0  = Math.round(canvasEl.height - (row + 1) * cellH);
    const y1  = Math.round(canvasEl.height -  row      * cellH);
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

// Write a solid colour into a raw ImageData buffer (used during bulk init).
function writeCell(d, W, H, idx, color) {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x0  = Math.round(col       * cellW);
    const x1  = Math.round((col + 1) * cellW);
    const y0  = Math.round(H - (row + 1) * cellH);
    const y1  = Math.round(H -  row      * cellH);

    for (let py = Math.max(0, y0); py < Math.min(H, y1); py++) {
        for (let px = Math.max(0, x0); px < Math.min(W, x1); px++) {
            const i = (py * W + px) * 4;
            d[i] = color[0]; d[i+1] = color[1]; d[i+2] = color[2]; d[i+3] = 255;
        }
    }
}

// Paint the active cell onto the live canvas with dither + partial fill.
function paintActiveCell(idx, hourProgress) {
    const { x, y, w, h } = cellBounds(idx);
    if (y < 0 || x >= canvasEl.width || w < 1 || h < 1) return;

    if (w === 1 && h === 1) {
        // Single pixel: mid-grey to mark current position
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.fillRect(x, y, 1, 1);
        return;
    }

    // Multi-pixel: checkerboard dither with solid fill rising from the bottom
    const imgData = ctx.createImageData(w, h);
    const d       = imgData.data;
    const fillPx  = Math.round(h * hourProgress);

    for (let cy = 0; cy < h; cy++) {
        for (let cx = 0; cx < w; cx++) {
            const i = (cy * w + cx) * 4;
            const color = (cy >= h - fillPx)
                ? C_FILLED
                : ((cx + cy) % 2 === 0 ? C_FILLED : C_EMPTY);
            d[i] = color[0]; d[i+1] = color[1]; d[i+2] = color[2]; d[i+3] = 255;
        }
    }
    ctx.putImageData(imgData, x, y);
}

// ── Ticker ────────────────────────────────────────────

function tick() {
    const { fullHours, hourProgress } = calcTime();
    const newActive = Math.min(fullHours, totalHours - 1);

    if (newActive !== activeIdx) {
        const { x, y, w, h } = cellBounds(activeIdx);
        ctx.fillStyle = `rgb(${C_FILLED.join(',')})`;
        ctx.fillRect(x, y, w, h);
        activeIdx = newActive;
    }

    paintActiveCell(activeIdx, hourProgress);
    spawnGrain();
}

function startTicker() {
    clearInterval(ticker);
    tick();
    ticker = setInterval(tick, 1000);
}

// ── Falling grain ─────────────────────────────────────

function spawnGrain() {
    if (!canvasEl) return;
    const { x, y, w, h } = cellBounds(activeIdx);
    const rect    = canvasEl.getBoundingClientRect();
    const screenX = rect.left + x;
    const screenY = rect.top  + y;

    const count = Math.random() < 0.5 ? 1 : 2;
    for (let i = 0; i < count; i++) {
        const grain  = document.createElement('div');
        grain.className = 'grain';
        const startY = screenY - 80 - Math.random() * 120;
        const dist   = screenY - startY + h * 0.5;
        grain.style.left = (screenX + w * (0.2 + Math.random() * 0.6)) + 'px';
        grain.style.top  = startY + 'px';
        grain.style.setProperty('--dist', dist + 'px');
        grain.style.setProperty('--dur',  (0.5 + Math.random() * 0.4) + 's');
        if (i > 0) grain.style.animationDelay = (Math.random() * 0.3) + 's';
        document.body.appendChild(grain);
        setTimeout(() => grain.remove(), 1200);
    }
}

// ── Info modal ────────────────────────────────────────

function openInfo() {
    const fmt = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const { fullHours } = calcTime();
    const totalDays   = Math.round(totalHours / 24);
    const usedDays    = Math.floor(fullHours / 24);
    const remainDays  = totalDays - usedDays;
    const pctUsed     = (fullHours / totalHours * 100).toFixed(1);
    const pctLeft     = (100 - parseFloat(pctUsed)).toFixed(1);
    const lifespan    = LIFE_EXPECTANCY[selectedCountry] || 73;

    document.getElementById('info-dob').textContent       = fmt(birthDate);
    document.getElementById('info-country').textContent   = selectedCountry;
    document.getElementById('info-lifespan').textContent  = lifespan + ' years';
    document.getElementById('info-today').textContent     = fmt(new Date());
    document.getElementById('info-total').textContent     = totalDays.toLocaleString() + ' days';
    document.getElementById('info-used').textContent      = usedDays.toLocaleString() + ' days (' + pctUsed + '%)';
    document.getElementById('info-remaining').textContent = remainDays.toLocaleString() + ' days (' + pctLeft + '%)';

    document.getElementById('info-modal').style.display = 'flex';
}
