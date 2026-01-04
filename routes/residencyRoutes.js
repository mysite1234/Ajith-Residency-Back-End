import express from "express";
import residencyController from "../controllers/residencyController.js";

const router = express.Router();

router.post("/", residencyController.createResidency);   // POST
router.get("/", residencyController.getResidencies);     // GET
router.put("/:id", residencyController.updateResidency); // PUT
router.delete("/:id", residencyController.deleteResidency); // ✅

export default router;
