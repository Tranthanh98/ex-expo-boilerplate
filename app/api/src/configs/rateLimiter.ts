import { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

/**
 * Rate Limiter Middleware (express-rate-limit)
 *
 * Thay thế implementation thủ công bằng thư viện `express-rate-limit` để
 * đảm bảo hiệu năng, độ tin cậy và tiêu chuẩn header. Giữ nguyên tên export
 * `rateLimiter` để không cần thay đổi nơi sử dụng (app.ts), đồng thời
 * trả về response đúng format mà Frontend đang kỳ vọng.
 */
export const rateLimiter = rateLimit({
  // Thời gian tính giới hạn (ms)
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10),
  // Số request tối đa trong mỗi window per IP
  limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),
  // Bật cả header chuẩn và legacy để tương thích Frontend hiện tại
  standardHeaders: "draft-8",
  legacyHeaders: true,
  // Gán thông tin rate limit vào req.rateLimit để handler đọc được resetTime
  requestPropertyName: "rateLimit",
  /**
   * Handler khi chạm giới hạn: trả về JSON giống middleware cũ.
   */
  handler: (
    req: Request & { rateLimit?: { resetTime?: Date } },
    res: Response
  ) => {
    const resetTimeMs = req.rateLimit?.resetTime?.getTime();
    const now = Date.now();
    const retryAfterSeconds =
      resetTimeMs && resetTimeMs > now
        ? Math.ceil((resetTimeMs - now) / 1000)
        : 60; // fallback an toàn

    res.status(429).json({
      success: false,
      error: "Too many requests, please try again later",
      retryAfter: retryAfterSeconds,
    });
  },
});
