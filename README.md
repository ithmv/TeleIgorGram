# TeleIgorGram v4 (fixed)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

Функции:
- Регистрация/логин (JWT в httpOnly cookie)
- Комнаты и личные сообщения (DM)
- Вложения (картинки/файлы), предпросмотр изображений
- Реакции, пины, редактирование/удаление
- Индикатор «печатает…», пагинация, аватары
- Поиск (SQLite FTS5 при наличии)
- Защита: helmet, rate-limit

## Запуск локально
```bash
npm install
npm start
# http://localhost:3000
```

## Переменные окружения
- `JWT_SECRET` (обязательно на проде)
- `ADMIN_USERNAMES` (напр. `igor,admin`)
- `MAX_UPLOAD_MB` (по умолчанию 5)
- `NODE_VERSION` (18)
