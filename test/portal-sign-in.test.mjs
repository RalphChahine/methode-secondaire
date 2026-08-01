import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import { createServer } from "vite"

import { getPortalCopy } from "../src/lib/portalCopy.js"

const read = (path) => readFile(new URL(path, import.meta.url), "utf8")

test("keeps client and team portal routes separate and unlisted", async () => {
  const [routes, app, searchIndex, layout, portal] = await Promise.all([
    read("../src/lib/routes.js"),
    read("../src/App.jsx"),
    read("../src/lib/searchIndexStrategy.js"),
    read("../src/layouts/SiteLayout.jsx"),
    read("../src/pages/Portal.jsx"),
  ])

  assert.match(routes, /team: \{ fr: "\/equipe", en: "\/en\/team" \}/)
  assert.match(app, /<Portal entryRole="operator" \/>/)
  assert.match(searchIndex, /"team"/)
  assert.match(layout, /const isPortalRoute = \["portal", "team"\]\.includes\(routeKey\)/)
  assert.match(portal, /useState\("request_code"\)/)
  assert.match(portal, /authStep === "verify_code"/)

  const clientLoginSlice = portal.slice(portal.indexOf("function LoginPanel"), portal.indexOf("function AccountCreationForm"))
  assert.doesNotMatch(clientLoginSlice, /copy\.operator/)
})

test("does not offer the operator role in the client chooser", async () => {
  const portal = await read("../src/pages/Portal.jsx")
  const clientRoleSlice = portal.slice(portal.indexOf("const clientRoleOptions"), portal.indexOf("const riskOptions"))

  assert.match(clientRoleSlice, /parent/)
  assert.match(clientRoleSlice, /tutor/)
  assert.doesNotMatch(clientRoleSlice, /operator/)
})

test("renders only client roles and hides the chooser for team access", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const { LoginPanel } = await vite.ssrLoadModule("/src/pages/Portal.jsx")
    const copy = getPortalCopy("fr")
    const baseProps = {
      copy,
      role: "parent",
      authMode: "login",
      authStep: "request_code",
      email: "",
      code: "",
      isLoading: false,
      loadingAction: "",
      onRoleChange: () => {},
      onAuthModeChange: () => {},
      onEmailChange: () => {},
      onCodeChange: () => {},
      onRequestCode: () => {},
      onVerifyCode: () => {},
      onCreateAccount: () => {},
      showAccountCreation: false,
      newClientPath: "/demande",
    }
    const clientHtml = renderToStaticMarkup(createElement(MemoryRouter, null, createElement(LoginPanel, baseProps)))
    assert.equal((clientHtml.match(/Parent/g) || []).length, 1)
    assert.equal((clientHtml.match(/Tuteur/g) || []).length, 1)
    assert.doesNotMatch(clientHtml, /Équipe/)

    const teamHtml = renderToStaticMarkup(createElement(
      MemoryRouter,
      null,
      createElement(LoginPanel, {
        ...baseProps,
        role: "operator",
        isTeamEntry: true,
        showAccountCreation: false,
      }),
    ))
    assert.doesNotMatch(teamHtml, /Parent|Tuteur|Équipe/)
  } finally {
    await vite.close()
  }
})
