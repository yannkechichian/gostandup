/**
 * Returns formatted date
 */
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('dddd DD MMMM YYYY');
});

/**
 * Get role title from the ID
 */
Template.registerHelper('getRole', function (roleId) {
  var role;

  switch (roleId) {
    case '1':
        role = 'Core Developer';
        break;
    case '2':
        role = 'Designer';
        break;
    case '3':
        role = 'DevOps';
        break;
    case '4':
        role = 'Front-end Developer';
        break;
    case '5':
        role = 'Product Analyst';
        break;
    case '6':
        role = 'Project Manager';
        break;
    case '7':
        role = 'QA Tester';
        break;
    default:
        role = 'Guest';
  }

  return role;
});
