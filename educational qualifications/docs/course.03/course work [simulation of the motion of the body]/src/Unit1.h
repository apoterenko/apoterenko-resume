#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <ExtCtrls.hpp>
#include <Graphics.hpp>
#include <ComCtrls.hpp>
class TForm1 : public TForm
{
__published:	// IDE-managed Components
        TImage *Image1;
        TGroupBox *GroupBox1;
        TLabel *Label1;
        TEdit *Edit1;
        TUpDown *UpDown1;
        TLabel *Label2;
        TEdit *Edit2;
        TLabel *Label3;
        TEdit *Edit3;
        TButton *Button1;
        TGroupBox *GroupBox2;
        TLabel *Label4;
        TLabel *Label5;
        TLabel *Label6;
        TEdit *Edit4;
        TLabel *Label7;
        TLabel *Label8;
        TEdit *Edit5;
        TEdit *Edit6;
        TImage *Image2;
        TImage *Image3;
        TTimer *Timer1;
        TImage *Image4;
        TImage *Image5;
        TImage *Image6;
        TImage *Image7;
        TImage *Image8;
        TImage *Image9;
        TImage *Image10;
        TImage *Image11;
        TImage *Image12;
        TImage *Image13;
        TImage *Image14;
        TLabel *Label9;
        TEdit *Edit9;
        TEdit *Edit8;
        TEdit *Edit7;
        TLabel *Label10;
        TLabel *Label11;
        TEdit *Edit10;
        TEdit *Edit11;
        TLabel *Label12;
        TEdit *Edit12;
        TTimer *Timer2;
        TLabel *Label13;
        TEdit *Edit13;
        TImage *Image15;
        TImage *Image16;
        TImage *Image17;
        TImage *Image18;
        TImage *Image19;
        TTimer *Timer3;
        TCheckBox *CheckBox1;
        void __fastcall FormCreate(TObject *Sender);
        void __fastcall Timer1Timer(TObject *Sender);
        void __fastcall UpDown1ChangingEx(TObject *Sender,
          bool &AllowChange, short NewValue, TUpDownDirection Direction);
        void __fastcall Button1Click(TObject *Sender);
        void __fastcall Timer2Timer(TObject *Sender);
        void __fastcall Edit5Change(TObject *Sender);
        void __fastcall Edit6Change(TObject *Sender);
        void __fastcall Timer3Timer(TObject *Sender);
private:	// User declarations
public:		// User declarations
        __fastcall TForm1(TComponent* Owner);
        float T;
        float x,xo;
        float y,yo;
        float g;
        float t;
        float vo;
        int a;
        int kc;
        float vv;
        float m;
        int VETER;
};
extern PACKAGE TForm1 *Form1;

