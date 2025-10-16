// Authentication middleware
const requireAuth = (req, res, next) => {
  console.log('Session data:', {
    sessionExists: !!req.session,
    userId: req.session?.userId,
    username: req.session?.username,
    cookie: req.session?.cookie
  });

  if (!req.session) {
    return res.status(401).json({ error: 'No session found' });
  }

  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Add user data to request for convenience
  req.user = {
    id: req.session.userId,
    username: req.session.username
  };

  next();
};

module.exports = { requireAuth };
