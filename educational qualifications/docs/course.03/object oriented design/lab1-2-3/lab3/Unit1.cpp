//////////////////////////////OK////////////////////////////////////////////////
#include <vcl.h>
#pragma hdrstop
#include "Unit1.h"
#include <math.h>
////////////////////////////////////////////////////////////////////////////////
#pragma package(smart_init)
#pragma link "DynamicSkinForm"
#pragma link "SkinCtrls"
#pragma link "SkinData"
#pragma link "SkinBoxCtrls"
#pragma link "SkinTabs"
#pragma link "DynamicSkinForm"
#pragma resource "*.dfm"
TForm1 *Form1;
__fastcall TForm1::TForm1(TComponent* Owner) : TForm(Owner) {}
////////////////////////////////////////////////////////////////////////////////
////////////////////////Инициализация///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::FormCreate(TObject *Sender)
{
  Form1->Left=244;
  Form1->Top=176;
  Form1->Width=640;
  Form1->Height=333;
  Form1->spSkinData1->LoadFromCompressedFile("MacRemix.skn");
}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::FORMRES(TObject *Sender, int &NewWidth,
      int &NewHeight, bool &Resize)
{
 Memo1->Width=ceil(Form1->Width/2)-Memo1->Left-11;
 Memo3->Width=Memo1->Width;
 Memo3->Left=Memo1->Width+Memo1->Left+7;
 Form1->spSkinStdLabel3->Left=Memo3->Left;
 Memo2->Width=Form1->Width-32;
 Memo2->Height=Form1->Height-122;
 //-----------------------------------------------------------------------------
 Memo4->Width=ceil(Form1->Width/2)-Memo4->Left-11;
 Memo5->Width=Memo4->Width;
 Memo5->Left=Memo1->Width+Memo4->Left+7;
 Memo4->Height=Form1->Height-122;
 Memo5->Height=Form1->Height-122;
 //-----------------------------------------------------------------------------
 Memo1->Height=Memo1->Top+Form1->Height-180;
 Memo3->Height=Memo1->Top+Form1->Height-180;
 spSkinButton1->Top=Memo3->Top+Memo3->Height+20;
 Form1->spSkinEdit2->Top=spSkinButton1->Top;
 Form1->spSkinStdLabel2->Top=spSkinButton1->Top+4;
}
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////Класс "результат"/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
CLASSVECTORS CLVEC;  //Здесь будет результат умножения
////////////////////////////////////////////////////////////////////////////////
CLASSVECTORS::CLASSVECTORS (int i)
 {
   pole=i;
 };
////////////////////Создаем динамический массив/////////////////////////////////
void CLASSVECTORS::PROCPOLE(int i)
 {
  VECTORS = new float [i];
 };
////////////////////////////////////////////////////////////////////////////////
float CLASSVECTORS::show(int k)
 {
   return (VECTORS[k]);
 };
////////////////////////////////////////////////////////////////////////////////
void CLASSVECTORS::POLE(int k, int SUM)
 {
   VECTORS[k]=SUM;
 };
////////////////////////////////////////////////////////////////////////////////
CLASSVECTORS::~CLASSVECTORS()
 {
  try
   {
    delete[] VECTORS;
   }
  catch (...)
   {}
 }
////////////////////////////Показываем порядок вектора//////////////////////////
int CLASSVECTORS::SHOWPOLE()
 {
  return (pole);
 }
////////////////////Изменение pole//////////////////////////////////////////////
void CLASSVECTORS::POLES(int i)
 {
   pole=i;
 }
////////////////Перегружаем знак "*"////////////////////////////////////////////
float* operator *(VECTOR &M1, MATRICA &M2)
 {
     float *mas;
     mas = new float [M1.SHOWPOLE()];
     float SUM;
     for (int i=0;i<M1.SHOWPOLE();i++)
          {
           SUM=0;
           for (int j=0;j<M1.SHOWPOLE();j++)
             {
               SUM=SUM+M1.show(j)*M2.show(i,j);
             };
           mas[i]=SUM;
          };
     return (mas);
 };
////////////////////////////////////////////////////////////////////////////////
/////////////////////////Работаем с вектором////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
VECTOR VEC;   //Создали экземпляр в памяти
/////////////////////Конструктор "по умолчанию"/////////////////////////////////
VECTOR::VECTOR(int i)
 {
   pole=i;
 };
//////////////////////Конструктор копирования///////////////////////////////////
VECTOR::VECTOR(const VECTOR &V)
 {
  randomize;
  vect = new float [VEC.SHOWPOLE()];  //Выделяем память под копию объекта
  for (int i=0;i<VEC.SHOWPOLE();i++)
   {
     vect[i]=V.vect[i];
   };
 }
//////////////////////////////////Деструктор////////////////////////////////////
VECTOR::~VECTOR()
 {
  try
   {
    delete[] vect;
   }
  catch (...)
   {}
 };
/////////////////////Процедура показа вектора///////////////////////////////////
float VECTOR::show(int i)
 {
  return (ceil(vect[i]));   //Округляем
 };
////////////////////////////Показываем порядок вектора//////////////////////////
int VECTOR::SHOWPOLE()
 {
  return (pole);
 }
////////////////////Создаем динамический массив/////////////////////////////////
void VECTOR::PROCPOLE(int i)
 {
  float a,b;
  randomize;
  vect = new float [i];
  for (int ii=0;ii<i;ii++)
      {
        a=random(100);
        a=a/100;
        b=random(100)+a;
        vect[ii]=b;
      };
 };
////////////////////Изменение pole//////////////////////////////////////////////
void VECTOR::POLES(int i)
 {
   pole=i;
 }
////////////////////////////////////////////////////////////////////////////////
/////////////////////////Работаем с матрицей////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
MATRICA MATR;   //Создали экземпляр в памяти
/////////////////////Конструктор "по умолчанию"/////////////////////////////////
MATRICA::MATRICA(int i)
 {
   pole=i;
 };
///////////////////////Конструктор копирования//////////////////////////////////
MATRICA::MATRICA(const MATRICA &M)
 {
  randomize;
  float **matrs;
  matrs = new float *[MATR.SHOWPOLE()]; //matrs - указатель на массив указателей
  for (int i=0;i<MATR.SHOWPOLE();i++)
    matrs[i]= new float [MATR.SHOWPOLE()];//matrs[i] - массив вещественных чисел
  for (int i=0;i<MATR.SHOWPOLE();i++)
   for (int j=0;j<MATR.SHOWPOLE();j++)
      matrs[i][j]=M.matr[i][j];
 }
//////////////////////////////////Деструктор////////////////////////////////////
MATRICA::~MATRICA()
 {
  try {
  ///////////Очищаем "массив указателей" на "массивы вещественных чисел"////////
  for (int i=0;i<MATRICA::SHOWPOLE();i++)
    delete[] matr[i];
  ////////////////////"Очищаем указатель на массив указателей"//////////////////
  delete[] matr; }
  catch (...)
  {}
 };
/////////////////////Процедура показа матрицы///////////////////////////////////
float MATRICA::show(int i, int j)
 {
  return (ceil(matr[i][j]));   //Округляем
 };
////////////////////////////Показываем порядок матрицы//////////////////////////
int MATRICA::SHOWPOLE()
 {
  return (pole);
 }
////////////////////Создаем динамическую матрицу////////////////////////////////
void MATRICA::PROCPOLE(int i)
 {
  randomize;
  float a,b;
  //----------------------Создаем динамическую матрицу--------------------------
  matr = new float *[i];  //matr - указатель на массив указателей
  for (int ii=0;ii<i;ii++)
     matr[ii]= new float [i];   //matr[ii] - массив вещественных чисел
  //----------------------------------------------------------------------------
  int ii,jj;
  for (ii=0;ii<i;ii++)
    for (jj=0;jj<i;jj++)
      {
       a=random(100);
       a=a/100;
       b=random(100)+a;
       matr[ii][jj]=b;
      };
 };
////////////////////Изменение pole//////////////////////////////////////////////
void MATRICA::POLES(int i)
 {
  pole=i;
 }
////////////////////////////////////////////////////////////////////////////////
//////////////////////Сгенерировать вектор и матрицу////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::spSkinButton1Click(TObject *Sender)
{
 try
  {
   Form1->spSkinButton1->Enabled=false;
   ////////////////////ГЕНЕРАЦИЯ ВЕКТОРОВ///////////////////////////////////////
   randomize();
   if (spSkinEdit2->Text!="")
         {
         ///////////////////////////////////////////////////////////////////////
         if (StrToInt(spSkinEdit2->Text)>0)
           {
             VEC.POLES(StrToInt(spSkinEdit2->Text));
             VEC.PROCPOLE(VEC.SHOWPOLE());
             MATR.POLES(StrToInt(spSkinEdit2->Text));
             MATR.PROCPOLE(MATR.SHOWPOLE());
             CLVEC.POLES(StrToInt(spSkinEdit2->Text));
             CLVEC.PROCPOLE(CLVEC.SHOWPOLE());
           }
         else
           {
             ShowMessage("Число должно быть >0");
             return;
           }
         ///////////////////////////////////////////////////////////////////////
         }
   else
      {
       VEC.PROCPOLE(VEC.SHOWPOLE());  //Инициализация по умолчанию
       MATR.PROCPOLE(MATR.SHOWPOLE());
       CLVEC.PROCPOLE(CLVEC.SHOWPOLE());
      };
   /////////////////////////////////////////////////////////////////////////////
   int i=0,j=0;
   Form1->Memo1->Clear();
   for (i;i<VEC.SHOWPOLE();i++)
    {
     Form1->Memo1->Lines->Add(VEC.show(i));
     Application->ProcessMessages();
    };
   AnsiString s;
   Form1->Memo3->Clear();
   for (i=0;i<MATR.SHOWPOLE();i++)
    {
      s="";
      for (j=0;j<MATR.SHOWPOLE();j++)
       {
         s=s+MATR.show(i,j)+"  ";
         Application->ProcessMessages();
       };
      Form1->Memo3->Lines->Add(s);
    };
   /////////////////////////////////////////////////////////////////////////////
   /////////////////////////Умножение///////////////////////////////////////////
   /////////////////////////////////////////////////////////////////////////////
   CLVEC.operator =(operator *(VEC,MATR));
   Memo2->Clear();
   for (int i=0;i<VEC.SHOWPOLE();i++)
     {
       Form1->Memo2->Lines->Add(CLVEC.show(i));  //Вывод в форму
       Application->ProcessMessages();
     };
   /////////////////////////////////////////////////////////////////////////////
   ///////////////////Процедура копирования объектов////////////////////////////
   /////////////////////////////////////////////////////////////////////////////
   Memo4->Clear();
   VECTOR COPYVEC = VEC;
   for (int i=0;i<VEC.SHOWPOLE();i++)
     {
       Form1->Memo4->Lines->Add(COPYVEC.show(i));
       Application->ProcessMessages();
     };
   //---------------------------------------------------------------------------
   Memo5->Clear();
   MATRICA COPYMATR = MATR;  //Конструктор копирования
   for (int i=0;i<MATR.SHOWPOLE();i++)
    {
      s="";
      for (int j=0;j<MATR.SHOWPOLE();j++)
       {
         s=s+MATR.show(i,j)+"  ";
         Application->ProcessMessages();
       };
     Memo5->Lines->Add(s);
    };
   /////////////////////////////////////////////////////////////////////////////
   //////Теперь можно уничтожить динамические переменные в экземплярах класса///
   /////////////////////////////////////////////////////////////////////////////
   VEC.~VECTOR();
   MATR.~MATRICA();
   CLVEC.~CLASSVECTORS();
   VEC.POLES(CONSTT);    //Восстанавливаем в "классе значение по умолчанию"
   MATR.POLES(CONSTT);   //Восстанавливаем в "классе значение по умолчанию"
   CLVEC.POLES(CONSTT);  //Восстанавливаем в "классе значение по умолчанию"
   COPYVEC.~VECTOR();
   COPYMATR.~MATRICA();
   ///////////////////////////////////
   Form1->spSkinButton1->Enabled=true;
  }
 catch (...)
   {
     ShowMessage("Введите число правильно!!!");
     Form1->spSkinEdit2->Text="";
   };
}
///////////////////////////////////END//////////////////////////////////////////





