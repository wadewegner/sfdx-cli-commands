'use strict'

var request = require('request');

module.exports = {
    topic: 'force',
    command: 'org:connectedApp',
    description: 'Creates a connected app in the current scratch org',
    help: 'help text for force:org:connectedapp',
    flags: [
        { name: 'instanceUrl', char: 'i', description: 'instance url', hasValue: true },
        { name: 'accessToken', char: 'a', description: 'access token', hasValue: true }
    ],
    run: function (context) {

        var jsforce = require('jsforce');
        var conn = new jsforce.Connection({
            serverUrl: context.flags.instanceUrl,
            sessionId: context.flags.accessToken
        });

        // creating metadata in array
        var metadata = [{
            contactEmail: 'wade.wegner@gmail.com',
            label: 'ConnectedAppLabel',
            oauthConfig:
            {
                callbackUrl: ['sfdx://success'],
                // consumerKey: ['blah'],
                scopes:
                [   'Basic',
                    'Api',
                    'Web',
                    'Full',
                    'Chatter',
                    'CustomApplications',
                    'RefreshToken',
                    'OpenID',
                    'CustomPermissions',
                    'Wave'  ]
            }
        }];

        conn.metadata.create('ConnectedApp', metadata, function (err, results) {
            if (err) { console.log(err); }
            
            // for (var i = 0; i < results.length; i++) {
            //     var result = results[i];
            //     console.log('success ? : ' + result.success);
            //     console.log('fullName : ' + result.fullName);
            // }

            console.log(results);
        });


    }
}
