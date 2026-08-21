const prompt = require('prompt-sync')({ sigint: true });

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

  moveLeft() {
    this.playerX -= 1;
  }

  moveUp() {
    this.playerY -= 1;
  }

  moveDown() {
    this.playerY += 1;
  }

  // เมธอดตรวจสอบการเดินออกนอกแผนที่
  isOutOfBounds() {
    const height = this.field.length;
    const width = this.field[0].length;

    return (
      this.playerY < 0 ||
      this.playerY >= height ||
      this.playerX < 0 ||
      this.playerX >= width
    );
  }

  playGame() {
    let isPlaying = true;

    while (isPlaying) {
      // แสดงแผนที่ปัจจุบัน
      this.print();

      // รับคำสั่งทิศทาง
      const direction = prompt('Which way? (u/d/l/r): ')?.toLowerCase()?.trim();

      // เดินตามทิศทางที่เลือกตามค่าที่กำหนดก็จะมี u/d/l/rตามนี้
      switch (direction) {
        case 'u':
          this.moveUp();
          break;
        case 'd':
          this.moveDown();
          break;
        case 'l':
          this.moveLeft();
          break;
        case 'r':
          this.moveRight();
          break;
        default:
          console.log('Invalid input! Please enter u, d, l, or r.\n');
          continue;
      }
      // ตรวจสอบเงื่อนไขหลังเดินว่าตกขอบแผนที่
      if (this.isOutOfBounds()) {
        console.log('🚫 You went out of bounds! Game over.');
        isPlaying = false;
        break;
      }

      const currentTile = this.field[this.playerY][this.playerX];

      // ตรวจสอบว่าตกหลุม
      if (currentTile === HOLE) {
        console.log('💀 You fell into a hole! Game over.');
        isPlaying = false;
        break;
      }

      // ตรวจสอบว่าเจอเป้าหมายแครอท
      if (currentTile === HAT) {
        console.log('🎉 You found the hat! You win!');
        isPlaying = false;
        break;
      }

      // 4.4 เดินบนพื้นปกติ -> อัปเดตตำแหน่งใหม่เป็นรอยเดิน
      this.field[this.playerY][this.playerX] = PATH_CHAR;
      console.log('\n');
    }
  }
}

// แผนที่ทดสอบ
const sampleMap = [
  [PATH_CHAR, FIELD_CHAR, HOLE],
  [FIELD_CHAR, HOLE, FIELD_CHAR],
  [FIELD_CHAR, HAT, FIELD_CHAR],
];

const myField = new Field(sampleMap);
console.log('--- Start Game ---');
myField.playGame();
