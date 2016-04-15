//---------------------------------------------------------------------------

#ifndef Unit3H
#define Unit3H
//---------------------------------------------------------------------------
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include "SHDocVw_OCX.h"
#include <OleCtrls.hpp>
#include <ComCtrls.hpp>
//---------------------------------------------------------------------------
class TForm3 : public TForm
{
__published:	// IDE-managed Components
        TGroupBox *GroupBox1;
        TGroupBox *GroupBox2;
        TGroupBox *GroupBox3;
        TGroupBox *GroupBox4;
        TGroupBox *GroupBox8;
        TRadioButton *RadioButton6;
        TRadioButton *RadioButton7;
        TGroupBox *GroupBox9;
        TRadioButton *RadioButton8;
        TRadioButton *RadioButton9;
        TGroupBox *GroupBox10;
        TLabel *Label1;
        TRadioButton *RadioButton10;
        TRadioButton *RadioButton11;
        TComboBox *ComboBox5;
        TGroupBox *GroupBox11;
        TLabel *Label2;
        TRadioButton *RadioButton14;
        TComboBox *ComboBox6;
        TButton *Button1;
        TButton *Button2;
        TButton *Button3;
        TEdit *Edit1;
        TLabel *Label13;
        TLabel *Label14;
        TEdit *Edit2;
        TLabel *Label15;
        TEdit *Edit3;
        TRadioButton *RadioButton13;
        TEdit *Edit4;
        TLabel *Label3;
        void __fastcall Button2Click(TObject *Sender);
        void __fastcall RadioButton6Click(TObject *Sender);
        void __fastcall RadioButton7Click(TObject *Sender);
        void __fastcall RadioButton8Click(TObject *Sender);
        void __fastcall RadioButton9Click(TObject *Sender);
        void __fastcall Button3Click(TObject *Sender);
        void __fastcall Button1Click(TObject *Sender);
private:	// User declarations
public:		// User declarations
        __fastcall TForm3(TComponent* Owner);
};
//---------------------------------------------------------------------------
extern PACKAGE TForm3 *Form3;
//---------------------------------------------------------------------------
#endif
