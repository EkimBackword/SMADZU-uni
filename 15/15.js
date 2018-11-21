…
#include<stdlib.h>//Библиотека для работы с псевдослучайными числами
#include<math.h>//Библиотека для работы с математическими функциями
#include<iostream>//Библиотека, необходимая для вывода информации на экран
using namespace std;
...
double lambda;               //Интенсивность поступления требований
double t_serv;//Среднее время обслуживания одной заявки
const int n;       //Количество каналов обслуживания 
const int m;     //Количество мест в очереди
double p[n + m + 1];//Массив вероятностей
...
double alpha = lambda*t_serv;//Коэффициент загрузки

double temp1 = 0;//Первая временная переменная, необходимая для расчета p[0]
for (int k = 1; k <= n; k++)
		temp1 = temp1 + exp(k*log(alpha)) / Factorial(k);

	double temp2 = 0;               //Вторая временная переменная, необходимая для расчета p[0]
	for (int s = 1; s <= m; s++)
		temp2 = temp2 + exp(s*log(alpha / n));

	p[0] = 1 / (1 + temp1 + temp2*exp(n*log(alpha)) / Factorial(n)); //Вероятность простоя СМО

	for (int k = 1; k <= n; k++)
		p[k] = p[0] * exp(k*log(alpha)) / Factorial(k);

	for (int s = 1; s <= m; s++)
		p[n + s] = p[0] * exp(n*log(alpha))*exp(s*log(alpha / n)) / Factorial(n);

	double N_buzy = 0;                               //Среднее число каналов, занятых обслуживанием
	for (int k = 1; k <= n; k++)
		N_buzy = N_buzy + k*p[k];
	for (int s = 1; s <= m; s++)
		N_buzy = N_buzy + n*p[n + s];

	double N_vac = n - N_buzy;                //Среднее число свободных каналов

	double N_req = 0;                                //Среднее число заявок в очереди
	for (int s = 1; s <= m; s++)
		N_req = N_req + s*p[n + s];

	double T_line = N_req*t_serv;             //Среднее время ожидания заявки в очереди
	double T_sys = T_line + t_serv;          //Среднее время обслуживания заявки в СМО

	double Q = 1 - p[n + m];                      //Относительная пропускная способность СМО
	double A = lambda*Q;                         //Абсолютная пропускная способность СМО
…
Используемая здесь функция Factorial() имеет следующую реализацию:

int Factorial(int number)    //Рекуррентная функция расчета факториала числа number
{
	if (number < 0) //Ошибка. Факториал может быть только у неотрицательного 				//числа 
	{
		cout << "Factorial: given number is negative!" << endl;   //Вывод 											//сообщения на экран
		exit(0); //Аварийное завершение программы
	}

	if (number < 2)
		return 1; //Факториалы нуля и единицы по определению равны 						//единице
	else
		return number*Factorial(number - 1); //Рекуррентный вызов функции
	//с уменьшенным на единицу аргументом
}
