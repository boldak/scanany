# Програмний модуль @molfar/scanany | Вступ

**Програмний модуль @molfar/scanany** – Програмний модуль для інтегрування різних плагінів скрапперів в свій застосунок.

## Зміст
- [Позначення та найменування програмного модуля](#name)
- [Програмне забезпечення, необхідне для функціонування програмного модуля](#software)
- [Функціональне призначення](#function)
- [Опис логічної структури](#structure)
- [Використовувані технічні засоби](#hardware)
- [Виклик та завантаження](#run)

<a name="name"></a>
<h2>Позначення та найменування програмного модуля</h2>

Програмний модуль має позначення **"@molfar/scanany"**.

Повне найменування програмного модуля – **"Програмний модуль для інтегрування різних плагінів скрапперів в свій застосунок"**.


<a name="software"></a>
<h2>Програмне забезпечення, необхідне для функціонування програмного модуля</h2>

Для функціонування програмного модуля, написаного мовою програмування JavaScript, необхідне наступне програмне забезпечення та пакети:


- `arraybuffer-to-buffer` [v0.0.7](https://www.npmjs.com/package/arraybuffer-to-buffer/v/0.0.7)
- `axios` [v0.24.0](https://www.npmjs.com/package/axios/v/0.24.0)
- `cherrio` [v1.0.0-rc.10](https://www.npmjs.com/package/cherrio/v/1.0.0-rc.10)
- `csvjson` [v5.1.0](https://www.npmjs.com/package/csvjson/v/5.1.0)
- `deep-extend` [v0.6.0](https://www.npmjs.com/package/deep-extend/v/0.6.0)
- `express` [v4.17.1](https://www.npmjs.com/package/express/v/4.17.1)
- `jest` [v27.2.5](https://www.npmjs.com/package/jest/v/27.2.5)
- `js-yaml` [v4.1.0](https://www.npmjs.com/package/js-yaml/v/4.1.0)
- `json2csv` [v5.0.6](https://www.npmjs.com/package/json2csv/v/5.0.6)
- `lodash` [v1.22.4](https://www.npmjs.com/package/lodash/v/4.17.21)
- `mammoth` [v1.4.19](https://www.npmjs.com/package/mammoth/v/1.4.19)
- `md5` [v2.3.0](https://www.npmjs.com/package/md5/v/2.3.0)
- `Node.js` [v16.13.0](https://nodejs.org/download/release/v16.13.0/)
- `moment` [v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- `mongodb` [v4.2.2](https://www.npmjs.com/package/mongodb/v/4.2.2)
- `mysql2` [v2.3.3](https://www.npmjs.com/package/mysql2/v/2.3.3)
- `node-xlsx` [v0.19.0](https://www.npmjs.com/package/node-xlsx/v/0.19.0)
- `pdf-parse` [v1.1.1](https://www.npmjs.com/package/pdf-parse/v/1.1.1)
- `puppeteer` [v13.0.1](https://www.npmjs.com/package/puppeteer/v/13.0.1)
- `uuid` [v8.3.2](https://www.npmjs.com/package/uuid/v/8.3.2)
- `xml2js` [v0.4.23](https://www.npmjs.com/package/xml2js/v/0.4.23)
- `socket.io-client` [v4.5.1](https://www.npmjs.com/package/socket.io-client/v/4.5.1)
- `VuePress` [v1.8.2](https://www.npmjs.com/package/vuepress/v/1.8.2)
- `vuepress-theme-cool` [v1.3.1](https://www.npmjs.com/package/vuepress-theme-cool/v/1.3.1)
- `widdershins` [v4.0.1](https://www.npmjs.com/package/widdershins/v/4.0.1)

<a name="function"></a>
<h2>Функціональне призначення</h2>

Програмний модуль призначений для використання різних скаперів та корисних плагінів в своїх застосунках. Може використовуватись, наприклад, для веб-скраппінгу, для зчитування даних з .pdf .docx, .xlsx файлів, для перетворення даних з .csv, .yaml, .xml формату в .json і навпаки

<a name="structure"></a>
<h2>Опис логічної структури</h2>

Програмний модуль складається з класу `Scraper`, який потрібен для запуску плагінів через налаштування, які мають бути прописані в yaml файлі. Та з різних плагінів


<a name="hardware"></a>
<h2>Використовувані технічні засоби</h2>

Програмний модуль експлуатується на сервері під управлінням `Node.js`.

<a name="run"></a>
<h2>Виклик та завантаження</h2>

Завантаження програмного модуля забезпечується шляхом запуску командою `node example.js`.