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

CREATE TABLE questionario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fkCadastro INT,
  q1 VARCHAR(255),
  q2 VARCHAR(255),
  q3 VARCHAR(255),
  q4 VARCHAR(255),
  q5 VARCHAR(255),
  q6 VARCHAR(255),
  q7 VARCHAR(255),
  q8 VARCHAR(255),
  q9 VARCHAR(255),
  q10 VARCHAR(255),
  FOREIGN KEY (fkCadastro) REFERENCES usuario(idCadastro)
);

INSERT INTO usuario (email, nome, cpf, nascimento, endereco, cidade, estado, senha) VALUES
('joao.silva@gmail.com', 'João Silva', '123.456.789-00', '1990-01-15', 'Rua A, 100', 'Santos', 'SP', 'senha123'),
('maria.oliveira@gmail.com', 'Maria Oliveira', '234.567.890-11', '1985-05-22', 'Rua B, 200', 'São Paulo', 'SP', 'senha123'),
('carlos.souza@gmail.com', 'Carlos Souza', '345.678.901-22', '1992-08-10', 'Rua C, 300', 'Campinas', 'SP', 'senha123'),
('ana.lima@gmail.com', 'Ana Lima', '456.789.012-33', '1996-03-18', 'Rua D, 400', 'Guarulhos', 'SP', 'senha123'),
('paulo.costa@gmail.com', 'Paulo Costa', '567.890.123-44', '1988-07-30', 'Rua E, 500', 'Santos', 'SP', 'senha123'),
('beatriz.alves@gmail.com', 'Beatriz Alves', '678.901.234-55', '1994-12-12', 'Rua F, 600', 'Ribeirão Preto', 'SP', 'senha123'),
('lucas.martins@gmail.com', 'Lucas Martins', '789.012.345-66', '1991-11-11', 'Rua G, 700', 'Santos', 'SP', 'senha123'),
('juliana.rocha@gmail.com', 'Juliana Rocha', '890.123.456-77', '1997-06-06', 'Rua H, 800', 'São Vicente', 'SP', 'senha123'),
('fernando.ferreira@gmail.com', 'Fernando Ferreira', '901.234.567-88', '1993-04-25', 'Rua I, 900', 'Praia Grande', 'SP', 'senha123'),
('carolina.mendes@gmail.com', 'Carolina Mendes', '012.345.678-99', '1999-09-09', 'Rua J, 1000', 'Santos', 'SP', 'senha123');

INSERT INTO questionario (fkCadastro, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10) VALUES
(1, 'Pelé', 'Libertadores 2011', 'Lula', 'Libertadores', 'Anos 60', 'Neymar', 'Vila Belmiro', 'Corinthians', 'Tradicional listrada', '18 a 29'),
(2, 'Neymar', 'Brasileirão 2002', 'Muricy Ramalho', 'Mundial de Clubes', 'Anos 2010', 'Robinho', 'Pacaembu', 'Palmeiras', 'Preta reserva', '30 a 45'),
(3, 'Pelé', 'Mundial 1962', 'Lula', 'Brasileirão', 'Anos 60', 'Giovanni', 'Vila Belmiro', 'Flamengo', 'Branca lisa', 'Mais de 45'),
(4, 'Coutinho', 'Paulistão 2010', 'Dorival Júnior', 'Copa do Brasil', 'Anos 2000', 'Rodrygo', 'Maracanã', 'São Paulo', 'Retrô', '18 a 29'),
(5, 'Zito', 'Mundial 1962', 'Leão', 'Mundial de Clubes', 'Anos 2010', 'Neymar', 'Vila Belmiro', 'Corinthians', 'Tradicional listrada', '30 a 45'),
(6, 'Pelé', 'Libertadores 2011', 'Lula', 'Libertadores', 'Anos 60', 'Giovanni', 'Pacaembu', 'Palmeiras', 'Branca lisa', 'Mais de 45'),
(7, 'Neymar', 'Brasileirão 2002', 'Muricy Ramalho', 'Copa do Brasil', 'Atual', 'Robinho', 'Morumbi', 'São Paulo', 'Preta reserva', '18 a 29'),
(8, 'Pelé', 'Mundial 1962', 'Lula', 'Brasileirão', 'Anos 60', 'Neymar', 'Vila Belmiro', 'Flamengo', 'Tradicional listrada', '30 a 45'),
(9, 'Coutinho', 'Paulistão 2010', 'Dorival Júnior', 'Libertadores', 'Anos 2000', 'Rodrygo', 'Maracanã', 'Palmeiras', 'Retrô', 'Menos de 18'),
(10, 'Zito', 'Libertadores 2011', 'Leão', 'Mundial de Clubes', 'Anos 2010', 'Giovanni', 'Morumbi', 'Corinthians', 'Branca lisa', '18 a 29');






select * from usuario;
select * from questionario;


