object Form1: TForm1
  Left = 242
  Top = 115
  BorderStyle = bsDialog
  Caption = #1051#1072#1073#1086#1088#1072#1090#1086#1088#1085#1072#1103' '#1088#1072#1073#1086#1090#1072' '#8470'4. '#1055#1086#1090#1077#1088#1077#1085#1082#1086' '#1040'.'#1043'. '#1042#1058'-31. 2005'#1075'.'
  ClientHeight = 499
  ClientWidth = 753
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
  object Label32: TLabel
    Left = 8
    Top = 42
    Width = 31
    Height = 13
    Caption = #1057#1082#1083#1072#1076
  end
  object GroupBox1: TGroupBox
    Left = 0
    Top = 0
    Width = 753
    Height = 73
    Caption = #1059#1087#1088#1072#1074#1083#1077#1085#1080#1077' '#1089#1086#1077#1076#1080#1085#1077#1085#1080#1077#1084' '#1089' '#1057#1059#1041#1044' ORACLE'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -11
    Font.Name = 'MS Sans Serif'
    Font.Style = [fsBold]
    ParentFont = False
    TabOrder = 0
    object Label1: TLabel
      Left = 8
      Top = 18
      Width = 55
      Height = 13
      Caption = 'Database'
    end
    object Label2: TLabel
      Left = 8
      Top = 42
      Width = 86
      Height = 13
      Caption = 'User / Schema'
    end
    object Label3: TLabel
      Left = 264
      Top = 18
      Width = 55
      Height = 13
      Caption = 'Password'
    end
    object Button1: TButton
      Left = 472
      Top = 16
      Width = 137
      Height = 49
      Caption = #1057#1086#1077#1076#1080#1085#1077#1085#1080#1077
      TabOrder = 0
      OnClick = Button1Click
    end
    object Edit1: TEdit
      Left = 104
      Top = 16
      Width = 153
      Height = 21
      Color = cl3DLight
      TabOrder = 1
    end
    object Edit2: TEdit
      Left = 104
      Top = 40
      Width = 153
      Height = 21
      Color = cl3DLight
      TabOrder = 2
    end
    object Edit3: TEdit
      Left = 328
      Top = 16
      Width = 137
      Height = 21
      Color = cl3DLight
      PasswordChar = '*'
      TabOrder = 3
    end
    object Button2: TButton
      Left = 612
      Top = 16
      Width = 137
      Height = 49
      Caption = #1056#1072#1079#1088#1099#1074' '#1089#1086#1077#1076#1080#1085#1077#1085#1080#1103
      TabOrder = 4
      OnClick = Button2Click
    end
  end
  object PageControl1: TPageControl
    Left = 0
    Top = 72
    Width = 754
    Height = 409
    ActivePage = TabSheet1
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -11
    Font.Name = 'MS Sans Serif'
    Font.Style = [fsBold]
    ParentFont = False
    TabOrder = 1
    object TabSheet1: TTabSheet
      Caption = #1055#1088#1086#1089#1084#1086#1090#1088' '#1041#1044
      object GroupBox13: TGroupBox
        Left = 0
        Top = 0
        Width = 746
        Height = 381
        Align = alClient
        TabOrder = 0
        object PageControl3: TPageControl
          Left = 2
          Top = 15
          Width = 742
          Height = 364
          ActivePage = TabSheet8
          Align = alClient
          TabOrder = 0
          object TabSheet8: TTabSheet
            Caption = #1055#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1100
            object Label24: TLabel
              Left = 0
              Top = 0
              Width = 91
              Height = 13
              Caption = #1055#1088#1080#1093#1086#1076'/'#1088#1072#1089#1093#1086#1076
            end
            object DBGrid1: TDBGrid
              Left = 0
              Top = 16
              Width = 729
              Height = 317
              Color = clScrollBar
              DataSource = DataSource1
              ReadOnly = True
              TabOrder = 0
              TitleFont.Charset = DEFAULT_CHARSET
              TitleFont.Color = clWindowText
              TitleFont.Height = -11
              TitleFont.Name = 'MS Sans Serif'
              TitleFont.Style = [fsBold]
              Columns = <
                item
                  Expanded = False
                  FieldName = 'ID'
                  Title.Caption = #1050#1086#1076' '#1079#1072#1087#1080#1089#1080
                  Width = 100
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'KOD_MATERIAL'
                  Title.Caption = #1050#1086#1076' '#1084#1072#1090#1077#1088#1080#1072#1083#1072
                  Width = 100
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'KOD_SKLAD'
                  Title.Caption = #1050#1086#1076' '#1089#1082#1083#1072#1076#1072
                  Width = 100
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'DATA'
                  Title.Caption = #1044#1072#1090#1072' '#1080#1079#1084#1077#1085#1077#1085#1080#1103
                  Width = 120
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'EDINIC'
                  Title.Caption = #1050#1086#1083#1080#1095#1077#1089#1090#1074#1086
                  Width = 100
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'ADD_OR_DEL'
                  Title.Caption = #1057#1090#1072#1090#1091#1089
                  Width = 100
                  Visible = True
                end>
            end
          end
          object TabSheet9: TTabSheet
            Caption = #1040#1076#1084#1080#1085#1080#1089#1090#1088#1072#1090#1086#1088
            ImageIndex = 1
            object Label12: TLabel
              Left = 0
              Top = 0
              Width = 138
              Height = 13
              Caption = #1047#1072#1074#1077#1076#1091#1102#1097#1080#1077' '#1089#1082#1083#1072#1076#1072#1084#1080
            end
            object Label25: TLabel
              Left = 0
              Top = 112
              Width = 44
              Height = 13
              Caption = #1057#1082#1083#1072#1076#1072
            end
            object Label35: TLabel
              Left = 0
              Top = 224
              Width = 195
              Height = 13
              Caption = #1053#1072#1080#1084#1077#1085#1086#1074#1072#1085#1080#1103' '#1074#1089#1077#1093' '#1084#1072#1090#1077#1088#1080#1072#1083#1086#1074
            end
            object DBGrid2: TDBGrid
              Left = 0
              Top = 16
              Width = 729
              Height = 97
              Color = clScrollBar
              DataSource = DataSource2
              ReadOnly = True
              TabOrder = 0
              TitleFont.Charset = DEFAULT_CHARSET
              TitleFont.Color = clWindowText
              TitleFont.Height = -11
              TitleFont.Name = 'MS Sans Serif'
              TitleFont.Style = [fsBold]
              Columns = <
                item
                  Expanded = False
                  FieldName = 'ID'
                  Title.Caption = #1050#1086#1076' '#1095#1077#1083#1086#1074#1077#1082#1072
                  Width = 100
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'FIO'
                  Title.Caption = #1060#1048#1054
                  Width = 500
                  Visible = True
                end>
            end
            object DBGrid3: TDBGrid
              Left = 0
              Top = 128
              Width = 729
              Height = 97
              Color = clScrollBar
              DataSource = DataSource3
              ReadOnly = True
              TabOrder = 1
              TitleFont.Charset = DEFAULT_CHARSET
              TitleFont.Color = clWindowText
              TitleFont.Height = -11
              TitleFont.Name = 'MS Sans Serif'
              TitleFont.Style = [fsBold]
              Columns = <
                item
                  Expanded = False
                  FieldName = 'ID'
                  Title.Caption = #1050#1086#1076' '#1089#1082#1083#1072#1076#1072
                  Width = 100
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'SKLAD'
                  Title.Caption = #1057#1082#1083#1072#1076
                  Width = 400
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'KEYS'
                  Title.Caption = #1050#1086#1076' '#1079#1072#1074#1077#1076#1091#1102#1097#1077#1075#1086
                  Width = 150
                  Visible = True
                end>
            end
            object DBGrid4: TDBGrid
              Left = 0
              Top = 240
              Width = 729
              Height = 97
              Color = clScrollBar
              DataSource = DataSource4
              ReadOnly = True
              TabOrder = 2
              TitleFont.Charset = DEFAULT_CHARSET
              TitleFont.Color = clWindowText
              TitleFont.Height = -11
              TitleFont.Name = 'MS Sans Serif'
              TitleFont.Style = [fsBold]
              Columns = <
                item
                  Expanded = False
                  FieldName = 'ID'
                  Title.Caption = #1050#1086#1076' '#1084#1072#1090#1077#1088#1080#1072#1083#1072
                  Width = 120
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'MATERIAL'
                  Title.Caption = #1052#1072#1090#1077#1088#1080#1072#1083
                  Width = 300
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'KEYS'
                  Title.Caption = #1050#1086#1076' '#1089#1082#1083#1072#1076#1072
                  Width = 100
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'CENA'
                  Title.Caption = #1062#1077#1085#1072' '#1079#1072' 1 '#1091'.'#1077'.'
                  Width = 100
                  Visible = True
                end>
            end
          end
        end
      end
    end
    object TabSheet2: TTabSheet
      Caption = #1056#1077#1076#1072#1082#1090#1080#1088#1086#1074#1072#1085#1080#1077' '#1079#1072#1087#1080#1089#1077#1081
      ImageIndex = 1
      object GroupBox2: TGroupBox
        Left = 0
        Top = 0
        Width = 746
        Height = 381
        Align = alClient
        TabOrder = 0
        object Label6: TLabel
          Left = 8
          Top = 24
          Width = 5
          Height = 13
          Caption = ' '
        end
        object PageControl2: TPageControl
          Left = 2
          Top = 15
          Width = 742
          Height = 364
          ActivePage = TabSheet6
          Align = alClient
          TabOrder = 0
          object TabSheet6: TTabSheet
            Caption = #1055#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1100
            object GroupBox9: TGroupBox
              Left = 0
              Top = 0
              Width = 409
              Height = 329
              Caption = #1057#1074#1077#1076#1077#1085#1080#1103' '#1086' '#1084#1072#1090#1077#1088#1080#1072#1083#1077
              TabOrder = 0
              object Label27: TLabel
                Left = 8
                Top = 18
                Width = 59
                Height = 13
                Caption = #1052#1072#1090#1077#1088#1080#1072#1083
              end
              object Label30: TLabel
                Left = 8
                Top = 42
                Width = 37
                Height = 13
                Caption = #1057#1082#1083#1072#1076
              end
              object Label33: TLabel
                Left = 8
                Top = 66
                Width = 44
                Height = 13
                Caption = #1045#1076#1080#1085#1080#1094
              end
              object Label34: TLabel
                Left = 8
                Top = 90
                Width = 31
                Height = 13
                Caption = #1044#1072#1090#1072
              end
              object ComboBox4: TComboBox
                Left = 72
                Top = 16
                Width = 329
                Height = 21
                Style = csDropDownList
                Color = cl3DLight
                ItemHeight = 13
                TabOrder = 0
                OnChange = ComboBox4Change
                OnEnter = ComboBox4Enter
              end
              object ComboBox5: TComboBox
                Left = 72
                Top = 40
                Width = 329
                Height = 21
                Style = csDropDownList
                Color = cl3DLight
                ItemHeight = 13
                TabOrder = 1
                OnChange = ComboBox5Change
                OnEnter = ComboBox5Enter
              end
              object Edit16: TEdit
                Left = 72
                Top = 64
                Width = 329
                Height = 21
                Color = cl3DLight
                TabOrder = 2
              end
              object Edit17: TEdit
                Left = 72
                Top = 88
                Width = 329
                Height = 21
                Color = cl3DLight
                TabOrder = 3
              end
              object RadioButton1: TRadioButton
                Left = 312
                Top = 116
                Width = 89
                Height = 17
                Caption = #1044#1086#1073#1072#1074#1080#1090#1100
                TabOrder = 4
              end
              object RadioButton2: TRadioButton
                Left = 312
                Top = 136
                Width = 81
                Height = 17
                Caption = #1059#1076#1072#1083#1080#1090#1100
                TabOrder = 5
              end
              object Button13: TButton
                Left = 8
                Top = 120
                Width = 153
                Height = 25
                Caption = #1042#1099#1087#1086#1083#1085#1080#1090#1100
                TabOrder = 6
                OnClick = Button13Click
              end
            end
            object GroupBox11: TGroupBox
              Left = 416
              Top = 0
              Width = 313
              Height = 81
              Caption = #1044#1072#1085#1085#1099#1077' '#1086' '#1084#1072#1090#1077#1088#1080#1072#1083#1077
              TabOrder = 1
              object Label28: TLabel
                Left = 8
                Top = 18
                Width = 74
                Height = 13
                Caption = #1062#1077#1085#1072' '#1079#1072' '#1091'.'#1077'.'
              end
              object Label29: TLabel
                Left = 8
                Top = 42
                Width = 69
                Height = 13
                Caption = #1050#1086#1076' '#1089#1082#1083#1072#1076#1072
              end
              object Edit13: TEdit
                Left = 88
                Top = 16
                Width = 209
                Height = 21
                Color = cl3DLight
                ReadOnly = True
                TabOrder = 0
              end
              object Edit14: TEdit
                Left = 88
                Top = 40
                Width = 209
                Height = 21
                Color = cl3DLight
                ReadOnly = True
                TabOrder = 1
              end
            end
            object GroupBox12: TGroupBox
              Left = 416
              Top = 80
              Width = 313
              Height = 249
              Caption = #1044#1072#1085#1085#1099#1077' '#1086' '#1089#1082#1083#1072#1076#1077
              TabOrder = 2
              object Label31: TLabel
                Left = 8
                Top = 18
                Width = 107
                Height = 13
                Caption = #1050#1086#1076' '#1079#1072#1074#1077#1076#1091#1102#1097#1077#1075#1086
              end
              object Edit15: TEdit
                Left = 120
                Top = 16
                Width = 177
                Height = 21
                Color = cl3DLight
                ReadOnly = True
                TabOrder = 0
              end
            end
          end
          object TabSheet7: TTabSheet
            Caption = #1040#1076#1084#1080#1085#1080#1089#1090#1088#1072#1090#1086#1088
            ImageIndex = 1
            object GroupBox4: TGroupBox
              Left = 0
              Top = 0
              Width = 729
              Height = 121
              Caption = #1044#1086#1073#1072#1074#1083#1077#1085#1080#1077' '#1079#1072#1087#1080#1089#1080' '#1086' '#1047#1057
              TabOrder = 0
              object Label7: TLabel
                Left = 8
                Top = 26
                Width = 182
                Height = 13
                Caption = #1057#1082#1083#1072#1076', '#1082#1086#1090#1086#1088#1099#1084' '#1091#1087#1088#1072#1074#1083#1103#1077#1090' '#1047#1057
              end
              object Label8: TLabel
                Left = 8
                Top = 50
                Width = 51
                Height = 13
                Caption = #1060#1048#1054' '#1047#1057
              end
              object Edit4: TEdit
                Left = 192
                Top = 22
                Width = 217
                Height = 21
                Color = cl3DLight
                TabOrder = 0
              end
              object Edit5: TEdit
                Left = 192
                Top = 48
                Width = 217
                Height = 21
                Color = cl3DLight
                TabOrder = 1
              end
              object Button3: TButton
                Left = 416
                Top = 22
                Width = 305
                Height = 21
                Caption = #1044#1086#1073#1072#1074#1080#1090#1100
                TabOrder = 2
                OnClick = Button3Click
              end
            end
            object GroupBox6: TGroupBox
              Left = 0
              Top = 120
              Width = 729
              Height = 217
              Caption = #1044#1086#1073#1072#1074#1083#1077#1085#1080#1077' '#1079#1072#1087#1080#1089#1080' '#1086' '#1084#1072#1090#1077#1088#1080#1072#1083#1077
              TabOrder = 1
              object Label9: TLabel
                Left = 8
                Top = 28
                Width = 157
                Height = 13
                Caption = #1053#1072#1080#1084#1077#1085#1086#1074#1072#1085#1080#1077' '#1084#1072#1090#1077#1088#1080#1072#1083#1072
              end
              object Label10: TLabel
                Left = 8
                Top = 52
                Width = 37
                Height = 13
                Caption = #1057#1082#1083#1072#1076
              end
              object Label11: TLabel
                Left = 8
                Top = 80
                Width = 74
                Height = 13
                Caption = #1062#1077#1085#1072' '#1079#1072' '#1091'.'#1077'.'
              end
              object Edit6: TEdit
                Left = 176
                Top = 26
                Width = 233
                Height = 21
                Color = cl3DLight
                TabOrder = 0
              end
              object Button4: TButton
                Left = 416
                Top = 26
                Width = 305
                Height = 21
                Caption = #1044#1086#1073#1072#1074#1080#1090#1100
                TabOrder = 1
                OnClick = Button4Click
              end
              object Edit8: TEdit
                Left = 176
                Top = 82
                Width = 233
                Height = 21
                Color = cl3DLight
                TabOrder = 2
              end
              object ComboBox2: TComboBox
                Left = 176
                Top = 54
                Width = 233
                Height = 21
                Style = csDropDownList
                Color = cl3DLight
                ItemHeight = 13
                TabOrder = 3
                OnEnter = ComboBox2Enter
              end
            end
          end
        end
      end
    end
    object TabSheet4: TTabSheet
      Caption = #1040#1076#1084#1080#1085#1080#1089#1090#1088#1080#1088#1086#1074#1072#1085#1080#1077
      ImageIndex = 3
      object GroupBox3: TGroupBox
        Left = 0
        Top = 0
        Width = 745
        Height = 73
        Caption = #1057#1084#1077#1085#1072' '#1087#1072#1088#1086#1083#1103' '#1072#1076#1084#1080#1085#1080#1089#1090#1088#1072#1090#1086#1088#1072
        TabOrder = 0
        object Label13: TLabel
          Left = 8
          Top = 20
          Width = 188
          Height = 13
          Caption = #1053#1086#1074#1099#1081' '#1087#1072#1088#1086#1083#1100' '#1072#1076#1084#1080#1085#1080#1089#1090#1088#1072#1090#1086#1088#1072
        end
        object Label23: TLabel
          Left = 8
          Top = 46
          Width = 110
          Height = 13
          Caption = #1055#1086#1074#1090#1086#1088#1080#1090#1100' '#1087#1072#1088#1086#1083#1100
        end
        object Edit7: TEdit
          Left = 208
          Top = 18
          Width = 185
          Height = 21
          Color = cl3DLight
          PasswordChar = '*'
          TabOrder = 0
        end
        object Button6: TButton
          Left = 400
          Top = 18
          Width = 337
          Height = 21
          Caption = #1057#1084#1077#1085#1080#1090#1100
          TabOrder = 1
          OnClick = Button6Click
        end
        object Edit12: TEdit
          Left = 208
          Top = 44
          Width = 185
          Height = 21
          Color = cl3DLight
          PasswordChar = '*'
          TabOrder = 2
        end
      end
      object GroupBox7: TGroupBox
        Left = 0
        Top = 72
        Width = 745
        Height = 81
        Caption = #1044#1086#1073#1072#1074#1083#1077#1085#1080#1077' '#1087#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1103
        TabOrder = 1
        object Label14: TLabel
          Left = 8
          Top = 24
          Width = 39
          Height = 13
          Caption = 'LOGIN'
        end
        object Label15: TLabel
          Left = 8
          Top = 54
          Width = 72
          Height = 13
          Caption = 'PASSWORD'
        end
        object Edit9: TEdit
          Left = 88
          Top = 20
          Width = 305
          Height = 21
          Color = cl3DLight
          TabOrder = 0
        end
        object Edit10: TEdit
          Left = 88
          Top = 50
          Width = 305
          Height = 21
          Color = cl3DLight
          PasswordChar = '*'
          TabOrder = 1
        end
        object Button7: TButton
          Left = 400
          Top = 20
          Width = 337
          Height = 21
          Caption = #1044#1086#1073#1072#1074#1080#1090#1100
          TabOrder = 2
          OnClick = Button7Click
        end
      end
      object GroupBox8: TGroupBox
        Left = 0
        Top = 152
        Width = 745
        Height = 225
        Caption = #1059#1076#1072#1083#1080#1090#1100'  '#1087#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1103
        TabOrder = 2
        object Label16: TLabel
          Left = 8
          Top = 28
          Width = 39
          Height = 13
          Caption = 'LOGIN'
        end
        object Edit11: TEdit
          Left = 88
          Top = 24
          Width = 305
          Height = 21
          Color = cl3DLight
          TabOrder = 0
        end
        object Button8: TButton
          Left = 400
          Top = 24
          Width = 337
          Height = 21
          Caption = #1059#1076#1072#1083#1080#1090#1100
          TabOrder = 1
          OnClick = Button8Click
        end
      end
    end
    object TabSheet5: TTabSheet
      Caption = #1055#1088#1086#1089#1084#1086#1090#1088' '#1089#1074#1077#1076#1077#1085#1080#1081
      ImageIndex = 4
      object GroupBox10: TGroupBox
        Left = 0
        Top = 0
        Width = 705
        Height = 201
        Caption = #1057#1086#1089#1090#1086#1103#1085#1080#1077' '#1076#1077#1083' '#1085#1072' '#1089#1082#1083#1072#1076#1072#1093
        TabOrder = 0
        object Label36: TLabel
          Left = 8
          Top = 42
          Width = 146
          Height = 13
          Caption = #1063#1072#1089#1090#1086#1090#1072' '#1087#1088#1086#1076#1072#1074#1072#1077#1084#1086#1089#1090#1080
        end
        object Label5: TLabel
          Left = 360
          Top = 42
          Width = 138
          Height = 13
          Caption = #1063#1072#1089#1090#1086#1090#1072' '#1087#1086#1082#1091#1087#1072#1077#1084#1086#1089#1090#1080
        end
        object Label26: TLabel
          Left = 600
          Top = 64
          Width = 86
          Height = 38
          Caption = #1054#1090#1095#1077#1090
          Color = clMenuBar
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clScrollBar
          Font.Height = -31
          Font.Name = 'Monotype Corsiva'
          Font.Style = [fsBold]
          ParentColor = False
          ParentFont = False
        end
        object Label37: TLabel
          Left = 8
          Top = 84
          Width = 31
          Height = 13
          Caption = #1044#1072#1090#1072
        end
        object RadioButton3: TRadioButton
          Left = 8
          Top = 20
          Width = 297
          Height = 17
          Caption = #1057#1074#1077#1076#1077#1085#1080#1103' '#1086' '#1095#1072#1089#1090#1086' '#1087#1088#1086#1076#1072#1074#1072#1077#1084#1099#1093' '#1090#1086#1074#1072#1088#1072#1093
          TabOrder = 0
        end
        object Edit19: TEdit
          Left = 160
          Top = 40
          Width = 193
          Height = 21
          Color = cl3DLight
          TabOrder = 1
          OnEnter = Edit19Enter
        end
        object Memo1: TMemo
          Left = 9
          Top = 104
          Width = 688
          Height = 89
          Color = clScrollBar
          ReadOnly = True
          ScrollBars = ssBoth
          TabOrder = 2
        end
        object RadioButton4: TRadioButton
          Left = 360
          Top = 20
          Width = 297
          Height = 17
          Caption = #1057#1074#1077#1076#1077#1085#1080#1103' '#1086' '#1095#1072#1089#1090#1086' '#1087#1086#1082#1091#1087#1072#1077#1084#1099#1093'  '#1090#1086#1074#1072#1088#1072#1093
          TabOrder = 3
        end
        object Edit20: TEdit
          Left = 504
          Top = 40
          Width = 193
          Height = 21
          Color = cl3DLight
          TabOrder = 4
          OnEnter = Edit20Enter
        end
        object RadioButton5: TRadioButton
          Left = 8
          Top = 64
          Width = 361
          Height = 17
          Caption = #1055#1086#1082#1072#1079#1072#1090#1100' '#1087#1088#1080#1093#1086#1076'/'#1088#1072#1089#1093#1086#1076' '#1090#1086#1074#1072#1088#1072' '#1087#1086' '#1086#1087#1088#1077#1076#1077#1083#1077#1085#1085#1086#1081' '#1076#1072#1090#1077
          TabOrder = 5
        end
        object Edit21: TEdit
          Left = 48
          Top = 80
          Width = 305
          Height = 21
          Color = cl3DLight
          TabOrder = 6
          OnEnter = Edit21Enter
        end
      end
      object GroupBox14: TGroupBox
        Left = 0
        Top = 200
        Width = 705
        Height = 177
        Caption = #1055#1086' '#1082#1086#1083#1080#1095#1077#1089#1090#1074#1091
        TabOrder = 1
        object Label17: TLabel
          Left = 8
          Top = 16
          Width = 93
          Height = 13
          Caption = #1042#1089#1077' '#1084#1072#1090#1077#1088#1080#1072#1083#1099
        end
        object Label20: TLabel
          Left = 8
          Top = 128
          Width = 57
          Height = 13
          Caption = 'DEFAULT'
        end
        object Label18: TLabel
          Left = 240
          Top = 16
          Width = 44
          Height = 13
          Caption = #1057#1082#1083#1072#1076#1072
        end
        object Label19: TLabel
          Left = 464
          Top = 16
          Width = 154
          Height = 13
          Caption = #1042#1089#1077' '#1079#1072#1074#1077#1076#1091#1102#1097#1080#1077' '#1089#1082#1083#1072#1076#1086#1074
        end
        object Label21: TLabel
          Left = 240
          Top = 128
          Width = 57
          Height = 13
          Caption = 'DEFAULT'
        end
        object Label22: TLabel
          Left = 472
          Top = 128
          Width = 57
          Height = 13
          Caption = 'DEFAULT'
        end
        object ListBox1: TListBox
          Left = 8
          Top = 32
          Width = 225
          Height = 89
          Color = clScrollBar
          ItemHeight = 13
          Sorted = True
          TabOrder = 0
        end
        object Button9: TButton
          Left = 8
          Top = 144
          Width = 161
          Height = 25
          Caption = #1055#1088#1086#1089#1084#1086#1090#1088#1077#1090#1100
          TabOrder = 1
          OnClick = Button9Click
        end
        object ListBox2: TListBox
          Left = 238
          Top = 32
          Width = 225
          Height = 89
          Color = clScrollBar
          ItemHeight = 13
          Sorted = True
          TabOrder = 2
        end
        object ListBox3: TListBox
          Left = 468
          Top = 32
          Width = 225
          Height = 89
          Color = clScrollBar
          ItemHeight = 13
          Sorted = True
          TabOrder = 3
        end
      end
      object Panel1: TPanel
        Left = 704
        Top = 5
        Width = 41
        Height = 371
        Color = clMenuBar
        TabOrder = 2
        object Button14: TButton
          Left = 8
          Top = 8
          Width = 25
          Height = 353
          Caption = 'OK'
          TabOrder = 0
          OnClick = Button14Click
        end
      end
    end
    object TabSheet3: TTabSheet
      Caption = #1054#1090#1095#1077#1090#1099
      ImageIndex = 4
      object Button12: TButton
        Left = 8
        Top = 8
        Width = 217
        Height = 17
        Caption = #1054#1090#1095#1077#1090' '#1087#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1103
        TabOrder = 0
        OnClick = Button12Click
      end
      object Button10: TButton
        Left = 8
        Top = 32
        Width = 217
        Height = 17
        Caption = #1054#1090#1095#1077#1090' '#1072#1076#1084#1080#1085#1080#1089#1090#1088#1072#1090#1086#1088#1072' '#1087#1086' '#1047#1057
        TabOrder = 1
        OnClick = Button10Click
      end
      object Button5: TButton
        Left = 8
        Top = 56
        Width = 217
        Height = 17
        Caption = #1054#1090#1095#1077#1090' '#1072#1076#1084#1080#1085#1080#1089#1090#1088#1072#1090#1086#1088#1072' '#1087#1086' '#1089#1082#1083#1072#1076#1072#1084
        TabOrder = 2
        OnClick = Button5Click
      end
      object Button11: TButton
        Left = 8
        Top = 80
        Width = 217
        Height = 17
        Caption = #1054#1090#1095#1077#1090' '#1072#1076#1084#1080#1085#1080#1089#1090#1088#1072#1090#1086#1088#1072' '#1087#1086' '#1090#1086#1074#1072#1088#1072#1084
        TabOrder = 3
        OnClick = Button11Click
      end
    end
  end
  object StatusBar1: TStatusBar
    Left = 0
    Top = 480
    Width = 753
    Height = 19
    Panels = <
      item
        Alignment = taCenter
        Text = #1057#1090#1072#1090#1091#1089' '#1087#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1103':'
        Width = 160
      end
      item
        Alignment = taCenter
        Text = 'DEFAULT'
        Width = 50
      end>
  end
  object ADOConnection1: TADOConnection
    Left = 18
    Top = 431
  end
  object ADOStoredProc1: TADOStoredProc
    ProcedureName = 'SYSTEM.PROC_USER_ADD'
    Parameters = <
      item
        Name = 'MATERIAL'
        DataType = ftString
        Size = 255
        Value = Null
      end
      item
        Name = 'SKLAD'
        DataType = ftString
        Size = 255
        Value = Null
      end
      item
        Name = 'EDINIC'
        DataType = ftInteger
        Value = Null
      end
      item
        Name = 'DATA'
        DataType = ftDateTime
        Value = Null
      end>
    Left = 50
    Top = 431
  end
  object ADOQuery1: TADOQuery
    Parameters = <>
    Left = 18
    Top = 399
  end
  object ADOStoredProc2: TADOStoredProc
    ProcedureName = 'SYSTEM.PROC_USER_DEL'
    Parameters = <
      item
        Name = 'MATERIAL'
        DataType = ftString
        Size = 255
        Value = Null
      end
      item
        Name = 'SKLAD'
        DataType = ftString
        Size = 255
        Value = Null
      end
      item
        Name = 'EDINIC'
        DataType = ftInteger
        Value = Null
      end
      item
        Name = 'DATA'
        DataType = ftDateTime
        Value = Null
      end>
    Left = 82
    Top = 431
  end
  object ADOStoredProc3: TADOStoredProc
    ProcedureName = 'ADD_SKLAD_FIO'
    Parameters = <
      item
        Name = 'P_FIO'
        DataType = ftString
        Size = 255
        Value = Null
      end
      item
        Name = 'P_SKLAD'
        DataType = ftString
        Size = 255
        Value = Null
      end>
    Left = 138
    Top = 431
  end
  object ADOStoredProc4: TADOStoredProc
    ProcedureName = 'ADD_MATERIAL'
    Parameters = <
      item
        Name = 'P_MATERIAL'
        DataType = ftString
        Size = 255
        Value = Null
      end
      item
        Name = 'P_SKLAD'
        DataType = ftString
        Size = 255
        Value = Null
      end
      item
        Name = 'P_CENA'
        DataType = ftFloat
        Value = Null
      end>
    Left = 170
    Top = 431
  end
  object DataSource1: TDataSource
    DataSet = ADOTable1
    Left = 226
    Top = 431
  end
  object ADOTable1: TADOTable
    CursorType = ctStatic
    Left = 258
    Top = 431
  end
  object DataSource2: TDataSource
    DataSet = ADOTable2
    Left = 314
    Top = 431
  end
  object ADOTable2: TADOTable
    Left = 346
    Top = 431
  end
  object DataSource3: TDataSource
    DataSet = ADOTable3
    Left = 378
    Top = 431
  end
  object ADOTable3: TADOTable
    CursorType = ctStatic
    Left = 410
    Top = 431
  end
  object DataSource4: TDataSource
    DataSet = ADOTable4
    Left = 442
    Top = 431
  end
  object ADOTable4: TADOTable
    CursorType = ctStatic
    Left = 474
    Top = 431
  end
  object ADOStoredProc5: TADOStoredProc
    ProcedureName = 'SYSTEM.GET_NAME'
    Parameters = <
      item
        Name = 'USESS'
        DataType = ftString
        Direction = pdOutput
        Size = 255
        Value = Null
      end>
    Left = 50
    Top = 399
  end
  object ADOStoredProc6: TADOStoredProc
    ProcedureName = 'GET_EDINIC'
    Parameters = <
      item
        Name = 'P_DATA'
        DataType = ftDateTime
        Value = Null
      end
      item
        Name = 'P_KOD'
        DataType = ftInteger
        Value = Null
      end
      item
        Name = 'EDIN'
        DataType = ftInteger
        Direction = pdOutput
        Value = Null
      end>
    Left = 84
    Top = 400
  end
  object ADOStoredProc7: TADOStoredProc
    ProcedureName = 'CHASTO_PROD'
    Parameters = <
      item
        Name = 'P_KOD'
        DataType = ftInteger
        Value = Null
      end
      item
        Name = 'C_P'
        DataType = ftInteger
        Direction = pdOutput
        Value = Null
      end>
    Left = 140
    Top = 400
  end
  object frxReport1: TfrxReport
    DotMatrixReport = False
    IniFile = '\Software\Fast Reports'
    PreviewOptions.Buttons = [pbPrint, pbLoad, pbSave, pbExport, pbZoom, pbFind, pbOutline, pbPageSetup, pbTools, pbEdit, pbNavigator]
    PreviewOptions.Zoom = 1.000000000000000000
    PrintOptions.Printer = 'Default'
    ReportOptions.CreateDate = 38724.246546932900000000
    ReportOptions.LastChange = 38724.273233680560000000
    ScriptLanguage = 'PascalScript'
    ScriptText.Strings = (
      'begin'
      ''
      'end.')
    Left = 674
    Top = 439
    Datasets = <
      item
        DataSet = frxDBDataset1
        DataSetName = 'frxDBDataset1'
      end>
    Variables = <>
    Style = <>
    object Page1: TfrxReportPage
      PaperWidth = 210.000000000000000000
      PaperHeight = 297.000000000000000000
      PaperSize = 9
      LeftMargin = 10.000000000000000000
      RightMargin = 10.000000000000000000
      TopMargin = 10.000000000000000000
      BottomMargin = 10.000000000000000000
      object ReportTitle1: TfrxReportTitle
        Height = 52.913420000000000000
        Top = 18.897650000000000000
        Width = 718.110700000000000000
        object Memo4: TfrxMemoView
          Align = baCenter
          Left = 158.740260000000000000
          Top = 11.338590000000000000
          Width = 400.630180000000000000
          Height = 30.236240000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -19
          Font.Name = 'Arial'
          Font.Style = [fsBold, fsItalic]
          Memo.Strings = (
            #1054#1090#1095#1077#1090' '#1072#1076#1084#1080#1085#1080#1089#1090#1088#1072#1090#1086#1088#1072' '#1087#1086' '#1084#1072#1090#1077#1088#1080#1072#1083#1072#1084)
          ParentFont = False
        end
      end
      object MasterData1: TfrxMasterData
        Height = 22.677180000000000000
        Top = 132.283550000000000000
        Width = 718.110700000000000000
        DataSet = frxDBDataset1
        DataSetName = 'frxDBDataset1'
        RowCount = 0
      end
      object PageFooter1: TfrxPageFooter
        Height = 22.677180000000000000
        Top = 381.732530000000000000
        Width = 718.110700000000000000
        object Memo1: TfrxMemoView
          Left = 642.099312326667000000
          Width = 75.590600000000000000
          Height = 18.897650000000000000
          HAlign = haRight
          Memo.Strings = (
            '[Page#]')
        end
      end
      object DetailData1: TfrxDetailData
        Height = 143.622140000000000000
        Top = 177.637910000000000000
        Width = 718.110700000000000000
        DataSet = frxDBDataset1
        DataSetName = 'frxDBDataset1'
        RowCount = 0
        object Memo2: TfrxMemoView
          Left = 230.551330000000000000
          Top = 15.118120000000010000
          Width = 449.764070000000000000
          Height = 18.897650000000000000
          DataField = 'ID'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."ID"]')
          ParentFont = False
        end
        object Memo3: TfrxMemoView
          Left = 226.771800000000000000
          Top = 41.574829999999990000
          Width = 453.543600000000000000
          Height = 18.897650000000000000
          DataField = 'MATERIAL'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."MATERIAL"]')
          ParentFont = False
        end
        object Memo5: TfrxMemoView
          Left = 226.771800000000000000
          Top = 68.031540000000010000
          Width = 449.764070000000000000
          Height = 18.897650000000000000
          DataField = 'KEYS'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."KEYS"]')
          ParentFont = False
        end
        object Memo9: TfrxMemoView
          Left = 7.559060000000000000
          Top = 15.118120000000010000
          Width = 215.433210000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            #1055#1086#1088#1103#1076#1082#1086#1074#1099#1081' '#1085#1086#1084#1077#1088' '#1084#1072#1090#1077#1088#1080#1072#1083#1072':')
          ParentFont = False
        end
        object Line1: TfrxLineView
          Left = 11.338590000000000000
          Top = 120.944960000000000000
          Width = 665.197280000000000000
          Frame.Typ = [ftTop]
        end
        object Line2: TfrxLineView
          Left = 11.338590000000000000
          Top = 124.724490000000000000
          Width = 665.197280000000000000
          Frame.Typ = [ftTop]
        end
        object Memo10: TfrxMemoView
          Left = 7.559060000000000000
          Top = 41.574829999999990000
          Width = 196.535560000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            #1053#1072#1079#1074#1072#1085#1080#1077' '#1084#1072#1090#1077#1088#1080#1072#1083#1072':')
          ParentFont = False
        end
        object Memo11: TfrxMemoView
          Left = 7.559060000000000000
          Top = 68.031540000000010000
          Width = 196.535560000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            #1050#1086#1076' '#1089#1082#1083#1072#1076#1072':')
          ParentFont = False
        end
        object Memo6: TfrxMemoView
          Left = 226.771800000000000000
          Top = 94.488250000000030000
          Width = 449.764070000000000000
          Height = 18.897650000000000000
          DataField = 'CENA'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."CENA"]')
          ParentFont = False
        end
        object Memo7: TfrxMemoView
          Left = 7.559060000000000000
          Top = 94.488250000000030000
          Width = 196.535560000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            #1062#1077#1085#1072' '#1079#1072' 1 '#1091'.'#1077'.:')
          ParentFont = False
        end
      end
    end
  end
  object frxDBDataset1: TfrxDBDataset
    UserName = 'frxDBDataset1'
    Left = 704
    Top = 440
  end
  object ADOStoredProc8: TADOStoredProc
    ProcedureName = 'GET_EDINIC_DIL'
    Parameters = <
      item
        Name = 'P_DATA'
        DataType = ftDateTime
        Value = Null
      end
      item
        Name = 'P_KOD'
        DataType = ftInteger
        Value = Null
      end
      item
        Name = 'EDIN'
        DataType = ftInteger
        Direction = pdOutput
        Value = Null
      end>
    Left = 172
    Top = 400
  end
  object ADOStoredProc9: TADOStoredProc
    ProcedureName = 'CHASTO_POK'
    Parameters = <
      item
        Name = 'P_KOD'
        DataType = ftInteger
        Value = Null
      end
      item
        Name = 'C_P'
        DataType = ftInteger
        Direction = pdOutput
        Value = Null
      end>
    Left = 228
    Top = 400
  end
end
