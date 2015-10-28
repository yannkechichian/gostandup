/**
 * Publish methods
 */
Meteor.publish("messages", function(room) {
    console.log('Publish messages for room: '+room);
    return Messages.find({
        room: room
    });
});

Meteor.publish("rooms", function(user) {
    console.log('Publish rooms for user: '+user);
    return Rooms.find({
        'users.id': user
    });
});

/**
 * Allow methods (to rewrite to check!)
 */
Messages.allow({
    'insert': function(userId, doc) {
        return true;
    }
});

Rooms.allow({
    'insert': function(userId, doc) {
        return true;
    },
    'update': function(userId, doc) {
        return true;
    }
});