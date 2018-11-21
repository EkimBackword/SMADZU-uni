…
#include<stdlib.h>//Библиотека для работы с псевдослучайными числами
#include<math.h>//Библиотека для работы с математическими функциями
...
//Объявление глобальных переменных
int n=9;                                 //Степень двойки для расчета N
int N1 = (1 << n) + 1;  //Количество точек сигнала

                
int Depth;                         //Глубина вейвлет-разложения сигнала

double *m_array = new double[N1]; //Массив сигнала  
					 //Выделение памяти для массива точек

void Decomposition()      //Функция прямого вейвлет-преобразования
{

  	//p, q и r являются вспомогательными переменными 
	 int p = 1<<(n - 1);          //двойка в степени (n-1)
	 int q = 2;
	 int r = 1;

	for (int lev = 1; lev <= Depth; lev++)         //Цикл последовательного вейвлет-								//разложения
	{
		for (int k = 1; k <= p; k++)
		{
			int temp = (2*k - 1)*r;
			m_array[temp] = m_array[temp] - 0.5*(m_array[(k - 1)*q] + 												m_array[k*q]);
    		}

    		m_array[0] = m_array[0] + 0.5*m_array[r]; //Здесь использовано 							//зеркальное отражение сигнала от границ

    		m_array[N1 - 1] = m_array[N1 - 1] + 0.5*m_array[N1 - 1 - r];        
    		for (int k = 1; k < p; k++)
		{		
      			m_array[k*q] = m_array[k*q] + 0.25*(m_array[(2*k - 1)*r] + 
							m_array[(2*k + 1)*r]);
		}

    		p = p/2;
   		 r = q;
    		q = q*2;
  	}
} 
void Reconstruction()                                //Функция обратного вейвлет-									//преобразования
{
  //p, r и q являются вспомогательными переменными
  int p = 1<<(n - Depth);                            //двойка в степени (n-Depth)
  int r = 1<<(Depth - 1);                             //двойка в степени (Depth-1)
  int q = r<<1;                                            //двойка в степени r

  for (int lev = Depth; lev > 0; lev--)           //Цикл последовательной вейвлет-сборки
  {
    for (int k = 1; k < p; k++)
      m_array[k*q] = m_array[k*q] - 0.25*(m_array[(2*k - 1)*r] + m_array[(2*k + 1)*r]);

    m_array[0]       = m_array[0] - 0.5*m_array[r];
    m_array[N1 - 1] = m_array[N1 - 1] - 0.5*m_array[N1 - 1 - r];

    for (int k = 1; k <= p; k++)
    {
      int temp = (2*k - 1)*r;
      m_array[temp] = m_array[temp] + 0.5*(m_array[(k - 1)*q] + m_array[k*q]);
    }

    p = p*2;
    q = r;
    r = r/2;
  }
}

void Filtration(int layer_numb, double threshold)
{
  //Функция фильтрации одного уровня вейвлет-спектра с номером layer_numb
//На данном уровне зануляются все вейвлет-коэффициенты,
//модуль которых меньше значения threshold
	int k=0;
  if (layer_numb <= Depth)
  {
    int layer_size = 1<<(n - layer_numb);           //двойка в степени (n-layer_numb)

    int t = 1<<(layer_numb - 1);                          //двойка в степени (layer_numb-1)

    for (k = 0; k < layer_size; k++)
    {
      if (fabs(m_array[(2*k + 1)*t]) <= threshold)        //fabs() вычисляет модуль числа (double)
        m_array[(2*k + 1)*t] = 0;
    }
  }
  else
  {
    int layer_size = (1<<(n - Depth)) + 1;             //двойка в степени (n-Depth)

    int t = 1<<Depth;                                            //двойка в степени Depth

    if (fabs(m_array[k*t]) <= threshold)
      m_array[k*t] = 0;
  }
}
