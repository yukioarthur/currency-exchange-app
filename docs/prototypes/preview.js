// Design-only interaction. No market API calls or production business logic.
const dictionaries = Object.fromEntries(await Promise.all(['pt-BR', 'en-US'].map(async locale => {
  const response = await fetch(`../../src/i18n/${locale}.json`);
  if (!response.ok) throw new Error(`Unable to load ${locale}`);
  return [locale, await response.json()];
})));
const $ = id => document.getElementById(id);
const getSaved = key => { try { return localStorage.getItem(key); } catch { return null; } };
const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Optional persistence. */ } };
let locale = getSaved('currency-preview-locale');
if (!dictionaries[locale]) locale = 'pt-BR';
let theme = getSaved('currency-preview-theme');
if (!['light', 'dark', 'system'].includes(theme)) theme = 'system';
let mode = 'pair';
let rows = [];
const media = matchMedia('(prefers-color-scheme: dark)');
function t(key, values = {}) { return (dictionaries[locale][key] ?? dictionaries['pt-BR'][key] ?? key).replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match); }
function number(value, digits = 4) { return new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value); }
function date(iso, compact = false) { return new Intl.DateTimeFormat(locale, { timeZone: 'UTC', day: '2-digit', month: '2-digit', ...(compact ? {} : { year: 'numeric' }) }).format(new Date(`${iso}T12:00:00Z`)); }
function applyTheme() { document.documentElement.dataset.theme = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme; }
function makeRows() {
  // Five illustrative observations; period changes their positions only.
  const eurValue = { EUR: 1, USD: .9, GBP: 1.15, BRL: 1 / 6.2 };
  const finalRate = eurValue[$('base').value] / eurValue[$('quote').value];
  const end = Date.UTC(2026, 9, 22);
  const period = Number($('period').value);
  const offsets = period === 7 ? [6, 3, 2, 1, 0] : [period - 1, Math.floor(period * .7), Math.floor(period * .45), Math.floor(period * .2), 0];
  return [6.10, 6.14, 6.18, 6.19, 6.20].map((rate, i) => ({ date: new Date(end - offsets[i] * 86400000).toISOString().slice(0, 10), value: finalRate * rate / 6.2 }));
}
function renderChart() {
  const host = $('chart');
  const width = Math.max(250, host.clientWidth), height = width < 600 ? 270 : 300;
  const left = width < 600 ? 56 : 72, right = 18, top = 20, bottom = 46;
  const indexed = $('indexed').checked;
  const values = rows.map(r => indexed ? (r.value / rows[0].value - 1) * 100 : r.value);
  const lo = Math.min(...values), hi = Math.max(...values), padding = (hi - lo || 1) * .15;
  const min = lo - padding, max = hi + padding;
  const time = rows.map(r => Date.parse(r.date));
  const x = i => left + (time[i] - time[0]) / (time.at(-1) - time[0]) * (width - left - right);
  const y = value => top + (max - value) / (max - min) * (height - top - bottom);
  const points = values.map((value, i) => `${x(i)},${y(value)}`).join(' ');
  const ticks = Array.from({ length: 4 }, (_, i) => min + i * (max - min) / 3);
  const tickDigits = indexed ? 1 : (max < 1 ? 3 : 2);
  const axisDates = width < 600 ? [0, 4] : [0, 2, 4];
  host.innerHTML = `<svg role="img" aria-label="${t('chart.summary')}" viewBox="0 0 ${width} ${height}"><title>${$('base').value}/${$('quote').value}</title>${ticks.map(value => `<line class="grid" x1="${left}" x2="${width-right}" y1="${y(value)}" y2="${y(value)}"/><text x="${left-8}" y="${y(value)+4}" text-anchor="end">${number(value,tickDigits)}${indexed?'%':''}</text>`).join('')}<polygon class="area" points="${left},${height-bottom} ${points} ${width-right},${height-bottom}"/><polyline class="series" points="${points}"/>${values.map((value,i)=>`<circle class="point ${i===Number($('point').value)?'selected':''}" data-point="${i}" cx="${x(i)}" cy="${y(value)}" r="6"><title>${date(rows[i].date)}: ${number(rows[i].value)} ${$('quote').value}</title></circle>`).join('')}${axisDates.map(i=>`<text x="${x(i)}" y="${height-24}" text-anchor="${i===0?'start':i===4?'end':'middle'}">${date(rows[i].date,true)}</text>`).join('')}<text x="${width/2}" y="${height-3}" text-anchor="middle">${t('chart.dateAxis')}</text></svg>`;
  host.querySelectorAll('[data-point]').forEach(point => point.addEventListener('pointerenter', () => inspect(Number(point.dataset.point))));
  host.querySelectorAll('[data-point]').forEach(point => point.addEventListener('click', () => inspect(Number(point.dataset.point))));
  const row = rows[Number($('point').value)];
  $('point-detail').textContent = `${date(row.date)} · 1 ${$('base').value} = ${number(row.value)} ${$('quote').value} · ${number((row.value/rows[0].value-1)*100,2)}%`;
}
function inspect(index) { if (Number($('point').value) === index) return; $('point').value = index; renderChart(); }
function render() {
  document.documentElement.lang = locale;
  document.title = `${t('app.name')} — ${t('app.demo')}`;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-placeholder]').forEach(el => { el.placeholder = t(el.dataset.placeholder); });
  $('base-label').textContent = t(mode === 'individual' ? 'chart.currency' : 'converter.from');
  $('quote-label').textContent = t(mode === 'individual' ? 'chart.reference' : 'converter.to');
  $('pair-mode').setAttribute('aria-pressed', mode === 'pair');
  $('individual-mode').setAttribute('aria-pressed', mode === 'individual');
  $('conversion-result').textContent = new Intl.NumberFormat(locale, { style:'currency', currency:'BRL' }).format(620);
  $('conversion-caption').textContent = `1 EUR = ${number(6.2)} BRL · ${t('converter.date')}: ${date('2026-10-22')}`;
  rows = makeRows();
  const values = rows.map(r => r.value), first = values[0], last = values.at(-1);
  $('pair-name').textContent = `${$('base').value} → ${$('quote').value}`;
  $('chart-unit').textContent = $('indexed').checked ? t('chart.indexed') : t('chart.unit', {base:$('base').value,quote:$('quote').value});
  $('stats').innerHTML = [['chart.change',`${number((last/first-1)*100,2)}%`],['chart.minimum',number(Math.min(...values))],['chart.maximum',number(Math.max(...values))],['chart.average',number(values.reduce((a,b)=>a+b,0)/values.length)]].map(([key,value])=>`<div class="stat"><span>${t(key)}</span><strong>${value}</strong></div>`).join('');
  $('ibov-value').textContent = `${number(128000,0)} ${t('market.points')}`;
  $('ibov-change').textContent = `${t('market.change')}: +${number(.8,2)}% · ${t('common.sample')}`;
  $('selic-value').textContent = `${number(10,2)} ${t('market.annual')}`;
  $('record-count').textContent = t('table.count',{count:rows.length});
  $('records').innerHTML = rows.map(r=>`<tr><td>${date(r.date)}</td><td>${$('base').value}</td><td>${$('quote').value}</td><td>${number(r.value)}</td></tr>`).join('');
  renderChart();
}
$('language').value = locale; $('theme').value = theme;
$('language').addEventListener('change', event => { locale=event.target.value;save('currency-preview-locale',locale);render(); });
$('theme').addEventListener('change', event => { theme=event.target.value;save('currency-preview-theme',theme);applyTheme(); });
media.addEventListener('change', applyTheme);
for(const id of ['base','quote','period','indexed']) $(id).addEventListener('change',()=>{if($('base').value===$('quote').value)$('quote').value=$('base').value==='BRL'?'USD':'BRL';render();});
$('pair-mode').addEventListener('click',()=>{mode='pair';$('indexed').checked=false;render();});
$('individual-mode').addEventListener('click',()=>{mode='individual';$('indexed').checked=true;render();});
$('point').addEventListener('input',()=>renderChart());
new ResizeObserver(()=>{if(rows.length)renderChart();}).observe($('chart'));
applyTheme(); render();
