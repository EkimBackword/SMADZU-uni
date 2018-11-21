const int N;      //Количество случайных точек
...
double V = 0;//Значение вычисляемой площади (определенного интеграла)

srand((unsigned)time_t(0));       //Инициализация генератора псевдослучайных чисел

for (int i = 0; i < N; i++)           //Цикл генерации точек
{
	double x = rand()/(double)RAND_MAX;
	double y = rand()/(double)RAND_MAX;
	double z = rand()/(double)RAND_MAX;

	if (x*x + y*y + z*z < 1) 
	{
		V = V + 1;         //Проверка условия попадания под поверхность сферы
	}
}

V = V/N;

double Pi_est = 6*V;

double epsilon = 2.6*sqrt(V*(1 - V)/N);                 //Расчет погрешности
