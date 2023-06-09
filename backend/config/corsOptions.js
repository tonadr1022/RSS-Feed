import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    // either in allowed origins or no origin
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Configures the Access-Control-Allow-Credentials CORS header
  optionsSuccessStatus: 200,
};

export default corsOptions;
