import config from '../config/config.json'
const env = process.env.NODE_ENV || 'development'

export default function fetchLunchOptions (loc, mode) {
  const envConfig = config[env]
  if (!envConfig || !envConfig.lunchtime_api_url) {
    console.error(`lunchtime_api_url is not configured for ${env}`)
    return
  }
  return window.fetch(`${envConfig.lunchtime_api_url}/lunchtime?loc=${loc}&mode=${mode}`)
    .then(r => r.json())
    .then(response => response || 'empty')
}
