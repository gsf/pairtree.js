// Pairtree JavaScript library

(function(pairtree) {
  // implement trim if it's not there
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
  // string to utf-8 byte array from
  // http://code.google.com/p/closure-library/
  var stringToUtf8ByteArray = function(str) {
    str = str.replace(/\r\n/g, '\n');
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c < 128) {
        out[p++] = c;
      } else if (c < 2048) {
        out[p++] = (c >> 6) | 192;
        out[p++] = (c & 63) | 128;
      } else {
        out[p++] = (c >> 12) | 224;
        out[p++] = ((c >> 6) & 63) | 128;
        out[p++] = (c & 63) | 128;
      }
    }
    return out;
  };
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
    id = id.replace(/=/g, '/').replace(/\+/g, ':').replace(/,/g, '.');
    id = id.replace(/\^(..)/g, function(str, h) {
      return String.fromCharCode(parseInt(h, 16));
    });
    return id;
  };
  // converts an ID to a ppath
  pairtree.path = function(id, separator) {
    separator = separator || '/';
    id = id.replace(/[\"*+,<=>?\\^|]|[^\x21-\x7e]/g, function(c) {
      c = stringToUtf8ByteArray(c);
      var ret = '';
      for (var i=0, l=c.length; i<l; i++) {
        ret += '^' + c[i].toString(16);
      }
      //c = c.charCodeAt(0);
      //if (c > 255) return ''; // drop characters greater than ff
      //return '^' + c.toString(16);
      return ret;
    });
    id = id.replace(/\//g, '=').replace(/:/g, '+').replace(/\./g, ',');
    var path = separator;
    while (id) {
      path += id.substr(0, 2) + separator;
      id = id.substr(2);
    }
    return path;
  };
})(typeof module == 'object' ? module.exports : this.pairtree = {});
