unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls, UNIT2, UNIT3, UNIT4, UNIT5, UNIT6;

type
  TForm1 = class(TForm)
    Panel1: TPanel;
    Panel2: TPanel;
    Label1: TLabel;
    Label2: TLabel;
    Edit1: TEdit;
    Label3: TLabel;
    Edit2: TEdit;
    Label4: TLabel;
    Edit3: TEdit;
    Label5: TLabel;
    Edit4: TEdit;
    Label6: TLabel;
    Edit5: TEdit;
    Edit6: TEdit;
    Label7: TLabel;
    Label8: TLabel;
    Label9: TLabel;
    Edit7: TEdit;
    Edit8: TEdit;
    GroupBox1: TGroupBox;
    Memo1: TMemo;
    Button1: TButton;
    Button2: TButton;
    GroupBox2: TGroupBox;
    GroupBox3: TGroupBox;
    GroupBox4: TGroupBox;
    RadioButton1: TRadioButton;
    RadioButton2: TRadioButton;
    RadioButton3: TRadioButton;
    Edit9: TEdit;
    Button3: TButton;
    Button4: TButton;
    Button5: TButton;
    GroupBox5: TGroupBox;
    Button6: TButton;
    Button7: TButton;
    GroupBox6: TGroupBox;
    RadioButton5: TRadioButton;
    RadioButton6: TRadioButton;
    RadioButton7: TRadioButton;
    Panel3: TPanel;
    Image1: TImage;
    Memo2: TMemo;
    GroupBox7: TGroupBox;
    RadioButton4: TRadioButton;
    RadioButton8: TRadioButton;
    Edit10: TEdit;
    Button8: TButton;
    Button9: TButton;
    procedure Button6Click(Sender: TObject);
    procedure Button5Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Button7Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure POISK_REIS(parametr:word);
    procedure POISK_MESTO(parametr:word);
    procedure Button8Click(Sender: TObject);
    procedure Edit9Change(Sender: TObject);
    procedure Edit10Change(Sender: TObject);
    procedure Button9Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

const s='C:\user\BAZALAB7.txt';

type
   BILET=record
           n_r:integer;
           chislo:integer;
           mesto_otpr:string[100];
           mesto_nazn:string[100];
           vrema_vileta:integer;
           vrema_pribitia:integer;
           nomer_mesta:integer;
           stoim:integer;
         end;
   TFile=file of BILET;
   
var
  fr,f,fsort,f1,f2,f3:TFile;
  BIL,BIL1,BILuk1,BILuk2:BILET;
  flag,flagOK,flag1,flag2:boolean;
  i,j,k,m,bufer_m,SIZE,max,min,n,UKBIL,t,x,PLUS,uk1,uk2,uk3,h:word;
  par:string;
  s1,s2,s3,s4:string[20];
  par1,par2:word;
  Form1: TForm1;
  procedure sliyanie_2_serii(parametr:word;var g1,g2,FILES:TFile;d1,d2:word);
  procedure Sortiruem(parametr:word;SIZE:integer);

implementation

{$R *.dfm}
//------------------------------------------------------------------------------
//
//
//                           Тело программы
//
//
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//                     Дополнительные программы (+)
//------------------------------------------------------------------------------
procedure TForm1.Edit9Change(Sender: TObject);
begin
     Edit10.Text:='';
end;
procedure TForm1.Edit10Change(Sender: TObject);
begin
     Edit9.Text:='';
end;
//------------------------------------------------------------------------------
//                     Создание новой базы данных (+)
//------------------------------------------------------------------------------
procedure TForm1.Button6Click(Sender: TObject);
begin
 AssignFile(f,s);
 Rewrite(f);
 CloseFile(f);
end;
//------------------------------------------------------------------------------
//                      Добавление записи в файл (+)
//------------------------------------------------------------------------------
procedure TForm1.Button5Click(Sender: TObject);
begin
  try
     AssignFile(f,s);
     Reset(f);
     Seek(f,filesize(f));
     with BIL do
           begin
                n_r:=StrToInt(Edit1.Text);
                chislo:=StrToInt(Edit2.Text);
                mesto_otpr:=Edit3.Text;
                mesto_nazn:=Edit4.Text;
                vrema_vileta:=StrToInt(Edit5.Text);
                vrema_pribitia:=StrToInt(Edit6.Text);
                nomer_mesta:=StrToInt(Edit7.Text);
                stoim:=StrToInt(Edit8.Text);
                write(f,BIL);
           end;
     CloseFile(f)
  except
       Form6.Left:=395;
       Form6.Top:=263;
       Form6.Showmodal;
  end;
end;
//------------------------------------------------------------------------------
//                      Инициализация программы (+)
//------------------------------------------------------------------------------
procedure TForm1.FormCreate(Sender: TObject);
begin
 Form1.Left:=176;
 Form1.Top:=43;
 RadioButton5.Checked:=true;
 RadioButton1.Checked:=true;
 RadioButton8.Checked:=true;
end;
//------------------------------------------------------------------------------
//                      Вывод записей на экран (+)
//------------------------------------------------------------------------------
procedure TForm1.Button3Click(Sender: TObject);
begin
  try
     Memo1.Lines.Clear;
     AssignFile(f,s);
     Reset(f);
     if filesize(f)=0 then exit;
     i:=0;
     repeat
           Seek(f,i);
           Read(f,Bil);
           with BIL do
             begin
                  Memo1.Lines.Add('Номер рейса:'+VarToStr(n_r));
                  Memo1.Lines.Add('Число:'+VarToStr(chislo));
                  Memo1.Lines.Add('Место отправления:'+mesto_otpr);
                  Memo1.Lines.Add('Место назначения:'+mesto_nazn);
                  Memo1.Lines.Add('Время вылета:'+VarToStr(vrema_vileta));
                  Memo1.Lines.Add('Время прибытия:'+VarToStr(vrema_pribitia));
                  Memo1.Lines.Add('Номер места:'+VarToStr(nomer_mesta));
                  Memo1.Lines.Add('Стоимость:'+VarToStr(stoim));
                  Memo1.Lines.Add('            ');
             end;
           inc(i);
     until i=filesize(f);
     CloseFile(f);
  except
     Form6.Left:=395;
     Form6.Top:=263;
     Form6.Showmodal;
  end;
end;
//------------------------------------------------------------------------------
//                          Очистка полей (+)
//------------------------------------------------------------------------------
procedure TForm1.Button7Click(Sender: TObject);
begin
     Edit1.Text:='';
     Edit2.Text:='';
     Edit3.Text:='';
     Edit4.Text:='';
     Edit5.Text:='';
     Edit6.Text:='';
     Edit7.Text:='';
     Edit8.Text:='';
end;
//------------------------------------------------------------------------------
//                          Слияние файлов (+)
//------------------------------------------------------------------------------
procedure sliyanie_2_serii(parametr:word;var g1,g2,FILES:TFile;d1,d2:word);
begin
 flag1:=false;
 flag2:=false;
 uk1:=0;
 uk2:=0;
 UKBIL:=0;
 repeat
    if (flag1=false)and(flag2=false) then
      begin
           Seek(g1,uk1);
           Seek(g2,uk2);
           Read(g1,BILuk1);
           Read(g2,BILuk2);
           case parametr of
                     1:begin par1:=BILuk1.n_r;par2:=BILuk2.n_r;end;
                     2:begin par1:=BILuk1.chislo;par2:=BILuk2.chislo;end;
                     3:begin par1:=BILuk1.stoim;par2:=BILuk2.stoim;end;
                 end;
           if par1<par2 then
                begin
                     Seek(FILES,UKBIL);
                     Write(FILES,BILuk1);
                     inc(uk1);
                     inc(UKBIL);
                end
           else
               begin
                    Seek(FILES,UKBIL);
                    Write(FILES,BILuk2);
                    inc(uk2);
                    inc(UKBIL);
               end;
      end;
    if (flag1=false)and(flag2=true) then
        begin
           Seek(g1,uk1);
           Read(g1,BILuk1);
           Seek(FILES,UKBIL);
           Write(FILES,BILuk1);
           inc(uk1);
           inc(UKBIL);
        end;
    if (flag1=true)and(flag2=false) then
        begin
           Seek(g2,uk2);
           Read(g2,BILuk2);
           Seek(FILES,UKBIL);
           Write(FILES,BILuk2);
           inc(uk2);
           inc(UKBIL);
        end;
    if (uk1=d1)and(flag1=false) then flag1:=true;
    if (uk2=d2)and(flag2=false) then flag2:=true;
 until (flag1=true)and(flag2=true);
end;
//------------------------------------------------------------------------------
//                      Сортировка многопутевым слиянием
//------------------------------------------------------------------------------
procedure Sortiruem(parametr:word;SIZE:integer);
var par:word;
begin
   m:=trunc(SIZE/3);
   for h:=1 to 3 do
     case h of
        1:begin
               for i:=0 to m-1 do
                   begin
                        Seek(fsort,i);
                        Read(fsort,BIL);
                        Seek(fsort,i);
                        Write(f1,BIL);
                   end;
               for i:=1 to m-1 do
                   begin
                        k:=i;
                        Seek(f1,i-1);
                        Read(f1,BIL);
                        Seek(f1,i-1);
                        Read(f1,BIL1);
                        case parametr of
                              1:begin par:=BIL.n_r;end;
                              2:begin par:=BIL.chislo;end;
                              3:begin par:=BIL.stoim;end;
                          end;
                        x:=par;
                        for j:=i+1 to m do
                          begin
                               Seek(f1,j-1);
                               Read(f1,BIL);
                               case parametr of
                                     1:begin par:=BIL.n_r;end;
                                     2:begin par:=BIL.chislo;end;
                                     3:begin par:=BIL.stoim;end;
                                    end;
                               if par<x then
                                  begin
                                     k:=j;
                                     Seek(f1,k-1);
                                     Read(f1,BIL1);
                                     case parametr of
                                              1:begin par:=BIL.n_r;end;
                                              2:begin par:=BIL.chislo;end;
                                              3:begin par:=BIL.stoim;end;
                                           end;
                                     x:=par;
                                  end;
                          end;
                        Seek(f1,i-1);
                        Read(f1,BIL);
                        Seek(f1,k-1);
                        Write(f1,BIL);
                        Seek(f1,i-1);
                        Write(f1,BIL1);
                   end;
          end;
    2:begin
          for i:=m to 2*m-1 do
               begin
                    Seek(fsort,i);
                    Read(fsort,BIL);
                    Seek(fsort,i-m);
                    Write(f2,BIL);
               end;
          for i:=1 to m-1 do
               begin
                    k:=i;
                    Seek(f2,i-1);
                    Read(f2,BIL);
                    Seek(f2,i-1);
                    Read(f2,BIL1);
                    case parametr of
                               1:begin par:=BIL.n_r;end;
                               2:begin par:=BIL.chislo;end;
                               3:begin par:=BIL.stoim;end;
                          end;
                    x:=par;
                    for j:=i+1 to m do
                        begin
                            Seek(f2,j-1);
                            Read(f2,BIL);
                            case parametr of
                                        1:begin par:=BIL.n_r;end;
                                        2:begin par:=BIL.chislo;end;
                                        3:begin par:=BIL.stoim;end;
                                   end;
                            if par<x then
                                begin
                                     k:=j;
                                     Seek(f2,k-1);
                                     Read(f2,BIL1);
                                     case parametr of
                                           1:begin par:=BIL.n_r;end;
                                           2:begin par:=BIL.chislo;end;
                                           3:begin par:=BIL.stoim;end;
                                         end;
                                     x:=par;
                                end;
                        end;
                    Seek(f2,i-1);
                    Read(f2,BIL);
                    Seek(f2,k-1);
                    Write(f2,BIL);
                    Seek(f2,i-1);
                    Write(f2,BIL1);
               end;
           end;
       3:begin
            PLUS:= SIZE-3*(trunc(SIZE/3));
            for i:=2*m to 3*m-1+PLUS do
                begin
                     Seek(fsort,i);
                     Read(fsort,BIL);
                     Seek(fsort,i-2*m);
                     Write(f3,BIL);
                end;
            for i:=1 to m-1+PLUS do
                begin
                     k:=i;
                     Seek(f3,i-1);
                     Read(f3,BIL);
                     Seek(f3,i-1);
                     Read(f3,BIL1);
                     case parametr of
                                   1:begin par:=BIL.n_r;end;
                                   2:begin par:=BIL.chislo;end;
                                   3:begin par:=BIL.stoim;end;
                            end;
                     x:=par;
                     for j:=i+1 to m+PLUS do
                        begin
                             Seek(f3,j-1);
                             Read(f3,BIL);
                             case parametr of
                                    1:begin par:=BIL.n_r;end;
                                    2:begin par:=BIL.chislo;end;
                                    3:begin par:=BIL.stoim;end;
                                 end;
                             if par<x then
                                begin
                                     k:=j;
                                     Seek(f3,k-1);
                                     Read(f3,BIL1);
                                     case parametr of
                                           1:begin par:=BIL.n_r;end;
                                           2:begin par:=BIL.chislo;end;
                                           3:begin par:=BIL.stoim;end;
                                        end;
                                     x:=par;
                                end;
                        end;
                     Seek(f3,i-1);
                     Read(f3,BIL);
                     Seek(f3,k-1);
                     Write(f3,BIL);
                     Seek(f3,i-1);
                     Write(f3,BIL1);
                end;
         end;
     end;  //END CASE
end;
//------------------------------------------------------------------------------
//                      Сортировка многопутевым слиянием (+)
//------------------------------------------------------------------------------
procedure TForm1.Button2Click(Sender: TObject);
begin
 try
   //------------------Проверка на существование файла--------------------------
   Memo1.Clear;
   s1:='C:\user\labobj1.txt';
   s2:='C:\user\labobj2.txt';
   s3:='C:\user\labobj3.txt';
   s4:='C:\user\labsl.txt';
   AssignFile(fsort,s);
   Reset(fsort);
   SIZE:=FileSize(Fsort);
   if SIZE>2 then
   begin
   //---------------------------------------------------------------------------
   AssignFile(f1,s1);
   AssignFile(f2,s2);
   AssignFile(f3,s3);
   AssignFile(f,s4);
   Rewrite(f1);
   Rewrite(f2);
   Rewrite(f3);
   if RadioButton5.Checked=true then
      begin
                 Sortiruem(1,SIZE);
                 Rewrite(f);
                 sliyanie_2_serii(1,f1,f2,f,filesize(f1),filesize(f2));
                 CloseFile(fsort);
                 Rewrite(fsort);
                 sliyanie_2_serii(1,f,f3,fsort,filesize(f),filesize(f3));
                 CloseFile(f);
      end;
   if RadioButton6.Checked=true then
      begin
                  Sortiruem(2,SIZE);
                  Rewrite(f);
                  sliyanie_2_serii(2,f1,f2,f,filesize(f1),filesize(f2));
                  CloseFile(fsort);
                  Rewrite(fsort);
                  sliyanie_2_serii(2,f,f3,fsort,filesize(f),filesize(f3));
                  CloseFile(f);
      end;
   if RadioButton7.Checked=true then
      begin
                  Sortiruem(3,SIZE);
                  Rewrite(f);
                  sliyanie_2_serii(3,f1,f2,f,filesize(f1),filesize(f2));
                  CloseFile(fsort);
                  Rewrite(fsort);
                  sliyanie_2_serii(3,f,f3,fsort,filesize(f),filesize(f3));
                  CloseFile(f);
      end;
   CloseFile(f1);
   CloseFile(f2);
   CloseFile(f3);
   Erase(f);
   Erase(f1);
   Erase(f2);
   Erase(f3);
   end
   else
     begin
       CloseFile(fsort);
       Form6.Left:=395;
       Form6.Top:=263;
       Form6.Showmodal;
     end;
 except
   Form6.Left:=395;
   Form6.Top:=263;
   Form6.Showmodal;
 end;
end;
//------------------------------------------------------------------------------
//                      Сортировка файла выбором (+)
//------------------------------------------------------------------------------
procedure TForm1.Button1Click(Sender: TObject);
begin
 Memo1.Clear;
 try
  //--------------Проверка на существование базы данных-------------------------
  AssignFile(f,s);
  Reset(f);
  //--------------Проверка на пустой файл---------------------------------------
  if FileSize(f)<>0 then
  begin
  //----------------------------------------------------------------------------
  if RadioButton5.Checked=true then
     begin
          m:=filesize(f);
          for i:=1 to m-1 do
              begin
                   k:=i;
                   Seek(f,i-1);
                   Read(f,BIL);
                   Seek(f,i-1);
                   Read(f,BIL1);
                   x:=BIL.n_r;
                   for j:=i+1 to m do
                        begin
                             Seek(f,j-1);
                             Read(f,BIL);
                             if BIL.n_r<x then
                                 begin
                                      k:=j;
                                      Seek(f,k-1);
                                      Read(f,BIL1);
                                      x:=BIL1.n_r;
                                 end;
                        end;
                   Seek(f,i-1);
                   Read(f,BIL);
                   Seek(f,k-1);
                   Write(f,BIL);
                   Seek(f,i-1);
                   Write(f,BIL1);
              end;
     end;
  if RadioButton6.Checked=true then
     begin
          m:=filesize(f);
          for i:=1 to m-1 do
               begin
                    k:=i;
                    Seek(f,i-1);
                    Read(f,BIL);
                    Seek(f,i-1);
                    Read(f,BIL1);
                    x:=BIL.chislo;
                    for j:=i+1 to m do
                        begin
                             Seek(f,j-1);
                             Read(f,BIL);
                             if BIL.chislo<x then
                                begin
                                     k:=j;
                                     Seek(f,k-1);
                                     Read(f,BIL1);
                                     x:=BIL1.chislo;
                                end;
                        end;
                    Seek(f,i-1);
                    Read(f,BIL);
                    Seek(f,k-1);
                    Write(f,BIL);
                    Seek(f,i-1);
                    Write(f,BIL1);
               end;
     end;
  if RadioButton7.Checked=true then
     begin
          m:=filesize(f);
          for i:=1 to m-1 do
              begin
                   k:=i;
                   Seek(f,i-1);
                   Read(f,BIL);
                   Seek(f,i-1);
                   Read(f,BIL1);
                   x:=BIL.stoim;
                   for j:=i+1 to m do
                     begin
                          Seek(f,j-1);
                          Read(f,BIL);
                          if BIL.stoim<x then
                             begin
                                 k:=j;
                                 Seek(f,k-1);
                                 Read(f,BIL1);
                                 x:=BIL1.stoim;
                             end;
                     end;
                   Seek(f,i-1);
                   Read(f,BIL);
                   Seek(f,k-1);
                   Write(f,BIL);
                   Seek(f,i-1);
                   Write(f,BIL1);
              end;
     end;
  //----------------------------------------------------------------------------
  end;
  CloseFile(f);
 except
  Form6.Left:=395;
  Form6.Top:=263;
  Form6.Showmodal;
 end;
end;
//------------------------------------------------------------------------------
//                       Двоичный поиск строки (+)
//------------------------------------------------------------------------------
procedure TForm1.POISK_REIS(parametr:word);
var par:word;
begin
  //--------------Если у нас в файле вообще одна строка-------------------------
  if FileSize(f)=1 then
    begin
        try
           k:=StrToInt(Edit9.Text);
           Seek(f,0);
           Read(f,BIL);
           case parametr of
                        1:par:=BIL.n_r;
                        2:par:=BIL.chislo;
                        3:par:=BIL.stoim;
                      end;

           if k=par then
                with BIL do
                        begin
                           Memo2.Clear;
                           Memo2.Lines.Add('Номер рейса:'+VarToStr(n_r));
                           Memo2.Lines.Add('Число:'+VarToStr(chislo));
                           Memo2.Lines.Add('Место отправления:'+mesto_otpr);
                           Memo2.Lines.Add('Место назначения:'+mesto_nazn);
                           Memo2.Lines.Add('Время вылета:'+VarToStr(vrema_vileta));
                           Memo2.Lines.Add('Время прибытия:'+VarToStr(vrema_pribitia));
                           Memo2.Lines.Add('Номер места:'+VarToStr(nomer_mesta));
                           Memo2.Lines.Add('Стоимоть:'+VarToStr(stoim));
                           Memo2.Lines.Add('                            ');
                        end
           else Memo2.Clear;
        except
              Form6.Left:=395;
              Form6.Top:=263;
              Form6.Showmodal;
        end;
    end
  else
   begin
      //--------------Если записей больше одной---------------------------------
      SIZE:=FileSize(f);
      flag:=false;
      flagOK:=false;
      m:=trunc(SIZE/2);
      max:=size;
      min:=1;
      k:=StrToInt(Edit9.Text);
      repeat
            Seek(f,m-1);
            Read(f,BIL);
            case parametr of
                            1:par:=BIL.n_r;
                            2:par:=BIL.chislo;
                            3:par:=BIL.stoim;
                      end;
            if max=min then flag:=true;
            if k=par then flagOK:=true
                  else
                     begin
                        if k<par then max:=m-1
                        else min:=m+1;
                        if max<>min then m:=trunc((max-min)/2)+min
                        else m:=min;
                     end;
      until (flag=true)or(flagOK=true)or(max=0)or(min=size+1)or(min>max);
      //-----------------Выводим на экран---------------------------------------
      if (flagOK=false) then
                            begin
                                 Memo2.Clear;
                                 Form3.Left:=376;
                                 Form3.Top:=332;
                                 Form3.Showmodal;
                            end
      else
           begin
                Memo2.Clear;
                //----------------------Идем вперед относительно m--------------
                flag:=false;
                bufer_m:=m;
                repeat
                     Seek(f,m-1);
                     Read(f,BIL);
                     case parametr of
                                    1:par:=BIL.n_r;
                                    2:par:=BIL.chislo;
                                    3:par:=BIL.stoim;
                     end;
                     if k=par then
                        with BIL do
                            begin
                               Memo2.Lines.Add('Номер рейса:'+VarToStr(n_r));
                               Memo2.Lines.Add('Число:'+VarToStr(chislo));
                               Memo2.Lines.Add('Место отправления:'+mesto_otpr);
                               Memo2.Lines.Add('Место назначения:'+mesto_nazn);
                               Memo2.Lines.Add('Время вылета:'+VarToStr(vrema_vileta));
                               Memo2.Lines.Add('Время прибытия:'+VarToStr(vrema_pribitia));
                               Memo2.Lines.Add('Номер места:'+VarToStr(nomer_mesta));
                               Memo2.Lines.Add('Стоимоть:'+VarToStr(stoim));
                               Memo2.Lines.Add('                            ');
                            end
                     else flag:=true;
                     m:=m+1;
                     if m=size+1 then flag:=true;
                until flag=true;
                //-----------------------Идем назад относительно m--------------
                flag:=false;
                m:=bufer_m-1;
                if m>0 then
                        repeat
                              Seek(f,m-1);
                              Read(f,BIL);
                              case parametr of
                                              1:par:=BIL.n_r;
                                              2:par:=BIL.chislo;
                                              3:par:=BIL.stoim;
                              end;
                              if k=par then
                                with BIL do
                                  begin
                                   Memo2.Lines.Add('Номер рейса:'+VarToStr(n_r));
                                   Memo2.Lines.Add('Число:'+VarToStr(chislo));
                                   Memo2.Lines.Add('Место отправления:'+mesto_otpr);
                                   Memo2.Lines.Add('Место назначения:'+mesto_nazn);
                                   Memo2.Lines.Add('Время вылета:'+VarToStr(vrema_vileta));
                                   Memo2.Lines.Add('Время прибытия:'+VarToStr(vrema_pribitia));
                                   Memo2.Lines.Add('Номер места:'+VarToStr(nomer_mesta));
                                   Memo2.Lines.Add('Стоимоть:'+VarToStr(stoim));
                                   Memo2.Lines.Add('                            ');
                                  end
                              else flag:=true;
                              m:=m-1;
                              if m=0 then flag:=true;
                        until flag=true;
           end;
   end;
end;
//------------------------------------------------------------------------------
//                       Двоичный поиск строки (+)
//------------------------------------------------------------------------------
procedure TForm1.Button4Click(Sender: TObject);
begin
      //---------------Выводим предупреждение-----------------------------------
      flagform2:=true;
      Form2.Left:=343;
      Form2.Top:=320;
      Form2.ShowModal;
      if flagform2=false then
         begin
              Form2.Hide;
              try
                 AssignFile(f,s);
                 Reset(f);
                 if RadioButton1.Checked=true then POISK_REIS(1);
                 if RadioButton2.Checked=true then POISK_REIS(2);
                 if RadioButton3.Checked=true then POISK_REIS(3);
                 CloseFile(f);
              except
                 Form6.Left:=395;
                 Form6.Top:=263;
                 Form6.Showmodal;
              end;
         end;
end;
//------------------------------------------------------------------------------
//                       Прямой поиск строки (+)
//------------------------------------------------------------------------------
procedure TForm1.POISK_MESTO(parametr:word);
begin
  Memo2.Clear;
  for i:=1 to filesize(f) do
         begin
              Seek(f,i-1);
              Read(f,BIL);
              case parametr of
                             1:begin par:=BIL.mesto_otpr end;
                             2:begin par:=BIL.mesto_nazn end;
                          end;
              if par=Edit10.Text then
                   with BIL do
                        begin
                             Memo2.Lines.Add('Номер рейса:'+VarToStr(n_r));
                             Memo2.Lines.Add('Число:'+VarToStr(chislo));
                             Memo2.Lines.Add('Место отправления:'+mesto_otpr);
                             Memo2.Lines.Add('Место назначения:'+mesto_nazn);
                             Memo2.Lines.Add('Время вылета:'+VarToStr(vrema_vileta));
                             Memo2.Lines.Add('Время прибытия:'+VarToStr(vrema_pribitia));
                             Memo2.Lines.Add('Номер места:'+VarToStr(nomer_mesta));
                             Memo2.Lines.Add('Стоимоть:'+VarToStr(stoim));
                             Memo2.Lines.Add('                            ');
                        end
         end;
end;
//------------------------------------------------------------------------------
//                       Прямой поиск строки  (+)
//------------------------------------------------------------------------------
procedure TForm1.Button8Click(Sender: TObject);
begin
  try
     AssignFile(f,s);
     Reset(f);
     try
         if RadioButton8.Checked=true then POISK_MESTO(1);
         if RadioButton4.Checked=true then POISK_MESTO(2);
     except
           Form6.Left:=395;
           Form6.Top:=263;
           Form6.Showmodal;
     end;
     CloseFile(f);
  except
     Form6.Left:=395;
     Form6.Top:=263;
     Form6.Showmodal;
  end;
end;
//------------------------------------------------------------------------------
//                       Удаление из базы данных  (+)
//------------------------------------------------------------------------------
procedure TForm1.Button9Click(Sender: TObject);
label OKPOISK;
begin
 try
    AssignFile(f,s);
    Reset(f);
    flag:=false;
    for i:=0 to filesize(f)-1 do
          begin
              Seek(f,i);
              Read(f,BIL);
              if (BIL.n_r=StrToInt(Edit1.Text))and
               (BIL.chislo=StrToInt(Edit2.Text))and
               (BIL.mesto_otpr=Edit3.Text)and(BIL.mesto_nazn=Edit4.Text)and
               (BIL.vrema_vileta=StrToInt(Edit5.Text))and
               (BIL.vrema_pribitia=StrToInt(Edit6.Text))and
               (BIL.nomer_mesta=StrToInt(Edit7.Text))and(BIL.stoim=StrToInt(Edit8.Text))
              then
                  begin
                     flag:=true;
                     for k:=i+1 to filesize(f)-1 do
                       begin
                            Seek(f,k);
                            Read(f,BIL);
                            Seek(f,k-1);
                            Write(f,BIL);
                       end;
                     Seek(f,filesize(f)-1);
                     Truncate(f);              //Удаляем последнюю запись
                     goto OKPOISK;
                  end;
          end;
    OKPOISK:
    if flag=true then
                     begin
                          Form4.Left:=374;
                          Form4.Top:=244;
                          Form4.ShowModal;
                     end
                 else
                     begin
                          Form5.Left:=374;
                          Form5.Top:=244;
                          Form5.ShowModal;
                     end;
    CloseFile(f);
 except
       Form6.Left:=395;
       Form6.Top:=263;
       Form6.Showmodal;
 end;
end;
end.

