Accounts.onCreateUser(function (options, user) {
    var accessToken = user.services.github.accessToken,
        result,
        profile;

    result = Meteor.http.get("https://api.github.com/user", {
        headers: {"User-Agent": "Meteor/1.0"},
        params: {
            access_token: accessToken
        }
    });

    if (result.error) {
        throw result.error;
    }

    profile = _.pick(result.data, "name", "avatar_url");

    user.profile = profile;

    return user;
});