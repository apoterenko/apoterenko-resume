object Form1: TForm1
  Left = 192
  Top = 110
  BorderStyle = bsDialog
  Caption = 
    #1051#1072#1073#1086#1088#1072#1090#1086#1088#1085#1072#1103' '#1088#1072#1073#1086#1090#1072' '#8470'5 '#1087#1086' '#1040#1083#1075#1086#1088#1080#1090#1084#1072#1084' ('#1055#1086#1090#1077#1088#1077#1085#1082#1086' '#1040'.'#1043'. BT-21. 2005' +
    ')'
  ClientHeight = 568
  ClientWidth = 592
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
    Width = 592
    Height = 568
    Align = alClient
    Color = clNone
    TabOrder = 0
    object Label1: TLabel
      Left = 96
      Top = 8
      Width = 403
      Height = 28
      Caption = #1057#1087#1086#1089#1086#1073#1099' '#1087#1088#1077#1076#1089#1090#1072#1074#1083#1077#1085#1080#1103' '#1075#1088#1072#1092#1086#1074
      Color = clWindowText
      Font.Charset = RUSSIAN_CHARSET
      Font.Color = clLime
      Font.Height = -24
      Font.Name = 'Gautami'
      Font.Style = [fsBold, fsItalic]
      ParentColor = False
      ParentFont = False
    end
    object Label3: TLabel
      Left = 16
      Top = 456
      Width = 119
      Height = 17
      Caption = #1054#1076#1085#1086#1084#1077#1088#1085#1099#1081' '#1084#1072#1089#1089#1080#1074
      Color = clDefault
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clLime
      Font.Height = -13
      Font.Name = 'Franklin Gothic Medium'
      Font.Pitch = fpVariable
      Font.Style = []
      ParentColor = False
      ParentFont = False
    end
    object Label4: TLabel
      Left = 56
      Top = 244
      Width = 115
      Height = 17
      Caption = #1052#1072#1090#1088#1080#1094#1072' '#1089#1084#1077#1078#1085#1086#1089#1090#1080
      Color = clDefault
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clLime
      Font.Height = -13
      Font.Name = 'Franklin Gothic Medium'
      Font.Pitch = fpVariable
      Font.Style = []
      ParentColor = False
      ParentFont = False
    end
    object Panel2: TPanel
      Left = 8
      Top = 501
      Width = 577
      Height = 60
      Color = clBtnShadow
      TabOrder = 0
      object Button4: TButton
        Left = 8
        Top = 6
        Width = 273
        Height = 49
        Caption = #1047#1072#1076#1072#1085#1080#1077' '#1074#1072#1088#1080#1072#1085#1090#1072' '#8470'13'
        TabOrder = 0
        OnClick = Button4Click
      end
      object Button5: TButton
        Left = 288
        Top = 6
        Width = 281
        Height = 23
        Caption = #1042#1099#1087#1086#1083#1085#1080#1090#1100' '#1074#1099#1095#1080#1089#1083#1077#1085#1080#1103
        TabOrder = 1
        OnClick = Button5Click
      end
      object Button6: TButton
        Left = 288
        Top = 32
        Width = 281
        Height = 23
        Caption = #1042#1099#1074#1077#1089#1090#1080' '#1080#1090#1086#1075#1086#1074#1091#1102' '#1090#1072#1073#1083#1080#1094#1091
        TabOrder = 2
        OnClick = Button6Click
      end
    end
    object Panel3: TPanel
      Left = 8
      Top = 40
      Width = 212
      Height = 201
      Color = clBtnShadow
      TabOrder = 1
      object Label2: TLabel
        Left = 8
        Top = 2
        Width = 114
        Height = 23
        Caption = #1056#1072#1079#1084#1077#1088#1085#1086#1089#1090#1100
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -19
        Font.Name = 'Georgia'
        Font.Style = []
        ParentFont = False
      end
      object Edit1: TEdit
        Left = 136
        Top = 4
        Width = 65
        Height = 21
        Color = clWindowText
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clLime
        Font.Height = -11
        Font.Name = 'MS Sans Serif'
        Font.Style = []
        ParentFont = False
        TabOrder = 0
      end
      object GroupBox1: TGroupBox
        Left = 8
        Top = 27
        Width = 193
        Height = 57
        Caption = #1054#1076#1085#1086#1084#1077#1088#1085#1099#1081' '#1084#1072#1089#1089#1080#1074
        TabOrder = 1
        object RadioButton1: TRadioButton
          Left = 8
          Top = 16
          Width = 113
          Height = 17
          Caption = #1055#1086#1080#1089#1082' '#1074' '#1075#1083#1091#1073#1080#1085#1091
          Checked = True
          TabOrder = 0
          TabStop = True
          OnClick = RadioButton1Click
        end
        object RadioButton2: TRadioButton
          Left = 8
          Top = 35
          Width = 121
          Height = 17
          Caption = #1055#1086#1080#1089#1082' '#1074' '#1096#1080#1088#1080#1085#1091
          TabOrder = 1
          OnClick = RadioButton2Click
        end
      end
      object GroupBox2: TGroupBox
        Left = 8
        Top = 87
        Width = 193
        Height = 57
        Caption = #1052#1072#1090#1088#1080#1094#1072' '#1089#1084#1077#1078#1085#1086#1089#1090#1080
        TabOrder = 2
        object RadioButton3: TRadioButton
          Left = 8
          Top = 13
          Width = 105
          Height = 25
          Caption = #1055#1086#1080#1089#1082' '#1074' '#1075#1083#1091#1073#1080#1085#1091
          TabOrder = 0
          OnClick = RadioButton3Click
        end
        object RadioButton4: TRadioButton
          Left = 8
          Top = 31
          Width = 105
          Height = 25
          Caption = #1055#1086#1080#1089#1082' '#1074' '#1096#1080#1088#1080#1085#1091
          TabOrder = 1
          OnClick = RadioButton4Click
        end
      end
    end
    object Panel4: TPanel
      Left = 224
      Top = 40
      Width = 361
      Height = 393
      TabOrder = 2
      object pbout: TPaintBox
        Left = 0
        Top = 0
        Width = 361
        Height = 393
        Color = clBtnFace
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clBlue
        Font.Height = -11
        Font.Name = 'MS Sans Serif'
        Font.Style = []
        ParentColor = False
        ParentFont = False
      end
    end
    object StG: TStringGrid
      Left = 8
      Top = 264
      Width = 212
      Height = 168
      Color = clNone
      ColCount = 11
      DefaultColWidth = 18
      DefaultRowHeight = 14
      FixedColor = clMenuText
      RowCount = 11
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clLime
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      ParentFont = False
      TabOrder = 3
      ColWidths = (
        18
        18
        18
        18
        18
        18
        18
        18
        18
        18
        18)
    end
    object GroupBox3: TGroupBox
      Left = 16
      Top = 184
      Width = 193
      Height = 49
      Caption = #1047#1072#1087#1086#1083#1085#1080#1090#1100' '#1084#1072#1090#1088#1080#1094#1091' '#1089#1084#1077#1078#1085#1086#1089#1090#1080
      Color = clBtnShadow
      ParentColor = False
      TabOrder = 4
      object BitBtn1: TBitBtn
        Left = 8
        Top = 16
        Width = 177
        Height = 25
        Cursor = crHandPoint
        TabOrder = 0
        OnClick = BitBtn1Click
        Kind = bkOK
      end
    end
    object SG2: TStringGrid
      Left = 141
      Top = 440
      Width = 444
      Height = 53
      Color = clWindowFrame
      ColCount = 21
      DefaultColWidth = 20
      DefaultRowHeight = 15
      FixedColor = clWindowFrame
      RowCount = 2
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clLime
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      ParentFont = False
      TabOrder = 5
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
      RowHeights = (
        15
        15)
    end
  end
end
