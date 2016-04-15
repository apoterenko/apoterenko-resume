#include "afxwin.h" 
#include "resource.h" 
//////////////////////////////////////////////////////////////////////////////
class CDialog_LAB1 : public CDialog
{
   public:
   	   CDialog_LAB1(CWnd* pParent = NULL);  
	   enum 
	   { 
		 IDD = IDD_DIALOG1 //идентификатор диалога
	   };
	protected:
	   virtual void DoDataExchange(CDataExchange* pDX);    
	   DECLARE_MESSAGE_MAP(); //Таблица событий
};
