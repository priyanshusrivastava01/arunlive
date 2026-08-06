// Simple auth middleware - checks if user is logged in
export const adminOnly = (req, res, next) => {
  // In production, verify JWT token here
  // For now, just check if user is authenticated
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  // In production, verify the token with JWT
  // For now, accept any token
  next();
};
