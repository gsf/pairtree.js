// Pairtree JavaScript library

(function(pairtree) {
  // implement trim if it's not there
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
  // converts a ppath to an ID
  pairtree.id = function(path, separator) {
    separator = separator || '/';
    var parts = path.trim().split(separator);
    var id = '';
    for (var i=0, l=parts.length; i<l; i++) {
      if (parts[i].length == 2) {
        id += parts[i];
      } else if (parts[i].length == 1) {
        if (id) {
          id += parts[i];
          break;
        }
      } else if (parts[i].length > 2) {
        if (id) break;
      }
    }
    return id.replace(/=/g, '/').replace(/\+/g, ':').replace(/,/g, '.');
  };
  // converts an ID to a ppath
  pairtree.path = function(id, separator) {
    separator = separator || '/';
    var parts = [];
    id = id.replace(/[\"*+,<=>?\\^|]|[^\x21-\x7e]/g, function(c) {
      c = c.charCodeAt(0);
      if (c > 255) return ''; // drop characters greater than ff
      return '^' + c.toString(16);
    });
    id = id.replace(/\//g, '=').replace(/:/g, '+').replace(/\./g, ',');
    while (id) {
      parts.push(id.substr(0, 2));
      id = id.substr(2);
    }
    return separator + parts.join(separator) + separator;
  };
})(typeof module == 'object' ? module.exports : this.pairtree = {});
