insert into students(name,surname,email,age,created_at) values
('Tural','Abdullayev','tabdullayev@gmail.com',21,CURRENT_TIMESTAMP);

insert into students(name,surname,email,age,created_at) values
('Orxan','Memmedov','orxanmm@gmail.com',29,CURRENT_TIMESTAMP);

insert into students(name,surname,email,age,created_at) values
('Aygun','Isayeva','isayeva000@gmail.com',19,CURRENT_TIMESTAMP);


INSERT INTO roles (name) VALUES ( 'ROLE_GET');
INSERT INTO roles (name) VALUES ( 'ROLE_ADD');
INSERT INTO roles (name) VALUES ( 'ROLE_UPDATE');
INSERT INTO roles (name) VALUES ( 'ROLE_DELETE');

INSERT INTO users (username, password) VALUES ( 'u1', '$2a$12$wLp7GP/z8aLks/C6PXaGxeMmjGHGFhbMlL9Ux61J5vYaKat48UTsm');
INSERT INTO users (username, password) VALUES (  'james', '$2a$12$s3cW/xAFN4eyKxjt9fTLqudLj8bICFax5TlV6glv2ieXblpHWUTam');

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 3);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 4);

INSERT INTO user_roles (user_id, role_id) VALUES (2, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);