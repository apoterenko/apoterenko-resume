unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ComCtrls, DB, ADODB, StdCtrls, Grids, DBGrids, frxClass,
  frxDBSet, IBQuery, IBCustomDataSet, IBTable, IBDatabase, IBStoredProc;

type
  TForm1 = class(TForm)
    GroupBox1: TGroupBox;
    PageControl1: TPageControl;
    TabSheet1: TTabSheet;
    TabSheet2: TTabSheet;
    TabSheet3: TTabSheet;
    DBGrid1: TDBGrid;
    Label1: TLabel;
    Label2: TLabel;
    DBGrid2: TDBGrid;
    DBGrid3: TDBGrid;
    DBGrid4: TDBGrid;
    Label3: TLabel;
    Label4: TLabel;
    Button2: TButton;
    Label5: TLabel;
    Edit1: TEdit;
    Button5: TButton;
    PageControl2: TPageControl;
    TabSheet4: TTabSheet;
    TabSheet5: TTabSheet;
    TabSheet6: TTabSheet;
    TabSheet7: TTabSheet;
    DataSource1: TDataSource;
    DataSource2: TDataSource;
    DataSource3: TDataSource;
    DataSource4: TDataSource;
    frxDBDataset1: TfrxDBDataset;
    Label6: TLabel;
    Edit2: TEdit;
    Label7: TLabel;
    Label8: TLabel;
    Label9: TLabel;
    Label10: TLabel;
    Label11: TLabel;
    Label12: TLabel;
    Button1: TButton;
    ComboBox1: TComboBox;
    Edit3: TEdit;
    Edit4: TEdit;
    Edit5: TEdit;
    Edit6: TEdit;
    Edit7: TEdit;
    Label13: TLabel;
    ComboBox2: TComboBox;
    Button3: TButton;
    Label14: TLabel;
    Edit8: TEdit;
    Label15: TLabel;
    Edit9: TEdit;
    Button4: TButton;
    Label16: TLabel;
    ComboBox3: TComboBox;
    Button6: TButton;
    Label17: TLabel;
    Label18: TLabel;
    Label19: TLabel;
    Label20: TLabel;
    Label21: TLabel;
    Label22: TLabel;
    ComboBox4: TComboBox;
    Edit10: TEdit;
    Edit11: TEdit;
    Edit12: TEdit;
    Edit13: TEdit;
    Edit14: TEdit;
    Button7: TButton;
    Label23: TLabel;
    ComboBox5: TComboBox;
    Button8: TButton;
    Label24: TLabel;
    Label25: TLabel;
    ComboBox6: TComboBox;
    ComboBox7: TComboBox;
    Button9: TButton;
    TabSheet8: TTabSheet;
    DBGrid5: TDBGrid;
    DBGrid6: TDBGrid;
    DBGrid7: TDBGrid;
    DBGrid8: TDBGrid;
    Label26: TLabel;
    Label27: TLabel;
    Label28: TLabel;
    Label29: TLabel;
    DataSource5: TDataSource;
    DataSource6: TDataSource;
    DataSource7: TDataSource;
    DataSource8: TDataSource;
    IBDatabase1: TIBDatabase;
    IBTransaction1: TIBTransaction;
    IBTable1: TIBTable;
    IBTable2: TIBTable;
    IBTable3: TIBTable;
    IBTable4: TIBTable;
    IBQuery1: TIBQuery;
    IBTable5: TIBTable;
    IBTable6: TIBTable;
    IBTable7: TIBTable;
    IBTable8: TIBTable;
    IBQuery2: TIBQuery;
    IBQuery3: TIBQuery;
    IBQuery4: TIBQuery;
    IBQuery5: TIBQuery;
    IBQuery6: TIBQuery;
    IBStoredProc1: TIBStoredProc;
    frxReport1: TfrxReport;
    procedure Button5Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure ComboBox2Enter(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure ComboBox3Enter(Sender: TObject);
    procedure Button6Click(Sender: TObject);
    procedure ComboBox4Enter(Sender: TObject);
    procedure ComboBox5Enter(Sender: TObject);
    procedure Button7Click(Sender: TObject);
    procedure Button8Click(Sender: TObject);
    procedure Button9Click(Sender: TObject);
    procedure ComboBox6Enter(Sender: TObject);
    procedure ComboBox7Enter(Sender: TObject);
    procedure FormCreate(Sender: TObject);
  public
    procedure COMBO(Q: TIBQuery;C: TComboBox; S: AnsiString;S1: AnsiString);
    procedure REFRESH;
    function  SQL(S: AnsiString; S1: AnsiString): INTEGER;
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}
////////////////////////OBNOVLENIE//////////////////////////////////////////////
procedure TForm1.REFRESH;
begin
  Form1.IBTable1.Active:=false;
  Form1.IBTable2.Active:=false;
  Form1.IBTable3.Active:=false;
  Form1.IBTable4.Active:=false;
  Form1.IBTable5.Active:=false;
  Form1.IBTable6.Active:=false;
  Form1.IBTable7.Active:=false;
  Form1.IBTable8.Active:=false;
  Form1.IBTable1.Active:=true;
  Form1.IBTable2.Active:=true;
  Form1.IBTable3.Active:=true;
  Form1.IBTable4.Active:=true;
  Form1.IBTable5.Active:=true;
  Form1.IBTable6.Active:=true;
  Form1.IBTable7.Active:=true;
  Form1.IBTable8.Active:=true;
end;
////////////////////////////////////////////////////////////////////////////////
function TForm1.SQL(S: AnsiString;S1: AnsiString): INTEGER;
begin
  Form1.IBQuery3.SQL.Clear;
  Form1.IBQuery3.SQL.Add('select * from '+S);     
  Form1.IBQuery3.Active:=false;
  Form1.IBQuery3.Active:=true;
  if Form1.IBQuery3.RecordCount=0 then SQL:=1
   else
     begin
       Form1.IBStoredProc1.StoredProcName:=S1;
       Form1.IBStoredProc1.Params.Clear;
       Form1.IBStoredProc1.Params.Add;
       Form1.IBStoredProc1.Params[0].DataType:=ftInteger;
       Form1.IBStoredProc1.Params[0].ParamType:=ptOutput;
       Form1.IBStoredProc1.ExecProc;
       SQL:=Form1.IBStoredProc1.Params[0].Value+1;
     end;
end;
////////////////////////////////////////////////////////////////////////////////
/////////////SOEDINENIE S BD////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button5Click(Sender: TObject);
begin
try
 if Edit1.Text='' then exit;
 Form1.IBDatabase1.Connected:=false;
 Form1.IBTransaction1.Active:=false;
 Form1.IBDatabase1.DatabaseName:=Edit1.Text;
 Form1.IBDatabase1.Params.Add('user_name=SYSDBA');
 Form1.IBDatabase1.Params.Add('password=masterkey');
 Form1.IBDatabase1.LoginPrompt:=false;
 Form1.IBDatabase1.Connected:=true;
 Form1.IBTransaction1.Active:=true;
 Form1.IBTable1.TableName:='NAMEAV';
 Form1.IBTable2.TableName:='AVTORI';
 Form1.IBTable3.TableName:='NAME';
 Form1.IBTable4.TableName:='IZDATELI';
 Form1.IBTable5.TableName:='AVTORI';
 Form1.IBTable6.TableName:='IZDATELI';
 Form1.IBTable7.TableName:='NAME';
 Form1.IBTable8.TableName:='NAMEAV';
 try
  Form1.IBTable1.Active:=true;
  Form1.IBTable2.Active:=true;
  Form1.IBTable3.Active:=true;
  Form1.IBTable4.Active:=true;
  Form1.IBTable5.Active:=true;
  Form1.IBTable6.Active:=true;
  Form1.IBTable7.Active:=true;
  Form1.IBTable8.Active:=true;
  //////////////////////////////
  Button1.Enabled:=true;
  Button2.Enabled:=true;
  Button3.Enabled:=true;
  Button4.Enabled:=true;
  Button6.Enabled:=true;
  Button7.Enabled:=true;
  Button8.Enabled:=true;
  Button9.Enabled:=true;
  ComboBox1.Enabled:=true;
  ComboBox2.Enabled:=true;
  ComboBox3.Enabled:=true;
  ComboBox4.Enabled:=true;
  ComboBox5.Enabled:=true;
  ComboBox6.Enabled:=true;
  ComboBox7.Enabled:=true;
 except end;
except
  ShowMessage('Ne mogu soedinitsa s BD!');
  Button1.Enabled:=false;
  Button2.Enabled:=false;
  Button3.Enabled:=false;
  Button4.Enabled:=false;
  Button6.Enabled:=false;
  Button7.Enabled:=false;
  Button8.Enabled:=false;
  Button9.Enabled:=false;
  ComboBox1.Enabled:=false;
  ComboBox2.Enabled:=false;
  ComboBox3.Enabled:=false;
  ComboBox4.Enabled:=false;
  ComboBox5.Enabled:=false;
  ComboBox6.Enabled:=false;
  ComboBox7.Enabled:=false;
end;
end;
/////////////////////////////OTCHET/////////////////////////////////////////////
procedure TForm1.Button2Click(Sender: TObject);
begin
 Form1.IBTransaction1.Commit;
 Form1.frxReport1.LoadFromFile('O1.fr3',true);
 Form1.frxReport1.ShowReport(true);
end;
////////////////////////////////////////////////////////////////////////////////
//////////////DOBAVLENIE AVTOROV////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button1Click(Sender: TObject);
var i:integer;
begin
  if (Edit2.Text='')or(Edit3.Text='')or(Edit4.Text='')or(Edit5.Text='')
   or(Edit6.Text='')or(Edit7.Text='')or(Combobox1.Text='')
    then exit;
  Form1.IBQuery2.Params[0].Value:=Form1.SQL('AVTORI','GET_KOD_AVT');
  Form1.IBQuery2.Params[1].Value:=Edit2.Text;
  Form1.IBQuery2.Params[2].Value:=Edit3.Text;
  Form1.IBQuery2.Params[3].Value:=Edit4.Text;
  Form1.IBQuery2.Params[4].Value:=StrToInt(Edit5.Text);
  Form1.IBQuery2.Params[5].Value:=Edit6.Text;
  Form1.IBQuery2.Params[6].Value:=StrToInt(Edit7.Text);
  Form1.IBQuery2.Params[7].Value:=StrToInt(ComboBox1.Text);
  Form1.IBQuery2.ExecSQL;
  ///////////////////////////
  ShowMessage('OK!');
  Edit2.Text:='';
  Edit3.Text:='';
  Edit4.Text:='';
  Edit5.Text:='';
  Edit6.Text:='';
  Edit7.Text:='';
  ComboBox1.Text:='';
  REFRESH;
end;
////////////////////////////////////////////////////////////////////////////////
//////////UDALENIE PO KODU AVTORA///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button3Click(Sender: TObject);
begin
  if ComboBox2.Text='' then exit;
  ////////////////UDALENIE V NAME///////////////////////////////////////////////
  Form1.IBQuery3.SQL.Clear;
  Form1.IBQuery3.SQL.Add('delete from NAME where Kod_NAZV IN (select KOD_NAME from NAMEAV where KOD_AVT=:I1)');
  Form1.IBQuery3.Params.Clear;
  Form1.IBQuery3.Params.Add;
  Form1.IBQuery3.Params[0].DataType:=ftInteger;
  Form1.IBQuery3.Params[0].ParamType:=ptInput;
  Form1.IBQuery3.Params[0].Value:=StrToInt(Form1.ComboBox2.Text);
  Form1.IBQuery3.ExecSQL;
  //////////////UDALENIE V NAMEAVT//////////////////////////////////////////////
  Form1.IBQuery3.SQL.Clear;
  Form1.IBQuery3.SQL.Add('delete from NAMEAV where KOD_AVT=:I1');
  Form1.IBQuery3.Params.Clear;
  Form1.IBQuery3.Params.Add;
  Form1.IBQuery3.Params[0].DataType:=ftInteger;
  Form1.IBQuery3.Params[0].ParamType:=ptInput;
  Form1.IBQuery3.Params[0].Value:=StrToInt(Form1.ComboBox2.Text);
  Form1.IBQuery3.ExecSQL;
  //////////////UDALENIE V AVTORI///////////////////////////////////////////////
  Form1.IBQuery3.SQL.Clear;
  Form1.IBQuery3.SQL.Add('delete from Avtori where KOD_AVTOR=:I1');
  Form1.IBQuery3.Params.Clear;
  Form1.IBQuery3.Params.Add;
  Form1.IBQuery3.Params[0].DataType:=ftInteger;
  Form1.IBQuery3.Params[0].ParamType:=ptInput;
  Form1.IBQuery3.Params[0].Value:=StrToInt(Form1.ComboBox2.Text);
  Form1.IBQuery3.ExecSQL;
  //////////////////////////
  ShowMessage('OK!');
  ComboBox2.Text:='';
  REFRESH;
end;
//////////////////DOPOLNITELNAA PROCEDURA///////////////////////////////////////
procedure TForm1.COMBO(Q: TIBQuery;C: TComboBox; S: AnsiString; S1: AnsiString);
begin
  C.Clear();
  Q.Active:=false;
  Q.SQL.Clear();
  Q.SQL.Add(S);
  Q.Active:=true;
  Q.First();
  while (Q.Eof=false) do
   begin
     C.Items.Add(Q.FieldByName(S1).Value);
     Q.Next();
   end;
end;
////////////////////////////////////////////////////////////////////////////////
/////////AVTOMATICHESKOE ZAPOLNENIE POLEY COMBOBOX//////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.ComboBox2Enter(Sender: TObject);
begin
 Form1.COMBO(Form1.IBQuery3,Form1.ComboBox2,
               'SELECT KOD_AVTOR FROM Avtori',
               'KOD_AVTOR');
end;
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.ComboBox3Enter(Sender: TObject);
begin
 Form1.COMBO(Form1.IBQuery3,Form1.ComboBox3,
               'SELECT KOD_IZD FROM IZDATELI',
               'KOD_IZD');
end;
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.ComboBox4Enter(Sender: TObject);
begin
 Form1.COMBO(Form1.IBQuery3,Form1.ComboBox4,
               'SELECT KOD_IZD FROM IZDATELI',
               'KOD_IZD');
end;
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.ComboBox5Enter(Sender: TObject);
begin
 Form1.COMBO(Form1.IBQuery3,Form1.ComboBox5,
               'SELECT Kod_NAZV FROM NAME',
               'Kod_NAZV');
end;
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.ComboBox6Enter(Sender: TObject);
begin
  Form1.COMBO(Form1.IBQuery3,Form1.ComboBox6,
               'SELECT KOD_AVTOR FROM AVTORI',
               'KOD_AVTOR');
end;
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.ComboBox7Enter(Sender: TObject);
begin
  Form1.COMBO(Form1.IBQuery3,Form1.ComboBox7,
               'SELECT Kod_NAZV FROM NAME',
               'Kod_NAZV');
end;
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////DOBAVLENIE IZDATELSTV//////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button4Click(Sender: TObject);
begin
  if (Edit8.Text='')or(Edit9.Text='') then exit;
  Form1.IBQuery4.Params[0].Value:=Form1.SQL('IZDATELI','GET_KOD_IZD');
  Form1.IBQuery4.Params[1].Value:=Edit8.Text;
  Form1.IBQuery4.Params[2].Value:=Edit9.Text;
  Form1.IBQuery4.ExecSQL;
  ///////////////////////////
  ShowMessage('OK!');
  Edit8.Text:='';
  Edit9.Text:='';
  REFRESH;
end;
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////UDALENIE IZDATELSTV////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button6Click(Sender: TObject);
begin
  if ComboBox3.Text='' then exit;
  //////////////UDALENIE V NAMEAVT//////////////////////////////////////////////
  Form1.IBQuery3.SQL.Clear;
  Form1.IBQuery3.SQL.Add('delete from NAMEAV where KOD_NAME IN (select Kod_NAZV from NAME where KOD_IZD=:I1)');
  Form1.IBQuery3.Params.Clear;
  Form1.IBQuery3.Params.Add;
  Form1.IBQuery3.Params[0].DataType:=ftInteger;
  Form1.IBQuery3.Params[0].ParamType:=ptInput;
  Form1.IBQuery3.Params[0].Value:=StrToInt(Form1.ComboBox3.Text);
  Form1.IBQuery3.ExecSQL;
  ////////////////UDALENIE V NAME///////////////////////////////////////////////
  Form1.IBQuery3.SQL.Clear;
  Form1.IBQuery3.SQL.Add('delete from NAME where KOD_IZD=:I1');
  Form1.IBQuery3.Params.Clear;
  Form1.IBQuery3.Params.Add;
  Form1.IBQuery3.Params[0].DataType:=ftInteger;
  Form1.IBQuery3.Params[0].ParamType:=ptInput;
  Form1.IBQuery3.Params[0].Value:=StrToInt(Form1.ComboBox3.Text);
  Form1.IBQuery3.ExecSQL;
  //////////////UDALENIE V IZDATELI/////////////////////////////////////////////
  Form1.IBQuery3.SQL.Clear;
  Form1.IBQuery3.SQL.Add('delete from IZDATELI where KOD_IZD=:I1');
  Form1.IBQuery3.Params.Clear;
  Form1.IBQuery3.Params.Add;
  Form1.IBQuery3.Params[0].DataType:=ftInteger;
  Form1.IBQuery3.Params[0].ParamType:=ptInput;
  Form1.IBQuery3.Params[0].Value:=StrToInt(Form1.ComboBox3.Text);
  Form1.IBQuery3.ExecSQL;
  //////////////////////////
  ShowMessage('OK!');
  ComboBox3.Text:='';
  REFRESH;
end;
////////////////////////////////////////////////////////////////////////////////
///////////////////DOBAVLENIE NOVOI KNIGI///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button7Click(Sender: TObject);
begin
  if (Edit10.Text='')or(Edit11.Text='')or(Edit12.Text='')or(Edit13.Text='')
   or(Edit14.Text='')or(Combobox4.Text='')
    then exit;
  Form1.IBQuery5.Params[0].Value:=Form1.SQL('NAME','GET_KOD_NAME');
  Form1.IBQuery5.Params[1].Value:=Edit10.Text;
  Form1.IBQuery5.Params[2].Value:=Edit11.Text;
  Form1.IBQuery5.Params[3].Value:=StrToInt(ComboBox4.Text);
  Form1.IBQuery5.Params[4].Value:=StrToFloat(Edit12.Text);
  Form1.IBQuery5.Params[5].Value:=StrToInt(Edit13.Text);
  Form1.IBQuery5.Params[6].Value:=StrToDate(Edit14.Text);
  Form1.IBQuery5.ExecSQL;
  ///////////////////////////
  ShowMessage('OK!');
  Edit10.Text:='';
  Edit11.Text:='';
  Edit12.Text:='';
  Edit13.Text:='';
  Edit6.Text:='';
  Edit14.Text:='';
  ComboBox4.Text:='';
  REFRESH;
end;
////////////////////////////////////////////////////////////////////////////////
///////////////////////////UDALENIE KNIGI///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button8Click(Sender: TObject);
begin
  if ComboBox5.Text='' then exit;
  ////////////////UDALENIE V NAMEAVT////////////////////////////////////////////
  Form1.IBQuery3.SQL.Clear;
  Form1.IBQuery3.SQL.Add('delete from NAMEAV where KOD_NAME=:I');
  Form1.IBQuery3.Params.Clear;
  Form1.IBQuery3.Params.Add;
  Form1.IBQuery3.Params[0].DataType:=ftInteger;
  Form1.IBQuery3.Params[0].ParamType:=ptInput;
  Form1.IBQuery3.Params[0].Value:=StrToInt(Form1.ComboBox5.Text);
  Form1.IBQuery3.ExecSQL;
  //////////////UDALENIE V NAME/////////////////////////////////////////////////
  Form1.IBQuery3.SQL.Clear;
  Form1.IBQuery3.SQL.Add('delete from NAME where KOD_NAZV=:I1');
  Form1.IBQuery3.Params.Clear;
  Form1.IBQuery3.Params.Add;
  Form1.IBQuery3.Params[0].DataType:=ftInteger;
  Form1.IBQuery3.Params[0].ParamType:=ptInput;
  Form1.IBQuery3.Params[0].Value:=StrToInt(Form1.ComboBox5.Text);
  Form1.IBQuery3.ExecSQL;
  //////////////////////////
  ShowMessage('OK!');
  ComboBox5.Text:='';
  REFRESH;
end;
////////////////////////////////////////////////////////////////////////////////
///////////////////////DOBAVLENIE NAMEAV////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button9Click(Sender: TObject);
begin
  if (Combobox6.Text='')or(Combobox7.Text='') then exit;
  Form1.IBQuery6.Params[0].Value:=Form1.SQL('NAMEAV','GET_KOD_AV');
  Form1.IBQuery6.Params[1].Value:=StrToInt(ComboBox6.Text);
  Form1.IBQuery6.Params[2].Value:=StrToInt(ComboBox7.Text);
  Form1.IBQuery6.ExecSQL;
  ///////////////////////////
  ShowMessage('OK!');
  ComboBox6.Text:='';
  ComboBox7.Text:='';
  REFRESH;
end;
////////////////////////////END/////////////////////////////////////////////////
procedure TForm1.FormCreate(Sender: TObject);
begin
  Form1.Left:=153;
  Form1.Top:=83;
  Button1.Enabled:=false;
  Button2.Enabled:=false;
  Button3.Enabled:=false;
  Button4.Enabled:=false;
  Button6.Enabled:=false;
  Button7.Enabled:=false;
  Button8.Enabled:=false;
  Button9.Enabled:=false;
  ComboBox1.Enabled:=false;
  ComboBox2.Enabled:=false;
  ComboBox3.Enabled:=false;
  ComboBox4.Enabled:=false;
  ComboBox5.Enabled:=false;
  ComboBox6.Enabled:=false;
  ComboBox7.Enabled:=false;
end;
end.
