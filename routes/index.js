const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* IMPLEMENTAÇÃO DE LOGIN E GERAÇÃO DE TOKEN (JWT) PARA AUTENTICAÇÃO */
router.post("/login", async function (req, res, next) {
  if (req.body.username === "admin" && req.body.password === "senhasecreta") {
    const jwtToken = await jwt.sign({ usuario: "admin" }, "Babi123456");
    res.json({ msg: "Usuário logado com sucesso.", token: jwtToken });
  } else {
    res.json({ msg: "Credenciais inválidas." });
  }
});

//############################### SETORES ##################################
// const setores = [
//   {
//     id: 1,
//     nome: "vestidos",
//   },
//   {
//     id: 2,
//     nome: "macacões",
//   },
//   {
//     id: 3,
//     nome: "croppeds",
//   },
//   {
//     id: 4,
//     nome: "saias",
//   },
//   {
//     id: 5,
//     nome: "blusas",
//   },
// ];

const setorSchema = new mongoose.Schema({ nome: "string" });
const setores = mongoose.model("setores", setorSchema);

router.get("/setores", async function (req, res, next) {
  const data = await setores.find();
  res.json({ dados: data });
});

router.get("/setores/:id", async function (req, res, next) {
  let data;
  try {
    data = await setores.findById(req.params.id);
  } catch (e) {
    return res.json({ msg: "Id inválido." });
  }

  if (data === null) {
    return res.json({ msg: "Id inválido." });
  }

  res.json({ dados: data });
});

router.post("/setores", function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Babi123456");
  } catch (err) {
    return res.json({ msg: "Usuário não autenticado. Ação negada." });
  }

  const novoDoc = new setores(req.body.setor);
  novoDoc.save().then(() => {
    res.json({ msg: "Novo setor salvo com sucesso!" });
  });
});

router.put("/setores/:id", async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Babi123456");
  } catch (err) {
    return res.json({ msg: "Usuário não autenticado. Ação negada." });
  }

  let doc;
  try {
    doc = await setores.findById(req.params.id);
  } catch (e) {
    return res.json({ msg: "Id inválido." });
  }

  if (doc === null) {
    return res.json({ msg: "Id inválido." });
  }

  doc.update(req.body.setor).then(() => {
    res.json({ msg: "Setor atualizado com sucesso!" });
  });
});

router.delete("/setores/:id", async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Babi123456");
  } catch (err) {
    return res.json({ msg: "Usuário não autenticado. Ação negada." });
  }

  let doc;
  try {
    doc = await setores.findById(req.params.id);
  } catch (e) {
    return res.json({ msg: "Id inválido." });
  }

  if (doc === null) {
    return res.json({ msg: "Id inválido." });
  }

  doc.deleteOne().then(() => {
    res.json({ msg: "Setor excluído com sucesso!" });
  });
});

//############################### CLIENTES ##################################

// const clientes = [
//   {
//     id: 1,
//     nome: "Romário",
//     cpf: "000.000.000-00",
//     endereço: "Caminho da felicidade",
//   },
//   {
//     id: 2,
//     nome: "Neymar",
//     cpf: "123.456.789-10",
//     endereço: "Vai jogar bola",
//   },
//   {
//     id: 3,
//     nome: "Papai Noel",
//     cpf: "999.999.999-99",
//     endereço: "Polo Norte",
//   },
// ];

const clienteSchema = new mongoose.Schema({
  nome: "string",
  cpf: "string",
  endereço: "string",
});
const clientes = mongoose.model("clientes", clienteSchema);

router.get("/clientes", async function (req, res, next) {
  const data = await clientes.find();
  res.json({ dados: data });
});

router.get("/clientes/:id", async function (req, res, next) {
  let data;
  try {
    data = await clientes.findById(req.params.id);
  } catch (e) {
    return res.json({ msg: "Id inválido." });
  }

  if (data === null) {
    return res.json({ msg: "Id inválido." });
  }

  res.json({ dados: data });
});

router.post("/clientes", function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Babi123456");
  } catch (err) {
    return res.json({ msg: "Usuário não autenticado. Ação negada." });
  }

  const novoDoc = new clientes(req.body.cliente);
  novoDoc.save().then(() => {
    res.json({ msg: "Novo cliente salvo com sucesso!" });
  });
});

router.put("/clientes/:id", async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Babi123456");
  } catch (err) {
    return res.json({ msg: "Usuário não autenticado. Ação negada." });
  }

  let doc;
  try {
    doc = await clientes.findById(req.params.id);
  } catch (e) {
    return res.json({ msg: "Id inválido." });
  }

  if (doc === null) {
    return res.json({ msg: "Id inválido." });
  }

  doc.update(req.body.cliente).then(() => {
    res.json({ msg: "Cliente atualizado com sucesso!" });
  });
});

router.delete("/clientes/:id", async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Babi123456");
  } catch (err) {
    return res.json({ msg: "Usuário não autenticado. Ação negada." });
  }

  let doc;

  try {
    doc = await clientes.findById(req.params.id);
  } catch (e) {
    return res.json({ msg: "Id inválido." });
  }

  if (doc === null) {
    return res.json({ msg: "Id inválido." });
  }

  doc.deleteOne().then(() => {
    res.json({ msg: "Cliente excluído com sucesso!" });
  });
});

//############################### PAGAMENTOS ##################################

// const pagamentos = [
//   {
//     id: 1,
//     nome: "Pix",
//     valor: "R$600,00",
//     numerodopix: "123456",
//     formaDePagamento: "À vista",
//   },
//   {
//     id: 2,
//     nome: "Cartão de Crédito",
//     valor: "R$1.800,00",
//     numeroDeParcelas: "2",
//     formaDePagamento: "Parcelado",
//   },
//   {
//     id: 3,
//     nome: "Cartão de Débito",
//     valor: "R$300,00",
//     formaDePagamento: "À vista",
//   },
//   {
//     id: 4,
//     nome: "Boleto",
//     valor: "R$850,00",
//     formaDePagamento: "Pagamento não realizado",
//   },
// ];

const pagamentoSchema = new mongoose.Schema({
  nome: "string",
  valor: "string",
  numeroDeParcelas: "string",
  formaDePagamento: "string",
});
const pagamentos = mongoose.model("pagamentos", pagamentoSchema);

router.get("/pagamentos", async function (req, res, next) {
  const data = await pagamentos.find();
  res.json({ dados: data });
});

router.get("/pagamentos/:id", async function (req, res, next) {
  let data;
  try {
    data = await pagamentos.findById(req.params.id);
  } catch (e) {
    return res.json({ msg: "Id inválido." });
  }

  if (data === null) {
    return res.json({ msg: "Id inválido." });
  }

  res.json({ dados: data });
});

router.post("/pagamentos", function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Babi123456");
  } catch (err) {
    return res.json({ msg: "Usuário não autenticado. Ação negada." });
  }

  const novoDoc = new pagamentos(req.body.pagamento);
  novoDoc.save().then(() => {
    res.json({ msg: "Novo pagamento salvo com sucesso!" });
  });
});

router.put("/pagamentos/:id", async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Babi123456");
  } catch (err) {
    return res.json({ msg: "Usuário não autenticado. Ação negada." });
  }

  let doc;
  try {
    doc = await pagamentos.findById(req.params.id);
  } catch (e) {
    return res.json({ msg: "Id inválido." });
  }

  if (doc === null) {
    return res.json({ msg: "Id inválido." });
  }

  doc.update(req.body.pagamento).then(() => {
    res.json({ msg: "Pagamento atualizado com sucesso!" });
  });
});

router.delete("/pagamentos/:id", async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Babi123456");
  } catch (err) {
    return res.json({ msg: "Usuário não autenticado. Ação negada." });
  }

  let doc;
  try {
    doc = await pagamentos.findById(req.params.id);
  } catch (e) {
    return res.json({ msg: "Id inválido." });
  }

  if (doc === null) {
    return res.json({ msg: "Id inválido." });
  }

  doc.deleteOne().then(() => {
    res.json({ msg: "Pagamento excluído com sucesso!" });
  });
});

module.exports = router;
