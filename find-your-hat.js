const prompt = require('prompt-sync')({ sigint: true });
const HAT = '🥕';
const HOLE = '🕳️';
const FIELD_CHAR = '🌱';
const PATH_CHAR = '🐰';
class Field {
  constructor(field = [[]], playerX = 0, playerY = 0) {
    // เก็บแผนที่และตำแหน่งเริ่มต้น
    this.field = field;
    this.playerX = playerX;
    this.playerY = playerY;
  }
  // แสดงแผนที่ใน Terminal
  print() {
    const display = this.field
      .map((row) => row.join(''))
      .join('\n');

    console.log(display);
  }
  // Methods สำหรับเดิน 4 ทิศทางของน้องกระตุ่น
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

  // ตรวจสอบว่าผู้เล่นเดินออกนอกแผนที่
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

  // เริ่มต้นการเล่นเกม
  playGame() {
    let isPlaying = true;

    while (isPlaying) {
      this.print();

      const direction = prompt(
        'Move (w/a/s/d, q to quit): '
      )
        .toLowerCase()
        .trim();

      // กด q เพื่อออกจากเกม
      if (direction === 'q') {
        console.log('Game quit. Bye!');
        break;
      }

      // จำตำแหน่งเดิมไว้ก่อนเดิน
      const previousX = this.playerX;
      const previousY = this.playerY;

      // เลือกทิศทางการเดินของน้องกระต่าย
      switch (direction) {
        case 'w':
          this.moveUp();
          break;

        case 's':
          this.moveDown();
          break;

        case 'a':
          this.moveLeft();
          break;

        case 'd':
          this.moveRight();
          break;

        default:
          console.log(
            'Invalid input! Please enter w, a, s, d, or q to quit.\n'
          );
          continue;
      }

      // ตรวจสอบการเดินออกนอกแผนที่
      if (this.isOutOfBounds()) {
        console.log(
          '🚫 You went out of bounds! Game over.'
        );
        isPlaying = false;
        break;
      }

      // อ่านข้อมูลช่องที่ผู้เล่นเดินไป
      const currentTile =
        this.field[this.playerY][this.playerX];

      // ตรวจสอบการตกหลุมของน้องกระต่าย
      if (currentTile === HOLE) {
        console.log(
          '💀 You fell into a hole! Game over.'
        );
        isPlaying = false;
        break;
      }

      // ตรวจสอบการเจอแครอท
      if (currentTile === HAT) {
        console.log(
          '🎉 You found the hat! You win!'
        );
        isPlaying = false;
        break;
      }

      // ลบตัวละครออกจากตำแหน่งเดิม
      this.field[previousY][previousX] =
        FIELD_CHAR;

      // เพิ่มตัวละครลงในตำแหน่งใหม่
      this.field[this.playerY][this.playerX] =
        PATH_CHAR;

      console.log('');
    }
  }

  // สุ่มตำแหน่งแกน X และแกน Y
  static getRandomPosition(height, width) {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  }

  // สร้างแผนที่แบบสุ่มเพื่อให้เกมสนุกขึ้น
  static generateField(
    height = 10,
    width = 10,
    holePercentage = 0.2
  ) {
    const field = [];

    // สร้างแผนที่ที่มีแต่พื้นที่ปกติก่อน
    for (let row = 0; row < height; row++) {
      const currentRow = [];

      for (let col = 0; col < width; col++) {
        currentRow.push(FIELD_CHAR);
      }

      field.push(currentRow);
    }

    // สุ่มตำแหน่งเริ่มต้นของน้องกระต่าย
    const playerPosition =
      Field.getRandomPosition(height, width);

    field[playerPosition.y][playerPosition.x] =
      PATH_CHAR;

    // สุ่มตำแหน่งแครอทโดยไม่ให้ทับกับตัวละคร
    let hatPosition;

    do {
      hatPosition =
        Field.getRandomPosition(height, width);
    } while (
      field[hatPosition.y][hatPosition.x] !==
      FIELD_CHAR
    );

    field[hatPosition.y][hatPosition.x] = HAT;

    // คำนวณจำนวนหลุมจากเปอร์เซ็นต์ที่กำหนด
    const totalHoles = Math.floor(
      height * width * holePercentage
    );

    let holesCreated = 0;

    // สุ่มตำแหน่งของหลุม
    while (holesCreated < totalHoles) {
      const holePosition =
        Field.getRandomPosition(height, width);

      // วางหลุมเฉพาะช่องที่ยังเป็นพื้นที่ปกติ
      if (
        field[holePosition.y][holePosition.x] ===
        FIELD_CHAR
      ) {
        field[holePosition.y][holePosition.x] =
          HOLE;

        holesCreated += 1;
      }
    }
    // ส่งแผนที่และตำแหน่งผู้เล่นกลับออกไป
    return {
      field: field,
      playerX: playerPosition.x,
      playerY: playerPosition.y,
    };
  }
}
const randomMapData =
  Field.generateField(5, 5, 0.2);

// สร้างเกมจากข้อมูลแผนที่แบบสุ่ม
const myField = new Field(
  randomMapData.field,
  randomMapData.playerX,
  randomMapData.playerY
);

console.log('--- Start Game ---');
myField.playGame();