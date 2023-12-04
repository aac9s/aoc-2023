// Read input
const decoder = new TextDecoder('utf-8');
const data = Deno.readFileSync('inputs/input.txt');
const input = decoder.decode(data);

// Constants
const number = /(\d+)/g;
const symbol = /[\d\\.]/;
const SIZE = 140;

// Lines
const lines = input.slice(0, -1).split('\n');

// Generate output
const output = lines
  .flatMap((line, i) => {
    const parts = [];
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

      // Left and right
      if (!symbol.test(lines[i][startX]) || !/[\d\\.]/.test(lines[i][endX])) {
        parts.push(+match[0]);
        continue;
      }

      // Upper and lower strips
      for (let j = startX; j <= endX; j++) {
        if (!symbol.test(lines[startY][j]) || !/[\d\\.]/.test(lines[endY][j])) {
          parts.push(+match[0]);
          break;
        }
      }
    }

    return parts;
  })
  .reduce((tot, part) => tot + part);

console.log(output);
