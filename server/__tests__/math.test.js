function checkNumber (num) {
  if(isNaN(num) || typeof num !== 'number') {
    throw new TypeError('num is NaN value');
  }

  return num;
}

function sum(a, b) {
  return Number(a) + Number(b);
}

test('очікуємо що 2 + 2 буде 4', () => {
  expect(sum(2, 2)).toBe(4);
});

test("очікуємо що '5' + 5 буде 10", () => {
  expect(sum('5', 5)).toBe(10);
});

test('очікуємо що 0.1 + 0.2 буде 0.3', () => {
  expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
});

test('перевірка однаковості користувача', () => {

  expect({
    id: 1
  }).toEqual({
    id: 1
  });
});

test('очікуємо що рядок апшвашф буде кидатися помилкою типу при перевірці у checkNumber', () => {
  expect(() => checkNumber('апшвашф')).toThrow(TypeError);
});

/*
  TDD (test driven development) - стиль написання додатку коли ви спочатку пишете
    тести для перевірки функціоналу а тількі потім пишете сам функціонал
*/
