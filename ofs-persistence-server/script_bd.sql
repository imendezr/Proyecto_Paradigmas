-- Crear la base de datos
CREATE DATABASE ofs_db;

-- Usar la base de datos
USE ofs_db;

-- Crear la tabla de scripts
CREATE TABLE scripts (
    id VARCHAR(255) PRIMARY KEY,
    code TEXT NOT NULL
);

select * from scripts;