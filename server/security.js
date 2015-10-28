/**
 * Returns a random string
 */
var getRandom = function(){
    var length = 20;
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
};

/**
 * Hash a password and salt
 */
var hash = function(string, salt){
    s = string+salt;
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
};