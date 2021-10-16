const jwt = require('jsonwebtoken')
exports.isSignedIn = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            
            if (err) {
                return res.status(401).json({
                    success: false,
                    error: "You are not authenticated!"
                });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ success: false, error: "You are not authenticated!" });
    }
};

exports.isAuthorized = async (req, res, next) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ success: false, error: "You are not allowed!" });
    }
}

exports.isAdmin = async (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ success: false, error: "You are not allowed!" });
    }
}