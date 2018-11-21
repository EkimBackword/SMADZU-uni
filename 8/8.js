constintN;   //Количество случайных точек
double A0, B0, A, B; //Параметры смоделированной и подогнанной прямых линий
double x[N], y[N];//Массивы координат точек
double sigma_noise;//Параметр уровня нормального шума
double w[N];              //Массив робастных весов
double d[N];            //Массив расстояний от точек до подгоняемой прямой
...
srand((unsigned)time_t(0));       //Инициализация генератора псевдослучайных чисел

for (int i = 0; i < N; i++)            //Цикл генерации точек измерений
{
	double error = 0;                   //Моделирование ошибки измерения на 								//основании ЦПТ
	for (int j = 0; j < 12; j++)
	error = error + rand()/(double)RAND_MAX;
	error = (error - 6)*sigma_noise;

	x[i] = i;
	y[i] = A0*x[i] + B0 + error;
}

double r = 6*(rand()/(double)RAND_MAX - 0.5);
A = A0 + r;                                       //Начальное приближение параметра A
r = 4*(rand()/(double)RAND_MAX - 0.5);
B = B0 + r;                                       //Начальное приближение параметра B

for (int i = 0; i < N; i++)
{
	w[i] = 1;                                         //Начальные веса равны единице
}

double sw = N;                               //Начальная сумма всех весов
const double C = 5;                        //Константа весовой функции Тьюки
double S = 100000;

for (int k = 0; S > 0.0001; k++)       //Цикл итерационного перерасчета параметров 						//прямой
{
	if (k > 100) break;             //Если количество итераций очень большое, цикл 						//прекращается
	double a = A, b = B;         //Временные переменные для хранения параметров 					//прямой

	double swd, sx, sy, sxy, sxx;
	swd = sx = sy = sxy = sxx = 0;

	for (int i = 0; i < N; i++)
	{
	d[i] = y[i] - a*x[i] - b;        //Расчет расстояний от точек до подгоняемой линии
	swd += w[i]*d[i]*d[i];
	}

	double Sigma = C*sqrt(swd/sw);  //Расчет параметра весовой функции Тьюки

	for (int i = 0; i < N; i++)                 //Цикл пересчета весов для точек
	{
		if (fabs(d[i]) > Sigma)
		{
			w[i] = 0;
		}
		else
		{
			double temp = d[i]/Sigma;
			temp = 1 - temp*temp;
			w[i] = temp*temp;
		}
	}
	sw = 0;

	for (int i = 0; i < N; i++)
	{
		sw  += w[i];
		sx  += w[i]*x[i];
		sxx += w[i]*x[i]*x[i];
		sy  += w[i]*y[i];
		sxy += w[i]*x[i]*y[i];
	}

	double q = sw*sxx - sx*sx;                                  //Знаменатель

	if (q == 0)                                                //Если знаменатель равен нулю…
	{
		std::cout<<"Error: q = 0. Line is vertical!"<<std::endl;     //…выводится 										//сообщение об ошибке,
		exit(0);                                                      //и программа завершается
	}
	else
	{
		A = (sw*sxy - sx*sy)/q;
		B = (sy*sxx - sx*sxy)/q;
	}

	S = (A - a)*(A - a) + (B - b)*(B - b);  //Расчет условия сходимости параметров
}
