import OpenAI from "openai"

import {
  buildAssistantInstructions,
  buildFallbackAssistantReply,
} from "../src/lib/assistantConfig.js"
import {
  buildFallbackLeadDiagnosticResult,
  buildLeadDiagnosticInstructions,
  buildLeadDiagnosticPrompt,
  isLeadDiagnosticComplete,
  leadDiagnosticSchema,
  normalizeLeadDiagnosticAnswers,
} from "../src/lib/leadDiagnostic.js"

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
  const mode = body.mode === "diagnostic" ? "diagnostic" : "chat"
  const message = typeof body.message === "string" ? body.message.trim() : ""
  const qualification = normalizeLeadDiagnosticAnswers(body.qualification || {})
  const previousResponseId =
    typeof body.previousResponseId === "string" ? body.previousResponseId.trim() : ""
  const clientIp = getClientIp(req)

  if (mode === "chat") {
    if (!message) {
      return sendError(res, 400, "MESSAGE_REQUIRED", "Message is required.")
    }

    if (message.length > 1500) {
      return sendError(res, 400, "MESSAGE_TOO_LONG", "Message is too long.")
    }
  } else if (!isLeadDiagnosticComplete(qualification)) {
    return sendError(
      res,
      400,
      "DIAGNOSTIC_INCOMPLETE",
      "Diagnostic qualification data is incomplete.",
    )
  }

  if (!canProceed(clientIp)) {
    return sendError(
      res,
      429,
      "ASSISTANT_RATE_LIMITED",
      "Too many assistant requests right now. Please wait a few minutes and try again.",
    )
  }

  const apiKey = normalizeEnvString(process.env.OPENAI_API_KEY)

  if (!apiKey) {
    return mode === "diagnostic"
      ? sendDiagnosticFallback(
          res,
          locale,
          qualification,
          "MISSING_OPENAI_API_KEY",
          "Missing OPENAI_API_KEY on the server.",
        )
      : sendFallback(
          res,
          locale,
          message,
          "MISSING_OPENAI_API_KEY",
          "Missing OPENAI_API_KEY on the server.",
        )
  }

  try {
    const client = new OpenAI({
      apiKey,
    })

    const model = process.env.OPENAI_ASSISTANT_MODEL || "gpt-5.4-mini"

    if (mode === "diagnostic") {
      const diagnostic = await createLeadDiagnostic(client, {
        locale,
        qualification,
        model,
      })

      return res.status(200).json({
        mode,
        limitedMode: false,
        diagnostic,
      })
    }

    const response = await client.responses.create({
      model,
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
      mode,
      responseId: response.id,
      text,
    })
  } catch (error) {
    const status = getErrorStatus(error)

    if (status === 401 || status === 403) {
      return mode === "diagnostic"
        ? sendDiagnosticFallback(
            res,
            locale,
            qualification,
            "OPENAI_AUTH_FAILED",
            "OpenAI rejected the server configuration.",
          )
        : sendFallback(
            res,
            locale,
            message,
            "OPENAI_AUTH_FAILED",
            "OpenAI rejected the server configuration.",
          )
    }

    if (status === 429) {
      return mode === "diagnostic"
        ? sendDiagnosticFallback(
            res,
            locale,
            qualification,
            "OPENAI_UPSTREAM_RATE_LIMITED",
            "OpenAI is temporarily rate limiting assistant requests.",
          )
        : sendFallback(
            res,
            locale,
            message,
            "OPENAI_UPSTREAM_RATE_LIMITED",
            "OpenAI is temporarily rate limiting assistant requests.",
          )
    }

    if (mode === "diagnostic") {
      return sendDiagnosticFallback(
        res,
        locale,
        qualification,
        "DIAGNOSTIC_REQUEST_FAILED",
        "The diagnostic request failed.",
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

function sendDiagnosticFallback(res, locale, qualification, code, fallbackReason) {
  return res.status(200).json({
    mode: "diagnostic",
    code,
    fallbackReason,
    limitedMode: true,
    diagnostic: buildFallbackLeadDiagnosticResult(locale, qualification),
  })
}

function getErrorStatus(error) {
  if (typeof error === "object" && error !== null && "status" in error) {
    return typeof error.status === "number" ? error.status : 0
  }

  return 0
}

function normalizeEnvString(value) {
  if (typeof value !== "string") {
    return ""
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return ""
  }

  if (
    trimmed.length >= 2 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1).trim()
  }

  return trimmed
}

async function createLeadDiagnostic(client, { locale, qualification, model }) {
  const response = await client.responses.create({
    model,
    reasoning: { effort: "low" },
    instructions: buildLeadDiagnosticInstructions(locale),
    input: buildLeadDiagnosticPrompt(locale, qualification),
    text: {
      format: {
        type: "json_schema",
        name: "lead_diagnostic",
        strict: true,
        schema: leadDiagnosticSchema,
      },
    },
  })

  const diagnostic = parseStructuredJson(response.output_text)

  if (!isDiagnosticResultShape(diagnostic)) {
    throw new Error("Invalid diagnostic response shape.")
  }

  return diagnostic
}

function parseStructuredJson(text) {
  if (typeof text !== "string" || !text.trim()) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function isDiagnosticResultShape(result) {
  return Boolean(
    result &&
      typeof result === "object" &&
      typeof result.headline === "string" &&
      typeof result.summary === "string" &&
      (result.recommendedAction === "call_now" || result.recommendedAction === "book_session") &&
      typeof result.recommendedActionLabel === "string" &&
      typeof result.recommendedService === "string" &&
      typeof result.actionReason === "string" &&
      Array.isArray(result.reasons) &&
      result.reasons.length >= 3 &&
      Array.isArray(result.nextSteps) &&
      result.nextSteps.length >= 3 &&
      typeof result.suggestedMessage === "string",
  )
}
