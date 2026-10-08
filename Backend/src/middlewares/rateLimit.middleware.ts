import rateLimit from "express-rate-limit";

const requestLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  message: {
    error: "Muitas tentativas, tente mais tarde.",
  },
});

export default requestLimiterMiddleware;
