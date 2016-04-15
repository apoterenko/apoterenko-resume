object Form2: TForm2
  Left = 214
  Top = 113
  BorderStyle = bsDialog
  Caption = 
    #1048#1090#1086#1075#1086#1074#1072#1103' '#1090#1072#1073#1083#1080#1094#1072' - '#1074#1088#1077#1084#1103' '#1074#1099#1087#1086#1083#1085#1077#1085#1080#1103' '#1087#1086#1080#1089#1082#1072' '#1086#1089#1090#1086#1074#1072' '#1087#1088#1080' '#1088#1072#1079#1083#1080#1095#1085#1099#1093' ' +
    'N=3..n'
  ClientHeight = 446
  ClientWidth = 711
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
  object SG1: TStringGrid
    Left = 0
    Top = 96
    Width = 329
    Height = 349
    BiDiMode = bdLeftToRight
    Color = clInfoText
    ColCount = 3
    DefaultColWidth = 107
    DefaultRowHeight = 18
    FixedColor = clWindowFrame
    RowCount = 2
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clLime
    Font.Height = -11
    Font.Name = 'MS Sans Serif'
    Font.Style = []
    ParentBiDiMode = False
    ParentFont = False
    TabOrder = 0
  end
  object SG2: TStringGrid
    Left = 384
    Top = 96
    Width = 329
    Height = 349
    Color = clWindowFrame
    ColCount = 3
    DefaultColWidth = 107
    DefaultRowHeight = 18
    FixedColor = clWindowFrame
    RowCount = 2
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clLime
    Font.Height = -11
    Font.Name = 'MS Sans Serif'
    Font.Style = []
    ParentFont = False
    TabOrder = 1
    RowHeights = (
      18
      18)
  end
  object Panel1: TPanel
    Left = 0
    Top = 0
    Width = 711
    Height = 97
    Color = clBlack
    TabOrder = 2
    object Label5: TLabel
      Left = 428
      Top = 8
      Width = 130
      Height = 13
      Caption = #1057#1090#1072#1090#1091#1089' '#1086#1073#1088#1072#1073#1086#1090#1082#1080' '#1076#1072#1085#1085#1099#1093
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clLime
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      ParentFont = False
    end
    object GroupBox1: TGroupBox
      Left = 8
      Top = 3
      Width = 145
      Height = 41
      Caption = #1050#1086#1083#1080#1095#1077#1089#1090#1074#1086' '#1074#1077#1088#1096#1080#1085
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clLime
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      ParentFont = False
      TabOrder = 0
      object Label3: TLabel
        Left = 8
        Top = 20
        Width = 7
        Height = 13
        Caption = 'C'
      end
      object Label4: TLabel
        Left = 72
        Top = 20
        Width = 14
        Height = 13
        Caption = #1055#1086
      end
      object Edit1: TEdit
        Left = 24
        Top = 16
        Width = 41
        Height = 21
        Color = clWindowText
        TabOrder = 0
      end
      object Edit2: TEdit
        Left = 96
        Top = 16
        Width = 41
        Height = 21
        Color = clWindowText
        TabOrder = 1
      end
    end
    object Button1: TButton
      Left = 162
      Top = 8
      Width = 103
      Height = 37
      Caption = #1055#1086#1083#1091#1095#1080#1090#1100' '#1076#1072#1085#1085#1099#1077
      TabOrder = 1
      OnClick = Button1Click
    end
    object PB1: TProgressBar
      Left = 272
      Top = 28
      Width = 431
      Height = 17
      Min = 0
      Max = 100
      TabOrder = 2
    end
    object GroupBox2: TGroupBox
      Left = 8
      Top = 48
      Width = 697
      Height = 41
      Caption = #1042#1080#1076' '#1086#1073#1093#1086#1076#1072' '#1075#1088#1072#1092#1072
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clLime
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      ParentFont = False
      TabOrder = 3
      object RadioButton1: TRadioButton
        Left = 112
        Top = 13
        Width = 105
        Height = 25
        Caption = 'M/SM/GL'
        TabOrder = 0
      end
      object RadioButton2: TRadioButton
        Left = 224
        Top = 16
        Width = 97
        Height = 17
        Caption = 'M/SM/SH'
        TabOrder = 1
      end
      object RadioButton3: TRadioButton
        Left = 496
        Top = 16
        Width = 89
        Height = 17
        Caption = 'MAS/GL'
        TabOrder = 2
      end
      object RadioButton4: TRadioButton
        Left = 608
        Top = 16
        Width = 81
        Height = 17
        Caption = 'MAS/SH'
        TabOrder = 3
      end
    end
  end
  object Panel2: TPanel
    Left = 330
    Top = 97
    Width = 53
    Height = 347
    TabOrder = 3
  end
end
