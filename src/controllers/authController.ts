import { Request, Response } from "express";
import { authController } from '../controllers/authControllers';
 
class AuthController {
   
    public async iniciarSesion(req: Request, res: Response) {
        const {email, password} = req.body;
        return res.json({ message : "Autenticación correcta",
            email: email,
            password: password });
    }
 
}
export const authController = new AuthController();