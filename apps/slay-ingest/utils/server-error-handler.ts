import { createError, H3Event, sendError } from "h3";
import winston from "winston";
import type { PostgrestError } from "@supabase/postgrest-js";

export default function useServerErrorHandler() {
  function serverErrorHandler(
    logger: winston.Logger,
    event: H3Event,
    statusCode: number,
    error: PostgrestError | null,
    errorMessage: string | null = null
  ) {
    if (error) {
      logger.error(error);
    }

    if (errorMessage) {
      logger.error(errorMessage);
    }

    logger.profile("total execution time");
    sendError(event, createError({ statusCode, statusMessage: errorMessage ? errorMessage : error?.message }));
  }

  return {
    serverErrorHandler,
  };
}
