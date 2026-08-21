const HAT = '🥕';         
const HOLE = '🕳️';        
const FIELD_CHAR = '🌱';   
const PATH_CHAR = '🐰';    

class Field {
  
  constructor(field = [[]]) {
    this.field = field;
  }

  print() {
    const display = this.field
      .map(row => row.join(''))
      .join('\n');
    console.log(display);
  }
}

const sampleMap = [
  [PATH_CHAR, FIELD_CHAR, HOLE],
  [FIELD_CHAR, HOLE, FIELD_CHAR],
  [FIELD_CHAR, HAT, FIELD_CHAR],
];

const myField = new Field(sampleMap);
console.log('--- go go ---');
myField.print();
