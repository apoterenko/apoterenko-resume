#include "afxwin.h" 
#include "resource.h" 
#define BUTO1         107  //Идентификатор овальной кнопки
//////////////////////////////////////////////////////////////////////////
///////////////////////////Класс овальной кнопки//////////////////////////
//////////////////////////////////////////////////////////////////////////
class CBUTTONS : public CButton
{
  private:
	 CDC * hdcc;
	 HRGN hRgn;
	 CRgn * hp; 
  public:
     //////////////////Регестрируем регион////////////////////////////////
 	 void REG()
	 {
       hp = new CRgn;
	   hp->CreateEllipticRgn(0,0,130,50); //Юзер попадает только внутрь
	   hRgn = hp->operator HRGN();
	   SetWindowRgn(hRgn,true);
	 };
     //////////////Рисуем изменение изображения овальной кнопки///////////
     void BUTTON_DRAW(bool FLAG)
	 {		        
	   hdcc = new CDC;
	   hdcc = GetDC();
	   char * S="Cancel";
		 if (FLAG) 
		{
		 /////////////////////////////////////////////////////////////////	 
		 hdcc->Ellipse(0,0,130,50);
	     hdcc->Ellipse(30,13,100,37); 
         hdcc->SetBkColor(RGB(255,255,255)); 
         hdcc->TextOut(42,17,S,strlen(S));
		}
		else
		{
	     hdcc->Ellipse(20,10,110,40);
         hdcc->SetBkColor(RGB(255,255,255)); 
	     hdcc->SetTextColor(RGB(200,200,200));
         hdcc->TextOut(42,17,S,strlen(S));
		}
	 }
};
//////////////////////////////////////////////////////////////////////////
///////////////////////////Класс диалога//////////////////////////////////
//////////////////////////////////////////////////////////////////////////
class CDialog_LAB5 : public CDialog
{
   public:
	   CBUTTONS * ButtonS;
   	   CDialog_LAB5(CWnd* pParent = NULL);  
	   enum 
	   { 
		 IDD = IDD_DIALOG1 //идентификатор диалога
	   };	
	   ////////////////////Выход при нажатии овальной кнопки//////////////
	   void EXIT()
	   {
	      EndDialog(0);
	   };
       //////////////Перерисовка кнопки - сообщение///////////////////////
  	   afx_msg void OnDrawItem(int nIDCtl, LPDRAWITEMSTRUCT lb)
	   {
	    if (nIDCtl==BUTO1)
		{
         if (lb->itemState & ODS_SELECTED) 
			    ButtonS->BUTTON_DRAW(false);
		 else
                ButtonS->BUTTON_DRAW(true);
		}
	   }
   protected:
	   virtual void DoDataExchange(CDataExchange* pDX);    
	   DECLARE_MESSAGE_MAP(); //Таблица событий
};
