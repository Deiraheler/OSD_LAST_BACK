import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY_JWT || 'defaultSecret';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
};

export const verifyToken = (token: string): JwtPayload | string => {
    return jwt.verify(token, SECRET_KEY);
};
