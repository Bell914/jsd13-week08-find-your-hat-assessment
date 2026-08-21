const HAT = '🥕';         
const HOLE = '🕳️';        
const FIELD_CHAR = '🌱';   
const PATH_CHAR = '🐰';    

class Field {
  
  constructor(field = [[]]) {
    this.field = field;
    this.playerX = 0;
    this.playerY = 0;
  }

  print() {
    const display = this.field
      .map(row => row.join(''))
      .join('\n');
    console.log(display);
  }

  moveRight() {
    this.playerX += 1;
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
