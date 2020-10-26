//! Rutas de evento
// Express
const { Router } = require("express");
const router = Router();
// Middlewares
const { validateJWT } = require("../middlewares/validar-jwt");
// Controllers
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router.get("/", validateJWT, getEvents);

router.post("/", validateJWT, createEvent);

router.put("/:id", validateJWT, updateEvent);

router.delete("/:id", validateJWT, deleteEvent);

module.exports = router;
