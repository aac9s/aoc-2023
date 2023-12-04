// Read input
const decoder = new TextDecoder('utf-8');
const data = Deno.readFileSync('inputs/input.txt');
const input = decoder.decode(data);

// Constants
const number = /(\d+)/g;
const star = /\*/;
const SIZE = 140;

// Functions
function insert(coordinates: [number, number], value: number) {
  const stringCoordinates = `${coordinates[0]},${coordinates[1]}`;

  if (!potentialGears.has(stringCoordinates)) {
    potentialGears.set(stringCoordinates, []);
  }

  potentialGears.get(stringCoordinates)?.push(value);
}

// Variables
const lines = input.slice(0, -1).split('\n');
const potentialGears: Map<string, number[]> = new Map();

// Find potential gears
lines.forEach((line, i) => {
  let match;

  while ((match = number.exec(line)) !== null) {
    const matchIndex = match.index;
    const matchLength = match[0].length;

    const [startX, startY] = [matchIndex - 1, i - 1].map((n) =>
      n < 0 ? n + 1 : n,
    );

    const [endX, endY] = [matchIndex + matchLength, i + 1].map((n) =>
      n >= SIZE ? n - 1 : n,
    );

    // Left
    if (star.test(lines[i][startX])) {
      insert([startX, i], +match[0]);
      continue;
    }

    // Right
    if (star.test(lines[i][endX])) {
      insert([endX, i], +match[0]);
      continue;
    }

    // Upper and lower strips
    for (let j = startX; j <= endX; j++) {
      if (star.test(lines[startY][j])) {
        insert([j, startY], +match[0]);
        break;
      }

      if (star.test(lines[endY][j])) {
        insert([j, endY], +match[0]);
        break;
      }
    }
  }
});

// Filter gears and add them up
const output = Array.from(potentialGears.values())
  .filter((p) => p.length === 2)
  .map((gears) => gears.reduce((tot, g) => tot * g))
  .reduce((tot, ratio) => tot + ratio);

console.log(output);
