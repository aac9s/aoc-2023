// Read input
const decoder = new TextDecoder('utf-8');
const data = Deno.readFileSync('inputs/input.txt');
const input = decoder.decode(data);

// Constants
const bound: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

// Functions
function maxOfLine(pattern: RegExp, line: string) {
  return Math.max(...line.match(pattern)?.map(Number) ?? [0]);
}

// Generate output
const output = input.slice(0, -1).split('\n')
  .map((line, i) => ({
    index: i + 1,
    red: maxOfLine(/(\d+)(?= red)/g, line),
    green: maxOfLine(/(\d+)(?= green)/g, line),
    blue: maxOfLine(/(\d+)(?= blue)/g, line),
  }))
  .filter((line: Record<string, number>) =>
    Object.keys(bound).every((k) => line[k] <= bound[k]),
  )
  .reduce((tot, line) => tot + line.index, 0);

console.log(output);
