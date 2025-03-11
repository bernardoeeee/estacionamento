create database cadastro_carros;
use cadastro_carros;

create table cadastro(
	 id_cadastro int auto_increment primary key,
     name varchar(255) not null,
     CPF varchar(11) unique not null
);

create table login(
	id_user int not null auto_increment primary key,
    name varchar(255) not null,
    CPF varchar(11) unique not null
);

create table carros(
	id_carro int primary key auto_increment,
    placa varchar(7) unique not null,
    marca varchar(255) not null,
    modelo varchar(255) not null,
    vaga enum("normal", "gestante", "deficiente", "idoso") default("normal")
);

select * from cadastro;
drop table carros;
select * from login;
select * from carros;

DELETE FROM carros WHERE placa = 1 ;

insert into carros(placa_carro, marca_carro, modelo_carro) values ('LSN4I49', 'Ford','Mustang');
insert into login (name, CPF) values('Any', '02578638906');