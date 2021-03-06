#!/usr/bin/env node

var examples = require('./parse'),
    fs = require('fs'),
    path = require('path'),
    tab = '    ',
    xml = path.join(__dirname, '../tests', 'unit.xml'),
    str = [
        '<?xml version="1.0"?>',
        '<!-- Dynamically generated by src/common/node/make_unit.js -->',
        '<yuitest>',
        tab + '<tests base="@TEST_ARTIFACTS_BASE@" timeout="120000">'
    ];

    str.push('<!-- This needs to be first to prep the ');
    str.push('            browser window for the other tests -->');
    str.push(tab + tab + '<url>common/tests/prep.html</url>');

    examples.forEach(function(url) {
        str.push(tab + tab + '<url>' + url + '</url>');
    });

    str.push(tab + '</tests>');
    str.push('</yuitest>');
    
    fs.writeFileSync(xml, str.join('\n'), 'utf8');

    console.log('Wrote', examples.length, 'test urls to unit.xml');
