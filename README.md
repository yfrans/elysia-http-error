# Elysia HTTP Error

Throw HTTP errors from Elysia handlers.

# Usage

Install the package:

`bun add elysia-http-error`

Then use `httpError()` in Elysia pipeline as follow:

```ts
const app = new Elysia().use(httpError());
```

In order to use the HttpError class and throw an error, the `HttpError` decorator must be added to the pipeline:

```ts
const app = new Elysia().use(httpErrorDecorator()).get("/", ({ HttpError }) => {
  throw HttpError.BadRequest("Something went wrong...");
});
```

# Some important notes

The plugin initializer must be called when initializing Elysia and before any other handler that use this plugin.

When using dependecy injection and sub-modules, the decorator must be used in the sub-module definition in order to get full type support (see https://elysiajs.com/patterns/dependency-injection.html#dependency-injection)
