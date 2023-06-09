import { logEvents } from "./logger.js";

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// override default express error handling for error event logging
const errorHandler = (err, req, res, next) => {
  // set status to 500 if no status (server error)
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  logEvents(
    `${err.statusCode}\t${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  console.log(err.stack);

  res.status(status);
  res.json({
    message: err.message,
    isError: true,
    // only provide stack trace in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export { errorHandler, notFound };
