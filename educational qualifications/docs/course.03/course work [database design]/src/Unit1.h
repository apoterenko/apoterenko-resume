/////////////////////////////////OK/////////////////////////////////////////////
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <ComCtrls.hpp>
#include <Menus.hpp>
#include <Buttons.hpp>
#include <ExtCtrls.hpp>
#include <ImgList.hpp>
#include <ADODB.hpp>
#include <DB.hpp>
#include <DBGrids.hpp>
#include <Grids.hpp>
#include <stdio.h>
class TForm1 : public TForm
{
__published:	// IDE-managed Components
        TStatusBar *StatusBar1;
        TGroupBox *GroupBox1;
        TButton *Button1;
        TGroupBox *GroupBox2;
        TBitBtn *BitBtn1;
        TGroupBox *GroupBox3;
        TButton *Button2;
        TButton *Button5;
        TButton *Button6;
        TButton *Button3;
        TButton *Button4;
        TBitBtn *BitBtn2;
        TBitBtn *BitBtn3;
        TBitBtn *BitBtn4;
        TButton *Button9;
        TBitBtn *BitBtn5;
        TBitBtn *BitBtn6;
        TBitBtn *BitBtn7;
        TBitBtn *BitBtn8;
        TImageList *ImageList1;
        TBitBtn *BitBtn9;
        TTreeView *TreeView1;
        void __fastcall FormCreate(TObject *Sender);
        void __fastcall Button2Click(TObject *Sender);
        void __fastcall Button6Click(TObject *Sender);
        void __fastcall Button3Click(TObject *Sender);
        void __fastcall Button4Click(TObject *Sender);
        void __fastcall CHANGE(TObject *Sender, int &NewWidth,
          int &NewHeight, bool &Resize);
        void __fastcall Button9Click(TObject *Sender);
        void __fastcall Button5Click(TObject *Sender);
        void __fastcall BitBtn5Click(TObject *Sender);
        void __fastcall BitBtn8Click(TObject *Sender);
        void __fastcall BitBtn3Click(TObject *Sender);
        void __fastcall BitBtn1Click(TObject *Sender);
        void __fastcall BitBtn4Click(TObject *Sender);
        void __fastcall Button1Click(TObject *Sender);
        void __fastcall TREEMOUSE(TObject *Sender, TMouseButton Button,
          TShiftState Shift, int X, int Y);
        void __fastcall TREEKEY(TObject *Sender, WORD &Key,
          TShiftState Shift);
        void __fastcall BitBtn2Click(TObject *Sender);
        void __fastcall BitBtn9Click(TObject *Sender);
        void __fastcall BitBtn7Click(TObject *Sender);
        void __fastcall BitBtn6Click(TObject *Sender);
        void __fastcall TreeView1Collapsing(TObject *Sender,
          TTreeNode *Node, bool &AllowCollapse);
        void __fastcall TreeView1Expanding(TObject *Sender,
          TTreeNode *Node, bool &AllowExpansion);
        void __fastcall FormClose(TObject *Sender, TCloseAction &Action);
private:	// User declarations
public:		// User declarations
        __fastcall TForm1(TComponent* Owner);
        /////////////////////////////Структура, описывающая окна////////////////
        TForm *FORMES; //Указатель на окна
        struct OKN_SP
             {
               HWND HAND; //Идентификатор окна
               OKN_SP * NEXT;
             };
        OKN_SP * FIRST, * worker, * buf ;
        void CLEARWINDOW();  //Закрытие всех окон пользователя
/////////////////////////Описание класса////////////////////////////////////////
class TABL_CLASS
 {
   private:
      ///////////////////////Структура №1 таблиц БД/////////////////////////////
      struct STRTAB1
       {
        unsigned int COD; //Порядковый номер записи
        unsigned int COD_TOVAR2;//Указатель на таблицу STRTAB2::COD
        unsigned int COD_TOVAR3; //Указатель на таблицу STRTAB3::COD
        unsigned int COD_TOVAR4; //Указатель на таблицу STRTAB4::COD
        unsigned int COD_TOVAR5; //Указатель на таблицу STRTAB5::COD
        float ROZN;
        float ZAK;
        char DATA[11];   //Массив для хранения даты типа 01.01.1998
        char DATA_SKLAD[11];  //Массив для хранения даты типа 01.01.1998
        unsigned int NAKL; //Номер накладной
        unsigned int NUM; //Серийный номер - уникальный номер
       };
      ////////////////////Структура №2 таблиц БД - категории////////////////////
      struct STRTAB2
       {
        unsigned int COD; //Порядковый номер записи
        char NAME[256];   //255 байт - уникальное поле
       };
      ////////////////////Структура №3 таблиц БД - фирмы////////////////////////
      struct STRTAB3
       {
        unsigned int COD; //Порядковый номер записи
        char NAME[256];   //255 байт
       };
      ////////////////////Структура №4 таблиц БД - склады///////////////////////
      struct STRTAB4
       {
        unsigned int COD; //Порядковый номер записи
        char NAME[256];   //255 байт
       };
      ////////////////////Структура №4 таблиц БД - экземпляр////////////////////
      struct STRTAB5
       {
        unsigned int COD; //Порядковый номер записи
        char NAME[256];   //255 байт
       };
      ////////////////////Структуры для построения дерева///////////////////////
      struct MARK
       {
        int m;
        MARK * NEXT;
       };
      struct KATEGOR
       {
        int k;
        KATEGOR * NEXT;
        MARK * NEXTMARK;
       };
      struct KOREN
       {
        int k;
        KOREN * NEXTKOR;
        KATEGOR * NEXTKAT;
       };
      /////////////////////Указатели на структуры данных////////////////////////
      KOREN *PK,*PKFIRST, *BUFER3;
      KATEGOR *PKO, *BUFER2;
      MARK *PM, *BUFER1;
      ///////////////////////Для открытия в отдельном окне//////////////////////
      struct INDEXTREE
       {
        int m;
        INDEXTREE * NEXT;
       };
      INDEXTREE *PI,*PIFIRST, *BUF;
      TTreeNode * TN1;
      ///////////////////Денежный оборот////////////////////////////////////////
      int NDS;
      float DOLLAR;
   public:
      TADOConnection *ADOC; //Для соединения с БД
      TADOConnection *ADOCI; //Для соединения с БД (импортируемой)
      /////////////////////////Таблица БД///////////////////////////////////////
      TADOTable *ADOT1;     //STRTAB1
      TADOTable *ADOT2;     //STRTAB2
      TADOTable *ADOT3;     //STRTAB3
      TADOTable *ADOT4;     //STRTAB4
      TADOTable *ADOT5;     //STRTAB5
      TADOTable *ADOI;      //BAZA
      /////////////////////////Таблица Накладных////////////////////////////////
      TADOTable *RASH;
      TADOTable *PRIH;     
      TADOTable *PERM;
      //////////////////////Методы класса///////////////////////////////////////
      void NOTCONNECT(); //Отсоединяемся от БД
      boolean CONNECT(AnsiString Z); //Метод соединения с БД - true - значит ОК
                                     //Z-псевдоним
      boolean TABLE_ACTIV(); //Метод создает ADOTAble для работы с таблицами
      void PROC_KATEGOR_ADD(TListBox * LIST, TADOTable * ADOPROC); //Добавляем в файл категории
      void PROC_COMBO_READ(TComboBox *CB, TADOTable *ADOTAB);  //Читаем из файлов в "Приобретение товара"
      /////////////////Добавляем запись о новом товаре//////////////////////////
      boolean WRITE_STRTAB1(int CT2, int CT3, int CT4, int CT5,
                         int ROZN, int ZAK, int NAKL, int NUM,
                         AnsiString DATA, AnsiString DATA_SKLAD); 
      int FUNC_STRING_IN_INT(AnsiString S, TADOTable * ADO); //Возвращение кода по имени
      void PROC_DEREVO(TADOTable * ADOTAB, TADOTable * ADOTAB1); //Строим дерево из таблицы №1
      void PROC_DEREVO_DELETE(); //Удаляем дерево после использования
      AnsiString FUNC_INT_IN_STRING(int i, TADOTable * ADO); //По имени - код
      void TREE_VIEW(TTreeView * TV);  //Просмотр товаров во всех складах
      int SET_TREE_WINDWOW(TTreeView *TV, TTreeNode * TN1); //Выводит товары конкретного склада
      void ADDINDEX(int j);  //Добавляет в список чисел для отображения их в окне
      void DELETEINDEX(); //Удаляет список чисел для отображения
      AnsiString TABL_CLASS::GETSKLAD(int j); //Возвращение номера склада
      TTreeNode * GETTREENODE(); //Возвращает указатель на TN1
      void SETTREENODE(); //Необходимо для TN1=NULL при повторном открытии
      int GETABSOLUTINDEX(TTreeNode * TNODE); //Возвращает абсолютный текущий индекс в дереве
      void SETINDEXTREE(TTreeView *TV); //Устанавливает список всех выбранных узлов
      void FIND(TEdit *S1,TEdit *S2,TEdit *S3,TEdit *S4,
                TEdit *S5,TEdit *S6,TEdit *S7,TEdit *S8,
                TEdit *S9,TEdit *S10); //Поиск товара
      void CHANGESKLAD(TEdit *S1,TEdit *S2,TEdit *S3,TComboBox *CB); //Перемещение товара на другой склад
      void DELETETOVAR(TEdit * ED1);
      ///////////////////Методы накладных///////////////////////////////////////
      void NAKLPERM(int NUM, AnsiString S1);  //S1=склад получатель
      void NAKLPRIH(int NUM, AnsiString S1, AnsiString S2, AnsiString S3,
                    float DOLLAR, int NDS,  float ZAK);
      void NAKLRASH(int NUM, float DOLLAR, int NDS);
      ///////////////////////Отчеты/////////////////////////////////////////////
      void OTCHET_PRODAGA(AnsiString S, AnsiString KAT);
      void OTCHET_PRODAGA_ONE(AnsiString S, AnsiString S1);
      void FILESS(FILE * files, AnsiString BD, AnsiString BUFER);
      void LINIA(FILE * files);
      void MESSAGES(FILE * files, AnsiString MES);
      void OTCHET_KATEGOR(AnsiString S, AnsiString KAT);
      void OTCHET_ZAGOLOVOK(FILE * files, AnsiString S);
      /////////////////////Отчет о перемещении товара///////////////////////////
      void OTCHET_PERM(AnsiString S, int NUM);
      //////////////////////Отчет о покупке товара//////////////////////////////
      void OTCHET_POKUPKA_ONE(AnsiString S, AnsiString C);
      void OTCHET_POKUPKA(AnsiString S, AnsiString C);
      void OTCHET_POK_KATEGOR(AnsiString S, AnsiString C);
      ////////////////////Для работы с налогами/////////////////////////////////
      float PROC_DOLLAR();
      int PROC_NDS();
      boolean SETNDSDOLLAR(AnsiString DOL, AnsiString ND);
      //////////////////////Импорт БД///////////////////////////////////////////
      void IMPORT(TEdit *Edi);
 };
//////////////////////Экземпляр класса//////////////////////////////////////////
TABL_CLASS TBL;
};
extern PACKAGE TForm1 *Form1;

