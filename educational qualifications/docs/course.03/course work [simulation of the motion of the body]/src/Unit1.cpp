/////////////////////////////////OK/////////////////////////////////////////////
#include <vcl.h>
#pragma hdrstop
#include "Unit1.h"
#include "math.h"
#pragma package(smart_init)
#pragma resource "*.dfm"
TForm1 *Form1;
__fastcall TForm1::TForm1(TComponent* Owner): TForm(Owner){}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::FormCreate(TObject *Sender)
{
  Form1->Left=0;
  Form1->Top=0;
  Image2->Visible=false;
  Image3->Visible=false;
  Form1->DoubleBuffered=true;
  xo=40;
  yo=90;
  VETER=0; //Ветра нет
}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Timer1Timer(TObject *Sender)
{
   if (Image2->Visible==false)
    {
      Image2->Visible=true;
      Image3->Visible=false;
    }
   else
    {
      Image2->Visible=false;
      Image3->Visible=true;
    }
}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::UpDown1ChangingEx(TObject *Sender,
      bool &AllowChange, short NewValue, TUpDownDirection Direction)
{
  if (NewValue>=0 && NewValue<10)
    {
      Image4->Visible=true;Image5->Visible=false;Image6->Visible=false;
      Image7->Visible=false;Image8->Visible=false;Image9->Visible=false;
      Image10->Visible=false;Image11->Visible=false;Image12->Visible=false;
      Image13->Visible=false;
      xo=40;
      yo=90;
    };
  if (NewValue>=10 && NewValue<20)
    {
      Image4->Visible=false;Image5->Visible=true;Image6->Visible=false;
      Image7->Visible=false;Image8->Visible=false;Image9->Visible=false;
      Image10->Visible=false;Image11->Visible=false;Image12->Visible=false;
      Image13->Visible=false;
      xo=54;
      yo=85;
    };
  if (NewValue>=20 && NewValue<30)
    {
      Image4->Visible=false;Image5->Visible=false;Image6->Visible=true;
      Image7->Visible=false;Image8->Visible=false;Image9->Visible=false;
      Image10->Visible=false;Image11->Visible=false;Image12->Visible=false;
      Image13->Visible=false;
      xo=63;
      yo=88;
    };
  if (NewValue>=30 && NewValue<40)
    {
      Image4->Visible=false;Image5->Visible=false;Image6->Visible=false;
      Image7->Visible=true;Image8->Visible=false;Image9->Visible=false;
      Image10->Visible=false;Image11->Visible=false;Image12->Visible=false;
      Image13->Visible=false;
      xo=83;
      yo=96;
    };
  if (NewValue>=40 && NewValue<50)
    {
      Image4->Visible=false;Image5->Visible=false;Image6->Visible=false;
      Image7->Visible=false;Image8->Visible=true;Image9->Visible=false;
      Image10->Visible=false;Image11->Visible=false;Image12->Visible=false;
      Image13->Visible=false;
      xo=100;
      yo=90;
    };
  if (NewValue>=50 && NewValue<60)
    {
      Image4->Visible=false;Image5->Visible=false;Image6->Visible=false;
      Image7->Visible=false;Image8->Visible=false;Image9->Visible=true;
      Image10->Visible=false;Image11->Visible=false;Image12->Visible=false;
      Image13->Visible=false;
      xo=110;
      yo=80;
    };
  if (NewValue>=60 && NewValue<70)
    {
      Image4->Visible=false;Image5->Visible=false;Image6->Visible=false;
      Image7->Visible=false;Image8->Visible=false;Image9->Visible=false;
      Image10->Visible=true;Image11->Visible=false;Image12->Visible=false;
      Image13->Visible=false;
      xo=120;
      yo=70;
    };
  if (NewValue>=70 && NewValue<80)
    {
      Image4->Visible=false;Image5->Visible=false;Image6->Visible=false;
      Image7->Visible=false;Image8->Visible=false;Image9->Visible=false;
      Image10->Visible=false;Image11->Visible=true;Image12->Visible=false;
      Image13->Visible=false;
      xo=130;
      yo=60;
    };
  if (NewValue>=80 && NewValue<90)
    {
      Image4->Visible=false;Image5->Visible=false;Image6->Visible=false;
      Image7->Visible=false;Image8->Visible=false;Image9->Visible=false;
      Image10->Visible=false;Image11->Visible=false;Image12->Visible=true;
      Image13->Visible=false;
      xo=130;
      yo=50;
    };
  if (NewValue==90)
    {
      Image4->Visible=false;Image5->Visible=false;Image6->Visible=false;
      Image7->Visible=false;Image8->Visible=false;Image9->Visible=false;
      Image10->Visible=false;Image11->Visible=false;Image12->Visible=false;
      Image13->Visible=true;
      xo=135;
      yo=40;
    };
}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button1Click(TObject *Sender)
{

  if (StrToFloat(Edit2->Text)<=0)
    {
     ShowMessage("Тело не имеет массу! Система не имеет решений!");
     return;
    }
  if (StrToFloat(Edit3->Text)<=0)
    {
     ShowMessage("Тело не имеет начальной скорости! Система не имеет решений!");
     return;
    }
  Edit7->Text="0";
  Edit8->Text="0";
  Edit13->Text="0";
  Edit10->Text="0";
  Edit11->Text="0";
  Edit12->Text="0";
  //////////////////////////////////////////////////////////////////////////////
  x=0;
  y=0;
  g=StrToFloat(Edit4->Text);
  t=0;
  vo=StrToFloat(Edit3->Text);
  a=90-StrToInt(Edit1->Text);
  kc=StrToInt(Edit9->Text);
  if (VETER==1)
    vv=StrToFloat(Edit6->Text);
  if (VETER==2)
    vv=StrToFloat(Edit5->Text);
  m=StrToFloat(Edit2->Text);
  /////////////////////Вычисляем данные/////////////////////////////////////////
  T=vo*sin(a*M_PI/180)/g+sqrt(vo*vo*sin(a*M_PI/180)*sin(a*M_PI/180)+2*g*yo)/g;   //Время движения
  Edit13->Text=VarToStr(T);
  Button1->Enabled=false;
  if (Form1->CheckBox1->Checked==true)
   {
     ////////////////////Решаем задачу без моделирования////////////////////////
     bool flirt=false;
     while (flirt!=true)
     {
     int C1=520;
     int C2=150;
     y=yo+vo*sin(a*M_PI/180)*t-(g*t*t)/2;
     float A=kc*vv/m;
     if (VETER==2)
      x=xo+vo*cos(a*M_PI/180)*t+A*t*t/2;
     if (VETER==1)
      x=xo+vo*cos(a*M_PI/180)*t-A*t*t/2;
     if (VETER==0)
      x=xo+vo*cos(a*M_PI/180)*t;
     Edit11->Text=VarToStr(y);
     if (y>StrToFloat(Edit7->Text)) Edit7->Text=VarToStr(y);
     if (x>StrToFloat(Edit8->Text)) Edit8->Text=VarToStr(-40+x);
     Edit10->Text=VarToStr(-40+x);
     Edit12->Text=VarToStr(t);
     t=t+0.1;
     if (T<t)
      {
       Button1->Enabled=true;
       Edit11->Text=VarToStr(0);
       Edit10->Text=Edit8->Text;
       Edit12->Text=VarToStr(ceil(T)-1);
       flirt=true;
      }
     }
   }
  else
    Timer2->Enabled=true;
}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Timer2Timer(TObject *Sender)
{
  int C1=520;
  int C2=150;
  y=yo+vo*sin(a*M_PI/180)*t-(g*t*t)/2;
  float A=kc*vv/m;
  if (VETER==2)
    x=xo+vo*cos(a*M_PI/180)*t+A*t*t/2;
  if (VETER==1)
    x=xo+vo*cos(a*M_PI/180)*t-A*t*t/2;
  if (VETER==0)
    x=xo+vo*cos(a*M_PI/180)*t;
  Edit11->Text=VarToStr(y);
  if (y>StrToFloat(Edit7->Text)) Edit7->Text=VarToStr(y);
  if (x>StrToFloat(Edit8->Text)) Edit8->Text=VarToStr(-40+x);
  Edit10->Text=VarToStr(-40+x);
  Edit12->Text=VarToStr(t);
  Image14->Visible=true;
  Image14->Top=C1-ceil(y);
  Image14->Left=C2+ceil(x);
  t=t+0.1;
  if (T<t)
   {
    Timer2->Enabled = false;
    Button1->Enabled=true;
    Edit11->Text=VarToStr(0);
    Edit10->Text=Edit8->Text;
    Edit12->Text=VarToStr(ceil(T)-1);
    /////////////////////Создаем яму////////////////////////////////////////////
    if (Image14->Left<125 || Image14->Left>253)
    {
      TRect SOURCE,DEST;
      DEST.Left=0+Image14->Left-15;
      DEST.Top=0+Image14->Top-123;
      DEST.Right=Image15->Width+Image14->Left-15;
      DEST.Bottom=Image15->Top+Image14->Top-123;
      SOURCE.Left=0;
      SOURCE.Top=0;
      SOURCE.Right=Image15->Width;
      SOURCE.Bottom=Image15->Top;
      Image1->Canvas->CopyMode=cmSrcAnd;
      Image1->Canvas->CopyRect(DEST,Image15->Canvas,SOURCE);
    }
   else
    {
      Image16->Visible=true;
      Image14->Visible=false;
      Image4->Visible=false;Image5->Visible=false;Image6->Visible=false;
      Image7->Visible=false;Image8->Visible=false;Image9->Visible=false;
      Image10->Visible=false;Image11->Visible=false;Image12->Visible=false;
      Image13->Visible=false;
      ShowMessage("Вы повредили орудие! Начните игру заново!");
      Application->Terminate();
    }
   }
}
/////////////////////////////////Попутный ветер/////////////////////////////////
void __fastcall TForm1::Edit5Change(TObject *Sender)
{
 try
 {
  if (StrToFloat(Edit5->Text)>0)
   {
     ///////////////////////////////////////////////////////////////////////////
     Edit6->Enabled=false;
     ///////////////////////////////////////////////////////////////////////////
     Image17->Visible=false;
     Image2->Visible=true;
     Image3->Visible=true;
     Timer1->Enabled=true;
     Image2->Visible=true;
     Image3->Visible=true;
     VETER=2;
   }
  else
   {
     ///////////////////////////////////////////////////////////////////////////
     Edit6->Enabled=true;
     ///////////////////////////////////////////////////////////////////////////
     Image17->Visible=true;
     Image2->Visible=false;
     Image3->Visible=false;
     Timer1->Enabled=false;
     VETER=0;
   }
 }
 catch (...){};
}
//////////////////////////////Встречный ветер///////////////////////////////////
void __fastcall TForm1::Edit6Change(TObject *Sender)
{
 try
 {
  if (StrToFloat(Edit6->Text)>0)
   {
     ///////////////////////////////////////////////////////////////////////////
     Edit5->Enabled=false;
     ///////////////////////////////////////////////////////////////////////////
     Image17->Visible=false;
     Image18->Visible=true;
     Image19->Visible=true;
     Timer3->Enabled=true;
     VETER=1;
   }
  else
   {
    ///////////////////////////////////////////////////////////////////////////
    Edit5->Enabled=true;
    ///////////////////////////////////////////////////////////////////////////
    Image17->Visible=true;
    Image18->Visible=false;
    Image19->Visible=false;
    Timer3->Enabled=false;
    VETER=0;
   }
 }
 catch (...){};
}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Timer3Timer(TObject *Sender)
{
   if (Image18->Visible==false)
    {
      Image18->Visible=true;
      Image19->Visible=false;
    }
   else
    {
      Image18->Visible=false;
      Image19->Visible=true;
    }
}

