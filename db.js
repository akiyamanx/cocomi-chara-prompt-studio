// COCOMI CharaPrompt Studio (CPS) - DB管理 v1.0
// IndexedDBによるキャラクターデータ保存 + 将来のD1連携スタブ

const DB_NAME = 'cps-characters';
const DB_VERSION = 1;
const STORE_NAME = 'characters';

// === IndexedDB初期化 ===
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// === キャラクター保存 ===
async function saveCharacter(data) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    // v1.0 保存構造（将来D1連携用にフラットな構造にしておく）
    const record = {
      id: data.id || `chara_${Date.now()}`,
      name: data.name || '名無し',
      notes: data.notes || '',
      mode: data.mode || 'anime',
      values: data.values || {},         // セレクト値（key: 日本語値）
      accessories: data.accessories || [], // 選択されたアクセサリータグ
      charms: data.charms || [],          // 選択されたチャームポイント
      consistency: data.consistency || {}, // 一貫性チェック状態
      promptEn: data.promptEn || '',      // 生成済み英語プロンプト
      promptJa: data.promptJa || '',      // 生成済み日本語メモ
      anchorImageUrl: data.anchorImageUrl || '', // 将来: アンカー画像URL
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const req = store.put(record);
    req.onsuccess = () => resolve(record);
    req.onerror = () => reject(req.error);
  });
}

// === キャラクター一覧取得（新しい順） ===
async function getAllCharacters() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => {
      const list = req.result.sort((a, b) =>
        new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      resolve(list);
    };
    req.onerror = () => reject(req.error);
  });
}

// === キャラクター1件取得 ===
async function getCharacter(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// === キャラクター削除 ===
async function deleteCharacter(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const req = tx.objectStore(STORE_NAME).delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

// ==============================================
// === 将来のD1連携スタブ（今回は未実装） ===
// ==============================================

// D1 API ベースURL（将来設定）
const D1_API_BASE = ''; // 例: 'https://cocomi-api-relay.xxx.workers.dev/api/cps'

// D1にキャラを同期する（スタブ）
async function syncToD1(characterData) {
  if (!D1_API_BASE) return null; // 未設定なら何もしない
  // 将来実装: fetch(D1_API_BASE + '/characters', { method:'POST', ... })
  console.log('[CPS] D1同期スタブ: 将来実装予定', characterData.name);
  return null;
}

// D1からキャラ一覧取得（スタブ）
async function fetchFromD1() {
  if (!D1_API_BASE) return [];
  // 将来実装: fetch(D1_API_BASE + '/characters')
  console.log('[CPS] D1取得スタブ: 将来実装予定');
  return [];
}

// COCOMITalk連携用APIエンドポイント設計（スタブ）
// GET  /api/cps/characters        → キャラ一覧
// GET  /api/cps/characters/:id    → キャラ詳細（プロンプト含む）
// POST /api/cps/characters        → キャラ保存
// PUT  /api/cps/characters/:id    → キャラ更新
// DELETE /api/cps/characters/:id  → キャラ削除
