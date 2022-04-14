## Установка
>1. Выполните команду
```shell
yarn install
```
>2. Создайте .env.local файл в корне проекта
```
//Example

MONGO_URI='mongodb://localhost:27017/react-chat'
ACCESS_EXPIRATION='2h'
REFRESH_EXPIRATION='7d'
JWT_KEY='JWT_KEY'
```
>3. Запустите проект
```shell
yarn start
```