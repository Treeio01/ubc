<?php
/**
 * THE INTERGALACTIC BUREAU OF CAT-ARCHITECTS
 * A serious institution for the design and curation of black holes by cats.
 * Single-file artifact. No forms. No tracking. Only purpose.
 */

$page = $_GET['p'] ?? 'home';
$pages = [
    'home'    => ['Манифест',   '01'],
    'catalog' => ['Каталог',    '02'],
    'oracle'  => ['Оракул',     '03'],
    'museum'  => ['Архив-Музей','04'],
    'logs'    => ['Журнал',     '05'],
];
if (!isset($pages[$page])) {
    $page = 'home';
}

// "Random" but deterministic per day, so the oracle feels mystical.
$seed   = (int) date('Ymd');
mt_srand($seed);

$prophecies = [
    'Сегодня где-то во Вселенной образуется червоточина в форме кота.',
    'Один из ваших носков уже пересёк горизонт событий. Не ищите.',
    'Космос моргнул. Это был не сон.',
    'Чёрная дыра M-87 отказывается есть овощи. Поддержите её морально.',
    'Гравитация — это просто кот, который сел на ткань пространства-времени.',
    'Сегодня вторник в трёх измерениях, четверг в одном. Готовьтесь.',
    'Ваш холодильник тихо излучает. Не паникуйте — это нормально.',
    'Где-то есть планета, целиком покрытая кошачьей шерстью. Туда не летают.',
    'Свет от далёкой звезды наконец дошёл. Звезды уже нет. Свет извиняется.',
    'Вы существуете. Это статистическое чудо. Поздравляем.',
];
$prophecyToday = $prophecies[mt_rand(0, count($prophecies) - 1)];

$bhCatalog = [
    [
        'id'         => 'BH-7741-ω',
        'name'       => 'Маркиза Бархат',
        'mass'       => '4.2 × 10³⁰ кг',
        'mood'       => 'Любопытствующая',
        'designer'   => 'Архитектор-кот Пушок III',
        'note'       => 'Поглощает только звёзды класса G. Остальные считает не своим уровнем.',
    ],
    [
        'id'         => 'BH-2025-Δ',
        'name'       => 'Уголёк-Не-Тот',
        'mass'       => '1.7 × 10³¹ кг',
        'mood'       => 'Дремлет',
        'designer'   => 'Архитектор-кот Барсик Великий',
        'note'       => 'Известна периодическим выпуском фотонов в форме клубочков.',
    ],
    [
        'id'         => 'BH-Ω-04',
        'name'       => 'Лапоня',
        'mass'       => 'непостоянная',
        'mood'       => 'Ничего личного',
        'designer'   => 'Анонимный архитектор',
        'note'       => 'Диета: одно солнце в неделю. По средам — рыбные туманности.',
    ],
    [
        'id'         => 'BH-MEW-99',
        'name'       => 'Серёжа',
        'mass'       => '8.1 × 10³² кг',
        'mood'       => 'Подозревает',
        'designer'   => 'Архитектор-кот Мурзик-Беспредел',
        'note'       => 'Не доверяет соседним галактикам. Просит не подходить ближе 100 кпк.',
    ],
    [
        'id'         => 'BH-SOFA',
        'name'       => 'Диванный',
        'mass'       => 'преимущественно — пыль',
        'mood'       => 'Теоретическая',
        'designer'   => 'Архитектор-кот Ватрушка',
        'note'       => 'Возможно, не существует. Финансирование продолжается.',
    ],
];

$logs = [
    ['2526.04.07', 'Поступила жалоба от созвездия Рыб: один из котов опять перевернул их миску.'],
    ['2526.03.31', 'Архитектор Пушок III подал заявку на расширение Млечного Пути на 4%. Отклонено.'],
    ['2526.03.18', 'Чёрная дыра «Лапоня» съела пробное Солнце. Отчёт описан как «нормально, но без энтузиазма».'],
    ['2526.02.29', 'День, которого не должно было быть. Архив рекомендует не вспоминать.'],
    ['2526.02.14', 'Все коты получили валентинки от собственных хвостов. Никто не понял, как.'],
    ['2526.01.05', 'Обнаружена планета, на которой коты — это единицы измерения времени. 1 кот = 16 минут вальяжности.'],
    ['2525.12.22', 'Архитектор Серёжа отказался выходить из коробки. Бюро признало коробку новым подразделением.'],
    ['2525.11.11', 'Гравитационная волна несла записку: «корм закончился». Источник не установлен.'],
    ['2525.10.02', 'Произведена инспекция чёрной дыры Уголёк. Обнаружено: всё в порядке. Подозрительно.'],
    ['2525.09.19', 'Внеплановое мяуканье на частоте 21 см. Радиотелескопы временно ослеплены умилением.'],
];

$asciiCats = [
    "  /\\_/\\\n ( o.o )\n  > ^ <",
    "    |\\__/,|   (`\\\n    |_ _  |.--.) )\n    ( T   )     /\n   (((^_(((/(((_/",
    "  ／l、\n（ﾟ､ ｡ ７\n  l  ~ヽ\n  じしf_,)ノ",
    "  ∧＿∧\n (｡･ω･｡)つ━☆・*。\n ⊂　 ノ 　　・゜+.\n しーＪ　 °。+ *´¨)\n              .·´¸.·*´¨) ¸.·*¨)",
    "   ／＞　 フ\n   |  _  _|\n ／` ミ＿xノ\n /　　　　 |\n/　 ヽ　　 ﾉ\n│　　|　|　|",
];

[$pageTitle, $pageNum] = $pages[$page];
$siteTitle = 'INTERGALACTIC BUREAU OF CAT-ARCHITECTS';

?><!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title><?= htmlspecialchars($pageTitle) ?> · I.B.C.A.</title>
<style>
:root{
    --paper:#F4EFE6;
    --ink:#0E0E14;
    --hot:#FF2D6F;
    --lime:#C6FF3A;
    --sky:#7FD7FF;
    --plum:#5B2A86;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--paper);color:var(--ink);font-family:'Times New Roman',serif;}
body{
    min-height:100vh;
    overflow-x:hidden;
    background-image:
        radial-gradient(circle at 12% 18%, rgba(255,45,111,.12), transparent 40%),
        radial-gradient(circle at 88% 78%, rgba(127,215,255,.18), transparent 45%);
}
a{color:inherit;text-decoration:none}
.mono{font-family:'Courier New',ui-monospace,monospace}

/* === HEADER === */
.bar{
    border-bottom:3px solid var(--ink);
    background:var(--paper);
    position:sticky;top:0;z-index:50;
    box-shadow:0 4px 0 0 var(--ink);
}
.bar-inner{
    max-width:1400px;margin:0 auto;
    display:grid;grid-template-columns:1fr auto;align-items:center;
    padding:14px 28px;gap:32px;
}
.brand{display:flex;align-items:center;gap:14px}
.brand-mark{
    width:44px;height:44px;border:3px solid var(--ink);
    display:grid;place-items:center;background:var(--lime);
    transform:rotate(-6deg);font-weight:900;font-size:20px;
    box-shadow:4px 4px 0 0 var(--ink);
}
.brand-text{font-weight:900;letter-spacing:.04em;font-size:14px;text-transform:uppercase}
.brand-text small{display:block;font-weight:400;letter-spacing:.2em;font-size:9px;opacity:.6;margin-top:2px}

nav.menu{display:flex;flex-wrap:wrap;gap:6px}
nav.menu a{
    padding:8px 14px;border:2px solid var(--ink);font-family:'Courier New',monospace;
    font-size:12px;text-transform:uppercase;letter-spacing:.08em;
    background:var(--paper);transition:transform .15s, background .15s;
    display:inline-flex;gap:8px;align-items:center;
}
nav.menu a span{font-weight:900;opacity:.4}
nav.menu a:hover{background:var(--lime);transform:translate(-2px,-2px);box-shadow:3px 3px 0 0 var(--ink)}
nav.menu a.active{background:var(--ink);color:var(--paper)}
nav.menu a.active span{color:var(--hot);opacity:1}

/* === LAYOUT === */
main{max-width:1400px;margin:0 auto;padding:48px 28px 120px}
.crumb{
    font-family:'Courier New',monospace;font-size:11px;letter-spacing:.2em;
    text-transform:uppercase;margin-bottom:18px;opacity:.6;
}
h1.huge{
    font-size:clamp(48px,9vw,140px);
    line-height:.9;font-weight:900;letter-spacing:-.02em;
    margin-bottom:24px;
}
h1.huge em{font-style:italic;color:var(--hot)}
h1.huge u{text-decoration:none;background:var(--lime);padding:0 .12em}

/* === HOME === */
.hero{
    display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:end;
    margin-bottom:80px;
}
.hero-side{
    border:3px solid var(--ink);background:var(--paper);
    padding:24px;font-family:'Courier New',monospace;font-size:13px;line-height:1.6;
    box-shadow:8px 8px 0 0 var(--ink);
    position:relative;transform:rotate(1deg);
}
.hero-side::before{
    content:'CONFIDENTIAL';position:absolute;top:-14px;left:18px;
    background:var(--hot);color:var(--paper);padding:4px 10px;
    font-weight:900;letter-spacing:.2em;font-size:10px;
}

.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:80px}
.tile{
    border:3px solid var(--ink);padding:20px;min-height:180px;
    display:flex;flex-direction:column;justify-content:space-between;
    transition:transform .2s;
}
.tile:hover{transform:translate(-3px,-3px);box-shadow:6px 6px 0 0 var(--ink)}
.tile-num{font-family:'Courier New',monospace;font-size:11px;letter-spacing:.2em;opacity:.5}
.tile-title{font-size:22px;font-weight:900;line-height:1}
.tile-desc{font-size:13px;line-height:1.5;opacity:.8}
.t1{background:var(--lime)}
.t2{background:var(--sky)}
.t3{background:var(--hot);color:var(--paper)}
.t4{background:var(--paper)}

.manifesto{
    border:3px solid var(--ink);padding:48px;background:var(--paper);
    box-shadow:12px 12px 0 0 var(--ink);
    columns:2;column-gap:48px;column-rule:1px dashed var(--ink);
    font-size:16px;line-height:1.7;
}
.manifesto h3{
    font-size:32px;font-weight:900;margin-bottom:16px;column-span:all;
    border-bottom:3px solid var(--ink);padding-bottom:12px;
}
.manifesto p{margin-bottom:14px;break-inside:avoid}
.manifesto p::first-letter{font-size:1.6em;font-weight:900;color:var(--hot);margin-right:.05em}

.floaters{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:-1}
.floaters span{
    position:absolute;font-size:48px;opacity:.18;
    animation:drift 16s linear infinite;
}
@keyframes drift{
    0%{transform:translate(0,0) rotate(0)}
    100%{transform:translate(60px,-80px) rotate(360deg)}
}

/* === CATALOG === */
.catalog{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.bh-card{
    border:3px solid var(--ink);padding:28px;background:var(--paper);
    position:relative;transition:transform .2s;
}
.bh-card:nth-child(2n){background:var(--lime)}
.bh-card:hover{transform:translate(-4px,-4px);box-shadow:8px 8px 0 0 var(--ink)}
.bh-id{
    font-family:'Courier New',monospace;font-size:11px;letter-spacing:.25em;
    background:var(--ink);color:var(--paper);padding:4px 8px;display:inline-block;
    margin-bottom:14px;
}
.bh-name{font-size:36px;font-weight:900;margin-bottom:18px;line-height:1}
.bh-meta{display:grid;grid-template-columns:auto 1fr;gap:8px 16px;font-size:14px;margin-bottom:14px}
.bh-meta dt{font-family:'Courier New',monospace;text-transform:uppercase;font-size:10px;letter-spacing:.15em;opacity:.6;align-self:center}
.bh-meta dd{font-weight:700}
.bh-note{
    border-top:1px dashed var(--ink);padding-top:14px;
    font-style:italic;font-size:14px;line-height:1.5;
}
.bh-orbit{
    position:absolute;top:18px;right:18px;width:64px;height:64px;
    border:2px solid var(--ink);border-radius:50%;
    background:radial-gradient(circle at 30% 30%, var(--ink) 0%, var(--ink) 40%, transparent 41%);
    animation:spin 9s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg)}}

/* === ORACLE === */
.oracle-stage{
    border:4px solid var(--ink);background:var(--ink);color:var(--paper);
    padding:80px 48px;text-align:center;position:relative;overflow:hidden;
    box-shadow:14px 14px 0 0 var(--hot);
}
.oracle-stage::before{
    content:'';position:absolute;inset:0;
    background:repeating-linear-gradient(45deg,transparent,transparent 18px,rgba(255,255,255,.04) 18px,rgba(255,255,255,.04) 36px);
    pointer-events:none;
}
.oracle-eye{
    width:120px;height:120px;border-radius:50%;
    background:radial-gradient(circle at 50% 50%, var(--hot) 0%, var(--hot) 28%, var(--paper) 29%, var(--paper) 60%, var(--ink) 61%);
    margin:0 auto 36px;border:4px solid var(--paper);
    animation:blink 5s infinite;
}
@keyframes blink{
    0%, 92%, 100%{transform:scaleY(1)}
    95%{transform:scaleY(.05)}
}
.oracle-label{
    font-family:'Courier New',monospace;font-size:12px;letter-spacing:.4em;
    text-transform:uppercase;margin-bottom:8px;opacity:.7;
}
.oracle-text{
    font-size:clamp(28px,4vw,48px);font-weight:900;line-height:1.2;
    max-width:900px;margin:0 auto;
}
.oracle-foot{
    font-family:'Courier New',monospace;font-size:12px;letter-spacing:.3em;
    text-transform:uppercase;margin-top:36px;opacity:.5;
}

.oracle-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:48px}
.oracle-tile{
    border:3px solid var(--ink);padding:22px;font-family:'Courier New',monospace;font-size:13px;
    background:var(--paper);min-height:140px;
}
.oracle-tile b{display:block;font-size:11px;letter-spacing:.2em;text-transform:uppercase;margin-bottom:10px;color:var(--hot)}

/* === MUSEUM === */
.museum-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.museum-card{
    border:3px solid var(--ink);padding:24px;background:var(--paper);
    box-shadow:6px 6px 0 0 var(--ink);
    display:flex;flex-direction:column;gap:14px;
}
.museum-card:nth-child(3n){background:var(--sky)}
.museum-card:nth-child(3n+1){background:var(--lime)}
.museum-card pre{
    font-family:'Courier New',monospace;font-size:14px;line-height:1.4;
    white-space:pre;overflow-x:auto;padding:12px;border:1px dashed var(--ink);
    background:var(--paper);
}
.museum-card h4{font-size:20px;font-weight:900}
.museum-card p{font-size:13px;line-height:1.5;font-style:italic}

/* === LOGS === */
.log-list{
    border:3px solid var(--ink);background:var(--paper);
    box-shadow:10px 10px 0 0 var(--ink);
    overflow:hidden;
}
.log-row{
    display:grid;grid-template-columns:160px 1fr;gap:24px;
    padding:18px 24px;border-bottom:1px dashed var(--ink);
    font-size:15px;line-height:1.5;
    transition:background .15s;
}
.log-row:last-child{border-bottom:none}
.log-row:hover{background:var(--lime)}
.log-date{font-family:'Courier New',monospace;font-size:13px;letter-spacing:.1em;opacity:.7}

/* === FOOTER === */
footer{
    border-top:3px solid var(--ink);margin-top:80px;padding:40px 28px;
    background:var(--ink);color:var(--paper);
}
footer .inner{
    max-width:1400px;margin:0 auto;
    display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap;
    font-family:'Courier New',monospace;font-size:12px;letter-spacing:.15em;text-transform:uppercase;
}
footer .blink{display:inline-block;width:10px;height:10px;background:var(--hot);border-radius:50%;animation:pulse 1.4s infinite;margin-right:8px;vertical-align:middle}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.2}}

/* === RESPONSIVE === */
@media (max-width: 900px){
    .hero{grid-template-columns:1fr}
    .tiles{grid-template-columns:repeat(2,1fr)}
    .manifesto{columns:1;padding:24px}
    .catalog{grid-template-columns:1fr}
    .oracle-grid{grid-template-columns:1fr}
    .log-row{grid-template-columns:1fr;gap:6px}
    main{padding:24px 16px 80px}
}
</style>
</head>
<body>

<header class="bar">
    <div class="bar-inner">
        <a href="?p=home" class="brand">
            <div class="brand-mark">⟁</div>
            <div class="brand-text">
                Bureau of Cat-Architects
                <small>I.B.C.A. · 2025–∞ · est. earlier than this</small>
            </div>
        </a>
        <nav class="menu">
            <?php foreach ($pages as $key => $info): ?>
                <a href="?p=<?= $key ?>" class="<?= $page === $key ? 'active' : '' ?>">
                    <span><?= $info[1] ?></span><?= htmlspecialchars($info[0]) ?>
                </a>
            <?php endforeach; ?>
        </nav>
    </div>
</header>

<main>

<?php if ($page === 'home'): ?>
    <div class="floaters" aria-hidden="true">
        <span style="left:5%;top:10%;animation-delay:0s">🪐</span>
        <span style="left:80%;top:18%;animation-delay:-3s">🛸</span>
        <span style="left:25%;top:60%;animation-delay:-6s">🐈‍⬛</span>
        <span style="left:88%;top:70%;animation-delay:-9s">✨</span>
        <span style="left:50%;top:35%;animation-delay:-12s">🌌</span>
    </div>

    <p class="crumb">Депеша № 0001 · только для своих ушей</p>
    <h1 class="huge">Мы проектируем <em>чёрные&nbsp;дыры.</em><br>Главный архитектор — <u>кот.</u></h1>

    <div class="hero">
        <div>
            <p style="font-size:20px;line-height:1.5;max-width:560px;margin-bottom:24px">
                Интергалактическое Бюро Котов-Архитекторов — это закрытое содружество хвостатых
                специалистов, которые с самого начала Вселенной занимаются проектированием
                сингулярностей, орбит и редких космических настроений.
            </p>
            <p style="font-size:16px;line-height:1.6;max-width:560px;opacity:.7">
                Здесь нет CTA, форм, сборов, обещаний кешбэка. Только космос, коты и слегка
                раздражённое осознание собственной незначительности.
            </p>
        </div>
        <aside class="hero-side">
<pre style="white-space:pre-wrap">
> SYSTEM CHECK
> antimatter levels.... NORMAL
> cat density.......... 100%
> coffee in orbit...... -1 cup
> reason to exist...... TBD
> mood................. weather-dependent
> last spotted UFO..... yesterday, near sofa
> next eclipse......... <i>уже идёт, ты не заметил</i>
</pre>
        </aside>
    </div>

    <div class="tiles">
        <a href="?p=catalog" class="tile t1">
            <span class="tile-num">02 / каталог</span>
            <div>
                <div class="tile-title">Реестр чёрных дыр</div>
                <div class="tile-desc">Имена, массы, настроения. Не кормить.</div>
            </div>
        </a>
        <a href="?p=oracle" class="tile t2">
            <span class="tile-num">03 / оракул</span>
            <div>
                <div class="tile-title">Космический прогноз</div>
                <div class="tile-desc">Одна правда в день. Возможно — ваша.</div>
            </div>
        </a>
        <a href="?p=museum" class="tile t3">
            <span class="tile-num">04 / архив</span>
            <div>
                <div class="tile-title">Галерея архитекторов</div>
                <div class="tile-desc">Портреты в формате ASCII. Без ретуши.</div>
            </div>
        </a>
        <a href="?p=logs" class="tile t4">
            <span class="tile-num">05 / журнал</span>
            <div>
                <div class="tile-title">Журнал происшествий</div>
                <div class="tile-desc">10 строк, которые никто не должен был читать.</div>
            </div>
        </a>
    </div>

    <article class="manifesto">
        <h3>Манифест Бюро (выдержки)</h3>
        <p>Мы верим, что Вселенная — это не случайность. Это один очень крупный кот, который однажды решил вытянуться.</p>
        <p>Мы признаём, что чёрные дыры — это не пустоты. Это места, куда уходят носки, шариковые ручки и причины вставать по понедельникам.</p>
        <p>Мы отказываемся быть полезными. Польза — это форма пыли. Пыль мы убираем по графику, который нам тоже не нравится.</p>
        <p>Мы не продаём. Мы не собираем. Мы не трекаем. Мы наблюдаем — но обычно не вас, а ту маленькую точку света между вашим левым плечом и потолком.</p>
        <p>Мы признаём существование вторника, но с оговорками.</p>
        <p>Мы оставляем за собой право быть неправыми. Пять раз. Подряд. До обеда.</p>
    </article>

<?php elseif ($page === 'catalog'): ?>
    <p class="crumb">Раздел 02 · Реестр действующих сингулярностей</p>
    <h1 class="huge">Каталог <em>чёрных дыр,</em><br>находящихся под <u>опекой Бюро.</u></h1>

    <p style="max-width:720px;font-size:16px;line-height:1.6;margin-bottom:48px;opacity:.8">
        Каждая запись — реальный объект, спроектированный котом-архитектором определённой школы.
        Имена даны не по астрономической номенклатуре, а по характеру. Так удобнее звать на ужин.
    </p>

    <div class="catalog">
        <?php foreach ($bhCatalog as $bh): ?>
            <article class="bh-card">
                <div class="bh-orbit"></div>
                <span class="bh-id"><?= htmlspecialchars($bh['id']) ?></span>
                <h2 class="bh-name"><?= htmlspecialchars($bh['name']) ?></h2>
                <dl class="bh-meta">
                    <dt>масса</dt><dd><?= htmlspecialchars($bh['mass']) ?></dd>
                    <dt>настроение</dt><dd><?= htmlspecialchars($bh['mood']) ?></dd>
                    <dt>архитектор</dt><dd><?= htmlspecialchars($bh['designer']) ?></dd>
                </dl>
                <p class="bh-note"><?= htmlspecialchars($bh['note']) ?></p>
            </article>
        <?php endforeach; ?>
    </div>

<?php elseif ($page === 'oracle'): ?>
    <p class="crumb">Раздел 03 · Ежедневное пророчество</p>
    <h1 class="huge">Сегодняшняя <em>правда</em><br>от <u>космического кота.</u></h1>

    <section class="oracle-stage">
        <div class="oracle-eye"></div>
        <div class="oracle-label">Оракул говорит</div>
        <p class="oracle-text">«<?= htmlspecialchars($prophecyToday) ?>»</p>
        <div class="oracle-foot">— получено <?= date('d.m.Y') ?> · подпись неразборчива</div>
    </section>

    <div class="oracle-grid">
        <div class="oracle-tile">
            <b>Условия</b>
            Пророчество обновляется один раз в сутки. Не несёт ответственности
            за сбывшееся. Особенно если оно сбылось вовремя.
        </div>
        <div class="oracle-tile">
            <b>Источник</b>
            Древний кот, известный как «Тот, Кто Знает Где Лежит Корм».
            Возраст — приблизительно 14 миллиардов лет, считая хвост.
        </div>
        <div class="oracle-tile">
            <b>Метод</b>
            Хвост подпрыгивает, фотоны кодируют, переводчик мяукает.
            Точность ±∞%. Это нормально.
        </div>
    </div>

<?php elseif ($page === 'museum'): ?>
    <p class="crumb">Раздел 04 · Архив-Музей лиц</p>
    <h1 class="huge">Архитекторы, <em>занесённые</em><br>в <u>вечный реестр.</u></h1>

    <p style="max-width:720px;font-size:16px;line-height:1.6;margin-bottom:48px;opacity:.8">
        Эти портреты были получены через щель в горизонте событий. Каждый кот
        отказался позировать, поэтому изображения сделаны строго в ASCII —
        единственном формате, на который у Бюро хватает власти.
    </p>

    <div class="museum-grid">
        <div class="museum-card">
            <h4>Архитектор Пушок III</h4>
            <pre><?= htmlspecialchars($asciiCats[0]) ?></pre>
            <p>Спроектировал 47 чёрных дыр. На пенсии. По понедельникам — мяукает.</p>
        </div>
        <div class="museum-card">
            <h4>Архитектор Барсик Великий</h4>
            <pre><?= htmlspecialchars($asciiCats[1]) ?></pre>
            <p>Известен тем, что лично перевернул горизонт событий. Никто не помнит зачем.</p>
        </div>
        <div class="museum-card">
            <h4>Архитектор Мурзик-Беспредел</h4>
            <pre><?= htmlspecialchars($asciiCats[2]) ?></pre>
            <p>Не подписывает работы. Считает подпись — слабостью. Ест. Спит. Творит.</p>
        </div>
        <div class="museum-card">
            <h4>Архитектор Ватрушка</h4>
            <pre><?= htmlspecialchars($asciiCats[3]) ?></pre>
            <p>Теоретик. Спроектировал чёрную дыру, которая, возможно, не существует.</p>
        </div>
        <div class="museum-card">
            <h4>Архитектор Серёжа</h4>
            <pre><?= htmlspecialchars($asciiCats[4]) ?></pre>
            <p>Живёт в коробке. Коробка теперь — официальное подразделение Бюро.</p>
        </div>
        <div class="museum-card">
            <h4>Анонимный архитектор</h4>
            <pre>    ?? ??
   /     \
  | (•_•) |
   \  ~  /
    `---'</pre>
            <p>Никто не видел. Все слышали. Подпись: «—».</p>
        </div>
    </div>

<?php elseif ($page === 'logs'): ?>
    <p class="crumb">Раздел 05 · Бортовой журнал · UNCLASSIFIED-ish</p>
    <h1 class="huge">Журнал <em>происшествий</em><br><u>последних эпох.</u></h1>

    <p style="max-width:720px;font-size:16px;line-height:1.6;margin-bottom:48px;opacity:.8">
        Записи ведутся хвостами котов в реальном времени. Орфография, пунктуация
        и причинно-следственные связи — на ответственности дежурного.
    </p>

    <div class="log-list">
        <?php foreach ($logs as $row): ?>
            <div class="log-row">
                <span class="log-date"><?= htmlspecialchars($row[0]) ?></span>
                <span><?= htmlspecialchars($row[1]) ?></span>
            </div>
        <?php endforeach; ?>
    </div>

    <div style="margin-top:48px;border:3px dashed var(--ink);padding:24px;font-family:'Courier New',monospace;font-size:13px;line-height:1.6">
        <b style="color:var(--hot)">// PRIMECHANIE ARHIVISTA:</b><br>
        Записи с датами после 2526.04.07 могут быть фальсифицированы. А могут и не быть.
        Архив рекомендует не углубляться. Особенно во вторник.
    </div>
<?php endif; ?>

</main>

<footer>
    <div class="inner">
        <div><span class="blink"></span> Бюро бодрствует. Хвосты в боевой готовности.</div>
        <div>I.B.C.A. · <?= date('Y') ?> · здание не имеет адреса</div>
        <div>v∞.<?= date('z') ?>.<?= date('Hi') ?></div>
    </div>
</footer>

</body>
</html>
