#include <vcl.h>
#include <stdio.h>
#include <ctype.h>
#pragma hdrstop
#include "Unit1.h"
#include "Unit4.h"
#pragma package(smart_init)
#pragma resource "*.dfm"
TForm4 *Form4;
__fastcall TForm4::TForm4(TComponent* Owner): TForm(Owner){}
AnsiString S; //Для фильтра
/////////////////////////////Дополняем имеющийся файл категорий/////////////////
void __fastcall TForm4::Button4Click(TObject *Sender)
{
 if (ListBox1->Items->Count!=0)
  {
   Form4->Tag=1;
   Form4->Label1->Visible=true;
   Form4->Button4->Enabled=false;
   Form4->Button8->Enabled=false;
   Label1->Caption="Нажмите Close - изменения в файле категорий вступят в силу";
  }
 else ShowMessage("Список категорий пуст!");
}
/////////////////////////////Дополняем имеющийся файл складов///////////////////
void __fastcall TForm4::Button8Click(TObject *Sender)
{
 if (ListBox2->Items->Count!=0)
  {
   Form4->Tag=2;
   Form4->Label1->Visible=true;
   Form4->Button4->Enabled=false;
   Form4->Button8->Enabled=false;
   Label1->Caption="Нажмите Close - изменения в файле складов вступят в силу";
  }
 else ShowMessage("Список складов пуст!");
}
///////////////////////////Добавляем в список - категории///////////////////////
void __fastcall TForm4::Button5Click(TObject *Sender)
{
 if (Edit1->Text!="")
 {
  Form4->ListBox1->Items->Add(Edit1->Text);
  Edit1->Text="";
 }
}
////////////////////Добавляем в список - склады/////////////////////////////////
void __fastcall TForm4::Button9Click(TObject *Sender)
{
 if (Edit2->Text!="")
 {
  Form4->ListBox2->Items->Add(Edit2->Text);
  Edit2->Text="";
 }
}
/////////////////////////////Удаляем из списка категории////////////////////////
void __fastcall TForm4::Button10Click(TObject *Sender)
{
  Form4->ListBox2->Items->Delete(ListBox2->ItemIndex);
}
/////////////////////////////Удаляем из списка склады///////////////////////////
void __fastcall TForm4::Button6Click(TObject *Sender)
{
  Form4->ListBox1->Items->Delete(ListBox1->ItemIndex);
}
/////////////////////////////Выходим////////////////////////////////////////////
void __fastcall TForm4::BitBtn1Click(TObject *Sender)
{
  if (Edit3->Text!="" && Edit4->Text!="")
   {
     if (Form1->TBL.SETNDSDOLLAR(Edit3->Text,Edit4->Text)==false)
      {ShowMessage("Вы неверно задали денежные параметры - изменения вносится не будут!");};
   };
  Form4->Close();
}
///////////////////////////Импортирование///////////////////////////////////////
void __fastcall TForm4::Button1Click(TObject *Sender)
{
  Form1->TBL.IMPORT(Edit5);
}

