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

INSERT INTO users (username, password) VALUES ( 'admin', '$2a$12$WUQQkZFL5ZHO0LCUNVvdkugoHWruktM7RdJi.eLNiA5Gpkc7KODbu');
INSERT INTO users (username, password) VALUES (  'u2', '$2a$12$.QOp/RM/H75Y76Kct6pM6effcHVzy0VVkMTHWKmJdWmv.e7E0ahf6');

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 3);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 4);

INSERT INTO user_roles (user_id, role_id) VALUES (2, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 3);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 4);