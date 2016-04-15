#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <ComCtrls.hpp>
#include <ExtCtrls.hpp>
#include <Graphics.hpp>
#include <jpeg.hpp>
class TForm1 : public TForm
{
__published:	// IDE-managed Components
        TGroupBox *GroupBox1;
        TButton *Button1;
        TImage *Image1;
        TPageControl *PageControl1;
        TTabSheet *TabSheet1;
        TTabSheet *TabSheet2;
        TButton *Button2;
        TImage *Image2;
        TLabel *Label3;
        TGroupBox *GroupBox2;
        TLabel *Label1;
        TLabel *Label4;
        TLabel *Label2;
        TScrollBar *ScrollBar1;
        TGroupBox *GroupBox3;
        TLabel *Label5;
        TLabel *Label6;
        TLabel *Label7;
        TScrollBar *ScrollBar2;
        TButton *Button3;
        TButton *Button4;
        TButton *Button5;
        TButton *Button6;
        TButton *Button7;
        TImage *Image3;
        void __fastcall Button1Click(TObject *Sender);
        void __fastcall FormCreate(TObject *Sender);
        void __fastcall ScrollBar2Scroll(TObject *Sender,
          TScrollCode ScrollCode, int &ScrollPos);
        void __fastcall ScrollBar1Scroll(TObject *Sender,
          TScrollCode ScrollCode, int &ScrollPos);
        void __fastcall Button3Click(TObject *Sender);
        void __fastcall Button4Click(TObject *Sender);
        void __fastcall Button5Click(TObject *Sender);
        void __fastcall Button6Click(TObject *Sender);
        void __fastcall Button7Click(TObject *Sender);
        void __fastcall Button2Click(TObject *Sender);
        void __fastcall PageControl1Change(TObject *Sender);
private:	// User declarations
public:		// User declarations
        __fastcall TForm1(TComponent* Owner);
        void VOROTA(TImage &im);
        void ZEML(TImage &im);
        void UROVEN(TImage &im,int u,int k, int code, int h);
        void TForm1::OTDEL1(TImage &im);
        bool SECTOR_FLAG; //false - движение вперед, true - назад
        bool ZATVOR1,ZATVOR2,ZATVOR3,ZATVOR4,ZATVOR1_OPEN,ZATVOR2_OPEN,
             ZATVOR3_OPEN;
        int SECTOR;  //Сектор, в котором находится корабль
};
extern PACKAGE TForm1 *Form1;

