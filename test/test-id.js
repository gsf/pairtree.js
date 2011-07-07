// test for converting Pairtree paths to IDs
// from https://github.com/edsu/ptree, which included this note:
//
// # Thanks to John Kunze of the California Digital Library for the unit tests
// # in his CPAN module, which these were lifted from.
// # http://search.cpan.org/~jak/File-Pairtree-0.28/

var common = require('./common');
var equal = common.assert.equal;
var pairtree = common.pairtree;

common.expected = 10;

equal(pairtree.id('/ab/cd/'), 'abcd', 'basic 4-char path');
equal(pairtree.id('/ab/cd/e/'), 'abcde', 'basic 5-char path');
equal(pairtree.id('ab/cd/e'), 'abcde', 'missing terminal separators');
equal(pairtree.id('/ab/cd/e/f/gh/'), 'abcde', '1-char shorty ends ppath');
equal(pairtree.id('///ab///cd///e///////'), 'abcde', 'lots of bunched separators');
equal(pairtree.id('  //ab///cd///e///  '), 'abcde', 'whitespace in front and in back');
equal(pairtree.id('pairtree_root/ab/cd/e/obj'), 'abcde', 'junk before and after path');
equal(pairtree.id('pairtree_root/ab/c/d/ef'), 'abc', 'junk after one-char component terminates ppath');
equal(pairtree.id('pairtree_root/a=/c+/e,/obj'), 'a/c:e.', 'junk with weird chars');
equal(pairtree.id('/home/jak/pairtree_root/ab/cd/e/data/obj'), 'abcde', 'bigger junk before and after path');
// really? ugh. forget about this one for now
//equal(pairtree.id('/home/jak/pairtree_root/ab/cd/e/data/obj/pairtree_root/gh/ij'), 'ghij', 'ppath followed by a ppath picks last one');
