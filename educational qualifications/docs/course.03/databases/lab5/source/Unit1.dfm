object Form1: TForm1
  Left = 244
  Top = 117
  BorderStyle = bsDialog
  Caption = #1051#1072#1073#1086#1088#1072#1090#1086#1088#1085#1072#1103' '#1088#1072#1073#1086#1090#1072' '#8470'4 '#1087#1086' '#1041#1044'. '#1042#1058'-31. 2005'#1075'.'
  ClientHeight = 474
  ClientWidth = 746
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
  object GroupBox1: TGroupBox
    Left = 0
    Top = 0
    Width = 745
    Height = 65
    Caption = #1055#1086#1076#1082#1083#1102#1095#1077#1085#1080#1077
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -11
    Font.Name = 'MS Sans Serif'
    Font.Style = [fsBold]
    ParentFont = False
    TabOrder = 0
    object Label33: TLabel
      Left = 8
      Top = 19
      Width = 86
      Height = 13
      Caption = #1055#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1100
    end
    object Label34: TLabel
      Left = 8
      Top = 43
      Width = 45
      Height = 13
      Caption = #1055#1072#1088#1086#1083#1100
    end
    object Label35: TLabel
      Left = 288
      Top = 19
      Width = 174
      Height = 13
      Caption = #1041#1044' <server_name>:<filename>'
    end
    object Edit20: TEdit
      Left = 96
      Top = 16
      Width = 185
      Height = 21
      Color = cl3DLight
      TabOrder = 0
    end
    object Edit25: TEdit
      Left = 96
      Top = 40
      Width = 185
      Height = 21
      Color = cl3DLight
      PasswordChar = '*'
      TabOrder = 1
    end
    object Edit26: TEdit
      Left = 288
      Top = 40
      Width = 185
      Height = 21
      Color = cl3DLight
      TabOrder = 2
    end
    object Button16: TButton
      Left = 504
      Top = 16
      Width = 113
      Height = 45
      Caption = 'Connect'
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = [fsBold]
      ParentFont = False
      TabOrder = 3
      OnClick = Button16Click
    end
    object Button17: TButton
      Left = 624
      Top = 16
      Width = 113
      Height = 45
      Caption = 'Disconnect'
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = [fsBold]
      ParentFont = False
      TabOrder = 4
      OnClick = Button17Click
    end
  end
  object GroupBox2: TGroupBox
    Left = 0
    Top = 64
    Width = 745
    Height = 409
    Caption = #1059#1087#1088#1072#1074#1083#1077#1085#1080#1077
    TabOrder = 1
    object PageControl1: TPageControl
      Left = 2
      Top = 15
      Width = 741
      Height = 392
      ActivePage = TabSheet1
      Align = alClient
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = [fsBold]
      ParentFont = False
      TabIndex = 0
      TabOrder = 0
      object TabSheet1: TTabSheet
        Caption = #1055#1088#1086#1089#1084#1086#1090#1088' '#1090#1072#1073#1083#1080#1094
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'MS Sans Serif'
        Font.Style = [fsBold]
        ParentFont = False
        object Label30: TLabel
          Left = 0
          Top = 0
          Width = 276
          Height = 13
          Caption = #1055#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103', '#1085#1091#1078#1076#1072#1102#1097#1080#1077#1089#1103' '#1074' '#1074#1099#1074#1086#1079#1077' '#1084#1091#1089#1086#1088#1072
        end
        object Label31: TLabel
          Left = 0
          Top = 120
          Width = 195
          Height = 13
          Caption = #1055#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103', '#1074#1099#1074#1086#1079#1103#1097#1080#1077' '#1084#1091#1089#1086#1088
        end
        object Label32: TLabel
          Left = 0
          Top = 240
          Width = 284
          Height = 13
          Caption = #1060#1072#1082#1090#1080#1095#1077#1089#1082#1080#1081' '#1080' '#1087#1088#1086#1075#1085#1086#1079#1080#1088#1091#1077#1084#1099#1081' '#1074#1099#1074#1086#1079' '#1084#1091#1089#1086#1088#1072
        end
        object DBGrid2: TDBGrid
          Left = 0
          Top = 136
          Width = 729
          Height = 105
          Color = cl3DLight
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
              Title.Caption = #1050#1086#1076
              Width = 66
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'NAME_PR'
              Title.Caption = #1053#1072#1079#1074#1072#1085#1080#1077' '#1087#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103
              Width = 328
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'CENA_M3'
              Title.Caption = #1062#1077#1085#1072' '#1079#1072' '#1086#1076#1080#1085' '#1084#1077#1090#1088' '#1082#1091#1073#1080#1095#1077#1089#1082#1080#1081
              Width = 293
              Visible = True
            end>
        end
        object DBGrid3: TDBGrid
          Left = 0
          Top = 256
          Width = 729
          Height = 105
          Color = cl3DLight
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
              Title.Caption = #1050#1086#1076
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'ID1'
              Title.Caption = #1050#1086#1076' '#1087#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103
              Width = 123
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'GOD'
              Title.Caption = #1043#1086#1076' '#1088#1072#1089#1095#1077#1090#1072
              Width = 184
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'V'
              Title.Caption = #1054#1073#1098#1077#1084' '#1074#1099#1074#1077#1079#1077#1085#1085#1086#1075#1086' '#1084#1091#1089#1086#1088#1072' ('#1092#1072#1082#1090' '#1080#1083#1080' '#1087#1088#1086#1075#1085#1086#1079')'
              Width = 312
              Visible = True
            end>
        end
        object Button15: TButton
          Left = 576
          Top = 0
          Width = 153
          Height = 15
          Caption = #1054#1073#1085#1086#1074#1080#1090#1100
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentFont = False
          TabOrder = 2
          OnClick = Button15Click
        end
        object DBGrid1: TDBGrid
          Left = 0
          Top = 16
          Width = 729
          Height = 105
          Color = cl3DLight
          DataSource = DataSource1
          ReadOnly = True
          TabOrder = 3
          TitleFont.Charset = DEFAULT_CHARSET
          TitleFont.Color = clWindowText
          TitleFont.Height = -11
          TitleFont.Name = 'MS Sans Serif'
          TitleFont.Style = [fsBold]
          Columns = <
            item
              Expanded = False
              FieldName = 'ID'
              Title.Caption = #1050#1086#1076
              Width = 68
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'NAME_PR'
              Title.Caption = #1053#1072#1079#1074#1072#1085#1080#1077' '#1087#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103
              Width = 153
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'ADRES'
              Title.Caption = #1055#1086#1083#1085#1099#1081' '#1072#1076#1088#1077#1089
              Width = 164
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'RAION'
              Title.Caption = #1056#1072#1081#1086#1085
              Width = 124
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'FIORUC'
              Title.Caption = #1056#1091#1082#1086#1074#1086#1076#1080#1090#1077#1083#1100
              Width = 182
              Visible = True
            end>
        end
      end
      object TabSheet2: TTabSheet
        Caption = #1040#1076#1084#1080#1085#1080#1089#1090#1088#1080#1088#1086#1074#1072#1085#1080#1077
        ImageIndex = 1
        object GroupBox9: TGroupBox
          Left = 0
          Top = 0
          Width = 729
          Height = 361
          Caption = #1044#1086#1073#1072#1074#1080#1090#1100' '#1087#1088#1072#1074#1072' '#1087#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1102
          TabOrder = 0
          object Label23: TLabel
            Left = 8
            Top = 24
            Width = 86
            Height = 13
            Caption = #1055#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1100
          end
          object Edit18: TEdit
            Left = 112
            Top = 20
            Width = 161
            Height = 21
            Color = cl3DLight
            TabOrder = 0
          end
          object Button8: TButton
            Left = 288
            Top = 18
            Width = 177
            Height = 25
            Caption = #1044#1086#1073#1072#1074#1080#1090#1100
            TabOrder = 1
            OnClick = Button8Click
          end
        end
      end
      object TabSheet3: TTabSheet
        Caption = #1056#1077#1076#1072#1082#1090#1080#1088#1086#1074#1072#1085#1080#1077
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'MS Sans Serif'
        Font.Style = [fsBold]
        ImageIndex = 2
        ParentFont = False
        object PageControl2: TPageControl
          Left = 0
          Top = 0
          Width = 733
          Height = 364
          ActivePage = TabSheet7
          Align = alClient
          TabIndex = 1
          TabOrder = 0
          object TabSheet6: TTabSheet
            Caption = #1055#1086#1083#1100#1079#1086#1074#1072#1090#1077#1083#1100
            object Label1: TLabel
              Left = 8
              Top = 8
              Width = 236
              Height = 13
              Caption = #1050#1086#1076' '#1087#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103', '#1086#1090#1082#1091#1076#1072' '#1091#1074#1077#1079#1083#1080' '#1084#1091#1089#1086#1088
            end
            object Label2: TLabel
              Left = 8
              Top = 32
              Width = 219
              Height = 13
              Caption = #1050#1086#1076' '#1087#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103', '#1074#1099#1074#1086#1079#1103#1097#1077#1077' '#1084#1091#1089#1086#1088
            end
            object Label3: TLabel
              Left = 8
              Top = 58
              Width = 171
              Height = 13
              Caption = #1042#1099#1074#1077#1079#1083#1080' '#1084#1077#1090#1088#1086#1074' '#1082#1091#1073#1080#1095#1077#1089#1082#1080#1093
            end
            object Label4: TLabel
              Left = 8
              Top = 82
              Width = 38
              Height = 13
              Caption = #1063#1080#1089#1083#1086
            end
            object Label5: TLabel
              Left = 8
              Top = 106
              Width = 39
              Height = 13
              Caption = #1052#1077#1089#1103#1094
            end
            object Label6: TLabel
              Left = 8
              Top = 130
              Width = 22
              Height = 13
              Caption = #1043#1086#1076
            end
            object Label13: TLabel
              Left = 8
              Top = 154
              Width = 253
              Height = 13
              Caption = #1047#1072' '#1089#1082#1086#1083#1100#1082#1086' '#1084#1077#1090#1088#1086#1074' '#1082#1091#1073#1080#1095#1077#1089#1082#1080#1093' '#1079#1072#1087#1083#1072#1090#1080#1083#1080
            end
            object ComboBox1: TComboBox
              Left = 264
              Top = 6
              Width = 185
              Height = 21
              Style = csDropDownList
              Color = cl3DLight
              ItemHeight = 13
              TabOrder = 0
              OnEnter = ComboBox1Enter
            end
            object ComboBox2: TComboBox
              Left = 264
              Top = 30
              Width = 185
              Height = 21
              Style = csDropDownList
              Color = cl3DLight
              ItemHeight = 13
              TabOrder = 1
              OnEnter = ComboBox2Enter
            end
            object Edit1: TEdit
              Left = 264
              Top = 56
              Width = 185
              Height = 21
              Color = cl3DLight
              TabOrder = 2
            end
            object Button1: TButton
              Left = 8
              Top = 182
              Width = 145
              Height = 25
              Caption = #1044#1086#1073#1072#1074#1080#1090#1100' '#1079#1072#1087#1080#1089#1100
              Font.Charset = DEFAULT_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'MS Sans Serif'
              Font.Style = [fsBold]
              ParentFont = False
              TabOrder = 3
              OnClick = Button1Click
            end
            object ComboBox3: TComboBox
              Left = 264
              Top = 78
              Width = 185
              Height = 21
              Style = csDropDownList
              Color = cl3DLight
              ItemHeight = 13
              TabOrder = 4
              Items.Strings = (
                '1'
                '2'
                '3'
                '4'
                '5'
                '6'
                '7'
                '8'
                '9'
                '10'
                '11'
                '12'
                '13'
                '14'
                '15'
                '16'
                '17'
                '18'
                '19'
                '20'
                '21'
                '22'
                '23'
                '24'
                '25'
                '26'
                '27'
                '28'
                '29'
                '30'
                '31')
            end
            object ComboBox4: TComboBox
              Left = 264
              Top = 102
              Width = 185
              Height = 21
              Style = csDropDownList
              Color = cl3DLight
              ItemHeight = 13
              TabOrder = 5
              Items.Strings = (
                '1'
                '2'
                '3'
                '4'
                '5'
                '6'
                '7'
                '8'
                '9'
                '10'
                '11'
                '12')
            end
            object Edit2: TEdit
              Left = 264
              Top = 126
              Width = 185
              Height = 21
              Color = cl3DLight
              ReadOnly = True
              TabOrder = 6
            end
            object Edit9: TEdit
              Left = 264
              Top = 150
              Width = 185
              Height = 21
              Color = cl3DLight
              TabOrder = 7
            end
            object Button14: TButton
              Left = 160
              Top = 182
              Width = 145
              Height = 25
              Caption = #1059#1079#1085#1072#1090#1100' '#1090#1077#1082#1091#1097#1080#1081' '#1075#1086#1076
              TabOrder = 8
              OnClick = Button14Click
            end
          end
          object TabSheet7: TTabSheet
            Caption = #1040#1076#1084#1080#1085#1080#1089#1090#1088#1072#1090#1086#1088
            ImageIndex = 1
            object GroupBox3: TGroupBox
              Left = 0
              Top = 0
              Width = 361
              Height = 153
              Caption = #1055#1088#1077#1076#1087#1088#1080#1103#1090#1080#1077', '#1086#1090#1082#1091#1076#1072' '#1091#1074#1086#1079#1103#1090' '#1084#1091#1089#1086#1088
              Font.Charset = DEFAULT_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'MS Sans Serif'
              Font.Style = [fsBold]
              ParentFont = False
              TabOrder = 0
              object Label7: TLabel
                Left = 8
                Top = 24
                Width = 59
                Height = 13
                Caption = #1053#1072#1079#1074#1072#1085#1080#1077
              end
              object Label8: TLabel
                Left = 8
                Top = 48
                Width = 37
                Height = 13
                Caption = #1056#1072#1081#1086#1085
              end
              object Label9: TLabel
                Left = 8
                Top = 72
                Width = 37
                Height = 13
                Caption = #1040#1076#1088#1077#1089
              end
              object Label10: TLabel
                Left = 8
                Top = 96
                Width = 117
                Height = 13
                Caption = #1060#1048#1054' '#1088#1091#1082#1086#1074#1086#1076#1080#1090#1077#1083#1103
              end
              object Edit3: TEdit
                Left = 136
                Top = 22
                Width = 217
                Height = 21
                Color = cl3DLight
                TabOrder = 0
              end
              object Edit4: TEdit
                Left = 136
                Top = 46
                Width = 217
                Height = 21
                Color = cl3DLight
                TabOrder = 1
              end
              object Edit5: TEdit
                Left = 136
                Top = 70
                Width = 217
                Height = 21
                Color = cl3DLight
                TabOrder = 2
              end
              object Edit6: TEdit
                Left = 136
                Top = 94
                Width = 217
                Height = 21
                Color = cl3DLight
                TabOrder = 3
              end
              object Button2: TButton
                Left = 224
                Top = 120
                Width = 129
                Height = 25
                Caption = #1044#1086#1073#1072#1074#1080#1090#1100
                Font.Charset = DEFAULT_CHARSET
                Font.Color = clWindowText
                Font.Height = -11
                Font.Name = 'MS Sans Serif'
                Font.Style = [fsBold]
                ParentFont = False
                TabOrder = 4
                OnClick = Button2Click
              end
            end
            object GroupBox4: TGroupBox
              Left = 360
              Top = 0
              Width = 361
              Height = 153
              Caption = #1055#1088#1077#1076#1087#1088#1080#1103#1090#1080#1077', '#1074#1099#1074#1086#1079#1103#1097#1077#1077' '#1084#1091#1089#1086#1088
              TabOrder = 1
              object Label11: TLabel
                Left = 8
                Top = 24
                Width = 59
                Height = 13
                Caption = #1053#1072#1079#1074#1072#1085#1080#1077
              end
              object Label12: TLabel
                Left = 8
                Top = 48
                Width = 101
                Height = 13
                Caption = #1062#1077#1085#1072' '#1079#1072' '#1086#1076#1080#1085' '#1084'3'
              end
              object Edit7: TEdit
                Left = 120
                Top = 22
                Width = 233
                Height = 21
                Color = cl3DLight
                TabOrder = 0
              end
              object Edit8: TEdit
                Left = 120
                Top = 46
                Width = 233
                Height = 21
                Color = cl3DLight
                TabOrder = 1
              end
              object Button3: TButton
                Left = 224
                Top = 72
                Width = 129
                Height = 25
                Caption = #1044#1086#1073#1072#1074#1080#1090#1100
                Font.Charset = DEFAULT_CHARSET
                Font.Color = clLime
                Font.Height = -11
                Font.Name = 'Microsoft Sans Serif'
                Font.Style = [fsBold]
                ParentFont = False
                TabOrder = 2
                OnClick = Button3Click
              end
            end
            object GroupBox5: TGroupBox
              Left = 0
              Top = 152
              Width = 361
              Height = 129
              Caption = #1048#1085#1092#1086#1088#1084#1072#1094#1080#1103' '#1087#1086' '#1074#1099#1074#1086#1079#1091' '#1084#1091#1089#1086#1088#1072' '#1087#1086' '#1075#1086#1076#1072#1084
              TabOrder = 2
              object Label14: TLabel
                Left = 8
                Top = 56
                Width = 103
                Height = 13
                Caption = #1050#1086#1076' '#1087#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103
              end
              object Label15: TLabel
                Left = 8
                Top = 80
                Width = 22
                Height = 13
                Caption = #1043#1086#1076
              end
              object Label17: TLabel
                Left = 8
                Top = 104
                Width = 165
                Height = 13
                Caption = #1055#1088#1086#1075#1085#1086#1079#1080#1088#1091#1077#1084#1099#1081' '#1086#1073#1098#1077#1084' '#1084'3'
              end
              object Button4: TButton
                Left = 224
                Top = 24
                Width = 129
                Height = 25
                Caption = #1044#1086#1073#1072#1074#1080#1090#1100
                Font.Charset = DEFAULT_CHARSET
                Font.Color = clWindowText
                Font.Height = -11
                Font.Name = 'MS Sans Serif'
                Font.Style = [fsBold]
                ParentFont = False
                TabOrder = 0
                OnClick = Button4Click
              end
              object ComboBox5: TComboBox
                Left = 184
                Top = 54
                Width = 169
                Height = 21
                Color = cl3DLight
                ItemHeight = 13
                TabOrder = 1
                OnEnter = ComboBox5Enter
              end
              object Edit10: TEdit
                Left = 184
                Top = 102
                Width = 169
                Height = 21
                Color = cl3DLight
                TabOrder = 2
              end
              object Edit11: TEdit
                Left = 184
                Top = 78
                Width = 169
                Height = 21
                Color = cl3DLight
                ReadOnly = True
                TabOrder = 3
              end
            end
            object GroupBox6: TGroupBox
              Left = 360
              Top = 152
              Width = 361
              Height = 129
              Caption = #1055#1086#1076#1089#1095#1080#1090#1072#1090#1100' '#1085#1072' '#1082#1086#1085#1077#1094' '#1075#1086#1076#1072
              TabOrder = 3
              object Label18: TLabel
                Left = 8
                Top = 24
                Width = 22
                Height = 13
                Caption = #1043#1086#1076
              end
              object Edit13: TEdit
                Left = 40
                Top = 20
                Width = 57
                Height = 21
                Color = cl3DLight
                ReadOnly = True
                TabOrder = 0
              end
              object Button5: TButton
                Left = 104
                Top = 20
                Width = 249
                Height = 21
                Caption = #1042#1099#1087#1086#1083#1085#1080#1090#1100' '#1087#1086#1076#1089#1095#1077#1090
                Font.Charset = DEFAULT_CHARSET
                Font.Color = clWindowText
                Font.Height = -11
                Font.Name = 'MS Sans Serif'
                Font.Style = [fsBold]
                ParentFont = False
                TabOrder = 1
                OnClick = Button5Click
              end
            end
            object GroupBox13: TGroupBox
              Left = 0
              Top = 280
              Width = 721
              Height = 57
              Caption = #1058#1077#1082#1091#1097#1080#1081' '#1075#1086#1076
              TabOrder = 4
              object Edit12: TEdit
                Left = 8
                Top = 16
                Width = 41
                Height = 21
                Color = cl3DLight
                ReadOnly = True
                TabOrder = 0
                Text = '2'#160'000'
              end
              object UpDown1: TUpDown
                Left = 49
                Top = 16
                Width = 16
                Height = 21
                Associate = Edit12
                Min = 2000
                Max = 2050
                Position = 2000
                TabOrder = 1
                Wrap = False
                OnClick = UpDown1Click
              end
              object Button19: TButton
                Left = 72
                Top = 16
                Width = 145
                Height = 21
                Caption = #1059#1089#1090#1072#1085#1086#1074#1080#1090#1100
                Font.Charset = DEFAULT_CHARSET
                Font.Color = clWindowText
                Font.Height = -11
                Font.Name = 'MS Sans Serif'
                Font.Style = [fsBold]
                ParentFont = False
                TabOrder = 2
                OnClick = Button19Click
              end
            end
          end
        end
      end
      object TabSheet4: TTabSheet
        Caption = #1054#1090#1095#1077#1090#1099
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'MS Sans Serif'
        Font.Style = [fsBold]
        ImageIndex = 3
        ParentFont = False
        object Button10: TButton
          Left = 8
          Top = 8
          Width = 353
          Height = 17
          Caption = #1054#1090#1095#1077#1090' '#1087#1086' '#1087#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103#1084', '#1074#1099#1074#1086#1079#1103#1097#1080#1093' '#1084#1091#1089#1086#1088
          TabOrder = 0
          OnClick = Button10Click
        end
        object Button11: TButton
          Left = 8
          Top = 32
          Width = 353
          Height = 17
          Caption = #1054#1090#1095#1077#1090' '#1087#1086' '#1087#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103#1084', '#1085#1091#1078#1076#1072#1102#1097#1080#1093#1089#1103' '#1074' '#1074#1099#1074#1086#1079#1077' '#1084#1091#1089#1086#1088#1072
          TabOrder = 1
          OnClick = Button11Click
        end
        object Button12: TButton
          Left = 8
          Top = 56
          Width = 353
          Height = 17
          Caption = #1042#1099#1074#1086#1079' '#1084#1091#1089#1086#1088#1072' '#1087#1086' '#1075#1086#1076#1072#1084
          TabOrder = 2
          OnClick = Button12Click
        end
      end
      object TabSheet5: TTabSheet
        Caption = #1055#1088#1086#1089#1084#1086#1090#1088' '#1087#1086' '#1074#1099#1073#1086#1088#1091
        ImageIndex = 4
        object GroupBox10: TGroupBox
          Left = 0
          Top = 0
          Width = 732
          Height = 361
          Caption = #1047#1072#1076#1086#1083#1078#1085#1080#1082#1080
          TabOrder = 0
          object Label24: TLabel
            Left = 8
            Top = 18
            Width = 79
            Height = 13
            Caption = #1055#1088#1077#1076#1087#1088#1080#1103#1090#1080#1077
          end
          object Label25: TLabel
            Left = 8
            Top = 42
            Width = 22
            Height = 13
            Caption = #1043#1086#1076
          end
          object Label26: TLabel
            Left = 8
            Top = 72
            Width = 113
            Height = 13
            Caption = #1047#1072#1076#1086#1083#1078#1085#1086#1089#1090#1100' ('#1091'.'#1077'.)'
          end
          object Button9: TButton
            Left = 360
            Top = 16
            Width = 361
            Height = 97
            Caption = #1055#1088#1086#1089#1084#1086#1090#1088' '#1079#1072#1076#1086#1083#1078#1085#1086#1089#1090#1080
            TabOrder = 0
            OnClick = Button9Click
          end
          object Edit21: TEdit
            Left = 8
            Top = 92
            Width = 345
            Height = 21
            Color = cl3DLight
            ReadOnly = True
            TabOrder = 1
          end
          object ComboBox6: TComboBox
            Left = 88
            Top = 16
            Width = 267
            Height = 21
            Color = cl3DLight
            ItemHeight = 13
            TabOrder = 2
            OnEnter = ComboBox6Enter
          end
          object Edit19: TEdit
            Left = 88
            Top = 40
            Width = 249
            Height = 21
            Color = cl3DLight
            ReadOnly = True
            TabOrder = 3
            Text = '2000'
          end
          object UpDown3: TUpDown
            Left = 337
            Top = 40
            Width = 16
            Height = 21
            Associate = Edit19
            Min = 2000
            Max = 2050
            Position = 2000
            TabOrder = 4
            Wrap = False
          end
        end
      end
    end
  end
  object IBTransaction1: TIBTransaction
    Active = False
    DefaultDatabase = IBDatabase1
    AutoStopAction = saNone
    Left = 32
    Top = 440
  end
  object DataSource1: TDataSource
    DataSet = IBQuery1
    Left = 136
    Top = 440
  end
  object DataSource2: TDataSource
    DataSet = IBQuery2
    Left = 168
    Top = 440
  end
  object DataSource3: TDataSource
    DataSet = IBQuery3
    Left = 200
    Top = 444
  end
  object IBQuery2: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    Left = 272
    Top = 440
  end
  object IBQuery3: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    Left = 304
    Top = 440
  end
  object IBQuery1: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    Left = 240
    Top = 440
  end
  object IBDatabase1: TIBDatabase
    LoginPrompt = False
    DefaultTransaction = IBTransaction1
    IdleTimer = 0
    SQLDialect = 3
    TraceFlags = []
    Top = 440
  end
  object IBQuery4: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    Left = 104
    Top = 440
  end
  object IBStoredProc1: TIBStoredProc
    Database = IBDatabase1
    Transaction = IBTransaction1
    Left = 64
    Top = 440
  end
  object frxReport1: TfrxReport
    DotMatrixReport = False
    IniFile = '\Software\Fast Reports'
    PreviewOptions.Buttons = [pbPrint, pbLoad, pbSave, pbExport, pbZoom, pbFind, pbOutline, pbPageSetup, pbTools, pbEdit, pbNavigator]
    PreviewOptions.Zoom = 1
    PrintOptions.Printer = 'Default'
    ReportOptions.CreateDate = 38712.3912309954
    ReportOptions.LastChange = 38712.496440787
    ScriptLanguage = 'PascalScript'
    ScriptText.Strings = (
      'begin'
      ''
      'end.')
    Left = 608
    Top = 440
    Datasets = <
      item
        DataSet = frxDBDataset1
        DataSetName = 'frxDBDataset1'
      end>
    Variables = <>
    Style = <>
    object Page1: TfrxReportPage
      PaperWidth = 210
      PaperHeight = 297
      PaperSize = 9
      LeftMargin = 10
      RightMargin = 10
      TopMargin = 10
      BottomMargin = 10
      object ReportTitle1: TfrxReportTitle
        Height = 37.7953
        Top = 18.89765
        Width = 718.1107
        object Memo2: TfrxMemoView
          Left = 200.31509
          Top = 3.77953
          Width = 612.28386
          Height = 26.45671
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -19
          Font.Name = 'Arial'
          Font.Style = [fsBold, fsItalic]
          Memo.Strings = (
            #1054#1090#1095#1077#1090' '#1087#1086' '#1074#1099#1074#1086#1079#1091' '#1084#1091#1089#1086#1088#1072' '#1087#1086' '#1075#1086#1076#1072#1084)
          ParentFont = False
        end
      end
      object MasterData1: TfrxMasterData
        Height = 3.77953
        Top = 117.16543
        Width = 718.1107
        DataSet = frxDBDataset1
        DataSetName = 'frxDBDataset1'
        RowCount = 0
      end
      object PageFooter1: TfrxPageFooter
        Height = 22.67718
        Top = 340.1577
        Width = 718.1107
        object Memo1: TfrxMemoView
          Left = 642.09931233
          Width = 75.5906
          Height = 18.89765
          HAlign = haRight
          Memo.Strings = (
            '[Page#]')
        end
      end
      object DetailData1: TfrxDetailData
        Height = 136.06308
        Top = 143.62214
        Width = 718.1107
        DataSet = frxDBDataset1
        DataSetName = 'frxDBDataset1'
        RowCount = 0
        object Memo3: TfrxMemoView
          Left = 15.11812
          Top = 7.55905999999999
          Width = 196.53556
          Height = 18.89765
          Memo.Strings = (
            #1048#1076#1077#1085#1090#1080#1092#1080#1082#1072#1090#1086#1088' '#1087#1088#1077#1076#1087#1088#1080#1103#1090#1080#1103':')
        end
        object Memo4: TfrxMemoView
          Left = 230.55133
          Top = 7.55905999999999
          Width = 196.53556
          Height = 18.89765
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Memo.Strings = (
            '[frxDBDataset1."ID1"]')
        end
        object Memo7: TfrxMemoView
          Left = 15.11812
          Top = 34.01577
          Width = 196.53556
          Height = 18.89765
          Memo.Strings = (
            #1043#1086#1076' '#1088#1072#1089#1095#1077#1090#1072':')
        end
        object Memo8: TfrxMemoView
          Left = 230.55133
          Top = 34.01577
          Width = 196.53556
          Height = 18.89765
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Memo.Strings = (
            '[frxDBDataset1."GOD"]')
        end
        object Memo9: TfrxMemoView
          Left = 230.55133
          Top = 60.47248
          Width = 196.53556
          Height = 18.89765
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Memo.Strings = (
            '[frxDBDataset1."V"]')
        end
        object Memo11: TfrxMemoView
          Left = 15.11812
          Top = 60.47248
          Width = 222.99227
          Height = 18.89765
          Memo.Strings = (
            #1054#1073#1098#1077#1084' '#1074#1099#1074#1077#1079#1077#1085#1085#1086#1075#1086' '#1084#1091#1089#1086#1088#1072':')
        end
        object Line1: TfrxLineView
          Left = 18.89765
          Top = 105.82684
          Width = 634.96104
          Frame.Typ = [ftTop]
        end
        object Line2: TfrxLineView
          Left = 18.89765
          Top = 113.3859
          Width = 634.96104
          Frame.Typ = [ftTop]
        end
      end
    end
  end
  object frxDBDataset1: TfrxDBDataset
    UserName = 'frxDBDataset1'
    DataSet = IBQuery5
    Left = 640
    Top = 440
  end
  object IBQuery5: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    SQL.Strings = (
      
        'SELECT ID,NAME_PR,ADRES,RAION,FIORUC FROM TABLE_PR_NUJD,TABLE_FI' +
        'O WHERE TABLE_PR_NUJD.ID=KOD_PR')
    Left = 672
    Top = 440
  end
  object IBQuery6: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    SQL.Strings = (
      'SELECT ID,NAME_PR,CENA_M3 FROM TABLE_PR_MUS')
    Left = 704
    Top = 440
  end
  object IBQuery7: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    SQL.Strings = (
      'select ID1,GOD,V from TABLE_FACT '
      '  where FLAG=true')
    Left = 704
    Top = 408
  end
end
