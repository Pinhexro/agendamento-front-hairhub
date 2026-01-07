const express = require("express");
const router = express.Router();
const Agendamento = require("../../agendamento-backend/models/Agendamento");

/**
 * GET - Listar todos os agendamentos
 */
router.get("/", async (req, res) => {
  try {
    const agendamentos = await Agendamento.find().sort({ data: 1, hora: 1 });
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
});

/**
 * POST - Criar agendamento
 */
router.post("/", async (req, res) => {
  try {
    const { cliente, telefone, servico, valor, data, hora } = req.body;

    if (!cliente || !telefone || !servico || !valor || !data || !hora) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const novoAgendamento = new Agendamento({
      cliente,
      telefone,
      servico,
      valor,
      data,
      hora
    });

    await novoAgendamento.save();

    res.status(201).json({
      message: "Agendamento criado com sucesso",
      agendamento: novoAgendamento
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Horário já ocupado" });
    }

    res.status(500).json({ error: "Erro ao criar agendamento" });
  }
});

/**
 * DELETE - Cancelar agendamento
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const removido = await Agendamento.findByIdAndDelete(id);

    if (!removido) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.json({ message: "Agendamento cancelado" });

  } catch (err) {
    res.status(500).json({ error: "Erro ao cancelar agendamento" });
  }
});

module.exports = router;
