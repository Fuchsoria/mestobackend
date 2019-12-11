

# Mestobackend [RU Lang] v0.9
Серверная часть для сайта галереи Mesto.
Ссылки для теста: http://84.201.170.58:3000/ либо https://api.mesto.sehen.tech/

### Функционал:
| ЗАПРОС | ОТВЕТ |
|--|--|
| GET /users | JSON-список всех пользователей |
| GET /users/{id} | JSON-пользователя с переданным после /users идентификатором|
| POST /users | Создаёт пользователя и возвращает JSON, принимает на вход JSON в body: `{ "name": "Имя", "about": "Обо мне", "avatar": "https://avatar.url" }`  |
| PATCH /users/me | Обновляет профиль и возвращает JSON, принимает на вход JSON в body: `{ "name": "Имя", "about": "Обо мне" }` |
| PATCH /users/me/avatar | Обновляет аватар пользователя и возвращает JSON, принимает на вход JSON в body: `{ "avatar": "https://avatar.url" }` |
| GET /cards | JSON-список всех карточек |
| POST /cards | Создаёт карточку и возвращает JSON, принимает на вход JSON в body: `{ "name": "Имя карточки", "link": "https://card.url" }`|
| PUT /cards/{cardId}/likes | Добавляет пользователя в список лайкнувших и возвращает карточку |
| DELETE /cards/{cardId}/likes | Удаляет пользователя из списока лайкнувших и возвращает карточку |
| Несуществующий адрес | `{ "message": "Запрашиваемый ресурс не найден" }` |


## Установка
Для установки необходимо наличие установленного nodejs и npm.

Сохраните проект у себя на компьютере:

    git clone https://github.com/SehenQQ/mestobackend.git

В корне проекта через консоль/терминал запустите команду:

    npm install
### После успешной установки станут доступны команды: 
Поднятие локального сервера с хотрелоадом:

    npm run dev
Запуск продакшн сервера:

    npm run start
