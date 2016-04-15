//////////////////////////////////////////////////////////////////////////
//
//              Окончательная версия ЛР №3 по MFC
//              Автор: Потеренко А.Г. ВТ-31 2006г.
//              Дата завершения: 8.03.2006г.
//
//////////////////////////////////////////////////////////////////////////
#include "afxwin.h" 
#include "math.h "
#include "resource.h" 
#include "Dialog_LAB3.h"
//////////////////////////////////////////////////////////////////////////
#define MAX_PLOSHAD_B 1000 //Максимальная высота виртуального окна
#define MAX_PLOSHAD_A 200  //Максимальная длина виртуального окна
//////////////////////////////////////////////////////////////////////////
/////////////////////////Глобальные переменные////////////////////////////
//////////////////////////////////////////////////////////////////////////
int pos_y,pos_x;                       //дискретные положения ползунков
int max_x,max_y;                       //max диапазона прокрутки
int min;                               //min диапазона прокрутки
int x_BUF,y_BUF,a,b,delta_y,delta_x;   //вычисление глобальной нулевой точки				
//////////////////////////////////////////////////////////////////////////
//////////////CPaintDC - класс контекста устройства///////////////////////
//////////////////////////////////////////////////////////////////////////
class CPaintDC_LAB3: public CPaintDC
{
    public:
	  //////////////////Конструктор///////////////////////////////////////
      CPaintDC_LAB3(CWnd* pWnd) : CPaintDC(pWnd)
	  {}
	  /////////////////Рисование на поверхности окна//////////////////////
      void DRAW_LAB3()
	  {
        	int p=0;
            CPen cp;
            CBrush hBr;
            LOGBRUSH lb;
			//////////////////////////////////////////////////////////////
	   	    lb.lbColor=RGB(200,100,10);
            lb.lbStyle=BS_SOLID;
            lb.lbHatch=NULL;
			//////////////////////////Фон закраски////////////////////////
			hBr.CreateBrushIndirect(&lb);
		    SelectObject(hBr);
            //////////////////////////////////////////////////////////////
	        cp.CreatePen(NULL,3,RGB(10,78,90));
 	        SelectObject(cp);
	        Arc(-x_BUF+10,-y_BUF+10,-x_BUF+50,-y_BUF+150,p,p,p,p);
			cp.DeleteObject();
			//////////////////////////////////////////////////////////////
	        cp.CreatePen(NULL,8,RGB(100,178,90));
 	        SelectObject(cp);
	        Arc(-x_BUF+100,-y_BUF+100,-x_BUF+150,-y_BUF+150,p,p,p,p);
			cp.DeleteObject();
            //////////////////////////////////////////////////////////////
		    cp.CreatePen(NULL,2,RGB(1,240,90));
 	        SelectObject(cp);
	        Arc(-x_BUF+100,-y_BUF+300,-x_BUF+150,-y_BUF+350,170,170,10,600);
			cp.DeleteObject(); 
			//////////////////////////////////////////////////////////////
		    cp.CreatePen(NULL,3,RGB(200,178,90));
 	        SelectObject(cp);
	        Rectangle(-x_BUF+300,-y_BUF+100,-x_BUF+350,-y_BUF+150);
			cp.DeleteObject();
            //////////////////////////////////////////////////////////////
		    cp.CreatePen(PS_DASHDOT,1,RGB(255,1,255));
 	        SelectObject(cp);
	        Rectangle(-x_BUF+400,-y_BUF+200,-x_BUF+450,-y_BUF+250);
			cp.DeleteObject();
            //////////////////////////////////////////////////////////////
		    cp.CreatePen(PS_DASHDOTDOT,1,RGB(25,1,255));
 	        SelectObject(cp);
	        MoveTo(-x_BUF+0,-y_BUF+0);
            LineTo(-x_BUF+800,-y_BUF+200);
			cp.DeleteObject();
	  }
};
//////////////////////////////////////////////////////////////////////////
/////CFrameWnd - класс обеспечивает функциональные возможности окон/////// 
////////////////////интерфейсом документа (SDI)///////////////////////////
class CFrameWnd_LAB3 : public CFrameWnd
{
   private:
     bool flag;
   public:
	CMenu Menu_LAB3; //Меню для окна
	///////////////////////////////Конструктор////////////////////////////
 	CFrameWnd_LAB3()
	{
        flag=false;
		Create(
			   NULL,
			   "Лабораторная работа №3",
			   WS_OVERLAPPEDWINDOW | WS_HSCROLL	| WS_VSCROLL,
			   rectDefault,
		       NULL,
			   NULL
			  );
		Menu_LAB3.LoadMenu(IDR_MENU1);
        SetMenu(&Menu_LAB3);
	};
	//////////////////////////////////////////////////////////////////////
    void LAB3_MENU_FUNC1()
	{
		flag=true;       
		InvalidateRect(NULL,true);      
		UpdateWindow();
	};
	//////////////////////////////////////////////////////////////////////
    void LAB3_MENU_FUNC2()
	{
	    CDialog_LAB3 D;
	    D.DoModal();	
	};
    //////////////////////////////////////////////////////////////////////
	void LAB3_MENU_FUNC3()
	{
	  	DestroyWindow();
	};
	//////////////////////////////////////////////////////////////////////
    void OnPaint()
	{
       CPaintDC_LAB3 dc(this);
       CBrush brush(GetSysColor(COLOR_3DDKSHADOW));
       CRect REC;
       GetClientRect(REC);
       dc.FillRect(REC, &brush);
       if (flag==true)
         	dc.DRAW_LAB3(); 
	};
	//////////////////////////////////////////////////////////////////////
	int OnCreate( LPCREATESTRUCT lpCreateStruct )
	{ 
		   //////////Устанавливаем диапазон прокрутки////////////
           max_x=100; 
		   max_y=max_x;
           min=0;     
           SetScrollRange(SB_VERT,min,max_y,TRUE);
		   SetScrollRange(SB_HORZ,min,max_x,TRUE);
           SetScrollPos (SB_VERT,0,TRUE); 
           ///////////Дополнительные переменные//////////////////
		   y_BUF=0;
		   x_BUF=0;
		   a=MAX_PLOSHAD_A;        //длина области прокручивания 
		   b=MAX_PLOSHAD_B;        //высота области прокручивания 
		   delta_y=10;   //отступ текста сверху
		   delta_x=10;   //отступ текста слева
		   return 0;
	}
	//////////////////////////////////////////////////////////////////////
	void OnSize( UINT nType, int cx, int cy)
	{
	   if (cx>0 && cy>0)
		   {
             b=ceil((768/cy)*MAX_PLOSHAD_B);  //768 - разрешение по вертикали окна
		     a=ceil((1024/cy)*MAX_PLOSHAD_A); //1024 - разрешение по горизонтали окна
		   }
	}
	//////////////////////////////////////////////////////////////////////
	void OnVScroll(UINT nSBCode, UINT nPos, CScrollBar* pScrollBar)
	{
       switch(nSBCode)
		   {
              case SB_LINEUP:
			     //////////////Перемещаем ползунок///////////////
                 if (pos_y>min)
				 {
                   pos_y=pos_y-1;
				   SetScrollPos(SB_VERT,pos_y,TRUE);
				   y_BUF=ceil(pos_y*(b/max_y)); //вычисляем глобальную точку (x_BUF,y_BUF)
				 }
                 break; 
			  case SB_LINEDOWN:
				  if (pos_y<max_y)
				 {
                   pos_y=pos_y+1;
				   SetScrollPos(SB_VERT,pos_y,TRUE);
				   y_BUF=ceil(pos_y*(b/max_y)); //вычисляем глобальную точку (x_BUF,y_BUF)
				 }
                 break; 
			  case SB_THUMBTRACK:  //Пользователь передвигает ползунок
				  pos_y=nPos;
				  SetScrollPos(SB_VERT,pos_y,TRUE);
                  y_BUF=ceil(pos_y*(b/max_y));
			  default:
				 break;
		   };
	       //Заставляем окно обновиться//////////////////////////
		   InvalidateRect(NULL,true);
           UpdateWindow();
	}
	//////////////////////////////////////////////////////////////////////
	void OnHScroll(UINT nSBCode, UINT nPos, CScrollBar* pScrollBar)
	{
       switch(nSBCode)
		   {
              case SB_LINEUP:
			     //////////////Перемещаем ползунок///////////////
                 if (pos_x>min)
				 {
                   pos_x=pos_x-1;
				   SetScrollPos(SB_HORZ,pos_x,TRUE);
				   x_BUF=ceil(pos_x*(a/max_x)); //вычисляем глобальную точку (x_BUF,y_BUF)
				 }
                 break; 
			  case SB_LINEDOWN:
				 if (pos_x<max_x)
				 {
                   pos_x=pos_x+1;
				   SetScrollPos(SB_HORZ,pos_x,TRUE);
				   x_BUF=ceil(pos_x*(a/max_x)); //вычисляем глобальную точку (x_BUF,y_BUF)
				 }
                 break; 
			  case SB_THUMBTRACK:  //Пользователь передвигает ползунок
				 pos_x=nPos;
				 SetScrollPos(SB_HORZ,pos_x,TRUE);
                 x_BUF=ceil(pos_x*(a/max_x));
			  default:
				 break;
		   };
	       ////////////Заставляем окно обновиться/////////////////////////
		   InvalidateRect(NULL,true);
           UpdateWindow();
	}
   private:
	DECLARE_MESSAGE_MAP();
};
//////////////////////////////////////////////////////////////////////////
/////////////////////////////Карта сообщений//////////////////////////////
//////////////////////////////////////////////////////////////////////////
BEGIN_MESSAGE_MAP(CFrameWnd_LAB3, CFrameWnd)
    ON_WM_PAINT()
	ON_COMMAND(ID_MENUITEM40001,LAB3_MENU_FUNC2)
	ON_COMMAND(ID_MENUITEM40002,LAB3_MENU_FUNC1)
    ON_COMMAND(ID_MENUITEM40003,LAB3_MENU_FUNC3)
    ON_WM_VSCROLL()
	ON_WM_HSCROLL()
	ON_WM_CREATE()
	ON_WM_SIZE()
END_MESSAGE_MAP()
//////////////////////////////////////////////////////////////////////////
//CWinApp класс - класс из которого получается объект приложения окна/////
//////////////////////////////////////////////////////////////////////////
class CWinApp_LAB3 : public CWinApp
{
  public:
    //////////////////////////////////////////////////////////////////////
	CWinApp_LAB3()
	{};
	//////////////////////////////////////////////////////////////////////
	virtual BOOL InitInstance()
	{
       	m_pMainWnd=new CFrameWnd_LAB3();	
	    ASSERT(m_pMainWnd);
 	    m_pMainWnd->ShowWindow(SW_SHOW);
	    m_pMainWnd->UpdateWindow();	
	    return TRUE;
	}
};
///////////////////////////////////////////////////////////////////////////
CWinApp_LAB3 theApp; //Создаем глобальный объект приложения	
