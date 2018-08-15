-- database name: gusu_project

-- !!!!!!!!!!!!!!!!!!!!
-- UNCOMMENT THE DATE_CREATED LINE IN RESOURCES, DATE_POSTED, RELATED_ARTICLES, 
-- AND ADMIN_COMMENT IN ARTICLES, AND DATE_CREATED IN COMMENTS

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
CREATE TABLE "resources" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200),
    "url" VARCHAR (300),
    "summary" VARCHAR (500),
    -- "date_created" DATE DEFAULT current_date
);

--create status table
CREATE TABLE "statuses" (
	"id" SERIAL PRIMARY KEY,
	"status" varchar(20),
	CONSTRAINT chk_status CHECK (status IN ('pending', 'approved', 'rejected', 'edit-review', 'edit-delete'))
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


-- create article table. date_posted is automatically inserted every time new article is inserted. up to five related articles are accepted. commented out due to linter errors.
CREATE TABLE "articles"(

    "id" SERIAL PRIMARY KEY,
    "location_id" INT NOT NULL REFERENCES locations,
    "user_id" INT NOT NULL REFERENCES users,
    --"date_posted" DATE DEFAULT current_date,
    "research_date" date NOT NULL,
    "research_title" VARCHAR(200) NOT NULL,
    "research_type" INT NOT NULL REFERENCES research_type,
    "research_phase" INT NOT NULL REFERENCES research_phase,
    "institution_name" VARCHAR(100) NOT NULL,
    "institution_url" VARCHAR(300) NOT NULL,
    "status" INT NOT NULL REFERENCES statuses,
    "funding_source" VARCHAR(100),
    --"related_articles" text[5],
    --"admin_comment" VARCHAR(500),
	--"brief_description" VARCHAR(300),
	--"summary" VARCHAR(1000),
	--"user_story" VARCHAR(1000)
    );

-- create quasi article table. the rows in here will be the information for a proposed article edit. once the admin approves, the information here
-- will replace what is in the article table and the quasi-article will be deleted
CREATE TABLE "quasi_articles"(
	"id" SERIAL PRIMARY KEY,
	"article_id" INT NOT NULL REFERENCES articles,
	"location_id" INT NOT NULL REFERENCES locations,
	"user_id" INT NOT NULL REFERENCES users,
	-- "date_posted" DATE DEFAULT current_date,
	"research_date" date NOT NULL,
	"research_title" VARCHAR(200) NOT NULL,
	"research_type" INT NOT NULL REFERENCES research_type,
	"research_phase" INT NOT NULL REFERENCES research_phase,
	"institution_name" VARCHAR(100) NOT NULL,
	"institution_url" VARCHAR(300) NOT NULL,
	"status" INT NOT NULL REFERENCES statuses,
	"funding_source" VARCHAR(100),
	-- "related_articles" text[5],
	-- "admin_comment" VARCHAR(500),
	-- "brief_description" VARCHAR(300),
	-- "summary" VARCHAR (1000),
	-- "user_story" VARCHAR (1000)
	);
	
-- insert into comments table
INSERT INTO comments(comment, user_id, article_id) VALUES ('Fascinating', 1, 1);
		
-- insert a user into the user table
INSERT INTO users(username, hash, type, email, validated) VALUES ('sean', 'sean', 'user', 'email@email.com', true);

-- insert into resources table
INSERT INTO resources(name, url, summary, date_created) VALUES ('Organization Name', 'www.organization.com', 'This is the organization summary', '10/16/2018');

-- insert into profile table. this should happen after a user is created successfully.
INSERT INTO profiles(user_id, bio, contact_info) VALUES (1, 'I love research!', '555-555-5555');

-- insert into statuses table. only will accept four values: 'pending', 'approved', 'rejected', and 'reviewing'. articles should reference these statuses by their ids.
INSERT INTO statuses(status) VALUES ('pending');
INSERT INTO statuses(status) VALUES ('approved');
INSERT INTO statuses(status) VALUES ('rejected');
INSERT INTO statuses(status) VALUES ('edit-review');
INSERT INTO statuses(status) VALUES ('edit-delete');



-- insert into research_type table will only accept nine values: 'stem_cell', 'molecular', 'gene', 'pharmaceutical', 'device', 'rehabilitation', 'fitness', 'survey',  and'other'.
INSERT INTO research_type(type) VALUES ('stem_cell');
INSERT INTO research_type(type) VALUES ('molecular');
INSERT INTO research_type(type) VALUES ('gene');
INSERT INTO research_type(type) VALUES ('pharmaceutical');
INSERT INTO research_type(type) VALUES ('device');
INSERT INTO research_type(type) VALUES ('rehabilitation');
INSERT INTO research_type(type) VALUES ('fitness');
INSERT INTO research_type(type) VALUES ('survey');
INSERT INTO research_type(type) VALUES ('other');


-- insert into research_phase table. will only accept four values: 'cellular', 'small_animal', 'large_animal', 'human', and 'other'.
INSERT INTO research_phase(phase) VALUES ('cellular');
INSERT INTO research_phase(phase) VALUES ('small_animal');
INSERT INTO research_phase(phase) VALUES ('large_animal');
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

-- Get Call for New Articles Table in Admin.
-- SELECT articles.id,research_date,research_title, institution_name, institution_url, funding_source, related_articles, admin_comment, statuses.status, research_type.type, username, email FROM articles
-- JOIN statuses ON articles.status = statuses.id
-- RIGHT JOIN research_type ON articles.research_type = research_type.id
-- JOIN research_phase ON articles.research_phase = research_phase.id
-- LEFT JOIN users ON user_id = users.id
-- ORDER BY research_date ASC;

-- Reject articles
--UPDATE articles SET status=2, admin_comment=articles.admin_comment WHERE id=1;


-- FOR POSTING ARTICLES USING POSTMAN
-- {
-- 	"address": "2-６ Yamadaoka, Suita-shi, Ōsaka-fu 565-0871, Japan",
-- 	"lat": 34.820442,
-- 	"lng": 135.523665,
-- 	"user_id": 1,
-- 	"research_date": "8/3/2018",
-- 	"research_title": "Laser stuff",
-- 	"research_type": 1,
-- 	"research_phase": 1,
-- 	"institution_name": "Osaka University Laser Energy Research Center",
-- 	"institution_url": "www.osaka-university-lasers.com",
-- 	"funding_source": "The Japanese Government",
-- 	"related_articles": ["www.osaka.com", "www.okonomiyaki.com", "www.nandeyanen.com"]
-- }

-- {
-- 	"address": "１-2 Yamadaoka, Suita-shi, Ōsaka-fu 565-0871, Japan",
-- 	"lat": 34.817923,
-- 	"lng": 135.526226,
-- 	"user_id": 1,
-- 	"research_date": "8/3/2018",
-- 	"research_title": "Human research",
-- 	"research_type": 1,
-- 	"research_phase": 1,
-- 	"institution_name": "Osaka University Graduate School of Human Sciences, Human Sciences",
-- 	"institution_url": "www.osaka-university-humans.com",
-- 	"funding_source": "The Japanese Government",
-- 	"related_articles": ["www.osaka.com", "www.okonomiyaki.com", "www.nandeyanen.com"]
-- }
-- {
-- 	"address": "7 Chome-3-1 Hongō, Bunkyō-ku, Tōkyō-to 113-8654, Japan",
-- 	"lat": 35.712765,
-- 	"lng": 139.761989,
-- 	"user_id": 1,
-- 	"research_date": "8/3/2018",
-- 	"research_title": "Dumb stuff",
-- 	"research_type": 1,
-- 	"research_phase": 1,
-- 	"institution_name": "The University of Tokyo",
-- 	"institution_url": "www.tokyo-university-isdumb.com",
-- 	"funding_source": "Dumb people",
-- 	"related_articles": ["www.boo.com", "www.ew.com", "www.blech.com"]
-- }