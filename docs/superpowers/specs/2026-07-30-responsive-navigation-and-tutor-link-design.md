# Responsive navigation and tutor-link design

## Goal

Keep the mobile navigation usable on short screens and make the existing tutor recruitment page discoverable from both mobile and desktop navigation.

## Evidence and root cause

The reported mobile capture shows the right-side navigation sheet extending below the viewport. `SiteLayout.jsx` places all navigation links, home-page anchors, explanatory copy and two actions in one non-scrollable sheet. The global mobile booking bar and the sheet both use `z-50`, so the later booking bar can also visually cover the bottom of the sheet.

The recruitment page already exists at `/devenir-tuteur` (`/en/become-a-tutor`) and is linked only in the footer. It is absent from the shared `copy.nav` array used by the desktop navigation and the mobile sheet.

## Approved design

1. Keep the current navigation content and visual language; do not hide actions to make it fit.
2. Make the mobile sheet a viewport-bounded flex column. Its link/action area scrolls vertically and includes safe-area bottom padding, so every item remains reachable on short Android and iOS viewports.
3. Lower the global mobile booking bar below the sheet layer. Opening the sheet therefore always covers and disables the bar instead of letting it obscure the menu.
4. Add the localized recruitment destination (`Devenir tuteur` / `Become a tutor`) to the existing shared `copy.nav` list. The single source drives both the desktop navigation and the mobile sheet, keeping the two menus in sync.

## Accessibility and behavior

- The existing Sheet focus trap, close button, and `SheetClose` wrapping remain unchanged.
- The recruitment link is a normal client-side route and closes the mobile sheet on navigation.
- The global booking action remains available when the sheet is closed.

## Verification

- Add a source-level regression test that requires the localized recruitment route in shared navigation and the scroll/safe-area sheet styling.
- Run the targeted test, then the portal/site test suites and production build.
- Validate the sheet at a narrow, short viewport and verify that its lowest action is reachable without clipping.
