//! Rutas de usuario
// Express
const { Router } = require("express");
const router = Router();
// Controllers
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");

router.post("/new", createUser);

router.post("/", loginUser);

router.get("/renew", revalidateToken);

module.exports = router;
