//------------------------------------------------------------------------------
#include <vcl.h>
#pragma hdrstop
#include "Unit1.h"
//------------------------------------------------------------------------------
#pragma package(smart_init)
#pragma link "DynamicSkinForm"
#pragma link "SkinData"
#pragma link "SkinBoxCtrls"
#pragma link "SkinCtrls"
#pragma resource "*.dfm"
//------------------------------------------------------------------------------
TForm1 *Form1;
__fastcall TForm1::TForm1(TComponent* Owner) : TForm(Owner) {}
//-------------------------Когда изменяем размеры формы-------------------------
void __fastcall TForm1::FORMSS(TObject *Sender, int &NewWidth,
      int &NewHeight, bool &Resize)
{
  Form1->spSkinGroupBox1->Width=Form1->Width-26;
  Form1->spSkinGroupBox1->Height=Form1->Height-107;
  Form1->spSkinEdit1->Width=Form1->Width-202;
  Form1->spSkinEdit2->Width=Form1->Width-202;
  Form1->spSkinEdit3->Width=Form1->Width-290;
  Form1->spSkinEdit4->Width=Form1->Width-290;
  Form1->spSkinEdit5->Width=Form1->Width-290;
}
//------------------------------Инициализация-----------------------------------
void __fastcall TForm1::FormCreate(TObject *Sender)
{
  Form1->Width=459;
  Form1->Height=239;
  Form1->Top=176;
  Form1->Left=294;
  Form1->spSkinData1->LoadFromCompressedFile("MacRemix.skn");
}
//----------------------------Первая функция (int)------------------------------
float TForm1::FUNC1(int x, int y)
{
 try
 {
  Form1->CO1.z._M_re=x;
  Form1->CO1.z._M_im=y;
  return(arg(Form1->CO1.z));
 }
 catch (...)
 {};
}
float TForm1::FUNC2(int x, int y)
{
 try
 {
  Form1->CO1.z._M_re=x;
  Form1->CO1.z._M_im=y;
  return(abs(Form1->CO1.z));
 }
 catch (...)
 {};
}
float TForm1::FUNC3(int x, int y)
{
 try
  {
   Form1->CO1.z._M_re=x;
   Form1->CO1.z._M_im=y;
   if (Form1->CO1.z._M_re > Form1->CO1.z._M_im) return(Form1->CO1.z._M_re);
   if (Form1->CO1.z._M_re < Form1->CO1.z._M_im) return(Form1->CO1.z._M_im);
   else return(0);
  }
 catch (...)
 {};
}
//----------------------------Вторая функция (double)---------------------------
double TForm1::FUNC1(double x, double y)
{
 Form1->CO1.z._M_re=x;
 Form1->CO1.z._M_im=y;
 return(arg(Form1->CO1.z));
}
double TForm1::FUNC2(double x, double y)
{
 Form1->CO1.z._M_re=x;
 Form1->CO1.z._M_im=y;
 return(abs(Form1->CO1.z));
}
double TForm1::FUNC3(double x, double y)
{
 Form1->CO1.z._M_re=x;
 Form1->CO1.z._M_im=y;
 if (Form1->CO1.z._M_re > Form1->CO1.z._M_im) return(Form1->CO1.z._M_re);
 if (Form1->CO1.z._M_re < Form1->CO1.z._M_im) return(Form1->CO1.z._M_im);
 else return(0);
}
//---------------------------Третья функция (complex)---------------------------
double TForm1::FUNC1(complex <float> t)
{
 Form1->CO1.z._M_re=t._M_re;
 Form1->CO1.z._M_im=t._M_im;
 return(arg(Form1->CO1.z));
}
double TForm1::FUNC2(complex <float> t)
{
 Form1->CO1.z._M_re=t._M_re;
 Form1->CO1.z._M_im=t._M_im;
 return(abs(Form1->CO1.z));
}
double TForm1::FUNC3(complex <float> t)
{
 Form1->CO1.z._M_re=t._M_re;
 Form1->CO1.z._M_im=t._M_im;
 if (Form1->CO1.z._M_re > Form1->CO1.z._M_im) return(Form1->CO1.z._M_re);
 if (Form1->CO1.z._M_re < Form1->CO1.z._M_im) return(Form1->CO1.z._M_im);
 else return(0);
}
//------------------------------------------------------------------------------
//---------------------------Обработчики событий--------------------------------
//------------------------------------------------------------------------------
void __fastcall TForm1::spSkinButton1Click(TObject *Sender)
{
 try
 {
  int a,b;
  a=StrToInt(spSkinEdit1->Text);
  b=StrToInt(spSkinEdit2->Text);
  if (a!=0 || b!=0)
  {
    spSkinEdit3->Text=VarToStr(Form1->FUNC1(a,b));
    spSkinEdit4->Text=VarToStr(Form1->FUNC2(a,b));
    if (Form1->FUNC3(a,b)!=0)
      spSkinEdit5->Text="Максимальный аргумент:" +VarToStr(Form1->FUNC3(a,b));
    else
      spSkinEdit5->Text="Аргументы равны";
  }
 }
 catch (...)
 {
  ShowMessage("Ошибка ввода/вывода");
 };
}
//------------------------------------------------------------------------------
void __fastcall TForm1::spSkinButton2Click(TObject *Sender)
{
 try
 {
  double a,b;
  a=StrToFloat(spSkinEdit1->Text);
  b=StrToFloat(spSkinEdit2->Text);
  if (a!=0 || b!=0)
   {
    spSkinEdit3->Text=VarToStr(Form1->FUNC1(a,b));
    spSkinEdit4->Text=VarToStr(Form1->FUNC2(a,b));
    if (Form1->FUNC3(a,b)!=0)
      spSkinEdit5->Text="Максимальный аргумент:" +VarToStr(Form1->FUNC3(a,b));
    else
      spSkinEdit5->Text="Аргументы равны";
   };
 }
 catch (...)
 {
  ShowMessage("Ошибка ввода/вывода");
 };
}
//------------------------------------------------------------------------------
void __fastcall TForm1::spSkinButton3Click(TObject *Sender)
{
 try
 {
  complex <float> p;
  p._M_re=StrToFloat(spSkinEdit1->Text);
  p._M_im=StrToFloat(spSkinEdit2->Text);
  if ( p._M_re!=0 || p._M_im!=0)
    {
     spSkinEdit3->Text=VarToStr(Form1->FUNC1(p));
     spSkinEdit4->Text=VarToStr(Form1->FUNC2(p));
     if (Form1->FUNC3(p._M_re,p._M_im)!=0)
       spSkinEdit5->Text="Максимальный аргумент:" +VarToStr(Form1->FUNC3(p));
     else
       spSkinEdit5->Text="Аргументы равны";
    };
 }
 catch (...)
 {
  ShowMessage("Ошибка ввода/вывода");
 };
}
//------------------------------------------------------------------------------

