create database Biblioteca_Pessoal;

create table usuarios (
  id serial primary key,
  nome text,
  email text,
  senha text
  );
  create table clientes (
    id serial primary key,
    nome text,
    email text);
create table livros (
  id serial primary key,
  titulo text, 
  autor text, 
	genero text
  );
  create table emprestimos (
    titulo text,
    autor text,
    email text
  );



















