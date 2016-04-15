unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, Grids, DBGrids, ADODB, StdCtrls, ExtCtrls, RpDefine, RpCon,
  RpConDS, RpRave;

type
  TForm1 = class(TForm)
    ADOConnection1: TADOConnection;
    ADOTable1: TADOTable;
    DataSource1: TDataSource;
    GroupBox1: TGroupBox;
    DBGrid1: TDBGrid;
    Button1: TButton;
    Label1: TLabel;
    Label2: TLabel;
    DBGrid2: TDBGrid;
    ADOTable2: TADOTable;
    DataSource2: TDataSource;
    ADOQuery1: TADOQuery;
    DataSource3: TDataSource;
    Button2: TButton;
    Button3: TButton;
    Button4: TButton;
    Button5: TButton;
    Label3: TLabel;
    Edit1: TEdit;
    Label4: TLabel;
    Label5: TLabel;
    Label6: TLabel;
    Edit2: TEdit;
    Edit3: TEdit;
    Edit4: TEdit;
    Edit5: TEdit;
    Label7: TLabel;
    Button6: TButton;
    Label8: TLabel;
    Edit6: TEdit;
    Button7: TButton;
    Label9: TLabel;
    Edit7: TEdit;
    Label10: TLabel;
    Edit8: TEdit;
    ADOStoredProc1: TADOStoredProc;
    ADOStoredProc2: TADOStoredProc;
    ADOStoredProc3: TADOStoredProc;
    Label11: TLabel;
    Edit9: TEdit;
    RvDataSetConnection1: TRvDataSetConnection;
    RvDataSetConnection2: TRvDataSetConnection;
    RvProject1: TRvProject;
    Button8: TButton;
    RvProject2: TRvProject;
    Button9: TButton;
    RvDataSetConnection3: TRvDataSetConnection;
    RvProject3: TRvProject;
    Button10: TButton;
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Button6Click(Sender: TObject);
    procedure Button5Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure Button7Click(Sender: TObject);
    procedure Button8Click(Sender: TObject);
    procedure Button9Click(Sender: TObject);
    procedure Button10Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}
/////////////////////////Соединение/////////////////////////////////////////////
procedure TForm1.Button1Click(Sender: TObject);
begin
try
 Form1.ADOConnection1.LoginPrompt:=false;
 Form1.ADOConnection1.Connected:=true;
 Showmessage('Соединение с БД выполнено!!!');
except
 Showmessage('Ошибка соединения с БД!!!');
end;
end;
/////////////////Запрос по заданию//////////////////////////////////////////////
procedure TForm1.Button2Click(Sender: TObject);
begin
 Label1.Caption:='Запрос по заданию';
 Form1.DBGrid1.DataSource:=Form1.DataSource3;
 Form1.ADOQuery1.SQL.Text:=
  'SELECT TAB1_FIO,TAB1_DATA,TAB1_MESTO,TAB1_OCENKA '+
  'FROM TAB1 ORDER BY TAB1_OCENKA DESC';
 Form1.ADOQuery1.Active:=true;
end;
/////////////////////////Главный запрос/////////////////////////////////////////
procedure TForm1.Button3Click(Sender: TObject);
begin
 Form1.DBGrid1.DataSource:=Form1.DataSource1;
 Form1.ADOTable1.Active:=false;
 Form1.ADOTable2.Active:=false;
 Form1.ADOTable1.Active:=true;
 Form1.ADOTable2.Active:=true;
end;
////////////////////////Разрыв соединения///////////////////////////////////////
procedure TForm1.Button6Click(Sender: TObject);
begin
 Form1.ADOConnection1.Connected:=false;
 Form1.ADOTable1.Active:=false;
 Form1.ADOTable2.Active:=false;
end;
////////////////////////Удаление записи/////////////////////////////////////////
procedure TForm1.Button5Click(Sender: TObject);
begin
try
 Form1.ADOStoredProc2.Parameters.ParamByName('TAB1_ID').Value:=StrToInt(Edit7.Text);
 Form1.ADOStoredProc2.ExecProc;
 Showmessage('Удачное выполнение хранимой процедуры на сервере!!!');
 Form1.ADOTable1.Active:=false;
 Form1.ADOTable2.Active:=false;
 Form1.ADOTable1.Active:=true;
 Form1.ADOTable2.Active:=true;
except
 Showmessage('Не удалось выполнить хранимую процедуру на сервере!!!');
end;
end;
//////////////////Добавить студента/////////////////////////////////////////////
procedure TForm1.Button4Click(Sender: TObject);
begin
try
 Form1.ADOStoredProc1.Parameters.ParamByName('TAB1_ID').Value:=StrToInt(Edit8.Text);
 Form1.ADOStoredProc1.Parameters.ParamByName('TAB1_FIO').Value:=Edit1.Text;
 Form1.ADOStoredProc1.Parameters.ParamByName('TAB1_DATA').Value:=StrToDate(Edit2.Text);
 Form1.ADOStoredProc1.Parameters.ParamByName('TAB1_MESTO').Value:=Edit3.Text;
 Form1.ADOStoredProc1.Parameters.ParamByName('TAB1_OCENKA').Value:=StrToInt(Edit4.Text);
 Form1.ADOStoredProc1.ExecProc;
 Showmessage('Удачное выполнение хранимой процедуры на сервере!!!');
 Form1.ADOTable1.Active:=false;
 Form1.ADOTable2.Active:=false;
 Form1.ADOTable1.Active:=true;
 Form1.ADOTable2.Active:=true;
except
 Showmessage('Не удалось выполнить хранимую процедуру на сервере!!!');
end;
end;
////////////////Добавить диплом для студента////////////////////////////////////
procedure TForm1.Button7Click(Sender: TObject);
begin
try
 Form1.ADOStoredProc3.Parameters.ParamByName('TAB2_ID').Value:=
  STRTOINT(Edit9.Text);
 Form1.ADOStoredProc3.Parameters.ParamByName('TAB2_KEYTAB1').Value:=
  STRTOINT(Edit5.Text);
 Form1.ADOStoredProc3.Parameters.ParamByName('TAB2_DIPLOM').Value:=
  STRTOINT(Edit6.Text);
 Form1.ADOStoredProc3.ExecProc;
 Showmessage('Удачное выполнение хранимой процедуры на сервере!!!');
 Form1.ADOTable1.Active:=false;
 Form1.ADOTable2.Active:=false;
 Form1.ADOTable1.Active:=true;
 Form1.ADOTable2.Active:=true;
except
 Showmessage('Не удалось выполнить хранимую процедуру на сервере!!!');
end;
end;
///////////////////////Отчет о работе///////////////////////////////////////////
procedure TForm1.Button8Click(Sender: TObject);
begin
try
 Form1.RvProject1.Execute; //Главная таблица
except
 Showmessage('Не удалось напечатать отчет!!!');
end;
end;
procedure TForm1.Button9Click(Sender: TObject);
begin
try
 Form1.RvProject2.Execute; //Подчиненная таблица
except
 Showmessage('Не удалось напечатать отчет!!!');
end;
end;
procedure TForm1.Button10Click(Sender: TObject);
begin
try
 Form1.RvProject3.Execute; //Запрос-отчет
except
 Showmessage('Не удалось напечатать отчет!!!');
end;
end;
end.
