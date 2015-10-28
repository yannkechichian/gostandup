/**
 * Create a new room
 */
Meteor.methods({
    createRoom: function(title, user, role, password){
        var salt = CryptoJS.lib.WordArray.random(128/8).toString();
        var password = CryptoJS.SHA256(salt+password).toString();
        var room = Rooms.insert({
            title: title,
            password: password,
            salt: salt,
            users: [{
                'id': user._id, 
                'name': user.profile.name,
                'role': role,
                'standup_completed': false
            }],
            standup_completed: false,
            timestamp: Date.now()
        },
        function(err){
            if (err) {
                throw new Meteor.error('create-room', 'Error while creating a room');
            }
        });

        // If all good, we return the room freshly created
        return {'user': Meteor.user(), 'room': room};
    },
    // This method insert a user into a room (if authentication passes)
    joinRoom: function(room, userId, role, password){
        var room = Rooms.findOne({_id: room});
        if (undefined != room){
            var password = CryptoJS.SHA256(room.salt+password).toString();
            if (room.password == password) {
                console.log('join-room: access granted for room '+room._id);
                Rooms.update({_id: room._id}, {$addToSet: {users: {
                    'id': userId,
                    'name': Meteor.user().profile.name,
                    'role': role,
                    'standup_completed': false
                }}});
                return true;
            } else {
                console.log('joinRoom: access denied');
            }
        }

        console.log('joinRoom: room is undefined');
        return false;
    },
    // Return true is the current user has already joined the room
    hasJoinedRoom: function(room, userId) {
        var room = Rooms.findOne({_id: room});
        if (undefined != room) {
            var currentUser = userId;
            for (index in room.users){
                if (room.users[index].id == currentUser) {
                    console.log('hasJoinedRoom: true');
                    return true;
                }
            }
        }

        console.log('hasJoinedRoom: false');
        return false;
    },
    postMessage: function(room, message){
        // Getting the user information for the current room
        var user = null;
        var room = Rooms.findOne({_id: room});
        var currentUser = Meteor.user()._id;
        for (index in room.users){
            if (room.users[index].id == currentUser) {
                user = room.users[index];
                break;
            }
        }
        if (null == user){
            console.log('postMessage: an error occured while getting user information for the current room');
        }
        var result = Messages.insert({
            room:      room._id,
            username:  user.name,
            role:      user.role,
            message:   message,
            timestamp: Date.now()
        },
        function(err, id) {
            if (err) {
                console.log('postMessage: an error occured while inserting the message');
            }
            if (id) {
                /**
                 * If @standup, "yesterday" and "today" are found in the message
                 */
                if ((/@standup/i.test(message)) && (/yesterday/i.test(message)) && (/today/i.test(message))) {
                    // The standup is done for this user
                    Rooms.update(
                        {_id: room._id, 'users.id': user.id},
                        {$set: {'users.$.standup_completed': true}}
                    );

                    // If there is no user left with empty checked, the standup is completed for the room
                    var data = Rooms.findOne({_id: room._id, "users.standup_completed": false});
                    if (undefined == data) {
                        Rooms.update(
                            {_id: room._id},
                            {$set: {'standup_completed': true}}
                        );
                    }
                }
                // DEBUG ONLY
                else if ((/@false/i.test(message))) {
                    Rooms.update(
                        {_id: room._id, 'users.id': user.id}, 
                        {$set: {'users.$.standup_completed': false, 'standup_completed': false}}
                    );
                }
            }
        });

        // Return false if no error occurred
        return result;
    }
});
