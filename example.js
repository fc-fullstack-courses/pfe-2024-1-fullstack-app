function fn (data) {
  const something = data.something;

  return Promise.resolve(something);
}

async function asyncFn (data) {
  const something = data.something;

  return Promise.resolve(something);
}

// fn().catch(() => console.log('error happened'));
asyncFn().catch(() => console.log('error happened'));