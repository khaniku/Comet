import namor from "namor";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    surveyID: Math.floor(Math.random() * 10000),
    surveyLocation: namor.generate({ words: 1, numbers: 0 }),
    clientName: namor.generate({ words: 2, numbers: 0 }),
    status:
      statusChance > 0.66
        ? "In Progress"
        : statusChance > 0.33
        ? "Completed"
        : "To Be Assigned"
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
