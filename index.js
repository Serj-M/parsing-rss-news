/*
  В этой программе я буду получать и отображать rss-новости от Яндекса через сервис rss2json
  Нужно обратиться к серверу как:
    http://localhost:8080/yandex/10/news/for/CATEGORY (Дай 10 новостей от Яндекса из категории CATEGORY)
    CATEGORY RSS: auto, world, internet, sport, culture, movies, politics.
  Сервер будет посылать запрос вида:
    https://api.rss2json.com/v1/api.json?rss_url=http://news.yandex.ru/CATEGORY.rss
  В ответ будут приходить новости в формате json, которые необходимо распарсить и показать в браузере.
*/

// Подключаю модули 'url', 'request', 'express' и 'ejs'
const express = require('express');
const request = require('request');
const url = require('url');
// Переменная app - сервер, созданный на основе фреймворка express
let app = express();
// Ставлю сервер на "прослушку" порта 8080
app.listen(8080);
// Указываю, где находятся файлы для представления результата с помощью переменной __dirname, указывающей на текущую директорию
app.set('views', __dirname);
app.set('view engine', 'ejs');

// Создаю для сервера обработчик событий метода GET, который обрабатывает обращение к адресу: /yandex/:cnt/news/for/:search например: http://localhost:8080/yandex/10/news/for/AUTO
app.get('/yandex/:cnt/news/for/:search', function(req, res){
  
  // Получаю значения для переменных из параметра обработчика запросов app.get(). Это удается сделать за счет переменных шаблонизатора EJS ( :cnt(в примере: 10) и :search(в примере: AUTO) )
  let cnt = req.params.cnt;
  let search = 'https://news.yandex.ru/' + req.params.search + '.rss';
  
  // Создаю объект options для формирования url вида: 
  // https://api.rss2json.com/v1/api.json?rss_url=http://news.yandex.ru/AUTO.rss (в значении параметра 'rss_url' добавляю :search)
  let options = {
    protocol: 'https:', 
    host: 'api.rss2json.com', 
    pathname: '/v1/api.json', 
    query: {rss_url: search}
  };
 
  // Формирую нужный url с помощью метода format объекта url (который я подключал в начале)
  // let urlTemp = "https://api.rss2json.com/v1/api.json?rss_url=https://news.yandex.ru/auto.rss";
  let myUrl = url.format(options);
  console.log(myUrl); 

  // Вызоваю функцию request из подключеного модуля 'request'.
  // В параметр колбэка body придет ответ в виде строки в формате JSON.
  request(myUrl, function(err, response, body){
    //console.log(body);

    // массивы для отпарсенных данных
    let arrLink = [];
    let arrTitle = [];
    let arrDescription = [];
    
    // Преобразовываю JSON в объект методом parse. Получаю объект с массивами в, котрых обекты.
    let data = JSON.parse(body);
    //console.log(data);

    //разбираю обект
    for (var key in data.items) {  
      // console.log( "Имя свойства: " + key + " содержимое: " + data.items[key] + "<br>" );
      // console.log( "link: " + data.items[key].link );
      // console.log( "title: " + data.items[key].title );
      // console.log( "description: " + data.items[key].description );

      // формирую масивы исходных данных для представления
      arrLink.push( data.items[key].link );      
      arrTitle.push( data.items[key].title );      
      arrDescription.push( data.items[key].description );      
    };
    
    // Добавяю необходимый скрипт с учетом данных в файле yandex-news.ejs
    // Передаю данные шаблонизатору yandex-news.ejs
    res.render("yandex-news", {
                                cnt: cnt,
                                search: search,
                                link: arrLink,
                                title: arrTitle,
                                description: arrDescription
                              });      
  });
});

// В браузере ввести http://localhost:8080/yandex/10/news/for/auto