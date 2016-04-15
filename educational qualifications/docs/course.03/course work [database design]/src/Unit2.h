//---------------------------------------------------------------------------

#ifndef Unit2H
#define Unit2H
//---------------------------------------------------------------------------
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
//---------------------------------------------------------------------------
class TForm2 : public TForm
{
__published:	// IDE-managed Components
        TGroupBox *GroupBox1;
        TLabel *Label1;
        TLabel *Label2;
        TEdit *Edit2;
        TLabel *Label3;
        TEdit *Edit3;
        TLabel *Label4;
        TEdit *Edit4;
        TLabel *Label5;
        TEdit *Edit5;
        TLabel *Label6;
        TEdit *Edit6;
        TLabel *Label7;
        TEdit *Edit7;
        TLabel *Label8;
        TLabel *Label9;
        TEdit *Edit9;
        TButton *Button1;
        TButton *Button2;
        TLabel *Label10;
        TEdit *Edit10;
        TComboBox *ComboBox1;
        TComboBox *ComboBox2;
        void __fastcall Button2Click(TObject *Sender);
        void __fastcall Button1Click(TObject *Sender);
private:	// User declarations
public:		// User declarations
        __fastcall TForm2(TComponent* Owner);
        boolean FORM2_FLAG; //Флаг - хочет ли пользователь добавить запись
};
//---------------------------------------------------------------------------
extern PACKAGE TForm2 *Form2;
//---------------------------------------------------------------------------
#endif
