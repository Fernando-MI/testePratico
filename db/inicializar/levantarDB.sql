USE testePraticoDsin;
CREATE TABLE usuarios(
  uid INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  senha VARCHAR(50) NOT NULL
);

INSERT INTO usuarios(nome, email, senha) VALUE ("Leila", "leila@email.com", "!Trocar123");
INSERT INTO usuarios(nome, email, senha) VALUE ("Ana", "ana@email.com", "senhaAna123@");

CREATE TABLE agendamentos(
  -- aaid = AGENDAMENTO AGENDAMENTO ID
  aaid INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  servicos VARCHAR(200) NOT NULL,
  dia DATE NOT NULL,
  horario TIME NOT NULL,
  observacoes VARCHAR(200) DEFAULT "",
  -- auid = USER ID
  auid INT UNSIGNED NOT NULL,
  CONSTRAINT fk_agendamento_usuario FOREIGN KEY (auid) REFERENCES usuarios (uid)
);

CREATE TABLE sessions (
  session_id VARCHAR(128) PRIMARY KEY,
  expires int NOT NULL,
  info VARCHAR(300)
)