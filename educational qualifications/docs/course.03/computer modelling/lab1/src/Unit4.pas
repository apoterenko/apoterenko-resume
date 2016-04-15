unit Unit4;
interface
uses
  Classes,SysUtils,Variants;
type
  PESHEHOD = class(TThread)
  protected
    procedure Execute; override;
    procedure DVIGENIE;
  end;
var
  PESH_FLAG: boolean;
implementation
uses Unit1, Unit3;
////////////////////////////////////////////////////////////////////////////////
procedure PESHEHOD.Execute;
begin
 while true do
  begin
    Synchronize(DVIGENIE);
    Sleep(50);
  end;
end;
////////////////////////////////////////////////////////////////////////////////
////Процедура движения пешехода - в зависимости от светофора и успеваемости/////
////////////////////////////////////////////////////////////////////////////////
procedure PESHEHOD.DVIGENIE;
begin
if svet.SV_FLAG=true then
begin
 /////////////Движение вверх или вниз///////////////////////////////////////////
 FLUS:=false;
 if PESH_FLAG=false then
   begin
     //Идем вниз
     Form1.Image8.Top:=Form1.Image8.Top+MAX_PESH;
   end
 else
   begin
     //Идем вверх
     Form1.Image8.Top:=Form1.Image8.Top-MAX_PESH;
   end;
 if Form1.Image8.Top>208 then PESH_FLAG:=true;
 if Form1.Image8.Top<108 then PESH_FLAG:=false;
 ///////////////////////////////////////////////////////////////////////////////
end
else
 begin
   //////Проверяем - успел ли пешеход перейти дорогу////////////////////////////
   FLUS:=true;
   if PESH_FLAG=false then  //идем вниз
    begin
     if (Form1.Image8.Top<=150)and(Form1.Image8.Top>110) then
       Form1.Image8.Top:=Form1.Image8.Top-4;
     if (Form1.Image8.Top>=166)and(Form1.Image8.Top<207) then
       Form1.Image8.Top:=Form1.Image8.Top+4;
    end
   else  //идем вверх
    begin
     if (Form1.Image8.Top>=166)and(Form1.Image8.Top<207) then
       Form1.Image8.Top:=Form1.Image8.Top-4;
     if (Form1.Image8.Top<=150)and(Form1.Image8.Top>110) then
       Form1.Image8.Top:=Form1.Image8.Top+4;
    end;
 end;
end;
////////////////////////////////////////////////////////////////////////////////
end.
 