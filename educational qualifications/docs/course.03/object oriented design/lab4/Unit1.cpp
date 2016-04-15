#pragma hdrstop
#pragma argsused
#include <math.h>
#include <conio.h>
#include <iostream.h>
////////////////////////////////////////////////////////////////////////////////
class CLASS_CHET
 {
   protected:
     float x1,y1,x2,y2,x3,y3,x4,y4;
   public:
     CLASS_CHET (float i1, float j1, float i2, float j2, float i3, float j3, float i4, float j4)
       {
         x1=i1;
         y1=j1;
         x2=i2;
         y2=j2;
         x3=i3;
         y3=j3;
         x4=i4;
         y4=j4;
       };
     virtual bool TOTAL_PROVERKA() //Проверка в производных класса на правильность фигуры
      {
        cout << endl;
        cout << "USER VVEL CHETIREHUGOLNIC!";
        cout << endl;
        return true; //В четырехугольнике проверять нечего
      };
     float PLOSHAD()
       {
          float S1,S2,p1,p2,a1,b1,c1,a2,b2;
          a1=sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
          a2=sqrt((x3-x2)*(x3-x2)+(y3-y2)*(y3-y2));
          b1=sqrt((x4-x1)*(x4-x1)+(y4-y1)*(y4-y1));
          b2=sqrt((x4-x3)*(x4-x3)+(y4-y3)*(y4-y3));
          c1=sqrt((x4-x2)*(x4-x2)+(y4-y2)*(y4-y2));
          p1=(a1+b1+c1)/2;
          p2=(a2+b2+c1)/2;
          S1=sqrt(p1*(p1-a1)*(p1-b1)*(p1-c1));
          S2=sqrt(p2*(p2-a2)*(p2-b2)*(p2-c1));
          return (S1+S2);
       };
     float PERIMETR()
       {
          float P,a1,b1,a2,b2;
          a1=sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
          a2=sqrt((x3-x2)*(x3-x2)+(y3-y2)*(y3-y2));
          b1=sqrt((x4-x1)*(x4-x1)+(y4-y1)*(y4-y1));
          b2=sqrt((x4-x3)*(x4-x3)+(y4-y3)*(y4-y3));
          P=a1+b1+a2+b2;
          return P;
       };
 };
////////////////////////////////////////////////////////////////////////////////
class CLASS_PR: public CLASS_CHET
  {
    //Прямоугольник на плоскости, е если:
    // 1. Внутренние отрезки равны
    protected:
     bool PROVERKA_1() //Проверка в производных класса на правильность фигуры
        {
         float s1 = sqrt((x3-x1)*(x3-x1)+(y3-y1)*(y3-y1));
         float s2 = sqrt((x4-x2)*(x4-x2)+(y4-y2)*(y4-y2));
         if (s1==s2)
           return true;
         else
           return false;
        };
    public:
      CLASS_PR (float i1, float j1, float i2, float j2, float i3, float j3, float i4, float j4)
        : CLASS_CHET (i1,j1,i2,j2,i3,j3,i4,j4)
       {
         x1=i1;
         y1=j1;
         x2=i2;
         y2=j2;
         x3=i3;
         y3=j3;
         x4=i4;
         y4=j4;
       };
     bool TOTAL_PROVERKA() //Проверка 1 условия на правильность фигуры
      {
        if (PROVERKA_1())
         {
          cout << endl;
          cout << "USER VVEL PRAMOUGOLNIK!";
          cout << endl;
          return true;
         }
        else
          {
            return false;
          };
      };
  };
////////////////////////////////////////////////////////////////////////////////
class CLASS_KV: public CLASS_PR
  {
    //Квадрат на плоскости, е если:
    // 1. Все стороны равны
    // 2. Внутренние отрезки равны
    protected:
      bool PROVERKA_2() //Проверка в производных класса на правильность фигуры
        {
         float s1 = sqrt((x3-x2)*(x3-x2)+(y3-y2)*(y3-y2));
         float s2 = sqrt((x4-x3)*(x4-x3)+(y4-y3)*(y4-y3));
         float s3 = sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
         float s4 = sqrt((x1-x4)*(x1-x4)+(y1-y4)*(y1-y4));
         if (s1==s2 && s2==s3 && s3==s4 && s1==s4)
                return true;
         else
           return false;
        };
    public:
     CLASS_KV (float i1, float j1, float i2, float j2, float i3, float j3, float i4, float j4)
        : CLASS_PR (i1,j1,i2,j2,i3,j3,i4,j4)
       {
         x1=i1;
         y1=j1;
         x2=i2;
         y2=j2;
         x3=i3;
         y3=j3;
         x4=i4;
         y4=j4;
       };
     bool TOTAL_PROVERKA() //Проверка 1 условия на правильность фигуры
      {
        if (PROVERKA_1() && PROVERKA_2())
         {
          cout << endl;
          cout << "USER VVEL KVADRAT!";
          cout << endl;
          return true;
         }
        else
          {
            return false;
          };
      };
  };
////////////////////////////////////////////////////////////////////////////////
int main(int argc, char* argv[])
{
   float x1,y1,x2,y2,x3,y3,x4,y4;
   cout << "BBEDITE KOORDINATI CHETIREHUGOLNIKA:" ;
   cout << endl;
   cout << "x1:";
   cout << endl;
   cin >> x1;
   cout << endl;
   cout << "y1:";
   cout << endl;
   cin >> y1;
   cout << endl;
   cout << "x2:";
   cout << endl;
   cin >> x2;
   cout << endl;
   cout << "y2:";
   cout << endl;
   cin >> y2;
   cout << endl;
   cout << "x3:";
   cout << endl;
   cin >> x3;
   cout << endl;
   cout << "y3:";
   cout << endl;
   cin >> y3;
   cout << endl;
   cout << "x4:";
   cout << endl;
   cin >> x4;
   cout << endl;
   cout << "y4:";
   cout << endl;
   cin >> y4;
   /////////////////////////////////////////////////////////////////////////////
   CLASS_KV CL1(x1,y1,x2,y2,x3,y3,x4,y4);
   CLASS_PR CL2(x1,y1,x2,y2,x3,y3,x4,y4);
   CLASS_CHET CL3(x1,y1,x2,y2,x3,y3,x4,y4);
   CLASS_CHET * UK;  //Указатель на базовый класс
   UK=&CL1;
   if (UK->TOTAL_PROVERKA())
    {
       ///////////////////////Квадрат///////////////////////////////////////////
       cout << "PLOSHAD: " << UK->PLOSHAD();
       cout << endl;
       cout << "PERIMETR: " << UK->PERIMETR();
    }
   else
    {
      UK=&CL2;
      if (UK->TOTAL_PROVERKA())
        {
            ///////////////////////////Прямоугольник////////////////////////////
            cout << "PLOSHAD: " << UK->PLOSHAD();
            cout << endl;
            cout << "PERIMETR: " << UK->PERIMETR();
        }
      else
        {
            ///////////////////////////Четырехугольник//////////////////////////
            UK=&CL3;
            if (UK->TOTAL_PROVERKA()) //Здесь всегда TRUE - только покажем что это за фигура
             {
              cout << "PLOSHAD: " << UK->PLOSHAD();
              cout << endl;
              cout << "PERIMETR: " << UK->PERIMETR();
             }
        };
    }
   getch();
   return 0;
}

