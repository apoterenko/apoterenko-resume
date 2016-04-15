unit Unit2;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls, Buttons;

type
  TForm2 = class(TForm)
    Panel1: TPanel;
    Memo1: TMemo;
    Button2: TButton;
    Button1: TButton;
    procedure Button2Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form2: TForm2;
  flagform2:boolean;
  
implementation

{$R *.dfm}

procedure TForm2.Button2Click(Sender: TObject);
begin
  flagform2:=true;
  Form2.Close;
end;
procedure TForm2.Button1Click(Sender: TObject);
begin
  flagform2:=false;
  Form2.Close;
end;
end.
