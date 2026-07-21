# Paperclip PC runbook

This desktop can run Paperclip 24/7.

## Current power setup

AC sleep is disabled. When plugged in, the PC should not automatically sleep.

Battery sleep can remain enabled. If this is a desktop, it does not matter.

## What Chahine should do

1. Keep the PC plugged in.
2. Keep internet connected.
3. Keep Codex installed and signed in.
4. Keep Google Drive/Gmail connections active.
5. Let Windows install updates, but restart manually when convenient.
6. Check Codex notifications and Gmail daily.

## Recommended Windows settings

- Power mode: Balanced is fine.
- Sleep while plugged in: Never.
- Display off: allowed.
- Lock screen: allowed.
- Restart after updates: choose a predictable time.

## Morning check

- Open Codex.
- Confirm automations are active.
- Open the CRM Sheet.
- Review `Ops Dashboard`.

## If Paperclip stops

1. Check that the PC is awake and online.
2. Open Codex.
3. Confirm Google Drive/Gmail are still connected.
4. Check `$CODEX_HOME/automations`.
5. Run a manual Paperclip prompt in this task if needed.

## Better future setup

If 24/7 reliability becomes important, move Paperclip to an always-on cloud or mini PC.

Desktop 24/7 is good enough for now because the business is still in the operator-led phase.
