import Item from "../models/itemsPresupuesto.js";

const helpersItem = {
  existeNombre: async (nombre, req) => {
    if (nombre) {

      const existe = await Item.findOne({ $text: { $search: nombre } });
      if (existe) {
        if (req.req.method === "PUT") {
          throw new Error(
            `Ya existe ese item en la base de datos!!! ${nombre}`
          );
        } else if (req.req.method === "POST")
          throw new Error(
            `Ya existe ese item en la base de datos!!! ${nombre}`
          );
      }
    }
  },
};

export default helpersItem;