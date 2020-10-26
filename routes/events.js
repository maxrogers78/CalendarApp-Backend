//! Rutas de evento
// Express
const { Router } = require("express");
const router = Router();
// express-validator
const { check } = require("express-validator");
// Middlewares
const { validateFields } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");
router.use(validateJWT);
// Controllers
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
// Helpers
const { isDate } = require("../helpers/isDate");

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de término es obligatoria").custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
