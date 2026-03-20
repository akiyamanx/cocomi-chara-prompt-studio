// COCOMI CharaPrompt Studio (CPS) - 背景デザイナー データ定義 v1.1
// 背景デザイナーの選択肢と英語変換マップ

// === 背景デザイナー セクション定義 ===
const BG_SECTION = {
  bgdesign: {
    label: '背景デザイナー',
    fields: [
      { key:'bgPlace', label:'場所カテゴリ', opts:[
        '室内（リビング）','室内（寝室）','室内（キッチン）','室内（書斎・仕事部屋）',
        '室内（教室）','室内（カフェ・喫茶店）','室内（図書館）','室内（ゲーセン）',
        '室内（和室）','室内（城の中・ファンタジー）','室内（宇宙船内）',
        '屋外（街並み・都市）','屋外（路地裏）','屋外（公園）','屋外（神社・寺）',
        '屋外（ビーチ・海辺）','屋外（森・自然）','屋外（花畑）','屋外（雪原）',
        '屋外（屋上）','屋外（学校の校庭）','ファンタジー（魔法の森）',
        'ファンタジー（空中都市）','ファンタジー（ダンジョン）','SF（サイバー都市）'
      ]},
      { key:'bgStyle', label:'背景スタイル', opts:[
        'アニメ背景（新海誠風）','アニメ背景（ジブリ風）','アニメ背景（シンプル）',
        'フォトリアル','水彩画風','ピクセルアート背景','コンセプトアート風',
        'ゲーム背景風（RPG）','淡い・パステル調','ダーク・退廃的'
      ]},
      { key:'bgTime', label:'時間帯', opts:[
        '朝（日の出・早朝）','昼（明るい）','夕方（ゴールデンアワー）',
        '夜（街の明かり）','夜（月明かり）','深夜（暗闘）'
      ]},
      { key:'bgWeather', label:'天候', opts:[
        '晴天','曇り','雨','雪','霧','嵐','桜吹雪','紅葉が舞う'
      ]},
      { key:'bgMood', label:'雰囲気', opts:[
        '暖かく居心地いい','クールでスタイリッシュ','幻想的・ファンタジー',
        '不気味・ホラー','にぎやか・活気あふれる','静か・穏やか','ノスタルジック・懐かしい',
        '近未来的・SF','ロマンチック','荘厳・壮大'
      ]},
      { key:'bgLighting', label:'照明・光', opts:[
        '自然光（窓から）','暖色の室内照明','ネオンライト','キャンドル・ランプ',
        '木漏れ日','逆光（ドラマチック）','月光','魔法の光・粒子'
      ]},
      { key:'bgDetail', label:'追加ディテール', opts:[
        '家具あり（テーブル・椅子）','本棚・書籍','植物・花','食べ物・飲み物',
        'ポスター・絵画','窓から景色が見える','カーテンが揺れている',
        '猫がいる','光の粒子が舞っている','水面の反射','落ち葉・花びら'
      ]}
    ]
  }
};

// === 背景デザイナー英語変換マップ ===
const BG_EN = {
  // 場所
  '室内（リビング）':'cozy living room interior','室内（寝室）':'bedroom interior',
  '室内（キッチン）':'kitchen interior','室内（書斎・仕事部屋）':'study room home office interior',
  '室内（教室）':'school classroom interior','室内（カフェ・喫茶店）':'cafe interior',
  '室内（図書館）':'library interior','室内（ゲーセン）':'arcade game center interior',
  '室内（和室）':'traditional japanese room tatami interior',
  '室内（城の中・ファンタジー）':'fantasy castle throne room interior',
  '室内（宇宙船内）':'spaceship cockpit interior',
  '屋外（街並み・都市）':'city street urban scenery','屋外（路地裏）':'narrow back alley',
  '屋外（公園）':'park scenery with trees','屋外（神社・寺）':'japanese shrine temple scenery',
  '屋外（ビーチ・海辺）':'beach seaside ocean view','屋外（森・自然）':'forest nature scenery',
  '屋外（花畑）':'flower field meadow','屋外（雪原）':'snowy field winter landscape',
  '屋外（屋上）':'rooftop city view','屋外（学校の校庭）':'school yard playground',
  'ファンタジー（魔法の森）':'enchanted magical forest','ファンタジー（空中都市）':'floating sky city',
  'ファンタジー（ダンジョン）':'dark dungeon cave','SF（サイバー都市）':'cyberpunk neon city',
  // スタイル
  'アニメ背景（新海誠風）':'makoto shinkai style anime background detailed sky',
  'アニメ背景（ジブリ風）':'studio ghibli style lush background',
  'アニメ背景（シンプル）':'simple clean anime background',
  'フォトリアル':'photorealistic background','水彩画風':'watercolor background',
  'ピクセルアート背景':'pixel art background','コンセプトアート風':'concept art background',
  'ゲーム背景風（RPG）':'RPG game scenery background',
  '淡い・パステル調':'soft pastel tone background','ダーク・退廃的':'dark grungy decayed background',
  // 時間帯
  '朝（日の出・早朝）':'early morning sunrise','昼（明るい）':'bright daytime',
  '夕方（ゴールデンアワー）':'golden hour sunset','夜（街の明かり）':'night city lights',
  '夜（月明かり）':'moonlit night','深夜（暗闘）':'late night darkness',
  // 天候
  '晴天':'clear blue sky','曇り':'overcast cloudy','雨':'rainy weather rain drops',
  '雪':'snowfall snowing','霧':'foggy misty','嵐':'stormy dramatic sky',
  '桜吹雪':'cherry blossom petals falling','紅葉が舞う':'autumn leaves falling',
  // 雰囲気
  '暖かく居心地いい':'warm cozy atmosphere','クールでスタイリッシュ':'cool stylish atmosphere',
  '幻想的・ファンタジー':'fantastical dreamy atmosphere','不気味・ホラー':'eerie horror atmosphere',
  'にぎやか・活気あふれる':'lively bustling atmosphere','静か・穏やか':'quiet peaceful serene',
  'ノスタルジック・懐かしい':'nostalgic retro atmosphere','近未来的・SF':'futuristic sci-fi atmosphere',
  'ロマンチック':'romantic atmosphere','荘厳・壮大':'grand majestic epic atmosphere',
  // 照明
  '自然光（窓から）':'natural light through window','暖色の室内照明':'warm indoor lighting',
  'ネオンライト':'neon lights colorful glow','キャンドル・ランプ':'candlelight warm lamp',
  '木漏れ日':'dappled sunlight through leaves','逆光（ドラマチック）':'dramatic backlit',
  '月光':'moonlight silver glow','魔法の光・粒子':'magical light particles glowing',
  // ディテール
  '家具あり（テーブル・椅子）':'with furniture table and chairs',
  '本棚・書籍':'bookshelves filled with books','植物・花':'plants and flowers',
  '食べ物・飲み物':'food and drinks on table','ポスター・絵画':'posters and paintings on wall',
  '窓から景色が見える':'scenic view through window',
  'カーテンが揺れている':'curtains swaying in breeze','猫がいる':'cat resting nearby',
  '光の粒子が舞っている':'floating light particles bokeh',
  '水面の反射':'water surface reflections','落ち葉・花びら':'scattered leaves and petals'
};
