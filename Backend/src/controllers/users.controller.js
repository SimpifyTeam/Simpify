import { User } from "../models/users.model.js";

const registerUser = async(req, res) => {
     try {
        const { email } = req.body;
        const user = await User.create({
            email
        });
        res.status(201).json({ message: 'User added successfully' });
      } 
      catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export {
    registerUser
}