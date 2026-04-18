import OpenAI from "openai"

import {
  buildAssistantInstructions,
  buildFallbackAssistantReply,
} from "../src/lib/assistantConfig.js"

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10
const requestLog = new Map()

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return sendError(res, 405, "METHOD_NOT_ALLOWED", "Method not allowed.")
  }

  let body = {}

  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}
  } catch {
    return sendError(res, 400, "INVALID_JSON", "Invalid JSON payload.")
  }

  const locale = body.locale === "en" ? "en" : "fr"
  const message = typeof body.message === "string" ? body.message.trim() : ""
  const previousResponseId =
    typeof body.previousResponseId === "string" ? body.previousResponseId.trim() : ""
  const clientIp = getClientIp(req)

  if (!message) {
    return sendError(res, 400, "MESSAGE_REQUIRED", "Message is required.")
  }

  if (message.length > 1500) {
    return sendError(res, 400, "MESSAGE_TOO_LONG", "Message is too long.")
  }

  if (!canProceed(clientIp)) {
    return sendError(
      res,
      429,
      "ASSISTANT_RATE_LIMITED",
      "Too many assistant requests right now. Please wait a few minutes and try again.",
    )
  }

  if (!process.env.OPENAI_API_KEY) {
    return sendFallback(
      res,
      locale,
      message,
      "MISSING_OPENAI_API_KEY",
      "Missing OPENAI_API_KEY on the server.",
    )
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const response = await client.responses.create({
      model: process.env.OPENAI_ASSISTANT_MODEL || "gpt-5.4-mini",
      reasoning: { effort: "low" },
      instructions: buildAssistantInstructions(locale),
      previous_response_id: previousResponseId || undefined,
      input: message,
    })

    const text = response.output_text?.trim()

    if (!text) {
      return sendError(
        res,
        502,
        "EMPTY_ASSISTANT_RESPONSE",
        "The assistant did not return a text response.",
      )
    }

    return res.status(200).json({
      responseId: response.id,
      text,
    })
  } catch (error) {
    const status = getErrorStatus(error)

    if (status === 401 || status === 403) {
      return sendFallback(
        res,
        locale,
        message,
        "OPENAI_AUTH_FAILED",
        "OpenAI rejected the server configuration.",
      )
    }

    if (status === 429) {
      return sendFallback(
        res,
        locale,
        message,
        "OPENAI_UPSTREAM_RATE_LIMITED",
        "OpenAI is temporarily rate limiting assistant requests.",
      )
    }

    return sendError(
      res,
      500,
      "ASSISTANT_REQUEST_FAILED",
      "The assistant request failed.",
    )
  }
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"]

  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim()
  }

  return req.socket?.remoteAddress || "unknown"
}

function canProceed(clientIp) {
  const now = Date.now()
  const recent = (requestLog.get(clientIp) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  )

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(clientIp, recent)
    return false
  }

  recent.push(now)
  requestLog.set(clientIp, recent)
  return true
}

function sendError(res, status, code, error) {
  return res.status(status).json({ code, error })
}

function sendFallback(res, locale, message, code, fallbackReason) {
  return res.status(200).json({
    code,
    fallbackReason,
    limitedMode: true,
    responseId: "",
    text: buildFallbackAssistantReply(message, locale),
  })
}

function getErrorStatus(error) {
  if (typeof error === "object" && error !== null && "status" in error) {
    return typeof error.status === "number" ? error.status : 0
  }

  return 0
}
