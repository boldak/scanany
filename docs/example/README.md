# Розроблення модуля

## Приклад використання

### Завантаження залежності

```sh
  git clone https://github.com/boldak/scanany.git
  cd scanany
  npm install
```

### Базовий приклад

Запускамо скраппер для web-скраппингу сторінки  https://whoisnnamdi.com/never-enough-developers/ за допомогою команди 
```
npm run example ./examples/yaml/cheerio/inspect-element.yaml
```

Створення екземпляра ```scraper``` здійснюється за допомогою  ```new Scrapper()```. Надсилання повідомлень здійснюється за допомогою ```publisher.send()```. Обробка yaml файлу налаштувань 
 здійснюється за допомогою ```YAML.load(source)```, де ```source``` шлях до yaml-файлу, а виконання плагіна - за допомогою ```scraper.execute(script)```.

***Код прикладу***

```js

module.exports = require("./src/scanany")

const Scraper = require("./index.js")

const test = async () => {
  const YAML = require("js-yaml")
  const path = require("path")
  let filepath = path.resolve(process.argv[2])

  let scraper = new Scraper()
  let source = require("fs").readFileSync(filepath).toString().replace(/\t/gm, " ")
  let script = YAML.load(source)

  let result = await scraper.execute(script)
  console.log("---------------------------------------------------------------")
  console.log(`Scanany example: ${filepath}`)
  console.log()
  console.log(source)
  console.log("---------------------------------------------------------------")
  // console.log(JSON.stringify(script))
  // console.log("---------------------------------------------------------------")

  console.log("Scanany result:")
  console.log()
  console.log(result)
  console.log("---------------------------------------------------------------")

  // process.exit(0)
}

test()

```

***Результат***

В yaml файлі в нас використовуються два плагіна ``axios-plugin`` та `cherrio-plugin`.
Викликаємо функцію `fetch`, яка належить плагіну `axios-plugin` для отримання html-сторінки, та застосовуємо
функцію `once`, яка належить плагіну `cherrio-plugin`, для отримання таких значень як, `html`, `text`, `class` ,`attributes`
```sh
---------------------------------------------------------------
Scanany example: /scanany/examples/yaml/cheerio/inspect-element.yaml

- use: 
    - axios-plugin
    - cheerio-plugin

- fetch:
    request:
      method: GET
      url: https://news.ycombinator.com/news
    transform:
      apply:
        - project: data
        - html->page  
    into: page

- once:
    $ref: page
    select: a.titlelink
    apply:
      
      - transform: html
        into: info.html    
      
      - transform: text
        into: info.text    
      
      - transform: class
        into: info.class    
      
      - transform: attributes
        into: info.attributes    

    into: element

- return: info          

---------------------------------------------------------------
Scanany result:

{
  html: '<a href="https://whoisnnamdi.com/never-enough-developers/" class="titlelink">We Will Never Have Enough Software Developers (2020)</a>',
  text: 'We Will Never Have Enough Software Developers (2020)',
  class: [ 'titlelink' ],
  attributes: {
    href: 'https://whoisnnamdi.com/never-enough-developers/',
    class: 'titlelink'
  }
}
---------------------------------------------------------------


```
