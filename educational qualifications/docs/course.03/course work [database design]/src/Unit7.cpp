#include <vcl.h>
#pragma hdrstop
#include "Unit7.h"
#pragma package(smart_init)
#pragma resource "*.dfm"
TForm7 *Form7;
__fastcall TForm7::TForm7(TComponent* Owner)
        : TForm(Owner)
{}
void __fastcall TForm7::SELECT(TObject *Sender, TShiftState Shift, int X,
      int Y)
{
 Label2->Font->Color=clBlue;
}
void __fastcall TForm7::SELECT1(TObject *Sender, TShiftState Shift, int X,
      int Y)
{
 Label3->Font->Color=clBlue;
}

void __fastcall TForm7::MOUSE(TObject *Sender, TShiftState Shift, int X,
      int Y)
{
 Label2->Font->Color=clWindowText;
 Label3->Font->Color=clWindowText;
}
void __fastcall TForm7::Label2Click(TObject *Sender)
{
 Form7->ScrollBox3->Visible=true;
 Form7->ScrollBox2->Visible=false;
}
void __fastcall TForm7::Label3Click(TObject *Sender)
{
 Form7->ScrollBox3->Visible=false;
 Form7->ScrollBox2->Visible=true;
}

