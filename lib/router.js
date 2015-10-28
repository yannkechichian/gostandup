Router.configure({
    layoutTemplate: 'basic',
    notFoundTemplate: '404'
});

Router.onBeforeAction(function(){
    if (! Meteor.userId()) {
        this.render('login');
    } else {
        this.next();
    }
});

// Default page
Router.route('/', function(){
    this.render('create');
});

// Room create page
Router.route('/create', function(){
    this.render('create');
});

// Room join page
Router.route('/join', function(){
    this.render('create');
});

// History page
Router.route('/history', function(){
    this.render('history');
});

// Room join page
Router.route('/:_room', function(){
    var self = this;
    Session.setPersistent('room', self.params._room);
    Meteor.call('hasJoinedRoom', self.params._room, Meteor.userId(), function(error, result){
        if (error) {
            // go to error page
            console.log('an error occured while getting user to join the room');
        } else {
            if (result){
                console.log('Attempt to join the room: Access granted');
                self.render('room', {data: {active: true}});
            } else {
                console.log('Attempt to join the room: Access refused');
                self.render('join');
            }
        }
    });
});