const N = 1000;								// Количество случайных точек
let V = 0;									// Значение вычисляемой площади (определенного интеграла)
let A = [];
let B = [];
let C = [];
let D = [];
let E = [];

for (let i = 0; i < N; i++)           		// Цикл генерации точек
{
	let x = A[i] = Math.random();
	let y = B[i] = Math.random();
	let z = C[i] = Math.random();

	if (x*x + y*y < 1 && x > 0 && y > 0) {
		D[i] = Math.sqrt(1 - A[i]*A[i] - B[i]*B[i]);
		if (C[i] >= D[i]) {
			E[i] = 0;
		} else {
			E[i] = 1;
		}
	}

	if (x*x + y*y + z*z < 1) {
		V = V + 1;         					// Проверка условия попадания под поверхность сферы
	}
}
let SumE = E.reduce((i, j) => j ? j+i : i, 0); 
let V_c = SumE/N;
let custom_Pi_est = 6*V_c;
let custom_epsilon = 2.6*Math.sqrt(V_c*(1 - V_c)/N);	//Расчет погрешности

V = V/N;
let Pi_est = 6*V;
let epsilon = 2.6*Math.sqrt(V*(1 - V)/N);	//Расчет погрешности


console.log("");
console.log("custom_Pi_est = ", custom_Pi_est);
console.log("custom_epsilon = ", custom_epsilon);
console.log("");
console.log("Pi_est", Pi_est);
console.log("epsilon", epsilon);
console.log("");

// console.log(JSON.stringify({ A, B, C, D, E}));
