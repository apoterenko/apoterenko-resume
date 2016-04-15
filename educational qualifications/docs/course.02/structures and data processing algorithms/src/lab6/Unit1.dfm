object Form1: TForm1
  Left = 223
  Top = 117
  BorderStyle = bsDialog
  Caption = 
    #1051#1072#1073#1086#1088#1072#1090#1086#1088#1085#1072#1103' '#1088#1072#1073#1086#1090#1072' '#8470'6 '#1087#1086' '#1072#1083#1075#1086#1088#1080#1090#1084#1072#1084' ('#1042#1058'-21, 2005, '#1055#1086#1090#1077#1088#1077#1085#1082#1086' '#1040'.'#1043 +
    '.)'
  ClientHeight = 450
  ClientWidth = 785
  Color = clInactiveBorder
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 13
  object PageControl1: TPageControl
    Left = 0
    Top = 0
    Width = 785
    Height = 449
    ActivePage = TabSheet1
    TabIndex = 0
    TabOrder = 0
    object TabSheet1: TTabSheet
      Caption = 'TabSheet1'
    end
    object TabSheet2: TTabSheet
      Caption = 'TabSheet2'
      ImageIndex = 1
    end
    object TabSheet3: TTabSheet
      Caption = 'TabSheet3'
      ImageIndex = 2
    end
  end
  object ActionList1: TActionList
    Left = 728
    Top = 424
    object Action1: TAction
      Caption = #1052#1077#1090#1086#1076' '#1087#1091#1079#1099#1088#1100#1082#1072
      OnExecute = BEGIN1
    end
    object Action2: TAction
      Caption = #1053#1077#1088#1077#1082#1091#1088#1089#1080#1074#1085#1072#1103' '#1074#1077#1088#1089#1080#1103' Quicksort'
      OnExecute = BEGIN2
    end
    object Action3: TAction
      Caption = #1057#1075#1077#1085#1077#1088#1080#1088#1086#1074#1072#1090#1100' '#1084#1072#1089#1089#1080#1074
      OnExecute = BEGIN3
    end
    object Action4: TAction
      Caption = #1042#1088#1077#1084#1103
      OnExecute = BEGIN4_VR
    end
    object Action5: TAction
      Caption = #1042#1088#1077#1084#1103
      OnExecute = BEGIN5_VR
    end
    object Action6: TAction
      Caption = #1057#1088#1072#1074#1085#1077#1085#1080#1103
      OnExecute = BEGIN6_PER
    end
    object Action7: TAction
      Caption = #1057#1088#1072#1074#1085#1077#1085#1080#1103
      OnExecute = BEGIN7_PER
    end
  end
end
