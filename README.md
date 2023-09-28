# Elysia HTTP Error

Throw HTTP errors from Elysia handlers.

# Usage

Install the package:

`bun add elysia-http-error`

Then use `httpError()` in Elysia pipeline as follow:

```ts
const app = new Elysia().use(httpError());
```

By default, this module will return a structured message with the error details.

If you need the message to be a simple string, use:

```ts
returnStringOnly: true;
```

when initializing `httpError()`.

Another option is to write a custom error message formatter using:

```ts
customFormatter: (err: HttpError) => any;
```

which allows a full control over the returned error object.

For example:

```ts
customFormatter: (err) => `Oh no... we got an error ${err.statusCode}!`;
```

In order to use the HttpError class and throw an error, the `HttpError` decorator must be added to the pipeline:

```ts
const app = new Elysia().use(httpErrorDecorator).get("/", ({ HttpError }) => {
  throw HttpError.BadRequest("Something went wrong...");
});
```

The HttpError constructor receive the following parameters:

```ts
error: string (error message, optional)
errorData: any (more error details, optional)
```

For example, when using OTP validation and the user is asking for a new OTP while the OTP is still valid, the error can contain the message and the time left for the OTP so the client can display a proper message and sync the time displayed to the user:

```ts
throw HttpError.Conflict("OTP is still valid", {
  timeLeft: otpExpireTime - Date.now(),
});
```

# Some important notes

The plugin initializer must be called when initializing Elysia and before any other handler that use this plugin.

When using dependecy injection and sub-modules, the decorator must be used in the sub-module definition in order to get full type support (see https://elysiajs.com/patterns/dependency-injection.html#dependency-injection)
