////////////////////////////////////////////////////////////////////////////////
//
//                  Окончательная версия ЛР №1 по КМ
//                  Автор: Потеренко А.Г. ВТ-31
//                  Дата завершения: 8.03.2006
////////////////////////////////////////////////////////////////////////////////
unit Unit1;
interface
uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, jpeg, ExtCtrls, StdCtrls, Unit2, Unit3, Unit4, ComCtrls;
const MAX=4;  //Всегда 4 - машины
      X1=0;
      X2=720;
      X3=300;
      X4=370;
      Y1=180;
      Y2=120;
      Y3=0;
      Y4=300;
type
  //////////////////////////////////////////////////////////////////////////////
  TNiva = class
     public
       x: integer;
       y: integer;
       v: word;        //скорость
       fl_napr: word;  //Направление. 1 - слева направо,
                       //             2 - сверху вниз,
                       //             3 - снизу вверх,
                       //             4 - справа налево,
       flag: boolean;  //Разрешить или запретить движение
       flg: word;      //1 - поворот будет , 0 - нет
       p: NIVA;
       hand: HWND;
       image1: TImage;
       image2: TImage;   //На случай, если элемент будет поворачивать
     public
       constructor Create(_x: word;
                          _y: word;
                          _v: word;
                          _fl_napr: word;
                          _flag: boolean;
                          _image2,_image3: TImage;
                          _image4,_image5: TImage;
                          _GB: TGroupBox);
       procedure DVIGENIE(HAND: HWND); //эта процедура вызывается для движения машины
   end;
  //////////////////////////////////////////////////////////////////////////////
  TForm1 = class(TForm)
    GroupBox1: TGroupBox;
    GroupBox2: TGroupBox;
    Image1: TImage;
    Image2: TImage;
    Button1: TButton;
    Image3: TImage;
    Image4: TImage;
    Image5: TImage;
    GroupBox3: TGroupBox;
    Panel1: TPanel;
    Image6: TImage;
    Image7: TImage;
    GroupBox4: TGroupBox;
    Label1: TLabel;
    UpDown1: TUpDown;
    Edit1: TEdit;
    CheckBox1: TCheckBox;
    PageControl1: TPageControl;
    TabSheet1: TTabSheet;
    TabSheet2: TTabSheet;
    Label2: TLabel;
    Edit2: TEdit;
    UpDown2: TUpDown;
    Button2: TButton;
    GroupBox5: TGroupBox;
    Label3: TLabel;
    Edit3: TEdit;
    UpDown3: TUpDown;
    Button7: TButton;
    Image8: TImage;
    Button3: TButton;
    Button4: TButton;
    procedure Button1Click(Sender: TObject);
    procedure Button7Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure CheckBox1Click(Sender: TObject);
    procedure Edit3Change(Sender: TObject);
    procedure Edit2Change(Sender: TObject);
    procedure Edit1Change(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
  end;
  //////////////////////////////////////////////////////////////////////////////
var
  Form1: TForm1;
  mas: array[1..4] of TNiva;
  svet: SVETOFOR;
  pesh: PESHEHOD;
  FLAG_POVOROT: boolean;
  MAX_V, MAX_PESH, MAX_SVET: word;
  FLUS: boolean;   //Проверка на пешехода
  FLAG_ECHEST_PESHEHOD: boolean;
implementation
{$R *.dfm}
////////////////////////////////////////////////////////////////////////////////
///////////////////////////Конструктор объекта//////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
constructor TNiva.Create(_x: word;
                         _y: word;
                         _v: word;
                         _fl_napr: word;
                         _flag: boolean;
                         _image2,_image3: TImage;
                         _image4,_image5: TImage;
                         _GB: TGroupBox);
begin
 ////////////////////Характеристики объекта/////////////////////////////////////
 x:=_x;
 y:=_y;
 v:=_v;
 fl_napr:=_fl_napr;
 flag:=_flag;
 ////////////////Выбираем - будет ли поворот////////////////////////////////////
 randomize;
 if FLAG_POVOROT=true then
    flg:=random(2)
 else
    flg:=0;
 /////////////Создаем динамически рисунки///////////////////////////////////////
 image1:= TImage.Create(nil);
 image1.Parent:=_GB;
 image2:= TImage.Create(nil);
 image2.Parent:=_GB;
 ////////////////////Выбираем нужный рисунок////////////////////////////////////
 case fl_napr of
   1: begin
       image1.Width:=45;                                                             
       image1.Height:=25;
       image2.Width:=25;
       image2.Height:=45;
       image1.Picture:=_image2.Picture;
       image1.Visible:=false;  //чтоб не было в самом начале видно (в углу)
       image2.Visible:=false;  //в начале движения "поворот машины" невиден
       image2.Picture:=_image5.Picture;
      end;
   2: begin
       image1.Width:=25;
       image1.Height:=45;
       image2.Width:=45;
       image2.Height:=25;
       image1.Picture:=_image5.Picture;
       image1.Visible:=false;
       image2.Visible:=false;  //в начале движения "поворот машины" невиден
       image2.Picture:=_image3.Picture;
      end;
   3: begin
       image1.Width:=25;
       image1.Height:=45;
       image2.Width:=45;
       image2.Height:=25;
       image1.Picture:=_image4.Picture;
       image1.Visible:=false;
       image2.Visible:=false;  //в начале движения "поворот машины" невиден
       image2.Picture:=_image2.Picture;
      end;
   4: begin
       image1.Width:=45;
       image1.Height:=25;
       image2.Width:=25;
       image2.Height:=45;
       image1.Picture:=_image3.Picture;
       image1.Visible:=false;
       image2.Visible:=false;  //в начале движения "поворот машины" невиден
       image2.Picture:=_image4.Picture;
      end;
  end;
 ////////////////////
 p:=NIVA.Create(true);
 hand:=p.Handle;   //Идентификатор потока
 p.Priority:=tpLower;
 p.Resume;
end;
////////////////////////////////////////////////////////////////////////////////
///////////////////////////Движение объектов - машин////////////////////////////
////////////////////////////////////////////////////////////////////////////////
procedure TNiva.DVIGENIE(HAND: HWND);
var i: word;
    _slag: boolean;
begin
 randomize;
 ////////////Если машины пересекутся на перекрестке/////////////////////////////
 if (mas[1].x=316)and(mas[2].x=333)and(mas[3].x=300)and(mas[4].x=370)and
    (mas[1].y=180)and(mas[2].y=120)and(mas[3].y=128)and(mas[4].y=150)
    then ShowMessage('Никто не уступил дорогу!');
 ///////////////////////////////////////////////////////////////////////////////
 for i:=1 to MAX do
    if mas[i].hand=HAND then
      case mas[i].fl_napr of
        1:begin
           ////////////////Движение в зависимости от светофора//////////////////
           _slag:=true;   //от этого флага зависит, будет ли двигаться машина
           if (mas[i].x>160)and(mas[i].x<190) then
              begin
                if mas[i].flag=true then
                   _slag:=false
                else
                   _slag:=true;
              end;
           if _slag=true then begin
           /////////Слева направо///////////////////////////////////////////////
           if mas[i].flg=0 then //Поворота нет
             begin
              if mas[i].x>X2 then   //Если машина вышла из зоны видимости
               begin
                mas[i].x:=X1;
                mas[i].y:=Y1;
                if FLAG_POVOROT=true then
                  mas[i].flg:=random(2) //выбираем новое направление
                else
                  mas[i].flg:=0;
                mas[i].v:=random(MAX_V)+1; //выбираем новую скорость движения
               end;
              /////////////Поворота нет - обычное движение//////////////////////
              if not ((Form1.Image8.Top>148)and(Form1.Image8.Top<197)and
                   (mas[i].x>209)and(mas[i].x<292)and(FLUS=false)
                   and(FLAG_ECHEST_PESHEHOD=true))
               then
                begin
                if not ((mas[3].y>132)and(mas[3].y<=207)and(mas[i].x>=246)and(mas[i].x<=328))
                then
                 begin
                 //////////////////2 машина на перекрестке//////////////////////
                  if not((mas[4].y>=126)and(mas[4].y<=206)and(mas[i].x>=316)and(mas[i].x<=396))
                   then
                   begin
                    mas[i].image1.Visible:=false;
                    mas[i].x:=mas[i].x+mas[i].v;
                    mas[i].image1.Left:=mas[i].x;
                    mas[i].image1.Top:=mas[i].y;
                    mas[i].image1.Visible:=true;
                   end;
                 ///////////////////////////////////////////////////////////////
                 end;
                end;
              //////////////////////////////////////////////////////////////////
             end
           else  //Поворот есть
             begin
              if mas[i].y>Y4 then   //Если машина вышла из зоны видимости
               begin
                mas[i].x:=X1;
                mas[i].y:=Y1;
                if FLAG_POVOROT=true then
                  mas[i].flg:=random(2) //выбираем новое направление
                else
                  mas[i].flg:=0;
                mas[i].v:=random(MAX_V)+1; //выбираем новую скорость движения
               end;
              //Машина движется до поворота и поворачивает
              if mas[i].x<=X3-10 then
                begin
                  if not ((Form1.Image8.Top>148)and(Form1.Image8.Top<197)and
                   (mas[i].x>209)and(mas[i].x<292)and(FLUS=false)
                   and(FLAG_ECHEST_PESHEHOD=true)) then
                  begin
                   if not ((mas[3].y>132)and(mas[3].y<=207)and(mas[i].x>=246)and(mas[i].x<=328))
                   then
                    begin
                    //Движение нормально
                    mas[i].image2.Visible:=false;
                    ////////////////////////////////////////////////////////////
                    mas[i].image1.Visible:=false;
                    mas[i].x:=mas[i].x+mas[i].v;
                    mas[i].image1.Left:=mas[i].x;
                    mas[i].image1.Top:=mas[i].y;
                    mas[i].image1.Visible:=true;
                   end;
                  end;
                end
              else
                begin
                  //Движение уже с поворотом
                  mas[i].image1.Visible:=false;
                  //////////////////////////////////////////////////////////////
                  mas[i].image2.Visible:=false;
                  mas[i].y:=mas[i].y+mas[i].v;
                  mas[i].image2.Left:=mas[i].x;
                  mas[i].image2.Top:=mas[i].y;
                  mas[i].image2.Visible:=true;
                end;
             end;
           end;
          end;
        2:begin
           ////////////////Движение в зависимости от светофора//////////////////
           _slag:=true;
           if (mas[i].y>10)and(mas[i].y<40) then
              begin
                if mas[i].flag=false then
                   _slag:=false
                else
                   _slag:=true;
              end;
           if _slag=true then begin
           /////////Сверху вниз/////////////////////////////////////////////////
           if mas[i].flg=0 then //Поворота нет
             begin
              if mas[i].y>Y4 then   //Если машина вышла из зоны видимости
               begin
                mas[i].x:=X3;
                mas[i].y:=Y3;
                if FLAG_POVOROT=true then
                  mas[i].flg:=random(2) //выбираем новое направление
                else
                  mas[i].flg:=0;
                mas[i].v:=random(MAX_V)+1; //выбираем новую скорость движения
               end;
              //////////////Поворота нет - обычное движение/////////////////////
              ///Здесь возможен наезд на машину/////////////////////////////////
              if not((mas[i].y>=128)and(mas[i].y<=132)and(mas[1].x>=246)and(mas[1].x<=328))
               then
                begin
                 if not((mas[i].y>=76)and(mas[i].y<=80)and(mas[2].x>=250)and(mas[2].x<=333)) then
                  begin
                    mas[i].image1.Visible:=false;
                    mas[i].y:=mas[i].y+mas[i].v;
                    mas[i].image1.Left:=mas[i].x;
                    mas[i].image1.Top:=mas[i].y;
                    mas[i].image1.Visible:=true;
                  end;
               end;
             end
           else  //Поворот есть
             begin
              if mas[i].x<X1 then   //Если машина вышла из зоны видимости
               begin
                mas[i].x:=X3;
                mas[i].y:=Y3;
                if FLAG_POVOROT=true then
                  mas[i].flg:=random(2) //выбираем новое направление
                else
                  mas[i].flg:=0;
                mas[i].v:=random(MAX_V)+1; //выбираем новую скорость движения
               end;
              //Машина движется до поворота и поворачивает
              if mas[i].y<Y2 then
                begin
                  if not((mas[i].y>=76)and(mas[i].y<=80)and(mas[2].x>=250)and(mas[2].x<=333)) then
                   begin
                   mas[i].image2.Visible:=false;
                   /////////////////////////////////////////////////////////////
                   mas[i].image1.Visible:=false;
                   mas[i].y:=mas[i].y+mas[i].v;
                   mas[i].image1.Left:=mas[i].x;
                   mas[i].image1.Top:=mas[i].y;
                   mas[i].image1.Visible:=true;
                  end;
                end
              else
                begin
                   if not((Form1.Image8.Top>100)and(Form1.Image8.Top<146)and
                   (mas[i].x>168)and(mas[i].x<250)
                   and(FLAG_ECHEST_PESHEHOD=true)) then
                   begin
                    //Движение уже с поворотом
                    mas[i].image1.Visible:=false;
                    ////////////////////////////////////////////////////////////
                    mas[i].image2.Visible:=false;
                    mas[i].x:=mas[i].x-mas[i].v;
                    mas[i].image2.Left:=mas[i].x;
                    mas[i].image2.Top:=mas[i].y;
                    mas[i].image2.Visible:=true;
                   end;
                end;
             end;
           end;
          end;
        3:begin
           ////////////////Движение в зависимости от светофора//////////////////
           _slag:=true;
           if (mas[i].y>240)and(mas[i].y<270) then
              begin
                if mas[i].flag=false then
                   _slag:=false
                else
                   _slag:=true;
              end;
           if _slag=true then begin
           /////////Снизу вверх/////////////////////////////////////////////////
           if mas[i].flg=0 then //Поворота нет
             begin
              if mas[i].y<Y3 then   //Если машина вышла из зоны видимости
               begin
                mas[i].x:=X4;
                mas[i].y:=Y4;
                if FLAG_POVOROT=true then
                  mas[i].flg:=random(2) //выбираем новое направление
                else
                  mas[i].flg:=0;
                mas[i].v:=random(MAX_V)+1; //выбираем новую скорость движения
               end;
              ///////////////Поворота нет - обычное движение////////////////////
              ///Здесь возможен наезд на машину/////////////////////////////////
              if not((mas[i].y>=210)and(mas[i].y<=214)and(mas[1].x>=316)and(mas[1].x<=396))
               then
               begin
               if not((mas[i].y>=146)and(mas[i].y<=150)and(mas[2].x>=320)and(mas[2].x<=402))
                 then
                   begin
                      mas[i].image1.Visible:=false;
                      mas[i].y:=mas[i].y-mas[i].v;
                      mas[i].image1.Left:=mas[i].x;
                      mas[i].image1.Top:=mas[i].y;
                      mas[i].image1.Visible:=true;
                   end;
               end;
             end
           else  //Поворот есть
             begin
              if mas[i].x>X2 then   //Если машина вышла из зоны видимости
               begin
                mas[i].x:=X4;
                mas[i].y:=Y4;
                if FLAG_POVOROT=true then
                  mas[i].flg:=random(2) //выбираем новое направление
                else
                  mas[i].flg:=0;
                mas[i].v:=random(MAX_V)+1; //выбираем новую скорость движения
               end;
              //Машина движется до поворота и поворачивает
              if mas[i].y>Y1 then
                begin
                  if not((mas[i].y>=210)and(mas[i].y<=214)and(mas[1].x>=316)and(mas[1].x<=396))
                   then
                   begin
                    //Движение нормально
                    mas[i].image2.Visible:=false;
                    ////////////////////////////////////////////////////////////
                    mas[i].image1.Visible:=false;
                    mas[i].y:=mas[i].y-mas[i].v;
                    mas[i].image1.Left:=mas[i].x;
                    mas[i].image1.Top:=mas[i].y;
                    mas[i].image1.Visible:=true;
                   end;
                end
              else
                begin
                  //Движение уже с поворотом
                  mas[i].image1.Visible:=false;
                  //////////////////////////////////////////////////////////////
                  mas[i].image2.Visible:=false;
                  mas[i].x:=mas[i].x+mas[i].v;
                  mas[i].image2.Left:=mas[i].x;
                  mas[i].image2.Top:=mas[i].y;
                  mas[i].image2.Visible:=true;
                end;
             end;
           end;
          end;
        4:begin
           ////////////////Движение в зависимости от светофора//////////////////
           _slag:=true;
           if ((mas[i].x>480)and(mas[i].x<510))or
              ((mas[i].x>170)and(mas[i].x<253))  //левый и правый пешеходный переход
            then
              begin
                if mas[i].flag=true then
                   _slag:=false
                else
                   _slag:=true;
              end;
           if _slag=true then begin
           /////////Справа налево///////////////////////////////////////////////
           if mas[i].flg=0 then //Поворота нет
             begin
              if mas[i].x<X1 then   //Если машина вышла из зоны видимости
               begin
                mas[i].x:=X2;
                mas[i].y:=Y2;
                mas[i].flg:=0;
                if FLAG_POVOROT=true then
                  mas[i].flg:=random(2) //выбираем новое направление
                else
                  mas[i].flg:=0;
                mas[i].v:=random(MAX_V)+1; //выбираем новую скорость движения
               end;
              /////////////Поворота нет - обычное движение//////////////////////
              if not((Form1.Image8.Top>100)and(Form1.Image8.Top<146)and
                   (mas[i].x>168)and(mas[i].x<250)and(FLUS=true)
                   and(FLAG_ECHEST_PESHEHOD=true)) then
                begin  //Условие - проверка пешеход на пути машины
                 if not((mas[4].y>=76)and(mas[4].y<=144)and(mas[i].x>=320)and(mas[i].x<=402))
                  then
                  begin  //Проверка на столкновение с машиной
                   if not((mas[3].y>=80)and(mas[3].y<=150)and(mas[i].x>=250)and(mas[i].x<=333))
                   then   //Второе столкновение
                    begin
                     mas[i].image1.Visible:=false;
                     mas[i].x:=mas[i].x-mas[i].v;
                     mas[i].image1.Left:=mas[i].x;
                     mas[i].image1.Top:=mas[i].y;
                     mas[i].image1.Visible:=true;
                    end;
                  end;
                end;
              //////////////////////////////////////////////////////////////////
             end
           else  //Поворот есть
             begin
              if mas[i].y<Y3 then   //Если машина вышла из зоны видимости
               begin
                mas[i].x:=X2;
                mas[i].y:=Y2;
                if FLAG_POVOROT=true then
                  mas[i].flg:=random(2) //выбираем новое направление
                else
                  mas[i].flg:=0;
                mas[i].v:=random(MAX_V)+1; //выбираем новую скорость движения
               end;
              //Машина движется до поворота и поворачивает
              if mas[i].x>X4 then
                begin
                  begin
                   if not((mas[4].y>=76)and(mas[4].y<=144)and(mas[i].x>=320)and(mas[i].x<=402))
                    then
                     begin
                      mas[i].image2.Visible:=false;
                      //////////////////////////////////////////////////////////
                      mas[i].image1.Visible:=false;
                      mas[i].x:=mas[i].x-mas[i].v;
                      mas[i].image1.Left:=mas[i].x;
                      mas[i].image1.Top:=mas[i].y;
                      mas[i].image1.Visible:=true;
                    end;
                  end;
                end
              else
                begin
                  //Движение уже с поворотом
                  mas[i].image1.Visible:=false;
                  //////////////////////////////////////////////////////////////
                  mas[i].image2.Visible:=false;
                  mas[i].y:=mas[i].y-mas[i].v;
                  mas[i].image2.Left:=mas[i].x;
                  mas[i].image2.Top:=mas[i].y;
                  mas[i].image2.Visible:=true;
                end;
             end;
           end;
          end;
      end;
end;
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button1Click(Sender: TObject);
var im: TImage;
begin
 //////////Создаем 4 объекта - машины///////////////////////////////////////////
 mas[1]:=TNiva.Create(X1,Y1,1,1,true,Image2,Image3,Image4,Image5,Form1.GroupBox2);
 mas[2]:=TNiva.Create(X2,Y2,1,4,true,Image2,Image3,Image4,Image5,Form1.GroupBox2);
 mas[3]:=TNiva.Create(X3,Y3,1,2,true,Image2,Image3,Image4,Image5,Form1.GroupBox2);
 mas[4]:=TNiva.Create(X4,Y4,1,3,true,Image2,Image3,Image4,Image5,Form1.GroupBox2);
 ///////Запускаем поток - светофор//////////////////////////////////////////////
 svet:=SVETOFOR.Create(true);
 svet.Priority:=tpLower;
 svet.Resume;
 ///////////////////////////////////////////////////////////////////////////////
 Button1.Enabled:=false;
 Button7.Enabled:=true;
 Edit1.Enabled:=true;
 UpDown1.Enabled:=true;
 Edit2.Enabled:=true;
 UpDown2.Enabled:=true;
 Edit3.Enabled:=true;
 UpDown3.Enabled:=true;
 Form1.CheckBox1.Enabled:=true;
 Button2.Enabled:=true;
end;
////////////////////////////////////////////////////////////////////////////////
procedure TForm1.Button7Click(Sender: TObject);
begin
 Image8.Visible:=true;
 ///////Запускаем поток - пешеход///////////////////////////////////////////////
 pesh:=PESHEHOD.Create(true);
 pesh.Priority:=tpLower;
 pesh.Resume;
 FLAG_ECHEST_PESHEHOD:=true;
end;
/////////////////////////////Инициализация//////////////////////////////////////
procedure TForm1.FormCreate(Sender: TObject);
begin
 randomize;
 MAX_V:=StrToInt(Form1.Edit1.Text);
 MAX_PESH:=StrToInt(Form1.Edit3.Text);
 MAX_SVET:=StrToInt(Form1.Edit2.Text);
 FLAG_POVOROT:=false;
 Form1.Left:=189;
 Form1.Top:=152;
 ///////////////////////////////////////////////////////////////////////////////
 Button7.Enabled:=false;
 Edit1.Enabled:=false;
 UpDown1.Enabled:=false;
 Edit2.Enabled:=false;
 UpDown2.Enabled:=false;
 Edit3.Enabled:=false;
 UpDown3.Enabled:=false;
 Form1.CheckBox1.Enabled:=false;
 Button2.Enabled:=false;
 Button3.Enabled:=false;
 Button4.Enabled:=false;
 FLAG_ECHEST_PESHEHOD:=false; //вначале сопротивление пешехода нет
end;
/////////////////////Пользователь выбирает - будет ли поворот///////////////////
procedure TForm1.CheckBox1Click(Sender: TObject);
begin
 if FLAG_POVOROT=false then
   FLAG_POVOROT:=true
 else
   FLAG_POVOROT:=false;
end;
/////////////////////Пользователь выбирает скорость машин///////////////////////
procedure TForm1.Edit3Change(Sender: TObject);
begin
 MAX_PESH:=StrToInt(Form1.Edit3.Text);
end;
procedure TForm1.Edit2Change(Sender: TObject);
begin
 MAX_SVET:=StrToInt(Form1.Edit2.Text);
end;
procedure TForm1.Edit1Change(Sender: TObject);
begin
 MAX_V:=StrToInt(Form1.Edit1.Text);
end;
///////Пользователь вручную захотел изменять свет светофора/////////////////////
procedure TForm1.Button4Click(Sender: TObject);
begin
  svet.SVETOFORS; //вручную переключаем светофор
end;
///////////////Остановили светофор//////////////////////////////////////////////
procedure TForm1.Button2Click(Sender: TObject);
begin
 svet.Suspend;
 Button2.Enabled:=false;
 Button3.Enabled:=true;
 Button4.Enabled:=true;
end;
/////////////Возобновили работу светофора///////////////////////////////////////
procedure TForm1.Button3Click(Sender: TObject);
begin
 svet.Resume;
 Button3.Enabled:=false;
 Button4.Enabled:=false;
 Button2.Enabled:=true;
end;
end.

