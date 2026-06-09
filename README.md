# SimpleAuthPGSql

1. **Установка зависимостей**

    ```sh
    bun i
    ```

2. **Запуск БД в Docker**

   ```sh
   bun db:start
   ```

3. **Миграция схем на новосозданную БД**

   ```sh
   bun db:migrate
   ```

4. **Запуск сервера**

   ```sh
   bun dev
   ```

5. **(Опционально) Запуск студийки [database studio](https://orm.drizzle.team/drizzle-studio/overview)**
   ```bash
   bun db:studio
   ```

6. **Остановка БД**
   ```sh
   bun db:stop
   ```

