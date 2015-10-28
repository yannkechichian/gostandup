/**
 * Events
 */
Template.create.events({
    'click #create': function() {
        var title    = $('#title').val();
        var role     = $('#role').val();
        var password = $('#password').val();

        // @todo: Can a user create as many room as he wants?
        Meteor.call("createRoom", title, Meteor.user(), role, password, function(error, result){
            if (error) {
                // Sorry something went wrong while creating the room
                alert('Whoops! something went wrong while creating the room.');
            } else {
                var room = result.room;
                Router.go('/create/' + room);
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
