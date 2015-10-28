/**
 * Autorun
 */
Meteor.autorun(function() {
    Meteor.subscribe("messages", Session.get('room'));
    Meteor.subscribe("rooms", Meteor.userId());
});

/**
 * Helpers
 */
Template.room.helpers({
    roomUrl: function(){
        return Meteor.absoluteUrl({secure:true}) + Session.get('room');
    },
    standupName: function(){
        var room = Rooms.findOne({_id: Session.get('room')});
        if (undefined != room) {
            return room.title;
        }
        return '';
    },
    users: function(){
        var room = Rooms.findOne({_id: Session.get('room')});
        if (undefined != room) {
            return room.users;
        }
        return [];
    },
    messages: function(){
        var messages = Messages.find();
        if (undefined != messages) {
            return messages.fetch();
        }
        return [];
    },
    isMe: function(){
        if (this.id == Meteor.userId()) {
            return true;
        }
    },
    isUserStandupCompleted: function(){
        return this.standup_completed;
    },
    isRoomStandupCompleted: function(){
        var room = Rooms.findOne({_id: Session.get('room')});
        if (undefined != room) {
            return room.standup_completed;
        } 
        return false;
    }
});

/**
 * Make sure the template has been rendered before to manipulate de DOM
 */
Template.room.rendered = function(){
    Deps.afterFlush(function(){
        // here it is safe to manipulate the DOM because DOM is ready
        if (Session.get('scrolldown')) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
}

/**
 * Used through Events
 */
var sendMessage = function(){
    var message = $('#input-message').val();
    var room    = Session.get('room');

    if (!message) {
        return;
    }

    /**
     * If we were at the bottom of the page while sending the message,
     * we automatically scroll down to get the latest message.
     * Only do this when we are already at the bottom of the page so
     * we can scroll up the history without being sent back to the bottom
     * when a folk send a message.
     */
    Session.setPersistent('scrolldown', false);

    // Are we at the bottom of the page?
    if ($(window).scrollTop() == $(document).height()-$(window).height()){
        Session.setPersistent('scrolldown', true);
    }

    Meteor.call("postMessage", room, message, function(error, result){
        if (error){
            console.log('An error occurred while posting message');
        } else {
            $('#input-message').val('');
        }
    });
};

/**
 * Events
 */
Template.room.events({
    'click #btn-send-message': function(){
        sendMessage();
    },
    'keydown #input-message': function(event) {
        if (event.which == 13 && ! event.shiftKey) {
            sendMessage();
        }
    },
    'click #share-link': function() {
        if ($('.field-link').css('display') == 'none') {
            $('.field-email').hide('fast');
            $('.field-link').show('fast');
        } else {
            $('.field-link').hide('fast');
        }
    },
    'click #share-email': function() {
        if ($('.field-email').css('display') == 'none') {
            $('.field-link').hide('fast');
            $('.field-email').show('fast');
        } else {
            $('.field-email').hide('fast');
        }
    }
});
