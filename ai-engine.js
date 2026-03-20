// COCOMI CharaPrompt Studio (CPS) - AI整形エンジン v1.0
// Gemini Flash連携でプロンプトを自然な英語に整形する
// 2026-03-20 新規作成

// === 設定 ===
const CPS_API_URL = 'https://cocomi-api-relay.k-akiyaman.workers.dev/api/cps/generate';
const AUTH_TOKEN = 'cocomi-family-2026-secret';

// v1.0 - AI整形状態管理
let isRefining = false;

// === AI整形メイン処理 ===
async function refineWithAI() {
  // v1.0 - 辞書変換プロンプトが未生成なら先に生成
  const promptEl = document.getElementById('prompt-en');
  const rawPrompt = (promptEl?.textContent || '').trim();

  if (!rawPrompt) {
    showToast('先に「🚀 プロンプト生成」を押してください');
    return;
  }

  // v1.0 - 二重送信防止
  if (isRefining) return;
  isRefining = true;

  const btn = document.getElementById('btn-ai-refine');
  const origText = btn.textContent;
  btn.textContent = '✨ AI整形中...';
  btn.disabled = true;

  // v1.0 - ネガティブプロンプトも取得（あれば）
  const negEl = document.getElementById('prompt-neg');
  const negPrompt = (negEl?.textContent || '').trim();

  try {
    const response = await fetch(CPS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-COCOMI-AUTH': AUTH_TOKEN,
      },
      body: JSON.stringify({
        prompt: rawPrompt,
        negative: negPrompt,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${response.status}`);
    }

    const data = await response.json();

    // v1.0 - 整形結果を表示
    if (data.refined) {
      showRefinedOutput(data.refined, data.refinedNegative);
      showToast('AI整形完了！✨');
    } else {
      throw new Error('空のレスポンス');
    }

  } catch (err) {
    console.error('AI整形エラー:', err);
    // v1.0 - オフライン or エラー時のフォールバック
    if (!navigator.onLine) {
      showToast('オフラインです。辞書変換プロンプトをお使いください');
    } else {
      showToast('AI整形に失敗しました。辞書変換プロンプトをお使いください');
    }
  } finally {
    // v1.0 - ボタン状態復帰
    btn.textContent = origText;
    btn.disabled = false;
    isRefining = false;
  }
}

// === AI整形結果の表示 ===
function showRefinedOutput(refined, refinedNeg) {
  // v1.0 - AI整形プロンプト表示エリア
  const container = document.getElementById('output-ai');
  const preEl = document.getElementById('prompt-ai');

  if (preEl && container) {
    preEl.textContent = refined;
    container.style.display = 'block';
  }

  // v1.0 - AI整形ネガティブ（あれば）
  const negContainer = document.getElementById('output-ai-neg');
  const negPre = document.getElementById('prompt-ai-neg');

  if (refinedNeg && negPre && negContainer) {
    negPre.textContent = refinedNeg;
    negContainer.style.display = 'block';
  } else if (negContainer) {
    negContainer.style.display = 'none';
  }

  // v1.0 - スクロール
  container?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// === イベント登録 ===
document.addEventListener('DOMContentLoaded', () => {
  // v1.0 - AI整形ボタン
  const btn = document.getElementById('btn-ai-refine');
  if (btn) {
    btn.addEventListener('click', refineWithAI);
  }

  // v1.0 - AI整形結果のコピーボタン
  document.querySelectorAll('.copy-btn[data-target^="prompt-ai"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        navigator.clipboard.writeText(target.textContent)
          .then(() => showToast('コピーしました！'));
      }
    });
  });
});
