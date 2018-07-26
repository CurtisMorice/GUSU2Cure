-- database name: gusu_project

-- create the users table
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "hash" VARCHAR (1000) NOT NULL,
    "type" VARCHAR (10) NOT NULL,
    "email" VARCHAR (100) NOT NULL,
    "validated" BOOLEAN NOT NULL  
);

-- create the resources table
CREATE TABLE "resources" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200),
    "url" VARCHAR (300),
    "summary" VARCHAR (500),
    "date_created" DATE
);

CREATE TABLE "resources" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200),
    "url" VARCHAR (300),
    "summary" VARCHAR (500),
    "date_created" DATE
);


-- insert into resources table
INSERT INTO resources(name, url, summary, date_created) VALUES ('Organization Name', 'www.organization.com', 'This is the organization summary', '10/16/2018');