const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoutes = require("./dogRoutes");
const tempRoutes = require("./tempRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogRoutes);
router.use("/temperaments", tempRoutes);

module.exports = router;
