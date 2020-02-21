# parsing-rss-news
<h2>Парсинг RSS-ленты новостей</h2>
<b>Технологии:</b> <i>Node JS, Express, Шаблонизатор EJS, Webpack.</i>

В этой программе на Node JS я буду запрашивать у пользователя категорию и количество интересуемых его новостей.
  Затем получать и отображать rss-новости от Яндекса на новой странице.

  Возможные категории RSS-новостей: auto, world, internet, sport, culture, movies, politics.

  Сервер будет посылать запрос вида: https://api.rss2json.com/v1/api.json?rss_url=http://news.yandex.ru/CATEGORY.rss 
  В ответ будут приходить новости в формате json, которые необходимо распарсить и показать в браузере.
