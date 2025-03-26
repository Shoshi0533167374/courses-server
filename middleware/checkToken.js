import jwt from "jsonwebtoken"

export const isUserIn = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ title: "First, log in", message: "unauthorized" });
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result;
        next();
    }
    catch (err) {
        return res.status(401).json({ title: "Error", message: err.message });
    }
}

export function isUserAdmin(req, res, next) {
    let token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ title: "First, log in", message: "unauthorized" });
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result;
        if (result.role == "ADMIN")
            next();
        else
            return res.status(403).json({ title: "Error", message: "unauthorized" });
    }
    catch (err) {
        return res.status(401).json({ title: "Error", message: err.message });
    }
}
