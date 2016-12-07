'use strict'

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function getWorkspaceJson() {
  var fs = require('fs');
  var path = require('path');

  var parentDir = path.resolve(process.cwd());
  var workspaceJson = JSON.parse(fs.readFileSync(path.resolve(parentDir, '.appcloud/workspaceorg.json'), 'UTF-8'));
  var workspaceJsonFile = path.join(getUserHome(), '.appcloud', workspaceJson.scratchOrgName + '.json');
  var workspaceJsonFileJson = JSON.parse(fs.readFileSync(workspaceJsonFile));
  
  return workspaceJsonFileJson;
}

module.exports = {
  topic: 'force',
  command: 'org:workspace',
  description: 'Creates a connected app in the current scratch org',
  help: 'help text for wade:connectedapp',
  flags: [
    {name: 'accessToken', char: 'a', description: 'workspace access token', hasValue: false},
    {name: 'clientId', char: 'i', description: 'workspace access token', hasValue: false},
    {name: 'clientSecret', char: 's', description: 'workspace access token', hasValue: false},
    {name: 'instanceUrl', char: 'u', description: 'workspace access token', hasValue: false}
  ],
  run: function (context) {
    if (context.flags.accessToken) {
      console.log(getWorkspaceJson().accessToken);
    } else if (context.flags.clientId) {
      console.log(getWorkspaceJson().clientId);
    } else if (context.flags.clientSecret) {
      console.log(getWorkspaceJson().clientSecret);
    } else if (context.flags.instanceUrl) {
      console.log(getWorkspaceJson().instanceUrl);
    } else {
      console.log(getWorkspaceJson());
    }
  }
}
