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
	senha varchar(20)
);


INSERT INTO usuario (email, nome, cpf, nascimento, endereco, cidade, estado, senha)
VALUES 
('joao.silva@email.com', 'João Silva', '123.456.789-00', '1995-06-15', 'Rua das Flores, 123', 'São Paulo', 'SP', 'senha123');

INSERT INTO usuario (email, nome, cpf, nascimento, endereco, cidade, estado, senha)
VALUES 
('maria.souza@email.com', 'Maria Souza', '987.654.321-00', '1988-12-01', 'Av. Brasil, 456', 'Rio de Janeiro', 'RJ', 'maria88');

INSERT INTO usuario (email, nome, cpf, nascimento, endereco, cidade, estado, senha)
VALUES 
('lucas.oliveira@email.com', 'Lucas Oliveira', '321.654.987-00', '2000-03-22', 'Rua Central, 789', 'Belo Horizonte', 'MG', 'lucas2000');

INSERT INTO usuario (email, nome, cpf, nascimento, endereco, cidade, estado, senha)
VALUES 
('ana.costa@email.com', 'Ana Costa', '159.753.486-00', '1993-09-10', 'Av. das Américas, 1010', 'Curitiba', 'PR', 'ana1993');

INSERT INTO usuario (email, nome, cpf, nascimento, endereco, cidade, estado, senha)
VALUES 
('pedro.almeida@email.com', 'Pedro Almeida', '741.852.963-00', '1990-11-05', 'Rua do Comércio, 202', 'Porto Alegre', 'RS', 'pedro90');