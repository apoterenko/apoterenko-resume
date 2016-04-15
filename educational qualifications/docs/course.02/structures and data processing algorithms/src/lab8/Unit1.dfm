object Form1: TForm1
  Left = 236
  Top = 135
  BorderStyle = bsDialog
  Caption = 
    #1051#1072#1073#1086#1088#1072#1090#1086#1088#1085#1072#1103' '#1088#1072#1073#1086#1090#1072' '#8470'8 '#1087#1086' "'#1040#1083#1075#1086#1088#1080#1090#1084#1072#1084'" ('#1042#1058'-21, '#1055#1086#1090#1077#1088#1077#1085#1082#1086' '#1040'.'#1043'., 2' +
    '005)'
  ClientHeight = 363
  ClientWidth = 705
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 13
  object Panel1: TPanel
    Left = 0
    Top = 0
    Width = 705
    Height = 363
    Align = alClient
    Color = clWindowText
    TabOrder = 0
    object GroupBox1: TGroupBox
      Left = 8
      Top = 8
      Width = 250
      Height = 289
      Caption = #1055#1086#1083#1091#1095#1077#1085#1085#1072#1103' '#1084#1072#1090#1088#1080#1094#1072' '#1087#1086#1088#1103#1076#1082#1072' N (1-10)'
      Color = cl3DDkShadow
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clBlack
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      ParentColor = False
      ParentFont = False
      TabOrder = 0
      object Label1: TLabel
        Left = 8
        Top = 19
        Width = 53
        Height = 13
        Caption = #1042#1074#1077#1076#1080#1090#1077' N'
      end
      object SG: TStringGrid
        Left = 8
        Top = 48
        Width = 235
        Height = 235
        ColCount = 11
        DefaultColWidth = 20
        DefaultRowHeight = 20
        RowCount = 11
        TabOrder = 0
        ColWidths = (
          20
          20
          20
          20
          20
          20
          20
          20
          20
          20
          20)
      end
      object Edit1: TEdit
        Left = 72
        Top = 16
        Width = 169
        Height = 21
        Color = clWindowText
        Font.Charset = DEFAULT_CHARSET
        Font.Color = cl3DDkShadow
        Font.Height = -11
        Font.Name = 'MS Sans Serif'
        Font.Style = []
        ParentFont = False
        TabOrder = 1
      end
    end
    object GroupBox2: TGroupBox
      Left = 272
      Top = 8
      Width = 425
      Height = 289
      Color = cl3DDkShadow
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clBlack
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      ParentColor = False
      ParentFont = False
      TabOrder = 1
      object Im: TImage
        Left = 8
        Top = 16
        Width = 409
        Height = 265
        ParentShowHint = False
        ShowHint = False
      end
    end
    object GroupBox3: TGroupBox
      Left = 8
      Top = 304
      Width = 689
      Height = 49
      Caption = #1055#1072#1085#1077#1083#1100' '#1091#1087#1088#1072#1074#1083#1077#1085#1080#1103
      Color = cl3DDkShadow
      ParentColor = False
      TabOrder = 2
      object Button1: TButton
        Left = 8
        Top = 16
        Width = 137
        Height = 25
        Caption = #1057#1092#1086#1088#1084#1080#1088#1086#1074#1072#1090#1100' '#1075#1088#1072#1092
        TabOrder = 0
        OnClick = Button1Click
      end
      object Button2: TButton
        Left = 152
        Top = 16
        Width = 137
        Height = 25
        Caption = #1056#1072#1089#1082#1088#1072#1089#1080#1090#1100
        TabOrder = 1
        OnClick = Button2Click
      end
    end
  end
end
