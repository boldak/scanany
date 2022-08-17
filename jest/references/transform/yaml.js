var yaml =
{
    js: { root: { array: ["a", "b", "c"], string: 'abc' } },
    json: '{\n' +
        ' "root": {\n' +
        '  "array": [\n' +
        '   "a",\n' +
        '   "b",\n' +
        '   "c"\n' +
        '  ],\n' +
        '  "string": "abc"\n' +
        ' }\n' +
        '}',
    yaml: 'root:\n  array:\n    - a\n    - b\n    - c\n  string: abc\n'
}

module.exports = yaml;