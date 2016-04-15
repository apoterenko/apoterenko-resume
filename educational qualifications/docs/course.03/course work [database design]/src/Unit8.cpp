#include <vcl.h>
#pragma hdrstop
#include "Unit1.h"
#include "Unit8.h"
#pragma package(smart_init)
#pragma resource "*.dfm"
TForm8 *Form8;
__fastcall TForm8::TForm8(TComponent* Owner)
        : TForm(Owner)
{}
void __fastcall TForm8::Button1Click(TObject *Sender)
{
 Form8->Close(); 
}

