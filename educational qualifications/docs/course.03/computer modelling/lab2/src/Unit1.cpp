////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////OK//////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
#include <vcl.h>
#pragma hdrstop
#include "Unit1.h"
#pragma package(smart_init)
#pragma resource "*.dfm"
TForm1 *Form1;
__fastcall TForm1::TForm1(TComponent* Owner) : TForm(Owner) {}
////////////////////////////////////////////////////////////////////////////////
//////////////////////////Инициализация формы///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::FormCreate(TObject *Sender)
{
 Form1->Left=0;
 Form1->Top=0;
 Form1->Width=1024;
 Form1->Height=768;
 ControlStyle << csOpaque;
 Image2->ControlStyle << csOpaque;
 Image3->ControlStyle << csOpaque;
 Image1->Canvas->Brush->Color=clBlack;
 Image1->Canvas->Rectangle(0,0,1024,768);
 ///////////////////////////////////////////////////////////////////////////////
 ZEML(*Form1->Image1);
 VOROTA(*Form1->Image1);
 OTDEL1(*Form1->Image1);
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Движение вперед////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button3Click(TObject *Sender)
{
  Image2->Visible=true;
  static SUM=0;
  switch (SUM)
   {
     case 0:
         Image2->Top=604;
         for (int i=0;i<140;i++)
          {
           Image2->Left=-100+i;
           Sleep(10);
           Application->ProcessMessages();
          }
         SUM++;
         SECTOR=1;
     break;
     case 1:
       if (ZATVOR1_OPEN==true)
        {
         Image2->Top=604;
         for (int i=140;i<340;i++)
          {
           Image2->Left=-100+i;
           Sleep(10);
           Application->ProcessMessages();
          }
         SUM++;
         SECTOR=2;
        }
       else ShowMessage("Откройте затвор №1!");
     break;
     case 2:
       if (ZATVOR2_OPEN==true)
        {
         for (int i=340;i<580;i++)
          {
           Image2->Left=-100+i;
           Sleep(10);
           Application->ProcessMessages();
          }
         SUM++;
         SECTOR=3;
         }
       else ShowMessage("Откройте затвор №2!");
     break;
     case 3:
       if (ZATVOR3_OPEN==true)
        {
         for (int i=580;i<1200;i++)
          {
           Image2->Left=-100+i;
           Sleep(10);
           Application->ProcessMessages();
           Button3->Enabled=false;
           Button7->Enabled=true;
          }
         SUM=0;
         SECTOR=4;
         }
       else ShowMessage("Откройте затвор №3!");
     break;
   }
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Движение назад/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button7Click(TObject *Sender)
{
  Image3->Visible=true;
  static SUM=0;
  switch (SUM)
   {
     case 3:
       if (ZATVOR1_OPEN==true)
        {
         for (int i=0;i<440;i++)
          {
           Image3->Left=263-i;
           Sleep(10);
           Application->ProcessMessages();
          }
         SUM=0;
         Button3->Enabled=true;
         Button7->Enabled=false;
         SECTOR=1;
        }
       else ShowMessage("Откройте затвор №1!");
     break;
     case 2:
       if (ZATVOR2_OPEN==true)
        {
         for (int i=140;i<340;i++)
          {
           Image3->Left=602-i;
           Sleep(10);
           Application->ProcessMessages();
          }
         SUM++;
         SECTOR=2;
        }
       else ShowMessage("Откройте затвор №2!");
     break;
     case 1:
       if (ZATVOR3_OPEN==true)
        {
         for (int i=340;i<580;i++)
          {
           Image3->Left=1041-i;
           Sleep(10);
           Application->ProcessMessages();
          }
         SUM++;
         SECTOR=3;
        }
       else ShowMessage("Откройте затвор №3!");
     break;
     case 0:
         Image3->Top=474;
         for (int i=580;i<900;i++)
          {
           Image3->Left=1600-i;
           Sleep(10);
           Application->ProcessMessages();
          }
         SUM++;
         SECTOR=4;
     break;
   }
}
////////////////////////////////////////////////////////////////////////////////
//////////////////////////Выход из программы////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button1Click(TObject *Sender)
{
  Application->Terminate();
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////Рисуем ворота////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void TForm1::VOROTA(TImage &im)
{
  int x=190;
  int y=430;
  int d1=10;
  int d2=140;
  im.Canvas->Brush->Color=RGB(10,10,30);
  im.Canvas->Pen->Color=RGB(1,1,1);
  im.Canvas->Rectangle(x,y,x+d1,y+d2);
  im.Canvas->Rectangle(x+230,y-80,x+230+d1,y+d2-70);
  im.Canvas->Rectangle(x+460,y-100,x+460+d1,y+d2-70-70);
}
////////////////////////////////////////////////////////////////////////////////
//////////////////////Рисуем фундамент//////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void TForm1::ZEML(TImage &im)
{
  int y=570;
  im.Canvas->Brush->Color=RGB(120,130,90);
  im.Canvas->Pen->Color=RGB(120,130,90);
  im.Canvas->Rectangle(0,y,1024,y+50);
  y=500;
  im.Canvas->Rectangle(420,y,1024,y+70);
  y=430;
  im.Canvas->Rectangle(650,y,1024,y+70);
}
////////////////////////////////////////////////////////////////////////////////
//////////////////////Рисуем уровень воды до шлюзов/////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void TForm1::OTDEL1(TImage &im)
{
  im.Canvas->Brush->Color=clBlue;
  im.Canvas->Pen->Color=clBlack;
  int y=570;
  im.Canvas->Rectangle(0,501,190,570);
  im.Canvas->Rectangle(660,371,1024,430);
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////Уровень воды////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void TForm1::UROVEN(TImage &im, int u, int k, int code,int h)
{
 im.Canvas->Pen->Color=RGB(10,10,90);
 im.Canvas->Brush->Color=clBlue;
 switch (code)
  {
    case 0:
        //////////Наполняется в 1 секторе///////////////////////////////////////
        for (int i=0;i<70-h;i++)
        {
          im.Canvas->Rectangle(u,-k+570-i,u+220,-k+570);
          Sleep(10);
          Application->ProcessMessages();
        };
        break;
    case 1:
        ////////////////////Наполняется во 2 секторе////////////////////////////
        for (int i=70-h;i<130;i++)
          {
           im.Canvas->Rectangle(u,-k+570-i,u+220,-k+570);
           if (h==0)
             {
              if (SECTOR==2)
               {
                Image2->Top=674-i;
                Image3->Top=674-i;
               }
             }
           else
             {
              if (SECTOR==3)
               {
                Image2->Top=604-i;
                Image3->Top=604-i;
               }
             }
           Sleep(10);
           Application->ProcessMessages();
          };
        break;
    ////////////////Сливается со 2 сектора//////////////////////////////////////
    case 2:
        for (int i=0;i<60+h+3;i++)
          {
           im.Canvas->Pen->Color=clBlack;
           im.Canvas->Brush->Color=clBlack;
           im.Canvas->Rectangle(u,-k+440,u+220,-k+500+h+3);
           im.Canvas->Brush->Color=clBlue;
           im.Canvas->Pen->Color=clBlue;
           im.Canvas->Rectangle(u,-k+440+i,u+220,-k+500+h+3);
           if (h==0)
             {
              if (SECTOR==2)
               {
               Image3->Top=544+i;
               Image2->Top=544+i;
               }
             }
           else
             {
              if (SECTOR==3)
               {
                Image3->Top=472+i;
                Image2->Top=472+i;
               }
             }
           Sleep(10);
           Application->ProcessMessages();
          };
        break;
    ////////////////Сливается с 1 сектора///////////////////////////////////////
    case 3:
        for (int i=0+h;i<70;i++)
          {
           im.Canvas->Pen->Color=clBlack;
           im.Canvas->Brush->Color=clBlack;
           im.Canvas->Rectangle(u,-k+500,u+220,-k+570);
           im.Canvas->Brush->Color=clBlue;
           im.Canvas->Rectangle(u,-k+499+i,u+220,-k+570);
           if (h==0)
             {
               if (SECTOR==2)
               {
                Image3->Top=602+i;
                Image2->Top=602+i;
               }
             }
           else
            {
             if (SECTOR==3)
               {
                Image3->Top=534+i;
                Image2->Top=534+i;
               }
            }
           Sleep(10);
           Application->ProcessMessages();
          };
        if ((SECTOR==2 && h==0)||(SECTOR==3 && h!=0))
         {
          ShowMessage("You the fool, you have ruined a vessel!");
          ShowMessage("Game over the loser! HA HA ...");
          Application->Terminate();
         }
        break;
  }
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////Открыть - закрыть затвор №1//////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button4Click(TObject *Sender)
{
 ZATVOR1_OPEN=false;
 if (ZATVOR1==true)  //Проверяем - можно ли открыть затвор
 {
  //////////////////////////////////////////////////////////////////////////////
  int x=190;
  int y=430;
  int d1=10;
  int d2=140;
  Image1->Canvas->Brush->Color=RGB(10,10,30);
  Image1->Canvas->Pen->Color=RGB(10,10,90);
  static bool FL;
  if (FL==false)
   {
     Form1->ScrollBar1->Enabled=false;
     Form1->ScrollBar2->Enabled=false;
     for (int i=0;i<20;i++)
      {
        Image1->Canvas->Brush->Color=RGB(10,10,30);
        Image1->Canvas->Pen->Color=RGB(1,1,1);
        Image1->Canvas->Rectangle(x,y,x+d1+i,y+d2);
        ////////////////////////////////////////////////////////////////////////
        Image1->Canvas->Brush->Color=clBlue;
        Image1->Canvas->Pen->Color=clBlue;
        Image1->Canvas->Rectangle(x-1,y+72,x+d1+20,y+d2);
        Sleep(10);
        Application->ProcessMessages();
      };
     Button4->Caption="Закрыть затвор №1";
     FL=true;
     ZATVOR1_OPEN=true;
   }
  else
   {
    for (int i=0;i<20;i++)
      {
        ////////////////Закрашиваем фон/////////////////////////////////////////
        Image1->Canvas->Brush->Color=RGB(1,1,1);
        Image1->Canvas->Pen->Color=RGB(1,1,1);
        Image1->Canvas->Rectangle(x,y,x+d1+20,y+d2);
        /////////////////Рисуем кусок воды//////////////////////////////////////
        Image1->Canvas->Brush->Color=clBlue;
        Image1->Canvas->Pen->Color=clBlue;
        Image1->Canvas->Rectangle(x,y+72,x+d1+20,y+d2);
        /////////////////Рисуем закрывающиеся ворота////////////////////////////
        Image1->Canvas->Brush->Color=RGB(10,10,30);
        Image1->Canvas->Pen->Color=RGB(1,1,1);
        if (i!=19)
          Image1->Canvas->Rectangle(x,y,x+d1+20-i,y+d2-70);
        else
          Image1->Canvas->Rectangle(x,y,x+d1+20-i,y+d2);
        Sleep(10);
        Application->ProcessMessages();
      };
    Button4->Caption="Открыть затвор №1";
    FL=false;
    Form1->ScrollBar1->Enabled=true;
    Form1->ScrollBar2->Enabled=true;
   };
 }
 else ShowMessage("Невозможно открыть затвор №1!");
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////Открыть - закрыть затвор №2//////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button5Click(TObject *Sender)
{
 ZATVOR2_OPEN=false;
 if (ZATVOR2==true && ZATVOR3==true)  //Проверяем - можно ли открыть затвор
 {
  int x=190;
  int y=430;
  int d1=10;
  int d2=140;
  Image1->Canvas->Brush->Color=RGB(10,10,30);
  Image1->Canvas->Pen->Color=RGB(10,10,90);
  static bool FL;
  if (FL==false)
   {
     Form1->ScrollBar1->Enabled=false;
     Form1->ScrollBar2->Enabled=false;
     for (int i=0;i<20;i++)
      {
        Image1->Canvas->Brush->Color=RGB(10,10,30);
        Image1->Canvas->Pen->Color=RGB(1,1,1);
        Image1->Canvas->Rectangle(x+230,y-80,x+230+d1+i,y+d2-70);
        ////////////////////////////////////////////////////////////////////////
        Image1->Canvas->Brush->Color=clBlue;
        Image1->Canvas->Pen->Color=clBlue;
        Image1->Canvas->Rectangle(x-1+230,y+72-60,x+230+d1+20,y+d2-70);
        Sleep(10);
        Application->ProcessMessages();
      };
     Button5->Caption="Закрыть затвор №2";
     FL=true;
     ZATVOR2_OPEN=true;
   }
  else
   {
    for (int i=0;i<20;i++)
      {
        ////////////////Закрашиваем фон/////////////////////////////////////////
        Image1->Canvas->Brush->Color=RGB(1,1,1);
        Image1->Canvas->Pen->Color=RGB(1,1,1);
        Image1->Canvas->Rectangle(x+230,y-80,x+230+d1+20,y+d2-70-5);
        /////////////////Рисуем кусок воды//////////////////////////////////////
        Image1->Canvas->Brush->Color=clBlue;
        Image1->Canvas->Pen->Color=clBlue;
        Image1->Canvas->Rectangle(x+230,y+72-80+20,x+230+d1+20,y+d2-70);
        /////////////////Рисуем закрывающиеся ворота////////////////////////////
        Image1->Canvas->Brush->Color=RGB(10,10,30);
        Image1->Canvas->Pen->Color=RGB(1,1,1);
        if (i!=19)
          Image1->Canvas->Rectangle(x+230,y-80,x+230+d1+20-i,y+d2-70-60);
        else
          Image1->Canvas->Rectangle(x+230,y-80,x+230+d1+20-i,y+d2-70);
        Sleep(10);
        Application->ProcessMessages();
      };
    Button5->Caption="Открыть затвор №2";
    FL=false;
    Form1->ScrollBar1->Enabled=true;
    Form1->ScrollBar2->Enabled=true;
   };
   }
 else ShowMessage("Невозможно открыть затвор №2!");
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////Открыть - закрыть затвор №3//////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button6Click(TObject *Sender)
{
 ZATVOR3_OPEN=false;
 if (ZATVOR4==true)  //Проверяем - можно ли открыть затвор
 {
  int x=190;
  int y=430;
  int d1=10;
  int d2=140;
  Image1->Canvas->Brush->Color=RGB(10,10,30);
  Image1->Canvas->Pen->Color=RGB(10,10,90);
  static bool FL;
  if (FL==false)
   {
     Form1->ScrollBar1->Enabled=false;
     Form1->ScrollBar2->Enabled=false;
     for (int i=0;i<20;i++)
      {
        Image1->Canvas->Brush->Color=RGB(10,10,30);
        Image1->Canvas->Pen->Color=RGB(1,1,1);
        Image1->Canvas->Rectangle(x+460,y-100,x+460+d1+i,y+d2-70-70);
        ////////////////////////////////////////////////////////////////////////
        Image1->Canvas->Brush->Color=clBlue;
        Image1->Canvas->Pen->Color=clBlue;
        Image1->Canvas->Rectangle(x-1+460,y+72-60-70,x+460+d1+20,y+d2-70-70);
        Sleep(10);
        Application->ProcessMessages();
      };
     Button6->Caption="Закрыть затвор №3";
     FL=true;
     ZATVOR3_OPEN=true;
   }
  else
   {
    for (int i=0;i<20;i++)
      {
        ////////////////Закрашиваем фон/////////////////////////////////////////
        Image1->Canvas->Brush->Color=RGB(1,1,1);
        Image1->Canvas->Pen->Color=RGB(1,1,1);
        Image1->Canvas->Rectangle(x+460,y-100,x+460+d1+20,y+d2-70-70);
        /////////////////Рисуем кусок воды//////////////////////////////////////
        Image1->Canvas->Brush->Color=clBlue;
        Image1->Canvas->Pen->Color=clBlue;
        Image1->Canvas->Rectangle(x+460,y+72-80+20-70,x+460+d1+20,y+d2-70-70);
        /////////////////Рисуем закрывающиеся ворота////////////////////////////
        Image1->Canvas->Brush->Color=RGB(10,10,30);
        Image1->Canvas->Pen->Color=RGB(1,1,1);
        if (i!=19)
          Image1->Canvas->Rectangle(x+460,y-100,x+460+d1+20-i,y+d2-70-70-60);
        else
          Image1->Canvas->Rectangle(x+460,y-100,x+460+d1+20-i,y+d2-70-70);
        Sleep(10);
        Application->ProcessMessages();
      };
    Button6->Caption="Открыть затвор №3";
    FL=false;
    Form1->ScrollBar1->Enabled=true;
    Form1->ScrollBar2->Enabled=true;
  };
  }
 else ShowMessage("Невозможно открыть затвор №3!");
}
////////////////////////////////////////////////////////////////////////////////
/////////////////Управление первым шлюзом///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::ScrollBar1Scroll(TObject *Sender,
      TScrollCode ScrollCode, int &ScrollPos)
{
 ZATVOR1=false;
 ZATVOR2=false;
 static int FLAG,FLAG1;
 static bool NET,NET1;
 if (ScrollCode == scLineUp && NET==false)
 {
    NET1=false;
    Form1->ScrollBar1->Enabled=false;
    if ((ScrollPos==1 && FLAG==0)||(ScrollPos==1 && FLAG==1))
       {
        UROVEN(*Image1,200,0,0,0);
        ZATVOR1=true;
       }
    if ((ScrollPos==0 && FLAG==1)||(ScrollPos==0 && FLAG==0))
      {
        ZATVOR2=true;
        UROVEN(*Image1,200,0,1,0);
      }
    Form1->ScrollBar1->Enabled=true;
    FLAG=ScrollPos;
    if (ScrollPos==0)
     NET=true;
    else
     NET=false;
 }
 if (ScrollCode == scLineDown && NET1==false)
 {
  if (!(ScrollPos==2 && FLAG==0 && FLAG1==0 && NET==false && NET1==false))
   {
    NET=false;
    Form1->ScrollBar1->Enabled=false;
    if ((ScrollPos==1 && FLAG1==0)||(ScrollPos==1 && FLAG1==2)||
        (ScrollPos==1 && FLAG1==1))
      {
        ZATVOR1=true;
        UROVEN(*Image1,200,0,2,0);
      }
    if ((ScrollPos==2 && FLAG1==1)||(ScrollPos==2 && FLAG1==0)||
        (ScrollPos==2 && FLAG1==2))
        UROVEN(*Image1,200,0,3,0);
    Form1->ScrollBar1->Enabled=true;
    FLAG1=ScrollPos;
    if (ScrollPos==2)
     NET1=true;
    else
     NET1=false;
   }
 }
}
////////////////////////////////////////////////////////////////////////////////
/////////////////Управление вторым шлюзом///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::ScrollBar2Scroll(TObject *Sender,
      TScrollCode ScrollCode, int &ScrollPos)
{
 ZATVOR3=false;
 ZATVOR4=false;
 int m=70;
 int d=430;
 int h=10;
 static int FLAG,FLAG1;
 static bool NET,NET1;
 if (ScrollCode == scLineUp && NET==false)
 {
    NET1=false;
    Form1->ScrollBar2->Enabled=false;
    if ((ScrollPos==1 && FLAG==0)||(ScrollPos==1 && FLAG==1))
      {
        ZATVOR3=true;
        UROVEN(*Image1,d,m,0,h);
      }
    if ((ScrollPos==0 && FLAG==1)||(ScrollPos==0 && FLAG==0))
     {
        ZATVOR4=true;
        UROVEN(*Image1,d,m,1,h);
     }
    Form1->ScrollBar2->Enabled=true;
    FLAG=ScrollPos;
    if (ScrollPos==0)
     NET=true;
    else
     NET=false;
 }
 if (ScrollCode == scLineDown && NET1==false)
 {
  if (!(ScrollPos==2 && FLAG==0 && FLAG1==0 && NET==false && NET1==false))
   {
    NET=false;
    Form1->ScrollBar2->Enabled=false;
    if ((ScrollPos==1 && FLAG1==0)||(ScrollPos==1 && FLAG1==2)||
        (ScrollPos==1 && FLAG1==1))
     {
        ZATVOR3=true;
        UROVEN(*Image1,d,m,2,h);
     }
    if ((ScrollPos==2 && FLAG1==1)||(ScrollPos==2 && FLAG1==0)||
        (ScrollPos==2 && FLAG1==2))
        UROVEN(*Image1,d,m,3,h);
    Form1->ScrollBar2->Enabled=true;
    FLAG1=ScrollPos;
    if (ScrollPos==2)
     NET1=true;
    else
     NET1=false;
   }
 }
}
////////////////////////////////////////////////////////////////////////////////
/////////////////Автоматическое движение корабля////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button2Click(TObject *Sender)
{
 ZATVOR1=true;
 ZATVOR2=true;
 ZATVOR3=true;
 ZATVOR4=true;
 Button2->Enabled=false;
 static bool TEST,TEST1;
 int m=70;
 int d=430;
 int h=10;
 Image2->Visible=true;
 Image2->Top=604;
 SECTOR=1;
 for (int i=0;i<140;i++)
          {
           Image2->Left=-100+i;
           Sleep(10);
           Application->ProcessMessages();
          }
 if (TEST==false)
  {
   UROVEN(*Image1,200,0,0,0);
   TEST=true;
  }
 Button4Click(Form1);
 SECTOR=2;
 for (int i=140;i<340;i++)
          {
           Image2->Left=-100+i;
           Sleep(10);
           Application->ProcessMessages();
          }
 Button4Click(Form1);
 UROVEN(*Image1,200,0,1,0);
 if (TEST1==false)
  {
   UROVEN(*Image1,d,m,0,h);
   TEST1=true;
  }
 Button5Click(Form1);
 SECTOR=3;
 for (int i=340;i<580;i++)
          {
           Image2->Left=-100+i;
           Sleep(10);
           Application->ProcessMessages();
          }
 Button5Click(Form1);
 UROVEN(*Image1,d,m,1,h);
 Button6Click(Form1);
 SECTOR=4;
 for (int i=580;i<1200;i++)
          {
           Image2->Left=-100+i;
           Sleep(10);
           Application->ProcessMessages();
          }
 Button6Click(Form1);
 ////////////////////////////Назад//////////////////////////////////////////////
 Image3->Visible=true;
 Image3->Top=474;
 SECTOR=4;
 for (int i=580;i<900;i++)
          {
           Image3->Left=1600-i;
           Sleep(10);
           Application->ProcessMessages();
          }
 Button6Click(Form1);
 SECTOR=3;
 for (int i=340;i<580;i++)
          {
           Image3->Left=1041-i;
           Sleep(10);
           Application->ProcessMessages();
          }
 Button6Click(Form1);
 UROVEN(*Image1,d,m,2,h);
 Button5Click(Form1);
 SECTOR=2;
 for (int i=140;i<340;i++)
          {
           Image3->Left=602-i;
           Sleep(10);
           Application->ProcessMessages();
          }
 Button5Click(Form1);
 UROVEN(*Image1,200,0,2,0);
 Button4Click(Form1);
 SECTOR=1;
 for (int i=0;i<440;i++)
          {
           Image3->Left=263-i;
           Sleep(10);
           Application->ProcessMessages();
          }
 Button4Click(Form1);
 Button2->Enabled=true;
 ZATVOR1=false;
 ZATVOR2=false;
 ZATVOR3=false;
 ZATVOR4=false;
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////Сброс всего при смене режима///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::PageControl1Change(TObject *Sender)
{
  Form1->ScrollBar1->Position=2;
  Form1->ScrollBar2->Position=2;
  Image1->Canvas->Brush->Color=clBlack;
  Image1->Canvas->Pen->Color=clBlack;
  Image1->Canvas->Rectangle(0,0,1024,768);
  //////////////////////////////////////////////////////////////////////////////
  ZEML(*Form1->Image1);
  VOROTA(*Form1->Image1);
  OTDEL1(*Form1->Image1);
}

