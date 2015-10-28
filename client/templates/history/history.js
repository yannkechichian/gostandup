/**
 * Helpers
 */
Template.history.helpers({
    baseUrl: function(){
        return Meteor.absoluteUrl({secure:true});
    },
    standups: function(){
        return Rooms.find();
    }
});
