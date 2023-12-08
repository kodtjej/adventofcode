import { promises as fs } from 'fs';

const input = await fs.readFile('input', 'utf-8');

const parseSeeds = (data) => {
  return data
    .match(/^seeds:.+$/gm)[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((seed) => ({
      seed: parseInt(seed),
    }));
};

const parseMap = (map, data, seeds) => {
  const reg = `${map} map:(\\n[\\d+ \\n]+)`;
  const regex = new RegExp(reg, 'gm');
  let res = data.match(regex)[0].split(/\n/gm);
  res = res.slice(1, res.length - 2); // kolla efter buggar här
  const values = res.map((r) => r.split(' ').map((n) => parseInt(n)));
  const [valueToMatch, _, valueToPoke] = map.split('-');

  values.map((v) => {
    // console.log(v);
    let [value, key, count] = v;
    for (let i = 0; i < count; i++) {
      seeds = seeds.map((s) => {
        if (s[valueToMatch] === key + i) {
          s[valueToPoke] = value + i;
          return s;
        } else if (!s[valueToPoke]) {
          s[valueToPoke] = s[valueToMatch];
        }

        return s;
      });
    }
  });
};

function part1() {
  const seeds = parseSeeds(input);
  parseMap('seed-to-soil', input, seeds);
  parseMap('soil-to-fertilizer', input, seeds);
  parseMap('fertilizer-to-water', input, seeds);
  parseMap('water-to-light', input, seeds);
  parseMap('light-to-temperature', input, seeds);
  parseMap('temperature-to-humidity', input, seeds);
  parseMap('humidity-to-location', input, seeds);
  console.log('part 1:', seeds.map((s) => s.location).sort()[0]);
}

part1();

/*

[{seed:81,soil:21, location, fertilizer, water, temperature, light, humidity}]


*/
