//------------------------------------------------------------------------------
#include <vcl.h>
#include "Unit1.h"
#pragma resource "*.dfm"
TForm1 *Form1;
//------------------------------------------------------------------------------
__fastcall TForm1::TForm1(TComponent* Owner): TForm(Owner){}
//------------------------------------------------------------------------------
//------------------------Первый класс------------------------------------------
//------------------------------------------------------------------------------
class strin
  {
    public:
     char * METOD_ANSI_IN_CHAR (AnsiString STRIN);
     AnsiString METOD_CHAR_IN_ANSI (char * chr);
    private:
     AnsiString STR;
  };
//------------------------------------------------------------------------------
AnsiString strin::METOD_CHAR_IN_ANSI (char * chr)
{
 STR=chr;
 return (STR);
}
//------------------------------------------------------------------------------
char * strin::METOD_ANSI_IN_CHAR (AnsiString STRIN)
{
 return (STRIN.c_str());
}
//------------------------------------------------------------------------------
//---------------------Класс взаимного преобразования---------------------------
//------------------------------------------------------------------------------
class INTSTR
  {
    public:
      long METOD_CHAR_IN_LONG (char * chr);
      char * METOD_LONG_IN_CHAR (long lon);
      AnsiString METOD_LONG_IN_ANSI (long lon);
      long METOD_ANSI_IN_LONG (AnsiString RT);
    private:
      AnsiString ST;
      long lon;
      char * chr;
  };
//------------------------------------------------------------------------------
long INTSTR::METOD_CHAR_IN_LONG (char * chr)
{
 return (atoi(chr));
};
//------------------------------------------------------------------------------
char * INTSTR::METOD_LONG_IN_CHAR (long lon)
{
 chr=""; //Инициализируем указатель на строку
 itoa(lon,chr,10);
 return (chr);
};
//------------------------------------------------------------------------------
AnsiString INTSTR::METOD_LONG_IN_ANSI (long lon)
{
 ST=lon;
 return (ST);
};
//------------------------------------------------------------------------------
long INTSTR::METOD_ANSI_IN_LONG (AnsiString RT)
{
 lon=StrToInt(RT);
 return (lon);
};
//------------------------------------------------------------------------------
//-----------------------Выполняем все преобразования---------------------------
//------------------------------------------------------------------------------
void __fastcall TForm1::Button1Click(TObject *Sender)
{
 //----------------------Преобразования первого класса--------------------------
 strin STR;
 AnsiString STI="";
 char * b="";
 STI=STR.METOD_CHAR_IN_ANSI(b); //Неявное преобразование ST=b
 b=STR.METOD_ANSI_IN_CHAR(STI); //Неявное преобразование b=ST
 //-----------------------Взаимное преобразование-------------------------------
 INTSTR INS;
 long LONG=0;
 b=INS.METOD_LONG_IN_CHAR(LONG);
 LONG=INS.METOD_CHAR_IN_LONG(b);
 STI=INS.METOD_LONG_IN_ANSI(LONG);
 LONG=INS.METOD_ANSI_IN_LONG(STI);
}
//---------------------------------END------------------------------------------
