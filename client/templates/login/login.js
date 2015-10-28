/**
 * Event when a user create a new room.
 */
Template.login.events({
    'click #signin': function() {
        Meteor.loginWithGithub();
    }
});