// test for converting Pairtree paths to IDs
// from https://github.com/edsu/ptree, which included this note:
//
// # Thanks to John Kunze of the California Digital Library for the unit tests
// # in his CPAN module, which these were lifted from.
// # http://search.cpan.org/~jak/File-Pairtree-0.28/

var common = require('./common');
var equal = common.assert.equal;
var pairtree = common.pairtree;

common.expected = 13;

equal(pairtree.id('/ab/cd/'), 'abcd', 'basic 4-char ppath');
equal(pairtree.id('/ab/cd/e/'), 'abcde', 'basic 5-char ppath');
equal(pairtree.id('ab/cd/e'), 'abcde', 'missing terminal separators');
equal(pairtree.id('/ab/cd/e/f/gh/'), 'abcde', 'shorty ends ppath');
equal(pairtree.id('/x/ab/cd/'), 'abcd', 'shorty before ppath is skipped');
equal(pairtree.id('///ab///cd///e///////'), 'abcde', 'lots of bunched separators');
equal(pairtree.id('  //ab///cd///e///  '), 'abcde', 'whitespace in front and in back');
equal(pairtree.id('pairtree_root/ab/cd/ef/obj/gh/i'), 'abcdef', 'junk before and after ppath');
equal(pairtree.id('pairtree_root/ab/c/d/ef'), 'abc', 'junk after one-char component terminates ppath');
equal(pairtree.id('pairtree_root/a=/c+/e,/obj'), 'a/c:e.', 'junk with weird chars');
equal(pairtree.id('/home/jak/pairtree_root/ab/cd/e/data/obj'), 'abcde', 'bigger junk before and after path');
equal(pairtree.id('pairtree_root/wh/at/-t/he/-^/2a/@^/3f/#!/^5/e!/^3/f/obj'), 'what-the-*@?#!^!?', 'junk with reverse of spec example');
equal(pairtree.id('/5^/e2/^8/2^/ac/^2/0^/d5/^b/d^/d5/^a/5^/d5/^b/6^/d5/^a/4^/d5/^b/e^/d5/^a/b^/d5/^b/9/'), '5€ սենդվիչ');//, 'UTF-8 chars (Armenian for "5-euro sandwich")');

// really? ugh. this seems contradictory. forget about it for now.
//equal(pairtree.id('/home/jak/pairtree_root/ab/cd/e/data/obj/pairtree_root/gh/ij'), 'ghij', 'ppath followed by a ppath picks last one');
