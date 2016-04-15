object Form5: TForm5
  Left = 364
  Top = 231
  Width = 249
  Height = 129
  Caption = 'WARNING!!!'
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
    Width = 241
    Height = 95
    Align = alClient
    Color = clWindowText
    TabOrder = 0
    object Memo1: TMemo
      Left = 36
      Top = 16
      Width = 169
      Height = 25
      Color = clWindowText
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clLime
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      Lines.Strings = (
        #1044#1072#1085#1085#1099#1081' '#1082#1086#1084#1087#1086#1085#1077#1085#1090' '#1085#1077' '#1085#1072#1096#1077#1083#1089#1103)
      ParentFont = False
      ReadOnly = True
      TabOrder = 0
    end
    object BitBtn1: TBitBtn
      Left = 45
      Top = 56
      Width = 153
      Height = 25
      TabOrder = 1
      Kind = bkOK
    end
  end
end
