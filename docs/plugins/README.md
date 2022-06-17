# @molfar/scanary. Плагіни

## Plugins


<dl>
<dt><a href="#module_cherrio">cheerio-plugin</a></dt>
<dd></dd>
<dt><a href="#module_js">js-plugin</a></dt>
<dd></dd>
<dt><a href="#module_pdf">pdf-plugin</a></dt>
<dd></dd>
<dt><a href="#module_docx">docx-plugin</a></dt>
<dd></dd>
<dt><a href="#module_xlsx">xlsx-plugin</a></dt>

<dt><a href="#module_file">file-plugin</a></dt>
<dd></dd>
<dt><a href="#module_mongodb">mongodb-plugin</a></dt>
<dd></dd>
<dt><a href="#module_mysql">mysql-plugin</a></dt>
<dd></dd>
<dt><a href="#module_transform">transform-plugin</a></dt>
<dd></dd>
<dt><a href="#module_rss">rss-plugin</a></dt>
<dd></dd>
<dt><a href="#module_puppeteer">puppeteer-plugin</a></dt>
<dd></dd>
<dt><a href="#module_axios">axios-plugin</a></dt>
<dd></dd>
<dt><a href="#module_core">core-plugin</a></dt>
<dd></dd>
<dt><a href="#module_cast">cast-plugin</a></dt>
<dd></dd>
</dl>

## cheerio-plugin

<a name="module_cherrio"></a>

Використовується для скраппінгу html-сторінок, за допомогою npm-пакету `cherrio`
### Functions

* [engineCheerio](#module_cherrio+engineCheerio)
* [load](#module_cherrio+load)
* [once](#module_cherrio+once)
* [all](#module_cherrio+all)
* [nodeText](#module_cherrio+nodeText)
* [nodeHtml](#module_cherrio+nodeHtml)
* [nodeClasses](#module_cherrio+nodeClasses)
* [nodeAttributes](#module_cherrio+nodeAttributes)

<a name="module_cherrio+engineCheerio"></a>

#### engineCheerio
функція для використання в cherrio переданної команди

*Rules*: `cheerio`

| Param | Description |
| --- | --- |
| command | метод cherrio |
| context | контекст виконання |

<a name="module_cherrio+load"></a>

#### load

Завантажує передані значення за допомогою `cherrio.load()`

*Rules*:`["load","html->page","html->$","transform.html->page","transform.html->$",
"cheerio.load","cheerio.html->page","cheerio.html->$",
"cheerio.transform.html->page","cheerio.transform.html->$"]`

| Param | Description |
| --- | --- |
| command | метод cherrio |
| context | контекст виконання |
| value | значення для завантаження |

<a name="module_cherrio+once"></a>

#### once 
Отримує html сторінку, та віддає потрібні поля, які задав юзер, в вигляді об'єкту

*Rules*: `["once", "cheerio.once", "$.once"]`

| Param | Description |
| --- | --- |
| command | метод cherrio |
| context | контекст виконання |

<a name="module_cherrio+all"></a>

#### all

Отримує html сторінку, та віддає всі дані, 
які є в цій html сторінці в вигляді масиву

*Rules*: `["all", "cheerio.all", "$.all"]`

| Param | Description |
| --- | --- |
| command | метод cherrio |
| context | контекст виконання |

<a name="module_cherrio+nodeText"></a>

#### nodeText
Вставляє текст в передане місце `value`

*Rules*: `["text","$.text"]`

| Param | Description |
| --- | --- |
| command | метод cherrio |
| context | контекст виконання |
| value | значення куди потрібно вставити текст |

<a name="module_cherrio+nodeHtml"></a>

#### nodeHtml

Відділяє елемент від `parent` та віддає його
*Rules*:` [
"html",
"$.html"
]`

| Param | Description |
| --- | --- |
| command | метод cherrio |
| context | контекст виконання |
| value | елемент, який потрібно відділити |

<a name="module_cherrio+nodeClasses"></a>

#### nodeClasses
Відділяє назви класів елемента

*Rules*:` [
"class","classes",
"$.class", "$.classes"
]`

| Param | Description |
| --- | --- |
| command | метод cherrio |
| context | контекст виконання |
| value | елемент, в його потрібно отримати класи |

<a name="module_cherrio+nodeAttributes"></a>

#### nodeAttributes
Отримає з елемента, передані атрибути

*Rules*: `[
"attributes",
"$.attributes"
]`

| Param | Description |
| --- | --- |
| command | метод cherrio |
| context | контекст виконання |
| value | елемент та атрибути, які потрібно отримати|

## js-plugin

<a name="module_js"></a>
Плагін для виконання js-скрипту
### Functions
* [engineCheerio](#module_js+engineJs)

<a name="module_js+engineJs"></a>

#### engineJs

Виконує переданий скрипт за допомогою функції `eval`

*Rules*:`js`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |
| value | скрипт для виконання |

## pdf-plugin

<a name="module_pdf"></a>
Плагін для обробки pdf-файлів
### Functions
* [pdf](#module_pdf+_pdf)
* [pdf2js](#module_pdf+pdf2js)

<a name="module_pdf+_pdf"></a>

#### _pdf

передоводить pdf-файл, який береться за шляхом, в json та може передати атрибути, які визначені в `command`

*Rules*: `pdf`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |


<a name="module_pdf+pdf2js"></a>

#### pdf2js

Передоводить буффер pdf-файлу в json

*Rules*: `["pdf->js","transform.pdf->js"]`


| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |
| value | буффер pdf-файлу |

## docx-plugin

<a name="module_docx"></a>
Плагін для обробки  docx-файлів
### Functions
* [docx](#module_docx+docx)
* [docx2js](#module_docx+docx2js)
<a name="module_docx+docx"></a>

#### docx

передоводить docx-файл, який береться за шляхом, в json та може передати атрибути, які визначені в `command`

*Rules*:`docx`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |

<a name="module_docx+docx2js"></a>

#### docx2js

Передоводить буффер docx-файлу в json

*Rules*: `["docx->js","transform.docx->js"]`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |
| value | буффер docx-файлу |

## xlsx-plugin

<a name="module_xlsx"></a>
Плагін для обробки xlsx-файлів
### Functions
* [_xlsx](#module_xlsx+_xlsx)
* [xlsx2js](#module_xlsx+xlsx2js)
<a name="module_xlsx+_xlsx"></a>

#### _xlsx

передоводить xlsx-файл, який береться за шляхом, в json та може передати атрибути, які визначені в `command`


*Rules*: `xlsx`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |

<a name="module_xlsx+xlsx2js"></a>

#### xlsx2js

Передоводить буффер xlsx-файлу в json

*Rules*: `["xlsx->js","transform.xlsx->js"]`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |
| value | буффер xlsx-файлу |

## file-plugin

<a name="module_file"></a>
Плагін для роботи з файлами
### Functions
* [file](#module_file+file)

<a name="module_file+file"></a>

#### file

передоводить файл, який береться за шляхом, в json та може передати атрибути, які визначені в `command`

*Rules*: `file`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |

## mongodb-plugin

<a name="module_mongodb"></a>
Плагін для роботи з mongodb
### Functions
* [engineMongo](#module_mongodb+engineMongo)
* [listCollections](#module_mongodb+listCollections)
* [aggregate](#module_mongodb+aggregate)
* [find](#module_mongodb+find)
<a name="module_mongodb+engineMongo"></a>

#### engineMongo
отримання підключення до mongodb, яке виконується за uri, яке передається через `command`

*Rules*: `mongo`

| Param | Description |
| --- | --- |
| command | {options.uri} - посилання на підключення до mongodb|
| context | контекст виконання |

<a name="module_mongodb+listCollections"></a>

#### listCollections

Отримання всіх колекції з mongodb, підключення якої передається через `command`

*Rules*: `["collections","mongo.collections"]`

| Param | Description |
| --- | --- |
| command | {db} - підключення до mongodb |
| context | контекст виконання |

<a name="module_mongodb+aggregate"></a>

#### aggregate
Виконує запит агрегації в mongodb. підключення, колекції та сам запит передаються через `command`

*Rules*: `["aggregate","mongo.aggregate"]`

| Param | Description |
| --- | --- |
| command | {db} - підключення до mongodb {collections} - колекції mongodb  {query} - запит агрегації до mongodb   
| context | контекст виконання |

<a name="module_mongodb+find"></a>

#### find

Виконує запит пошуку в mongodb. підключення, колекції, проєкт та сам запит передаються через `command`

*Rules*: `["find","mongo.find"]`

| Param | Description |
| --- | --- |
| command | {db} - підключення до mongodb {collections} - колекції mongodb {project} - projection в тілі запиту {query} - запит агрегації до mongodb
| context | контекст виконання |

## mysql-plugin

<a name="module_mysql"></a>
Плагін для роботи з mysql
### Functions
* [engineMysql](#module_mysql+engineMysql)
* [execute](#module_mysql+execute)

<a name="module_mysql+engineMysql"></a>

#### engineMysql
отримання підключення до mysql, яке виконується за options, яке передається через `command`


*Rules*:`mysql`

| Param | Description |
| --- | --- |
| command | {options} - підключення до mysql|
| context | контекст виконання |


<a name="module_mysql+execute"></a>

#### execute

Виконує sql запит до mysql, який передається через `command`

*Rules*: `execute`

| Param | Description |
| --- | --- |
| command | {sql} - sql-запит до mysql|
| context | контекст виконання |

## transform-plugin

<a name="module_transform"></a>
Плагін, який переводить `yaml`, `csv`, `xml`, формати в `json` і навпаки
### Functions
* [JSONtoXML](#module_transform+JSONtoXML)
* [XMLtoJSON](#module_transform+XMLtoJSON)
* [YAMLtoJSON](#module_transform+YAMLtoJSON)
* [JSONtoYAML](#module_transform+JSONtoYAML)
* [CSVtoJSON](#module_transform+CSVtoJSON)
* [JSONtoCSV](#module_transform+JSONtoCSV)

<a name="module_transform+JSONtoXML"></a>

#### JSONtoXML
Переводить JSON в XML за допомогою npm-пакету `xml2js`

*Rules*:`["js->xml","transform.js->xml"]`

| Param | Description |
| --- | --- |
| command | {options} - налаштування до переведення даних |
| context | контекст виконання |
| value | дані, для переведення |


<a name="module_transform+XMLtoJSON"></a>

#### XMLtoJSON

Переводить XML  в JSON за допомогою npm-пакету `xml2js`

*Rules*:`["xml->js","transform.xml->js"]`

| Param | Description |
| --- | --- |
| command | {options} - налаштування до переведення даних |
| context | контекст виконання |
| value | дані, для переведення |

<a name="module_transform+YAMLtoJSON"></a>

#### YAMLtoJSON
Переводить YAML в JSON за допомогою npm-пакету `YAML`

*Rules*:`["yaml->js","transform.yaml->js"]`

| Param | Description |
| --- | --- |
| command | {options} - налаштування до переведення даних |
| context | контекст виконання |
| value | дані, для переведення |

<a name="module_transform+JSONtoYAML"></a>

#### JSONtoYAML

Переводить JSON в YAML за допомогою npm-пакету `YAML`

*Rules*:`["js->yaml","transform.js->yaml"]`

| Param | Description |
| --- | --- |
| command | {options} - налаштування до переведення даних |
| context | контекст виконання |
| value | дані, для переведення |

<a name="module_transform+CSVtoJSON"></a>

#### CSVtoJSON
Переводить CSV в JSON за допомогою npm-пакету `csvjson`

*Rules*: `["csv->js", "transform.csv->js"]`

| Param | Description |
| --- | --- |
| command | {options} - налаштування до переведення даних |
| context | контекст виконання |
| value | дані, для переведення |

<a name="module_transform+JSONtoCSV"></a>

#### JSONtoCSV
Переводить JSON в CSV за допомогою npm-пакету `json2csv`

*Rules*: `["js->csv", "transform.js->csv"]`

| Param | Description |
| --- | --- |
| command | {options} - налаштування до переведення даних |
| context | контекст виконання |
| value | дані, для переведення |

## rss-plugin

<a name="module_rss"></a>

Плагін для парсингу даних rss-формату

### Functions
* [rss](#module_rss+rss)
* [transform](#module_rss+transform)

<a name="module_rss+rss"></a>

#### rss
парсить дані rss-формату за посиланням, яке передається через `command`

*Rules*:`rss`

| Param | Description |
| --- | --- |
| command | {url} - посилання на дані для парсингу|
| context | контекст виконання |



<a name="module_rss+transform"></a>

#### transform

Переводить rss дані в `string`

*Rules*:`["rss->js","transform.rss->js"]`

| Param | Description |
| --- | --- |
| command | {options} - налаштування до переведення даних |
| context | контекст виконання |
| value | дані, для переведення |

## puppeteer-plugin

<a name="module_puppeteer"></a>
Плагін для web-скраппінгу на базі використання npm-пакету `puppeteer`
### Functions
* [pageUrl](#module_puppeteer+pageUrl)
* [pageTitle](#module_puppeteer+pageTitle)
* [pageContent](#module_puppeteer+pageContent)
* [pageMetrics](#module_puppeteer+pageMetrics)
* [pageCookies](#module_puppeteer+pageCookies)
* [puppeteer](#module_puppeteer+puppeteer)
* [launch](#module_puppeteer+launch)
* [newPage](#module_puppeteer+newPage)
* [_goto](#module_puppeteer+_goto)
* [close](#module_puppeteer+close)
* [once](#module_puppeteer+once)
* [all](#module_puppeteer+all)
* [nodeText](#module_puppeteer+nodeText)
* [nodeHtml](#module_puppeteer+nodeHtml)
* [nodeClasses](#module_puppeteer+nodeClasses)
* [nodeAttributes](#module_puppeteer+nodeAttributes)
<a name="module_puppeteer+pageUrl"></a>

#### pageUrl
отримання url сторінки 

*Rules*: `["page.url"]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | сторінка |

<a name="module_puppeteer+pageTitle"></a>

#### pageTitle

отримання title сторінки

*Rules*: `["page.title"]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | сторінка |

<a name="module_puppeteer+pageContent"></a>

#### pageContent
Отримання content сторінки

*Rules*:`["page.content"]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | сторінка |

<a name="module_puppeteer+pageMetrics"></a>

#### pageMetrics
Отримання метрики сторінки
*Rules*: `["page.metrics"]`

| Param | Description |
| --- | --- |
| command |  команда для виконання|
| context | контекст виконання |
| value | сторінка |

<a name="module_puppeteer+pageCookies"></a>

#### pageCookies
Отримання `cookies` сторінки

*Rules*:`["page.cookies"]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | сторінка |

<a name="module_puppeteer+puppeteer"></a>

#### puppeteer
Отримання результату виконання методу `puppeteer`, який передається в `command`

*Rules*: `puppeteer`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

<a name="module_puppeteer+launch"></a>

#### launch
Функція запуску браузера через `puppeteer.launch()`
*Rules*: `launch`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

<a name="module_puppeteer+newPage"></a>

#### newPage
Функція відкриття нової сторінки в браузері відкритому в `puppeteer`

*Rules*: `new-page`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

<a name="module_puppeteer+_goto"></a>

#### _goto

Функція переходу на сторінку за url, який передається в `command`

*Rules*: `goto`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

<a name="module_puppeteer+once"></a>

#### once

Отримання інформації з одного елемента з назвою, яка передається за допомогою `command`

*Rules*:`once`

| Param | Description |
| --- | --- |
| command | {select} - елемент для отримання інформації|
| context | контекст виконання |

<a name="module_puppeteer+all"></a>

#### all

отримання інформації зі всіх елементів з назвою, з переданої з `command`

*Rules*: `all`

| Param | Description |
| --- | --- |
| command | {select} - елемент для отримання інформації|
| context | контекст виконання |

<a name="module_puppeteer+close"></a>

#### close

Функція закриття інстансу браузеру відкритого через `puppeteer` 

*Rules*:`["close", "puppeteer.close"]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

<a name="module_puppeteer+nodeHtml"></a>

#### nodeHtml

Отримання всіх html-тегів з сторінки

*Rules*:`[
"html",
"node.html"
]`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |
| value | сторінка |

<a name="module_puppeteer+nodeText"></a>

#### nodeText
Отримання всього тексту з сторінки

*Rules*:  `[
"text",
"node.text"
]`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |
| value | сторінка |

<a name="module_puppeteer+nodeClasses"></a>

#### nodeClasses

Отримання елементів з заданим класом

*Rules*: `[
"class","classes",
"node.class", "node.classes"
]`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |
| value | сторінка |

<a name="module_puppeteer+nodeAttributes"></a>

#### nodeAttributes

Отримає з елемента, передані атрибути

*Rules*: `[
"attributes",
"node.attributes"
]`

| Param | Description |
| --- | --- |
| command | команда для виконання |
| context | контекст виконання |
| value | сторінка |

## axios-plugin

<a name="module_axios"></a>
Плагін для роботи з npm-пакетом `axios`
### Functions
* [engineAxios](#module_axios+engineAxios)
* [fetch](#module_axios+fetch)
* [request](#module_axios+request)
<a name="module_axios+engineAxios"></a>

#### engineAxios
Функція для отримання інстанса `axios`, та для виконання команд переданих в `command`

*Rules*: `axios`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |


<a name="module_axios+fetch"></a>

#### fetch

Функція для виконання запиту для `request` переданого через `command`

*Rules*: `fetch`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |


<a name="module_axios+request"></a>

#### request
Функція для створення `request`, за параметрами переданими через `command`

*Rules*: `request`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

## core-plugin

<a name="module_core"></a>

Базовий плагін, який потрібний для роботи з усіма плагінами

### Functions
* [log](#module_core+log)
* [map](#module_core+map)
* [transform](#module_core+transform)
* [get](#module_core+get)
* [set](#module_core+set)
* [apply](#module_core+apply)

<a name="module_core+log"></a>

#### log

трансформує значення в залежності переданого контексту і повертає результат у вигляді масиву

*Rules*: `log`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

<a name="module_core+map"></a>

#### map
виконує команди передані  з `command`

*Rules*: `[
"map",
"core.map"
]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

<a name="module_core+transform"></a>

#### transform

Виконує трансформацію даних за допомогою команди переданої з `command`

*Rules*:`[
"transform",
"core.transform"
]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

<a name="module_core+get"></a>

#### get

Отримання значень з об'єекту, переданого за допомогою `context`

*Rules*: `[
"return",
"core.return"
]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |

<a name="module_core+set"></a>

#### set

Зберігає передані значення в контексті

*Rules*:
`[
"as",
"into",
"core.into"
]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення, яке потрібно зберегти в контексті|

<a name="module_core+apply"></a>

#### apply
Виконує команди передані через `command`

*Rules*: `apply`
| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |


## cast-plugin

<a name="module_cast"></a>

Базовий плагін, який імпортує утилітні npm-пакети та методи

### Functions
* [uuid](#module_cast+uuid)
* [md5](#module_cast+md5)
* [toString](#module_cast+toString)
* [json.parse](#module_cast+json.parse)
* [json.stringify](#module_cast+json.stringify)
* [float](#module_cast+float)
* [int](#module_cast+int)
* [date](#module_cast+date)
* [boolean](#module_cast+boolean)
* [moment.format](#module_cast+moment.format)
* [moment.date](#module_cast+moment.date)
* [lodash](#module_cast+lodash)

<a name="module_cast+uuid"></a>

#### uuid

Створює  `uuid`

*Rules*:`uuid`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |


<a name="module_cast+md5"></a>

#### md5

Переводить значення в md5 hash

*Rules*: `md5`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення для використання |

<a name="module_cast+toString"></a>

#### toString

переводить значення в стрінг

*Rules*: `toString`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення для використання |

<a name="module_cast+json.parse"></a>

#### json.parse

Отримує з значення `json`

*Rules*: `json.parse`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення для використання |

<a name="module_cast+json.stringify"></a>

#### json.stringify

Переводить `json` в стрінг

*Rules*: `json.stringify`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення для використання |


<a name="module_cast+float"></a>

#### float
переводить число в не ціле число

*Rules*: `float`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення для використання |


<a name="module_cast+int"></a>

#### int
Переводить число в ціле число

*Rules*: `int`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення для використання |



<a name="module_cast+date"></a>

#### date
Створює нову дату, або переводить передане значення в формат `date`
 
*Rules*: `date`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення для використання |


<a name="module_cast+boolean"></a>

#### boolean
переводить значення в `boolean`

*Rules*:  `boolean`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення для використання |



<a name="module_cast+moment.format"></a>

#### moment.format
Переводить дату, передану через `value`, в формат, переданий `command`

*Rules*:  `moment.format`

| Param | Description |
| --- | --- |
| command | формат дати|
| context | контекст виконання |
| value | значення для використання |

<a name="module_cast+moment.date"></a>

#### moment.date
Переводить значення, передане через `value`, в формат дати, переданий `command`


*Rules*:  `moment.date`

| Param | Description |
| --- | --- |
| command | формат дати|
| context | контекст виконання |
| value | значення для використання |

<a name="module_cast+lodash"></a>

#### lodash
Функція для виклику методів з npm-пакету `lodash`

*Rules*:  `[
                "lodash.camelCase",
                "lodash.capitalize",
                "lodash.escape",
                "lodash.kebabCase",
                "lodash.lowerCase",
                "lodash.lowerFirst",
                "lodash.snakeCase",
                "lodash.startCase",
                "lodash.toLower",
                "lodash.toUpper",
                "lodash.trim",
                "lodash.trimEnd",
                "lodash.trimStart",
                "lodash.truncate",
                "lodash.unescape",
                "lodash.upperCase",
                "lodash.upperFirst",
                "lodash.words",
				"lodash.entries",
				"lodash.invert",
				"lodash.keys",
				"lodash.values",
				"lodash.toPairs",
				"lodash.size"
			]`

| Param | Description |
| --- | --- |
| command | команда для виконання|
| context | контекст виконання |
| value | значення для використання |