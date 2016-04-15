unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls;

const n=10000;

type
  TVect=array [1..n] of integer;
  TMatr=array [1..n,1..n] of integer;
  PVect=^TVect;
  PMatr=^TMatr;
  TVector= class
              PVc:PVect;
              Procedure NewVector(ZET:TVector);
              Procedure DisposeVector(ZET:TVector);
           end;
  TMatrix= class
              PMt:PMatr;
              Procedure NewMatrix(ZET:TMatrix);
              Procedure MatrixRAndom(ZET:TMatrix);
              Procedure DisposeMatrix(ZET:TMatrix);
           end;
  //----------------------------------------------------------------------------
  TForm1 = class(TForm)
    GroupBox1: TGroupBox;
    Button1: TButton;
    Memo1: TMemo;
    GroupBox2: TGroupBox;
    RadioButton1: TRadioButton;
    Button2: TButton;
    Memo2: TMemo;
    RadioButton2: TRadioButton;
    Edit1: TEdit;
    Memo3: TMemo;
    Label1: TLabel;
    Label2: TLabel;
    Memo4: TMemo;
    Label3: TLabel;
    Label4: TLabel;
    RadioButton3: TRadioButton;
    Label5: TLabel;
    RadioButton4: TRadioButton;
    RadioButton5: TRadioButton;
    Image1: TImage;
    Label6: TLabel;
    Edit2: TEdit;
    Button3: TButton;
    procedure Button1Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure EXIMATR(Sender: TObject; var Action: TCloseAction);
    private
    { Private declarations }
    public
    { Public declarations }
    end;
var
  Form1: TForm1;
  Vect1, Vect2: TVector;
  Matr1, Matr2: TMatrix;
  flag: boolean;

implementation

{$R *.dfm}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
procedure TVector.NewVector(ZET:TVector);
var i:integer;
begin
  New(ZET.PVc);
  for i:=1 to StrToInt(Form1.Edit2.Text) do
    ZET.PVc^[i]:=Random(100);
end;
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
procedure TMatrix.NewMatrix(ZET:TMatrix);
var i,j:integer;
begin
  New(ZET.PMt);
  for i:=1 to StrToInt(Form1.Edit2.Text) do
    for j:=1 to StrToInt(Form1.Edit2.Text) do
        ZET.PMt^[i,j]:=0;
end;
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
procedure TMatrix.MatrixRandom(ZET:TMatrix);
var i,j:integer;
begin
  Form1.Memo4.Clear;
  for i:=1 to StrToInt(Form1.Edit2.Text) do
   begin
     ZET.PMt^[1,i]:=random(100);
     Form1.Memo4.Lines.Text:=Form1.Memo4.Lines.Text+VarToStr(ZET.PMt^[1,i])+'   ';
   end;
end;
//------------------------------------------------------------------------------
procedure TVector.DisposeVector(ZET:TVector);
begin
  Dispose(ZET.PVc);
end;
//------------------------------------------------------------------------------
procedure TMatrix.DisposeMatrix(ZET:TMatrix);
begin
  Dispose(ZET.PMt);
end;
//------------------------------------------------------------------------------
//----------Создаем объект TVector и выполняем необходимые операции-------------
//------------------------------------------------------------------------------
procedure TForm1.Button1Click(Sender: TObject);
var i:integer;
    k:integer;
begin
 if (flag=false)and(Edit2.Text<>'') then
 begin
  randomize;
  Vect1.NewVector(Vect1);
  Vect2.NewVector(Vect2);
  Matr1.NewMatrix(Matr1);
  Matr1.MatrixRAndom(Matr1);  //Заполняем матрицу (порядок 1xN)
  Matr2.NewMatrix(Matr2);
  flag:=true;      //Да - мы создали объекты
  //----------------------Основные операции с вектором--------------------------
  Memo1.Clear;
  Memo3.Clear;
  for i:=1 to StrToInt(Edit2.Text) do
    begin
     k:=Vect1.PVc^[i];
     Memo1.Lines.Add(VarToStr(k));
     k:=Vect2.PVc^[i];
     Memo3.Lines.Add(VarToStr(k));
    end;
  //----------------------------------------------------------------------------
 end; 
end;
//------------------------------------------------------------------------------
//----------------------Инициализация-------------------------------------------
//------------------------------------------------------------------------------
procedure TForm1.FormCreate(Sender: TObject);
begin
  Form1.RadioButton1.Checked:=true;
  Vect1:=TVector.Create;
  Vect2:=TVector.Create;
  Matr1:=TMatrix.Create;
  Matr2:=TMatrix.Create;
  flag:=false;  //Если flag=false - значит память пуста от векторов
end;
//------------------------------------------------------------------------------
//----------------Выполнение основных вычислений--------------------------------
//------------------------------------------------------------------------------
procedure TForm1.Button2Click(Sender: TObject);
var m,k,s,s1:integer;
    i,j:word;
begin
 if flag=true then
 begin
  Memo2.Clear;
  //----------------------------------------------------------------------------
  if RadioButton1.Checked=true then
    begin
      m:=0;
      for i:=1 to StrToInt(Edit2.Text) do
        begin
          k:=Vect1.PVc^[i];
          m:=m+sqr(k);
        end;
      Memo2.Lines.Add('Абсолютная величина вектора №1:'+VarToStr(round(sqrt(m))));
      m:=0;
      for i:=1 to StrToInt(Edit2.Text) do
        begin
          k:=Vect2.PVc^[i];
          m:=m+sqr(k);
        end;
      Memo2.Lines.Add('Абсолютная величина вектора №2:'+VarToStr(round(sqrt(m))));
    end;
  //----------------------------------------------------------------------------
  if RadioButton2.Checked=true then
    begin
      Memo2.Clear;
      Memo2.Lines.Add('Первый вектор'+'     '+'Второй вектор');
      for i:=1 to StrToInt(Edit2.Text) do
        begin
           s:=Vect1.PVc^[i]*StrToInt(Edit1.Text);
           s1:=Vect2.PVc^[i]*StrToInt(Edit1.Text);
           Memo2.Lines.Add(VarToStr(s)+'                           '+VarToStr(s1));
        end;
    end;
  //----------------------------------------------------------------------------
  if RadioButton3.Checked=true then
    begin
      Memo2.Clear;
      s:=0;
      for i:=1 to StrToInt(Edit2.Text) do
        s:=s+Vect1.PVc^[i]*Vect2.PVc^[i];
      Memo2.Lines.Add('Произведение векторов №1 и №2:'+VarToStr(s));
    end;
  //----------------------------------------------------------------------------
  if RadioButton4.Checked=true then
    begin
      Memo2.Clear;
      Memo2.Lines.Add('Полученная матрица равна:');
      s:=0;
      for i:=1 to StrToInt(Edit2.Text) do
        begin
         Matr2.PMt^[i,1]:=Vect1.PVc^[i]+Vect2.PVc^[i];
         Memo2.Lines.Add(VarToStr(Matr2.PMt^[i,1]));
        end;
    end;
  //----------------------------------------------------------------------------
  if RadioButton5.Checked=true then
     begin
      Memo2.Clear;
      Memo2.Lines.Add('Полученная матрица равна:');
      s:=0;
      for i:=1 to StrToInt(Edit2.Text) do
        for j:=1 to StrToInt(Edit2.Text) do
            Matr2.PMt^[i,j]:=Vect1.PVc^[i]*Matr1.PMt^[1,j];
      for i:=1 to StrToInt(Edit2.Text) do
       begin
        for j:=1 to StrToInt(Edit2.Text) do
             Memo2.Lines.Text:=Memo2.Lines.Text+VarToStr(Matr2.PMt^[i,j])+'   ';
        Memo2.Lines.Add('');
       end;
     end;
 end;
end;
//------------------------------------------------------------------------------
//--------------Удаление всех объектов из памяти--------------------------------
//------------------------------------------------------------------------------
procedure TForm1.Button3Click(Sender: TObject);
begin
 if flag=true then
 begin
  Vect1.DisposeVector(Vect1);
  Vect2.DisposeVector(Vect2);
  Matr1.DisposeMatrix(Matr1);
  Matr2.DisposeMatrix(Matr2);
  flag:=false;
 end; 
end;
//------------------------------------------------------------------------------
//--------------Закрывеам программу---------------------------------------------
//------------------------------------------------------------------------------
procedure TForm1.EXIMATR(Sender: TObject; var Action: TCloseAction);
begin
  if flag=true then
    begin
      Vect1.DisposeVector(Vect1);
      Vect2.DisposeVector(Vect2);
      Matr1.DisposeMatrix(Matr1);
      Matr2.DisposeMatrix(Matr2);
    end;
  Vect1.Destroy;
  Vect2.Destroy;
  Matr1.Destroy;
  Matr2.Destroy;
end;
end.
