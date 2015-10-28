/**
 * Event when a user create a new room.
 */
Template.menu.events({
    'click #signin': function() {
        Meteor.loginWithGithub();
    },
    'click #signout': function() {
        Meteor.logout();
    }
});

/**
 * Global variable users template.
 * @returns {*}
 */
Template.signout.helpers({
    user: function(){
        return Meteor.user().profile;
    }
});