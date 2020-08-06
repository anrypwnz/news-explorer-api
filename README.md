# news-explorer-api

### Как обратиться к серверу:

`POST https://ADRESS.RU/api/singup` - Регистрация (параметры: name, email, password).

`POST https://ADRESS.RU/api/singin` - Логин (параметры: email, password).

`GET https://ADRESS.RU/api/users/me` - Получить свои данные (параметры: name, email).

`GET https://ADRESS.RU/api/articles` - Получить сохранённые пользователем статьи.

`POST https://ADRESS.RU/articles` - Создать статью (параметры: keyword, title, text, date, source, link и image)

`DELETE https://ADRESS.RU/articles/articleId` - Удалить статью по ID.

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
