import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extract the token after "Bearer"

        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err.message);
                return res.status(403).json({ message: "User is not authorized" });
            }

            req.user = decoded; 
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default validateToken;
