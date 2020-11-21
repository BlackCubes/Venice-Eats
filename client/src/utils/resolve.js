export async function resolve(promise) {
  const resolved = {
    data: null,
    error: null
  };

  try {
    resolved.data = await promise;
  } catch (err) {
    // console.log(`There was an error on the promose: ${err}`);
    resolved.error = err;
  }

  return resolved;
}
