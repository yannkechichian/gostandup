// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Standup.io',
  DESCRIPTION: 'Let you create online standups with your team.'
};
