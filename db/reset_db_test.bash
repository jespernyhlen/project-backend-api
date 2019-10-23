$(> db/test.sqlite)
cat db/migrate.sql | sqlite3 db/test.sqlite
cat db/insert.sql | sqlite3 db/test.sqlite
