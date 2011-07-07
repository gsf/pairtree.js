// Pairtree JavaScript library

(function(pairtree) {
  // converts a Pairtree path to an ID
  pairtree.id = function(path, separator) {
    separator = separator || '/';
    var parts = path.trim().split(separator);
    path = '';
    for (var i=0, l=parts.length; i<l; i++) {
      if (parts[i].length == 2) {
        path += parts[i];
      } else if (parts[i].length == 1) {
        path += parts[i];
        break;
      }
    }
    return path.replace(/=/g, '/').replace(/\+/g, ':').replace(/,/g, '.');
  };
  // converts an ID to a Pairtree path
  pairtree.path = function(id, separator) {
    separator = separator || '/';
    var parts = [];
    id = id.replace(/\//g, '=').replace(/:/g, '+').replace(/\./g, ',');
    while (id) {
      parts.push(id.substr(0, 2));
      id = id.substr(2);
    }
    return separator + parts.join(separator) + separator;
  };
})(typeof module == 'object' ? module.exports : this.pairtree = {});
