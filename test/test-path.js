// test for converting IDs to Pairtree paths
// from https://github.com/edsu/ptree, which included this note:
//
// # Thanks to John Kunze of the California Digital Library for the unit tests
// # in his CPAN module, which these were lifted from.
// # http://search.cpan.org/~jak/File-Pairtree-0.28/

var common = require('./common');
var equal = common.assert.equal;
var pairtree = common.pairtree;

common.expected = 17;

equal(pairtree.path('abc'), '/ab/c/', 'basic 3-char case');
equal(pairtree.path('abcd'), '/ab/cd/', 'basic 4-char case');
equal(pairtree.path('abcdefg'), '/ab/cd/ef/g/', 'basic 7-char case');
equal(pairtree.path('abcde', '\\'), '\\ab\\cd\\e\\', '5-char with \\ separator');
equal(pairtree.path('xy'), '/xy/', '2-char edge case');
equal(pairtree.path('z'), '/z/', '1-char edge case');
equal(pairtree.path(''), '/', '0-char edge case');
equal(pairtree.path('abcdefg', ''), '/ab/cd/ef/g/', '7-char, empty separator case');
equal(pairtree.path('12-986xy4'), '/12/-9/86/xy/4/', 'hyphen');
equal(pairtree.path('13030_45xqv_793842495'), '/13/03/0_/45/xq/v_/79/38/42/49/5/', 'long id with undescores');
equal(pairtree.path('ark:/13030/xt12t3'), '/ar/k+/=1/30/30/=x/t1/2t/3/', 'colons and slashes');
equal(pairtree.path('/'), '/=/', '1-separator-char edge case');
equal(pairtree.path('http://n2t.info/urn:nbn:se:kb:repos-1'), '/ht/tp/+=/=n/2t/,i/nf/o=/ur/n+/nb/n+/se/+k/b+/re/po/s-/1/', 'a URL with colons, slashes, and periods');
equal(pairtree.path('what-the-*@?#!^!?'), '/wh/at/-t/he/-^/2a/@^/3f/#!/^5/e!/^3/f/', 'weird chars from spec example');
equal(pairtree.path('\\"*+,<=>?^|'), '/^5/c^/22/^2/a^/2b/^2/c^/3c/^3/d^/3e/^3/f^/5e/^7/c/', 'all weird visible chars');
equal(pairtree.path('Années de Pèlerinage'), '/An/n^/c3/^a/9e/s^/20/de/^2/0P/^c/3^/a8/le/ri/na/ge/', 'UTF-8 chars');
equal(pairtree.path('€ŽPZ'), '/^e/2^/82/^a/c^/c5/^b/dP/Z/', 'more crazy UTF-8 chars');
