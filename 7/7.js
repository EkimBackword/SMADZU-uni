constintN;    //Количество случайных точек
double A0, B0, A, B;//Параметры смоделированной и подогнанной прямых линий
double x[N], y[N];//Массивы координат точек
double sigma_noise;//Параметр уровня нормального шума
...
srand((unsigned)time_t(0));   //Инициализация генератора псевдослучайных чисел

for (int i = 0; i < N; i++)            //Цикл генерации точек измерений
{
	double error = 0;                   //Моделирование ошибки измерения на 							//основании ЦПТ
	for (int j = 0; j < 12; j++)
	{
		error = error + rand()/(double)RAND_MAX;
	}
	error = (error - 6)*sigma_noise;

	x[i] = i;
	y[i] = A0*x[i] + B0 + error;
}

double sx, sy, sxx, syy, sxy;
sx = sy = sxx = syy = sxy = 0;

for (int i = 0; i < N; i++) //Расчет сумм, необходимых для оценки параметров прямой
{
	sx  = sx  + x[i];
	sy  = sx  + y[i];
	sxx = sxx + x[i]*x[i];
	syy = syy + y[i]*y[i];
	sxy = sxy + x[i]*y[i];
}

double q = N*sxx - sx*sx;                                 //Знаменатель

if (q == 0)                                                           //Если знаменатель равен нулю…
{
	std::cout<<"Error: q = 0. Line is vertical!"<<std::endl;   //выводится сообщение 										//об ошибке,
	exit(0);                                                             //и программа завершается
}
else
{
	A = (N*sxy - sx*sy)/q;
	B = (sy*sxx - sx*sxy)/q;
}

double F_min = (N*syy - sy*sy - q*A*A)/N;      //Минимальное значение функционала 									//МНК

double sigma = sqrt(F_min/(N - 2));                 //Среднеквадратичная ошибка 									//приближения

double sigma_A = sigma*sqrt(N/q);                 //Погрешность расчета A
double sigma_B = sigma*sqrt(sxx/q);              //Погрешность расчета B
