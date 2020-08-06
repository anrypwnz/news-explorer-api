# news-explorer-api

`84.201.134.251` - публичный IP

[https://top-news.ml](https://top-news.ml) - Адрес портала

### Как обратиться к серверу:

  - https://api.top-news.ml/route - Возможно обратиться к серверу с поддоменом api 

`POST https://top-news.ml/singup` - Регистрация (параметры: name, email, password).

`POST https://top-news.ml/singin` - Логин (параметры: email, password).

`GET https://top-news.ml/api/users/me` - Получить свои данные (параметры: name, email).

`GET https://top-news.ml/api/articles` - Получить сохранённые пользователем статьи.

`POST https://top-news.ml/articles` - Создать статью (параметры: keyword, title, text, date, source, link и image)

`DELETE https://top-news.ml/articles/articleId` - Удалить статью по ID.

### Как развернуть проект
`npm run start` - развернуть сервер

`npm run dev` - развернуть сервер с функцией hot reload

### Технологии которые используются на этом проекте:

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
