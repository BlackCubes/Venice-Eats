export async function resolve(promise) {
  const resolved = {
    data: null,
    error: null
  };

  try {
    const { data } = await promise;
    resolved.data = data;
  } catch (err) {
    // console.log(`There was an error on the promose: ${err}`);
    resolved.error = err;
  }

  return resolved;
}
