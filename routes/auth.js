//! Rutas de usuario
// Express
const { Router } = require("express");
const router = Router();
// Express-validator
const { check } = require("express-validator");
// Middlewares
const { validateFields } = require("../middlewares/validar-campos");
// Controllers
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");

router.post(
  "/new",
  [
    // middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    // middlewares
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

router.get("/renew", revalidateToken);

module.exports = router;
