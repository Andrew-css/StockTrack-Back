import { Router } from "express";
import httpDetallePedido from "../controllers/detallePedido.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersDetPedido from "../helpers/detPedido.js";
import helpersPedido from "../helpers/pedido.js";
import helpersDistLoteFicha from "../helpers/distribucionLoteFicha.js";

const router = new Router();

router.get("/all", [validarJWT], httpDetallePedido.getAll);

router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check("id").custom(helpersDetPedido.existeId),
    validarCampos,
  ],
  httpDetallePedido.getPorId
);

router.post(
  "/agregar",
  [
    validarJWT,
    check("cantidad", "Digite la Cantidad").not().isEmpty(),
    check("cantidad", "Tipo de dato no válido para cantidad").isNumeric(),
    check("idPedido", "Digite el id del pedido").not().isEmpty(),
    check("idPedido", "No es Mongo Id").isMongoId(),
    check("idPedido").custom(helpersPedido.existeId),
    check("idDistribucionLoteFicha", "Digite el ID de DistribucionLoteFicha")
      .not()
      .isEmpty(),
    check("idDistribucionLoteFicha", "No es un Mongo ID válido").isMongoId(),
    check("idDistribucionLoteFicha").custom(helpersDistLoteFicha.existeId),
    check('subTotal', 'Ingrese un subtotal').not().isEmpty(),
    check('subTotal', 'Tipo de dato no válido para subTotal').isNumeric(),
    validarCampos,
  ],
  httpDetallePedido.post
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check("idPedido").custom(helpersDetPedido.existeId),
    check("cantidad", "Digite la Cantidad").not().isEmpty(),
    check("cantidad", "Tipo de dato no válido para cantidad").isNumeric(),
    check("idDistribucionLoteFicha", "Digite el ID de DistribucionLoteFicha")
      .not()
      .isEmpty(),
    check("idDistribucionLoteFicha", "No es un Mongo ID válido").isMongoId(),
    check("idDistribucionLoteFicha").custom(helpersDistLoteFicha.existeId),
    check('subTotal', 'Ingrese un subtotal').not().isEmpty(),
    check('subTotal', 'Tipo de dato no válido para subTotal').isNumeric(),
    validarCampos,
  ],
  httpDetallePedido.putEditar
);

router.put(
  "/inactivar/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check('id').custom(helpersDetPedido.existeId),
    validarCampos,
  ],
  httpDetallePedido.putInactivar
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check('id').custom(helpersDetPedido.existeId),
    validarCampos,
  ],
  httpDetallePedido.putActivar
);

export default router;
