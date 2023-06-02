create database Biblioteca_Pessoal;

create table livros (
  titulo text, 
  autor text, 
  paginas integer, 
	genero text,
  tipo text
  );

create table usuarios (
  id serial primary key,
  nome text,
  idade text,
  email text not null,
  senha text not null
  );