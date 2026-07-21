import { StaticRouter } from "react-router-dom"

import { AppRoutes } from "./App"

export function ServerApp({ location }) {
  return (
    <StaticRouter location={location}>
      <AppRoutes />
    </StaticRouter>
  )
}
