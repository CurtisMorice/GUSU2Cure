-- database name: gusu_project

-- create the user table
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "hash" VARCHAR (1000) NOT NULL,
    "type" VARCHAR (10) NOT NULL,
    "email" VARCHAR (100) NOT NULL,
    "validated" BOOLEAN NOT NULL  
);