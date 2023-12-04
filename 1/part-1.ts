// Read input
const decoder = new TextDecoder('utf-8');
const data = Deno.readFileSync('inputs/input.txt');
const input = decoder.decode(data);

// Generate output
const output = input.slice(0, -1).split('\n')
  .map((line) => line.replaceAll(/\D/g, ''))
  .map((line) => `${line[0]}${line.slice(-1)}`)
  .reduce((tot, num) => tot + +num, 0);

console.log(output);
