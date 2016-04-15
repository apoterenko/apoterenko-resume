#include <vcl.h>
#pragma hdrstop
#include "Unit1.h"
#include "Unit6.h"
#pragma package(smart_init)
#pragma resource "*.dfm"
TForm6 *Form6;
__fastcall TForm6::TForm6(TComponent* Owner)
        : TForm(Owner)
{}
void __fastcall TForm6::Button1Click(TObject *Sender)
{
  try
  {
    Edit2->Text="";
    Edit3->Text="";
    Edit4->Text="";
    Edit5->Text="";
    Edit6->Text="";
    Edit7->Text="";
    Edit8->Text="";
    Edit9->Text="";
    Edit10->Text="";
    VarToStr(Edit1->Text);
    Form1->TBL.FIND(Form6->Edit1,Form6->Edit2,Form6->Edit3,
           Form6->Edit4,Form6->Edit5,Form6->Edit6,
           Form6->Edit7,Form6->Edit8,Form6->Edit9,
           Form6->Edit10);
  }
  catch (...)
  {Edit1->Text="";
   ShowMessage("Вы некоректно ввели серийный номер!");};
}

