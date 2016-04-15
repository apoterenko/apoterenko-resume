object Form1: TForm1
  Left = 237
  Top = 138
  Width = 756
  Height = 574
  Caption = 'Laboratornaa rabota #3 po BD. Poterenko A.G.'
  Color = clMedGray
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
    Width = 748
    Height = 546
    Align = alClient
    Color = clSilver
    ParentColor = False
    TabOrder = 0
    object Label5: TLabel
      Left = 8
      Top = 12
      Width = 59
      Height = 13
      Caption = 'PUT K BD'
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = [fsBold]
      ParentFont = False
    end
    object PageControl1: TPageControl
      Left = 0
      Top = 32
      Width = 745
      Height = 513
      ActivePage = TabSheet1
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = [fsBold]
      ParentFont = False
      TabOrder = 0
      object TabSheet1: TTabSheet
        Caption = 'PROSMOTR'
        object Label1: TLabel
          Left = 0
          Top = 362
          Width = 95
          Height = 13
          Caption = 'IZDATELI KNIGI'
        end
        object Label2: TLabel
          Left = 0
          Top = 122
          Width = 43
          Height = 13
          Caption = 'AVTOR'
        end
        object Label3: TLabel
          Left = 0
          Top = 242
          Width = 101
          Height = 13
          Caption = 'NAZVANIE KNIGI'
        end
        object Label4: TLabel
          Left = 0
          Top = 2
          Width = 121
          Height = 13
          Caption = 'NAZVANIA I AVTORI'
        end
        object DBGrid1: TDBGrid
          Left = 0
          Top = 18
          Width = 737
          Height = 105
          Color = clSilver
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
              FieldName = 'PORADOK_AVT'
              Title.Caption = 'PORADKOVII NOMER AVTORA'
              Width = 300
              Visible = True
            end>
        end
        object DBGrid2: TDBGrid
          Left = 0
          Top = 136
          Width = 737
          Height = 105
          Color = clSilver
          DataSource = DataSource4
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
              FieldName = 'FAMILIA'
              Width = 100
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'IMA'
              Width = 100
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'OTCHESTVO'
              Width = 120
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'TELIFON'
              Title.Caption = 'TELEFON'
              Width = 100
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'GOROD'
              Width = 100
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'INN'
              Width = 100
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'KONTACT'
              Width = 60
              Visible = True
            end>
        end
        object DBGrid3: TDBGrid
          Left = 0
          Top = 256
          Width = 737
          Height = 105
          Color = clSilver
          DataSource = DataSource2
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
              FieldName = 'NAME'
              Title.Caption = 'NAZVANIE KNIGI'
              Width = 230
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'TEMA'
              Title.Caption = 'TEMA KNIGI'
              Width = 120
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'CENA'
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'GONOR'
              Title.Caption = 'GONORAR'
              Width = 80
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'DATA'
              Title.Caption = 'DATE'
              Width = 110
              Visible = True
            end>
        end
        object DBGrid4: TDBGrid
          Left = 0
          Top = 376
          Width = 737
          Height = 105
          Color = clSilver
          DataSource = DataSource3
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
              FieldName = 'NAME_IZD'
              Title.Caption = 'NAZVANIE IZDATELSTVA'
              Width = 280
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'GOROD'
              Title.Caption = 'GOROD IZDATELSTVA'
              Width = 220
              Visible = True
            end>
        end
      end
      object TabSheet2: TTabSheet
        Caption = 'REDACTIROVANIE'
        ImageIndex = 1
        object PageControl2: TPageControl
          Left = 0
          Top = 0
          Width = 737
          Height = 485
          ActivePage = TabSheet4
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentFont = False
          TabOrder = 0
          object TabSheet4: TTabSheet
            Caption = 'AVTORI'
            object Label6: TLabel
              Left = 0
              Top = 8
              Width = 80
              Height = 13
              Caption = 'Familia avtora'
            end
            object Label7: TLabel
              Left = 0
              Top = 32
              Width = 61
              Height = 13
              Caption = 'Ima avtora'
            end
            object Label8: TLabel
              Left = 0
              Top = 56
              Width = 99
              Height = 13
              Caption = 'Otchestvo avtora'
            end
            object Label9: TLabel
              Left = 0
              Top = 80
              Width = 84
              Height = 13
              Caption = 'Telefon avtora'
            end
            object Label10: TLabel
              Left = 0
              Top = 104
              Width = 75
              Height = 13
              Caption = 'Gorod avtora'
            end
            object Label11: TLabel
              Left = 0
              Top = 128
              Width = 23
              Height = 13
              Caption = 'INN'
            end
            object Label12: TLabel
              Left = 0
              Top = 152
              Width = 45
              Height = 13
              Caption = 'Kontact'
            end
            object Label13: TLabel
              Left = 344
              Top = 8
              Width = 63
              Height = 13
              Caption = 'Kod avtora'
            end
            object Edit2: TEdit
              Left = 104
              Top = 5
              Width = 217
              Height = 21
              Color = clSilver
              TabOrder = 0
            end
            object Button1: TButton
              Left = 0
              Top = 176
              Width = 321
              Height = 25
              Caption = 'DOBAVIT'
              TabOrder = 1
              OnClick = Button1Click
            end
            object ComboBox1: TComboBox
              Left = 104
              Top = 149
              Width = 217
              Height = 21
              Style = csDropDownList
              Color = clSilver
              ItemHeight = 13
              TabOrder = 2
              Items.Strings = (
                '0'
                '1')
            end
            object Edit3: TEdit
              Left = 104
              Top = 29
              Width = 217
              Height = 21
              Color = clSilver
              TabOrder = 3
            end
            object Edit4: TEdit
              Left = 104
              Top = 53
              Width = 217
              Height = 21
              Color = clSilver
              TabOrder = 4
            end
            object Edit5: TEdit
              Left = 104
              Top = 77
              Width = 217
              Height = 21
              Color = clSilver
              TabOrder = 5
            end
            object Edit6: TEdit
              Left = 104
              Top = 101
              Width = 217
              Height = 21
              Color = clSilver
              TabOrder = 6
            end
            object Edit7: TEdit
              Left = 104
              Top = 125
              Width = 217
              Height = 21
              Color = clSilver
              TabOrder = 7
            end
            object ComboBox2: TComboBox
              Left = 416
              Top = 5
              Width = 249
              Height = 21
              Style = csDropDownList
              Color = clSilver
              ItemHeight = 13
              TabOrder = 8
              OnEnter = ComboBox2Enter
              Items.Strings = (
                '0'
                '1')
            end
            object Button3: TButton
              Left = 344
              Top = 176
              Width = 321
              Height = 25
              Caption = 'UDALIT'
              TabOrder = 9
              OnClick = Button3Click
            end
          end
          object TabSheet5: TTabSheet
            Caption = 'IZDATELI'
            ImageIndex = 1
            object Label14: TLabel
              Left = 0
              Top = 8
              Width = 119
              Height = 13
              Caption = 'Nazvanie izdatelstva'
            end
            object Label15: TLabel
              Left = 0
              Top = 32
              Width = 100
              Height = 13
              Caption = 'Gorod izdatelstva'
            end
            object Label16: TLabel
              Left = 352
              Top = 8
              Width = 88
              Height = 13
              Caption = 'Kod izdatelstva'
            end
            object Edit8: TEdit
              Left = 128
              Top = 5
              Width = 217
              Height = 21
              Color = clSilver
              TabOrder = 0
            end
            object Edit9: TEdit
              Left = 128
              Top = 29
              Width = 217
              Height = 21
              Color = clSilver
              TabOrder = 1
            end
            object Button4: TButton
              Left = 0
              Top = 56
              Width = 345
              Height = 25
              Caption = 'DOBAVIT'
              TabOrder = 2
              OnClick = Button4Click
            end
            object ComboBox3: TComboBox
              Left = 448
              Top = 5
              Width = 249
              Height = 21
              Style = csDropDownList
              Color = clSilver
              ItemHeight = 13
              TabOrder = 3
              OnEnter = ComboBox3Enter
              Items.Strings = (
                '0'
                '1')
            end
            object Button6: TButton
              Left = 352
              Top = 56
              Width = 345
              Height = 25
              Caption = 'UDALIT'
              TabOrder = 4
              OnClick = Button6Click
            end
          end
          object TabSheet6: TTabSheet
            Caption = 'NAZVANIE KNIGI'
            ImageIndex = 2
            object Label17: TLabel
              Left = 0
              Top = 8
              Width = 85
              Height = 13
              Caption = 'Nazvanie knigi'
            end
            object Label18: TLabel
              Left = 0
              Top = 32
              Width = 84
              Height = 13
              Caption = 'Tematika knigi'
            end
            object Label19: TLabel
              Left = 0
              Top = 56
              Width = 88
              Height = 13
              Caption = 'Kod izdatelstva'
            end
            object Label20: TLabel
              Left = 0
              Top = 80
              Width = 30
              Height = 13
              Caption = 'Cena'
            end
            object Label21: TLabel
              Left = 0
              Top = 104
              Width = 67
              Height = 13
              Caption = 'Gonorar (%)'
            end
            object Label22: TLabel
              Left = 0
              Top = 128
              Width = 111
              Height = 13
              Caption = 'Data izdania (*/*/*)'
            end
            object Label23: TLabel
              Left = 368
              Top = 8
              Width = 78
              Height = 13
              Caption = 'Kod nazvania'
            end
            object ComboBox4: TComboBox
              Left = 112
              Top = 53
              Width = 249
              Height = 21
              Style = csDropDownList
              Color = clSilver
              ItemHeight = 13
              TabOrder = 0
              OnEnter = ComboBox4Enter
              Items.Strings = (
                '0'
                '1')
            end
            object Edit10: TEdit
              Left = 112
              Top = 5
              Width = 249
              Height = 21
              Color = clSilver
              TabOrder = 1
            end
            object Edit11: TEdit
              Left = 112
              Top = 29
              Width = 249
              Height = 21
              Color = clSilver
              TabOrder = 2
            end
            object Edit12: TEdit
              Left = 112
              Top = 77
              Width = 249
              Height = 21
              Color = clSilver
              TabOrder = 3
            end
            object Edit13: TEdit
              Left = 112
              Top = 101
              Width = 249
              Height = 21
              Color = clSilver
              TabOrder = 4
            end
            object Edit14: TEdit
              Left = 112
              Top = 125
              Width = 249
              Height = 21
              Color = clSilver
              TabOrder = 5
            end
            object Button7: TButton
              Left = 0
              Top = 152
              Width = 353
              Height = 25
              Caption = 'DOBAVIT'
              TabOrder = 6
              OnClick = Button7Click
            end
            object ComboBox5: TComboBox
              Left = 456
              Top = 5
              Width = 265
              Height = 21
              Style = csDropDownList
              Color = clSilver
              ItemHeight = 13
              TabOrder = 7
              OnEnter = ComboBox5Enter
              Items.Strings = (
                '0'
                '1')
            end
            object Button8: TButton
              Left = 368
              Top = 152
              Width = 353
              Height = 25
              Caption = 'UDALIT'
              TabOrder = 8
              OnClick = Button8Click
            end
          end
          object TabSheet7: TTabSheet
            Caption = 'NAZVANIA I AVTORI'
            ImageIndex = 3
            object Label24: TLabel
              Left = 0
              Top = 8
              Width = 63
              Height = 13
              Caption = 'Kod avtora'
            end
            object Label25: TLabel
              Left = 0
              Top = 32
              Width = 78
              Height = 13
              Caption = 'Kod nazvania'
            end
            object ComboBox6: TComboBox
              Left = 88
              Top = 5
              Width = 257
              Height = 21
              Style = csDropDownList
              Color = clSilver
              ItemHeight = 13
              TabOrder = 0
              OnEnter = ComboBox6Enter
              Items.Strings = (
                '0'
                '1')
            end
            object ComboBox7: TComboBox
              Left = 88
              Top = 29
              Width = 257
              Height = 21
              Style = csDropDownList
              Color = clSilver
              ItemHeight = 13
              TabOrder = 1
              OnEnter = ComboBox7Enter
              Items.Strings = (
                '0'
                '1')
            end
            object Button9: TButton
              Left = 0
              Top = 56
              Width = 345
              Height = 25
              Caption = 'DOBAVIT'
              TabOrder = 2
              OnClick = Button9Click
            end
          end
        end
      end
      object TabSheet3: TTabSheet
        Caption = 'OTCHET'
        ImageIndex = 2
        object Button2: TButton
          Left = 2
          Top = 8
          Width = 273
          Height = 25
          Caption = 'OTCHET PO AVTORAM'
          TabOrder = 0
          OnClick = Button2Click
        end
      end
      object TabSheet8: TTabSheet
        Caption = 'ID PROSMOTR'
        ImageIndex = 3
        object Label26: TLabel
          Left = 0
          Top = 0
          Width = 34
          Height = 13
          Caption = 'Avtori'
        end
        object Label27: TLabel
          Left = 0
          Top = 122
          Width = 57
          Height = 13
          Caption = 'IZDATELI'
        end
        object Label28: TLabel
          Left = 0
          Top = 242
          Width = 36
          Height = 13
          Caption = 'NAME'
        end
        object Label29: TLabel
          Left = 0
          Top = 362
          Width = 52
          Height = 13
          Caption = 'NAMEAV'
        end
        object DBGrid5: TDBGrid
          Left = 0
          Top = 16
          Width = 737
          Height = 105
          Color = clSilver
          DataSource = DataSource5
          TabOrder = 0
          TitleFont.Charset = DEFAULT_CHARSET
          TitleFont.Color = clWindowText
          TitleFont.Height = -11
          TitleFont.Name = 'MS Sans Serif'
          TitleFont.Style = [fsBold]
        end
        object DBGrid6: TDBGrid
          Left = 0
          Top = 136
          Width = 737
          Height = 105
          Color = clSilver
          DataSource = DataSource6
          TabOrder = 1
          TitleFont.Charset = DEFAULT_CHARSET
          TitleFont.Color = clWindowText
          TitleFont.Height = -11
          TitleFont.Name = 'MS Sans Serif'
          TitleFont.Style = [fsBold]
        end
        object DBGrid7: TDBGrid
          Left = 0
          Top = 256
          Width = 737
          Height = 105
          Color = clSilver
          DataSource = DataSource7
          TabOrder = 2
          TitleFont.Charset = DEFAULT_CHARSET
          TitleFont.Color = clWindowText
          TitleFont.Height = -11
          TitleFont.Name = 'MS Sans Serif'
          TitleFont.Style = [fsBold]
        end
        object DBGrid8: TDBGrid
          Left = 0
          Top = 376
          Width = 737
          Height = 105
          Color = clSilver
          DataSource = DataSource8
          TabOrder = 3
          TitleFont.Charset = DEFAULT_CHARSET
          TitleFont.Color = clWindowText
          TitleFont.Height = -11
          TitleFont.Name = 'MS Sans Serif'
          TitleFont.Style = [fsBold]
        end
      end
    end
    object Edit1: TEdit
      Left = 88
      Top = 10
      Width = 225
      Height = 21
      Color = clSilver
      TabOrder = 1
    end
    object Button5: TButton
      Left = 384
      Top = 8
      Width = 361
      Height = 25
      Caption = 'CONNECT'
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = [fsBold]
      ParentFont = False
      TabOrder = 2
      OnClick = Button5Click
    end
  end
  object DataSource1: TDataSource
    DataSet = IBTable1
    Left = 676
    Top = 136
  end
  object DataSource2: TDataSource
    DataSet = IBTable3
    Left = 676
    Top = 320
  end
  object DataSource3: TDataSource
    DataSet = IBTable4
    Left = 676
    Top = 440
  end
  object DataSource4: TDataSource
    DataSet = IBTable2
    Left = 676
    Top = 208
  end
  object frxDBDataset1: TfrxDBDataset
    UserName = 'frxDBDataset1'
    DataSet = IBQuery1
    Left = 44
    Top = 504
  end
  object frxReport1: TfrxReport
    DotMatrixReport = False
    IniFile = '\Software\Fast Reports'
    PreviewOptions.Buttons = [pbPrint, pbLoad, pbSave, pbExport, pbZoom, pbFind, pbOutline, pbPageSetup, pbTools, pbEdit, pbNavigator]
    PreviewOptions.Zoom = 1.000000000000000000
    PrintOptions.Printer = 'Default'
    ReportOptions.CreateDate = 38716.600615231500000000
    ReportOptions.LastChange = 38719.919873217590000000
    ScriptLanguage = 'PascalScript'
    ScriptText.Strings = (
      'begin'
      ''
      'end.')
    Left = 12
    Top = 504
    Datasets = <
      item
        DataSet = frxDBDataset1
        DataSetName = 'frxDBDataset1'
      end>
    Variables = <>
    Style = <>
    object Page1: TfrxReportPage
      PaperWidth = 215.900000000000000000
      PaperHeight = 279.400000000000000000
      PaperSize = 1
      LeftMargin = 10.000000000000000000
      RightMargin = 10.000000000000000000
      TopMargin = 10.000000000000000000
      BottomMargin = 10.000000000000000000
      object ReportTitle1: TfrxReportTitle
        Height = 49.133890000000000000
        Top = 18.897650000000000000
        Width = 740.409927000000000000
        object Memo12: TfrxMemoView
          Left = 241.889920000000000000
          Top = 11.338590000000000000
          Width = 241.889920000000000000
          Height = 37.795300000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -20
          Font.Name = 'Arial'
          Font.Style = [fsBold, fsItalic]
          Memo.Strings = (
            'Otchet po avtoram knig')
          ParentFont = False
        end
        object Line3: TfrxLineView
          Left = 234.330860000000000000
          Top = 37.795300000000000000
          Width = 245.669450000000000000
          Frame.Typ = [ftTop]
        end
        object Line4: TfrxLineView
          Left = 234.330708661417000000
          Top = 41.574803149606300000
          Width = 245.669291340000000000
          Frame.Typ = [ftTop]
        end
      end
      object MasterData1: TfrxMasterData
        Top = 128.504020000000000000
        Width = 740.409927000000000000
        DataSet = frxDBDataset1
        DataSetName = 'frxDBDataset1'
        RowCount = 0
      end
      object PageFooter1: TfrxPageFooter
        Height = 22.677180000000000000
        Top = 668.976810000000000000
        Width = 740.409927000000000000
        object Memo1: TfrxMemoView
          Left = 664.819327000000000000
          Width = 75.590600000000000000
          Height = 18.897650000000000000
          HAlign = haRight
          Memo.Strings = (
            '[Page#]')
        end
      end
      object DetailData1: TfrxDetailData
        Height = 457.323130000000000000
        Top = 151.181200000000000000
        Width = 740.409927000000000000
        DataSet = frxDBDataset1
        DataSetName = 'frxDBDataset1'
        RowCount = 0
        object Memo2: TfrxMemoView
          Left = 94.488250000000000000
          Top = 11.338590000000010000
          Width = 404.409710000000000000
          Height = 18.897650000000000000
          DataField = 'KOD_AVTOR'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."KOD_AVTOR"]')
          ParentFont = False
        end
        object Memo3: TfrxMemoView
          Left = 7.559060000000000000
          Top = 11.338590000000010000
          Width = 83.149660000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Kod avtora:')
          ParentFont = False
        end
        object Memo4: TfrxMemoView
          Left = 7.559060000000000000
          Top = 37.795300000000000000
          Width = 64.252010000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Familia:')
          ParentFont = False
        end
        object Memo5: TfrxMemoView
          Left = 7.559060000000000000
          Top = 68.031540000000010000
          Width = 83.149660000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Ima avtora:')
          ParentFont = False
        end
        object Memo6: TfrxMemoView
          Left = 7.559060000000000000
          Top = 98.267779999999990000
          Width = 117.165430000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Otchestvo avtora:')
          ParentFont = False
        end
        object Memo7: TfrxMemoView
          Left = 7.559060000000000000
          Top = 128.504020000000000000
          Width = 102.047310000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Telefon avtora:')
          ParentFont = False
        end
        object Memo8: TfrxMemoView
          Left = 68.031540000000000000
          Top = 37.795300000000000000
          Width = 438.425480000000000000
          Height = 18.897650000000000000
          DataField = 'FAMILIA'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."FAMILIA"]')
          ParentFont = False
        end
        object Memo9: TfrxMemoView
          Left = 90.708720000000000000
          Top = 68.031540000000010000
          Width = 400.630180000000000000
          Height = 18.897650000000000000
          DataField = 'IMA'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."IMA"]')
          ParentFont = False
        end
        object Memo10: TfrxMemoView
          Left = 136.063080000000000000
          Top = 98.267779999999990000
          Width = 359.055350000000000000
          Height = 18.897650000000000000
          DataField = 'OTCHESTVO'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."OTCHESTVO"]')
          ParentFont = False
        end
        object Memo11: TfrxMemoView
          Left = 117.165430000000000000
          Top = 128.504020000000000000
          Width = 377.953000000000000000
          Height = 18.897650000000000000
          DataField = 'TELIFON'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."TELIFON"]')
          ParentFont = False
        end
        object Line1: TfrxLineView
          Left = 7.559055118110240000
          Top = 442.205010000000000000
          Width = 702.992580000000000000
          Frame.Typ = [ftTop]
        end
        object Line2: TfrxLineView
          Left = 7.559055118110240000
          Top = 445.984435040000000000
          Width = 702.992580000000000000
          Frame.Typ = [ftTop]
        end
        object Memo13: TfrxMemoView
          Left = 113.385900000000000000
          Top = 162.519790000000000000
          Width = 381.732530000000000000
          Height = 18.897650000000000000
          DataField = 'GOROD'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."GOROD"]')
          ParentFont = False
        end
        object Memo14: TfrxMemoView
          Left = 45.354360000000000000
          Top = 192.756030000000000000
          Width = 453.543600000000000000
          Height = 18.897650000000000000
          DataField = 'INN'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."INN"]')
          ParentFont = False
        end
        object Memo15: TfrxMemoView
          Left = 162.519790000000000000
          Top = 219.212740000000000000
          Width = 332.598640000000000000
          Height = 18.897650000000000000
          DataField = 'KONTACT'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."KONTACT"]')
          ParentFont = False
        end
        object Memo16: TfrxMemoView
          Left = 117.165430000000000000
          Top = 245.669450000000000000
          Width = 381.732530000000000000
          Height = 18.897650000000000000
          DataField = 'NAME'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."NAME"]')
          ParentFont = False
        end
        object Memo17: TfrxMemoView
          Left = 94.488250000000000000
          Top = 275.905690000000000000
          Width = 393.071120000000000000
          Height = 18.897650000000000000
          DataField = 'TEMA'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."TEMA"]')
          ParentFont = False
        end
        object Memo18: TfrxMemoView
          Left = 90.708720000000000000
          Top = 306.141930000000000000
          Width = 400.630180000000000000
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
        object Memo19: TfrxMemoView
          Left = 139.842610000000000000
          Top = 336.378170000000000000
          Width = 355.275820000000000000
          Height = 18.897650000000000000
          DataField = 'GONOR'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."GONOR"]')
          ParentFont = False
        end
        object Memo20: TfrxMemoView
          Left = 109.606370000000000000
          Top = 362.834880000000000000
          Width = 385.512060000000000000
          Height = 18.897650000000000000
          DataField = 'DATA'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."DATA"]')
          ParentFont = False
        end
        object Memo21: TfrxMemoView
          Left = 158.740260000000000000
          Top = 389.291590000000100000
          Width = 340.157700000000000000
          Height = 18.897650000000000000
          DataField = 'NAME_IZD'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."NAME_IZD"]')
          ParentFont = False
        end
        object Memo22: TfrxMemoView
          Left = 139.842610000000000000
          Top = 415.748300000000000000
          Width = 362.834880000000000000
          Height = 18.897650000000000000
          DataField = 'GOROD1'
          DataSet = frxDBDataset1
          DataSetName = 'frxDBDataset1'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsItalic]
          Memo.Strings = (
            '[frxDBDataset1."GOROD1"]')
          ParentFont = False
        end
        object Memo23: TfrxMemoView
          Left = 7.559060000000000000
          Top = 162.519790000000000000
          Width = 102.047310000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Adres avtora:')
          ParentFont = False
        end
        object Memo24: TfrxMemoView
          Left = 7.559060000000000000
          Top = 192.756030000000000000
          Width = 102.047310000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'INN:')
          ParentFont = False
        end
        object Memo25: TfrxMemoView
          Left = 7.559060000000000000
          Top = 219.212740000000000000
          Width = 154.960730000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Kontact (1-DA,0-NET):')
          ParentFont = False
        end
        object Memo26: TfrxMemoView
          Left = 7.559060000000000000
          Top = 245.669450000000000000
          Width = 102.047310000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Nazvanie knigi:')
          ParentFont = False
        end
        object Memo27: TfrxMemoView
          Left = 7.559060000000000000
          Top = 275.905690000000000000
          Width = 102.047310000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Tema knigi:')
          ParentFont = False
        end
        object Memo28: TfrxMemoView
          Left = 7.559060000000000000
          Top = 306.141930000000000000
          Width = 102.047310000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Cena knigi:')
          ParentFont = False
        end
        object Memo29: TfrxMemoView
          Left = 7.559060000000000000
          Top = 336.378170000000000000
          Width = 158.740260000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Gonorar avtora (%):')
          ParentFont = False
        end
        object Memo30: TfrxMemoView
          Left = 7.559060000000000000
          Top = 362.834880000000000000
          Width = 102.047310000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Data izdania:')
          ParentFont = False
        end
        object Memo31: TfrxMemoView
          Left = 7.559060000000000000
          Top = 389.291590000000100000
          Width = 147.401670000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Nazvanie izdatelstva:')
          ParentFont = False
        end
        object Memo32: TfrxMemoView
          Left = 7.559060000000000000
          Top = 415.748300000000000000
          Width = 124.724490000000000000
          Height = 18.897650000000000000
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          Memo.Strings = (
            'Gorod izdatelstva:')
          ParentFont = False
        end
      end
    end
  end
  object DataSource5: TDataSource
    DataSet = IBTable5
    Left = 380
    Top = 504
  end
  object DataSource6: TDataSource
    DataSet = IBTable6
    Left = 412
    Top = 504
  end
  object DataSource7: TDataSource
    DataSet = IBTable7
    Left = 444
    Top = 504
  end
  object DataSource8: TDataSource
    DataSet = IBTable8
    Left = 476
    Top = 504
  end
  object IBDatabase1: TIBDatabase
    Params.Strings = (
      'user_name=SYSDBA')
    LoginPrompt = False
    DefaultTransaction = IBTransaction1
    IdleTimer = 0
    SQLDialect = 3
    TraceFlags = []
    Left = 708
    Top = 40
  end
  object IBTransaction1: TIBTransaction
    Active = False
    DefaultDatabase = IBDatabase1
    AutoStopAction = saNone
    Left = 676
    Top = 40
  end
  object IBTable1: TIBTable
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    IndexDefs = <
      item
        Name = 'RDB$PRIMARY12'
        Fields = 'PORADOK_AVT'
        Options = [ixPrimary, ixUnique]
      end
      item
        Name = 'RDB$FOREIGN13'
        Fields = 'KOD_AVT'
      end
      item
        Name = 'RDB$FOREIGN14'
        Fields = 'KOD_NAME'
      end>
    StoreDefs = True
    Left = 708
    Top = 136
  end
  object IBTable2: TIBTable
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    IndexFieldNames = 'KOD_AVTOR'
    MasterFields = 'KOD_AVT'
    MasterSource = DataSource1
    Left = 708
    Top = 208
  end
  object IBTable3: TIBTable
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    IndexFieldNames = 'KOD_IZD'
    MasterFields = 'KOD_NAME'
    MasterSource = DataSource1
    Left = 708
    Top = 320
  end
  object IBTable4: TIBTable
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    FieldDefs = <
      item
        Name = 'KOD_IZD'
        DataType = ftInteger
      end
      item
        Name = 'NAME_IZD'
        DataType = ftString
        Size = 255
      end
      item
        Name = 'GOROD'
        DataType = ftString
        Size = 255
      end>
    IndexDefs = <
      item
        Name = 'RDB$PRIMARY16'
        Fields = 'KOD_IZD'
        Options = [ixPrimary, ixUnique]
      end>
    IndexFieldNames = 'KOD_IZD'
    MasterFields = 'KOD_IZD'
    MasterSource = DataSource2
    StoreDefs = True
    TableName = 'IZDATELI'
    Left = 708
    Top = 440
  end
  object IBQuery1: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    SQL.Strings = (
      
        'select KOD_AVTOR,FAMILIA,IMA,OTCHESTVO,TELIFON, AVTORI.GOROD,INN' +
        ',KONTACT,'
      '          NAME,TEMA,CENA,GONOR,DATA,'
      '          NAME_IZD,IZDATELI.GOROD'
      'from   AVTORI,IZDATELI,NAME,NAMEAV'
      
        'where (NAMEAV.KOD_AVT= AVTORI.KOD_AVTOR)and(NAMEAV.KOD_NAME=NAME' +
        '.Kod_NAZV)and(NAME.KOD_IZD=IZDATELI.KOD_IZD)'
      '')
    Left = 76
    Top = 504
  end
  object IBTable5: TIBTable
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    Left = 380
    Top = 472
  end
  object IBTable6: TIBTable
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    Left = 412
    Top = 472
  end
  object IBTable7: TIBTable
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    Left = 444
    Top = 472
  end
  object IBTable8: TIBTable
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    Left = 476
    Top = 472
  end
  object IBQuery2: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    SQL.Strings = (
      
        'insert into Avtori (KOD_AVTOR,FAMILIA,IMA,OTCHESTVO,TELIFON,GORO' +
        'D,INN,KONTACT)'
      ' values (:KOD,:I1,:I2,:I3,:I4,:I5,:I6,:I7)')
    Left = 12
    Top = 416
    ParamData = <
      item
        DataType = ftInteger
        Name = 'KOD'
        ParamType = ptInput
      end
      item
        DataType = ftUnknown
        Name = 'I1'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I2'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I3'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I4'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I5'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I6'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I7'
        ParamType = ptUnknown
      end>
  end
  object IBQuery3: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    Left = 44
    Top = 416
  end
  object IBQuery4: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    SQL.Strings = (
      'insert into IZDATELI (KOD_IZD,NAME_IZD,GOROD)'
      '   values (:KOD,:I1,:I2)')
    Left = 76
    Top = 416
    ParamData = <
      item
        DataType = ftInteger
        Name = 'KOD'
        ParamType = ptInput
      end
      item
        DataType = ftUnknown
        Name = 'I1'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I2'
        ParamType = ptUnknown
      end>
  end
  object IBQuery5: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    SQL.Strings = (
      'insert into NAME (KOD_NAZV,NAME,TEMA,KOD_IZD,CENA,GONOR,DATA)'
      '   values (:KOD,:I1,:I2,:I3,:I4,:I5,:I6)')
    Left = 108
    Top = 416
    ParamData = <
      item
        DataType = ftInteger
        Name = 'KOD'
        ParamType = ptInput
      end
      item
        DataType = ftUnknown
        Name = 'I1'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I2'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I3'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I4'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I5'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I6'
        ParamType = ptUnknown
      end>
  end
  object IBQuery6: TIBQuery
    Database = IBDatabase1
    Transaction = IBTransaction1
    BufferChunks = 1000
    CachedUpdates = False
    SQL.Strings = (
      'insert into NAMEAV (PORADOK_AVT,KOD_AVT,KOD_NAME)'
      '   values (:KOD,:I1,:I2)')
    Left = 140
    Top = 416
    ParamData = <
      item
        DataType = ftInteger
        Name = 'KOD'
        ParamType = ptInput
      end
      item
        DataType = ftUnknown
        Name = 'I1'
        ParamType = ptUnknown
      end
      item
        DataType = ftUnknown
        Name = 'I2'
        ParamType = ptUnknown
      end>
  end
  object IBStoredProc1: TIBStoredProc
    Database = IBDatabase1
    Transaction = IBTransaction1
    Left = 16
    Top = 448
  end
end
