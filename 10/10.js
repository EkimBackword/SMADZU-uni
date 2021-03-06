const fs = require("fs");

let N = 1000;                                     // Размер обучающей выборки
let a = 10;                                      // Сторона внешнего квадрата
let r = 4;                                       // Радиус внутреннего круга
let x1 = 5, y1 = 5;                              // Центр круга

// fs.writeFileSync("10.txt", "in out res\r\n"); // Запись в файл строки со структурой обучающих примеров
// for (let i = 0; i < N; i++)                   // Цикл генерации точек и записи в файл обучающих примеров
// {
//   let x = a * ( Math.random() );
//   let y = a * ( Math.random() );

//   let res = 0;                                // Флаг попадания точки во внешнюю область

//   if ( (x-x1)*(x-x1) + (y-y1)*(y-y1) < r*r) {
//     res = 1;                                  // Флаг попадания точки во внутреннюю область
//   }

//   fs.appendFileSync("10.txt", `${x} ${y} ${res}\r\n`); // Запись в файл строки с обучающим примером
// }


fs.writeFileSync("10-test.txt", "in out\r\n"); // Запись в файл строки со структурой обучающих примеров
let sigma = 2.125;                                // соответствует разбросу относительно среднего (стандартному отклонению)
for (let i = 0; i < 10; i++)                     // Цикл генерации точек и записи в файл обучающих примеров
{
    let x = 0;
    let y = 0;
    for (let j = 1; j <= 12; j++)               //	Вычисление суммы 12 случайных чисел
    {
        x = x + Math.random();
        y = y + Math.random();
    }
    x = (x - 6) * sigma + a/2;
    y = (y - 6) * sigma + a/2;
    fs.appendFileSync("10-test.txt", `${x} ${y}\r\n`);
}