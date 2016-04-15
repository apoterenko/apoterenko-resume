unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, Grids, ComCtrls, ExtCtrls, ActnList;

type
  TForm1 = class(TForm)
    PageControl1: TPageControl;
    TabSheet1: TTabSheet;
    TabSheet2: TTabSheet;
    TabSheet3: TTabSheet;
    ActionList1: TActionList;
    Action1: TAction;
    Action2: TAction;
    Action3: TAction;
    Action4: TAction;
    Action5: TAction;
    Action6: TAction;
    Action7: TAction;
    procedure FormCreate(Sender: TObject);
    procedure BEGIN1(Sender: TObject);
    procedure BEGIN2(Sender: TObject);
    procedure BEGIN3(Sender: TObject);
    procedure BEGIN4_VR(Sender: TObject);
    procedure BEGIN5_VR(Sender: TObject);
    procedure BEGIN6_PER(Sender: TObject);
    procedure BEGIN7_PER(Sender: TObject);

  private
    { Private declarations }
  public
    { Public declarations }
  end;

const
  n=16384;
var
  Form1: TForm1;
  i: word;
  mil,sec,delta,deltas: longint;
  Mas:array[1..n] of integer;
  //----------------------------------------------------------------------------
  NewPage: TTabSheet;
  NewPanel: TPanel;
  NewButton: TButton;
  NewGroupBox: TGroupBox;
  NewEdit1, NewEdit2, NewEdit3, NewEdit4, NewEdit5, NewEdit6: TEdit;
  NewEdit7, NewEdit8, NewEdit9, NewEdit10: TEdit;
  NewEdit11, NewEdit12, NewEdit13, NewEdit14: TEdit;
  NewEdit15, NewEdit16, NewEdit17, NewEdit18: TEdit;
  NewEdit19, NewEdit20, NewEdit21, NewEdit22: TEdit;
  NewEdit23, NewEdit24, NewEdit25, NewEdit26: TEdit;
  NSG: TStringGrid;
  NL: TLabel;
  GLT:TSystemTime;

implementation

{$R *.dfm}

procedure TForm1.FormCreate(Sender: TObject);
begin
   Form1.Top:=149;
   Form1.Left:=137;
   for i:=PageControl1.PageCount-1 downto 0 do PageControl1.Pages[i].Destroy;
   //---------------------------------------------------------------------------
   NewPage:=TTabSheet.Create(Self);
   NewPage.PageControl:=PageControl1;
   NewPage.Caption:='Режим демонстрации алгоритма сортировки';
   NewPanel:=TPanel.Create(Self);
   NewPanel.Color:=ClBlack;
   NewPanel.Width:=779;
   NewPanel.Height:=432;
   NewPanel.Parent:=NewPage;
   NewGroupBox:=TGroupBox.Create(Self);
   NewGroupBox.Top:=5;
   NewGroupBox.Left:=5;
   NewGroupBox.Caption:='Выбор типа сортировки';
   NewGroupBox.Color:=ClBlack;
   NewGroupBox.Font.Color:=ClLime;
   NewGroupBox.Width:=767;
   NewGroupBox.Height:=60;
   NewGroupBox.Parent:=NewPage;
   NewButton:=TButton.Create(Self);
   NewButton.Top:=30;
   NewButton.Left:=15;
   NewButton.Width:=125;
   NewButton.Height:=23;
   NewButton.Action:=Action1;
   NewButton.Parent:=NewPage;
   NewButton:=TButton.Create(Self);
   NewButton.Top:=30;
   NewButton.Left:=160;
   NewButton.Width:=190;
   NewButton.Height:=23;
   NewButton.Action:=Action2;
   NewButton.Parent:=NewPage;
   NewGroupBox:=TGroupBox.Create(Self);
   NewGroupBox.Top:=65;
   NewGroupBox.Left:=5;
   NewGroupBox.Caption:='Число элементов 2..20';
   NewGroupBox.Color:=ClBlack;
   NewGroupBox.Font.Color:=ClLime;
   NewGroupBox.Width:=767;
   NewGroupBox.Height:=60;
   NewGroupBox.Parent:=NewPage;
   NewEdit1:=TEdit.Create(Self);
   NewEdit1.Width:=125;
   NewEdit1.Height:=20;
   NewEdit1.Top:=90;
   NewEdit1.Left:=15;
   NewEdit1.Color:=ClBlack;
   NewEdit1.Font.Color:=ClLime;
   NewEdit1.Ctl3D:=true;
   NewEdit1.Parent:=NewPage;
   NewButton:=TButton.Create(Self);
   NewButton.Top:=130;
   NewButton.Left:=6;
   NewButton.Width:=170;
   NewButton.Height:=23;
   NewButton.Action:=Action3;
   NewButton.Parent:=NewPage;
   NSG:=TStringGrid.Create(Self);
   NSG.Top:=157;
   NSG.Left:=6;
   NSG.Width:=530;
   NSG.Height:=256;
   NSG.ColCount:=21;
   NSG.RowCount:=10;
   NSG.ScrollBars:=ssVertical;
   NSG.DefaultColWidth:=23;
   NSG.Parent:=NewPage;
   //---------------------------------------------------------------------------
   for i:=1 to n do 
    begin
     NSG.Cells[i,0]:=VarToStr(i);
    end;
   //---------------------------------------------------------------------------
   //---------------------------------------------------------------------------
   //---------------------------------------------------------------------------
   NewPage:=TTabSheet.Create(Self);
   NewPage.PageControl:=PageControl1;
   NewPage.Caption:='Время выполнение процедуры сортировки';
   NewPanel:=TPanel.Create(Self);
   NewPanel.Color:=ClBlack;
   NewPanel.Width:=779;
   NewPanel.Height:=432;
   NewPanel.Parent:=NewPage;
   NewGroupBox:=TGroupBox.Create(Self);
   NewGroupBox.Top:=5;
   NewGroupBox.Left:=5;
   NewGroupBox.Caption:='Метод пузырька';
   NewGroupBox.Color:=ClBlack;
   NewGroupBox.Font.Color:=ClLime;
   NewGroupBox.Width:=767;
   NewGroupBox.Height:=200;
   NewGroupBox.Parent:=NewPage;
   NewGroupBox:=TGroupBox.Create(Self);
   NewGroupBox.Top:=210;
   NewGroupBox.Left:=5;
   NewGroupBox.Caption:='Метод нерекурсивной версии QUICKSORT';
   NewGroupBox.Color:=ClBlack;
   NewGroupBox.Font.Color:=ClLime;
   NewGroupBox.Width:=767;
   NewGroupBox.Height:=200;
   NewGroupBox.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=165;
   NewEdit2.Height:=20;
   NewEdit2.Top:=30;
   NewEdit2.Left:=150;
   NewEdit2.Text:='Массив полностью упорядочен';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=220;
   NewEdit2.Height:=20;
   NewEdit2.Top:=30;
   NewEdit2.Left:=335;
   NewEdit2.Text:='Массив упорядочен в обратном порядке';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=190;
   NewEdit2.Height:=20;
   NewEdit2.Top:=30;
   NewEdit2.Left:=570;
   NewEdit2.Text:='Массив задан случайным образом';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=65;
   NewEdit2.Height:=20;
   NewEdit2.Top:=60;
   NewEdit2.Left:=15;
   NewEdit2.Text:='32';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=65;
   NewEdit2.Height:=20;
   NewEdit2.Top:=90;
   NewEdit2.Left:=15;
   NewEdit2.Text:='256';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=65;
   NewEdit2.Height:=20;
   NewEdit2.Top:=120;
   NewEdit2.Left:=15;
   NewEdit2.Text:='4096';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=65;
   NewEdit2.Height:=20;
   NewEdit2.Top:=150;
   NewEdit2.Left:=15;
   NewEdit2.Text:='16384';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=165;
   NewEdit2.Height:=20;
   NewEdit2.Top:=230;
   NewEdit2.Left:=150;
   NewEdit2.Text:='Массив полностью упорядочен';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=220;
   NewEdit2.Height:=20;
   NewEdit2.Top:=230;
   NewEdit2.Left:=335;
   NewEdit2.Text:='Массив упорядочен в обратном порядке';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=190;
   NewEdit2.Height:=20;
   NewEdit2.Top:=230;
   NewEdit2.Left:=570;
   NewEdit2.Text:='Массив задан случайным образом';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=65;
   NewEdit2.Height:=20;
   NewEdit2.Top:=260;
   NewEdit2.Left:=15;
   NewEdit2.Text:='32';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=65;
   NewEdit2.Height:=20;
   NewEdit2.Top:=290;
   NewEdit2.Left:=15;
   NewEdit2.Text:='256';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=65;
   NewEdit2.Height:=20;
   NewEdit2.Top:=320;
   NewEdit2.Left:=15;
   NewEdit2.Text:='4096';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewEdit2:=TEdit.Create(Self);
   NewEdit2.ReadOnly:=true;
   NewEdit2.Width:=65;
   NewEdit2.Height:=20;
   NewEdit2.Top:=350;
   NewEdit2.Left:=15;
   NewEdit2.Text:='16384';
   NewEdit2.Color:=ClBlack;
   NewEdit2.Font.Color:=ClLime;
   NewEdit2.Ctl3D:=true;
   NewEdit2.Parent:=NewPage;
   NewButton:=TButton.Create(Self);
   NewButton.Top:=30;
   NewButton.Left:=16;
   NewButton.Width:=120;
   NewButton.Height:=20;
   NewButton.Action:=Action4;
   NewButton.Parent:=NewPage;
   NewButton:=TButton.Create(Self);
   NewButton.Top:=230;
   NewButton.Left:=16;
   NewButton.Width:=120;
   NewButton.Height:=20;
   NewButton.Action:=Action5;
   NewButton.Parent:=NewPage;
   //---------------------------------------------------------------------------
   NewButton:=TButton.Create(Self);
   NewButton.Top:=175;
   NewButton.Left:=16;
   NewButton.Width:=120;
   NewButton.Height:=20;
   NewButton.Action:=Action6;
   NewButton.Parent:=NewPage;
   NewButton:=TButton.Create(Self);
   NewButton.Top:=375;
   NewButton.Left:=16;
   NewButton.Width:=120;
   NewButton.Height:=20;
   NewButton.Action:=Action7;
   NewButton.Parent:=NewPage;
   //---------------------------------------------------------------------------
   NewEdit3:=TEdit.Create(Self);
   NewEdit3.ReadOnly:=true;
   NewEdit3.Width:=165;
   NewEdit3.Height:=20;
   NewEdit3.Top:=60;
   NewEdit3.Left:=150;
   NewEdit3.Text:='';
   NewEdit3.Color:=ClBlack;
   NewEdit3.Font.Color:=ClLime;
   NewEdit3.Ctl3D:=true;
   NewEdit3.Parent:=NewPage;
   NewEdit4:=TEdit.Create(Self);
   NewEdit4.ReadOnly:=true;
   NewEdit4.Width:=165;
   NewEdit4.Height:=20;
   NewEdit4.Top:=90;
   NewEdit4.Left:=150;
   NewEdit4.Text:='';
   NewEdit4.Color:=ClBlack;
   NewEdit4.Font.Color:=ClLime;
   NewEdit4.Ctl3D:=true;
   NewEdit4.Parent:=NewPage;
   NewEdit5:=TEdit.Create(Self);
   NewEdit5.ReadOnly:=true;
   NewEdit5.Width:=165;
   NewEdit5.Height:=20;
   NewEdit5.Top:=120;
   NewEdit5.Left:=150;
   NewEdit5.Text:='';
   NewEdit5.Color:=ClBlack;
   NewEdit5.Font.Color:=ClLime;
   NewEdit5.Ctl3D:=true;
   NewEdit5.Parent:=NewPage;
   NewEdit6:=TEdit.Create(Self);
   NewEdit6.ReadOnly:=true;
   NewEdit6.Width:=165;
   NewEdit6.Height:=20;
   NewEdit6.Top:=150;
   NewEdit6.Left:=150;
   NewEdit6.Text:='';
   NewEdit6.Color:=ClBlack;
   NewEdit6.Font.Color:=ClLime;
   NewEdit6.Ctl3D:=true;
   NewEdit6.Parent:=NewPage;
   NewEdit7:=TEdit.Create(Self);
   NewEdit7.ReadOnly:=true;
   NewEdit7.Width:=165;
   NewEdit7.Height:=20;
   NewEdit7.Top:=60;
   NewEdit7.Left:=365;
   NewEdit7.Text:='';
   NewEdit7.Color:=ClBlack;
   NewEdit7.Font.Color:=ClLime;
   NewEdit7.Ctl3D:=true;
   NewEdit7.Parent:=NewPage;
   NewEdit8:=TEdit.Create(Self);
   NewEdit8.ReadOnly:=true;
   NewEdit8.Width:=165;
   NewEdit8.Height:=20;
   NewEdit8.Top:=90;
   NewEdit8.Left:=365;
   NewEdit8.Text:='';
   NewEdit8.Color:=ClBlack;
   NewEdit8.Font.Color:=ClLime;
   NewEdit8.Ctl3D:=true;
   NewEdit8.Parent:=NewPage;
   NewEdit9:=TEdit.Create(Self);
   NewEdit9.ReadOnly:=true;
   NewEdit9.Width:=165;
   NewEdit9.Height:=20;
   NewEdit9.Top:=120;
   NewEdit9.Left:=365;
   NewEdit9.Text:='';
   NewEdit9.Color:=ClBlack;
   NewEdit9.Font.Color:=ClLime;
   NewEdit9.Ctl3D:=true;
   NewEdit9.Parent:=NewPage;
   NewEdit10:=TEdit.Create(Self);
   NewEdit10.ReadOnly:=true;
   NewEdit10.Width:=165;
   NewEdit10.Height:=20;
   NewEdit10.Top:=150;
   NewEdit10.Left:=365;
   NewEdit10.Text:='';
   NewEdit10.Color:=ClBlack;
   NewEdit10.Font.Color:=ClLime;
   NewEdit10.Ctl3D:=true;
   NewEdit10.Parent:=NewPage;
   NewEdit11:=TEdit.Create(Self);
   NewEdit11.ReadOnly:=true;
   NewEdit11.Width:=165;
   NewEdit11.Height:=20;
   NewEdit11.Top:=60;
   NewEdit11.Left:=585;
   NewEdit11.Text:='';
   NewEdit11.Color:=ClBlack;
   NewEdit11.Font.Color:=ClLime;
   NewEdit11.Ctl3D:=true;
   NewEdit11.Parent:=NewPage;
   NewEdit12:=TEdit.Create(Self);
   NewEdit12.ReadOnly:=true;
   NewEdit12.Width:=165;
   NewEdit12.Height:=20;
   NewEdit12.Top:=90;
   NewEdit12.Left:=585;
   NewEdit12.Text:='';
   NewEdit12.Color:=ClBlack;
   NewEdit12.Font.Color:=ClLime;
   NewEdit12.Ctl3D:=true;
   NewEdit12.Parent:=NewPage;
   NewEdit13:=TEdit.Create(Self);
   NewEdit13.ReadOnly:=true;
   NewEdit13.Width:=165;
   NewEdit13.Height:=20;
   NewEdit13.Top:=120;
   NewEdit13.Left:=585;
   NewEdit13.Text:='';
   NewEdit13.Color:=ClBlack;
   NewEdit13.Font.Color:=ClLime;
   NewEdit13.Ctl3D:=true;
   NewEdit13.Parent:=NewPage;
   NewEdit14:=TEdit.Create(Self);
   NewEdit14.ReadOnly:=true;
   NewEdit14.Width:=165;
   NewEdit14.Height:=20;
   NewEdit14.Top:=150;
   NewEdit14.Left:=585;
   NewEdit14.Text:='';
   NewEdit14.Color:=ClBlack;
   NewEdit14.Font.Color:=ClLime;
   NewEdit14.Ctl3D:=true;
   NewEdit14.Parent:=NewPage;
   //---------------------------------------------------------------------------
   //---------------------------------------------------------------------------
   NewEdit15:=TEdit.Create(Self);
   NewEdit15.ReadOnly:=true;
   NewEdit15.Width:=165;
   NewEdit15.Height:=20;
   NewEdit15.Top:=260;
   NewEdit15.Left:=150;
   NewEdit15.Text:='';
   NewEdit15.Color:=ClBlack;
   NewEdit15.Font.Color:=ClLime;
   NewEdit15.Ctl3D:=true;
   NewEdit15.Parent:=NewPage;
   NewEdit16:=TEdit.Create(Self);
   NewEdit16.ReadOnly:=true;
   NewEdit16.Width:=165;
   NewEdit16.Height:=20;
   NewEdit16.Top:=290;
   NewEdit16.Left:=150;
   NewEdit16.Text:='';
   NewEdit16.Color:=ClBlack;
   NewEdit16.Font.Color:=ClLime;
   NewEdit16.Ctl3D:=true;
   NewEdit16.Parent:=NewPage;
   NewEdit17:=TEdit.Create(Self);
   NewEdit17.ReadOnly:=true;
   NewEdit17.Width:=165;
   NewEdit17.Height:=20;
   NewEdit17.Top:=320;
   NewEdit17.Left:=150;
   NewEdit17.Text:='';
   NewEdit17.Color:=ClBlack;
   NewEdit17.Font.Color:=ClLime;
   NewEdit17.Ctl3D:=true;
   NewEdit17.Parent:=NewPage;
   NewEdit18:=TEdit.Create(Self);
   NewEdit18.ReadOnly:=true;
   NewEdit18.Width:=165;
   NewEdit18.Height:=20;
   NewEdit18.Top:=350;
   NewEdit18.Left:=150;
   NewEdit18.Text:='';
   NewEdit18.Color:=ClBlack;
   NewEdit18.Font.Color:=ClLime;
   NewEdit18.Ctl3D:=true;
   NewEdit18.Parent:=NewPage;
   NewEdit19:=TEdit.Create(Self);
   NewEdit19.ReadOnly:=true;
   NewEdit19.Width:=165;
   NewEdit19.Height:=20;
   NewEdit19.Top:=260;
   NewEdit19.Left:=365;
   NewEdit19.Text:='';
   NewEdit19.Color:=ClBlack;
   NewEdit19.Font.Color:=ClLime;
   NewEdit19.Ctl3D:=true;
   NewEdit19.Parent:=NewPage;
   NewEdit20:=TEdit.Create(Self);
   NewEdit20.ReadOnly:=true;
   NewEdit20.Width:=165;
   NewEdit20.Height:=20;
   NewEdit20.Top:=290;
   NewEdit20.Left:=365;
   NewEdit20.Text:='';
   NewEdit20.Color:=ClBlack;
   NewEdit20.Font.Color:=ClLime;
   NewEdit20.Ctl3D:=true;
   NewEdit20.Parent:=NewPage;
   NewEdit21:=TEdit.Create(Self);
   NewEdit21.ReadOnly:=true;
   NewEdit21.Width:=165;
   NewEdit21.Height:=20;
   NewEdit21.Top:=320;
   NewEdit21.Left:=365;
   NewEdit21.Text:='';
   NewEdit21.Color:=ClBlack;
   NewEdit21.Font.Color:=ClLime;
   NewEdit21.Ctl3D:=true;
   NewEdit21.Parent:=NewPage;
   NewEdit22:=TEdit.Create(Self);
   NewEdit22.ReadOnly:=true;
   NewEdit22.Width:=165;
   NewEdit22.Height:=20;
   NewEdit22.Top:=350;
   NewEdit22.Left:=365;
   NewEdit22.Text:='';
   NewEdit22.Color:=ClBlack;
   NewEdit22.Font.Color:=ClLime;
   NewEdit22.Ctl3D:=true;
   NewEdit22.Parent:=NewPage;
   NewEdit23:=TEdit.Create(Self);
   NewEdit23.ReadOnly:=true;
   NewEdit23.Width:=165;
   NewEdit23.Height:=20;
   NewEdit23.Top:=260;
   NewEdit23.Left:=585;
   NewEdit23.Text:='';
   NewEdit23.Color:=ClBlack;
   NewEdit23.Font.Color:=ClLime;
   NewEdit23.Ctl3D:=true;
   NewEdit23.Parent:=NewPage;
   NewEdit24:=TEdit.Create(Self);
   NewEdit24.ReadOnly:=true;
   NewEdit24.Width:=165;
   NewEdit24.Height:=20;
   NewEdit24.Top:=290;
   NewEdit24.Left:=585;
   NewEdit24.Text:='';
   NewEdit24.Color:=ClBlack;
   NewEdit24.Font.Color:=ClLime;
   NewEdit24.Ctl3D:=true;
   NewEdit24.Parent:=NewPage;
   NewEdit25:=TEdit.Create(Self);
   NewEdit25.ReadOnly:=true;
   NewEdit25.Width:=165;
   NewEdit25.Height:=20;
   NewEdit25.Top:=320;
   NewEdit25.Left:=585;
   NewEdit25.Text:='';
   NewEdit25.Color:=ClBlack;
   NewEdit25.Font.Color:=ClLime;
   NewEdit25.Ctl3D:=true;
   NewEdit25.Parent:=NewPage;
   NewEdit26:=TEdit.Create(Self);
   NewEdit26.ReadOnly:=true;
   NewEdit26.Width:=165;
   NewEdit26.Height:=20;
   NewEdit26.Top:=350;
   NewEdit26.Left:=585;
   NewEdit26.Text:='';
   NewEdit26.Color:=ClBlack;
   NewEdit26.Font.Color:=ClLime;
   NewEdit26.Ctl3D:=true;
   NewEdit26.Parent:=NewPage;
end;
//------------------------------------------------------------------------------
procedure TForm1.BEGIN3(Sender: TObject);
var i,j:word;
begin
  for i:=1 to n do NSG.Cells[i,1]:='';
  Randomize;
  try
  //----------------------------------------------------------------------------
  if (StrToInt(NewEdit1.Text)>0)and(StrToInt(NewEdit1.Text)<21) then
  for i:=1 to StrToInt(NewEdit1.Text) do
   begin
     Mas[i]:=random(100);
     NSG.Cells[i,1]:=VarToStr(Mas[i]);
   end;
  for j:=2 to NSG.RowCount do
    for i:=1 to 20 do NSG.Cells[i,j]:='';
  NSG.RowCount:=2;
  //----------------------------------------------------------------------------
  except
  end;
end;
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
procedure TForm1.BEGIN4_VR(Sender: TObject);            //Время методом пузырька
const masser:array[1..4] of word=(32,256,4096,16384);
var x,i,j,p,tre:word;
begin
  randomize;
  for tre:=1 to 3 do
  for p:=1 to 4 do
  begin
  case tre of
    1:for i:=1 to  masser[p] do Mas[i]:=i;
    2:for i:=1 to  masser[p] do Mas[i]:=masser[p]-i;
    3:for i:=1 to  masser[p] do Mas[i]:=random(100);
   end;
  //----------------------------------------------------------------------------
  GetLocalTime(GLT);
  mil:=GLT.wMilliseconds;
  sec:=GLT.wSecond;
  for i:=2 to masser[p] do
   for j:=masser[p] downto i do
    if Mas[j-1]>Mas[j] then
     begin
       x:=Mas[j-1];
       Mas[j-1]:=Mas[j];
       Mas[j]:=x;
     end;
  //---------------------------------------------------------------------------
  GetLocalTime(GLT);
  if (GLT.wSecond-sec)>=0 then deltas:=GLT.wSecond-sec
             else
               begin
                deltas:=60-sec;
                deltas:=deltas+GLT.wSecond;
               end;
  if (GLT.wMilliseconds-mil)>=0 then delta:=GLT.wMilliseconds-mil
             else
               begin
                delta:=1000-mil;
                delta:=delta+GLT.wMilliseconds;
               end;
  case tre of
     1:begin
            case p of
               1:NewEdit3.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               2:NewEdit4.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               3:NewEdit5.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               4:NewEdit6.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
             end;
       end;
     2:begin
           case p of
               1:NewEdit7.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               2:NewEdit8.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               3:NewEdit9.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               4:NewEdit10.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
             end;
       end;
     3:begin
          case p of
               1:NewEdit11.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               2:NewEdit12.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               3:NewEdit13.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               4:NewEdit14.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
             end;
       end;
    end;
  end;
end;
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
procedure TForm1.BEGIN5_VR(Sender: TObject);           //Время методом QUISKSORT
const masser:array[1..4] of longint=(32,256,4096,16384);
type gop=record
            L:longint;
            R:longint;
           end;
var x,i,j,p,tre:longint;
    stack:array[1..n] of gop;
    s,n,L,R,w:longint;
begin
  randomize;
  for tre:=1 to 3 do
  for p:=1 to 4 do
  begin
  case tre of
    1:for i:=1 to  masser[p] do Mas[i]:=i;
    2:for i:=1 to  masser[p] do Mas[i]:=masser[p]-i;
    3:for i:=1 to  masser[p] do Mas[i]:=random(100);
   end;
  //----------------------------------------------------------------------------
  GetLocalTime(GLT);
  mil:=GLT.wMilliseconds;
  sec:=GLT.wSecond;
  //----------------------------------------------------------------------------
  n:=masser[p];
  s:=1;
  stack[1].L:=1;
  stack[s].R:=n;
  repeat
    L:=stack[s].L;
    R:=stack[s].R;
    s:=s-1;
    repeat
      i:=L;
      j:=R;
      x:=Mas[(L+R) div 2];
      repeat
         while Mas[i]<x do begin i:=i+1 end;
         while x<Mas[j] do begin j:=j-1; end;
         if i<=j then
           begin
             w:=Mas[i];
             Mas[i]:=Mas[j];
             Mas[j]:=w;
             i:=i+1;
             j:=j-1;
           end;
      until i>j;
      if i<R then
        begin
          s:=s+1;
          stack[s].L:=i;
          stack[s].R:=R;
        end;
      R:=j;
    until L>=R;
  until s=0;
  //---------------------------------------------------------------------------
  GetLocalTime(GLT);
  if (GLT.wSecond-sec)>=0 then deltas:=GLT.wSecond-sec
             else
               begin
                deltas:=60-sec;
                deltas:=deltas+GLT.wSecond;
               end;
  if (GLT.wMilliseconds-mil)>=0 then delta:=GLT.wMilliseconds-mil
             else
               begin
                delta:=1000-mil;
                delta:=delta+GLT.wMilliseconds;
               end;
  case tre of
     1:begin
            case p of
               1:NewEdit15.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               2:NewEdit16.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               3:NewEdit17.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               4:NewEdit18.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
             end;
       end;
     2:begin
           case p of
               1:NewEdit19.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               2:NewEdit20.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               3:NewEdit21.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               4:NewEdit22.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
             end;
       end;
     3:begin
          case p of
               1:NewEdit23.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               2:NewEdit24.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               3:NewEdit25.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
               4:NewEdit26.Text:=VarToStr(deltas)+'.'+VarToStr(delta);
             end;
       end;
    end;
  end;
end;
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
procedure TForm1.BEGIN6_PER(Sender: TObject);//Число перестановок методом пузырька
const masser:array[1..4] of word=(32,256,4096,16384);
var x,i,j,p,tre:word;
    CON1:word;
begin
  for tre:=1 to 3 do
  for p:=1 to 4 do
  begin
  randomize;
  case tre of
    1:for i:=1 to  masser[p] do Mas[i]:=i;
    2:for i:=1 to  masser[p] do Mas[i]:=masser[p]-i;
    3:for i:=1 to  masser[p] do Mas[i]:=random(100);
   end;
  //----------------------------------------------------------------------------
  CON1:=0;
  for i:=2 to masser[p] do
   for j:=masser[p] downto i do
    if Mas[j-1]>Mas[j] then
     begin
       INC(CON1);
       x:=Mas[j-1];
       Mas[j-1]:=Mas[j];
       Mas[j]:=x;
     end;
  //---------------------------------------------------------------------------
  case tre of
     1:begin
            case p of
               1:NewEdit3.Text:=VarToStr(CON1);
               2:NewEdit4.Text:=VarToStr(CON1);
               3:NewEdit5.Text:=VarToStr(CON1);
               4:NewEdit6.Text:=VarToStr(CON1);
             end;
       end;
     2:begin
           case p of
               1:NewEdit7.Text:=VarToStr(CON1);
               2:NewEdit8.Text:=VarToStr(CON1);
               3:NewEdit9.Text:=VarToStr(CON1);
               4:NewEdit10.Text:=VarToStr(CON1);
             end;
       end;
     3:begin
          case p of
               1:NewEdit11.Text:=VarToStr(CON1);
               2:NewEdit12.Text:=VarToStr(CON1);
               3:NewEdit13.Text:=VarToStr(CON1);
               4:NewEdit14.Text:=VarToStr(CON1);
             end;
       end;
    end;
  end;
end;
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
procedure TForm1.BEGIN7_PER(Sender: TObject);//Число перестановок методом QUISKSORT
const masser:array[1..4] of longint=(32,256,4096,16384);
type gop=record
            L:longint;
            R:longint;
           end;
var x,i,j,p,tre:longint;
    stack:array[1..n] of gop;
    s,n,L,R,w:longint;
    CON1:word;
begin
  randomize;
  for tre:=1 to 3 do
  for p:=1 to 4 do
  begin
  case tre of
    1:for i:=1 to  masser[p] do Mas[i]:=i;
    2:for i:=1 to  masser[p] do Mas[i]:=masser[p]-i;
    3:for i:=1 to  masser[p] do Mas[i]:=random(100);
   end;
  //----------------------------------------------------------------------------
  CON1:=0;
  n:=masser[p];
  s:=1;
  stack[1].L:=1;
  stack[s].R:=n;
  repeat
    L:=stack[s].L;
    R:=stack[s].R;
    s:=s-1;
    repeat
      i:=L;
      j:=R;
      x:=Mas[(L+R) div 2];
      repeat
         while Mas[i]<x do begin i:=i+1 end;
         while x<Mas[j] do begin j:=j-1; end;
         if i<=j then
           begin
             INC(CON1);
             w:=Mas[i];
             Mas[i]:=Mas[j];
             Mas[j]:=w;
             i:=i+1;
             j:=j-1;
           end;
      until i>j;
      if i<R then
        begin
          INC(CON1);
          s:=s+1;
          stack[s].L:=i;
          stack[s].R:=R;
        end;
      R:=j;
    until L>=R;
  until s=0;
  //---------------------------------------------------------------------------
  case tre of
     1:begin
            case p of
               1:NewEdit15.Text:=VarToStr(CON1);
               2:NewEdit16.Text:=VarToStr(CON1);
               3:NewEdit17.Text:=VarToStr(CON1);
               4:NewEdit18.Text:=VarToStr(CON1);
             end;
       end;
     2:begin
           case p of
               1:NewEdit19.Text:=VarToStr(CON1);
               2:NewEdit20.Text:=VarToStr(CON1);
               3:NewEdit21.Text:=VarToStr(CON1);
               4:NewEdit22.Text:=VarToStr(CON1);
             end;
       end;
     3:begin
          case p of
               1:NewEdit23.Text:=VarToStr(CON1);
               2:NewEdit24.Text:=VarToStr(CON1);
               3:NewEdit25.Text:=VarToStr(CON1);
               4:NewEdit26.Text:=VarToStr(CON1);
             end;
       end;
    end;
  end;
end;
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
procedure TForm1.BEGIN1(Sender: TObject);                       //Метод пузырька
var x,i,j,n,p,e:word;
begin
 try
  p:=2;
  n:=StrToInt(NewEdit1.Text);
  NSG.RowCount:=2;
  for i:=2 to n do
   for j:=n downto i do
    if Mas[j-1]>Mas[j] then
     begin
       x:=Mas[j-1];
       Mas[j-1]:=Mas[j];
       Mas[j]:=x;
       //-----------------------------------------------------------------------
       for e:=1 to StrToInt(NewEdit1.Text) do NSG.Cells[e,p]:=VarToStr(Mas[e]);
       INC(P);
       NSG.RowCount:=NSG.RowCount+1
       //-----------------------------------------------------------------------
     end;
 except
 end;
end;
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
procedure TForm1.BEGIN2(Sender: TObject);       //Нерекурсивная версия QUICKSORT
type gop=record
            L:word;
            R:word;
           end;
var stack:array[1..n] of gop;
    s,n,L,R,j,x,w,e,p:word;
begin
 try
  n:=StrToInt(NewEdit1.Text);
  s:=1;
  stack[1].L:=1;
  stack[s].R:=n;
  NSG.RowCount:=2;
  p:=2;
  repeat
    L:=stack[s].L;
    R:=stack[s].R;
    s:=s-1;
    repeat
      i:=L;
      j:=R;
      x:=Mas[(L+R) div 2];
      repeat
         while Mas[i]<x do begin i:=i+1 end;
         while x<Mas[j] do begin j:=j-1; end;
         if i<=j then
           begin
             w:=Mas[i];
             Mas[i]:=Mas[j];
             Mas[j]:=w;
             i:=i+1;
             j:=j-1;
             //-----------------------------------------------------------------
             for e:=1 to StrToInt(NewEdit1.Text) do NSG.Cells[e,p]:=VarToStr(Mas[e]);
             INC(P);
             NSG.RowCount:=NSG.RowCount+1
             //-----------------------------------------------------------------
           end;
      until i>j;
      if i<R then
        begin
          s:=s+1;
          stack[s].L:=i;
          stack[s].R:=R;
        end;
      R:=j;
    until L>=R;
  until s=0;
  //----------------------------------------------------------------------------
  for i:=1 to StrToInt(NewEdit1.Text) do NSG.Cells[i,2]:=VarToStr(Mas[i]);
 except
 end;
end;
//------------------------------------------------------------------------------
end.
