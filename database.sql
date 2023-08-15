CREATE TABLE "families" (
	"id" SERIAL PRIMARY KEY,
	"family_name" VARCHAR (255) NOT NULL,
	"street_address" VARCHAR (500) NOT NULL,
	"unit" VARCHAR (255) DEFAULT NULL,
	"city" VARCHAR (255) NOT NULL,
	"state" VARCHAR (2) NOT NULL,
	"zip" INT NOT NULL,
	"photo_url" VARCHAR (1000),
	"access_code" VARCHAR (255) DEFAULT NULL
);
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"user_type" varchar(200) DEFAULT NULL,
	"family_id" INT REFERENCES "families" (id),
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"photo_url" varchar(1000) DEFAULT NULL
);
CREATE TABLE "responsible_adults" (
	"id" SERIAL PRIMARY KEY,
	"family_id" INT REFERENCES "families" (id) NOT NULL,
	"first_name" VARCHAR (255) NOT NULL,
	"last_name" VARCHAR (255) NOT NULL,
	"phone_number" VARCHAR (15) NOT NULL,
	"email" VARCHAR (255),
	"relationship_to_child" VARCHAR (255) NOT NULL,
	"photo_url" VARCHAR (1000)
);
CREATE TABLE "children" (
	"id" SERIAL PRIMARY KEY,
	"family_id" INT REFERENCES "families" (id) NOT NULL,
	"first_name" VARCHAR (255) NOT NULL,
	"last_name" VARCHAR (255) NOT NULL,
	"birthdate" DATE,                             --modify to string??
	"allergies" TEXT,
	"potty_trained" BOOLEAN DEFAULT FALSE,
	"photo_url" VARCHAR (1000)
);
CREATE TABLE "providers" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" (id) NOT NULL,
	"license" VARCHAR (255) NOT NULL,
	"business_name" VARCHAR (255) NOT NULL,
	"street_address" VARCHAR (500) NOT NULL,
	"unit" VARCHAR (255) DEFAULT NULL,
	"city" VARCHAR (255) NOT NULL,
	"state" VARCHAR (2) NOT NULL,
	"zip" INT NOT NULL,
	"hours_open" VARCHAR (6),       -- test data not formatted for this 
	"hours_close" VARCHAR (6),      -- ""
	"rates" VARCHAR (1000),
	"meals" BOOLEAN DEFAULT FALSE,
	"business_description" TEXT,
	"personal_description" TEXT,
	"contract_language" TEXT
);
CREATE TABLE "provider_photos" (
	"id" SERIAL PRIMARY KEY,
	"provider_id" INT REFERENCES "providers" (id),
	"photo_url" VARCHAR (1000),
	"description" VARCHAR (1000)
);
CREATE TABLE "availability" (
	"id" SERIAL PRIMARY KEY,
	"provider_id" INT REFERENCES "providers" (id),
	"infant" INT DEFAULT NULL,
	"toddler" INT DEFAULT NULL,
	"pre_k" INT DEFAULT NULL,
	"schoolage" INT DEFAULT NULL,
	"date" DATE NOT NULL,
	"time_created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "bookings" (
	"id" SERIAL PRIMARY KEY,
	"provider_id" INT REFERENCES "providers" (id),
	"family_id" INT REFERENCES "families" (id),
	"child_id" INT REFERENCES "children" (id),
	"responsible_adult_id" INT REFERENCES "responsible_adults" (id),
	"user_id" INT REFERENCES "user" (id),
	"service_date" DATE,
	"time_submitted" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-------------------------------------------------- Starter Data ------------------------------------------------------------------------------
---STARTING FAMILY USER

INSERT INTO families ("family_name", "street_address", "unit", "city", "state", "zip", "photo_url", "access_code")
VALUES ('Ali', '123 New Street', null, 'MPLS', 'MN', 55407, 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png', null)
RETURNING id;

INSERT INTO user ("username", "password", "user_type", "family_id", "first_name", "last_name", "email", "phone_number", "photo_url",)
VALUES ('abc@123.com', 'password', 'family', 1, 'Mo', 'Ali', 'abc@123.com', '(555)555-5555', 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png')
RETURNING id;

INSERT INTO children (family_id, first_name, last_name, birthdate, allergies, potty_trained, photo_url)
VALUES (1, 'Lil', 'Buddy', '2020-12-20', 'n/a', false, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAyXqGFi_knOElmYPrlmlBU40lV5Czgc18w')

INSERT INTO children (family_id, first_name, last_name, birthdate, allergies, potty_trained, photo_url)
VALUES (1, 'Big', 'Buddy', '2018-01-05', 'The sun, the moon, Mars, and Jupiter', true, 'https://illustoon.com/photo/4044.png')

INSERT INTO children (family_id, first_name, last_name, birthdate, allergies, potty_trained, photo_url)
VALUES (1, 'Medium', 'Buddy', '2019-4-10', 'n/a', true, 'https://content.mycutegraphics.com/graphics/kids/boy-waving.png')

INSERT INTO responsible_adults (family_id, first_name, last_name, phone_number, email, relationship_to_child, photo_url)
VALUES (1, 'Pooh', 'Bear', '(123)456-7890', 'pooh@bear.com', 'Uncle', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ85JRO44bVUT1k5vsf4Kljah2GfDUdxe2jGA')


----------------------------------------
---STARTING PROVIDER USER

INSERT INTO user ("username", "password", "user_type", "family_id",	"first_name", "last_name", "email", "phone_number",	"photo_url")
VALUES ('def@456.com', 'password', 'provider', null, 'Winnie', 'Pooh', 'def@456.com', '(555)555-5556',  'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png')
RETURNING id;

INSERT INTO providers (	"user_id", "license", "business_name", "street_address", "unit", "city", "state", "zip", "hours", "rates", "meals", "business_description", "personal_description", "contract_language")
VALUES (2,'A1B2C3D4', 'Big Vibez Daycare', '456 New Street', null, 'MPLS', 'MN', 55407,'7:00', '17:00', 100, true, 'blah', 'blee', 'bluuuu' )
RETURNING user_id;


INSERT INTO availability (provider_id, infant, toddler, pre_k, schoolage, date)
VALUES (1, 2, 1, 3, 0, '2023-08-02');

INSERT INTO availability (provider_id, infant, toddler, pre_k, schoolage, date)
VALUES (1, 1, 2, 0, 0, '2023-08-03');

INSERT INTO availability (provider_id, infant, toddler, pre_k, schoolage, date)
VALUES (1, 1, 0, 0, 5, '2023-08-04');

INSERT INTO bookings (provider_id, family_id, child_id, responsible_adult_id, user_id, service_date, time_submitted)


------------------------------------------------------------------------------------------------------------------------



-- 										⌄⌄⌄⌄⌄  QUERIES A LA CARTE :D ⌄⌄⌄⌄⌄



--											⌄  AVAILABILITY  ⌄

--		GET ALL PROVIDER AVAILABILITIES ORDERED BY DATE ASC
`SELECT availability.*,
	providers.business_name AS biz_name,
	providers.street_address AS provider_street,
	providers.unit AS provider_unit,
	providers.city AS provider_city,
	providers.state AS provider_state,
	providers.zip AS provider_zip,
	providers.hours_open AS provider_open,
	providers.hours_close AS provider_close,
	providers.meals AS provider_meal
FROM availability
	JOIN providers ON availability.provider_id = providers.id
ORDER BY "date" ASC;`
--ADD A WHERE CLAUSE FOR PRE-FILTERING??????


--			GET ONE SPECIFIC PROVIDERS AVAILABILITY
`SELECT availability.*,
	providers.id AS provider_id,
	providers.business_name AS biz_name,
	providers.street_address AS provider_street,
	providers.unit AS provider_unit,
	providers.city AS provider_city,
	providers.state AS provider_state,
	providers.zip AS provider_zip,
	providers.hours_open AS provider_open,
	providers.hours_close AS provider_close,
	providers.meals AS provider_meal
FROM availability
	JOIN providers ON availability.provider_id = providers.id
WHERE providers.id = $1
ORDER BY "date" ASC;`


-- 				ADD AN INSTANCE OF AVAILABILITY
`INSERT INTO availability (
		provider_id,
		infant,
		toddler,
		pre_k,
		schoolage,
		date
	)
VALUES($1, $2, $3, $4, $5, $6);`


-- 				EDIT AN INSTANCE OF AVAILABILITY
`UPDATE availability
SET infant = $1,
	toddler = $2,
	pre_k = $3,
	schoolage = $4
WHERE id = $5;`
-- MORE GRANULAR?

--										 ^  AVAILABILITY  ^

-----------------------------------------------------------------------------------------------

--									 	⌄  BOOKINGS  ⌄


--GET ALL OF THE RELEVANT INFORMATION FOR ALL BOOKINGS
`SELECT bookings.id AS booking_id,
	bookings.service_date AS booked_day,
	bookings.time_submitted AS time_booked,
	providers.id AS provider_id,
	providers.business_name AS biz_name,
	providers.street_address AS provider_street,
	providers.unit AS provider_unit,
	providers.city AS provider_city,
	providers.state AS provider_state,
	providers.zip AS provider_zip,
	providers.hours_open AS provider_open,
	providers.hours_close AS provide_close,
	providers.meals AS provider_meal,
	children.id AS child_id,
	children.family_id AS child_fam_id,
	children.first_name AS child_first_name,
	children.last_name AS child_last_name,
	children.birthdate AS child_age,
	children.allergies AS child_allergies,
	children.potty_trained AS child_potty,
	children.photo_url AS child_pic,
	responsible_adults.id AS adult_id,
	responsible_adults.first_name AS adult_first_name,
	responsible_adults.last_name AS adult_last_name,
	responsible_adults.phone_number AS adult_number,
	responsible_adults.email AS adult_email,
	responsible_adults.relationship_to_child AS adult_relationship,
	responsible_adults.photo_url AS adult_pic,
	responsible_adults.family_id AS adult_fam_id,
	"user"."first_name" AS parent_first_name,
	"user"."last_name" AS parent_last_name,
	"user"."email" AS parent_email,
	"user"."phone_number" AS parent_number,
	"user"."photo_url" AS parent_pic,
	"user"."family_id" AS parent_fam_id,
	families.family_name AS fam_account_name,
	families.street_address AS fam_street_address,
	families.unit AS fam_unit,
	families.city AS fam_city,
	families.state AS fam_state,
	families.zip AS fam_zip,
	families.photo_url AS fam_pic
FROM bookings
	JOIN providers ON bookings.provider_id = providers.id
	JOIN children ON bookings.child_id = children.id
	JOIN responsible_adults ON bookings.responsible_adult_id = responsible_adults.id
	JOIN "user" ON bookings.user_id = "user".id
	JOIN families ON bookings.famiily_id = families.id
ORDER BY bookings.service_date ASC;`


-- GET ALL BOOKINGS BY FAMILYID
`SELECT bookings.id AS booking_id,
	bookings.service_date AS booked_day,
	bookings.time_submitted AS time_booked,
	providers.id AS provider_id,
	providers.business_name AS biz_name,
	providers.street_address AS provider_street,
	providers.unit AS provider_unit,
	providers.city AS provider_city,
	providers.state AS provider_state,
	providers.zip AS provider_zip,
	providers.hours_open AS provider_open,
	providers.hours_close AS provide_close,
	providers.meals AS provider_meal,
	children.id AS child_id,
	children.family_id AS child_fam_id,
	children.first_name AS child_first_name,
	children.last_name AS child_last_name,
	children.birthdate AS child_age,
	children.allergies AS child_allergies,
	children.potty_trained AS child_potty,
	children.photo_url AS child_pic,
	responsible_adults.id AS adult_id,
	responsible_adults.first_name AS adult_first_name,
	responsible_adults.last_name AS adult_last_name,
	responsible_adults.phone_number AS adult_number,
	responsible_adults.email AS adult_email,
	responsible_adults.relationship_to_child AS adult_relationship,
	responsible_adults.photo_url AS adult_pic,
	responsible_adults.family_id AS adult_fam_id,
	"user"."first_name" AS parent_first_name,
	"user"."last_name" AS parent_last_name,
	"user"."email" AS parent_email,
	"user"."phone_number" AS parent_number,
	"user"."photo_url" AS parent_pic,
	"user"."family_id" AS parent_fam_id,
	families.family_name AS fam_account_name,
	families.street_address AS fam_street_address,
	families.unit AS fam_unit,
	families.city AS fam_city,
	families.state AS fam_state,
	families.zip AS fam_zip,
	families.photo_url AS fam_pic
FROM bookings
	JOIN providers ON bookings.provider_id = providers.id
	JOIN children ON bookings.child_id = children.id
	JOIN responsible_adults ON bookings.responsible_adult_id = responsible_adults.id
	JOIN "user" ON bookings.user_id = "user".id
	JOIN families ON bookings.family_id = families.id
WHERE families.id = $1
ORDER BY bookings.service_date ASC;`


-- GET ALL BOOKINGS BY PROVIDERID
`SELECT bookings.id AS booking_id,
	bookings.service_date AS booked_day,
	bookings.time_submitted AS time_booked,
	providers.id AS provider_id,
	providers.business_name AS biz_name,
	providers.street_address AS provider_street,
	providers.unit AS provider_unit,
	providers.city AS provider_city,
	providers.state AS provider_state,
	providers.zip AS provider_zip,
	providers.hours_open AS provider_open,
	providers.hours_close AS provide_close,
	providers.meals AS provider_meal,
	children.id AS child_id,
	children.family_id AS child_fam_id,
	children.first_name AS child_first_name,
	children.last_name AS child_last_name,
	children.birthdate AS child_age,
	children.allergies AS child_allergies,
	children.potty_trained AS child_potty,
	children.photo_url AS child_pic,
	responsible_adults.id AS adult_id,
	responsible_adults.first_name AS adult_first_name,
	responsible_adults.last_name AS adult_last_name,
	responsible_adults.phone_number AS adult_number,
	responsible_adults.email AS adult_email,
	responsible_adults.relationship_to_child AS adult_relationship,
	responsible_adults.photo_url AS adult_pic,
	responsible_adults.family_id AS adult_fam_id,
	"user"."first_name" AS parent_first_name,
	"user"."last_name" AS parent_last_name,
	"user"."email" AS parent_email,
	"user"."phone_number" AS parent_number,
	"user"."photo_url" AS parent_pic,
	"user"."family_id" AS parent_fam_id,
	families.family_name AS fam_account_name,
	families.street_address AS fam_street_address,
	families.unit AS fam_unit,
	families.city AS fam_city,
	families.state AS fam_state,
	families.zip AS fam_zip,
	families.photo_url AS fam_pic
FROM bookings
	JOIN providers ON bookings.provider_id = providers.id
	JOIN children ON bookings.child_id = children.id
	JOIN responsible_adults ON bookings.responsible_adult_id = responsible_adults.id
	JOIN "user" ON bookings.user_id = "user".id
	JOIN families ON bookings.family_id = families.id
WHERE providers.id = $1
ORDER BY bookings.service_date ASC;`


-- CREATE A BOOKINGS INSTANCE
`INSERT INTO bookings (
		provider_id,
		child_id,
		responsible_adult_id,
		user_id,
		service_date
	)
VALUES ($1, $2, $3, $4, $5);`


-- REMOVE A SPECIFIC BOOKING INSTANCE
`DELETE FROM bookings
WHERE id = $1;`


--									 	^  BOOKINGS  ^

-----------------------------------------------------------------------------------------------

--										 ⌄  CHILDREN  ⌄

-- GET ALL CHILDREN FOR A SPECIFIC FAMILY
`SELECT *
FROM children
WHERE family_id = $1;`


-- EDIT A SPECIFIC CHILDS INFORMATION
`UPDATE children
SET first_name = $1,
	last_name = $2,
	birthdate = $3,
	allergies = $4,
	potty_trained = $5,
	photo_url = $6
WHERE id = $7;`


-- ADD A NEW CHILD
`INSERT INTO children (
		family_id,
		first_name,
		last_name,
		birthdate,
		allergies,
		potty_trained,
		photo_url
	)
VALUES ($1, $2, $3, $4, $5, $6, $7);`


-- DELETE A CHILD FROM FAMILY
`DELETE FROM children
WHERE id = $1;`


--											 ^  CHILDREN  ^

-----------------------------------------------------------------------------------------------

--											 ⌄  FAMILY  ⌄


-- GET FAMILY INFORMATION BY ID
`SELECT "user".first_name AS parent_first_name,
	"user".last_name AS parent_last_name,
	"user".email AS parent_email,
	"user".phone_number AS parent_number,
	"user".photo_url AS parent_pic,
	families.*
FROM "user"
	JOIN families ON "user".family_id = families.id
WHERE "user".family_id = $1;`


-- GET ALL FAMILY INFORMATION
`SELECT "user".first_name AS parent_first_name,
	"user".last_name AS parent_last_name,
	"user".email AS parent_email,
	"user".phone_number AS parent_number,
	"user".photo_url AS parent_pic,
	families.*
FROM "user"
	JOIN families ON "user".family_id = families.id;`


-- EDIT FAMILY INFORMATION
`UPDATE families
SET family_name = $1,
	street_address = $2,
	unit = $3,
	city = $4,
	state = $5,
	zip = $6,
	photo_url = $7,
	access_code = $8
WHERE id = $9;`

-- DELETE FAMILY BY ID
`DELETE FROM families
WHERE id = $1;`


--											 ^  FAMILY  ^

-----------------------------------------------------------------------------------------------

--								 			⌄  PROVIDERS  ⌄


-- GET A SPECIFIC PROVIDERS INFORMATION
`SELECT providers.*,
	"user".first_name,
	"user".last_name,
	"user".email,
	"user".phone_number,
	"user".photo_url AS provider_pic
FROM providers
	JOIN "user" ON providers.user_id = "user".id
WHERE providers.id = $1;`


-- GET ALL PROVIDER INFORMATION
`SELECT providers.*,
	"user".first_name AS prov_first_name,
	"user".last_name AS prov_last_name,
	"user".email AS prov_email,
	"user".phone_number AS prov_number,
	"user".photo_url AS prov_pic
FROM providers
	JOIN "user" ON providers.user_id = "user".id;`


-- EDIT A SPECIFIC PROVIDERS INFORMATION
`UPDATE providers
SET license = $1,
	business_name = $2,
	street_address = $3,
	unit = $4,
	city = $5,
	state = $6,
	zip = $7,
	hours_open = $8,
	hours_close = $9,
	rates = $10,
	meals = $11,
	business_description = $12,
	personal_description = $13,
	contract_language = $14
WHERE id = $15;`


-- REMOVE A SPECIFIC PROVIDER
`DELETE FROM providers
WHERE id = $1;`

--  										^  PROVIDERS  ^

-----------------------------------------------------------------------------------------------

--							 				⌄  PHOTOS  ⌄

-- GET ALL PROVIDER GALLERY PHOTOS
`SELECT *
FROM provider_photos
WHERE provider_id = $1;`


-- ADD TO PROVIDER PHOTO GALLERY
`INSERT INTO provider_photos (provider_id, photo_url, description)
VALUES ($1, $2, $3);`


-- REMOVE FROM PROVIDER PHOTO GALLERY
`DELETE FROM provider_photos
WHERE id = $1;`


--							 				^  PHOTOS  ^

----------------------------------------------------------------------------------------------------

--											 ⌄  RESP ADULTS  ⌄

-- GET ALL RESP ADULTS FOR A SPECIFIC FAMILY
`SELECT *
FROM responsible_adults
WHERE responsible_adults.family_id = $1;`


-- EDIT A RESP ADULTS INFORMATION
`UPDATE responsible_adults
SET first_name = $1,
	last_name = $2,
	phone_number = $3,
	email = $4,
	relationship_to_child = $5,
	photo_url = $6
WHERE id = $7;`


-- ADD A RESP ADULT
`INSERT INTO responsible_adults (
		family_id,
		first_name,
		last_name,
		phone_number,
		email,
		relationship_to_child,
		photo_url
	)
VALUES ($1, $2, $3, $4, $5, $6, $7);`

-- REMOVE A RESP ADULT
`DELETE FROM responsible_adults WHERE id = $1;`

--											 ^ RESP ADULTS  ^









-- ^^^ ^^^ --
-------------------------------------------------------------------------------------------------------------------------------
-- ⌄⌄⌄ PROVIDER DUMMY USERS  ⌄⌄⌄ --



-- Insert data into "user" table for all daycare providers
INSERT INTO "user" ("username", "password", "user_type", "family_id", "first_name", "last_name", "email", "phone_number", "photo_url")
VALUES
  ('tinaj', 'password123', 'provider', null, 'Tina', 'Johnson', 'tina.johnson@email.com', '(612) 456-7890', 'https://images.unsplash.com/photo-1521448414971-c35223aec21b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'),
  ('emilya', 'securepassword', 'provider', null, 'Emily', 'Anderson', 'emily.anderson@email.com', '(763) 789-2345', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBzbWlsaW5nfGVufDB8fDB8fHww&w=1000&q=80'),
  ('alejandrap', 'alejandraspassword', 'provider', null, 'Alejandra', 'Perez', 'alejandra.perez@email.com', '(651) 890-1234', 'https://media.istockphoto.com/id/1319019437/photo/hispanic-girl-smiling-on-camera-outdoor-in-city-park-focus-on-face.jpg?s=612x612&w=0&k=20&c=RA8tALy9lwfP3ZTEtp9BLy-Lghz5kDE7XYfCG39MS0E='),
  ('johnd', 'johnspassword', 'provider', null, 'John', 'Dorn', 'john.dorn@email.com', '(612) 345-6789', 'https://media.istockphoto.com/id/1281260617/photo/hipster-dude.jpg?s=612x612&w=0&k=20&c=Dz5IDhs2KaQLNmD9MoN8qkFoU6vqgGVX56fOwmAKnRk='),
  ('safiyaa', 'safiyaspassword', 'provider', null, 'Safiya', 'Abdirahman', 'safiya.abdirahman@email.com', '(651) 987-6543', 'https://www.shutterstock.com/shutterstock/photos/1714401466/display_1500/stock-photo-july-mogadishu-somalia-somali-women-who-help-turkish-health-teams-working-in-mogadishu-1714401466.jpg'),
  ('tomr', 'tomspassword', 'provider', null, 'Tom', 'Roberts', 'tom.roberts@email.com', '(612) 567-8901', 'https://www.westend61.de/images/0001560814pw/smiling-man-sitting-in-front-of-bright-window-at-home-MJRF00563.jpg'),
  ('alexh', 'alexspassword', 'provider', null, 'Alex', 'Harris', 'alex.harris@email.com', '(651) 789-0123', 'https://cdn.stocksnap.io/img-thumbs/960w/smiling-woman_W6GFOSFAXA.jpg'),
  ('pachouac', 'pachouaspassword', 'provider', null, 'Pachoua', 'Thao', 'pachoua.thao@email.com', '(612) 345-6789', 'https://www.wpr.org/sites/default/files/200929_language01.jpg'),
  ('davidg', 'davidspassword', 'provider', null, 'David', 'Greene', 'david.greene@email.com', '(651) 890-1234', 'https://media.istockphoto.com/id/1139540335/photo/mature-african-american-man-standing-outside-home.jpg?s=612x612&w=0&k=20&c=edtu8O48eQDngiX1eBnnOe_uxCPkxioX6Cjn-n3BIzg='),
  ('laurap', 'lauraspassword', 'provider', null, 'Laura', 'Parker', 'laura.parker@email.com', '(612) 345-6789', 'https://images.pexels.com/photos/1492156/pexels-photo-1492156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');




-- ^^^ PROVIDER DUMMY USERS ^^^ --
-------------------------------------------------------------------------------------------------------------------------------
-- ⌄⌄⌄ PROVIDER DUMMY PROFILES ⌄⌄⌄ --



-- Insert data into "providers" table using the corresponding "user_id"
INSERT INTO providers (user_id, license, business_name, street_address, unit, city, state, zip, hours_open, hours_close, rates, meals, business_description, personal_description, contract_language)
VALUES
  ((SELECT id FROM "user" WHERE "username" = 'tinaj'), 'MN1234', 'Little Explorers Daycare', '123 Oak St', null, 'Minneapolis', 'MN', 55401, '07:30', '17:30', '$40 per day', true, 'Little Explorers Daycare is a nurturing and fun-filled environment where young minds can learn and grow through play and exploration.', 'Hi, I''m Tina, the owner and administrator of Little Explorers Daycare. With a background in early childhood education, I''m committed to providing a safe and stimulating space for children to thrive.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),
  ((SELECT id FROM "user" WHERE "username" = 'emilya'), 'MN5678', 'ABC Kids Home Daycare', '456 Maple Ave', null, 'St. Paul', 'MN', 55105, '08:00', '18:00', '$35 per day', true, 'At ABC Kids Home Daycare, we foster a creative and supportive environment where children can explore and discover new interests.', 'Hello, I''m Emily, the proud owner and administrator of ABC Kids Home Daycare. With a passion for early childhood development, I''m dedicated to providing enriching experiences for your child.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),
  ((SELECT id FROM "user" WHERE "username" = 'alejandrap'), 'MN9101', 'Sunshine Daycare Center', '789 Main St', null, 'Richfield', 'MN', 55305, '07:00', '18:30', '$50 per day', true, 'Sunshine Daycare Center provides a warm and inclusive environment where children can explore and develop their natural curiosity.', 'Hi, I''m Alejandra, the director of Sunshine Daycare Center. With a background in early childhood education, I''m dedicated to fostering a love for learning in every child.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),
  ((SELECT id FROM "user" WHERE "username" = 'johnd'), 'MN2334', 'Tiny Tots Childcare', '101 Elm St', null, 'Minneapolis', 'MN', 55402, '07:00', '17:00', '$45 per day', true, 'Tiny Tots Childcare offers a play-based learning environment where children can thrive and build strong foundations for future success.', 'Hello, I''m John, the owner of Tiny Tots Childcare. As a licensed educator, I''m passionate about creating a supportive space for your child''s growth and development.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),
  ((SELECT id FROM "user" WHERE "username" = 'safiyaa'), 'MN4345', 'Kiddie Corner Daycare', '222 Pine St', null, 'St. Louis Park', 'MN', 55101, '08:30', '16:30', '$38 per day', true, 'Kiddie Corner Daycare is committed to providing a nurturing and safe environment where children can play, learn, and make new friends.', 'Hi, I''m Safiya, the owner of Kiddie Corner Daycare. With years of experience in childcare, I''m dedicated to fostering a love for discovery in every child.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),
  ((SELECT id FROM "user" WHERE "username" = 'tomr'), 'MN5612', 'Playful Pals Preschool', '333 Cedar St', null, 'Minnetonka', 'MN', 55345, '08:30', '18:30', '$55 per day', true, 'At Playful Pals Preschool, we believe in fostering creativity and imagination in a structured and engaging environment.', 'Hello, I''m Tom, the director of Playful Pals Preschool. With a background in early childhood development, I''m dedicated to providing a nurturing space for your child''s educational journey.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),
  ((SELECT id FROM "user" WHERE "username" = 'alexh'), 'MN1567', 'Nature Explorers Childcare', '444 Oak Ave', null, 'St. Paul', 'MN', 55102, '07:00', '18:00', '$45 per day', true, 'Nature Explorers Childcare provides a unique outdoor learning experience where children can connect with nature and develop a sense of wonder.', 'Hi, I''m Alex, the founder of Nature Explorers Childcare. With a passion for environmental education, I''m committed to nurturing your child''s love for the great outdoors.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),
  ((SELECT id FROM "user" WHERE "username" = 'pachouac'), 'MN7878', 'Creative Kids Academy', '555 Birch Rd', null, 'Minneapolis', 'MN', 55403, '08:00', '17:00', '$42 per day', true, 'Creative Kids Academy offers a stimulating and hands-on learning environment where children can explore their creativity.', 'Hello, I''m Pachoua, the director of Creative Kids Academy. With a background in art education, I''m passionate about fostering a love for the arts in young children.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),
  ((SELECT id FROM "user" WHERE "username" = 'davidg'), 'MN2938', 'Little Einsteins Child Development Center', '777 Maple Rd', null, 'St. Paul', 'MN', 55103, '07:30', '17:30', '$48 per day', true, 'Little Einsteins Child Development Center is dedicated to providing a stimulating and intellectually enriching environment for young minds.', 'Hi, I''m David, the owner of Little Einsteins Child Development Center. With a background in early childhood education, I''m committed to inspiring a love for learning in every child.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),
  ((SELECT id FROM "user" WHERE "username" = 'laurap'), 'MN1122', 'Adventureland Daycare', '888 Pine Ave', null, 'Blaine', 'MN', 55404, '08:00', '18:00', '$37 per day', true, 'Adventureland Daycare offers a play-based learning experience where children can embark on exciting adventures.', 'Hello, I''m Laura, the director of Adventureland Daycare. With a background in child psychology, I''m dedicated to providing a supportive space for your child''s social and emotional development.', 
  'Drop-ins are considered to be an odd day where care is needed. Each provider has a set price offered for a full day of care within they''re operating daily hours. Payment is confirmed and none refundable once a booking has been made. I/We as the legal parents/caregivers of the child, have read, understand and agree to the provider''s drop-in care terms as stated in this contract and in their profile on Daycare Drop-in. We further agree: - to provide the following supplies requested by the provider: [diapers, milk, formula, food, medication] - that the Childcare Provider may administer the following medications as appropriate and necessary for the child''s health: [medication authorization] - that the Childcare Provider may transport the child according to the terms of their license - to communicate in a timely manner with the provider on anything related to the child''s care for this date. The Childcare Provider agrees - to provide a safe and positive environment for the child - to provide any necessary items for the child''s care not requested above - to communicate in a timely manner with the parents/guardians of the child on anything related to the child''s care for this date. Completing this booking confirms that I/we agree to abide by the terms of this contract.'),





-- ^^^ PROVIDER DUMMY PROFILES ^^^ --
-------------------------------------------------------------------------------------------------------------------------------
-- ⌄⌄⌄ PROVIDER DUMMY AVAILABILITY ⌄⌄⌄ --



INSERT INTO availability (provider_id, infant, toddler, pre_k, schoolage, date)
VALUES 
-- Provider 7
(7, 1, 0, 1, 0, '2023-08-08'),
(7, 0, 1, 1, 0, '2023-08-09'),
(7, 0, 0, 1, 1, '2023-08-10'),
(7, 1, 1, 1, 1, '2023-08-11'),
(7, 0, 1, 0, 0, '2023-08-12'),
(7, 1, 0, 0, 1, '2023-08-13'),
(7, 1, 1, 0, 0, '2023-08-14'),
(7, 0, 0, 1, 1, '2023-08-15'),
(7, 1, 0, 1, 0, '2023-08-16'),
(7, 1, 1, 1, 1, '2023-08-17'),
(7, 0, 1, 0, 0, '2023-08-18'),
(7, 1, 0, 1, 0, '2023-08-19'),
(7, 0, 1, 0, 1, '2023-08-20'),
(7, 1, 1, 1, 0, '2023-08-21'),
(7, 0, 0, 1, 1, '2023-08-22'),
(7, 1, 0, 0, 1, '2023-08-23'),
(7, 1, 1, 0, 0, '2023-08-24'),
(7, 0, 0, 1, 1, '2023-08-25'),
(7, 1, 0, 1, 0, '2023-08-26'),
(7, 1, 1, 1, 1, '2023-08-27'),
(7, 0, 1, 0, 0, '2023-08-28'),
(7, 1, 0, 0, 1, '2023-08-29'),
(7, 0, 1, 1, 0, '2023-08-30'),
(7, 0, 0, 1, 1, '2023-08-31'),

-- Provider 8
(8, 0, 1, 0, 1, '2023-08-08'),
(8, 0, 0, 1, 0, '2023-08-09'),
(8, 1, 0, 1, 1, '2023-08-10'),
(8, 0, 1, 1, 0, '2023-08-11'),
(8, 0, 0, 1, 1, '2023-08-12'),
(8, 1, 1, 1, 0, '2023-08-13'),
(8, 0, 1, 0, 1, '2023-08-14'),
(8, 1, 0, 1, 0, '2023-08-15'),
(8, 0, 0, 1, 1, '2023-08-16'),
(8, 1, 1, 0, 0, '2023-08-17'),
(8, 0, 1, 0, 1, '2023-08-18'),
(8, 1, 0, 1, 0, '2023-08-19'),
(8, 0, 0, 1, 1, '2023-08-20'),
(8, 1, 1, 1, 0, '2023-08-21'),
(8, 0, 1, 0, 0, '2023-08-22'),
(8, 1, 0, 1, 1, '2023-08-23'),
(8, 0, 0, 1, 0, '2023-08-24'),
(8, 1, 1, 0, 1, '2023-08-25'),
(8, 0, 1, 0, 1, '2023-08-26'),
(8, 1, 0, 1, 0, '2023-08-27'),
(8, 0, 0, 1, 1, '2023-08-28'),
(8, 1, 1, 1, 0, '2023-08-29'),
(8, 0, 1, 0, 1, '2023-08-30'),
(8, 1, 0, 1, 0, '2023-08-31'),

-- Provider 9
(9, 0, 1, 0, 0, '2023-08-08'),
(9, 1, 1, 0, 1, '2023-08-09'),
(9, 0, 1, 1, 0, '2023-08-10'),
(9, 1, 0, 0, 1, '2023-08-11'),
(9, 0, 0, 1, 0, '2023-08-12'),
(9, 1, 1, 0, 0, '2023-08-13'),
(9, 0, 1, 1, 1, '2023-08-14'),
(9, 1, 0, 1, 0, '2023-08-15'),
(9, 0, 0, 1, 0, '2023-08-16'),
(9, 1, 1, 1, 0, '2023-08-17'),
(9, 0, 1, 0, 1, '2023-08-18'),
(9, 1, 0, 1, 0, '2023-08-19'),
(9, 0, 0, 1, 1, '2023-08-20'),
(9, 1, 1, 0, 0, '2023-08-21'),
(9, 0, 1, 0, 1, '2023-08-22'),
(9, 1, 0, 1, 0, '2023-08-23'),
(9, 0, 0, 1, 1, '2023-08-24'),
(9, 1, 1, 1, 0, '2023-08-25'),
(9, 0, 1, 0, 1, '2023-08-26'),
(9, 1, 0, 1, 0, '2023-08-27'),
(9, 0, 0, 1, 1, '2023-08-28'),
(9, 1, 1, 0, 0, '2023-08-29'),
(9, 0, 1, 0, 1, '2023-08-30'),
(9, 1, 0, 1, 0, '2023-08-31'),

-- Provider 10
(10, 0, 1, 0, 0, '2023-08-08'),
(10, 1, 0, 1, 0, '2023-08-09'),
(10, 0, 1, 1, 0, '2023-08-10'),
(10, 1, 0, 0, 1, '2023-08-11'),
(10, 0, 0, 1, 0, '2023-08-12'),
(10, 1, 1, 0, 0, '2023-08-13'),
(10, 0, 1, 1, 1, '2023-08-14'),
(10, 1, 0, 1, 0, '2023-08-15'),
(10, 0, 0, 1, 0, '2023-08-16'),
(10, 1, 1, 1, 0, '2023-08-17'),
(10, 0, 1, 0, 1, '2023-08-18'),
(10, 1, 0, 1, 0, '2023-08-19'),
(10, 0, 0, 1, 1, '2023-08-20'),
(10, 1, 1, 0, 0, '2023-08-21'),
(10, 0, 1, 0, 1, '2023-08-22'),
(10, 1, 0, 1, 0, '2023-08-23'),
(10, 0, 0, 1, 1, '2023-08-24'),
(10, 1, 1, 1, 0, '2023-08-25'),
(10, 0, 1, 0, 1, '2023-08-26'),
(10, 1, 0, 1, 0, '2023-08-27'),
(10, 0, 0, 1, 1, '2023-08-28'),
(10, 1, 1, 0, 0, '2023-08-29'),
(10, 0, 1, 0, 1, '2023-08-30'),
(10, 1, 0, 1, 0, '2023-08-31'),

-- Provider 11
(11, 1, 0, 1, 0, '2023-08-08'),
(11, 0, 1, 1, 0, '2023-08-09'),
(11, 0, 0, 1, 1, '2023-08-10'),
(11, 1, 1, 1, 1, '2023-08-11'),
(11, 0, 1, 0, 0, '2023-08-12'),
(11, 1, 0, 0, 1, '2023-08-13'),
(11, 1, 1, 0, 0, '2023-08-14'),
(11, 0, 0, 1, 1, '2023-08-15'),
(11, 1, 0, 1, 0, '2023-08-16'),
(11, 1, 1, 1, 1, '2023-08-17'),
(11, 0, 1, 0, 0, '2023-08-18'),
(11, 1, 0, 1, 0, '2023-08-19'),
(11, 0, 1, 0, 1, '2023-08-20'),
(11, 1, 1, 1, 0, '2023-08-21'),
(11, 0, 0, 1, 1, '2023-08-22'),
(11, 1, 0, 0, 1, '2023-08-23'),
(11, 1, 1, 0, 0, '2023-08-24'),
(11, 0, 0, 1, 1, '2023-08-25'),
(11, 1, 0, 1, 0, '2023-08-26'),
(11, 1, 1, 1, 0, '2023-08-27'),
(11, 0, 1, 0, 1, '2023-08-28'),
(11, 1, 0, 1, 0, '2023-08-29'),
(11, 0, 0, 1, 1, '2023-08-30'),
(11, 1, 1, 0, 0, '2023-08-31'),

-- Provider 12
(12, 0, 1, 0, 0, '2023-08-08'),
(12, 1, 0, 1, 0, '2023-08-09'),
(12, 0, 1, 1, 0, '2023-08-10'),
(12, 1, 0, 0, 1, '2023-08-11'),
(12, 0, 0, 1, 0, '2023-08-12'),
(12, 1, 1, 0, 0, '2023-08-13'),
(12, 0, 1, 1, 1, '2023-08-14'),
(12, 1, 0, 1, 0, '2023-08-15'),
(12, 0, 0, 1, 0, '2023-08-16'),
(12, 1, 1, 1, 0, '2023-08-17'),
(12, 0, 1, 0, 1, '2023-08-18'),
(12, 1, 0, 1, 0, '2023-08-19'),
(12, 0, 0, 1, 1, '2023-08-20'),
(12, 1, 1, 0, 0, '2023-08-21'),
(12, 0, 1, 0, 1, '2023-08-22'),
(12, 1, 0, 1, 0, '2023-08-23'),
(12, 0, 0, 1, 1, '2023-08-24'),
(12, 1, 1, 1, 0, '2023-08-25'),
(12, 0, 1, 0, 1, '2023-08-26'),
(12, 1, 0, 1, 0, '2023-08-27'),
(12, 0, 0, 1, 1, '2023-08-28'),
(12, 1, 1, 0, 0, '2023-08-29'),
(12, 0, 1, 0, 1, '2023-08-30'),
(12, 1, 0, 1, 0, '2023-08-31'),

-- Provider 13
(13, 1, 0, 1, 0, '2023-08-08'),
(13, 0, 1, 1, 0, '2023-08-09'),
(13, 0, 0, 1, 1, '2023-08-10'),
(13, 1, 1, 1, 1, '2023-08-11'),
(13, 0, 1, 0, 0, '2023-08-12'),
(13, 1, 0, 0, 1, '2023-08-13'),
(13, 1, 1, 0, 0, '2023-08-14'),
(13, 0, 0, 1, 1, '2023-08-15'),
(13, 1, 0, 1, 0, '2023-08-16'),
(13, 1, 1, 1, 1, '2023-08-17'),
(13, 0, 1, 0, 0, '2023-08-18'),
(13, 1, 0, 1, 0, '2023-08-19'),
(13, 0, 1, 0, 1, '2023-08-20'),
(13, 1, 1, 1, 0, '2023-08-21'),
(13, 0, 0, 1, 1, '2023-08-22'),
(13, 1, 0, 0, 1, '2023-08-23'),
(13, 1, 1, 0, 0, '2023-08-24'),
(13, 0, 0, 1, 1, '2023-08-25'),
(13, 1, 0, 1, 0, '2023-08-26'),
(13, 1, 1, 1, 0, '2023-08-27'),
(13, 0, 1, 0, 1, '2023-08-28'),
(13, 1, 0, 1, 0, '2023-08-29'),
(13, 0, 0, 1, 1, '2023-08-30'),
(13, 1, 1, 0, 0, '2023-08-31'),

-- Provider 14
(14, 0, 1, 0, 0, '2023-08-08'),
(14, 1, 0, 1, 0, '2023-08-09'),
(14, 0, 1, 1, 0, '2023-08-10'),
(14, 1, 0, 0, 1, '2023-08-11'),
(14, 0, 0, 1, 0, '2023-08-12'),
(14, 1, 1, 0, 0, '2023-08-13'),
(14, 0, 1, 1, 1, '2023-08-14'),
(14, 1, 0, 1, 0, '2023-08-15'),
(14, 0, 0, 1, 0, '2023-08-16'),
(14, 1, 1, 1, 0, '2023-08-17'),
(14, 0, 1, 0, 1, '2023-08-18'),
(14, 1, 0, 1, 0, '2023-08-19'),
(14, 0, 0, 1, 1, '2023-08-20'),
(14, 1, 1, 0, 0, '2023-08-21'),
(14, 0, 1, 0, 1, '2023-08-22'),
(14, 1, 0, 1, 0, '2023-08-23'),
(14, 0, 0, 1, 1, '2023-08-24'),
(14, 1, 0, 1, 0, '2023-08-25'),
(14, 0, 1, 0, 1, '2023-08-26'),
(14, 1, 1, 1, 0, '2023-08-27'),
(14, 0, 1, 0, 1, '2023-08-28'),
(14, 1, 0, 1, 0, '2023-08-29'),
(14, 0, 0, 1, 1, '2023-08-30'),
(14, 1, 1, 0, 0, '2023-08-31'),

-- Provider 15
(15, 0, 1, 0, 0, '2023-08-08'),
(15, 1, 0, 1, 0, '2023-08-09'),
(15, 0, 1, 1, 0, '2023-08-10'),
(15, 1, 0, 0, 1, '2023-08-11'),
(15, 0, 0, 1, 0, '2023-08-12'),
(15, 1, 1, 0, 0, '2023-08-13'),
(15, 0, 1, 1, 1, '2023-08-14'),
(15, 1, 0, 1, 0, '2023-08-15'),
(15, 0, 0, 1, 0, '2023-08-16'),
(15, 1, 1, 1, 0, '2023-08-17'),
(15, 0, 1, 0, 1, '2023-08-18'),
(15, 1, 0, 1, 0, '2023-08-19'),
(15, 0, 0, 1, 1, '2023-08-20'),
(15, 1, 1, 0, 0, '2023-08-21'),
(15, 0, 1, 0, 1, '2023-08-22'),
(15, 1, 0, 1, 0, '2023-08-23'),
(15, 0, 0, 1, 1, '2023-08-24'),
(15, 1, 0, 1, 0, '2023-08-25'),
(15, 0, 1, 0, 1, '2023-08-26'),
(15, 1, 1, 1, 0, '2023-08-27'),
(15, 0, 1, 0, 1, '2023-08-28'),
(15, 1, 0, 1, 0, '2023-08-29'),
(15, 0, 0, 1, 1, '2023-08-30'),
(15, 1, 1, 0, 0, '2023-08-31'),

-- Provider 16
(16, 0, 1, 0, 0, '2023-08-08'),
(16, 1, 0, 1, 0, '2023-08-09'),
(16, 0, 1, 1, 0, '2023-08-10'),
(16, 1, 0, 0, 1, '2023-08-11'),
(16, 0, 0, 1, 0, '2023-08-12'),
(16, 1, 1, 0, 0, '2023-08-13'),
(16, 0, 1, 1, 1, '2023-08-14'),
(16, 1, 0, 1, 0, '2023-08-15'),
(16, 0, 0, 1, 0, '2023-08-16'),
(16, 1, 1, 1, 0, '2023-08-17'),
(16, 0, 1, 0, 1, '2023-08-18'),
(16, 1, 0, 1, 0, '2023-08-19'),
(16, 0, 0, 1, 1, '2023-08-20'),
(16, 1, 1, 0, 0, '2023-08-21'),
(16, 0, 1, 0, 1, '2023-08-22'),
(16, 1, 0, 1, 0, '2023-08-23'),
(16, 0, 0, 1, 1, '2023-08-24'),
(16, 1, 0, 1, 0, '2023-08-25'),
(16, 0, 1, 0, 1, '2023-08-26'),
(16, 1, 1, 1, 0, '2023-08-27'),
(16, 0, 1, 0, 1, '2023-08-28'),
(16, 1, 0, 1, 0, '2023-08-29'),
(16, 0, 0, 1, 1, '2023-08-30'),
(16, 1, 1, 0, 0, '2023-08-31');


-- ^^^ PROVIDER DUMMY AVAILABILITY ^^^ --
-------------------------------------------------------------------------------------------------------------------------
-- ⌄⌄⌄ PROVIDER DUMMY PHOTOS ⌄⌄⌄ --


-- Provider 7
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (7, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (7, 'https://i.pinimg.com/1200x/af/37/c6/af37c60ab81070891ab8c22eefc80f2d.jpg', 'Outdoor area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (7, 'https://photo.weecare.co/public/photos/path/c55255.jpg', 'Art room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (7, 'https://shiningspiralahmedabad.files.wordpress.com/2017/04/ss-daycare-tbd-sleeparea.jpg', 'Nap room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (7, 'https://www.stonybrook.edu/childcare/images/panoramas/infant-toddler-dining-art-area.jpg', 'Dining area');

-- Provider 8
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (8, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (8, 'https://www.stonybrook.edu/childcare/images/panoramas/infant-toddler-dining-art-area.jpg', 'Dining area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (8, 'https://shiningspiralahmedabad.files.wordpress.com/2017/04/ss-daycare-tbd-sleeparea.jpg', 'Nap corner');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (8, 'https://content.ces.ncsu.edu/media/images/20150707_112833.jpg', 'Garden');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (8, 'https://photo.weecare.co/public/photos/path/c55255.jpg', 'Art area');

-- Provider 9
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (9, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (9, 'https://i.pinimg.com/1200x/af/37/c6/af37c60ab81070891ab8c22eefc80f2d.jpg', 'Outdoor playground');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (9, 'https://photo.weecare.co/public/photos/path/c55255.jpg', 'Art and craft area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (9, 'https://content.ces.ncsu.edu/media/images/20150707_112833.jpg', 'Garden');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (9, 'https://d14s8ycyuv5nuh.cloudfront.net/assets/2018/08/cosy-book-area.jpg', 'Story corner');

-- Provider 10
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (10, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (10, 'https://i.pinimg.com/1200x/af/37/c6/af37c60ab81070891ab8c22eefc80f2d.jpg', 'Outdoor play area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (10, 'https://www.stonybrook.edu/childcare/images/panoramas/infant-toddler-dining-art-area.jpg', 'Dining area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (10, 'https://shiningspiralahmedabad.files.wordpress.com/2017/04/ss-daycare-tbd-sleeparea.jpg', 'Sleeping area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (10, 'https://photo.weecare.co/public/photos/path/c55255.jpg', 'Art room');

-- Provider 11
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (11, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (11, 'https://d14s8ycyuv5nuh.cloudfront.net/assets/2018/08/cosy-book-area.jpg', 'Story corner');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (11, 'https://photo.weecare.co/public/photos/path/c55255.jpg', 'Art area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (11, 'https://www.stonybrook.edu/childcare/images/panoramas/infant-toddler-dining-art-area.jpg', 'Dining room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (11, 'https://content.ces.ncsu.edu/media/images/20150707_112833.jpg', 'Outdoor garden');

-- Provider 12
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (12, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (12, 'https://i.pinimg.com/1200x/af/37/c6/af37c60ab81070891ab8c22eefc80f2d.jpg', 'Outdoor playground');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (12, 'https://photo.weecare.co/public/photos/path/c55255.jpg', 'Craft area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (12, 'https://d14s8ycyuv5nuh.cloudfront.net/assets/2018/08/cosy-book-area.jpg', 'Story room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (12, 'https://content.ces.ncsu.edu/media/images/20150707_112833.jpg', 'Outdoor garden');

-- Provider 13
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (13, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (13, 'https://i.pinimg.com/1200x/af/37/c6/af37c60ab81070891ab8c22eefc80f2d.jpg', 'Outdoor playground');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (13, 'https://photo.weecare.co/public/photos/path/c55255.jpg', 'Arts and crafts area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (13, 'https://d14s8ycyuv5nuh.cloudfront.net/assets/2018/08/cosy-book-area.jpg', 'Story room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (13, 'https://content.ces.ncsu.edu/media/images/20150707_112833.jpg', 'Outdoor garden');

-- Provider 14
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (14, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (14, 'https://i.pinimg.com/1200x/af/37/c6/af37c60ab81070891ab8c22eefc80f2d.jpg', 'Outdoor playground');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (14, 'https://www.stonybrook.edu/childcare/images/panoramas/infant-toddler-dining-art-area.jpg', 'Dining area');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (14, 'https://d14s8ycyuv5nuh.cloudfront.net/assets/2018/08/cosy-book-area.jpg', 'Story room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (14, 'https://content.ces.ncsu.edu/media/images/20150707_112833.jpg', 'Outdoor garden');

-- Provider 15
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (15, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (15, 'https://i.pinimg.com/1200x/af/37/c6/af37c60ab81070891ab8c22eefc80f2d.jpg', 'Outdoor playground');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (15, 'https://photo.weecare.co/public/photos/path/c55255.jpg', 'Art room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (15, 'https://d14s8ycyuv5nuh.cloudfront.net/assets/2018/08/cosy-book-area.jpg', 'Story corner');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (15, 'https://content.ces.ncsu.edu/media/images/20150707_112833.jpg', 'Outdoor garden');

-- Provider 16
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (16, 'https://s3-media0.fl.yelpcdn.com/bphoto/WIQoZ3DvhgjEd1Od0Heobg/348s.jpg', 'Play room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (16, 'https://i.pinimg.com/1200x/af/37/c6/af37c60ab81070891ab8c22eefc80f2d.jpg', 'Outdoor playground');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (16, 'https://photo.weecare.co/public/photos/path/c55255.jpg', 'Art room');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (16, 'https://d14s8ycyuv5nuh.cloudfront.net/assets/2018/08/cosy-book-area.jpg', 'Story corner');
INSERT INTO "provider_photos" (provider_id, photo_url, description)
VALUES (16, 'https://content.ces.ncsu.edu/media/images/20150707_112833.jpg', 'Outdoor garden');



-- ^^^ PROVIDER DUMMY PHOTOS ^^^ --
--------------------------------------------------------------------------------------------------------------------------
-- ⌄⌄⌄ FAMILY DUMMY DATA ⌄⌄⌄ --

INSERT INTO "user" ("username", "password", "user_type", "family_id", "first_name", "last_name", "email", "phone_number","photo_url")
VALUES ('Halima@gmail.com', 'family','family', 3, 'Halima', 'Farah', 'Halima@gmail.com', '612-249-1234', 'https://dcdi-spike.s3.us-east-2.amazonaws.com/uploads/990ebd08-06b8-4747-8916-c848f4348feb-daycare-dropIn-Halima.png' );
 
     
INSERT INTO families ("family_name", "street_address", "unit", "city", "state", "zip", "photo_url", "access_code")
VALUES ('Ali Family', '123 4th Ave S', '1', 'Minneapolis', 'MN', 55409, 'https://i.postimg.cc/3J3cc6cN/home-5456376-1280.png', 'baby shark' )
RETURNING id;

INSERT INTO "children" ("family_id", "first_name", "last_name", "birthdate", "allergies", "potty_trained", "photo_url")
VALUES (3, 'Layla', 'Ali', '2022-10-01', 'none', 'FALSE', 'https://dcdi-spike.s3.us-east-2.amazonaws.com/uploads/7eafa8ce-38f3-454b-a3da-2bed61d33450-daycare-dropIn-infant.jpeg'),
(3, 'Aden', 'Ali', '2013-05-05', 'Cats', 'TRUE', 'https://dcdi-spike.s3.us-east-2.amazonaws.com/uploads/ac79f76a-d53a-4e85-b338-b9c7baa97691-daycare-dropIn-schoolAge.jpeg');





INSERT INTO "user" ("username", "password", "user_type", "family_id", "first_name", "last_name", "email", "phone_number", "photo_url")
VALUES ('fred@email.com', 'flinstones', 'family', 6, 'Fred', 'Flintstone', 'fred@example.com', '555-123-4567', 'https://static.wikia.nocookie.net/flinstones/images/e/ee/The_Flintstones_-_Character_Profile_Image_-_Fred_Flintstone.png/revision/latest?cb=20200128031714');


INSERT INTO families ("family_name", "street_address", "unit", "city", "state", "zip", "photo_url", "access_code")
VALUES ('Flintstone Family', '123 Bedrock St', '1', 'Bedrock', 'CA', 12345, 'https://www.remindmagazine.com/wp-content/uploads/2023/07/the-flinstones-cartoon-1014x570.jpg', 'yabbadabbadoo');

INSERT INTO "children" ("family_id", "first_name", "last_name", "birthdate", "allergies", "potty_trained", "photo_url")
VALUES (6, 'Pebbles', 'Flintstone', '2023-01-15', 'Dust', 'FALSE', 'https://www.pngkit.com/png/detail/230-2307650_baby-flintstones-baby-cartoon-characters-baby-clip-pebbles.png');

INSERT INTO responsible_adults (family_id, first_name, last_name, phone_number, email, relationship_to_child, photo_url)
VALUES (6, 'Wilma', 'Flintstone', '(555)123-4567', 'wilma@email.com', 'Mother', 'https://upload.wikimedia.org/wikipedia/en/9/97/Wilma_Flintstone.png');

INSERT INTO responsible_adults (family_id, first_name, last_name, phone_number, email, relationship_to_child, photo_url)
VALUES (6, 'Barney', 'Rubble', '(555)987-6543', 'barney@email.com', 'Uncle', 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Barney_Rubble.png/160px-Barney_Rubble.png');

INSERT INTO responsible_adults (family_id, first_name, last_name, phone_number, email, relationship_to_child, photo_url)
VALUES (6, 'Betty', 'Rubble', '(555)246-1357', 'betty@email.com', 'Aunt', 'https://upload.wikimedia.org/wikipedia/en/5/5e/Betty_Rubble.png');





INSERT INTO "children" ("family_id", "first_name", "last_name", "birthdate", "allergies", "potty_trained", "photo_url")
VALUES (7, 'Elroy', 'Jetson', '2018-01-15', 'Gravity', 'TRUE', 'https://static.wikia.nocookie.net/warner-bros-entertainment/images/8/89/Elroy_Jetson.png/revision/latest?cb=20160830064250');



INSERT INTO responsible_adults (family_id, first_name, last_name, phone_number, email, relationship_to_child, photo_url)
VALUES (7, 'Jane', 'Jetson', '(555)123-4567', 'jane@email.com', 'Mother', 'https://static.wikia.nocookie.net/warner-bros-entertainment/images/6/63/Jane_Jetson.jpg/revision/latest?cb=20160830064111');

INSERT INTO responsible_adults (family_id, first_name, last_name, phone_number, email, relationship_to_child, photo_url)
VALUES (7, 'Rosie', 'Robot', '(555)987-6543', 'rosie@email.com', 'Housekeeper', 'https://w7.pngwing.com/pngs/409/47/png-transparent-george-jetson-judy-jetson-elroy-jetson-rosie-the-robot-cartoon-amusement-park-cartoon-television-white-fictional-character-thumbnail.png');
