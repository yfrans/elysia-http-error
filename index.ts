import Elysia from "elysia";

class HttpError extends Error {
  private constructor(public message: string, public statusCode: number) {
    super(message);
  }

  public static BadRequest(message?: string) {
    return new HttpError(message || "Bad Request", 400);
  }

  public static Unauthorized(message?: string) {
    return new HttpError(message || "Unauthorized", 401);
  }

  public static Forbidden(message?: string) {
    return new HttpError(message || "Forbidden", 403);
  }

  public static NotFound(message?: string) {
    return new HttpError(message || "Not Found", 404);
  }

  public static MethodNotAllowed(message?: string) {
    return new HttpError(message || "Method Not Allowed", 405);
  }

  public static Conflict(message?: string) {
    return new HttpError(message || "Conflict", 409);
  }

  public static UnsupportedMediaType(message?: string) {
    return new HttpError(message || "UnsupportedMediaType", 415);
  }

  public static IAmATeapot(message?: string) {
    return new HttpError(message || "IAmATeapot", 418);
  }

  public static TooManyRequests(message?: string) {
    return new HttpError(message || "Too Many Requests", 429);
  }

  public static Internal(message?: string) {
    return new HttpError(message || "Internal Server Error", 500);
  }

  public static NotImplemented(message?: string) {
    return new HttpError(message || "Not Implemented", 501);
  }

  public static BadGateway(message?: string) {
    return new HttpError(message || "Bad Gateway", 502);
  }

  public static ServiceUnavailable(message?: string) {
    return new HttpError(message || "Service Unavailable", 503);
  }

  public static GatewayTimeout(message?: string) {
    return new HttpError(message || "Gateway Timeout", 504);
  }
}

export const httpErrorDecorator = () => (app: Elysia) =>
  app.decorate("HttpError", HttpError);

export const httpError = () => (app: Elysia) =>
  app
    .addError({
      HTTP_ERROR: HttpError,
    })
    .onError(({ code, error, set }) => {
      if (code === "HTTP_ERROR") {
        set.status = error.statusCode;
        return error.message;
      }
    });
