<h1>Web-приложение для сервиса по автоматическому обзвону клиентов</h1>
(<a href="https://github.com/Alllex202/telephony/blob/main/README.md#%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D0%BF%D0%BE-%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%BC%D1%83-%D0%BE%D0%B1%D0%B7%D0%B2%D0%BE%D0%BD%D1%83-%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82%D0%BE%D0%B2">к домашней странице</a>)

---

<h2 name="context">Содержание</h2>

- <a href="#installation">Установка</a>
- <a href="#commands">Команды</a>

---

<h2 name="installation">Установка</h2>
<p>(<a href="#context">к содержанию</a>)</p>

- <a href="#nodejs">Node.js</a>
- <a href="#dependences">Зависимости</a>
- <a href="#env">Переменные среды</a>

<h3 name="nodejs">Node.js</h3>

Установить <a href="https://nodejs.org/en/">Node.js</a>.

(Разрабатывается на версии 14.17.3)

<h3 name="dependences">Зависимости</h3>

Скачать репозиторий (актуальная версия в ветке dev).

В корне проекта открыть консоль и ввести

```no-highlight
npm i
```

<h3 name="env">Переменные среды</h3>

В корневой папке создать файл ".env" и записать в него необходимые переменные:

```no-highlight
REACT_APP_SERVER_API=путь к api (без последнего слэша "/")
```

Более подробно в файле по пути <a href="https://github.com/Alllex202/telephony-react/blob/dev/src/config/index.ts">/src/config/index.ts</a>

---

<h2 name="commands">Команды</h2>
<p>(<a href="#context">к содержанию</a>)</p>

* Запуск проекта в режиме разработки<a href="#first">*</a> (<a href="http://localhost:3000">localhost:3000</a>)

```no-highlight
npm start
```

* Запуск проекта в режиме продакшн<a href="#second">**</a> (<a href="http://localhost:3000">localhost:3000</a>)

```no-highlight
npm run demo
```

* Сборка проекта в режиме разработки<a href="#first">*</a>

```no-highlight
npm run dev
```

* Сборка проекта в режиме продакшн<a href="#second">**</a>

```no-highlight
npm run prod
```

Файлы сборки располагаются по пути "./dist"

<h6 name="first">_(*) Режим разработки - сборка происходит без различных преобразований_</h6>

<h6 name="second">_(**) Режим продакшн - сборка происходит с различными преобразованиями исходных файлов_</h6>

---
