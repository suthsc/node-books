var request = require('superagent');

function limited_access_token() {

    var token;

    request.post('https://api.digitalriver.com/oauth20/token')
        .set({Accept: 'application/json'})
        .send('client_id=267377a1574682745bcf58ec93250ebe')
        .send('grant_type=password')
        .end(function limitedTokenResponse(res) {
            console.log(res.body);
            token = res.body.access_token;
            authorized_request(token);
        });

}

function authorized_request(limited_access_token) {

    var full_access_token;

    request.post('https://api.digitalriver.com/oauth20/token')
        .auth('267377a1574682745bcf58ec93250ebe', 'b0119a3b0c816b2b')
        .set({
            Accept: 'application/json',
            'User-Agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
            Host: 'api.digitalriver.com'
        })
        .send('grant_type=client_credentials')
        .send('dr_limited_token=' + limited_access_token)
        // .send('dr_external_reference_id=ssutherland')
        .end(function onResponse(res) {
            console.log(res.headers);
            console.log(res.body);
            full_access_token = res.body.access_token;
        });

}

limited_access_token();

