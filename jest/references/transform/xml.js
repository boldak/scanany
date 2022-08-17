var xml =
{
    json: '{\n' +
        ' "node": {\n' +
        '  "$": {\n' +
        '   "name": "root"\n' +
        '  },\n' +
        '  "node": [\n' +
        '   {\n' +
        '    "_": "\\n    text content\\n  ",\n' +
        '    "$": {\n' +
        '     "name": "child"\n' +
        '    }\n' +
        '   }\n' +
        '  ]\n' +
        ' }\n' +
        '}',
    xml: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<node name="root">\n' +
        '  <node name="child">\n' +
        '    text content\n' +
        '  </node>\n' +
        '</node>'
}

module.exports = xml;