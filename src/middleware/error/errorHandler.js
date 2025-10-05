import logger from "../../utils/logger";

export const errorHandler = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message} - ${req.method} ${req.originalUrl} - ${req.ip}`);
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: 'error',
      name: err.name,
      message: err.message
    });
  }

  res.status(500).json({
    status: 'error',
    name: 'InternalServerError',
    message: 'Ocurrió un error interno en el servidor'
  });
};
