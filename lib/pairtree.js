// Pairtree JavaScript library

(function(pairtree) {
  // converts a Pairtree path to an ID
  pairtree.id = function(path, separator) {
    separator = separator || '/';
    path = path.trim().split(separator).join('');
    return path.replace(/=/g, '/').replace(/\+/g, ':').replace(/,/g, '.');
  };
  // converts an ID to a Pairtree path
  pairtree.path = function(id, separator, shortyLength) {
    separator = separator || '/';
    shortyLength = shortyLength || 2;
    var parts = [];
    id = id.replace(/\//g, '=').replace(/:/g, '+').replace(/\./g, ',');
    while (id) {
      parts.push(id.substr(0, shortyLength));
      id = id.substr(shortyLength);
    }
    return separator + parts.join(separator) + separator;
  };
})(typeof module == 'object' ? module.exports : this.pairtree = {});
