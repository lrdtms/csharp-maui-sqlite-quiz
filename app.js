(() => {
  'use strict';

  const TYPES = [
    { id: 'mc',   name: 'Multiple choice', desc: 'Pick the best answer from four options.' },
    { id: 'tf',   name: 'True / False',    desc: 'Decide whether a statement is correct.' },
    { id: 'fill', name: 'Fill in the blank', desc: 'Type the missing word, symbol or keyword.' },
    { id: 'code', name: 'Code reading',    desc: 'Predict the output or spot the bug in a snippet.' },
  ];
  const TYPE_NAME = Object.fromEntries(TYPES.map(t => [t.id, t.name]));
  const TOPIC = Object.fromEntries(TOPICS.map((t, i) => [t.id, { ...t, num: i + 1 }]));
  const PRESETS = [10, 20, 30, 50, 'All'];
  const STORE_KEY = 'csharp-quiz-settings-v1';

  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------- settings ---------- */
  const defaults = () => ({ topics: TOPICS.map(t => t.id), count: 20, types: TYPES.map(t => t.id), mode: 'instant', shuffle: true });
  let S = defaults();
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (saved) {
      S = { ...S, ...saved };
      S.topics = S.topics.filter(id => TOPIC[id]);
      S.types = S.types.filter(id => TYPE_NAME[id]);
    }
  } catch (e) { /* storage unavailable: use defaults */ }
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  const pool = () => QUESTIONS.filter(q => S.topics.includes(q.topic) && S.types.includes(q.type));

  /* ---------- views ---------- */
  const views = ['setup', 'quiz', 'results'];
  function show(name) {
    views.forEach(v => { $(v).hidden = v !== name; });
    window.scrollTo(0, 0);
  }

  /* ---------- setup rendering ---------- */
  function renderTopics() {
    const list = $('topicList');
    list.textContent = '';
    let lastPart = null;
    TOPICS.forEach((t, i) => {
      if (t.part !== lastPart) { list.appendChild(el('div', 'topic-part', t.part)); lastPart = t.part; }
      const on = S.topics.includes(t.id);
      const n = QUESTIONS.filter(q => q.topic === t.id && S.types.includes(q.type)).length;
      const lab = el('label', 'topic' + (on ? ' on' : ''));
      const cb = el('input'); cb.type = 'checkbox'; cb.checked = on; cb.dataset.id = t.id;
      cb.setAttribute('aria-label', t.title);
      const num = el('span', 'topic__num', String(i + 1).padStart(2, '0'));
      const mid = el('div');
      mid.append(el('div', 'topic__title', t.title), el('div', 'topic__blurb', t.blurb));
      const right = el('div'); right.style.cssText = 'display:flex;align-items:center;gap:12px';
      right.append(el('span', 'topic__n', n + ' Q'), el('span', 'switch'));
      lab.append(cb, num, mid, right);
      list.appendChild(lab);
    });
  }

  function renderTypes() {
    const list = $('typeList');
    list.textContent = '';
    TYPES.forEach(t => {
      const n = QUESTIONS.filter(q => q.type === t.id && S.topics.includes(q.topic)).length;
      const lab = el('label', 'type');
      const cb = el('input'); cb.type = 'checkbox'; cb.checked = S.types.includes(t.id); cb.dataset.id = t.id;
      const body = el('div');
      const top = el('div', 'type__t'); top.append(el('span', null, t.name), el('small', null, n + ' avail.'));
      body.append(top, el('div', 'type__d', t.desc));
      lab.append(cb, body);
      list.appendChild(lab);
    });
  }

  function renderPresets() {
    const box = $('presets');
    box.textContent = '';
    const max = pool().length;
    PRESETS.forEach(p => {
      const val = p === 'All' ? max : p;
      const b = el('button', 'chip' + (S.count === val && (p === 'All' || val <= max) ? ' on' : ''), String(p));
      b.type = 'button';
      b.addEventListener('click', () => { setCount(val); });
      box.appendChild(b);
    });
  }

  function syncCountUI() {
    const max = Math.max(1, pool().length);
    $('countRange').max = String(max);
    $('countNum').max = String(max);
    $('countRange').value = String(Math.min(S.count, max));
    $('countNum').value = String(S.count);
    const p = pool().length;
    $('countHint').textContent = p
      ? `${p} question${p === 1 ? '' : 's'} available with your current topics and types.`
      : 'No questions match the current selection.';
    $('poolStat').innerHTML = `<b>${p}</b> questions in pool · <b>${S.topics.length}</b> of ${TOPICS.length} topics`;
    renderPresets();
    const warn = $('startWarn');
    let msg = '';
    if (!S.topics.length) msg = 'Turn on at least one topic.';
    else if (!S.types.length) msg = 'Choose at least one question type.';
    else if (!p) msg = 'The chosen topics have no questions of the chosen types.';
    else if (S.count > p) msg = `You asked for ${S.count}, but only ${p} are available. The quiz will use ${p}.`;
    warn.textContent = msg; warn.hidden = !msg;
    $('startBtn').disabled = !p;
  }

  function setCount(n) {
    n = Math.max(1, Math.floor(Number(n) || 1));
    S.count = n; save(); syncCountUI();
  }

  function refreshAll() { renderTopics(); renderTypes(); syncCountUI(); }

  $('topicList').addEventListener('change', e => {
    const id = e.target.dataset.id; if (!id) return;
    S.topics = e.target.checked ? [...S.topics, id] : S.topics.filter(x => x !== id);
    S.topics = TOPICS.map(t => t.id).filter(x => S.topics.includes(x));
    save(); refreshAll();
    const again = $('topicList').querySelector(`input[data-id="${id}"]`); if (again) again.focus();
  });
  $('typeList').addEventListener('change', e => {
    const id = e.target.dataset.id; if (!id) return;
    S.types = e.target.checked ? [...S.types, id] : S.types.filter(x => x !== id);
    save(); refreshAll();
    const again = $('typeList').querySelector(`input[data-id="${id}"]`); if (again) again.focus();
  });
  $('allOn').addEventListener('click', () => { S.topics = TOPICS.map(t => t.id); save(); refreshAll(); });
  $('allOff').addEventListener('click', () => { S.topics = []; save(); refreshAll(); });
  $('countNum').addEventListener('input', e => { if (e.target.value !== '') setCountSoft(e.target.value); });
  $('countNum').addEventListener('change', e => setCount(e.target.value));
  function setCountSoft(v) { S.count = Math.max(1, Math.floor(Number(v) || 1)); save(); $('countRange').value = String(Math.min(S.count, Number($('countRange').max))); renderPresets(); updateWarn(); }
  function updateWarn() { const keep = $('countNum').value; syncCountUI(); $('countNum').value = keep; }
  $('countRange').addEventListener('input', e => setCount(e.target.value));
  $('countMinus').addEventListener('click', () => setCount(S.count - 1));
  $('countPlus').addEventListener('click', () => setCount(S.count + 1));
  document.querySelectorAll('input[name=mode]').forEach(r => {
    r.checked = r.value === S.mode;
    r.addEventListener('change', () => { S.mode = r.value; save(); });
  });
  $('shuffleQ').checked = !!S.shuffle;
  $('shuffleQ').addEventListener('change', e => { S.shuffle = e.target.checked; save(); });

  /* ---------- building a quiz ---------- */
  // Pick n questions from `items`, cycling through topics so no topic dominates.
  function pickBalanced(items, n) {
    const byTopic = new Map();
    shuffle(items).forEach(q => { if (!byTopic.has(q.topic)) byTopic.set(q.topic, []); byTopic.get(q.topic).push(q); });
    const buckets = shuffle([...byTopic.values()]);
    const out = [];
    while (out.length < n && buckets.some(b => b.length)) {
      for (const b of buckets) { if (b.length && out.length < n) out.push(b.shift()); }
    }
    return out;
  }

  function selectQuestions(total) {
    const items = pool();
    total = Math.min(total, items.length);
    const types = S.types.filter(t => items.some(q => q.type === t));
    // even split across types, capped by availability; leftovers redistributed
    const avail = Object.fromEntries(types.map(t => [t, items.filter(q => q.type === t).length]));
    const alloc = Object.fromEntries(types.map(t => [t, 0]));
    let left = total;
    while (left > 0) {
      const open = types.filter(t => alloc[t] < avail[t]);
      if (!open.length) break;
      const order = shuffle(open);
      for (const t of order) { if (left > 0 && alloc[t] < avail[t]) { alloc[t]++; left--; } }
    }
    let chosen = [];
    types.forEach(t => { chosen = chosen.concat(pickBalanced(items.filter(q => q.type === t), alloc[t])); });
    return chosen;
  }

  /* ---------- quiz engine ---------- */
  let run = null; // { items, i, mode }

  function makeItem(q) {
    const order = q.type === 'tf' ? [0, 1] : shuffle(q.options ? q.options.map((_, i) => i) : []);
    const correctIdx = q.type === 'tf' ? q.answer : 0;
    return { q, order, correctDisplay: order.indexOf(correctIdx), answer: null, result: null, locked: false };
  }

  function startRun(questions) {
    const list = S.shuffle ? shuffle(questions) : questions.slice().sort((a, b) => a.id - b.id);
    run = { items: list.map(makeItem), i: 0, mode: S.mode };
    show('quiz');
    renderQuestion();
  }

  const norm = s => String(s).trim().replace(/\s+/g, ' ').replace(/\(\)$/, '').replace(/;$/, '').toLowerCase();
  const isFillCorrect = (item, text) => item.q.answers.some(a => norm(a) === norm(text));

  function renderQuestion() {
    const item = run.items[run.i], q = item.q, total = run.items.length;
    $('qCount').textContent = `Question ${run.i + 1} of ${total}`;
    const answered = run.items.filter(x => x.answer !== null && x.answer !== '').length;
    const pct = (run.mode === 'instant' ? run.items.filter(x => x.locked).length : answered) / total * 100;
    $('progressBar').style.width = pct + '%';
    $('progress').setAttribute('aria-valuenow', String(Math.round(pct)));
    const T = TOPIC[q.topic];
    $('qTopic').textContent = `${String(T.num).padStart(2, '0')} · ${T.title}`;
    $('qType').textContent = TYPE_NAME[q.type];
    $('qText').textContent = q.q;
    const code = $('qCode');
    if (q.code) { code.textContent = q.code; code.hidden = false; } else code.hidden = true;

    const box = $('qAnswers'); box.textContent = '';
    if (q.type === 'fill') {
      const row = el('div', 'fill');
      const inp = el('input'); inp.type = 'text'; inp.id = 'fillInput'; inp.autocomplete = 'off'; inp.spellcheck = false;
      inp.autocapitalize = 'off'; inp.placeholder = 'Type your answer'; inp.setAttribute('aria-label', 'Your answer');
      inp.value = item.answer || '';
      inp.disabled = item.locked;
      inp.addEventListener('input', () => { item.answer = inp.value; updateAction(); });
      row.appendChild(inp); box.appendChild(row);
      if (item.locked) inp.classList.add(item.result ? 'right' : 'wrong');
    } else {
      const wrap = el('div', 'opts');
      item.order.forEach((origIdx, di) => {
        const b = el('button', 'opt'); b.type = 'button'; b.dataset.di = di;
        b.append(el('span', 'opt__k', String(di + 1)), el('span', 'opt__t', q.options[origIdx]));
        b.addEventListener('click', () => choose(di));
        wrap.appendChild(b);
      });
      box.appendChild(wrap);
      paintOptions(item);
    }
    renderFeedback(item);
    updateAction();
    $('prevBtn').disabled = run.i === 0;
    const focusTarget = q.type === 'fill' && !item.locked ? $('fillInput') : $('qText');
    if (focusTarget === $('qText')) $('qText').tabIndex = -1;
    focusTarget.focus({ preventScroll: true });
  }

  function paintOptions(item) {
    document.querySelectorAll('#qAnswers .opt').forEach(b => {
      const di = Number(b.dataset.di);
      b.classList.remove('opt--sel', 'opt--right', 'opt--wrong');
      b.disabled = item.locked;
      if (item.locked) {
        if (di === item.correctDisplay) b.classList.add('opt--right');
        else if (di === item.answer) b.classList.add('opt--wrong');
      } else if (item.answer === di) b.classList.add('opt--sel');
    });
  }

  function renderFeedback(item) {
    const fb = $('qFeedback');
    if (!item.locked || run.mode !== 'instant') { fb.hidden = true; return; }
    fb.hidden = false;
    fb.className = 'fb ' + (item.result ? 'fb--good' : 'fb--bad');
    fb.textContent = '';
    fb.appendChild(el('strong', null, item.result ? 'Correct' : 'Not quite'));
    const q = item.q;
    if (!item.result) {
      const correct = q.type === 'fill' ? q.answers[0] : q.options[item.order[item.correctDisplay]];
      fb.appendChild(document.createTextNode('Answer: ' + correct + '. '));
    }
    fb.appendChild(document.createTextNode(q.explain || ''));
  }

  function choose(di) {
    const item = run.items[run.i];
    if (item.locked) return;
    item.answer = di;
    if (run.mode === 'instant') {
      item.locked = true;
      item.result = di === item.correctDisplay;
      paintOptions(item); renderFeedback(item);
      $('progressBar').style.width = run.items.filter(x => x.locked).length / run.items.length * 100 + '%';
    } else paintOptions(item);
    updateAction();
  }

  function updateAction() {
    const item = run.items[run.i], last = run.i === run.items.length - 1;
    const btn = $('actionBtn');
    const hasAnswer = item.answer !== null && String(item.answer).trim() !== '';
    if (run.mode === 'instant') {
      if (item.q.type === 'fill' && !item.locked) { btn.textContent = 'Check answer'; btn.disabled = !hasAnswer; return; }
      btn.textContent = last ? 'See results' : 'Next →';
      btn.disabled = !item.locked;
    } else {
      btn.textContent = last ? 'Finish quiz' : 'Next →';
      btn.disabled = false;
    }
  }

  function onAction() {
    const item = run.items[run.i], last = run.i === run.items.length - 1;
    if (run.mode === 'instant' && item.q.type === 'fill' && !item.locked) {
      if (!String(item.answer || '').trim()) return;
      item.locked = true; item.result = isFillCorrect(item, item.answer);
      renderQuestion(); $('actionBtn').focus({ preventScroll: true });
      return;
    }
    if (last) return finish();
    run.i++; renderQuestion();
  }

  $('actionBtn').addEventListener('click', onAction);
  $('prevBtn').addEventListener('click', () => { if (run.i > 0) { run.i--; renderQuestion(); } });
  $('quitBtn').addEventListener('click', () => { run = null; show('setup'); });

  document.addEventListener('keydown', e => {
    if ($('quiz').hidden || !run || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = e.target.tagName;
    if (/^[1-4]$/.test(e.key) && tag !== 'INPUT') {
      const item = run.items[run.i];
      if (item.q.type !== 'fill' && Number(e.key) - 1 < item.order.length) { choose(Number(e.key) - 1); e.preventDefault(); }
    } else if (e.key === 'Enter' && tag !== 'BUTTON') {
      if (!$('actionBtn').disabled) { onAction(); e.preventDefault(); }
    }
  });

  /* ---------- results ---------- */
  function finish() {
    run.items.forEach(item => {
      if (item.q.type === 'fill') item.result = item.answer ? isFillCorrect(item, item.answer) : false;
      else item.result = item.answer !== null && item.answer === item.correctDisplay;
      item.locked = true;
    });
    renderResults();
    show('results');
  }

  function renderResults() {
    const items = run.items, total = items.length;
    const right = items.filter(x => x.result).length;
    const skipped = items.filter(x => x.answer === null || String(x.answer).trim() === '').length;
    const pct = Math.round(right / total * 100);
    $('scoreRing').style.setProperty('--p', pct);
    $('scorePct').textContent = pct + '%';
    $('scoreTitle').textContent = `${right} of ${total} correct`;
    const msg = pct >= 90 ? 'Excellent - you are well prepared.' : pct >= 70 ? 'Solid. Review the missed ones and go again.' : pct >= 50 ? 'Getting there. Revisit the topics below in the guide.' : 'Keep at it - re-read the weak chapters, then retake the missed questions.';
    $('scoreSub').textContent = msg + (skipped ? ` (${skipped} unanswered)` : '');
    $('retryMissed').disabled = right === total;

    // per-topic
    const box = $('topicBreakdown'); box.textContent = '';
    const tally = {};
    items.forEach(x => { const t = x.q.topic; tally[t] = tally[t] || { r: 0, n: 0 }; tally[t].n++; if (x.result) tally[t].r++; });
    TOPICS.filter(t => tally[t.id]).forEach(t => {
      const { r, n } = tally[t.id], p = Math.round(r / n * 100);
      const row = el('div', 'bd');
      const bar = el('div', 'bd__bar'); const fill = el('span', p < 50 ? 'low' : p < 80 ? 'mid' : ''); fill.style.width = p + '%'; bar.appendChild(fill);
      row.append(el('div', null, t.title), bar, el('div', 'bd__n', `${r}/${n} · ${p}%`));
      box.appendChild(row);
    });
    renderReview();
  }

  function renderReview() {
    const filter = document.querySelector('input[name=rf]:checked').value;
    const list = $('reviewList'); list.textContent = '';
    run.items.forEach((item, idx) => {
      if (filter === 'wrong' && item.result) return;
      const q = item.q;
      const card = el('div', 'rv' + (item.result ? '' : ' bad'));
      const top = el('div', 'rv__top');
      top.append(el('span', 'tag tag--topic', `${String(TOPIC[q.topic].num).padStart(2, '0')} · ${TOPIC[q.topic].title}`), el('span', 'tag tag--type', `${idx + 1} · ${TYPE_NAME[q.type]}`));
      card.append(top, el('div', 'rv__q', q.q));
      if (q.code) card.appendChild(el('pre', 'code', q.code));
      const a = el('div', 'rv__a');
      const answered = item.answer !== null && String(item.answer).trim() !== '';
      const yourText = !answered ? '(no answer)' : q.type === 'fill' ? String(item.answer) : q.options[item.order[item.answer]];
      const correctText = q.type === 'fill' ? q.answers[0] : q.options[item.order[item.correctDisplay]];
      const yours = el('span', 'yours ' + (item.result ? 'good' : 'bad'), yourText);
      const p1 = el('div'); p1.append(el('b', null, 'Your answer: '), yours); a.appendChild(p1);
      if (!item.result) { const p2 = el('div'); p2.append(el('b', null, 'Correct answer: '), document.createTextNode(correctText)); a.appendChild(p2); }
      card.appendChild(a);
      if (q.explain) card.appendChild(el('div', 'rv__e', q.explain));
      list.appendChild(card);
    });
    if (!list.children.length) list.appendChild(el('p', 'hint', 'Nothing to show here - every question was answered correctly.'));
  }

  document.querySelectorAll('input[name=rf]').forEach(r => r.addEventListener('change', renderReview));
  $('retryMissed').addEventListener('click', () => startRun(run.items.filter(x => !x.result).map(x => x.q)));
  $('retrySame').addEventListener('click', startFromSettings);
  $('toSetup').addEventListener('click', () => { run = null; show('setup'); });

  function startFromSettings() {
    const qs = selectQuestions(S.count);
    if (!qs.length) return;
    startRun(qs);
  }
  $('startBtn').addEventListener('click', startFromSettings);

  /* ---------- init ---------- */
  refreshAll();
  show('setup');
})();
