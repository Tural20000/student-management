insert into students(name,surname,email,age,created_at) values
('Tural','Abdullayev','tabdullayev@gmail.com',21,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Orxan','Memmedov','orxanmm@gmail.com',29,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Aygun','Isayeva','isayeva000@gmail.com',19,CURRENT_TIMESTAMP);

insert into students(name,surname,email,age,created_at) values
('Elvin','Həsənov','elvin.hasanov@mail.az',22,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Səbinə','Məmmədova','sabina.mammadova@outlook.com',20,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Rəşad','Quliyev','rashad.guliyev@yandex.ru',25,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Leyla','Cəfərova','leyla.jafarova@gmail.com',23,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Kamran','Əliyev','kamran.aliyev@mail.ru',28,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Nərmin','Bayramova','nermin.bayramova@gmail.com',19,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Tərlan','Rəhimov','terlan.rahimov@inbox.az',24,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Günəş','Məlikova','gunes.malikova@hotmail.com',21,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Vüqar','Səfərov','vuqar.safarov@mail.az',27,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Dilbər','Nəsirova','dilber.nasirova@gmail.com',22,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Rövşən','Cəbiyev','rovshan.jabiyev@yahoo.com',26,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Sevinc','Əhmədova','sevinc.ahmadova@outlook.com',20,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Elşən','Novruzov','elshan.novruzov@mail.ru',29,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Aysel','Qurbanova','aysel.gurbanova@gmail.com',23,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Rəşid','Hüseynov','rashid.huseynov@inbox.az',25,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Zəhra','İsmayılova','zahra.ismailova@yandex.ru',18,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Tahir','Şükürov','tahir.shukurov@mail.az',30,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Günel','Muradova','gunel.muradova@hotmail.com',21,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Cavid','Əsədov','cavid.asadov@gmail.com',24,CURRENT_TIMESTAMP);
insert into students(name,surname,email,age,created_at) values
('Leyla','Vəliyeva','leyla.valiyeva@outlook.com',22,CURRENT_TIMESTAMP);

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