// Express
const { response } = require("express");
// Express-validator
const { validationResult } = require("express-validator");
// bcryptjs
const bcrypt = require("bcryptjs");
// Models
const Usuario = require("../models/Usuario");
// jsonwebtoken
const generateJWT = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generateJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    // TODO: Generar nuestro JWT
    const token = await generateJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const { uid, name } = req;

  // TODO: Generar un nuevo JWT y retornarlo en esta petición
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = { createUser, loginUser, revalidateToken };
