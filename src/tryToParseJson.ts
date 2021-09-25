export default function<T> (str: string, def?: T): T | undefined {
  let res = def;
  try  {
    res = JSON.parse(str);
  } catch (e) {}
  return res;
}