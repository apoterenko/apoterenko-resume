unit Unit2;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, Grids, StdCtrls, ExtCtrls, ComCtrls;

type
  TForm2 = class(TForm)
    SG1: TStringGrid;
    SG2: TStringGrid;
    Panel1: TPanel;
    Panel2: TPanel;
    GroupBox1: TGroupBox;
    Button1: TButton;
    Edit1: TEdit;
    Label3: TLabel;
    Label4: TLabel;
    Edit2: TEdit;
    PB1: TProgressBar;
    Label5: TLabel;
    GroupBox2: TGroupBox;
    RadioButton1: TRadioButton;
    RadioButton2: TRadioButton;
    RadioButton3: TRadioButton;
    RadioButton4: TRadioButton;
    procedure FormCreate(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure GRAF_GLUBINA_MATR_SMEG;
    procedure GRAF_SHIRINA_MATR_SMEG;
    procedure CONVERT;
    procedure GRAF_GL_MAS;
    procedure GRAF_Shir_MAS;

  private
    { Private declarations }
  public

    { Public declarations }
  end;
const n=5000;
var
  Form2: TForm2;
  M:array[1..n,1..n] of byte;    //Матрица смежности
  MC:array[1..n,1..n] of byte;   //Копия матрицы аналога-для восствновления
  M1:array[1..n,1..n] of byte;   //Матрица смежности
  Q:array[1..n] of byte;         //Массив занятости вершин
  Mas:array[1..10000] of longint;     //Стек
  Msi:array[1..n*n+n] of longint;//Одномерный массив
  flag_les, flag_glub:boolean;
  A,i,p,fi1,fi2,fi3,fi4,j,li,g,mil,sec,delta,deltas,j1,n1,s,B,k,l:longint;
  GLT:TSystemTime;
  ki:longint;
  
implementation

{$R *.dfm}
//----------Инициализация---------------------
procedure TForm2.FormCreate(Sender: TObject);
begin
 SG1.Cells[0,0]:='Количество вершин';
 SG2.Cells[0,0]:='Количество вершин';
 SG1.Cells[1,0]:='Поиск в глубину';
 SG2.Cells[1,0]:='Поиск в глубину';
 SG1.Cells[2,0]:='Поиск в ширину';
 SG2.Cells[2,0]:='Поиск в ширину';
end;
//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
procedure TForm2.GRAF_GLUBINA_MATR_SMEG;
label EXIT1;
var j,i:longint;
begin
  A:=1;
  j:=1;
  flag_glub:=false;
  REPEAT
       Q[A]:=1;
       for i:=1 to n1 do
           if (i<>A)and(M[A,i]=1)and(Q[i]<>1) then
                  begin
                       M1[A,i]:=1;
                       Mas[j]:=A;   //Записываем вершину в стек
                       j:=j+1;
                       A:=i;
                       goto EXIT1;
                  end;
       j:=j-1;   //Достаем из стека
       A:=Mas[j];
       EXIT1:
       if j=0 then flag_glub:=true;
  UNTIL flag_glub=true;
end;
procedure TForm2.GRAF_SHIRINA_MATR_SMEG;
label ex;
var i:longint;
begin
 A:=1;
 repeat
  Q[A]:=2;     {Признак того что эту вершину вообще нельзя использовать}
  for i:=1 to n1 do
   if i<>A then if M[A,i]=1 then
                               begin
                                    if Q[i]=1 then
                                        begin
                                             M[A,i]:=0;
                                             M[i,A]:=0;
                                        end;
                                    if Q[i]<>2 then Q[i]:=1;
                               end;
  s:=0;
  for i:=1 to n1 do if Q[i]=2 then s:=s+1;
  for i:=1 to n1 do if Q[i]=1 then
                                 begin
                                      A:=i;
                                      goto ex;
                                 end;
  ex:
 until s=n1;  {Повторять до тех пор пока хотя бы одна из вершин Q[i] свободна}
end;
procedure TForm2.CONVERT;
var i,j:longint;
begin
     k:=n1+1;
     l:=n1+2;
     for i:=1 to n1 do
               begin
                    Msi[i]:=k;   //Запомнили указатель на элемент массива
                    for j:=1 to n1 do
                      if (j<>i)and(M[i,j]=1) then
                            begin
                                 Msi[k]:=Msi[k]+1;
                                 Msi[l]:=j;
                                 l:=l+1;
                            end;
                    k:=l;
                    l:=l+1;
               end;
end;
procedure TForm2.GRAF_GL_MAS;
label ex;
var j1,j,i:longint;
begin
  i:=1;
  j1:=1;
  Q[i]:=1;
  REPEAT
    A:=Msi[i];        //A=указатель на элемент последовательности вершины
    B:=Msi[A];        //B=число смежных вершин у данной вершины
    if B=0 then
              begin
                Q[i]:=1;
                M1[i,Mas[j1]]:=1;
              end
           else
             for j:=1 to B do  //Проходим смежные вершины и помечаем как занятые
                if Q[Msi[A+j]]=0 then
                   begin
                       Mas[j1]:=i;    //Записали в стек
                       j1:=j1+1;
                       M1[i,Msi[A+j]]:=1;  //Пометили как занятую в матрице
                       Q[Msi[A+j]]:=1;     //Пометили в очереди
                       i:=Msi[A+j];
                       goto ex;
                   end;
    j1:=j1-1;
    i:=Mas[j1];
    ex:
  UNTIL j1=0;
end;
procedure TForm2.GRAF_Shir_MAS;
label ex;
var i,j:longint;
begin
  i:=1;
  Q[i]:=2;    //В нее нельзя входить и она занята
  //----------------------------------------------------------------------------
  k:=n1;
  REPEAT
        A:=Msi[i];        //A=указатель на элемент последовательности вершины
        B:=Msi[A];        //B=число смежных вершин у данной вершины
        if B<>0 then
             begin
                   for j:=1 to B do  //Проходим смежные вершины и помечаем как занятые
                     if Q[Msi[A+j]]=0 then
                           begin
                                M1[i,Msi[A+j]]:=1;
                                Q[Msi[A+j]]:=1;
                           end;
                   for i:=1 to n1 do if Q[i]=1 then
                                begin
                                   Q[i]:=2;
                                   A:=i;
                                   k:=k-1;
                                   goto ex;
                                end;
                                ex:
             end;
  UNTIL k=1;
end;
//------------------------------------------------------------------------------
//                         Выполнение всех операций
//------------------------------------------------------------------------------
procedure TForm2.Button1Click(Sender: TObject);
procedure Copy_MC_M;
var i,j:longint;
begin
  for i:=1 to n1 do
   for j:=1 to n1 do
    M[i,j]:=MC[i,j];
end;
procedure GRAF_GLUBINA_MATR_SMEG_LES;
label EXIT1;
var i,j:longint;
begin
  for i:=1 to n1 do Q[i]:=0;
  A:=1;
  j:=1;
  flag_glub:=false;
  REPEAT
       Q[A]:=1;
       for i:=1 to n1 do
           if (i<>A)and(M[A,i]=1)and(Q[i]<>1) then
                  begin
                       Mas[j]:=A;   //Записываем вершину в стек
                       j:=j+1;
                       A:=i;
                       goto EXIT1;
                  end;
       j:=j-1;   //Достаем из стека
       A:=Mas[j];
       EXIT1:
       if j=0 then flag_glub:=true;
  UNTIL flag_glub=true;
end;
//------------------------------------------------------------------------------
//                         Основной блок программы
//------------------------------------------------------------------------------
begin
  SG1.RowCount:=1;  //Количество строк
  SG2.RowCount:=1;  //Количество строк
  try
      if (StrToInt(Edit2.Text)<=n)and(StrToInt(Edit1.Text)>=3)and
      (StrToInt(Edit2.Text)>=StrToInt(Edit1.Text))and((RadioButton1.Checked=true)or
      (RadioButton2.Checked=true)or(RadioButton3.Checked=true)or
      (RadioButton4.Checked=true)) then
      begin
      //------------------------------------------------------------------------
      //------------------------------------------------------------------------
      //------------------------------------------------------------------------
      PB1.Position:=0;
      g:=StrToInt(Edit2.Text)-StrToInt(Edit1.Text);
      for i:=1 to g+1 do
       begin
            SG1.RowCount:=SG1.RowCount+1;
            SG2.RowCount:=SG2.RowCount+1;
            SG1.Cells[0,i]:=VarToStr(i+StrToInt(Edit1.Text)-1);
            SG2.Cells[0,i]:=VarToStr(i+StrToInt(Edit1.Text)-1);
       end;
      //------------------------------------------------------------------------
      p:=1;
      fi1:=1;
      fi2:=1;
      fi3:=1;
      fi4:=1;
      for ki:=StrToInt(Edit1.Text) to StrToInt(Edit2.Text) do
       begin
         //---------------------------------------------------------------------
         n1:=ki;               //Число вершин в графе
         Randomize;
         for i:=1 to n do Q[i]:=0;
         REPEAT
           for i:=1 to n1 do for j:=i to n1 do
              begin
                 M[i,j]:=random(2);
                 M[j,i]:=M[i,j];
                 //Копируем M in MC
                 MC[i,j]:=M[i,j];
                 MC[j,i]:=M[j,i];
              end;
             flag_les:=false;
             GRAF_GLUBINA_MATR_SMEG_LES;
             for i:=1 to n1 do if Q[i]=0 then flag_les:=true;
             if flag_les=true then for i:=1 to n1*n1+n1 do Msi[i]:=0;
         UNTIL flag_les=false;
         //---------------------------------------------------------------------
         if RadioButton1.Checked=true then
            begin
               for i:=1 to n1 do Q[i]:=0;
               GetLocalTime(GLT);
               mil:=GLT.wMilliseconds;
               sec:=GLT.wSecond;
               //---------------------------------------------------------------
               GRAF_GLUBINA_MATR_SMEG;
            end;
         if RadioButton2.Checked=true then
            begin
               for i:=1 to n1 do Q[i]:=0;
               GetLocalTime(GLT);
               mil:=GLT.wMilliseconds;
               sec:=GLT.wSecond;
               //---------------------------------------------------------------
               GRAF_SHIRINA_MATR_SMEG;
            end;
         if RadioButton3.Checked=true then
            begin
               for i:=1 to n1 do Q[i]:=0;
               CONVERT;
               GetLocalTime(GLT);
               mil:=GLT.wMilliseconds;
               sec:=GLT.wSecond;
               //---------------------------------------------------------------
               GRAF_GL_MAS;
            end;
         if RadioButton4.Checked=true then
            begin
               for i:=1 to n1 do Q[i]:=0;
               CONVERT;
               GetLocalTime(GLT);
               mil:=GLT.wMilliseconds;
               sec:=GLT.wSecond;
               //---------------------------------------------------------------
               GRAF_Shir_MAS;
            end;
         //----------------------------Измерили время---------------------------
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
         //---------------------------------------------------------------------
         if RadioButton1.Checked=true then
            begin
               SG1.Cells[1,fi1]:=VarToStr(deltas)+'.'+VarToStr(delta);
               fi1:=fi1+1;
            end;
         if RadioButton2.Checked=true then
            begin
               SG1.Cells[2,fi2]:=VarToStr(deltas)+'.'+VarToStr(delta);
               fi2:=fi2+1;
            end;
         if RadioButton3.Checked=true then
            begin
               SG2.Cells[1,fi3]:=VarToStr(deltas)+'.'+VarToStr(delta);
               fi3:=fi3+1;
            end;
         if RadioButton4.Checked=true then
            begin
               SG2.Cells[2,fi4]:=VarToStr(deltas)+'.'+VarToStr(delta);
               fi4:=fi4+1;
            end;
            //--------------------Восстановили матрицу M------------------------
            Copy_MC_M;
            PB1.Position:=10*p;
            if ki=p*round((10*(StrToInt(Edit2.Text)-StrToInt(Edit1.Text)))/100)+StrToInt(Edit1.Text)
                 then p:=p+1;
       //-----------------------------------------------------------------------
       end;
       PB1.Position:=100;
       //-----------------------------------------------------------------------
       //-----------------------------------------------------------------------
       //-----------------------------------------------------------------------
       end;
   except //Пустой оператор обработки исключения
   end;
end;
end.

