# Thinking Process Find Your Hat 🐰

บันทึกขั้นตอนการคิดและพัฒนาเกม Find Your Hat  ผ่าน Terminal ด้วย Node.js

## เป้าหมายของโปรเจกต์
เกมที่ผู้เล่นควบคุมกระต่ายเดินหาแครอท โดยห้ามตกหลุมและห้ามเดินออกนอกแผนที่ ตาม Rubric ที่กำหนดให้มี constructor, methods การเดิน 4 ทิศทาง, การแสดงแผนที่, เงื่อนไขแพ้-ชนะ และการสุ่มตำแหน่งต่าง ๆ

## สัญลักษณ์ในเกม
🐰 ตัวละครผู้เล่น
เป้าหมาย (แครอท) 
หลุม (แพ้) 
🌱  พื้นที่เดินได้ 

## ลำดับการพัฒนา
1. ติดตั้ง `prompt-sync` เพื่อรับ input (ใช้ `require()` เพราะโปรเจกต์เป็น CommonJS)
2. สร้าง `Field` class + constructor รับ `field`, `playerX`, `playerY`
3. สร้างแผนที่จำลอง (sample map) ก่อน เพื่อแยกปัญหาการแสดงผล/การเดิน ออกจากปัญหาการสุ่ม
4. เขียน `print()` ด้วย `.map().join('')` และ `.join('\n')`
5. เขียน 4 methods เดิน: `moveUp/moveDown/moveLeft/moveRight` (ปรับ `playerX`/`playerY`)
6. รับคำสั่งผู้เล่น (w/a/s/d/q) ด้วย `prompt()` + `switch` เลือกทิศทาง
7. สร้าง Game Loop ด้วย `while (isPlaying)`
8. เขียน `isOutOfBounds()` ตรวจขอบเขตก่อนอ่านค่าช่อง (ป้องกัน error)
9. ตรวจ `currentTile`: HOLE → แพ้, HAT → ชนะ, ปกติ → อัปเดตตำแหน่ง
10. ลบรอยตำแหน่งเดิม โดยเก็บ `previousX/Y` แล้วเซ็ตกลับเป็น `FIELD_CHAR`
11. สร้าง Random Map (`generateField`):
    - `getRandomPosition()` (static) สุ่มพิกัดด้วย `Math.random()` + `Math.floor()`
    - สุ่มตัวละครก่อน
    - สุ่มเป้าหมายด้วย `do...while` จนกว่าจะเจอช่องว่าง (`FIELD_CHAR`)
    - สุ่มหลุมด้วย `while` ตามจำนวนที่คำนวณจาก `height * width * holePercentage`
    - คืนค่า `{ field, playerX, playerY }` กลับไปสร้าง instance
## แนวคิดที่ใช้ตัดสินใจ
- **Class**: รวมข้อมูล + พฤติกรรมของเกมไว้ที่เดียว
- **แยก methods เดิน**: ตรงตาม Rubric และทดสอบง่ายกว่า
- **switch**: อ่านง่ายกว่า if-else เมื่อค่ามีชัดเจนหลายค่า
- **while loop**: ไม่รู้จำนวนรอบล่วงหน้า
- **ไม่ใช้** Inheritance/Promise/fetch: ไม่จำเป็นกับเกมนี้ (ตามแนวคิด KISS/YAGNI)
