//---------------------------------------------------------------------------

#ifndef Unit1H
#define Unit1H
//---------------------------------------------------------------------------
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <ADODB.hpp>
#include <ComCtrls.hpp>
#include <DB.hpp>
#include <DBGrids.hpp>
#include <Grids.hpp>
#include <IBCustomDataSet.hpp>
#include <IBDatabase.hpp>
#include <IBQuery.hpp>
#include <IBStoredProc.hpp>
#include "frxClass.hpp"
#include "frxDBSet.hpp"
//---------------------------------------------------------------------------
class TForm1 : public TForm
{
__published:	// IDE-managed Components
        TGroupBox *GroupBox1;
        TLabel *Label33;
        TEdit *Edit20;
        TLabel *Label34;
        TEdit *Edit25;
        TLabel *Label35;
        TEdit *Edit26;
        TButton *Button16;
        TButton *Button17;
        TGroupBox *GroupBox2;
        TPageControl *PageControl1;
        TTabSheet *TabSheet1;
        TLabel *Label30;
        TLabel *Label31;
        TLabel *Label32;
        TDBGrid *DBGrid2;
        TDBGrid *DBGrid3;
        TButton *Button15;
        TTabSheet *TabSheet2;
        TGroupBox *GroupBox9;
        TLabel *Label23;
        TEdit *Edit18;
        TButton *Button8;
        TTabSheet *TabSheet3;
        TPageControl *PageControl2;
        TTabSheet *TabSheet6;
        TLabel *Label1;
        TLabel *Label2;
        TLabel *Label3;
        TLabel *Label4;
        TLabel *Label5;
        TLabel *Label6;
        TLabel *Label13;
        TComboBox *ComboBox1;
        TComboBox *ComboBox2;
        TEdit *Edit1;
        TButton *Button1;
        TComboBox *ComboBox3;
        TComboBox *ComboBox4;
        TEdit *Edit2;
        TEdit *Edit9;
        TTabSheet *TabSheet7;
        TGroupBox *GroupBox3;
        TLabel *Label7;
        TLabel *Label8;
        TLabel *Label9;
        TLabel *Label10;
        TEdit *Edit3;
        TEdit *Edit4;
        TEdit *Edit5;
        TEdit *Edit6;
        TButton *Button2;
        TGroupBox *GroupBox4;
        TLabel *Label11;
        TLabel *Label12;
        TEdit *Edit7;
        TEdit *Edit8;
        TButton *Button3;
        TGroupBox *GroupBox5;
        TLabel *Label14;
        TLabel *Label15;
        TLabel *Label17;
        TButton *Button4;
        TComboBox *ComboBox5;
        TEdit *Edit10;
        TGroupBox *GroupBox6;
        TLabel *Label18;
        TEdit *Edit13;
        TButton *Button5;
        TTabSheet *TabSheet4;
        TButton *Button10;
        TButton *Button11;
        TButton *Button12;
        TTabSheet *TabSheet5;
        TGroupBox *GroupBox10;
        TLabel *Label24;
        TLabel *Label25;
        TLabel *Label26;
        TButton *Button9;
        TEdit *Edit21;
        TComboBox *ComboBox6;
        TEdit *Edit19;
        TUpDown *UpDown3;
        TIBTransaction *IBTransaction1;
        TDataSource *DataSource1;
        TDataSource *DataSource2;
        TDataSource *DataSource3;
        TIBQuery *IBQuery2;
        TIBQuery *IBQuery3;
        TIBQuery *IBQuery1;
        TIBDatabase *IBDatabase1;
        TDBGrid *DBGrid1;
        TIBQuery *IBQuery4;
        TIBStoredProc *IBStoredProc1;
        TGroupBox *GroupBox13;
        TEdit *Edit12;
        TUpDown *UpDown1;
        TButton *Button19;
        TEdit *Edit11;
        TfrxDBDataset *frxDBDataset1;
        TIBQuery *IBQuery5;
        TIBQuery *IBQuery6;
        TIBQuery *IBQuery7;
        TfrxReport *frxReport1;
        TButton *Button14;
        void __fastcall ComboBox1Enter(TObject *Sender);
        void __fastcall Button15Click(TObject *Sender);
        void __fastcall Button16Click(TObject *Sender);
        void __fastcall ComboBox2Enter(TObject *Sender);
        void __fastcall Button1Click(TObject *Sender);
        void __fastcall Button19Click(TObject *Sender);
        void __fastcall Button3Click(TObject *Sender);
        void __fastcall Button2Click(TObject *Sender);
        void __fastcall Button4Click(TObject *Sender);
        void __fastcall ComboBox5Enter(TObject *Sender);
        void __fastcall Button5Click(TObject *Sender);
        void __fastcall Button11Click(TObject *Sender);
        void __fastcall Button17Click(TObject *Sender);
        void __fastcall Button10Click(TObject *Sender);
        void __fastcall Button12Click(TObject *Sender);
        void __fastcall UpDown1Click(TObject *Sender, TUDBtnType Button);
        void __fastcall Button14Click(TObject *Sender);
        void __fastcall Button9Click(TObject *Sender);
        void __fastcall ComboBox6Enter(TObject *Sender);
        void __fastcall Button8Click(TObject *Sender);
        void __fastcall FormCreate(TObject *Sender);
private:
public:
        __fastcall TForm1(TComponent* Owner);
        void COMBO(TIBQuery *Q,TComboBox *C,AnsiString S, AnsiString S1);
        void PROSMOTR(TIBQuery *Q,AnsiString S1);
        void PARAMM(TIBStoredProc * IBP,AnsiString S,TFieldType DT,TParamType PT,String VA,int i);
};
//---------------------------------------------------------------------------
extern PACKAGE TForm1 *Form1;
//---------------------------------------------------------------------------
#endif
