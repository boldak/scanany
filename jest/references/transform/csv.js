var csv =
{
    inputData: 'var;value\na;1\nb;2\n',
    js: [{ var: 'a', value: '1' }, { var: 'b', value: '2' }],
    csv: '"var";"value"\n"a";"1"\n"b";"2"',
    xml: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<root>\n' +
        '  <var>a</var>\n' +
        '  <value>1</value>\n' +
        '  <var>b</var>\n' +
        '  <value>2</value>\n' +
        '</root>',
    yaml: "- var: a\n  value: '1'\n- var: b\n  value: '2'\n"
}

module.exports = csv;