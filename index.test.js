const { sanitizeMongoQuery } = require('./index');

test('should throw with evil keys', () => {
  expect(() => sanitizeMongoQuery({$where: 'sleep(1000)'})).toThrow(/where/);
});


test('should throw with unsafe regex', () => {
  expect(() => sanitizeMongoQuery({test: /(a+)*/ })).toThrow(/regex/);
  expect(() => sanitizeMongoQuery({$regex: "(a+)*" })).toThrow(/regex/);
})
