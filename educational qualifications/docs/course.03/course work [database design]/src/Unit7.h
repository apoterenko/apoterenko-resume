//---------------------------------------------------------------------------

#ifndef Unit7H
#define Unit7H
//---------------------------------------------------------------------------
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <ExtCtrls.hpp>
#include <Graphics.hpp>
#include <jpeg.hpp>
//---------------------------------------------------------------------------
class TForm7 : public TForm
{
__published:	// IDE-managed Components
        TScrollBox *ScrollBox1;
        TLabel *Label1;
        TLabel *Label2;
        TLabel *Label3;
        TScrollBox *ScrollBox2;
        TImage *Image1;
        TMemo *Memo1;
        TImage *Image2;
        TImage *Image3;
        TImage *Image4;
        TMemo *Memo2;
        TMemo *Memo3;
        TMemo *Memo4;
        TImage *Image5;
        TMemo *Memo5;
        TImage *Image6;
        TImage *Image7;
        TMemo *Memo6;
        TMemo *Memo7;
        TMemo *Memo8;
        TImage *Image8;
        TScrollBox *ScrollBox3;
        TMemo *Memo9;
        TImage *Image9;
        TMemo *Memo10;
        TImage *Image10;
        void __fastcall SELECT(TObject *Sender, TShiftState Shift, int X,
          int Y);
        void __fastcall SELECT1(TObject *Sender, TShiftState Shift, int X,
          int Y);
        void __fastcall MOUSE(TObject *Sender, TShiftState Shift, int X,
          int Y);
        void __fastcall Label2Click(TObject *Sender);
        void __fastcall Label3Click(TObject *Sender);
private:	// User declarations
public:		// User declarations
        __fastcall TForm7(TComponent* Owner);
};
//---------------------------------------------------------------------------
extern PACKAGE TForm7 *Form7;
//---------------------------------------------------------------------------
#endif
