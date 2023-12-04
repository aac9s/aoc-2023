// Read input
const decoder = new TextDecoder('utf-8');
const data = Deno.readFileSync('inputs/input.txt');
const input = decoder.decode(data);

// Constants
const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const numbers = /\d/g;

// Tries to get one of the two boundaries
function boundary(s: string): string | null {
  // Numeric match
  const numberMatch = s.match(numbers)?.[0];

  if (numberMatch) {
    return numberMatch;
  }

  // String match
  const index = words.findIndex((n) => s.includes(n)) + 1;
  return index ? `${index}` : null;
}

// Get the two boundaries
function boundaries(s: string): string {
  let first: string | null = null;
  let last: string | null = null;

  for (let i = 0; i <= s.length; i++) {
    first ??= boundary(s.slice(0, i));
    last ??= boundary(s.slice(-(i + 1)));
  }

  return `${first}${last}`;
}

// Generate output
const output = input
  .slice(0, -1)
  .split('\n')
  .map(boundaries)
  .reduce((tot, num) => tot + +num, 0);

console.log(output);
