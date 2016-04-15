#ifndef Unit1H
#define Unit1H
//------------------------------------------------------------------------------
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include "DynamicSkinForm.hpp"
#include "SkinData.hpp"
#include "SkinBoxCtrls.hpp"
#include "SkinCtrls.hpp"
#include <Mask.hpp>
#include <complex>
//------------------------------------------------------------------------------
using namespace std;
//--------------------------Класс TForm1----------------------------------------
class TForm1 : public TForm
{
__published:
        TspDynamicSkinForm *spDynamicSkinForm1;
        TspSkinData *spSkinData1;
        TspSkinStdLabel *spSkinStdLabel1;
        TspSkinEdit *spSkinEdit1;
        TspSkinStdLabel *spSkinStdLabel2;
        TspSkinEdit *spSkinEdit2;
        TspSkinGroupBox *spSkinGroupBox1;
        TspSkinButton *spSkinButton1;
        TspSkinButton *spSkinButton2;
        TspSkinEdit *spSkinEdit3;
        TspSkinStdLabel *spSkinStdLabel3;
        TspSkinButton *spSkinButton3;
        TspSkinEdit *spSkinEdit4;
        TspSkinStdLabel *spSkinStdLabel4;
        TspSkinStdLabel *spSkinStdLabel5;
        TspSkinEdit *spSkinEdit5;
        void __fastcall FormCreate(TObject *Sender);
        void __fastcall FORMSS(TObject *Sender, int &NewWidth,
                               int &NewHeight, bool &Resize);
        void __fastcall spSkinButton1Click(TObject *Sender);
        void __fastcall spSkinButton2Click(TObject *Sender);
        void __fastcall spSkinButton3Click(TObject *Sender);
public:
        __fastcall TForm1(TComponent* Owner);
        //---------------------Перегруженная функция №1-------------------------
        float FUNC1(int x,int y);
        float FUNC2(int x,int y);
        float FUNC3(int x,int y);
        //---------------------Перегруженная функция №2-------------------------
        double FUNC1(double x,double y);
        double FUNC2(double x,double y);
        double FUNC3(double x,double y);
        //---------------------Перегруженная функция №3-------------------------
        double FUNC1(complex <float> t);
        double FUNC2(complex <float> t);
        double FUNC3(complex <float> t);
        //----------------------Класс комплексных чисел-------------------------
        class COMP
           {
             private:
               complex <float> z;
               friend float TForm1::FUNC1(int x,int y);
               friend float TForm1::FUNC2(int x,int y);
               friend float TForm1::FUNC3(int x,int y);
               //---------------------------------------------------------------
               friend double TForm1::FUNC1(double x,double y);
               friend double TForm1::FUNC2(double x,double y);
               friend double TForm1::FUNC3(double x,double y);
               //---------------------------------------------------------------
               friend double TForm1::FUNC1(complex <float> t);
               friend double TForm1::FUNC2(complex <float> t);
               friend double TForm1::FUNC3(complex <float> t);
           };
        //----------------------Создаем экземпляр класса------------------------
        COMP CO1;
};
//------------------------------------------------------------------------------
extern PACKAGE TForm1 *Form1;
#endif



