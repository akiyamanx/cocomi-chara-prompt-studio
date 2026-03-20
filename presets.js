// COCOMI CharaPrompt Studio (CPS) - プリセット＆データ定義 v1.0
// 三姉妹プリセット、全選択肢、英語変換マップを管理するファイル

// === 英語変換マップ（M オブジェクト） ===
const M = {
  // 頭身
  '2頭身（ちびキャラ）':'2-head-tall chibi',
  '3頭身（ゆるかわ）':'3-head-tall cute',
  '4頭身（デフォルメ）':'4-head-tall deformed',
  '5頭身（バランス）':'5-head-tall balanced',
  '6頭身（少女漫画）':'6-head-tall shoujo manga',
  '7頭身（リアル寄り）':'7-head-tall semi-realistic',
  '8頭身（モデル体型）':'8-head-tall model proportions',
  '9頭身（超スタイリッシュ）':'9-head-tall ultra stylish',
  // アートスタイル
  '日本アニメ風':'japanese anime style','ゆるかわイラスト':'cute loose illustration','水彩タッチ':'watercolor style',
  'ピクセルアート':'pixel art','3Dカートゥーン':'3D cartoon','油絵タッチ':'oil painting style',
  'ラフスケッチ':'rough sketch','フラットデザイン':'flat design','ポップアート':'pop art',
  'ちびキャラ漫画':'chibi manga','濃厚塗り（厚塗り）':'thick paint impasto','線画（ペン入れ）':'line art ink',
  // 雰囲気
  '元気・活発':'energetic cheerful','クール・無表情':'cool stoic','ふわっと穏やか':'soft gentle',
  'ミステリアス':'mysterious','お嬢様・上品':'elegant refined','やんちゃ・ボーイッシュ':'tomboyish playful',
  '天然・おっとり':'airheaded gentle','ツンデレ':'tsundere','セクシー・大人っぽい':'mature alluring',
  '無邪気・幼い':'innocent childlike','知的・クール':'intellectual cool','ダーク・退廃的':'dark decadent',
  // 性別
  '女の子（女性的）':'girl feminine','女の子（男言葉）':'girl with boyish speech','男の子（少年）':'boy youth',
  '男の子（中性的）':'androgynous boy','中性的・不明':'androgynous gender ambiguous',
  // 体型
  'スリム・細め':'slim slender','標準バランス':'average build','ぽっちゃり・丸み':'plump curvy',
  '筋肉質・アスリート':'muscular athletic','小柄・幼め':'petite small','高身長・すらっと':'tall slender',
  // バスト
  '小さめ・フラット':'flat chest','やや小さめ':'small bust','標準':'medium bust',
  'やや大きめ':'slightly large bust','大きめ':'large bust','非常に大きめ':'very large bust',
  // ウエスト
  '非常に細い':'very thin waist','細め':'slim waist','やや太め':'slightly wide waist',
  // ヒップ
  '小さめ':'small hips','やや大きめ・丸み':'slightly wide round hips','大きめ・グラマー':'wide glamorous hips',
  // 脚
  '非常に長い':'very long legs','長め':'long legs','短め・ちびっこ':'short legs',
  // 胴
  '胴が短め・脚長':'short torso long legs','胴が長め':'long torso',
  // 腰位置
  '高い（スタイル良）':'high waist stylish','低め':'low waist',
  // 髪型
  'ツインテール（高め）':'high twintails','ツインテール（低め）':'low twintails','サイドテール':'side ponytail',
  'ポニーテール（高め）':'high ponytail','ポニーテール（低め）':'low ponytail',
  'ダブルお団子':'double buns','シングルお団子':'single bun','ショートボブ':'short bob',
  '内巻きボブ':'inward curl bob','外ハネボブ':'outward flip bob','セミロング':'medium length hair',
  'ロングストレート':'long straight hair','ロングウェーブ':'long wavy hair','ふわふわカール':'fluffy curls',
  'ショート（ボーイッシュ）':'short boyish hair','ウルフカット':'wolf cut','三つ編み':'braid',
  'ダブルお下げ':'twin braids','アシメ':'asymmetrical hair','ドリルヘア':'drill hair',
  '低めひとつ結び':'low ponytail','ハーフアップ':'half up hair',
  // 前髪
  'ぱっつん前髪':'blunt bangs','流し前髪（右）':'side swept bangs right','流し前髪（左）':'side swept bangs left',
  'センター分け':'center parted bangs','ふわっとした前髪':'soft fluffy bangs','前髪なし':'no bangs',
  'かきあげ前髪':'swept back bangs','ギザギザ前髪':'jagged bangs','短めふさふさ':'short fluffy bangs',
  // 髪質
  'さらさらストレート':'silky straight','ふわふわ柔らか':'soft fluffy','くせ毛・ウェーブ':'wavy',
  'くりくりカール':'tight curls','硬め・ごわっと':'coarse stiff','濡れたような艶':'wet glossy',
  'パサつき・野性的':'dry wild',
  // 髪色
  '漆黒':'jet black hair','ダークブラウン':'dark brown hair','チョコブラウン':'chocolate brown hair',
  'ライトブラウン':'light brown hair','プラチナブロンド':'platinum blonde hair','ゴールドブロンド':'golden blonde hair',
  'シルバーグレー':'silver gray hair','純白':'pure white hair','サクラピンク':'sakura pink hair',
  'ローズピンク':'rose pink hair','ラベンダー紫':'lavender purple hair','ディープパープル':'deep purple hair',
  'スカイブルー':'sky blue hair','ネイビーブルー':'navy blue hair','エメラルドグリーン':'emerald green hair',
  'ライムグリーン':'lime green hair','オレンジレッド':'orange red hair','ルビーレッド':'ruby red hair',
  'アッシュグレー':'ash gray hair','グラデーション（複数色）':'gradient multicolor hair',
  // 目の形
  'つり目（きつめ）':'sharp upturned eyes','つり目（スッキリ）':'clean upturned eyes',
  'たれ目（ふわっと）':'soft droopy eyes','たれ目（下がり気味）':'droopy downturned eyes',
  '丸目（ぱっちり）':'round wide eyes','切れ長（大人）':'narrow mature eyes',
  '半目（眠そう）':'half-closed sleepy eyes','つぶらな瞳（小）':'small round eyes',
  '大きな瞳（少女漫画）':'large shoujo eyes','細い目（笑い目）':'thin smiling eyes',
  // 瞳色
  'ダークブラウン':'dark brown eyes','アンバー琥珀':'amber eyes','ヘーゼル':'hazel eyes',
  'エメラルドグリーン':'emerald green eyes','サファイアブルー':'sapphire blue eyes',
  'アイスブルー':'ice blue eyes','バイオレット':'violet eyes','ルビーレッド':'ruby red eyes',
  'ゴールド':'golden eyes','シルバー':'silver eyes','ピンク':'pink eyes','漆黒':'jet black eyes',
  'オッドアイ':'heterochromia','グラデーション瞳':'gradient iris',
  // 眉毛
  '細めアーチ眉':'thin arched eyebrows','太めナチュラル':'thick natural eyebrows',
  'つり眉（キリッと）':'sharp angled eyebrows','下がり眉（穏やか）':'gentle drooping eyebrows',
  '一文字眉（強め）':'straight bold eyebrows','八の字眉（困り）':'worried slanted eyebrows',
  '細くて短め':'thin short eyebrows',
  // 口
  '小さくかわいい口':'small cute mouth','ぽってり唇':'plump lips','薄い唇（クール）':'thin lips cool',
  'にっこり笑顔':'bright smile','口をすぼめた感じ':'pouty lips','八重歯あり':'fang tooth',
  '犬歯が見える笑顔':'canine smile','無表情・への字':'expressionless flat mouth',
  // 表情
  '笑顔（明るい）':'bright smile','無表情（クール）':'cool expressionless','照れ顔':'blushing shy',
  '驚き顔':'surprised face','怒り顔':'angry face','泣き顔（涙目）':'teary crying',
  'にやり（自信）':'confident smirk','困り顔':'troubled face','眠そう（半目）':'sleepy half-closed eyes',
  'ウインク':'winking',
  // 肌色
  '白磁肌（透明感）':'porcelain translucent skin','ミルク肌（明るい）':'fair milk skin',
  'ナチュラルベージュ':'natural beige skin','小麦肌（健康的）':'tan healthy skin',
  'ブロンズ肌（焼けた）':'bronze tanned skin','ダーク（深み）':'dark deep skin',
  '青白い（神秘的）':'pale mystical skin','桜肌（薄ピンク）':'light pink sakura skin',
  // 手
  '細くて繊細な指':'slender delicate fingers','標準的な手':'normal hands',
  '小さくてかわいい手':'small cute hands','長くてすらっとした指':'long elegant fingers',
  'がっしりした手':'sturdy strong hands',
  // 爪
  '短めナチュラル':'short natural nails','長めグロス仕上げ':'long glossy nails',
  'ネイルアート（カラフル）':'colorful nail art','フレンチネイル':'french manicure',
  '黒ネイル（ダーク）':'dark black nails','指定なし':'',
  // 脚
  '細くて長い脚':'long slender legs','標準的な脚':'normal legs',
  'むっちりした脚':'thick plump legs','筋肉質な脚':'muscular legs','短めでかわいい脚':'short cute legs',
  // 服装テイスト
  'セーラー服':'sailor school uniform','ブレザー制服':'blazer school uniform',
  'ふわっとワンピース':'fluffy dress','カジュアルTシャツ＋デニム':'casual t-shirt and jeans',
  'ゴシックロリータ':'gothic lolita','スポーツウェア':'sportswear','和服・着物':'japanese kimono',
  '魔法少女コスチューム':'magical girl costume','メイド服':'maid outfit',
  '騎士・鎧':'knight armor','ストリートファッション':'street fashion',
  'スーツ（クール系）':'cool business suit','ファンタジー冒険者':'fantasy adventurer outfit',
  '未来的・SF':'futuristic sci-fi outfit','ミリタリー':'military outfit',
  '水着（ビキニ）':'tasteful bikini swimsuit','水着（ワンピース型）':'one piece swimsuit',
  'ラッシュガード＋水着':'rashguard swimsuit','ビーチドレス':'beach dress',
  'パジャマ・ルームウェア':'pajamas loungewear','ドレス（フォーマル）':'formal elegant dress',
  'ミニスカート＋ニーハイ':'mini skirt with knee high socks',
  // 素材
  'コットン':'cotton fabric','シルク（光沢）':'silk glossy','デニム':'denim',
  'レース（透け感）':'lace sheer','ニット':'knit','レザー':'leather',
  'ベルベット':'velvet','オーガンジー':'organza','リネン':'linen','メッシュ・ネット素材':'mesh net',
  // 柄
  '無地':'solid color','ストライプ':'stripes','チェック':'plaid checkered',
  '水玉・ドット':'polka dots','花柄':'floral pattern','星柄':'star pattern',
  '迷彩柄':'camouflage','和柄':'japanese pattern','幾何学模様':'geometric pattern',
  'アニマル柄':'animal print','グラデーション染め':'gradient dye',
  // 服色トーン
  'パステルカラー':'pastel colors','ビビッドカラー':'vivid bright colors','モノトーン':'monochrome black white',
  'ダークトーン':'dark tones','暖色系':'warm tones','寒色系':'cool tones',
  'ナチュラル系':'natural earth tones','虹色グラデ':'rainbow gradient',
  // 靴
  '指定なし':'','ローファー':'loafers','スニーカー（白）':'white sneakers',
  'スニーカー（カラフル）':'colorful sneakers','ヒールパンプス':'high heel pumps',
  '厚底ブーツ':'platform boots','ニーハイブーツ':'knee high boots',
  'バレエシューズ':'ballet flats','サンダル':'sandals','ビーチサンダル':'flip flops','裸足':'barefoot',
  // ポーズ
  '直立（自然体）':'standing naturally','片手を挙げる':'one hand raised','両手を振る':'waving both hands',
  '腕を組む':'arms crossed','頬に手を当てる':'hand on cheek','ピースサイン':'peace sign',
  '手を後ろに組む':'hands behind back','スカートを持ち上げる':'lifting skirt hem',
  '走っている':'running','ジャンプ':'jumping','座っている（椅子）':'sitting on chair',
  '座っている（床）':'sitting on floor','寝転んでいる':'lying down','振り返り':'looking back',
  'しゃがんでいる':'crouching','戦闘ポーズ':'battle pose','魔法を放つポーズ':'casting magic',
  'ダンス中':'dancing','食事中':'eating','本を読んでいる':'reading book',
  // 動きニュアンス
  '静止・安定した':'still stable','躍動感あふれる':'dynamic action','ふわっと浮遊感':'floating ethereal',
  '風になびく':'wind blowing','スローモーション的':'slow motion','激しい動き':'intense movement',
  'しなやかな動き':'graceful fluid movement',
  // 背景
  '透明背景（PNG素材）':'transparent background','シンプル白背景':'simple white background',
  'グラデーション背景':'gradient background','桜の木の下':'under cherry blossom tree',
  '学校の教室':'school classroom','夜空・星空':'night sky starry','ファンタジーの森':'fantasy forest',
  '都市・夜景':'city night skyline','砂浜・ビーチ':'sandy beach','海（水中）':'underwater ocean',
  'カフェの中':'inside cafe','魔法陣の上':'on magic circle','和室・日本家屋':'japanese room',
  '近未来の街':'futuristic cityscape','草原・野原':'grass field meadow','雪景色':'snowy landscape',
  // 構図
  '全身正面':'full body front view','全身斜め':'full body three quarter view',
  'バストアップ':'bust up portrait','顔のアップ':'close up face','後ろ姿':'back view',
  '見下ろしアングル':'high angle looking down','見上げアングル':'low angle looking up',
  '座り姿':'sitting pose','走り姿':'running pose','振り向き':'looking back over shoulder',
  'ダイナミックアングル':'dynamic angle',
  // ライティング - 光の方向
  '正面からの光':'front lighting','斜め上から（ドラマチック）':'dramatic top side lighting',
  '逆光（シルエット）':'backlit silhouette','横からの光':'side lighting',
  '下から（ホラー的）':'under lighting horror','全体的に均一':'even flat lighting',
  // 光の種類
  '自然光・太陽光':'natural sunlight','魔法の光（オーラ）':'magical aura glow',
  'ネオン・蛍光':'neon fluorescent','キャンドル・炎の光':'candlelight flame',
  '月明かり':'moonlight','スポットライト':'spotlight','星の光（キラキラ）':'starlight sparkle',
  // 影スタイル
  'アニメ塗り（くっきり影）':'cel shading sharp shadows','グラデーション影（柔らか）':'soft gradient shadows',
  '影なし（フラット）':'flat no shadows','複雑な影（写実的）':'complex realistic shadows',
  // 実写 - レンズ
  '50mm（標準）':'50mm lens','35mm（少し広角）':'35mm lens','85mm（ポートレート）':'85mm portrait lens',
  '135mm（圧縮効果）':'135mm compression','24mm（広角）':'24mm wide angle','魚眼レンズ':'fisheye lens',
  // 絞り
  'f/1.4（超背景ボケ）':'f/1.4 shallow depth of field','f/1.8':'f/1.8 bokeh',
  'f/2.8':'f/2.8','f/5.6':'f/5.6','f/11（パンフォーカス）':'f/11 deep focus',
  // 照明スタジオ
  '自然光（窓際）':'natural window light','ソフトボックス':'softbox lighting',
  'レンブラント照明':'rembrandt lighting','バックライト＋リムライト':'backlight rim light',
  'ゴールデンアワー':'golden hour','ブルーアワー':'blue hour',
  'スタジオストロボ':'studio strobe flash','屋外自然光':'outdoor natural light','曇り空':'overcast light',
  // 肌質感
  '磁器のような肌':'porcelain smooth skin','自然なポア・毛穴感':'natural pore texture',
  'つやつや（グロス）':'glossy dewy skin','マット肌':'matte skin',
  '日焼け肌':'sun-kissed skin','健康的な自然肌':'healthy natural skin',
  // メイク
  'すっぴん・ナチュラル':'no makeup natural','BBクリーム程度':'light BB cream',
  'ナチュラルメイク':'natural makeup','グラマラスメイク':'glamorous full makeup',
  'スモーキーアイ':'smoky eye makeup','韓国コスメ風':'korean beauty makeup',
  'ゴシック・ダークメイク':'gothic dark makeup','カラフルメイク':'colorful creative makeup',
  // 撮影ロケーション
  '白バックスタジオ':'white backdrop studio','グレーバックスタジオ':'gray backdrop studio',
  '屋外（都市・路地）':'outdoor urban alley','カフェ':'cafe setting',
  '砂浜・海辺':'beach seaside','森・自然':'forest nature','和室':'japanese room',
  '屋上':'rooftop','花畑':'flower field','雨の日':'rainy day',
  // 写真雰囲気
  'ハイキー':'high key bright','ローキー':'low key dark','映画的（シネマティック）':'cinematic',
  'ヴィンテージ・フィルム風':'vintage film','クリアでシャープ':'clear sharp',
  'モノクロ':'monochrome black and white','ファッション誌風':'fashion magazine editorial',
  // リアリティ
  '超写実的（実在する人物レベル）':'hyperrealistic photorealistic','ハイパーリアル':'hyper-realistic',
  'フォトリアル':'photorealistic','CGリアル':'CG realistic'
};

// === アクセサリータグ ===
const ACCESSORY_TAGS = [
  'チョーカー','細めネックレス','重ねづけネックレス','宝石ペンダント','クロスネックレス',
  '小粒ピアス','フープピアス','ドロップイヤリング','イヤークリップ',
  'シンプルリング','宝石リング','複数リング','ブレスレット','バングル','アンクレット',
  '手袋（白）','手袋（黒革）','レースグローブ',
  'リボン（頭）','リボン（首元）','ヘアピン','お花ヘア飾り','ティアラ・クラウン','カチューシャ',
  '眼鏡（丸め）','眼鏡（四角め）','サングラス','帽子（ハット）','ベレー帽',
  'マフラー・スカーフ','小さいバッグ','ショルダーバッグ','リュック',
  'ニーハイソックス','網タイツ','レッグウォーマー','アームウォーマー',
  'ケープ・マント','しっぽアクセ','羽根（ウィング）'
];
// アクセサリー英語変換
const ACCESSORY_EN = {
  'チョーカー':'choker','細めネックレス':'thin necklace','重ねづけネックレス':'layered necklaces',
  '宝石ペンダント':'gemstone pendant','クロスネックレス':'cross necklace',
  '小粒ピアス':'small stud earrings','フープピアス':'hoop earrings',
  'ドロップイヤリング':'drop earrings','イヤークリップ':'ear clips',
  'シンプルリング':'simple ring','宝石リング':'gemstone ring','複数リング':'multiple rings',
  'ブレスレット':'bracelet','バングル':'bangle','アンクレット':'anklet',
  '手袋（白）':'white gloves','手袋（黒革）':'black leather gloves','レースグローブ':'lace gloves',
  'リボン（頭）':'hair ribbon','リボン（首元）':'neck ribbon','ヘアピン':'hair pin',
  'お花ヘア飾り':'flower hair ornament','ティアラ・クラウン':'tiara crown','カチューシャ':'headband',
  '眼鏡（丸め）':'round glasses','眼鏡（四角め）':'rectangular glasses','サングラス':'sunglasses',
  '帽子（ハット）':'hat','ベレー帽':'beret','マフラー・スカーフ':'scarf muffler',
  '小さいバッグ':'small bag','ショルダーバッグ':'shoulder bag','リュック':'backpack',
  'ニーハイソックス':'knee high socks','網タイツ':'fishnet tights',
  'レッグウォーマー':'leg warmers','アームウォーマー':'arm warmers',
  'ケープ・マント':'cape cloak','しっぽアクセ':'tail accessory','羽根（ウィング）':'wings'
};

// === チャームポイントタグ ===
const CHARM_TAGS = [
  'アホ毛','ほくろ','そばかす','星瞳','ハート瞳','オッドアイ','猫耳','しっぽ',
  '小さい角','尖り耳','触角ヘア','牙','包帯','眼帯','頬ステッカー','ほっぺ赤み',
  'えくぼ','涙目','片目隠れ','もふもふ髪','長まつ毛','汗しずく','編み込み'
];
const CHARM_EN = {
  'アホ毛':'ahoge cowlick','ほくろ':'beauty mark mole','そばかす':'freckles',
  '星瞳':'star-shaped pupils','ハート瞳':'heart-shaped pupils','オッドアイ':'heterochromia',
  '猫耳':'cat ears','しっぽ':'tail','小さい角':'small horns','尖り耳':'pointed ears',
  '触角ヘア':'antenna hair','牙':'fangs','包帯':'bandages','眼帯':'eyepatch',
  '頬ステッカー':'cheek sticker','ほっぺ赤み':'rosy cheeks','えくぼ':'dimples',
  '涙目':'teary eyes','片目隠れ':'hair over one eye','もふもふ髪':'fluffy voluminous hair',
  '長まつ毛':'long eyelashes','汗しずく':'sweat drop','編み込み':'braided detail'
};

// === セクション定義（UI生成用） ===
const SECTIONS = {
  basic: {
    label: '基本スタイル',
    fields: [
      { key:'headRatio', label:'頭身', opts:['2頭身（ちびキャラ）','3頭身（ゆるかわ）','4頭身（デフォルメ）','5頭身（バランス）','6頭身（少女漫画）','7頭身（リアル寄り）','8頭身（モデル体型）','9頭身（超スタイリッシュ）']},
      { key:'artStyle', label:'アートスタイル', opts:['日本アニメ風','ゆるかわイラスト','水彩タッチ','ピクセルアート','3Dカートゥーン','油絵タッチ','ラフスケッチ','フラットデザイン','ポップアート','ちびキャラ漫画','濃厚塗り（厚塗り）','線画（ペン入れ）']},
      { key:'vibe', label:'全体の雰囲気', opts:['元気・活発','クール・無表情','ふわっと穏やか','ミステリアス','お嬢様・上品','やんちゃ・ボーイッシュ','天然・おっとり','ツンデレ','セクシー・大人っぽい','無邪気・幼い','知的・クール','ダーク・退廃的']},
      { key:'gender', label:'性別', opts:['女の子（女性的）','女の子（男言葉）','男の子（少年）','男の子（中性的）','中性的・不明']}
    ]
  },
  proportion: {
    label: 'プロポーション・体型',
    fields: [
      { key:'bodyType', label:'全体の体型', opts:['スリム・細め','標準バランス','ぽっちゃり・丸み','筋肉質・アスリート','小柄・幼め','高身長・すらっと']},
      { key:'bust', label:'バスト', opts:['小さめ・フラット','やや小さめ','標準','やや大きめ','大きめ','非常に大きめ']},
      { key:'waist', label:'ウエスト', opts:['非常に細い','細め','標準','やや太め']},
      { key:'hip', label:'ヒップ', opts:['小さめ','標準','やや大きめ・丸み','大きめ・グラマー']},
      { key:'legLen', label:'脚の長さ', opts:['非常に長い','長め','標準','短め・ちびっこ']},
      { key:'torsoLen', label:'胴体の長さ', opts:['胴が短め・脚長','標準','胴が長め']},
      { key:'waistPos', label:'腰の位置', opts:['高い（スタイル良）','標準','低め']}
    ]
  },
  hair: {
    label: '髪型・髪質',
    fields: [
      { key:'hairStyle', label:'髪型', opts:['ツインテール（高め）','ツインテール（低め）','サイドテール','ポニーテール（高め）','ポニーテール（低め）','ダブルお団子','シングルお団子','ショートボブ','内巻きボブ','外ハネボブ','セミロング','ロングストレート','ロングウェーブ','ふわふわカール','ショート（ボーイッシュ）','ウルフカット','三つ編み','ダブルお下げ','アシメ','ドリルヘア','低めひとつ結び','ハーフアップ']},
      { key:'bangs', label:'前髪', opts:['ぱっつん前髪','流し前髪（右）','流し前髪（左）','センター分け','ふわっとした前髪','前髪なし','かきあげ前髪','ギザギザ前髪','短めふさふさ']},
      { key:'hairTexture', label:'髪の質感', opts:['さらさらストレート','ふわふわ柔らか','くせ毛・ウェーブ','くりくりカール','硬め・ごわっと','濡れたような艶','パサつき・野性的']},
      { key:'hairColor', label:'髪色', opts:['漆黒','ダークブラウン','チョコブラウン','ライトブラウン','プラチナブロンド','ゴールドブロンド','シルバーグレー','純白','サクラピンク','ローズピンク','ラベンダー紫','ディープパープル','スカイブルー','ネイビーブルー','エメラルドグリーン','ライムグリーン','オレンジレッド','ルビーレッド','アッシュグレー','グラデーション（複数色）']}
    ]
  },
  face: {
    label: '目・顔パーツ',
    fields: [
      { key:'eyeShape', label:'目の形', opts:['つり目（きつめ）','つり目（スッキリ）','たれ目（ふわっと）','たれ目（下がり気味）','丸目（ぱっちり）','切れ長（大人）','半目（眠そう）','つぶらな瞳（小）','大きな瞳（少女漫画）','細い目（笑い目）']},
      { key:'eyeColor', label:'瞳の色', opts:['ダークブラウン','アンバー琥珀','ヘーゼル','エメラルドグリーン','サファイアブルー','アイスブルー','バイオレット','ルビーレッド','ゴールド','シルバー','ピンク','漆黒','オッドアイ','グラデーション瞳']},
      { key:'eyebrow', label:'眉毛', opts:['細めアーチ眉','太めナチュラル','つり眉（キリッと）','下がり眉（穏やか）','一文字眉（強め）','八の字眉（困り）','細くて短め']},
      { key:'mouth', label:'口・唇', opts:['小さくかわいい口','ぽってり唇','薄い唇（クール）','にっこり笑顔','口をすぼめた感じ','八重歯あり','犬歯が見える笑顔','無表情・への字']},
      { key:'expression', label:'表情', opts:['笑顔（明るい）','無表情（クール）','照れ顔','驚き顔','怒り顔','泣き顔（涙目）','にやり（自信）','困り顔','眠そう（半目）','ウインク']}
    ]
  },
  skin: {
    label: '肌・体のパーツ',
    fields: [
      { key:'skinColor', label:'肌色', opts:['白磁肌（透明感）','ミルク肌（明るい）','ナチュラルベージュ','小麦肌（健康的）','ブロンズ肌（焼けた）','ダーク（深み）','青白い（神秘的）','桜肌（薄ピンク）']},
      { key:'hands', label:'手・指', opts:['細くて繊細な指','標準的な手','小さくてかわいい手','長くてすらっとした指','がっしりした手']},
      { key:'nails', label:'爪', opts:['短めナチュラル','長めグロス仕上げ','ネイルアート（カラフル）','フレンチネイル','黒ネイル（ダーク）','指定なし']},
      { key:'legs', label:'脚・足首', opts:['細くて長い脚','標準的な脚','むっちりした脚','筋肉質な脚','短めでかわいい脚']}
    ]
  },
  fashion: {
    label: 'ファッション',
    fields: [
      { key:'outfit', label:'服装テイスト', opts:['セーラー服','ブレザー制服','ふわっとワンピース','カジュアルTシャツ＋デニム','ゴシックロリータ','スポーツウェア','和服・着物','魔法少女コスチューム','メイド服','騎士・鎧','ストリートファッション','スーツ（クール系）','ファンタジー冒険者','未来的・SF','ミリタリー','水着（ビキニ）','水着（ワンピース型）','ラッシュガード＋水着','ビーチドレス','パジャマ・ルームウェア','ドレス（フォーマル）','ミニスカート＋ニーハイ']},
      { key:'material', label:'素材感', opts:['コットン','シルク（光沢）','デニム','レース（透け感）','ニット','レザー','ベルベット','オーガンジー','リネン','メッシュ・ネット素材']},
      { key:'pattern', label:'柄・プリント', opts:['無地','ストライプ','チェック','水玉・ドット','花柄','星柄','迷彩柄','和柄','幾何学模様','アニマル柄','グラデーション染め']},
      { key:'colorTone', label:'服の色トーン', opts:['パステルカラー','ビビッドカラー','モノトーン','ダークトーン','暖色系','寒色系','ナチュラル系','虹色グラデ']},
      { key:'shoes', label:'靴', opts:['指定なし','ローファー','スニーカー（白）','スニーカー（カラフル）','ヒールパンプス','厚底ブーツ','ニーハイブーツ','バレエシューズ','サンダル','ビーチサンダル','裸足']}
    ]
  },
  pose: {
    label: 'ポーズ・動き',
    fields: [
      { key:'pose', label:'ポーズ', opts:['直立（自然体）','片手を挙げる','両手を振る','腕を組む','頬に手を当てる','ピースサイン','手を後ろに組む','スカートを持ち上げる','走っている','ジャンプ','座っている（椅子）','座っている（床）','寝転んでいる','振り返り','しゃがんでいる','戦闘ポーズ','魔法を放つポーズ','ダンス中','食事中','本を読んでいる']},
      { key:'motion', label:'動きのニュアンス', opts:['静止・安定した','躍動感あふれる','ふわっと浮遊感','風になびく','スローモーション的','激しい動き','しなやかな動き']}
    ]
  },
  background: {
    label: '背景・構図',
    fields: [
      { key:'bg', label:'背景', opts:['透明背景（PNG素材）','シンプル白背景','グラデーション背景','桜の木の下','学校の教室','夜空・星空','ファンタジーの森','都市・夜景','砂浜・ビーチ','海（水中）','カフェの中','魔法陣の上','和室・日本家屋','近未来の街','草原・野原','雪景色']},
      { key:'angle', label:'構図・アングル', opts:['全身正面','全身斜め','バストアップ','顔のアップ','後ろ姿','見下ろしアングル','見上げアングル','座り姿','走り姿','振り向き','ダイナミックアングル']}
    ]
  },
  lighting: {
    label: 'ライティング',
    modeOnly: 'anime',
    fields: [
      { key:'lightDir', label:'光の方向', opts:['正面からの光','斜め上から（ドラマチック）','逆光（シルエット）','横からの光','下から（ホラー的）','全体的に均一']},
      { key:'lightType', label:'光の種類', opts:['自然光・太陽光','魔法の光（オーラ）','ネオン・蛍光','キャンドル・炎の光','月明かり','スポットライト','星の光（キラキラ）']},
      { key:'shadowStyle', label:'影のスタイル', opts:['アニメ塗り（くっきり影）','グラデーション影（柔らか）','影なし（フラット）','複雑な影（写実的）']}
    ]
  },
  camera: {
    label: '実写モード設定',
    modeOnly: 'photo',
    fields: [
      { key:'lens', label:'カメラレンズ', opts:['50mm（標準）','35mm（少し広角）','85mm（ポートレート）','135mm（圧縮効果）','24mm（広角）','魚眼レンズ']},
      { key:'aperture', label:'絞り・ボケ', opts:['f/1.4（超背景ボケ）','f/1.8','f/2.8','f/5.6','f/11（パンフォーカス）']},
      { key:'studioLight', label:'照明スタジオ設定', opts:['自然光（窓際）','ソフトボックス','レンブラント照明','バックライト＋リムライト','ゴールデンアワー','ブルーアワー','スタジオストロボ','屋外自然光','曇り空']},
      { key:'skinTexture', label:'肌の質感', opts:['磁器のような肌','自然なポア・毛穴感','つやつや（グロス）','マット肌','日焼け肌','健康的な自然肌']},
      { key:'makeup', label:'メイク詳細', opts:['すっぴん・ナチュラル','BBクリーム程度','ナチュラルメイク','グラマラスメイク','スモーキーアイ','韓国コスメ風','ゴシック・ダークメイク','カラフルメイク']},
      { key:'location', label:'撮影ロケーション', opts:['白バックスタジオ','グレーバックスタジオ','屋外（都市・路地）','カフェ','砂浜・海辺','森・自然','和室','屋上','花畑','雨の日']},
      { key:'photoVibe', label:'写真の雰囲気', opts:['ハイキー','ローキー','映画的（シネマティック）','ヴィンテージ・フィルム風','クリアでシャープ','モノクロ','ファッション誌風']},
      { key:'realityLv', label:'リアリティレベル', opts:['超写実的（実在する人物レベル）','ハイパーリアル','フォトリアル','CGリアル']}
    ]
  }
};

// === 三姉妹プリセット ===
const PRESETS = {
  cocomi: {
    name: 'ここちゃん',
    values: {
      headRatio:'5頭身（バランス）', artStyle:'日本アニメ風', vibe:'元気・活発',
      gender:'女の子（女性的）', bodyType:'小柄・幼め', bust:'やや小さめ',
      waist:'標準', hip:'標準', legLen:'標準', torsoLen:'標準', waistPos:'標準',
      hairStyle:'ツインテール（高め）', bangs:'ふわっとした前髪',
      hairTexture:'ふわふわ柔らか', hairColor:'スカイブルー',
      eyeShape:'丸目（ぱっちり）', eyeColor:'エメラルドグリーン',
      eyebrow:'太めナチュラル', mouth:'にっこり笑顔', expression:'笑顔（明るい）',
      skinColor:'ミルク肌（明るい）', hands:'小さくてかわいい手',
      nails:'短めナチュラル', legs:'標準的な脚',
      outfit:'魔法少女コスチューム', material:'コットン', pattern:'星柄',
      colorTone:'ビビッドカラー', shoes:'スニーカー（白）',
      pose:'ピースサイン', motion:'躍動感あふれる',
      bg:'グラデーション背景', angle:'全身正面',
      lightDir:'正面からの光', lightType:'魔法の光（オーラ）',
      shadowStyle:'アニメ塗り（くっきり影）'
    },
    accessories: [],
    charms: ['アホ毛','星瞳','ほっぺ赤み']
  },
  oneechan: {
    name: 'お姉ちゃん',
    values: {
      headRatio:'7頭身（リアル寄り）', artStyle:'日本アニメ風', vibe:'クール・無表情',
      gender:'女の子（女性的）', bodyType:'高身長・すらっと', bust:'標準',
      waist:'細め', hip:'標準', legLen:'長め', torsoLen:'標準', waistPos:'高い（スタイル良）',
      hairStyle:'ロングストレート', bangs:'流し前髪（右）',
      hairTexture:'さらさらストレート', hairColor:'純白',
      eyeShape:'切れ長（大人）', eyeColor:'アイスブルー',
      eyebrow:'細めアーチ眉', mouth:'薄い唇（クール）', expression:'無表情（クール）',
      skinColor:'白磁肌（透明感）', hands:'長くてすらっとした指',
      nails:'フレンチネイル', legs:'細くて長い脚',
      outfit:'スーツ（クール系）', material:'シルク（光沢）', pattern:'無地',
      colorTone:'モノトーン', shoes:'ヒールパンプス',
      pose:'腕を組む', motion:'静止・安定した',
      bg:'シンプル白背景', angle:'全身斜め',
      lightDir:'斜め上から（ドラマチック）', lightType:'スポットライト',
      shadowStyle:'グラデーション影（柔らか）'
    },
    accessories: [],
    charms: ['片目隠れ','長まつ毛']
  },
  kuro: {
    name: 'クロちゃん',
    values: {
      headRatio:'6頭身（少女漫画）', artStyle:'日本アニメ風', vibe:'ミステリアス',
      gender:'女の子（男言葉）', bodyType:'標準バランス', bust:'やや小さめ',
      waist:'細め', hip:'標準', legLen:'標準', torsoLen:'標準', waistPos:'標準',
      hairStyle:'セミロング', bangs:'ギザギザ前髪',
      hairTexture:'ふわふわ柔らか', hairColor:'ディープパープル',
      eyeShape:'たれ目（ふわっと）', eyeColor:'バイオレット',
      eyebrow:'下がり眉（穏やか）', mouth:'小さくかわいい口', expression:'にやり（自信）',
      skinColor:'白磁肌（透明感）', hands:'細くて繊細な指',
      nails:'黒ネイル（ダーク）', legs:'標準的な脚',
      outfit:'ゴシックロリータ', material:'ベルベット', pattern:'無地',
      colorTone:'ダークトーン', shoes:'厚底ブーツ',
      pose:'頬に手を当てる', motion:'しなやかな動き',
      bg:'夜空・星空', angle:'バストアップ',
      lightDir:'横からの光', lightType:'月明かり',
      shadowStyle:'グラデーション影（柔らか）'
    },
    accessories: [],
    charms: ['オッドアイ','ほくろ','触角ヘア']
  }
};

