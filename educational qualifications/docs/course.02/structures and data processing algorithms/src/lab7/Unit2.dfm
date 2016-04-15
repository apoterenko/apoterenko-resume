object Form2: TForm2
  Left = 351
  Top = 201
  BorderStyle = bsDialog
  Caption = 'WARNING!!!'
  ClientHeight = 78
  ClientWidth = 297
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  PixelsPerInch = 96
  TextHeight = 13
  object Panel1: TPanel
    Left = 0
    Top = 0
    Width = 297
    Height = 78
    Align = alClient
    Color = clWindowText
    TabOrder = 0
    object Memo1: TMemo
      Left = 8
      Top = 8
      Width = 281
      Height = 33
      Color = clWindowText
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clLime
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      Lines.Strings = (
        #1042#1099' '#1076#1086#1083#1078#1085#1099' '#1086#1090#1089#1086#1088#1090#1080#1088#1086#1074#1072#1090#1100' '#1087#1086' '#1079#1072#1076#1072#1085#1085#1086#1084#1091' '#1082#1088#1080#1090#1077#1088#1080#1102', '
        #1082#1086#1090#1086#1088#1099#1081' '#1074#1099#1073#1080#1088#1072#1077#1090#1077' '#1076#1083#1103' '#1101#1092#1092#1077#1082#1090#1080#1074#1085#1086#1075#1086' '#1087#1086#1080#1089#1082#1072' ')
      ParentFont = False
      TabOrder = 0
    end
    object Button2: TButton
      Left = 152
      Top = 48
      Width = 137
      Height = 25
      Caption = #1042#1099#1093#1086#1076
      TabOrder = 1
      OnClick = Button2Click
    end
    object Button1: TButton
      Left = 8
      Top = 48
      Width = 137
      Height = 25
      Caption = #1055#1088#1086#1076#1086#1083#1078#1080#1090#1100
      TabOrder = 2
      OnClick = Button1Click
    end
  end
end
