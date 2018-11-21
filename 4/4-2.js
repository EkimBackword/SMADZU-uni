const int N;    //Количество случайных точек
const int m;     //Количество ячеек гистограммы
double sigma; //Параметр распределения Рэлея
double sigma_est;//Оценка параметра распределения Рэлея
int h[m + 1];    //Массив гистограммы
double x[N];    //Массив полученных случайных чисел
…
srand((unsigned)time_t(0));                 //Инициализация генератора псевдослучайных чисел

for (int k = 0; k <= m; k++) 
{
	h[k] = 0;   //Обнуление гистограммы
}

double dx = 10.0/m;                          //Ширина ячейки гистограммы

double SumX2 = 0;                           //Сумма квадратов случайных чисел

for (int i = 1; i < N; i++)                      //Основной цикл генерации N случайных чисел
{
	double r = rand()/(double)RAND_MAX;
	x[i] = sigma*sqrt(-2*log(r));

	SumX2 = SumX2 + x[i]*x[i];

	if (x[i] > 10)
	{
		h[m] = h[m] + 1;          //Все числа, большие 10, попадают в m-ю ячейку
	}
	else
	{
		int k = int((x[i])/dx);                      //Адрес ячейки гистограммы, в которую 							//попало число x
		h[k] = h[k] + 1;
	}
}

sigma_est = sqrt(0.5*SumX2/N);

double tk[m + 1];                             //Массив координат ячеек гистограммы

for (int k = 0; k <= m; k++)
{
	tk[k] = k*dx;
}

for (int k = 0; k < m; k++)
{
	Pk[k] = exp(-0.5*tk[k]*tk[k]/sigma_est*sigma_est) -                    			
            exp(-0.5*tk[k + 1]*tk[k + 1]/sigma_est*sigma_est);         //Расчет вероятностей  					//попадания в k-ю ячейку гистограммы
}
Pk[m] = exp(-0.5*tk[m]*tk[m]/sigma_est*sigma_est);                  

double Hi = 0;                                                                    //Расчет критерия хи-квадрат
for (int k = 0; k < m; k++)
{
	double temp = h[k] - N*Pk[k];
	Hi = Hi + temp*temp/(N*Pk[k]);
}
