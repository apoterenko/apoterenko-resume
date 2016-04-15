#include "Dialog_LAB5.h"
//////////////////////////////////////////////////////////////////////////////
CDialog_LAB5::CDialog_LAB5(CWnd* pParent) : CDialog(CDialog_LAB5::IDD, pParent)
{}
//////////////////////////////////////////////////////////////////////////////
void CDialog_LAB5::DoDataExchange(CDataExchange* pDX)
{
 ButtonS = new CBUTTONS;
 ButtonS->Create("",
			      WS_CHILD | WS_VISIBLE | BS_OWNERDRAW,
				  CRect(325,55,455,105),this,BUTO1);
 ButtonS->REG();
}
//////////////////////////////////////////////////////////////////////////////
BEGIN_MESSAGE_MAP(CDialog_LAB5, CDialog)
	//{{AFX_MSG_MAP(CDialog_LAB1)
	//}}AFX_MSG_MAP
	ON_WM_DRAWITEM()
	ON_BN_CLICKED(BUTO1,EXIT)
END_MESSAGE_MAP()
