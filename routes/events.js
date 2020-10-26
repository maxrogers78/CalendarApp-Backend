//! Rutas de evento
// Express
const { Router } = require("express");
const router = Router();
// Middlewares
const { validateJWT } = require("../middlewares/validar-jwt");
router.use(validateJWT);
// Controllers
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router.get("/", getEvents);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
