import rateLimit from 'express-rate-limit';

const getIP = (req) => {
  return req.ip || 
         req.headers['x-forwarded-for'] || 
         req.socket.remoteAddress || 
         'unknown';
};

export const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: getIP,
    handler: (req, res) => {
      res.status(429).json({
        message: 'Too many requests, please try again later.'
      });
    },
    ...options
  });
};

// Specific limiters for different routes
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later'
});

export const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100
});