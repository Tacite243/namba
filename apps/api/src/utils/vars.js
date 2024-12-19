import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "./prisma.config.js";
dotenv.config();

const status = {
  CONTINUE: { code: 100, message: "Continue" },
  SWITCHING_PROTOCOLS: { code: 101, message: "Switching Protocols" },
  SUCCESS: { code: 200, message: "Successful treatment with success" },
  CREATED: { code: 201, message: "Created" },
  ACCEPTED: { code: 202, message: "Accepted" },
  NON_AUTHORITATIVE_INFORMATION: {
    code: 203,
    message: "Non-Authoritative Information",
  },
  NO_CONTENT: { code: 204, message: "No Content" },
  RESET_CONTENT: { code: 205, message: "Reset Content" },
  PARTIAL_CONTENT: { code: 206, message: "Partial Content" },
  MULTIPLE_CHOICES: { code: 300, message: "Multiple Choices" },
  MOVED_PERMANENTLY: { code: 301, message: "Moved Permanently" },
  FOUND: { code: 302, message: "Found" },
  SEE_OTHER: { code: 303, message: "See Other" },
  NOT_MODIFIED: { code: 304, message: "Not Modified" },
  USE_PROXY: { code: 305, message: "Use Proxy" },
  TEMPORARY_REDIRECT: { code: 307, message: "Temporary Redirect" },
  PERMANENT_REDIRECT: { code: 308, message: "Permanent Redirect" },
  BAD_REQUEST: { code: 400, message: "Bad Request" },
  UNAUTHORIZED: { code: 401, message: "Unauthorized" },
  PAYMENT_REQUIRED: { code: 402, message: "Payment Required" },
  FORBIDDEN: { code: 403, message: "Forbidden" },
  NOT_FOUND: { code: 404, message: "Not Found" },
  METHOD_NOT_ALLOWED: { code: 405, message: "Method Not Allowed" },
  NOT_ACCEPTABLE: { code: 406, message: "Not Acceptable" },
  PROXY_AUTHENTICATION_REQUIRED: {
    code: 407,
    message: "Proxy Authentication Required",
  },
  REQUEST_TIMEOUT: { code: 408, message: "Request Timeout" },
  CONFLICT: { code: 409, message: "Conflict" },
  GONE: { code: 410, message: "Gone" },
  LENGTH_REQUIRED: { code: 411, message: "Length Required" },
  PRECONDITION_FAILED: { code: 412, message: "Precondition Failed" },
  PAYLOAD_TOO_LARGE: { code: 413, message: "Payload Too Large" },
  URI_TOO_LONG: { code: 414, message: "URI Too Long" },
  UNSUPPORTED_MEDIA_TYPE: { code: 415, message: "Unsupported Media Type" },
  RANGE_NOT_SATISFIABLE: { code: 416, message: "Range Not Satisfiable" },
  EXPECTATION_FAILED: { code: 417, message: "Expectation Failed" },
  MISDIRECTED_REQUEST: { code: 421, message: "Misdirected Request" },
  UNPROCESSABLE_ENTITY: { code: 422, message: "Unprocessable Entity" },
  LOCKED: { code: 423, message: "Locked" },
  FAILED_DEPENDENCY: { code: 424, message: "Failed Dependency" },
  TOO_EARLY: { code: 425, message: "Too Early" },
  UPGRADE_REQUIRED: { code: 426, message: "Upgrade Required" },
  PRECONDITION_REQUIRED: { code: 428, message: "Precondition Required" },
  TOO_MANY_REQUESTS: { code: 429, message: "Too Many Requests" },
  REQUEST_HEADER_FIELDS_TOO_LARGE: {
    code: 431,
    message: "Request Header Fields Too Large",
  },
  UNAVAILABLE_FOR_LEGAL_REASONS: {
    code: 451,
    message: "Unavailable For Legal Reasons",
  },
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
  NOT_IMPLEMENTED: { code: 501, message: "Not Implemented" },
  BAD_GATEWAY: { code: 502, message: "Bad Gateway" },
  SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" },
  GATEWAY_TIMEOUT: { code: 504, message: "Gateway Timeout" },
  HTTP_VERSION_NOT_SUPPORTED: {
    code: 505,
    message: "HTTP Version Not Supported",
  },
  VARIANT_ALSO_NEGOTIATES: { code: 506, message: "Variant Also Negotiates" },
  INSUFFICIENT_STORAGE: { code: 507, message: "Insufficient Storage" },
  LOOP_DETECTED: { code: 508, message: "Loop Detected" },
  NOT_EXTENDED: { code: 510, message: "Not Extended" },
  NETWORK_AUTHENTICATION_REQUIRED: {
    code: 511,
    message: "Network Authentication Required",
  },
};

const setResponse = (res, message, status, data = {}, logs = null) => {
  if (status === 500) {
    console.log(logs);
  }
  return res
    .status(status)
    .json({ message: message, status: status, data: data })
    .end();
};

export const encryptPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

function generateToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "2190h",
  });
}

const authRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      setResponse(
        res,
        "Vous n'avez pas les droits pour accéder à cette route",
        status.FORBIDDEN.code
      );
    }
  };
};

async function AuthToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    setResponse(res, status.FORBIDDEN.message, status.FORBIDDEN.code);
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        setResponse(res, status.FORBIDDEN.message, status.FORBIDDEN.code);
      } else {
        await prisma.user
          .findFirst({ where: { id: user.id } })
          .then((userlogin) => {
            if (userlogin) {
              req.user = user;
              next();
            } else {
              setResponse(res, status.FORBIDDEN.message, status.FORBIDDEN.code);
            }
          })
          .catch((error) => {
            console.log(error);
            setResponse(res, status.FORBIDDEN.message, status.FORBIDDEN.code);
          });
      }
    });
  }
}

export default {
  setResponse,
  status,
  encryptPassword,
  generateToken,
  verifyPassword,
  authRoles,
  AuthToken,
};
