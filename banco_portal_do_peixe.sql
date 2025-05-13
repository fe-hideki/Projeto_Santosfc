create database portal_do_peixe;
use portal_do_peixe;

create table cadastro(
email varchar(70),
nome varchar(70),
cpf char(14),
dt_nascimento date,
endereco varchar(70),
cidade varchar(70),
sigla char(2),
senha varchar(20)
);