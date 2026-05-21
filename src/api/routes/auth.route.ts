import { Router } from "express";
import { login, refresh, signup } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
// router.post("/logout", logout);
router.get("/refresh-token", refresh);

// router.get("/me", getCurrentUser);

// router.put("/update/:id",  updateUser);
// router.delete("/delete/:id",  deleteAccount);

const authRouter = router;

export default authRouter;
