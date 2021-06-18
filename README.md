# Deno Micro Web App

This web app is built using [Oak] middleware framework and [Denodb]() as its ORM
engine. The app itself is run using [Deno] as runtime engine and typescript as
its main language. It support MySQL, MariaDB, PostgreSQL, SQLite, and MongoDB as
its database server.

## Steps to run the App

1. Make sure you've installed Deno.
2. Copy **.env.example** and rename it to **.env**.
3. Change .env file as you need. For the database driver, the keywords are
   `mysql` for MySQL and MariaDB, `sqlite` for SQLite, `postgres` for
   PostgreSQL, and `mongo` for MongoDB.
4. If you use MongoDB as your database, all you need is input the database name
   and Mongo URI for the database connection.
5. Go to the app directory from your terminal and type
   `deno run --allow-env --allow-net --allow-read --allow-write ./app.ts` to run
   it.

## What if I want to add more models and controllers?

It's easy. just follow the example given (Post). I know it's bad design, but I
keep it so that I don't have to modify the file when I want to change the
database driver.

## Further Reads

1. Deno Documentation: https://deno.land/manual
2. Oak Framework Documentation: https://oakserver.github.io/oak/
3. Denodb Documentation: https://eveningkid.com/denodb-docs/
