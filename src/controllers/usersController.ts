import { Request, Response } from 'express';
import User from '../models/users';
import {generateToken} from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password, name });
    await newUser.save();

    const token = generateToken({ id: newUser._id, email: newUser.email, name: newUser.name, admin: newUser.admin });
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({ id: user._id, email: user.email, name: user.name, admin: user.admin });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  res.status(200).json({ user });
};
