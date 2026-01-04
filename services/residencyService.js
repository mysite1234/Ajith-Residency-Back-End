import residencyModel from "../models/residencyModel.js";

const residencyService = {
  createResidency: async (data) => {
    return await residencyModel.createResidency(data);
  },

  getResidencies: async () => {
    return await residencyModel.getAllResidencies();
  },

  updateResidency: async (id, data) => {
    return await residencyModel.updateResidency(id, data);
  },

  // ✅ ADD THIS
  deleteResidency: async (id) => {
    return await residencyModel.deleteResidency(id);
  }
};

export default residencyService;
