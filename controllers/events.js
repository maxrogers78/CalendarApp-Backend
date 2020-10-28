// Express
const { response } = require("express");
// Schema
const Evento = require("../models/Evento");

const getEvents = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};

const createEvent = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      eventoGuardado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);
    const uid = req.uid;

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }

    const nuevoEvento = { ...req.body, user: uid };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      eventoActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  // TODO: eliminar evento
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para eliminar este evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.json({
      ok: true,
      msg: "Evento eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
