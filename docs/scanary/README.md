# @molfar/scanany. Специфікація модуля

## Modules

<dl>
<dt><a href="#module_Scanary">Scanary</a></dt>
<dd></dd>
</dl>


<a name="module_Scanary"></a>

## Scanary

* [Scanary](#module_Scanary)
    * [~Scanary](#module_Scanary..Scanary)
        * [.use(plugins)](#module_Scanary..Scanary+use)
        * [.register(plugins)](#module_Scanary..Scanary+register)
        * [.resolveValue(raw, context)](#module_Scanary..Scanary+resolveValue)
        * [.executeOnce(command, context, sender)](#module_Scanary..Scanary+executeOnce) ⇒ <code>Object</code>
        * [.execute(script, context)](#module_Scanary..Scanary+exexute) ⇒ <code>Object</code>
 

<a name="module_Scanary..Scanary"></a>

### Scanary~Scanary
Scanary

**Kind**: inner class of [<code>Scanary</code>](#module_Scanary)

* [~Scanary](#module_AmqpManager..AmqpManager)
  * [.plugins](#module_Scanary..Scanary+plugins)
  * [.rules](#module_Scanary..Scanary+rules)
  * [.commandPath](#module_Scanary..Scanary+commandPath)
  * [.use(plugins)](#module_Scanary..Scanary+use)
  * [.register(plugins)](#module_Scanary..Scanary+register)
  * [.resolveValue(raw, context)](#module_Scanary..Scanary+resolveValue)
  * [.executeOnce(command, context, sender)](#module_Scanary..Scanary+executeOnce) ⇒ <code>Object</code>
  * [.execute(script, context)](#module_Scanary..Scanary+exexute) ⇒ <code>Array</code>


<a name="module_Scanary..Scanary+plugins"></a>

#### scanary.plugins
масив плагінів, які потрібно запустити

**Kind**: instance property of [<code>Scanary</code>](#module_Scanary..Scanary)  

<a name="module_Scanary..Scanary+rules"></a>

#### scanary.rules
масив правил для запуску плагінів

**Kind**: instance property of [<code>Scanary</code>](#module_Scanary..Scanary)

<a name="module_Scanary..Scanary+commandPath"></a>

#### scanary.commandPath
шлях до yaml файлу, де знаходиться правила до виконання плагіну

**Kind**: instance property of [<code>Scanary</code>](#module_Scanary..Scanary)  

<a name="module_Scanary..Scanary+use"></a>

#### scanary.use
Перевіряє чи доступний плагін для запуску, знаходить потрібний плагін, та сетає його

**Kind**: instance method of[<code>Scanary</code>](#module_Scanary..Scanary)

| Param | Description |
| --- | --- |
| plugins | плагіни для запуску |

<a name="module_Scanary..Scanary+register"></a>

#### scanary.register()
Сетає правила виконання плагінів

**Kind**: instance method of[<code>Scanary</code>](#module_Scanary..Scanary)

<a name="module_Scanary..Scanary++getConnectionConfig"></a>

#### scanary.resolveValue(raw, context)

Метод який потрібен для отримання значення з файлу правил виконання плагіну
**Kind**: instance method of[<code>Scanary</code>](#module_Scanary..Scanary)
**Returns**: <code>Object</code> значення правила

| Param | Description |
| --- | --- |
| raw | Значення правила |
| context | контекст виконання правила |

<a name="module_Scanary..Scanary++setConnectionConfig"></a>

#### scanary.executeOnce(command, context, sender) ⇒ <code>Object</code>
Запускає один плагін 

**Kind**: instance method of[<code>Scanary</code>](#module_Scanary..Scanary)

**Returns**: <code>Object</code> результат виконання одного плагіну

| Param | Description |
| --- | --- |
| command | команда для запуску плагіна |
| context | контекст виконання правила |

<a name="module_Scanary..Scanary+execute"></a>

#### scanary.execute(command, context) ⇒ <code>Object</code>
Запускає плагіни

**Kind**: instance method of[<code>Scanary</code>](#module_Scanary..Scanary)

**Returns**: <code>Object</code> - Повертає результати виконання плагінів

| Param | Description |
| --- | --- |
| script | команда для запуску плагіна |
| context | контекст виконання правила |




