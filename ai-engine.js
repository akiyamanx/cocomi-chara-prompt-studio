// COCOMI CharaPrompt Studio (CPS) - AI整形エンジン v1.1
// Gemini Flash連携でプロンプトを自然な英語に整形する
// v1.0 2026-03-20 新規作成
// v1.1 2026-03-20 2段階生成モード追加

// === 設定 ===
const CPS_API_URL = 'https://cocomi-api-relay.k-akiyaman.workers.dev/api/cps/generate';
const AUTH_TOKEN = 'cocomi-family-2026-secret';

// v1.0 - AI整形状態管理
let isRefining = false;
// v1.1 - 背景モード（combined / twostep）
let bgGenMode = 'combined';

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
      // v1.1 - 背景がある＋2段階モードなら2段階出力も生成
      if (bgGenMode === 'twostep') {
        buildTwoStepOutput(data.refined);
      }
      showToast('AI整形完了！✨');
    } else {
      throw new Error('空のレスポンス');
    }

  } catch (err) {
    console.error('AI整形エラー:', err);
    if (!navigator.onLine) {
      showToast('オフラインです。辞書変換プロンプトをお使いください');
    } else {
      showToast('AI整形に失敗しました。辞書変換プロンプトをお使いください');
    }
  } finally {
    btn.textContent = origText;
    btn.disabled = false;
    isRefining = false;
  }
}

// === AI整形結果の表示 ===
function showRefinedOutput(refined, refinedNeg) {
  const container = document.getElementById('output-ai');
  const preEl = document.getElementById('prompt-ai');
  if (preEl && container) {
    preEl.textContent = refined;
    container.style.display = 'block';
  }
  const negContainer = document.getElementById('output-ai-neg');
  const negPre = document.getElementById('prompt-ai-neg');
  if (refinedNeg && negPre && negContainer) {
    negPre.textContent = refinedNeg;
    negContainer.style.display = 'block';
  } else if (negContainer) {
    negContainer.style.display = 'none';
  }
  container?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// === v1.1追加 - 2段階出力の組み立て ===
function buildTwoStepOutput(refinedCharaPrompt) {
  // 背景プロンプトを取得
  const bgPrompt = (document.getElementById('prompt-bg')?.textContent || '').trim();
  if (!bgPrompt) {
    // 背景なしなら2段階は非表示
    document.getElementById('output-twostep').style.display = 'none';
    return;
  }
  // Step1: 背景プロンプト（そのまま）
  const step1El = document.getElementById('prompt-step1');
  if (step1El) step1El.textContent = bgPrompt;
  // Step2: キャラ配置プロンプト（誘導文 + AI整形済みキャラプロンプト）
  const step2Prompt = 'place the character in this background scene, ' + refinedCharaPrompt;
  const step2El = document.getElementById('prompt-step2');
  if (step2El) step2El.textContent = step2Prompt;
  // 表示
  document.getElementById('output-twostep').style.display = 'block';
  // Combinedは非表示にする（2段階モードではCombinedは不要）
  document.getElementById('output-combined').style.display = 'none';
}

// === v1.1追加 - 背景有無に応じてモード選択バーを表示 ===
function updateBgModeVisibility() {
  const bgPrompt = (document.getElementById('prompt-bg')?.textContent || '').trim();
  const bar = document.getElementById('bg-mode-select');
  if (bar) {
    bar.style.display = bgPrompt ? 'block' : 'none';
  }
  // 背景なしなら2段階出力も非表示
  if (!bgPrompt) {
    const ts = document.getElementById('output-twostep');
    if (ts) ts.style.display = 'none';
  }
}

// === イベント登録 ===
document.addEventListener('DOMContentLoaded', () => {
  // v1.0 - AI整形ボタン
  const btn = document.getElementById('btn-ai-refine');
  if (btn) btn.addEventListener('click', refineWithAI);

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

  // v1.1 - 2段階コピーボタン
  document.querySelectorAll('.copy-btn[data-target^="prompt-step"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        navigator.clipboard.writeText(target.textContent)
          .then(() => showToast('コピーしました！'));
      }
    });
  });

  // v1.1 - モード選択ボタン
  document.querySelectorAll('.mode-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-select-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bgGenMode = btn.dataset.bgmode;
      // モード変更時に出力切り替え
      const tsBox = document.getElementById('output-twostep');
      const cmBox = document.getElementById('output-combined');
      if (bgGenMode === 'twostep') {
        // AI整形済みなら2段階を再構築
        const aiPrompt = (document.getElementById('prompt-ai')?.textContent || '').trim();
        if (aiPrompt) buildTwoStepOutput(aiPrompt);
        if (cmBox) cmBox.style.display = 'none';
      } else {
        if (tsBox) tsBox.style.display = 'none';
        // Combinedがあれば再表示
        const cmPrompt = (document.getElementById('prompt-combined')?.textContent || '').trim();
        if (cmBox && cmPrompt) cmBox.style.display = 'block';
      }
    });
  });
});
