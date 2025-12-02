import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config';

// Define a custom interface for the JWT payload
interface JwtPayload {
  userId: number;
  email: string;
}

// Extend the Request interface to include the user property
interface AuthRequest extends Request {
  user?: JwtPayload;
}

// In-memory store for refresh tokens (use Redis or a database in production)
const refreshTokenStore = new Set<string>();

// Environment variables or defaults
const jwtSecret = ENV.JWT_SECRET;
const refreshSecret = ENV.REFRESH_SECRET;
const accessTokenExpiry = '15m'; // Short-lived access token
const refreshTokenExpiry = '7d'; // Longer-lived refresh token

// Middleware for JWT access and refresh token handling
export const jwtMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get the access token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No access token provided or invalid format' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    // Verify access token
    const decoded = jwt.verify(accessToken, jwtSecret) as JwtPayload;
    req.user = decoded;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Access token expired, try to refresh it
      const refreshToken = req.headers['x-refresh-token'] as string;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Access token expired, no refresh token provided' });
      }

      // Verify refresh token
      try {
        if (!refreshTokenStore.has(refreshToken)) {
          return res.status(401).json({ message: 'Invalid or revoked refresh token' });
        }

        const decodedRefresh = jwt.verify(refreshToken, refreshSecret) as JwtPayload;

        // Generate new access token
        const newAccessToken = jwt.sign(
          { userId: decodedRefresh.userId, email: decodedRefresh.email },
          jwtSecret,
          { expiresIn: accessTokenExpiry },
        );

        // Attach user to request and send new access token in response
        req.user = decodedRefresh;
        res.setHeader('x-new-access-token', newAccessToken);
        return next();
      } catch (refreshError) {
        if (refreshError instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ message: 'Refresh token expired' });
        }
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid access token' });
    }
    // Handle unexpected errors
    return res.status(500).json({ message: 'Server error during token verification' });
  }
};

// Helper function to generate access and refresh tokens
export const generateTokens = (payload: JwtPayload) => {
  const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: accessTokenExpiry });
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: refreshTokenExpiry });

  // Store refresh token (in-memory for demo, use database in production)
  refreshTokenStore.add(refreshToken);

  return { accessToken, refreshToken };
};

// Helper function to revoke refresh token (e.g., on logout)
export const revokeRefreshToken = (refreshToken: string) => {
  refreshTokenStore.delete(refreshToken);
};
