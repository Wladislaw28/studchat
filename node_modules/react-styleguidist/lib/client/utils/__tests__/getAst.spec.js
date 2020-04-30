import getAst from '../getAst';
describe('getAst', function () {
  test('return AST', function () {
    var result = getAst("42");
    expect(result).toMatchSnapshot();
  });
});