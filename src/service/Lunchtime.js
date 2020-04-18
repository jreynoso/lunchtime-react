export default function fetchLunchOptions(loc, mode) {
  return window.fetch(`http://localhost:8080/lunchtime?loc=${loc}&mode=${mode}`)
  .then(r => r.json())
  .then(response => response || 'error')
}