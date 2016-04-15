#include <vcl.h>
#pragma hdrstop
#include "Unit1.h"
#include "Unit3.h"
#pragma package(smart_init)
#pragma link "SHDocVw_OCX"
#pragma resource "*.dfm"
TForm3 *Form3;
__fastcall TForm3::TForm3(TComponent* Owner)
        : TForm(Owner)
{}
/////////////////////////Продажа товара/////////////////////////////////////////
void __fastcall TForm3::Button2Click(TObject *Sender)
{
// try
// {
  if (RadioButton8->Checked==true)
   {//////////////////////////////По одному/////////////////////////////////////
   StrToInt(Form3->Edit3->Text);
   Form1->TBL.OTCHET_PRODAGA_ONE(Form3->Edit2->Text, Form3->Edit3->Text);
   }
  else
   if (ComboBox6->Text!="")
   {////////По всем товарам
     if (RadioButton13->Checked==true)
      {///По категории и виду///////////////////////////////////////////////////
       Form1->TBL.OTCHET_PRODAGA(Form3->Edit2->Text, ComboBox6->Text);
      }
     else
      {///////////////По категории//////////////////////////////////////////////
       Form1->TBL.OTCHET_KATEGOR(Form3->Edit2->Text, ComboBox6->Text);
      }
   }
 //}
 //catch (...)
 //{ShowMessage("Вы некоректно ввели данные для составления отчета!");};
}
void __fastcall TForm3::RadioButton6Click(TObject *Sender)
{
 if (Form3->RadioButton6->Checked==true)
  {
    Label13->Enabled=true;
    Edit1->Enabled=true;
    RadioButton11->Enabled=false;
    RadioButton10->Enabled=false;
    Label1->Enabled=false;
    ComboBox5->Enabled=false;
  }
}
void __fastcall TForm3::RadioButton7Click(TObject *Sender)
{
 if (Form3->RadioButton6->Checked==false)
  {
    Label13->Enabled=false;
    Edit1->Enabled=false;
    RadioButton11->Enabled=true;
    RadioButton10->Enabled=true;
    Label1->Enabled=true;
    ComboBox5->Enabled=true;
  }
}
void __fastcall TForm3::RadioButton8Click(TObject *Sender)
{
  if (Form3->RadioButton8->Checked==true)
  {
    Label15->Enabled=true;
    Edit3->Enabled=true;
    RadioButton14->Enabled=false;
    RadioButton13->Enabled=false;
    Label2->Enabled=false;
    ComboBox6->Enabled=false;
  }
}
void __fastcall TForm3::RadioButton9Click(TObject *Sender)
{
  if (Form3->RadioButton8->Checked==false)
  {
    Label15->Enabled=false;
    Edit3->Enabled=false;
    RadioButton14->Enabled=true;
    RadioButton13->Enabled=true;
    Label2->Enabled=true;
    ComboBox6->Enabled=true;
  }
}
/////////////////////Перемещение товара/////////////////////////////////////////
void __fastcall TForm3::Button3Click(TObject *Sender)
{
 try
 {
  StrToInt(Edit4->Text);
  Form1->TBL.OTCHET_PERM(Form3->Edit2->Text,StrToInt(Edit4->Text));
 }
 catch (...)
 {ShowMessage("Вы некоректно ввели серийный номер!");};
}
/////////////////////Поступление товаров////////////////////////////////////////
void __fastcall TForm3::Button1Click(TObject *Sender)
{
 try
 {
  if (RadioButton6->Checked==true)
   {//////////////////////////////По одному/////////////////////////////////////
    if (StrToInt(Edit1->Text))
    {
    Form1->TBL.OTCHET_POKUPKA_ONE(Form3->Edit2->Text, Form3->Edit1->Text);
    }
   }
  else
   if (ComboBox5->Text!="")
   {////////По всем товарам/////////Здесь еще прибавляется дата/////////////////
     if (RadioButton10->Checked==true)
      {///По категории и виду///////////////////////////////////////////////////
       Form1->TBL.OTCHET_POKUPKA(Form3->Edit2->Text, ComboBox5->Text);
      }
     else
      {///////////////По категории//////////////////////////////////////////////
       Form1->TBL.OTCHET_POK_KATEGOR(Form3->Edit2->Text, ComboBox5->Text);
      }
   }
 }
 catch (...)
  {ShowMessage("Вы некоректно ввели данные для составления отчета!");};
}

