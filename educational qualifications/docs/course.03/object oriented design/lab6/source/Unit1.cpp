#pragma hdrstop
#pragma argsused
#include <stdlib.h>
#include <ostream.h>
#include <iostream.h>
#include <conio.h>
///////////////////////Класс ВЕКТОР/////////////////////////////////////////////
class CLASS_A
  {
    protected:
      int * PT;
      unsigned int SIZE;  //размер вектора
    public:
      CLASS_A ()
       {
         PT=NULL;
         SIZE=0;
       };
      int SHOWSIZE()
        {
          return SIZE;
        };
      int SHOWPT(int i)
        {
          return PT[i];
        };
      void NEWVECT()
        {
           randomize();
           PT = new int [SIZE];
           for (int j=0;j<SIZE;j++)
            {
              PT[j]=random(100);
            }
        };
      ~CLASS_A ()
       {
         if (PT!=NULL) //Если мы выделили память под вектор
           delete [] PT;
       };
       virtual bool Attention(int p)
        {
          cout << "RAZMER MASSIVA:";
          cout << p;
          cout << endl;
          SIZE=p;
          return true;
        }
       int& operator =(int i)
        {
            if (i<0 || i>=SIZE)
              {
                cout << endl;
                cout << "INDEX=ERROR!";
                getch();
                exit(0);
              };
            return PT[i];
        };
  };
////////////////////Перегрузка операций вывода//////////////////////////////////
ostream& operator << (ostream& os, CLASS_A &M)
 {
   for (int i=0;i<M.SHOWSIZE();i++)
          {
             os << M.SHOWPT(i);
             os << "   ";
             cout << endl << endl;
          };
 };
////////////////////////Класс Безопасный вектор/////////////////////////////////
class CLASS_B: public CLASS_A
  {
    public:
      CLASS_B ()  //Конструктор не наследуется
       {
         PT=NULL;
       };
      bool Attention(int p)
        {
          if (p>=0 && p<=100)
           {
            cout << "RAZMER MASSIVA:";
            cout << p;
            cout << endl;
            SIZE=p;
            return true;
           }
          else
           {
             cout << "VNIMANIE!!! PORADOK VECTORA - ERROR!!!";
             getch();
             exit(0);
           };
        }
  };
////////////////////////////////////////////////////////////////////////////////
int main(int argc, char* argv[])
{
   int a;
   cout << "BBEDITE PORADOK VECTORA:" << endl;
   cin >> a;
   cout << endl;
   /////////////////////////////////////////////////////////////////////////////
   CLASS_A CL1;
   CLASS_A *UK;  //Указатель на класс
   UK=&CL1;      //Инициализируем
   if (UK->Attention(a)==true)
    {
     CL1.NEWVECT();
     operator << (cout,CL1);
    };
   /////////////////////////////////////////////////////////////////////////////
   cout << "BBEDITE PORADOK BEZOPASNOGO VECTORA (<101):" << endl;
   cin >> a;
   cout << endl;
   CLASS_B CL2;
   UK=&CL2;  //Переопределяем адрес
   if (UK->Attention(a)==true)
    {
      CL2.NEWVECT();
      operator << (cout,CL2);
    };
   /////////Выводим элемент безопасного вектора по индексу пользователя/////////
   cout << endl;
   cout << "BBEDITE INDEX:";
   cin >> a;
   int BI=0;
   BI=UK->operator =(a-1);
   cout << endl;
   cout << "VECTOR[" << a <<"]=" << BI;
   getch();
}

