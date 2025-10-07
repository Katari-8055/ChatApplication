import express from "express";
import { accesChat } from "../controllers/chatControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router2 = express.Router();

router2.post("/",authMiddleware,accesChat);
// router2.get("/",authMiddleware,fetchChats);
// router2.post("/group",authMiddleware,createGroupChat);
// router2.put("/rename",authMiddleware,renameGroup);
// router2.put("/remove",authMiddleware,removeFromGroup);
// router2.put("/groupadd",authMiddleware,addToGroup);

export default router2;