import splitExampleCode from '../splitExampleCode';
describe('splitExampleCode', function () {
  test('basic example', function () {
    var result = splitExampleCode("var a = 1;\nReact.createElement('i', null, a);");
    expect(result).toEqual({
      head: 'var a = 1',
      example: "var a = 1;\nreturn (React.createElement('i', null, a));"
    });
  });
  test('initialState', function () {
    var result = splitExampleCode("initialState = {a: 1};\nReact.createElement('i', null, state.a);");
    expect(result).toEqual({
      head: 'initialState = {a: 1}',
      example: "initialState = {a: 1};\nreturn (React.createElement('i', null, state.a));"
    });
  });
  test('JSX not only in the last expression', function () {
    var result = splitExampleCode("function Wrapper(ref) {\n\tvar children = ref.children;\n\treturn React.createElement('div', {id: 'foo'}, children);\n}\n\n;React.createElement(Wrapper, null,\n\tReact.createElement(Wrapper, null, React.createElement(Icon, {name: \"plus\"})),\n\tReact.createElement(Wrapper, null, React.createElement(Icon, {name: \"clip\"}))\n)");
    expect(result).toEqual({
      example: "function Wrapper(ref) {\n\tvar children = ref.children;\n\treturn React.createElement('div', {id: 'foo'}, children);\n}\n\n;\nreturn (React.createElement(Wrapper, null,\n\tReact.createElement(Wrapper, null, React.createElement(Icon, {name: \"plus\"})),\n\tReact.createElement(Wrapper, null, React.createElement(Icon, {name: \"clip\"}))\n));",
      head: "function Wrapper(ref) {\n\tvar children = ref.children;\n\treturn React.createElement('div', {id: 'foo'}, children);\n}\n\n"
    });
  });
  test('single expression', function () {
    var result = splitExampleCode('pizza');
    expect(result).toEqual({
      head: '',
      example: ";\nreturn (pizza);"
    });
  });
  test('empty string', function () {
    var result = splitExampleCode('');
    expect(result).toEqual({
      head: '',
      example: ''
    });
  });
  test('comment', function () {
    var result = splitExampleCode('/* ~ */');
    expect(result).toEqual({
      head: '',
      example: '/* ~ */'
    });
  });
  test('error', function () {
    var result = splitExampleCode('?');
    expect(result).toEqual({
      head: '',
      example: '?'
    });
  });
});