const int N;      //Количество случайных точек
const int m;    //Количество ячеек гистограммы
double a, sigma;//Параметры нормального распределения
double a_est, sigma_est;//Оценки параметров нормального распределения
int h[m + 2];//Массив гистограммы
double x[N];    //Массив полученных случайных чисел
…
srand((unsigned)time_t(0));                    //Инициализация генератора псевдослучайных чисел

for (intk = 0; k<m + 1; k++) 
{
	h[k] = 0;  //Обнуление гистограммы
}
a_est = 0;

for (inti = 0; i<N; i++)//Основной цикл генерации N случайных чисел
{
	do
  	{
		double r = rand()/(double)RAND_MAX;//Генерация точек внутри 										//прямоугольника
		x[i] = 6*sigma*(r - 0.5) + a;
   		double y = rand()/(double)RAND_MAX;
  	}
	while (y>exp(-(x[i]-a)*(x[i]-a)/(2*sigma*sigma)));//Условиепопаданияподкривую

	a_est = a_est + x[i];
}

a_est = a_est/N;

sigma_est = 0;

for (inti = 0; i<N; i++)       //Циклрасчета sigma_est
{
	sigma_est + = (x[i] – a_est)*(x[i] – a_est);

	sigma_est = sqrt(sigma_est/N);

	double dx = 6*sigma_est/m;                  //Ширина ячейки гистограммы

	for (inti = 0; i<N; i++)                          //Цикл заполнения гистограммы
	{
        if (x[i] <a_est - 3*sigma_est) {//Если полученное число меньше левой границы
            h[0] = h[0] + 1;//прямоугольника, оно попадает в нулевую ячейку…
        } else {
            if (x[i] >a_est + 3*sigma_est) //…а если оно больше правой границы,
            {
                h[m + 1] = h[m + 1] + 1;//оно попадает в (m+1)-ю ячейку
            }
            else
            {
                intk = int((x[i] – a_est + 3*sigma_est)/dx) + 1; //Адрес ячейки, в 										//которую попало число x
                h[k] = h[k] + 1;
            }
        }
    }
}








double Pk[m + 2];                 //Массив вероятностей попадания в k-ю ячейку 						//гистограммы
double tk[m + 1];                  //Массив координат границ ячеек гистограммы

for (int k = 1; k <= m + 1; k++)
{
	tk[k] = a_est - 3*sigma_est + (k - 1)*dx;
}

double SumPk = 0;              //Сумма вероятностей попадания в m ячеек 						//гистограммы

for (int k = 1; k <= m; k++)
{
	double x_m = 0.5*(tk[k] + tk[k + 1]);         //Средняя точка, в которой 									//вычисляется функция
	Pk[k] = dx*exp(-(x_m - a_est)*(x_m - a_est)/
            (2*sigma_est *sigma_est))/(sqrt(2*3.141593)*sigma_est);
		SumPk = SumPk + Pk[k];
}
Pk[0] = Pk[m + 1] = 0.5*(1 - SumPk);

double Hi = 0;                                            //Расчет критерия хи-квадрат
for (int k = 1; k <= m; k++)
{
	double temp = h[k] - N*Pk[k];
	Hi = Hi + temp*temp/(N*Pk[k]);
}
