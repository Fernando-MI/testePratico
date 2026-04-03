import express from "express";
import path from "path";
import session from "express-session";
import { dbUsuario } from "./db/dbUsuario.js";
import { dbAgendamento } from "./db/dbAgendamento.js";
import dotenv from "dotenv"
// import { login } from "./authService.js"; // Certifique-se de implementar login

dotenv.config()
const app = express();
const port = process.env.SITE_PORT;

app.set("view engine", "ejs");

// ========== CONFIGURACOES ==========
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: "sessionId",
  secret: "secredoSecreto",
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: false }
}));


// ================= LANDING ==============

app.get('/', (req, res) => {
  res.render('landing');
});

// ================= CADASTRAR ================

app.get('/cadastro', (req, res) => {
  if (req.session.nome) return res.redirect('/home');
  res.render('cadastro');
});

app.post('/cadastro', async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;
  const db = new dbUsuario();
  await db.conectar();

  const usuario = await db.cadastrar(nome, email, senha, confirmarSenha);
  if (!usuario) {
    return res.render('cadastro', { error: "Não foi possível criar usuário" });
  }

  const usuario2 = await db.getOneByCredentials(email, senha);
  req.session.nome = usuario2.nome;
  req.session.uid = usuario2.uid;

  req.session.save(err => {
    if (err) {
      console.error("Erro ao salvar sessão:", err);
      return res.render('cadastro', { error: "Erro interno, tente novamente" });
    }
    return res.redirect('/home');
  });
});


// ================= LOGIN ================

app.get('/login', (req, res) => {
  if (req.session.nome) return res.redirect('/home');
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const db = new dbUsuario();
  await db.conectar();

  const usuario = await db.getOneByCredentials(email, senha); 
  if (!usuario) {
    return res.render('login', { error: "Email ou senha inválidos" });
  }

  req.session.nome = usuario.nome;
  req.session.uid = usuario.uid;

  req.session.save(err => {
    if (err) {
      console.error("Erro ao salvar sessão:", err);
      return res.render('login', { error: "Nao foi possivel logar" });
    }
    return res.redirect('/home');
  });
});

// ================= HOME =================

app.get('/home', authMiddleware, async (req, res) => {
    const db = new dbAgendamento();
    await db.conectar();

    let listaAgendamentos = await db.getAgendamentos(req.session.uid);


  res.render('home', { nome: req.session.nome, listaAgendamento: listaAgendamentos });
});


app.post('/home', async (req, res) => {
  const { servicos, data, horario, observacoes } = req.body;
  let servicoStr
  try {
    servicoStr = servicos.join()
  } catch {
    servicoStr = servicos

  }
  const db = new dbAgendamento();
  await db.conectar();

  let retorno =  await db.agendar(servicoStr, data, horario, observacoes, req.session.uid)
  if (!retorno) {
    return res.render('home', { error: "Não foi possível criar agendamento" });
  }
  
  let listaAgendamentos = await db.getAgendamentos(req.session.uid);
  console.log(listaAgendamentos)
  return res.render("home", {listaAgendamento: listaAgendamentos || []})
  
});

// ================= EDIT E VER ===========
app.get('/agendamento/:aaid/:flagIsEdit', async (req, res) => {
  const aaid = req.params.aaid;
  const flagIsEdit = req.params.flagIsEdit;
  const db = new dbAgendamento();
  await db.conectar();

  let informacoesAgendamento = await db.getAgendamentoByAaid(aaid);

  console.log(informacoesAgendamento[0][0]);

  res.render('agendamento', {infoVelha: informacoesAgendamento[0][0], isEdit: flagIsEdit})
});

app.post('/agendamento/:aaid/:flagIsEdit', async (req, res) => {
  const aaid = req.params.aaid;
  const flagIsEdit = req.params.flagIsEdit;
  const { servicos, data, horario, observacoes } = req.body;
  let servicoStr = servicos.join()
  const db = new dbAgendamento();
  await db.conectar();

  let retorno =  await db.agendamentoUpdate(aaid, servicoStr, data, horario, observacoes)
  if (!retorno) {
    return res.render('home', { error: "Não foi possível criar agendamento" });
  }
  return res.redirect("/home")
});


// ================= SAIR =================
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/');
  });
});


function authMiddleware(req, res, next) {
  if (req.session.nome) return next();
  return res.redirect('/login');
}


app.listen(port, () => {
  console.log(`App rodando em http://127.0.0.1:${port}`);
});