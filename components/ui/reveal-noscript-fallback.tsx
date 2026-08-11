// Server component: forces .reveal content to full visibility when
// JavaScript is unavailable (disabled, blocked, or hydration failed).
// Without this, a no-JS visitor would be stuck looking at every
// Reveal-wrapped section permanently at opacity: 0, since the
// IntersectionObserver-based reveal-on-scroll never has a chance to run.
//
// This <style> lives outside any @layer, so per the CSS cascade-layers
// spec it automatically outranks the layered `.reveal` rule in
// app/globals.css regardless of selector specificity or source order —
// no !important needed. It only takes effect inside <noscript>, i.e.
// only when the browser did not execute JavaScript, matching real
// browser behavior for scripting-disabled parsing of <noscript> content.
export function RevealNoScriptFallback() {
  return (
    <noscript>
      <style>{`.reveal { opacity: 1; transform: none; }`}</style>
    </noscript>
  )
}
