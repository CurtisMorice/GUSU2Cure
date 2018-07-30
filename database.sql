-- database name: gusu_project

-- create the user table
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "hash" VARCHAR (1000) NOT NULL,
    "type" VARCHAR (10) NOT NULL,
    "email" VARCHAR (100) UNIQUE NOT NULL,
    "validated" BOOLEAN NOT NULL  
);

--create profiles table
CREATE TABLE "profiles" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT UNIQUE NOT NULL REFERENCES users,
	"bio" VARCHAR(400) NOT NULL,
	"contact_info" VARCHAR(60) NOT NULL
	);

--create resources table
-- CREATE TABLE "resources" (
--     "id" SERIAL PRIMARY KEY,
--     "name" VARCHAR (200),
--     "url" VARCHAR (300),
--     "summary" VARCHAR (500),
--     "date_created" DATE DEFAULT current_date
-- );

--create status table
CREATE TABLE "statuses" (
	"id" SERIAL PRIMARY KEY,
	"status" varchar(20),
	CONSTRAINT chk_status CHECK (status IN ('pending', 'approved', 'rejected', 'reviewing'))
);

--create research type table
CREATE TABLE "research_type" (
	"id" SERIAL PRIMARY KEY,
	"type" varchar(20),
	CONSTRAINT chk_type CHECK (type IN ('stem_cell', 'molecular', 'gene', 'pharmaceutical', 'device', 'rehabilitation', 'fitness', 'survey', 'other'))
	);
	
--create research phase table
CREATE TABLE "research_phase" (
	"id" SERIAL PRIMARY KEY,
	"phase" varchar(20),
	CONSTRAINT chk_phase CHECK (phase IN ('cellular', 'small_animal', 'large_animal', 'human', 'other'))
	);

--create location table
CREATE TABLE "locations"(
	"id" SERIAL PRIMARY KEY,
	"address" varchar(200), 
	"lat" DECIMAL(9,6),
	"lng" DECIMAL (9,6)
	);


--create article table. date_posted is automatically inserted every time new article is inserted. up to five related articles are accepted. commented out due to linter errors.
-- CREATE TABLE "articles"(
-- 	"id" SERIAL PRIMARY KEY,
-- 	"location_id" INT NOT NULL REFERENCES locations,
-- 	"user_id" INT NOT NULL REFERENCES users,
-- 	"date_posted" DATE DEFAULT current_date,
-- 	"research_date" date NOT NULL,
-- 	"research_title" VARCHAR(200) NOT NULL,
-- 	"research_type" INT NOT NULL REFERENCES research_type,
-- 	"research_phase" INT NOT NULL REFERENCES research_phase,
-- 	"institution_name" VARCHAR(100) NOT NULL,
-- 	"institution_url" VARCHAR(300) NOT NULL,
-- 	"status" INT NOT NULL REFERENCES statuses,
-- 	"funding_source" VARCHAR(100),
-- 	"related_articles" text[5],
-- 	"admin_comment" VARCHAR(500)
-- 	);
	
--create comments table. date will be automatically inserted. commented out due to linter errors
-- CREATE TABLE "comments"(
-- 	"id" SERIAL PRIMARY KEY,
-- 	"comment" VARCHAR(300) NOT NULL,
-- 	"user_id" INT NOT NULL REFERENCES users,
-- 	"article_id" INT NOT NULL REFERENCES articles,
-- 	"date_created" DATE DEFAULT current_date
-- 	);
	
-- insert into comments table
INSERT INTO comments(comment, user_id, article_id) VALUES ('Fascinating', 1, 1);
		
SELECT * FROM articles;


-- insert a user into the user table
INSERT INTO users(username, hash, type, email, validated) VALUES ('sean', 'sean', 'user', 'email@email.com', true);

-- insert into resources table
INSERT INTO resources(name, url, summary, date_created) VALUES ('Organization Name', 'www.organization.com', 'This is the organization summary', '10/16/2018');

-- insert into profile table. this should happen after a user is created successfully.
INSERT INTO profiles(user_id, bio, contact_info) VALUES (1, 'I love research!', '555-555-5555');

-- insert into statuses table. only will accept four values: 'pending', 'approved', 'rejected', and 'reviewing'. articles should reference these statuses by their ids.
INSERT INTO statuses(status) VALUES ('rejected');

-- insert into research_type table will only accept nine values: 'stem_cell', 'molecular', 'gene', 'pharmaceutical', 'device', 'rehabilitation', 'fitness', 'survey',  and'other'.
INSERT INTO research_type(type) VALUES ('other');

-- insert into research_phase table. will only accept four values: 'cellular', 'small_animal', 'large_animal', 'human', and 'other'.
INSERT INTO research_phase(phase) VALUES ('other');

--insert into location table. this should happen before an article is created.
INSERT INTO locations(address, lat, lng) VALUES ('10520 France Ave S, Bloomington, MN 55431', 44.812558, -93.330891);

-- inserrt into article table. 
INSERT INTO articles(location_id, user_id, research_date, research_title, research_type, research_phase, institution_name, institution_url, status, funding_source, related_articles) VALUES(
	1,
	1,
	'8/3/2018', 
	'Research Title',
	1,
	1,
	'Institution Name',
	'www.institution_url.com',
	1,
	'Funding Source',
	'{"www.example.com", "www.example.com", "www.example.com", "www.example.com", "www.example.com"}'
	);
	
	-- insert into comments table
INSERT INTO comments(comment, user_id, article_id) VALUES ('Fascinating', 1, 1);