# news-explorer-api

`84.201.165.237` - публичный IP


[Фронтенд тут](https://anrypwnz.github.io/news-explorer-frontend/) 

[https://top-news.ml](https://top-news.ml) - Адрес портала

### Как обратиться к серверу:

  - https://api.top-news.ml/route - Возможно обратиться к серверу с поддоменом api 

`POST /signup` - Регистрация (параметры: name, email, password).

`POST /signin` - Логин (параметры: email, password).

`GET /users/me` - Получить свои данные (параметры: name, email).

`GET /articles` - Получить сохранённые пользователем статьи.

`POST /articles` - Создать статью (параметры: keyword, title, text, date, source, link и image)

`DELETE /articles/articleId` - Удалить статью по ID.

### Как развернуть проект
`npm run start` - развернуть сервер

`npm run dev` - развернуть сервер с функцией hot reload

### Технологии которые используются на этом проекте:
`REST API`
`NodeJS`
`ExpressJS`
`MongoDB`
`Mongoose`
`nginx`
`Яндекс Облако`

### Дополнительные зависимости:

`winston` 
`helmet`
`celebrate`
`body-parser`
`doteenv`
`JWT`
`bcrypt`
