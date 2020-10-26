// Express
const { response } = require("express");
// Schema
const Evento = require("../models/Evento");

const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getEvents",
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

const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: "updateEvent",
  });
};

const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteEvent",
  });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
