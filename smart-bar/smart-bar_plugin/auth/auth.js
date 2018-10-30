var config = {
    region: 'us-west-2',
    IdentityPoolId: 'us-west-2:b8430230-4a75-4298-b07a-1c42e7daea56',
    UserPoolId: 'us-west-2_r335MY6ok',
    ClientId: '6unh3nillucsju2of83ijl25fj'
};


function SignIn(email,pass,callback) {


    var authenticationData = {
        Username: email,
        Password: pass
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId: config.UserPoolId, // Your user pool id here
        ClientId: config.ClientId // Your client id here
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());

            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = config.region;
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: config.IdentityPoolId, // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                login : 'cognito-idp.' + config.region + '.amazonaws.com/' + config.UserPoolId,
                token : result.getIdToken().getJwtToken()
                }
            });

            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();

        },

        onFailure: function (err) {
            alert(err);
        }

    });

}