create database if not exists kiwi_estetica;
use kiwi_estetica;

-- =========================
-- tabela: administradores
-- =========================
create table administradores (
    id int not null auto_increment primary key,
    email varchar(150) not null,
    nome varchar(150) not null,
    cargo varchar(100) not null,
    senha varchar(255) not null 
);

-- =========================
-- tabela: agendamentos
-- =========================
create table agendamentos (
    id int not null auto_increment primary key,
    nome varchar(150) not null,
    celular varchar(20) not null,
    categoria varchar(100) not null,
    procedimento varchar(150) not null,
    data date not null,
    horario time not null,
    status varchar(50) not null 
);
