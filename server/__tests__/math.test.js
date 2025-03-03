function sum (a, b) {
  return Number(a) + Number(b);
}

test('очікуємо що 2 + 2 буде 4', () => {
  expect(sum(2,2)).toBe(4);
});

test("очікуємо що '5' + 5 буде 10", () => {
  expect(sum('5', 5)).toBe(10);
});
