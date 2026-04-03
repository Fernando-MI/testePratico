USE testePraticoDsin;

CREATE TABLE usuarios(
  uid INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  senha VARCHAR(50) NOT NULL
);

INSERT INTO usuarios(nome, email, senha) VALUE ("Leila", "leila@email.com", "!Trocar123");
INSERT INTO usuarios(nome, email, senha) VALUE ("Ana", "ana@email.com", "senhaAna123@");
INSERT INTO usuarios(nome, email, senha) VALUE ("Marcia", "marcia@email.com", "senhaMarcia123@");

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

INSERT INTO agendamentos(servicos, dia, horario, auid) VALUE("depilacao-corte", "2026-04-3", "12:30", 2);
INSERT INTO agendamentos(servicos, dia, horario, auid) VALUE("depilacao-corte", "2026-04-12", "12:30", 2);
INSERT INTO agendamentos(servicos, dia, horario, auid) VALUE("luzes-pedicure", "2026-04-13", "12:30", 3);