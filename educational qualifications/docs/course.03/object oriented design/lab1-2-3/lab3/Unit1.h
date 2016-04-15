//------------------------------------OK----------------------------------------
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include "SkinCtrls.hpp"
#include "SkinData.hpp"
#include "SkinBoxCtrls.hpp"
#include <Mask.hpp>
#include <ComCtrls.hpp>
#include "SkinTabs.hpp"
#include "DynamicSkinForm.hpp"
//------------------------------------------------------------------------------
//-----------------------Класс ВЕКТОР-------------------------------------------
//------------------------------------------------------------------------------
const CONSTT=10;
class VECTOR
   {
     public:
        //----------------Конструктор по умолчанию с параметром-----------------
        VECTOR (int=CONSTT); //CONSTT - число элементов в векторе "по умолчанию"
        //------------Конструктор копирования-----------------------------------
        VECTOR::VECTOR(const VECTOR &V);
        //----------------------------Деструктор--------------------------------
        VECTOR::~VECTOR();
        //----------------------------------------------------------------------
        float show(int i); //Процедура показа элементов вектора
        //---------Процедура создания динамического массива---------------------
        void PROCPOLE(int i); //i - порядок вектора
        //--------------Показываем порядок вектора------------------------------
        int SHOWPOLE();
        //-----------------Изменение pole---------------------------------------
        void POLES(int i);
     private:
        int pole; //pole - порядок вектора
        float *vect; //vect - указатель на вещественный тип
   };
//------------------------------------------------------------------------------
//-----------------------Класс МАТРИЦА------------------------------------------
//------------------------------------------------------------------------------
class MATRICA
   {
     public:
        //----------------Конструктор по умолчанию с параметром-----------------
        MATRICA (int = CONSTT);//CONSTT-число элементов в векторе "по умолчанию"
        //------------Конструктор копирования-----------------------------------
        MATRICA::MATRICA(const MATRICA &M);
        //----------------------------Деструктор--------------------------------
        MATRICA::~MATRICA();
        //----------------------------------------------------------------------
        float show(int i, int j); //Процедура показа элементов матрицы
        //---------Процедура создания динамической матрицы----------------------
        void PROCPOLE(int i); //i - порядок матрицы
        //--------------Показываем порядок матрицы------------------------------
        int SHOWPOLE();
        //-----------------Изменение pole---------------------------------------
        void POLES(int i);
     private:
        int pole; //pole - порядок матрицы
        float **matr; //matr - указатель на вещественный тип
   };
//------------------------------------------------------------------------------
//-----------------------Класс Результат----------------------------------------
//------------------------------------------------------------------------------
class CLASSVECTORS
  {
    private:
     int pole; //pole - порядок вектора
     float *VECTORS; //Здесь хранится результат умножения вектора и матрицы
    public:
     //--------------------Конструктор по умолчанию с параметром----------------
     CLASSVECTORS (int = CONSTT); //CONSTT - число элементов "по умолчанию"
     //-------------------------------Деструктор--------------------------------
     CLASSVECTORS::~CLASSVECTORS();
     //-------------Обращение к элементам вектора-------------------------------
     float show(int k);  //Показываем значение поля
     void POLE(int k, int SUM); //Заносим новое значение в вектор
     //------------Процедура создания динамического массива---------------------
     void PROCPOLE(int i); //i - порядок вектора
     //-----------------Показываем порядок вектора------------------------------
     int SHOWPOLE();
     //-----------------Изменение pole------------------------------------------
     void POLES(int i);
     //---------------Оператор присваивания-------------------------------------
     CLASSVECTORS operator =(float *M)
       {
          for (int i=0;i<CLASSVECTORS::SHOWPOLE();i++)
           {
             CLASSVECTORS::POLE(i,M[i]);
           };
       }
  };
//------------------------------------------------------------------------------
class TForm1 : public TForm
{
__published:	// IDE-managed Components
        TspDynamicSkinForm *spDynamicSkinForm1;
        TspSkinData *spSkinData1;
        TspSkinGroupBox *spSkinGroupBox1;
        TspSkinPageControl *spSkinPageControl1;
        TspSkinTabSheet *spSkinTabSheet1;
        TspSkinTabSheet *spSkinTabSheet2;
        TspSkinTabSheet *spSkinTabSheet4;
        TspSkinStdLabel *spSkinStdLabel1;
        TMemo *Memo1;
        TspSkinStdLabel *spSkinStdLabel3;
        TMemo *Memo3;
        TspSkinStdLabel *spSkinStdLabel2;
        TspSkinEdit *spSkinEdit2;
        TMemo *Memo2;
        TspSkinButton *spSkinButton1;
        TMemo *Memo4;
        TMemo *Memo5;
        void __fastcall FormCreate(TObject *Sender);
        void __fastcall spSkinButton1Click(TObject *Sender);
        void __fastcall FORMRES(TObject *Sender, int &NewWidth,
          int &NewHeight, bool &Resize);
private:	// User declarations
public:		// User declarations
        __fastcall TForm1(TComponent* Owner);
};
//------------------------------------------------------------------------------
extern PACKAGE TForm1 *Form1;
//------------------------------------------------------------------------------
