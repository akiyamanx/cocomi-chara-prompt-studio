// COCOMI CharaPrompt Studio (CPS) - メインロジック v1.0
// UI動的生成、プロンプト生成、イベントハンドリングを管理

// === 状態管理 ===
let currentMode = 'anime'; // anime | photo
let selectedAccessories = new Set();
let selectedCharms = new Set();

// === 初期化 ===
document.addEventListener('DOMContentLoaded', () => {
  buildAllSections();
  setupEventListeners();
  applyMode('anime');
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

// === タグ選択トグル ===
function toggleTag(btn, tag, set) {
  if (set.has(tag)) {
    set.delete(tag);
    btn.classList.remove('selected');
  } else {
    set.add(tag);
    btn.classList.add('selected');
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
  // プリセットボタン
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });
  // プロンプト生成
  document.getElementById('btn-generate').addEventListener('click', generatePrompt);
  // キャラ保存
  document.getElementById('btn-save').addEventListener('click', showSaveModal);
  document.getElementById('btn-save-confirm').addEventListener('click', confirmSave);
  document.getElementById('btn-save-cancel').addEventListener('click', () => {
    document.getElementById('modal-name').style.display = 'none';
  });
  // 保存一覧
  document.getElementById('btn-saved').addEventListener('click', showSavedList);
  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal-saved').style.display = 'none';
  });
  // リセット
  document.getElementById('btn-reset').addEventListener('click', resetAll);
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

// === プリセット適用 ===
function applyPreset(key) {
  const preset = PRESETS[key];
  if (!preset) return;
  // モードをアニメに
  applyMode('anime');
  // セレクト値を設定
  Object.entries(preset.values).forEach(([k, v]) => {
    const sel = document.querySelector(`select[data-key="${k}"]`);
    if (sel) sel.value = v;
  });
  // アクセサリーリセット＆設定
  selectedAccessories.clear();
  document.querySelectorAll('#sec-accessory .tag-item').forEach(btn => {
    const tag = btn.dataset.tag;
    if (preset.accessories.includes(tag)) {
      selectedAccessories.add(tag);
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
  // チャームポイントリセット＆設定
  selectedCharms.clear();
  document.querySelectorAll('#sec-charm .tag-item').forEach(btn => {
    const tag = btn.dataset.tag;
    if (preset.charms.includes(tag)) {
      selectedCharms.add(tag);
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
  showToast(`${preset.name}のプリセットを読み込みました！`);
}

// === 現在のフォーム値を収集 ===
function collectValues() {
  const values = {};
  document.querySelectorAll('.field-select').forEach(sel => {
    if (sel.value) values[sel.dataset.key] = sel.value;
  });
  return values;
}

// === 英語プロンプト生成 ===
function generatePrompt() {
  const values = collectValues();
  const parts = [];
  // セレクト値を英語変換
  Object.values(values).forEach(v => {
    const en = M[v];
    if (en) parts.push(en);
  });
  // アクセサリー
  selectedAccessories.forEach(tag => {
    const en = ACCESSORY_EN[tag];
    if (en) parts.push(en);
  });
  // チャームポイント
  selectedCharms.forEach(tag => {
    const en = CHARM_EN[tag];
    if (en) parts.push(en);
  });
  if (parts.length === 0) {
    showToast('項目を選択してください');
    return;
  }
  // 一貫性キーワード追加
  const ckFace = document.getElementById('ck-same-face');
  const ckHair = document.getElementById('ck-same-hair');
  const ckOutfit = document.getElementById('ck-same-outfit');
  const ckEyes = document.getElementById('ck-same-eyes');
  const ckHands = document.getElementById('ck-correct-hands');
  if (ckFace && ckFace.checked) parts.push('same character', 'character consistency', 'same face');
  if (ckHair && ckHair.checked) parts.push('identical hairstyle', 'identical hair color and style');
  if (ckOutfit && ckOutfit.checked) parts.push('same outfit', 'identical clothing details');
  if (ckEyes && ckEyes.checked) parts.push('identical eye color', 'identical eye shape');
  if (ckHands && ckHands.checked) parts.push('correct hand anatomy', '5 fingers');
  // 必須末尾キーワード
  parts.push('completely original character design', 'no existing IP', 'no copyright infringement');
  // 実写モードの場合追加
  if (currentMode === 'photo') {
    parts.push('award winning photography', 'professional editorial quality');
  }
  const promptEn = parts.join(', ');
  // 日本語メモ生成
  const jaLines = [];
  Object.entries(values).forEach(([k, v]) => {
    // フィールドラベルを探す
    const label = findFieldLabel(k);
    jaLines.push(`${label}: ${v}`);
  });
  if (selectedAccessories.size > 0) {
    jaLines.push(`アクセサリー: ${[...selectedAccessories].join('、')}`);
  }
  if (selectedCharms.size > 0) {
    jaLines.push(`チャームポイント: ${[...selectedCharms].join('、')}`);
  }
  jaLines.push(`モード: ${currentMode === 'anime' ? 'アニメ・イラスト' : '実写・フォトリアル'}`);
  const promptJa = jaLines.join('\n');
  // 出力表示
  const outEn = document.getElementById('output-en');
  const outJa = document.getElementById('output-ja');
  document.getElementById('prompt-en').textContent = promptEn;
  document.getElementById('prompt-ja').textContent = promptJa;
  outEn.style.display = 'block';
  outJa.style.display = 'block';
  // 出力セクションまでスクロール
  outEn.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('プロンプトを生成しました！🚀');
}

// === フィールドラベル検索ヘルパー ===
function findFieldLabel(key) {
  for (const sec of Object.values(SECTIONS)) {
    for (const f of sec.fields) {
      if (f.key === key) return f.label;
    }
  }
  return key;
}

// === 全リセット ===
function resetAll() {
  document.querySelectorAll('.field-select').forEach(sel => sel.value = '');
  selectedAccessories.clear();
  selectedCharms.clear();
  document.querySelectorAll('.tag-item').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('output-en').style.display = 'none';
  document.getElementById('output-ja').style.display = 'none';
  // 一貫性チェックリセット
  document.getElementById('ck-same-face').checked = true;
  document.getElementById('ck-same-hair').checked = false;
  document.getElementById('ck-same-outfit').checked = false;
  document.getElementById('ck-same-eyes').checked = false;
  document.getElementById('ck-correct-hands').checked = false;
  showToast('リセットしました');
}

// === キャラ保存モーダル表示 ===
function showSaveModal() {
  const values = collectValues();
  if (Object.keys(values).length === 0) {
    showToast('保存する項目がありません');
    return;
  }
  document.getElementById('input-chara-name').value = '';
  document.getElementById('input-chara-notes').value = '';
  document.getElementById('modal-name').style.display = 'flex';
  document.getElementById('input-chara-name').focus();
}

// === 保存確定 ===
async function confirmSave() {
  const name = document.getElementById('input-chara-name').value.trim();
  if (!name) { showToast('名前を入力してください'); return; }
  const notes = document.getElementById('input-chara-notes').value.trim();
  const values = collectValues();
  const promptEn = document.getElementById('prompt-en').textContent || '';
  const promptJa = document.getElementById('prompt-ja').textContent || '';
  // 一貫性チェック状態
  const consistency = {
    sameFace: document.getElementById('ck-same-face').checked,
    sameHair: document.getElementById('ck-same-hair').checked,
    sameOutfit: document.getElementById('ck-same-outfit').checked,
    sameEyes: document.getElementById('ck-same-eyes').checked,
    correctHands: document.getElementById('ck-correct-hands').checked
  };
  try {
    await saveCharacter({
      name, notes, mode: currentMode,
      values, accessories: [...selectedAccessories], charms: [...selectedCharms],
      consistency, promptEn, promptJa
    });
    document.getElementById('modal-name').style.display = 'none';
    showToast(`「${name}」を保存しました！💾`);
  } catch (e) {
    console.error('保存エラー:', e);
    showToast('保存に失敗しました');
  }
}

// === 保存キャラ一覧表示 ===
async function showSavedList() {
  const list = document.getElementById('saved-list');
  list.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem">読み込み中...</p>';
  document.getElementById('modal-saved').style.display = 'flex';
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
          <button class="load-btn" data-id="${c.id}">📥 読み込み</button>
          <button class="prompt-btn" data-id="${c.id}">📋 プロンプト</button>
          <button class="del-btn" data-id="${c.id}">🗑 削除</button>
        </div>`;
      // 読み込みボタン
      item.querySelector('.load-btn').addEventListener('click', () => loadCharacter(c));
      // プロンプトコピー
      item.querySelector('.prompt-btn').addEventListener('click', () => {
        if (c.promptEn) {
          navigator.clipboard.writeText(c.promptEn).then(() => showToast('プロンプトをコピーしました！'));
        } else {
          showToast('プロンプトがまだ生成されていません');
        }
      });
      // 削除ボタン
      item.querySelector('.del-btn').addEventListener('click', async () => {
        if (confirm(`「${c.name}」を削除しますか？`)) {
          await deleteCharacter(c.id);
          showToast('削除しました');
          showSavedList(); // 一覧再読み込み
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
  // モード適用
  applyMode(c.mode || 'anime');
  // セレクト値復元
  if (c.values) {
    Object.entries(c.values).forEach(([k, v]) => {
      const sel = document.querySelector(`select[data-key="${k}"]`);
      if (sel) sel.value = v;
    });
  }
  // アクセサリー復元
  selectedAccessories.clear();
  document.querySelectorAll('#sec-accessory .tag-item').forEach(btn => {
    const tag = btn.dataset.tag;
    if (c.accessories && c.accessories.includes(tag)) {
      selectedAccessories.add(tag);
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
  // チャーム復元
  selectedCharms.clear();
  document.querySelectorAll('#sec-charm .tag-item').forEach(btn => {
    const tag = btn.dataset.tag;
    if (c.charms && c.charms.includes(tag)) {
      selectedCharms.add(tag);
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
  // 一貫性チェック復元
  if (c.consistency) {
    document.getElementById('ck-same-face').checked = !!c.consistency.sameFace;
    document.getElementById('ck-same-hair').checked = !!c.consistency.sameHair;
    document.getElementById('ck-same-outfit').checked = !!c.consistency.sameOutfit;
    document.getElementById('ck-same-eyes').checked = !!c.consistency.sameEyes;
    document.getElementById('ck-correct-hands').checked = !!c.consistency.correctHands;
  }
  // プロンプト復元（あれば）
  if (c.promptEn) {
    document.getElementById('prompt-en').textContent = c.promptEn;
    document.getElementById('output-en').style.display = 'block';
  }
  if (c.promptJa) {
    document.getElementById('prompt-ja').textContent = c.promptJa;
    document.getElementById('output-ja').style.display = 'block';
  }
  document.getElementById('modal-saved').style.display = 'none';
  showToast(`「${c.name}」を読み込みました！`);
}

// === HTMLエスケープ ===
function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// === トースト通知 ===
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
