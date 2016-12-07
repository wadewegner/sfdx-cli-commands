'use strict'
exports.topic = {
  name: 'force',
  // this is the help text that shows up under `heroku help`
  description: 'a topic for the hello world plugin'
}

exports.commands = [
  require('./commands/workspace.js'),
  require('./commands/connectedapp.js')
]