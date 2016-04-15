#include <vcl.h>
#include "Unit1.h"
#pragma hdrstop
#pragma package(smart_init)
#pragma link "frxClass"
#pragma link "frxDBSet"
#pragma resource "*.dfm"
TForm1 *Form1;
__fastcall TForm1::TForm1(TComponent* Owner):TForm(Owner){}
///////////////////Данные в COMBOBOX////////////////////////////////////////////
void TForm1::COMBO(TIBQuery *Q,TComboBox *C, AnsiString S, AnsiString S1)
{
  C->Clear();
  Q->Active=false;
  Q->SQL->Clear();
  Q->SQL->Add(S);
  Q->Active=true;
  Q->First();
  while (Q->Eof==false)
   {
     C->Items->Add(Q->FieldByName(S1)->Value);
     Q->Next();
   };
};
void __fastcall TForm1::ComboBox1Enter(TObject *Sender)
{
  Form1->COMBO(Form1->IBQuery4,Form1->ComboBox1,
               "SELECT ID FROM TABLE_PR_NUJD",
               "ID");
}
void __fastcall TForm1::ComboBox2Enter(TObject *Sender)
{
  Form1->COMBO(Form1->IBQuery4,Form1->ComboBox2,
               "SELECT ID FROM TABLE_PR_MUS",
               "ID");
}
void __fastcall TForm1::ComboBox6Enter(TObject *Sender)
{
   Form1->COMBO(Form1->IBQuery4,Form1->ComboBox6,
               "SELECT ID FROM TABLE_PR_NUJD",
               "ID");
}
///////////////Просмотр 3х таблиц///////////////////////////////////////////////
void TForm1::PROSMOTR(TIBQuery *Q,AnsiString S1)
{
  Q->Active=false;
  Q->SQL->Clear();
  Q->SQL->Add(S1);
  Q->Active=true;
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////////+Просмотр таблиц+////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button15Click(TObject *Sender)
{
 try
 {
 Form1->PROSMOTR(Form1->IBQuery1,
                 "SELECT ID,NAME_PR,ADRES,RAION,FIORUC FROM TABLE_PR_NUJD,TABLE_FIO WHERE TABLE_PR_NUJD.ID=KOD_PR");
 Form1->PROSMOTR(Form1->IBQuery2,
                 "SELECT * FROM TABLE_PR_MUS");
 Form1->PROSMOTR(Form1->IBQuery3,
                 "SELECT ID,ID1,GOD,V FROM TABLE_FACT");
 }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
}
//////////////////Установка соединения//////////////////////////////////////////
void __fastcall TForm1::Button16Click(TObject *Sender)
{
  Form1->IBDatabase1->Connected=false;
  Form1->IBDatabase1->DatabaseName=Edit26->Text;
  Form1->IBDatabase1->LoginPrompt=false;
  Form1->IBDatabase1->Params->Clear();
  Form1->IBDatabase1->Params->Add("user_name="+Edit20->Text);
  Form1->IBDatabase1->Params->Add("password="+Edit25->Text);
  Form1->IBDatabase1->Params->Add("lc_ctype=WIN1252");
  Form1->IBDatabase1->Connected=true;
  Form1->IBTransaction1->Active=true;
  //////////////////////////////////////////////////////////////////////////////
  if (Form1->IBDatabase1->Connected==true)
   {
    ShowMessage("Соединение установлено!");
    Button15->Enabled=true;
    Button17->Enabled=true;
    Button8->Enabled=true;
    Button1->Enabled=true;
    Button14->Enabled=true;
    Button2->Enabled=true;
    Button3->Enabled=true;
    Button4->Enabled=true;
    Button5->Enabled=true;
    Button19->Enabled=true;
    Button9->Enabled=true;
    Button10->Enabled=true;
    Button11->Enabled=true;
    Button12->Enabled=true;
    Form1->ComboBox1->Enabled=true;
    Form1->ComboBox2->Enabled=true;
    Form1->ComboBox3->Enabled=true;
    Form1->ComboBox4->Enabled=true;
    Form1->ComboBox5->Enabled=true;
    Form1->ComboBox6->Enabled=true;
    Button16->Enabled=false;
   }
  else
   ShowMessage("Не удалось установить соединение!");
}
////////////////////////////////////////////////////////////////////////////////
//////////////+Пользователь добавляет текущую запись+///////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button1Click(TObject *Sender)
{
if (ComboBox1->Text=="" ||ComboBox1->Text==""||ComboBox3->Text==""||
     ComboBox4->Text==""||Edit2->Text==""||Edit9->Text==""||Edit1->Text=="")
     {
       ShowMessage("Вы не до конца заполнили поля!");
       return;
     };
 try
 {
 StrToInt(Edit1->Text);
 StrToInt(Edit9->Text);
 Form1->IBStoredProc1->StoredProcName="PROC_TEC";
 Form1->IBStoredProc1->Params->Clear();
 Form1->PARAMM(Form1->IBStoredProc1,"P_ID1",ftInteger,ptInput,Form1->ComboBox2->Text,0);
 Form1->PARAMM(Form1->IBStoredProc1,"P_ID2",ftInteger,ptInput,Form1->ComboBox1->Text,1);
 Form1->PARAMM(Form1->IBStoredProc1,"P_KOL_M3",ftInteger,ptInput,Edit1->Text,2);
 Form1->PARAMM(Form1->IBStoredProc1,"P_CHISLO",ftInteger,ptInput,Form1->ComboBox3->Text,3);
 Form1->PARAMM(Form1->IBStoredProc1,"P_MESAC",ftInteger,ptInput,Form1->ComboBox4->Text,4);
 Form1->PARAMM(Form1->IBStoredProc1,"P_KOL_M3_ZAPL",ftInteger,ptInput,Edit9->Text,5);
 try
  {
   Form1->IBStoredProc1->ExecProc();
   Form1->IBTransaction1->Commit();
  }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
 }
 catch (...)
 {
   ShowMessage("Неверно заполнили поля!");
 }         
}
////////////////////////////////////////////////////////////////////////////////
//////////////////////////+Устанавливаем текущий год+///////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button19Click(TObject *Sender)
{
try
{
 Form1->IBStoredProc1->StoredProcName="PROC_GOD";
 Form1->IBStoredProc1->Params->Clear();
 Form1->PARAMM(Form1->IBStoredProc1,"P_GOD",ftInteger,ptInput,Form1->UpDown1->Position,0);
 Form1->IBStoredProc1->ExecProc();
 Form1->IBTransaction1->Commit();
}
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////+Предприятия, вывозящее мусор - добавление+//////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button3Click(TObject *Sender)
{
try
{
 if (Edit7->Text=="")
  {
   ShowMessage("Пустое поле!");
   return;
  }
 StrToFloat(Edit8->Text);   
 Form1->IBStoredProc1->StoredProcName="PROC_NEW_MUS";
 Form1->IBStoredProc1->Params->Clear();
 Form1->PARAMM(Form1->IBStoredProc1,"NAME_PR",ftString,ptInput,Edit7->Text,0);
 Form1->PARAMM(Form1->IBStoredProc1,"CENA_M3",ftFloat,ptInput,Edit8->Text,1);
 try
  {
   Form1->IBStoredProc1->ExecProc();
   Form1->IBTransaction1->Commit();
  }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие - нарушение уникальности!");
  };
}
catch (...)
{
 ShowMessage("Введите данные правильно!");
}
}
////////////////////////////////////////////////////////////////////////////////
////////////+Предприятия, откуда увозят мусор - добавление+/////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button2Click(TObject *Sender)
{
 if (Edit3->Text=="" || Edit4->Text=="" || Edit5->Text=="" ||Edit6->Text=="")
  {
    ShowMessage("Заполните поля!");
    return;
  };
 Form1->IBStoredProc1->StoredProcName="PROC_PR_NUJD";
 Form1->IBStoredProc1->Params->Clear();
 Form1->PARAMM(Form1->IBStoredProc1,"P_NAME_PR",ftString,ptInput,Edit3->Text,0);
 Form1->PARAMM(Form1->IBStoredProc1,"P_ADRES",ftString,ptInput,Edit5->Text,1);
 Form1->PARAMM(Form1->IBStoredProc1,"P_RAION",ftString,ptInput,Edit4->Text,2);
 Form1->PARAMM(Form1->IBStoredProc1,"P_FIO",ftString,ptInput,Edit6->Text,3);
 try
  {
   Form1->IBStoredProc1->ExecProc();
   Form1->IBTransaction1->Commit();
  }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };     
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////+Считывание кодов предприятий+/////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::ComboBox5Enter(TObject *Sender)
{
  Form1->COMBO(Form1->IBQuery4,Form1->ComboBox5,
               "SELECT ID FROM TABLE_PR_NUJD",
               "ID");
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////+Добавление сведений о мусоре+/////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button4Click(TObject *Sender)
{
try
{
 int MUS=StrToInt(Edit10->Text);
 if (MUS<=0)
  {
    ShowMessage("Поле отрицательно!");
    return;
  };
 if (Form1->ComboBox5->Text=="")
  {
    ShowMessage("Выберете код предприятия!");
    return;
  };
 Form1->IBStoredProc1->StoredProcName="PROC_FACT";
 Form1->IBStoredProc1->Params->Clear();
 Form1->PARAMM(Form1->IBStoredProc1,"P_ID1",ftInteger,ptInput,Form1->ComboBox5->Text,0);
 Form1->PARAMM(Form1->IBStoredProc1,"P_GOD",ftInteger,ptInput,Edit11->Text,1);
 Form1->PARAMM(Form1->IBStoredProc1,"P_V",ftInteger,ptInput,Edit10->Text,2);
 try
  {
   Form1->IBStoredProc1->ExecProc();
   Form1->IBTransaction1->Commit();
  }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
}
catch (...)
{
 ShowMessage("Вводите правильно!");
}      
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////+Добавление параметров+////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void TForm1::PARAMM(TIBStoredProc * IBP,AnsiString S,TFieldType DT,TParamType PT,String VA,int i)
{
 Form1->IBStoredProc1->Params->Add();
 Form1->IBStoredProc1->Params->Items[i]->Name=S;
 Form1->IBStoredProc1->Params->Items[i]->DataType=DT;
 Form1->IBStoredProc1->Params->Items[i]->ParamType=PT;
 Form1->IBStoredProc1->Params->Items[i]->Value=VA;
};
////////////////////////////////////////////////////////////////////////////////
/////////////////////+Выполняем подсчет на конец года+//////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button5Click(TObject *Sender)
{
 Form1->IBStoredProc1->StoredProcName="PROC_END_GOD";
 Form1->IBStoredProc1->Params->Clear();
 Form1->PARAMM(Form1->IBStoredProc1,"P_END_GOD",ftInteger,ptInput,Edit13->Text,0);
 try
  {
   Form1->IBStoredProc1->ExecProc();
  }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
}
////////////////////////////////////////////////////////////////////////////////
//////////+Отчет по предприятиям, нуждающихся в вывозе мусора+//////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button11Click(TObject *Sender)
{
 try
 {
 Form1->frxDBDataset1->DataSet=IBQuery5;
 Form1->IBQuery5->Active=false;
 Form1->IBQuery5->Active=true;
 Form1->frxReport1->LoadFromFile("REP2.fr3",true);
 Form1->frxReport1->ShowReport(true);
 }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////+РАЗЪЕДИНЯЕМСЯ С БД+////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button17Click(TObject *Sender)
{
  Form1->IBDatabase1->Connected=false;
  Form1->IBTransaction1->Active=false;
   Button15->Enabled=false;
   Button17->Enabled=false;
   Button8->Enabled=false;
   Button1->Enabled=false;
   Button14->Enabled=false;
   Button2->Enabled=false;
   Button3->Enabled=false;
   Button4->Enabled=false;
   Button5->Enabled=false;
   Button19->Enabled=false;
   Button9->Enabled=false;
   Button10->Enabled=false;
   Button11->Enabled=false;
   Button12->Enabled=false;
   Form1->ComboBox1->Enabled=false;
   Form1->ComboBox2->Enabled=false;
   Form1->ComboBox3->Enabled=false;
   Form1->ComboBox4->Enabled=false;
   Form1->ComboBox5->Enabled=false;
   Form1->ComboBox6->Enabled=false;
   Button16->Enabled=true;
}
////////////////////////////////////////////////////////////////////////////////
//////////+Отчет по предприятиям, вывозящих мусор+//////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button10Click(TObject *Sender)
{
 try
 {
 Form1->frxDBDataset1->DataSet=IBQuery6;
 Form1->IBQuery6->Active=false;
 Form1->IBQuery6->Active=true;
 Form1->frxReport1->LoadFromFile("REP1.fr3",true);
 Form1->frxReport1->ShowReport(true);
 }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
}
////////////////////////////////////////////////////////////////////////////////
/////////////////+Отчет по вывозу мусора по годам+//////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button12Click(TObject *Sender)
{
 try
 {
 Form1->frxDBDataset1->DataSet=IBQuery7;
 Form1->IBQuery7->Active=false;
 Form1->IBQuery7->Active=true;
 Form1->frxReport1->LoadFromFile("REP3.fr3",true);
 Form1->frxReport1->ShowReport(true);
 }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
}
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::UpDown1Click(TObject *Sender, TUDBtnType Button)
{
    Edit11->Text=Edit12->Text;
    Edit13->Text=Edit12->Text;
}
////////////////////////////////////////////////////////////////////////////////
/////////////////+Пользователь узнает текущий год+//////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button14Click(TObject *Sender)
{
 Form1->IBStoredProc1->StoredProcName="PROC_RETURN_GOD";
 Form1->IBStoredProc1->Params->Clear();
 Form1->IBStoredProc1->Params->Add();
 Form1->IBStoredProc1->Params->Items[0]->Name="P_GOD";
 Form1->IBStoredProc1->Params->Items[0]->DataType=ftInteger;
 Form1->IBStoredProc1->Params->Items[0]->ParamType=ptOutput;
 Form1->IBStoredProc1->ExecProc();
 Edit2->Text=Form1->IBStoredProc1->Params->Items[0]->Value;
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////+Просмотр задолжности+//////////////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button9Click(TObject *Sender)
{
try
{
 Form1->IBStoredProc1->StoredProcName="PROC_RETURN_ZA1";
 Form1->IBStoredProc1->Params->Clear();
 Form1->IBStoredProc1->Params->Add();
 Form1->IBStoredProc1->Params->Items[0]->Name="P_GOD";
 Form1->IBStoredProc1->Params->Items[0]->DataType=ftInteger;
 Form1->IBStoredProc1->Params->Items[0]->ParamType=ptInput;
 Form1->IBStoredProc1->Params->Items[0]->Value=Edit19->Text;
 Form1->IBStoredProc1->Params->Add();
 Form1->IBStoredProc1->Params->Items[1]->Name="P_KOD";
 Form1->IBStoredProc1->Params->Items[1]->DataType=ftInteger;
 Form1->IBStoredProc1->Params->Items[1]->ParamType=ptInput;
 Form1->IBStoredProc1->Params->Items[1]->Value=ComboBox6->Text;
 Form1->IBStoredProc1->Params->Add();
 Form1->IBStoredProc1->Params->Items[2]->Name="SUMI";
 Form1->IBStoredProc1->Params->Items[2]->DataType=ftFloat;
 Form1->IBStoredProc1->Params->Items[2]->ParamType=ptOutput;
 Form1->IBStoredProc1->ExecProc();
 Edit21->Text=Form1->IBStoredProc1->Params->Items[2]->Value;
}
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////+Добавить права пользователю+///////////////////////
////////////////////////////////////////////////////////////////////////////////
void __fastcall TForm1::Button8Click(TObject *Sender)
{
 try
  {
     Form1->IBQuery4->Active=false;
     Form1->IBQuery4->Params->Clear();
     Form1->IBQuery4->SQL->Clear();
     Form1->IBQuery4->SQL->Add("GRANT INSERT,SELECT ON TABLE_TEC TO "+Edit18->Text);
     Form1->IBQuery4->ExecSQL();
     Form1->IBQuery4->SQL->Clear();
     Form1->IBQuery4->SQL->Add("GRANT SELECT ON TABLE_PR_NUJD TO "+Edit18->Text);
     Form1->IBQuery4->ExecSQL();
     Form1->IBQuery4->SQL->Clear();
     Form1->IBQuery4->SQL->Add("GRANT SELECT ON TABLE_PR_MUS TO "+Edit18->Text);
     Form1->IBQuery4->ExecSQL();
     Form1->IBQuery4->SQL->Clear();
     Form1->IBQuery4->SQL->Add("GRANT SELECT ON TABLE_GOD TO "+Edit18->Text);
     Form1->IBQuery4->ExecSQL();
     Form1->IBQuery4->SQL->Clear();
     Form1->IBQuery4->SQL->Add("GRANT EXECUTE ON PROCEDURE PROC_RETURN_GOD TO "+Edit18->Text);
     Form1->IBQuery4->ExecSQL();
     Form1->IBQuery4->SQL->Clear();
     Form1->IBQuery4->SQL->Add("GRANT EXECUTE ON PROCEDURE PROC_TEC TO "+Edit18->Text);
     Form1->IBQuery4->ExecSQL();
     Form1->IBTransaction1->Commit();
  }
 catch (...)
  {
    ShowMessage("Невозможно выполнить действие!");
  };
}
/////////////////////Инициализация//////////////////////////////////////////////
void __fastcall TForm1::FormCreate(TObject *Sender)
{
   Form1->Top=133;
   Form1->Left=178;
   Button15->Enabled=false;
   Button17->Enabled=false;
   Button8->Enabled=false;
   Button1->Enabled=false;
   Button14->Enabled=false;
   Button2->Enabled=false;
   Button3->Enabled=false;
   Button4->Enabled=false;
   Button5->Enabled=false;
   Button19->Enabled=false;
   Button9->Enabled=false;
   Button10->Enabled=false;
   Button11->Enabled=false;
   Button12->Enabled=false;
   Form1->ComboBox1->Enabled=false;
   Form1->ComboBox2->Enabled=false;
   Form1->ComboBox3->Enabled=false;
   Form1->ComboBox4->Enabled=false;
   Form1->ComboBox5->Enabled=false;
   Form1->ComboBox6->Enabled=false;
}

