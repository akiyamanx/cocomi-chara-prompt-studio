// COCOMI CharaPrompt Studio (CPS) - メインロジック v1.1
// マイキャラプリセット＋背景デザイナー＋合成プロンプト対応

// === 状態管理 ===
let currentMode = 'anime'; // anime | photo
let selectedAccessories = new Set();
let selectedCharms = new Set();

// === 初期化 ===
document.addEventListener('DOMContentLoaded', () => {
  buildAllSections();
  buildBgDesigner();
  setupEventListeners();
  applyMode('anime');
  loadMyPresets();
});

// === 全セクションのUI動的生成 ===
function buildAllSections() {
  // セレクトボックス系セクション
  Object.entries(SECTIONS).forEach(([secKey, sec]) => {
    const container = document.getElementById(`sec-${secKey}`);
    if (!container) return;
    sec.fields.forEach(f => {
      const row = document.createElement('div');
      row.className = 'field-row';
      row.innerHTML = `
        <label class="field-label">${f.label}</label>
        <select class="field-select" data-key="${f.key}">
          <option value="">-- 選択なし --</option>
          ${f.opts.map(o => `<option value="${o}">${o}</option>`).join('')}
        </select>`;
      container.appendChild(row);
    });
  });
  // タグ生成（アクセサリー＆チャーム）
  buildTagSection('sec-accessory', ACCESSORY_TAGS, selectedAccessories);
  buildTagSection('sec-charm', CHARM_TAGS, selectedCharms);
}

// === タグセクション生成ヘルパー ===
function buildTagSection(containerId, tags, set) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  const wrap = document.createElement('div');
  wrap.className = 'tag-container';
  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'tag-item'; btn.textContent = tag; btn.dataset.tag = tag;
    btn.addEventListener('click', () => toggleTag(btn, tag, set));
    wrap.appendChild(btn);
  });
  cont.appendChild(wrap);
}

// === 背景デザイナーUI生成 ===
function buildBgDesigner() {
  const container = document.getElementById('sec-bgdesign');
  if (!container || !BG_SECTION.bgdesign) return;
  BG_SECTION.bgdesign.fields.forEach(f => {
    const row = document.createElement('div');
    row.className = 'field-row';
    row.innerHTML = `
      <label class="field-label">${f.label}</label>
      <select class="field-select" data-key="${f.key}">
        <option value="">-- 選択なし --</option>
        ${f.opts.map(o => `<option value="${o}">${o}</option>`).join('')}
      </select>`;
    container.appendChild(row);
  });
}

// === タグ選択トグル ===
function toggleTag(btn, tag, set) {
  if (set.has(tag)) {
    set.delete(tag); btn.classList.remove('selected');
  } else {
    set.add(tag); btn.classList.add('selected');
  }
}

// === イベントリスナー設定 ===
function setupEventListeners() {
  // モード切り替え
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => applyMode(btn.dataset.mode));
  });
  // セクション折りたたみ
  document.querySelectorAll('.section-title[data-toggle]').forEach(title => {
    title.addEventListener('click', () => {
      title.classList.toggle('collapsed');
      const body = title.nextElementSibling;
      if (body) body.classList.toggle('hidden');
    });
  });
  // 三姉妹プリセットボタン
  document.querySelectorAll('.preset-btn[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });
  // マイキャラ追加ボタン
  document.getElementById('btn-add-mypreset').addEventListener('click', showMyCharaPicker);
  // プロンプト生成
  document.getElementById('btn-generate').addEventListener('click', generatePrompt);
  // キャラ保存
  document.getElementById('btn-save').addEventListener('click', showSaveModal);
  document.getElementById('btn-save-confirm').addEventListener('click', confirmSave);
  document.getElementById('btn-save-cancel').addEventListener('click', () => {
    el('modal-name').style.display = 'none';
  });
  // 保存一覧
  document.getElementById('btn-saved').addEventListener('click', showSavedList);
  document.getElementById('modal-close').addEventListener('click', () => {
    el('modal-saved').style.display = 'none';
  });
  // リセット
  document.getElementById('btn-reset').addEventListener('click', resetAll);
  // エクスポート/インポート
  document.getElementById('btn-export').addEventListener('click', doExport);
  document.getElementById('btn-import').addEventListener('click', () => el('file-import').click());
  document.getElementById('file-import').addEventListener('change', doImport);
  // コピーボタン
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        navigator.clipboard.writeText(target.textContent).then(() => showToast('コピーしました！'));
      }
    });
  });
  // モーダル背景クリックで閉じる
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
  // アスペクト比ボタン
  document.querySelectorAll('.aspect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.aspect-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  // 重み付けスライダーの値表示
  ['w-eyes','w-hair','w-outfit','w-expr'].forEach(id => {
    const slider = el(id);
    const valEl = el(id + '-val');
    if (slider && valEl) {
      slider.addEventListener('input', () => { valEl.textContent = slider.value; });
    }
  });
}

// === モード切り替え ===
function applyMode(mode) {
  currentMode = mode;
  document.body.className = `mode-${mode}`;
  document.querySelectorAll('.mode-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
}

// === 三姉妹プリセット適用 ===
function applyPreset(key) {
  const preset = PRESETS[key];
  if (!preset) return;
  applyMode('anime');
  Object.entries(preset.values).forEach(([k, v]) => {
    const sel = document.querySelector(`select[data-key="${k}"]`);
    if (sel) sel.value = v;
  });
  selectedAccessories.clear();
  document.querySelectorAll('#sec-accessory .tag-item').forEach(btn => {
    const tag = btn.dataset.tag;
    if (preset.accessories.includes(tag)) {
      selectedAccessories.add(tag); btn.classList.add('selected');
    } else { btn.classList.remove('selected'); }
  });
  selectedCharms.clear();
  document.querySelectorAll('#sec-charm .tag-item').forEach(btn => {
    const tag = btn.dataset.tag;
    if (preset.charms.includes(tag)) {
      selectedCharms.add(tag); btn.classList.add('selected');
    } else { btn.classList.remove('selected'); }
  });
  showToast(`${preset.name}のプリセットを読み込みました！`);
}

// === マイキャラプリセット: 保存済みキャラをプリセット欄に表示 ===
async function loadMyPresets() {
  const container = document.getElementById('my-presets');
  const addBtn = document.getElementById('btn-add-mypreset');
  container.querySelectorAll('.mychar-saved').forEach(b => b.remove());
  try {
    const chars = await getAllCharacters();
    chars.slice(0, 6).forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'preset-btn mychar-saved';
      btn.textContent = `💖 ${c.name}`;
      btn.addEventListener('click', () => loadCharacter(c));
      container.insertBefore(btn, addBtn);
    });
  } catch (e) { console.warn('マイキャラ読み込みエラー:', e); }
}

// === 新キャラ作成（リセットしてフォームの先頭へ） ===
function showMyCharaPicker() {
  resetAll();
  document.getElementById('mode-toggle').scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('新しいキャラを作ろう！✨');
}

// === 現在のフォーム値を収集 ===
function collectValues() {
  const values = {};
  document.querySelectorAll('.field-select').forEach(sel => {
    if (sel.value) values[sel.dataset.key] = sel.value;
  });
  return values;
}

// === 背景プロンプト生成（背景デザイナーの値のみ） ===
function generateBgPrompt() {
  const bgKeys = BG_SECTION.bgdesign.fields.map(f => f.key);
  const parts = [];
  bgKeys.forEach(key => {
    const sel = document.querySelector(`select[data-key="${key}"]`);
    if (sel && sel.value && BG_EN[sel.value]) parts.push(BG_EN[sel.value]);
  });
  if (parts.length > 0) parts.push('highly detailed background', 'no characters');
  return parts.join(', ');
}

// === メインプロンプト生成 ===
function generatePrompt() {
  const values = collectValues();
  const bgKeys = new Set(BG_SECTION.bgdesign.fields.map(f => f.key));
  const charaParts = [];
  const bgPartsInline = [];
  // ウェイト対象のキーマッピング
  const weightMap = {
    eyeColor:'w-eyes', eyeShape:'w-eyes',
    hairStyle:'w-hair', hairColor:'w-hair', bangs:'w-hair', hairTexture:'w-hair',
    outfit:'w-outfit', material:'w-outfit', colorTone:'w-outfit',
    expression:'w-expr', mouth:'w-expr'
  };
  Object.entries(values).forEach(([k, v]) => {
    const en = (MK[k] && MK[k][v]) || M[v] || BG_EN[v];
    if (!en) return;
    if (bgKeys.has(k)) { bgPartsInline.push(en); return; }
    // 重み付け適用
    const wId = weightMap[k];
    const wSlider = wId ? el(wId) : null;
    const w = wSlider ? parseFloat(wSlider.value) : 1.0;
    charaParts.push(w > 1.0 ? `(${en}:${w.toFixed(1)})` : en);
  });
  selectedAccessories.forEach(tag => { const en = ACCESSORY_EN[tag]; if (en) charaParts.push(en); });
  selectedCharms.forEach(tag => { const en = CHARM_EN[tag]; if (en) charaParts.push(en); });
  if (charaParts.length === 0 && bgPartsInline.length === 0) {
    showToast('項目を選択してください'); return;
  }
  // 品質ブースター（先頭に挿入）
  const boosters = [];
  if (el('ck-masterpiece')?.checked) boosters.push('masterpiece','best quality');
  if (el('ck-detailed')?.checked) boosters.push('highly detailed','ultra-detailed');
  if (el('ck-sharp')?.checked) boosters.push('sharp focus','8k resolution');
  // アスペクト比
  const aspectBtn = document.querySelector('.aspect-btn.active');
  const ratio = aspectBtn?.dataset.ratio;
  if (ratio) boosters.push(`aspect ratio ${ratio}`);
  // 一貫性キーワード
  if (el('ck-same-face')?.checked) charaParts.push('same character','character consistency','same face');
  if (el('ck-same-hair')?.checked) charaParts.push('identical hairstyle','identical hair color and style');
  if (el('ck-same-outfit')?.checked) charaParts.push('same outfit','identical clothing details');
  if (el('ck-same-eyes')?.checked) charaParts.push('identical eye color','identical eye shape');
  if (el('ck-correct-hands')?.checked) charaParts.push('correct hand anatomy','5 fingers');
  // 必須末尾
  charaParts.push('completely original character design','no existing IP','no copyright infringement');
  if (currentMode === 'photo') {
    charaParts.push('award winning photography','professional editorial quality');
  }
  // 自由入力
  const custom = el('custom-prompt')?.value.trim();
  if (custom) charaParts.push(custom);
  // 最終プロンプト組み立て（品質→キャラ）
  const allParts = [...boosters, ...charaParts];
  const promptEn = allParts.join(', ');
  // ネガティブプロンプト
  const negParts = [];
  if (el('neg-anatomy')?.checked) negParts.push('bad anatomy','extra fingers','missing fingers');
  if (el('neg-quality')?.checked) negParts.push('low quality','blurry','ugly','worst quality');
  if (el('neg-watermark')?.checked) negParts.push('watermark','text','signature','logo');
  if (el('neg-deform')?.checked) negParts.push('deformed','mutation','disfigured','malformed');
  if (el('neg-duplicate')?.checked) negParts.push('duplicate','clone','copy');
  const negPrompt = negParts.length > 0 ? negParts.join(', ') : '';
  // 背景プロンプト
  const bgPrompt = generateBgPrompt();
  // 合成プロンプト
  let combinedPrompt = '';
  if (bgPartsInline.length > 0) {
    combinedPrompt = allParts.join(', ') + ', ' + bgPartsInline.join(', ') + ', highly detailed background';
  }
  // 日本語メモ
  const jaLines = [];
  Object.entries(values).forEach(([k, v]) => { jaLines.push(`${findFieldLabel(k)}: ${v}`); });
  if (selectedAccessories.size > 0) jaLines.push(`アクセサリー: ${[...selectedAccessories].join('、')}`);
  if (selectedCharms.size > 0) jaLines.push(`チャームポイント: ${[...selectedCharms].join('、')}`);
  if (custom) jaLines.push(`自由入力: ${custom}`);
  jaLines.push(`モード: ${currentMode === 'anime' ? 'アニメ・イラスト' : '実写・フォトリアル'}`);
  // 出力表示
  el('prompt-en').textContent = promptEn;
  el('output-en').style.display = 'block';
  // ネガティブ表示
  if (negPrompt) {
    el('prompt-neg').textContent = negPrompt;
    el('output-neg').style.display = 'block';
  } else { el('output-neg').style.display = 'none'; }
  el('prompt-ja').textContent = jaLines.join('\n');
  el('output-ja').style.display = 'block';
  if (bgPrompt) {
    el('prompt-bg').textContent = bgPrompt;
    el('output-bg').style.display = 'block';
  } else { el('output-bg').style.display = 'none'; }
  if (combinedPrompt) {
    el('prompt-combined').textContent = combinedPrompt;
    el('output-combined').style.display = 'block';
  } else { el('output-combined').style.display = 'none'; }
  el('output-en').scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('プロンプトを生成しました！🚀');
}

// === フィールドラベル検索 ===
function findFieldLabel(key) {
  for (const sec of Object.values(SECTIONS)) {
    for (const f of sec.fields) { if (f.key === key) return f.label; }
  }
  if (BG_SECTION.bgdesign) {
    for (const f of BG_SECTION.bgdesign.fields) { if (f.key === key) return f.label; }
  }
  return key;
}

// === 全リセット ===
function resetAll() {
  document.querySelectorAll('.field-select').forEach(sel => sel.value = '');
  selectedAccessories.clear(); selectedCharms.clear();
  document.querySelectorAll('.tag-item').forEach(btn => btn.classList.remove('selected'));
  ['output-en','output-ja','output-bg','output-combined','output-neg'].forEach(id => el(id).style.display = 'none');
  // 一貫性リセット
  el('ck-same-face').checked = true;
  ['ck-same-hair','ck-same-outfit','ck-same-eyes','ck-correct-hands'].forEach(id => el(id).checked = false);
  // 品質ブースターリセット
  el('ck-masterpiece').checked = true; el('ck-detailed').checked = true; el('ck-sharp').checked = false;
  // ネガティブリセット
  el('neg-anatomy').checked = true; el('neg-quality').checked = true;
  ['neg-watermark','neg-deform','neg-duplicate'].forEach(id => el(id).checked = false);
  // ウェイトリセット
  ['w-eyes','w-hair','w-outfit','w-expr'].forEach(id => {
    el(id).value = '1.0'; el(id + '-val').textContent = '1.0';
  });
  // アスペクト比リセット
  document.querySelectorAll('.aspect-btn').forEach((b,i) => b.classList.toggle('active', i === 0));
  // 自由入力クリア
  el('custom-prompt').value = '';
  showToast('リセットしました');
}

// === キャラ保存モーダル表示 ===
function showSaveModal() {
  const values = collectValues();
  if (Object.keys(values).length === 0) { showToast('保存する項目がありません'); return; }
  el('input-chara-name').value = '';
  el('input-chara-notes').value = '';
  el('modal-name').style.display = 'flex';
  el('input-chara-name').focus();
}

// === 保存確定 ===
async function confirmSave() {
  const name = el('input-chara-name').value.trim();
  if (!name) { showToast('名前を入力してください'); return; }
  const notes = el('input-chara-notes').value.trim();
  const values = collectValues();
  const promptEn = el('prompt-en').textContent || '';
  const promptJa = el('prompt-ja').textContent || '';
  const consistency = {
    sameFace: el('ck-same-face').checked, sameHair: el('ck-same-hair').checked,
    sameOutfit: el('ck-same-outfit').checked, sameEyes: el('ck-same-eyes').checked,
    correctHands: el('ck-correct-hands').checked
  };
  try {
    await saveCharacter({ name, notes, mode: currentMode, values,
      accessories: [...selectedAccessories], charms: [...selectedCharms],
      consistency, promptEn, promptJa });
    el('modal-name').style.display = 'none';
    showToast(`「${name}」を保存しました！💾`);
    loadMyPresets();
  } catch (e) { console.error('保存エラー:', e); showToast('保存に失敗しました'); }
}

// === 保存キャラ一覧表示 ===
async function showSavedList() {
  const list = el('saved-list');
  list.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem">読み込み中...</p>';
  el('modal-saved').style.display = 'flex';
  try {
    const chars = await getAllCharacters();
    if (chars.length === 0) {
      list.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem;text-align:center;padding:20px">保存キャラがまだありません</p>';
      return;
    }
    list.innerHTML = '';
    chars.forEach(c => {
      const item = document.createElement('div');
      item.className = 'saved-item';
      const d = new Date(c.updatedAt).toLocaleDateString('ja-JP');
      const ml = c.mode === 'photo' ? '📷実写' : '🎨アニメ';
      const note = c.notes ? '- ' + escHtml(c.notes) : '';
      item.innerHTML = `<div class="saved-item-name">${escHtml(c.name)} ${ml}</div>
        <div class="saved-item-meta">${d} ${note}</div>
        <div class="saved-item-actions"><button class="load-btn">📥</button><button class="prompt-btn">📋</button><button class="del-btn">🗑</button></div>`;
      item.querySelector('.load-btn').addEventListener('click', () => loadCharacter(c));
      item.querySelector('.prompt-btn').addEventListener('click', () => {
        if (c.promptEn) navigator.clipboard.writeText(c.promptEn).then(() => showToast('コピーしました！'));
        else showToast('プロンプト未生成');
      });
      item.querySelector('.del-btn').addEventListener('click', async () => {
        if (confirm(`「${c.name}」を削除？`)) { await deleteCharacter(c.id); showToast('削除'); showSavedList(); loadMyPresets(); }
      });
      list.appendChild(item);
    });
  } catch (e) {
    console.error('一覧取得エラー:', e);
    list.innerHTML = '<p style="color:#e05555">読み込みエラー</p>';
  }
}

// === キャラクター読み込み ===
function loadCharacter(c) {
  applyMode(c.mode || 'anime');
  document.querySelectorAll('.field-select').forEach(sel => sel.value = '');
  if (c.values) {
    Object.entries(c.values).forEach(([k, v]) => {
      const sel = document.querySelector(`select[data-key="${k}"]`);
      if (sel) sel.value = v;
    });
  }
  selectedAccessories.clear();
  document.querySelectorAll('#sec-accessory .tag-item').forEach(btn => {
    const tag = btn.dataset.tag;
    if (c.accessories?.includes(tag)) {
      selectedAccessories.add(tag); btn.classList.add('selected');
    } else { btn.classList.remove('selected'); }
  });
  selectedCharms.clear();
  document.querySelectorAll('#sec-charm .tag-item').forEach(btn => {
    const tag = btn.dataset.tag;
    if (c.charms?.includes(tag)) {
      selectedCharms.add(tag); btn.classList.add('selected');
    } else { btn.classList.remove('selected'); }
  });
  if (c.consistency) {
    el('ck-same-face').checked = !!c.consistency.sameFace;
    el('ck-same-hair').checked = !!c.consistency.sameHair;
    el('ck-same-outfit').checked = !!c.consistency.sameOutfit;
    el('ck-same-eyes').checked = !!c.consistency.sameEyes;
    el('ck-correct-hands').checked = !!c.consistency.correctHands;
  }
  if (c.promptEn) { el('prompt-en').textContent = c.promptEn; el('output-en').style.display = 'block'; }
  if (c.promptJa) { el('prompt-ja').textContent = c.promptJa; el('output-ja').style.display = 'block'; }
  el('modal-saved').style.display = 'none';
  showToast(`「${c.name}」を読み込みました！`);
}

// === エクスポート（db.js呼び出し） ===
async function doExport() {
  try {
    const count = await exportAllCharacters();
    showToast(`${count}件のキャラをエクスポートしました！📤`);
  } catch (e) { showToast(e.message === 'no data' ? 'エクスポートするキャラがありません' : 'エクスポートに失敗しました'); }
}

// === インポート（db.js呼び出し） ===
async function doImport(e) {
  const file = e.target.files[0]; if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const count = await importCharactersFromData(data);
    showToast(`${count}件のキャラをインポートしました！📥`);
    loadMyPresets(); showSavedList();
  } catch (err) { showToast('インポートに失敗しました'); }
  e.target.value = '';
}

// === ユーティリティ ===
function el(id) { return document.getElementById(id); }
function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function showToast(msg) {
  const t = el('toast'); t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
