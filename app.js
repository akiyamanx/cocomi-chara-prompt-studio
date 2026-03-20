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
  // アクセサリータグ
  const accCont = document.getElementById('sec-accessory');
  if (accCont) {
    const wrap = document.createElement('div');
    wrap.className = 'tag-container';
    ACCESSORY_TAGS.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag-item';
      btn.textContent = tag;
      btn.dataset.tag = tag;
      btn.addEventListener('click', () => toggleTag(btn, tag, selectedAccessories));
      wrap.appendChild(btn);
    });
    accCont.appendChild(wrap);
  }
  // チャームポイントタグ
  const charmCont = document.getElementById('sec-charm');
  if (charmCont) {
    const wrap = document.createElement('div');
    wrap.className = 'tag-container';
    CHARM_TAGS.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag-item';
      btn.textContent = tag;
      btn.dataset.tag = tag;
      btn.addEventListener('click', () => toggleTag(btn, tag, selectedCharms));
      wrap.appendChild(btn);
    });
    charmCont.appendChild(wrap);
  }
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
  document.getElementById('btn-export').addEventListener('click', exportAllCharacters);
  document.getElementById('btn-import').addEventListener('click', () => el('file-import').click());
  document.getElementById('file-import').addEventListener('change', importCharacters);
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

// === マイキャラ選択ピッカー ===
async function showMyCharaPicker() { showSavedList(); }

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
  Object.entries(values).forEach(([k, v]) => {
    const en = M[v] || BG_EN[v];
    if (!en) return;
    if (bgKeys.has(k)) { bgPartsInline.push(en); }
    else { charaParts.push(en); }
  });
  selectedAccessories.forEach(tag => { const en = ACCESSORY_EN[tag]; if (en) charaParts.push(en); });
  selectedCharms.forEach(tag => { const en = CHARM_EN[tag]; if (en) charaParts.push(en); });
  if (charaParts.length === 0 && bgPartsInline.length === 0) {
    showToast('項目を選択してください'); return;
  }
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
  const promptEn = charaParts.join(', ');
  const bgPrompt = generateBgPrompt();
  // 合成プロンプト
  let combinedPrompt = '';
  if (bgPartsInline.length > 0 && charaParts.length > 0) {
    combinedPrompt = charaParts.join(', ') + ', ' + bgPartsInline.join(', ') + ', highly detailed background';
  }
  // 日本語メモ
  const jaLines = [];
  Object.entries(values).forEach(([k, v]) => { jaLines.push(`${findFieldLabel(k)}: ${v}`); });
  if (selectedAccessories.size > 0) jaLines.push(`アクセサリー: ${[...selectedAccessories].join('、')}`);
  if (selectedCharms.size > 0) jaLines.push(`チャームポイント: ${[...selectedCharms].join('、')}`);
  jaLines.push(`モード: ${currentMode === 'anime' ? 'アニメ・イラスト' : '実写・フォトリアル'}`);
  // 出力表示
  el('prompt-en').textContent = promptEn;
  el('output-en').style.display = 'block';
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
  ['output-en','output-ja','output-bg','output-combined'].forEach(id => el(id).style.display = 'none');
  el('ck-same-face').checked = true;
  ['ck-same-hair','ck-same-outfit','ck-same-eyes','ck-correct-hands'].forEach(id => el(id).checked = false);
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
      const date = new Date(c.updatedAt).toLocaleDateString('ja-JP');
      const modeLabel = c.mode === 'photo' ? '📷実写' : '🎨アニメ';
      item.innerHTML = `
        <div class="saved-item-name">${escHtml(c.name)} ${modeLabel}</div>
        <div class="saved-item-meta">${date} ${c.notes ? '- ' + escHtml(c.notes) : ''}</div>
        <div class="saved-item-actions">
          <button class="load-btn">📥 読み込み</button>
          <button class="prompt-btn">📋 プロンプト</button>
          <button class="del-btn">🗑 削除</button>
        </div>`;
      item.querySelector('.load-btn').addEventListener('click', () => loadCharacter(c));
      item.querySelector('.prompt-btn').addEventListener('click', () => {
        if (c.promptEn) {
          navigator.clipboard.writeText(c.promptEn).then(() => showToast('プロンプトをコピーしました！'));
        } else { showToast('プロンプトがまだ生成されていません'); }
      });
      item.querySelector('.del-btn').addEventListener('click', async () => {
        if (confirm(`「${c.name}」を削除しますか？`)) {
          await deleteCharacter(c.id); showToast('削除しました');
          showSavedList(); loadMyPresets();
        }
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

// === エクスポート（全キャラをJSONダウンロード） ===
async function exportAllCharacters() {
  try {
    const chars = await getAllCharacters();
    if (chars.length === 0) { showToast('エクスポートするキャラがありません'); return; }
    const data = { version: '1.1', exportedAt: new Date().toISOString(), characters: chars };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cps-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`${chars.length}件のキャラをエクスポートしました！📤`);
  } catch (e) { console.error('エクスポートエラー:', e); showToast('エクスポートに失敗しました'); }
}

// === インポート（JSONファイルから復元） ===
async function importCharacters(e) {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    // バリデーション
    if (!data.characters || !Array.isArray(data.characters)) {
      showToast('無効なファイル形式です'); return;
    }
    let count = 0;
    for (const c of data.characters) {
      if (c.name && c.values) {
        await saveCharacter(c);
        count++;
      }
    }
    showToast(`${count}件のキャラをインポートしました！📥`);
    loadMyPresets();
    showSavedList(); // 一覧を再表示
  } catch (err) {
    console.error('インポートエラー:', err);
    showToast('インポートに失敗しました');
  }
  // ファイル入力リセット（同じファイルを再選択できるように）
  e.target.value = '';
}

// === ユーティリティ ===
function el(id) { return document.getElementById(id); }
function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function showToast(msg) {
  const t = el('toast'); t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
