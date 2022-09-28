const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//############################### SETORES ##################################
const setores = [
  {
    id: 1,
    nome: "vestidos",
  },
  {
    id: 2,
    nome: "macacões",
  },
  {
    id: 3,
    nome: "croppeds",
  },
  {
    id: 4,
    nome: "saias",
  },
  {
    id: 5,
    nome: "blusas",
  },
];

router.get("/setores", function (req, res, next) {
  res.json({ dados: setores });
});

router.get("/setores/:id", function (req, res, next) {
  const setor = setores.filter((setor) => setor.id == req.params.id);
  if (setor == null || setor == "")
    return res.json({ erro: "O setor informado não existe" });
  res.json({ dados: setor });
});

router.post("/setores", function (req, res, next) {
  setores.push(req.body.setor);
  res.json({ msg: "Novo setor salvo com sucesso!" });
});

router.put("/setores/:id", function (req, res, next) {
  setores.map((setor) => {
    if (setor.id == req.params.id) {
      setor = req.body.setor;
    }
  });
  res.json({ msg: "Setor atualizado com sucesso!" });
});

router.delete("/setores/:id", function (req, res, next) {
  setores = setores.filter((setor) => setor.id != req.params.id);
  res.json({ msg: "Setor excluído com sucesso!" });
});

//############################### CLIENTES ##################################

const clientes = [
  {
    id: 1,
    nome: "Romário",
    cpf: "000.000.000-00",
    endereço: "Caminho da felicidade",
  },
  {
    id: 2,
    nome: "Neymar",
    cpf: "123.456.789-10",
    endereço: "Vai jogar bola",
  },
  {
    id: 3,
    nome: "Papai Noel",
    cpf: "999.999.999-99",
    endereço: "Polo Norte",
  },
];

router.get("/clientes", function (req, res, next) {
  res.json({ dados: clientes });
});

router.get("/clientes/:id", function (req, res, next) {
  const cliente = clientes.filter((cliente) => cliente.id == req.params.id);
  if (cliente == null || cliente == "")
    return res.json({ erro: "O cliente informado não existe" });
  res.json({ dados: cliente });
});

router.post("/clientes", function (req, res, next) {
  clientes.push(req.body.cliente);
  res.json({ msg: "Novo cliente salvo com sucesso!" });
});

router.put("/clientes/:id", function (req, res, next) {
  clientes.map((cliente) => {
    if (cliente.id == req.params.id) {
      cliente = req.body.cliente;
    }
  });
  res.json({ msg: "Cliente atualizado com sucesso!" });
});

router.delete("/clientes/:id", function (req, res, next) {
  clientes = clientes.filter((cliente) => cliente.id != req.params.id);
  res.json({ msg: "Cliente excluído com sucesso!" });
});

//############################### PAGAMENTOS ##################################

const pagamentos = [
  {
    id: 1,
    nome: "Pix",
    valor: "R$600,00",
    numerodopix: "123456",
    formaDePagamento: "À vista",
  },
  {
    id: 2,
    nome: "Cartão de Crédito",
    valor: "R$1.800,00",
    numeroDeParcelas: "2",
    formaDePagamento: "Parcelado",
  },
  {
    id: 3,
    nome: "Cartão de Débito",
    valor: "R$300,00",
    formaDePagamento: "À vista",
  },
  {
    id: 4,
    nome: "Boleto",
    valor: "R$850,00",
    formaDePagamento: "Pagamento não realizado",
  },
];

router.get("/pagamentos", function (req, res, next) {
  res.json({ dados: pagamentos });
});

router.get("/pagamentos/:id", function (req, res, next) {
  const pagamento = pagamentos.filter(
    (pagamento) => pagamento.id == req.params.id
  );
  if (pagamento == null || pagamento == "")
    return res.json({ erro: "O pagamento informado não existe" });
  res.json({ dados: pagamento });
});

router.post("/pagamentos", function (req, res, next) {
  pagamentos.push(req.body.pagamento);
  res.json({ msg: "Pagamento realizado com sucesso!" });
});

router.put("/pagamentos/:id", function (req, res, next) {
  pagamentos.map((pagamento) => {
    if (pagamento.id == req.params.id) {
      pagamento = req.body.pagamento;
    }
  });
  res.json({ msg: "Pagamento atualizado com sucesso!" });
});

router.delete("/pagamentos/:id", function (req, res, next) {
  pagamentos = pagamentos.filter((pagamento) => pagamento.id != req.params.id);
  res.json({ msg: "Pagamento excluído com sucesso!" });
});

module.exports = router;
