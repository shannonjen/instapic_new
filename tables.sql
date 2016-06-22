DROP DATABASE IF EXISTS instapics;
CREATE DATABASE instapics;

\c instapics;

CREATE TABLE users (
	id		serial primary	key,
	username 	text,
	password 	text	
);

CREATE TABLE pics (
	id		serial primary key,
	user_id	int 		references	users(id),
	title		text,
	src		text
);	


INSERT INTO users (username, password) VALUES ('elliot', '1234'),
('nileesha', '1234'),
('leester', '1234'),
('neha', '1234');

INSERT INTO pics (user_id, title, src) VALUES ('1', 'Always be coding', 'pic1.jpg'),
('1', 'Live from the Space Dome','pic2.jpg'),
('2', 'I just hacked into your account', 'pic3.jpg'),
('3', 'I am the codelord', 'pic4.jpg'),
('3', 'Potatoes & WHAT!!??', 'pic7.jpg'),
('3', 'The Mothership', 'pic6.jpg'),
('4', 'Loving this view!', 'pic5.jpg');





