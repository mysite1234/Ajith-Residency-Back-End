import residencyService from "../services/residencyService.js";

const residencyController = {
  // POST
  createResidency: async (req, res) => {
    try {
      const residency = await residencyService.createResidency(req.body);
      res.status(201).json({
        success: true,
        data: residency
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET
  getResidencies: async (req, res) => {
    try {
      const residencies = await residencyService.getResidencies();
      res.status(200).json({
        success: true,
        data: residencies
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT
  updateResidency: async (req, res) => {
    try {
      const { id } = req.params;
      const residency = await residencyService.updateResidency(id, req.body);

      res.status(200).json({
        success: true,
        data: residency
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE ✅
  deleteResidency: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await residencyService.deleteResidency(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Residency not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Residency deleted successfully",
        data: deleted
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

export default residencyController;
