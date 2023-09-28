import Elysia from "elysia";

class HttpError extends Error {
  private constructor(
    public message: string,
    public statusCode: number,
    public errorData: any = undefined
  ) {
    super(message);
  }

  public static BadRequest(message?: string, errorData?: any) {
    return new HttpError(message || "Bad Request", 400, errorData);
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

  public static Conflict(message?: string, errorData?: any) {
    return new HttpError(message || "Conflict", 409, errorData);
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

export const httpErrorDecorator = (app: Elysia) =>
  app.decorate("HttpError", HttpError);

interface HttpErrorConstructor {
  customFormatter?: (error: HttpError) => any;
  returnStringOnly?: boolean;
}

export const httpError = (
  params: HttpErrorConstructor = {
    customFormatter: undefined,
    returnStringOnly: false,
  }
) =>
  new Elysia({ name: "elysia-http-error" })
    .error({
      ELYSIA_HTTP_ERROR: HttpError,
    })
    .onError(({ code, error, set }) => {
      if (code === "ELYSIA_HTTP_ERROR") {
        set.status = error.statusCode;
        if (params.customFormatter) {
          return params.customFormatter(error);
        }
        if (params.returnStringOnly) {
          return error.message;
        }
        return {
          error: true,
          code: error.statusCode,
          message: error.message,
          data: error.errorData,
        };
      }
    });
