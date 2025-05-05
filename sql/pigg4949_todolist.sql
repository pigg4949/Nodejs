use todolist;

# 테이블 만들기
create table user (
    userid varchar(40) primary key,
    userpw varchar(100) not null,
    name varchar(20) not null,
    email varchar(50) not null,
    regdate datetime default now()
);

drop table user;

create table post (
no int auto_increment primary key,
userid varchar(40) not null,
content varchar(1000) not null,
postdate datetime default now(),
deadline date not null,
foreign key(userid) references user(userid)
);

alter table post modify column deadline date not null;
alter table post modify column postdate date default now();
alter table user modify column email varchar(50) not null unique;

select * from user;
select * from post;