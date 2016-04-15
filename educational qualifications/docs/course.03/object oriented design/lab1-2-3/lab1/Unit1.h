//---------------------------------------------------------------------------
#include <Forms.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Classes.hpp>
//---------------------------------------------------------------------------
class TForm1 : public TForm
{
   __published:
        TButton *Button1;
        void __fastcall Button1Click(TObject *Sender);
     public:
        __fastcall TForm1(TComponent* Owner);
};


