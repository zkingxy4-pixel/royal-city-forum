-- Royal City RP — banco MariaDB / HeidiSQL
-- 1. Abra o HeidiSQL e conecte no MariaDB (geralmente 127.0.0.1, porta 3306, usuário root).
-- 2. Arquivo > Executar arquivo SQL... e escolha este arquivo.
-- 3. Crie o usuário royalcity com uma senha FORTE (nunca a mesma do GitHub).
-- 4. Coloque a mesma senha em .env.local (DB_PASSWORD). Não coloque senha neste arquivo.

CREATE DATABASE IF NOT EXISTS royal_city
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CREATE USER IF NOT EXISTS 'royalcity'@'localhost' IDENTIFIED BY 'COLOQUE_UMA_SENHA_FORTE';
-- CREATE USER IF NOT EXISTS 'royalcity'@'127.0.0.1' IDENTIFIED BY 'COLOQUE_UMA_SENHA_FORTE';
-- GRANT ALL PRIVILEGES ON royal_city.* TO 'royalcity'@'localhost';
-- GRANT ALL PRIVILEGES ON royal_city.* TO 'royalcity'@'127.0.0.1';
-- FLUSH PRIVILEGES;

USE royal_city;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(32) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_nickname (nickname)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  token CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sessions_token (token),
  KEY idx_sessions_user (user_id),
  KEY idx_sessions_expires (expires_at),
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS influencer_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NULL,
  nome VARCHAR(120) NOT NULL,
  instagram VARCHAR(120) NOT NULL,
  canal VARCHAR(120) NOT NULL,
  plataforma VARCHAR(80) NOT NULL,
  seguidores VARCHAR(40) NOT NULL,
  views_media VARCHAR(40) NOT NULL,
  perfil_url VARCHAR(255) NOT NULL,
  conteudo_url VARCHAR(255) NOT NULL,
  motivo TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_influencer_user (user_id),
  CONSTRAINT fk_influencer_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
