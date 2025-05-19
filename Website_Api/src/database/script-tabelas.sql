-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE portal_do_peixe;

USE portal_do_peixe;

create table usuario(
	idCadastro int not null auto_increment primary key,
	email varchar(70),
	nome varchar(70),
	cpf char(14),
	nascimento date,
	endereco varchar(70),
	cidade varchar(70),
	estado char(2),
	senha varchar(255)
);


create table pergunta (
    idPergunta int primary key auto_increment,
    texto varchar(255)
);

create table alternativa (
    idAlternativa int primary key auto_increment,
    fkPergunta int not null,
    texto varchar(255),
    foreign key (fkPergunta) references pergunta(idPergunta)
);

create table resposta_usuario (
    idResposta_Usuario int primary key auto_increment,
    fkUsuario int not null,
    fkPergunta int not null,
    fkAlterativa int not null,
    foreign key (fkUsuario) references usuario(idCadastro),
    foreign key (fkPergunta) references pergunta(idPergunta),
    foreign key (fkAlterativa) references alternativa(idAlternativa)
);

