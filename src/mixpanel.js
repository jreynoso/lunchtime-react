import mixpanel from 'mixpanel-browser'
import config from './config/config.json'

const env = process.env.NODE_ENV || 'development'
const envConfig = config[env]
mixpanel.init(envConfig.mixpanel_token)

const mixpanelEnabled = process.env.NODE_ENV === 'production'

const actions = {
  identify: (id) => {
    if (mixpanelEnabled) mixpanel.identify(id)
  },
  alias: (id) => {
    if (mixpanelEnabled) mixpanel.alias(id)
  },
  track: (name, props) => {
    if (mixpanelEnabled) mixpanel.track(name, props)
  },
  people: {
    set: (props) => {
      if (mixpanelEnabled) mixpanel.people.set(props)
    }
  }
}

export const Mixpanel = actions
