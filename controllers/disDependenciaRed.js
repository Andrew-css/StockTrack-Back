import DisDependenciaRed from "../models/disDependenciaRed.js";
import Dependencia from "../models/dependencia.js";
import RedConocimiento from "../models/RedConocimiento.js";
import DisRedArea from "../models/disRedArea.js";

const httpDisDependenciaRed = {

  getAll: async (req, res) => {
    try {
      const distribucion = await DisDependenciaRed.find()
        .populate("idDependencia").populate("idRed");
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getDistribucionesById: async (req, res) => {
    try {
      const { idRed } = req.params;
      const distribucion = await DisDependenciaRed.find({ idRed })
        .populate("idDependencia").populate("idRed");
      res.json(distribucion)
    } catch (error) {
      res.status(400).json({ error });

    }
  },

  getDistribucionById: async (req, res) => {
    try {
      const { id } = req.params;

      const distribucion = await DisDependenciaRed.findById(id)
        .populate("idDependencia").populate("idRed");
      res.json(distribucion)
    } catch (error) {
      res.status(400).json({ error });

    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idDependencia, idRed, year } = req.body;

      const distribucion = new DisDependenciaRed({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idDependencia,
        idRed,
        year,
      });
      await distribucion.save();

      const red = await RedConocimiento.findById(distribucion.idRed);
      distribucion.idRed = red;

      const dependencia = await Dependencia.findById(distribucion.idDependencia);
      distribucion.idDependencia = dependencia


      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado, idDependencia, idRed, year } = req.body;

      const disRedArea = await DisRedArea.find({
        idDisDependenciaRed: id
      });

      const totalPresupuestos = disRedArea.reduce((total, disRedArea) => {
        return total + disRedArea.presupuesto;
      }, 0);

      const presupuestoDisponible = presupuesto - totalPresupuestos;

      const distribucion = await DisDependenciaRed.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,
          presupuestoDisponible,
          idDependencia,
          idRed,
          year
        }, { new: true }
      ).populate("idDependencia").populate("idRed");
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado } = req.body;

      const disDependenciaRed = await disDependenciaRed.findById(id)
      const presupuestoDisponible = disDependenciaRed.presupuestoDisponible - presupuestoAsignado

      const updatedDisDependenciaRed = await DisDependenciaRed.findByIdAndUpdate(id,
        { presupuestoDisponible },
        { new: true }
      );

      res.json(updatedDisDependenciaRed);

    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependenciaRed = await DisDependenciaRed.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      ).populate("idDependencia").populate("idRed");
      res.json(disDependenciaRed);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependenciaRed = await DisDependenciaRed.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      ).populate("idDependencia").populate("idRed");
      res.json(disDependenciaRed);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
export default httpDisDependenciaRed;
