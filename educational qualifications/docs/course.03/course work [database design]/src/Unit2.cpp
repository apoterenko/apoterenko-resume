#include <vcl.h>
#pragma hdrstop
#include "Unit2.h"
#pragma package(smart_init)
#pragma resource "*.dfm"
TForm2 *Form2;
_fastcall TForm2::TForm2(TComponent* Owner)
        : TForm(Owner){}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm2::Button2Click(TObject *Sender)
{
 Edit2->Text="";
 Edit3->Text="";
 Edit4->Text="";
 Edit5->Text="";
 Edit6->Text="";
 Edit7->Text="";
 Edit9->Text="";
 Edit10->Text="";
}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm2::Button1Click(TObject *Sender)
{
 try
 {
  StrToFloat(Edit2->Text);
  StrToFloat(Edit3->Text);
  StrToInt(Edit6->Text);
  StrToInt(Edit7->Text);
  TDateTime dtDate = StrToDate(Edit9->Text);
  AnsiString DAT=dtDate.FormatString("yyyy");
  dtDate = StrToDate(Edit5->Text);
  AnsiString DAT1=dtDate.FormatString("yyyy");
  if (StrToInt(DAT)>1990 && StrToInt(DAT)<2100 && StrToInt(DAT1)>1990 &&
      StrToInt(DAT1)<2100)
   {
     Form2->Tag=1; //Да, следует дописать в файл
     Form2->Close();
   }
  else
   {
    Form2->Tag=0;
    ShowMessage("Вы некоректно ввели дату: 1989<x<2101!");
   };
 }
 catch (...)
 {
  Form2->Tag=0;
  ShowMessage("Вы некоректно ввели параметры для покупки товара!");
 }
}

