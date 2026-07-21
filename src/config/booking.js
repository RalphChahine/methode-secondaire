// Public session requests are deliberately separate from the client portal.
// A parent can describe the need first; an account is only invited after matching.
// `DECLIC_*` is a legacy internal export retained for route/import compatibility;
// all public copy calls this the targeted-session request.
export const DECLIC_REQUEST_URL = "/demande"
export const DECLIC_REQUEST_URL_EN = "/en/request"

// Keep existing imports working while CTA copy is migrated to the request flow.
export const BOOKING_URL = DECLIC_REQUEST_URL
export const BOOKING_URL_EN = DECLIC_REQUEST_URL_EN
