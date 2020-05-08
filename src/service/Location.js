function getIpAddress (onError) {
  return window.fetch('http://api.ipify.org?format=json')
    .then(r => r.json())
    .then(json => json.ip, onError)
}

function getGeoLocation (onChange, onError) {
  return window.fetch('http://ip-api.com/json/').then(r => r.json())
    .then(json => onChange({ coords: { latitude: json.lat, longitude: json.lon } }), onError)
}

export {
  getIpAddress,
  getGeoLocation
}
