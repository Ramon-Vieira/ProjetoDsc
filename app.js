const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

// Rotas Front
const indexRouter = require("./routes/index");
const criarCadastroRouter = require("./routes/criarCadastro");
const criarChamadoRouter = require("./routes/criarChamado");
const criarSalasRouter = require("./routes/criarSalas");
const dashboardRouter = require("./routes/dashboard");

// Rotas Back
const auth = require("./routes/auth")
const addSalasRouter = require("./routes/addSalas");
const addChamadoRouter = require("./routes/addChamado");
const addCadastroRouter = require("./routes/addCadastro");
const delSalasRouter = require("./routes/delSalas");
const logoutRouter = require("./routes/logout");

// Config Handlebars
app.set("views", __dirname + "/views");
app.engine(
  "hbs",
  handlebars({
    defaultLayout: "main",
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");

// Config Sessão
app.use(
  session({
    secret: "F0rCh4n.102",
    resave: true,
    saveUninitialized: true,
    expires: new Date(Date.now() + (20 * 60 * 1000)),
  })
);
app.use(flash());

// Definindo minhas variaveis de mensagens globais
app.use((req, res, next) => {
  res.locals.msgSuccess = req.flash("msgSuccess");
  res.locals.msgError = req.flash("msgError");
  next();
});

// Config bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Definindo diretorio publico
app.use(express.static(__dirname + "/public"));

// Rotas

// Front
app.use("/", indexRouter);
app.use("/auth",auth);
app.use("/criarCadastro", verifyLogin,criarCadastroRouter);
app.use("/criarChamado", verifyLogin,criarChamadoRouter);
app.use("/criarSalas", verifyLogin,criarSalasRouter);
app.use("/dashboard", verifyLogin,dashboardRouter);

// Back
app.use("/addSalas", addSalasRouter);
app.use("/addChamado", addChamadoRouter);
app.use("/addCadastro", addCadastroRouter);
app.use("/logout", logoutRouter);
app.use("/delSalas", delSalasRouter);

app.listen(3000);

function verifyLogin(req, res, next) {
  if (!req.session.idUser) {
    return res.redirect("/");
  }
  return next();
} 