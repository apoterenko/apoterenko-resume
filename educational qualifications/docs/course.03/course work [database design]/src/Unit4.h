//---------------------------------------------------------------------------

#ifndef Unit4H
#define Unit4H
//---------------------------------------------------------------------------
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <Buttons.hpp>
#include <Mask.hpp>
//---------------------------------------------------------------------------
class TForm4 : public TForm
{
__published:	// IDE-managed Components
        TGroupBox *GroupBox1;
        TGroupBox *GroupBox4;
        TButton *Button4;
        TListBox *ListBox1;
        TLabel *Label4;
        TButton *Button5;
        TButton *Button6;
        TGroupBox *GroupBox5;
        TLabel *Label5;
        TButton *Button8;
        TListBox *ListBox2;
        TButton *Button9;
        TButton *Button10;
        TBitBtn *BitBtn1;
        TLabel *Label1;
        TEdit *Edit1;
        TEdit *Edit2;
        TGroupBox *GroupBox2;
        TLabel *Label2;
        TEdit *Edit3;
        TLabel *Label3;
        TEdit *Edit4;
        TGroupBox *GroupBox3;
        TButton *Button1;
        TLabel *Label6;
        TEdit *Edit5;
        void __fastcall Button5Click(TObject *Sender);
        void __fastcall Button6Click(TObject *Sender);
        void __fastcall Button4Click(TObject *Sender);
        void __fastcall Button8Click(TObject *Sender);
        void __fastcall Button9Click(TObject *Sender);
        void __fastcall Button10Click(TObject *Sender);
        void __fastcall BitBtn1Click(TObject *Sender);
        void __fastcall Button1Click(TObject *Sender);
private:	// User declarations
public:		// User declarations
        __fastcall TForm4(TComponent* Owner);
};
//---------------------------------------------------------------------------
extern PACKAGE TForm4 *Form4;
//---------------------------------------------------------------------------
#endif
