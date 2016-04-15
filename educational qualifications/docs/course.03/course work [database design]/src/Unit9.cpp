//---------------------------------------------------------------------------

#include <vcl.h>
#pragma hdrstop
#include "Unit1.h"
#include "Unit9.h"
#pragma package(smart_init)
#pragma resource "*.dfm"
TForm9 *Form9;
__fastcall TForm9::TForm9(TComponent* Owner)
        : TForm(Owner)
{}
void __fastcall TForm9::Button1Click(TObject *Sender)
{
  Form9->Close();
}

