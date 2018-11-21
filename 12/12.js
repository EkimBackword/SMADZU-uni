…
#include<stdlib.h>//Библиотека для работы с псевдослучайными числами
#include<math.h>//Библиотека для работы с математическими функциями
...
const int N;     //Количество точек сигнала
double x[N], y[N];      //Массивы координатточек сигнала

double H1, H2;//Значения амплитуд двух синусоид
double lambda1, lambda2;//Значения частот двух синусоид
double e;//Уровень шума
using namespace std;
...
double dx = 2*3.141593/(N - 1);//Величина шага изменения координаты x

srand((unsigned)time_t(0));                 //Инициализация генератора псевдослучайных чисел

for (int i = 0; i < int(N/3.0); i++)         //Моделирование первой части сигнала
{
	x[i] = i*dx;
	y[i] = H1*sin(lambda1*x[i]) + e*(rand()/(double)RAND_MAX - 0.5);
}

for (int i = int(N/3.0); i < int(2*N/3.0); i++)     //Моделирование второй части сигнала
{
	x[i] = i*dx;
	y[i] = H1*sin(lambda1*x[i]) + H2*sin(lambda2*x[i]) +
		e*(rand()/(double)RAND_MAX -0.5);
}

for (int i = int(2*N/3.0); i < N; i++)                //Моделирование третьей части сигнала
{
	x[i] = i*dx;
	y[i] = H1*sin(lambda1*x[i]) + e*(rand()/(double)RAND_MAX - 0.5);
}
	ofstream ofs("d_a.dat");                               //Открытие файла для записи

for (int i = 0; i < N; i++)
{
	ofs<<y[i]<<std::endl;                   //Сохранение в файл y-координат сигнала
}

ofs.close();                                                   //Закрытие файла
