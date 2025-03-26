import jwt from 'jsonwebtoken';

export function generateToken(user) {
    let token = jwt.sign({
        userId: user._id,
        role: user.role,
        userName: user.userName
    },
        process.env.SECRET_KEY,
        {
            expiresIn: "10h"
        }
    )
    return token;
}
