/**
 * Event when a user wants to join a room.
 */
Template.join.events({
    'click #join': function() {
        var role     = $('#role').val();
        var password = $('#password').val();

        room = Session.get('room');
        Meteor.call("joinRoom", room, Meteor.userId(), role, password, function(error, result){
            if (error) {
                // Sorry something went wrong while creating the room
                alert('Whoops! something went wrong while joining the room.');
            } else {
                if (false != result) {
                    console.log('Welcome to the room!');
                    Router.go('/join/'+room);
                } else {
                    // password invalid
                    console.log('Unable to authenticate to the room');
                    $('#group-password').effect('shake');
                }
            }
        });
    },
    'change #role': function() {
        if ($('#role').val() != '') {
            $('#role').css('color', 'black');
        } else {
            $('#role').css('color', '#b4bcc2');
        }
    },
    'keypress #username': function() {
        $('#username').parent().removeClass('has-error');
    }
});

