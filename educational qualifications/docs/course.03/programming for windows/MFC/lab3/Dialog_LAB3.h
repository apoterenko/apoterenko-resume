#include "afxwin.h" 
#include "resource.h" 
//////////////////////////////////////////////////////////////////////////////
class CDialog_LAB3 : public CDialog
{
   public:
   	   CDialog_LAB3(CWnd* pParent = NULL);  
	   enum 
	   { 
		 IDD = IDD_DIALOG1 //идентификатор диалога
	   };
	protected:
	   virtual void DoDataExchange(CDataExchange* pDX);    
	   DECLARE_MESSAGE_MAP(); //Таблица событий
};
