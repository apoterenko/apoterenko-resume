#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <OleCtnrs.hpp>
#include <ExtCtrls.hpp>
////////////////////////////////////////////////////////////////////////////////
class KARTA
  {
    protected:
     bool FLAG; //Уничтожать при пасьянсе или нет
     TShape * SH;
     TLabel * LB;
     int ID;
    public:
     KARTA (TScrollBox * SC, int X1, int X2, int X3, int X4, int IDS, bool flag, TColor CO)
       {
         ID=IDS;
         FLAG=false;
         LB = new TLabel (NULL);
         LB->Left=X2+25;
         LB->Top=X1+25;
         LB->Caption=ID;
         LB->Color=clBtnShadow;
         LB->Parent=SC;
         ///////////////////////////////////////////////////////////////////////
         if (flag==false)
          {//При создании колоды нужно определить цвет - при пасьянсе - только вывод
           int m=random(2);
           SH = new TShape (NULL);
           if (m==0)
             SH->Brush->Color=clTeal;
           else
             SH->Brush->Color=clGrayText;
          }
         else
          {
             SH = new TShape (NULL);
             SH->Brush->Color=CO;
          };
         SH->Top=X1;
         SH->Left=X2;
         SH->Height=X3;
         SH->Width=X4;
         SH->Shape=stRoundRect;
         SH->Pen->Mode=pmXor;
         SH->Parent=SC;
       };
     TShape * SHOW1()
      {
       return SH;
      }
     TLabel * SHOW2()
      {
       return LB;
      };
     int SHOW3()
      {
       return ID;
      };
  };
////////////////////////////////////////////////////////////////////////////////
class KOLODA
  {
     ///////////////////////////////////////////////////////////////////////////
     protected:
       int YY;
       TScrollBox * SCROLL;
       struct STRUCT_KART
         {
           bool FLAG;
           TShape * SH;
           TLabel * LB;
           int ID;
           STRUCT_KART * NEXT;
         };
       STRUCT_KART * FIRST, * TEC, * BUF1, * BUF2, * BUF3;
     ///////////////////////////////////////////////////////////////////////////
     public:
      void VIEW(TScrollBox * S)
        {
          SCROLL=S;
          randomize();
          FIRST=NULL;
          TEC=NULL;
          /////////////////////Цикл создания всей колоды////////////////////////
          int TOP=10;
          int STET=1;
          for (int m=0;m<12;m++)
            {
               int LEFT=20;
               for (int n=0;n<3;n++)
                 {
                    if (FIRST==NULL)
                      {
                        FIRST=new(STRUCT_KART);
                        TEC=FIRST;
                        //clWhite - значение здесь не играет - он здесь не исп.
                        KARTA K(SCROLL,TOP,LEFT,89,65,STET,false,clWhite);
                        TEC->SH=K.SHOW1();
                        TEC->LB=K.SHOW2();
                        TEC->ID=K.SHOW3();
                        TEC->FLAG=false;
                        TEC->NEXT=NULL;
                      }
                    else
                      {
                        TEC->NEXT=new(STRUCT_KART);
                        TEC=TEC->NEXT;
                        KARTA K(SCROLL,TOP,LEFT,89,65,STET,false,clWhite);
                        TEC->SH=K.SHOW1();
                        TEC->LB=K.SHOW2();
                        TEC->ID=K.SHOW3();
                        TEC->FLAG=false;
                        TEC->NEXT=NULL;
                      };
                    LEFT=LEFT+80;
                    STET++;
                    for (int i=0;i<1000;i++)
                      for (int i=0;i<1000;i++)
                       {Application->ProcessMessages();};
                 }
               TOP=TOP+100;
            };
          YY=TOP;  //Запоминаем конечную высоту при выводе 36 карт
        };
  };
////////////////////////////////////////////////////////////////////////////////
class PASNS : public KOLODA
 {
   protected:
    TLabel * LAB;
   public:
     void RASKLAD (TScrollBox * S) //Раскладываем пасьянс
       {
         TColor COLORS1;
         TColor COLORS2;
         //////////////////Проходим 3 раз///////////////////////////////////////
         int TOP;
         for (int ZZ=0;ZZ<3;ZZ++)
         {
           ////////////////////Смотрим 3 крайние одного цвета///////////////////
           TEC=FIRST;
           while (TEC!=NULL)
              {
                bool fl=false; //узнать в конце 3 карты или 1 или 2
                int IDK=0;
                while (TEC!=NULL)
                  {
                    if (IDK==0) { BUF1=TEC; COLORS1=TEC->SH->Brush->Color; };
                    if (IDK==2) { BUF2=TEC; COLORS2=TEC->SH->Brush->Color; };
                    IDK++;
                    if (TEC==NULL && IDK==3) fl=true;
                    TEC=TEC->NEXT;
                    if (IDK==3) break;
                  }
                if (COLORS1==COLORS2)
                 {
                  ///////////////Помечаем для удаления//////////////////////////
                  BUF3=TEC;
                  TEC=BUF1;
                  TEC->FLAG=true;
                  TEC=BUF2;
                  TEC->FLAG=true;
                  TEC=BUF3;
                 };
              }
           /////////////////////Удаляем лишние//////////////////////////////////
           TEC=FIRST;
            while (TEC!=NULL)
              {
                if (TEC->FLAG==true)
                  {
                    if (TEC==FIRST)
                      {
                        //удаляемый элемент первый
                        FIRST=TEC->NEXT;
                        delete TEC;
                        TEC=FIRST;
                      }
                    else
                    {
                    if (TEC->NEXT==NULL)
                     {
                       //удаляемый элемент последний
                       delete TEC;
                       TEC=BUF2;
                       TEC->NEXT=NULL;
                     }
                    else
                     {
                       //удаляемый элемент ни первый, ни последний
                       BUF2->NEXT=TEC->NEXT;
                       delete TEC;
                       TEC=BUF2;
                     };
                    };
                  };
                BUF2=TEC; //указатель на предпоследний
                TEC=TEC->NEXT;
              };
           ///////////////////////Вывод/////////////////////////////////////////
           TOP=YY+20;
           LAB = new TLabel (NULL);
           LAB->Left=100;
           LAB->Top=TOP;
           LAB->Caption="Проход №";LAB->Caption=LAB->Caption+(ZZ+1);
           LAB->Parent=SCROLL;
           TOP=TOP+20;
           /////////////////////////////////////////////////////////////////////
           TEC=FIRST;
           while (TEC!=NULL)
            {
             int IDK=0;
             int LEFT=20;
             while (TEC!=NULL)
               {
                  KARTA K(SCROLL,TOP,LEFT,89,65,TEC->ID,true,TEC->SH->Brush->Color);
                  IDK++;
                  TEC=TEC->NEXT;
                  LEFT=LEFT+80;
                  if (IDK==3) break;
                  for (int i=0;i<1000;i++)
                      for (int i=0;i<1000;i++)
                       {Application->ProcessMessages();};
               };
             TOP=TOP+100;
            }
           YY=TOP;
         }
       };
 };
////////////////////////////////////////////////////////////////////////////////
class TForm1 : public TForm
{
__published:	// IDE-managed Components
        TButton *Button1;
        TButton *Button2;
        TScrollBox *ScrollBox1;
        void __fastcall Button2Click(TObject *Sender);
        void __fastcall Button1Click(TObject *Sender);
private:	// User declarations
public:		// User declarations
        __fastcall TForm1(TComponent* Owner);
        KOLODA KOL;
        PASNS PAS;
};
extern PACKAGE TForm1 *Form1;

