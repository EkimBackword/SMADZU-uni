int N;//Размер обучающей выборки
double a;//Сторона внешнего квадрата
double r; //Радиус внутреннего круга
using namespace std;
...
ofstream ofs("circle_in_square.txt");//Открытиефайладлязаписи

ofs<<"in out res"<<std::endl;          //Запись в файл строки со структурой обучающих 					//примеров

srand((unsigned)time_t(0));        //Инициализация генератора псевдослучайных 						//чисел

for (int i = 0; i < N; i++)            //Цикл генерации точек и записи в файл обучающих 						//примеров
{
  double x = a*(rand()/(double)RAND_MAX - 1);
  double y = a*(rand()/(double)RAND_MAX - 1);

  double res = 0;                      //Флаг попадания точки во внешнюю область

  if (x*x + y*y < r*r)
	res = 1;                                //Флаг попадания точки во внутреннюю область

  ofs<<x<<" "<<y<<" "<<res<<std::endl;  //Запись в файл строки с обучающим 							//примером
}

ofs.close();                              //Закрытие файла