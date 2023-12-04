// Read input
const decoder = new TextDecoder('utf-8');
const data = Deno.readFileSync('inputs/input.txt');
const input = decoder.decode(data);

// Functions
function maxOfLine(pattern: RegExp, line: string) {
  return Math.max(...(line.match(pattern)?.map(Number) ?? [0]));
}

// Generate output
const output = input.slice(0, -1).split('\n')
  .map((line, i) => ({
    index: i + 1,
    red: maxOfLine(/(\d+)(?= red)/g, line),
    green: maxOfLine(/(\d+)(?= green)/g, line),
    blue: maxOfLine(/(\d+)(?= blue)/g, line),
  }))
  .map((line) => line.blue * line.green * line.red)
  .reduce((tot, power) => tot + power, 0);

console.log(output);
