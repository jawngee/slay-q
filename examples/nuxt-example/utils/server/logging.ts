import winston from "winston";
import { H3Event } from "h3";

const apiUrlRegex = /\/api\/(?:[0-9aA-zZ-]+)\/([^?]*)(?:\?*.*)/gm;

export default function useLogging(prefix: string | H3Event) {
  let logPrefix = typeof prefix === "string" ? prefix : prefix.path ?? "unknown";
  const match = apiUrlRegex.exec(logPrefix);
  if (match !== null) {
    logPrefix = match[1];
  }

  let pseudoPID = Math.floor(Math.random() * 10000);

  function resetPID() {
    pseudoPID = Math.floor(Math.random() * 10000);
  }

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.label({ label: logPrefix }),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.colorize(),
      winston.format.printf((info): string => {
        const { level, message, label, timestamp, durationMs } = info;
        const time = timestamp.split(" ");
        if (durationMs !== undefined) {
          return `\x1b[37m${time[0]} \x1b[0m${time[1]}\x1b[0m \x1b[37m${pseudoPID} ${level}: \x1b[37m[${label}]\x1b[0m ${message} \x1b[37m(\x1b[36m${durationMs}ms\x1b[0m\x1b[37m)`;
        } else {
          return `\x1b[37m${time[0]} \x1b[0m${time[1]}\x1b[0m \x1b[37m${pseudoPID} ${level}: \x1b[37m[${label}]\x1b[0m ${message}`;
        }
      })
    ),
    transports: [
      new winston.transports.Console({
        level: "info",
      }),
    ],
  });

  return {
    logger,
    resetPID,
  };
}
