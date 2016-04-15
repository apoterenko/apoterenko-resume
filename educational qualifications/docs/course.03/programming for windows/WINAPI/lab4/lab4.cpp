//////////////////////////////////////////////////////////////////////////
//
//              Окончательная версия ЛР №4 по WinApi
//              Автор: Потеренко А.Г. ВТ-31 2006г.
//              Дата завершения: 5.03.2006г.
//
//////////////////////////////////////////////////////////////////////////
#include "stdafx.h"
#include "math.h "
#include "resource.h"
#include "COMMDLG.H"
#define MAX_LOADSTRING 100
#define MAX_PLOSHAD_B 500 //Максимальная высота виртуального окна
#define MAX_PLOSHAD_A 70  //Максимальная длина виртуального окна
//////////////////////////////////////////////////////////////////////////
/////////////////////////Глобальные переменные////////////////////////////
//////////////////////////////////////////////////////////////////////////
int pos_y,pos_x;                       //дискретные положения ползунков
int max_x,max_y;                       //max диапазона прокрутки
int min;                               //min диапазона прокрутки
int x_BUF,y_BUF,a,b,delta_y,delta_x;   //вычисление глобальной нулевой точки	
HWND hWnd;	         //Дескриптор окна
char * S;            //Путь к файлу BMP
HBITMAP hBitmap;     //Переменная для загрузки файла BMP
HWND child;          //Дескриптор дочернего окна
int FIGURA;          //Имеет значение 1,2,3 в зависимости от выбора пользователя
bool FLAG_OKNO;      //Не позволяем открыть пользователю больше одного окна
bool FLAG_FIGUR;     //Флаг отвечает за прорисовку
COLORREF CR;         //Цвет, который выбрал пользователь
HINSTANCE hInst;					   //Описатель экземпляра самой программы		
TCHAR szTitle[MAX_LOADSTRING];	       //Заголовок окна						
TCHAR szWindowClass[MAX_LOADSTRING];   //Указатель на зарегистрированное имя класса	
//////////////////////////////////////////////////////////////////////////
////////////////////Прототипы глобальных функций//////////////////////////
//////////////////////////////////////////////////////////////////////////
ATOM				LAB4_RegisterClass(HINSTANCE hInstance);
BOOL				InitInstance(HINSTANCE, int); 
LRESULT CALLBACK	WndProc(HWND, UINT, WPARAM, LPARAM);
LRESULT CALLBACK	About(HWND, UINT, WPARAM, LPARAM);
LRESULT CALLBACK    IZOBR(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam);
void DRAW_BRUSH(HDC hdc, int NUM, int xo, int yo, COLORREF CR);
void DRAW_BMP(HDC hdc, int xStart, int yStart);
void RGB_USER();
void UPDATE_USER(HWND hw);
void WM_VSCROLL_FUNC(int wParam);
void WM_HSCROLL_FUNC(int wParam);
void CHILD_REG();
LRESULT CALLBACK ChildProc(HWND hwnd, UINT Message, WPARAM wparam,LPARAM lparam);
LRESULT CALLBACK BMP_PROC(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam);
//////////////////////////////////////////////////////////////////////////
/////////////////Точка входа в программу//////////////////////////////////
//////////////////////////////////////////////////////////////////////////
int APIENTRY WinMain(HINSTANCE hInstance,
                     HINSTANCE hPrevInstance,
                     LPSTR     lpCmdLine,
                     int       nCmdShow)
{
	MSG msg;    //Структура для сообщений
	///Инициализация глобальных строк/////////////////////////////////////
	LoadString(hInstance,IDS_LAB4_TITLE,szTitle,MAX_LOADSTRING);
	LoadString(hInstance,IDC_LAB4_CL,szWindowClass,MAX_LOADSTRING);
	LAB4_RegisterClass(hInstance); //Регистрируем класс окна
	if (!InitInstance (hInstance, nCmdShow)) 
	{
		return FALSE;
	}
    /////////////Горячие клавиши//////////////////////////////////////////
	RegisterHotKey(hWnd,0,NULL,VK_ESCAPE);
	RegisterHotKey(hWnd,1,NULL,VK_F1);
	RegisterHotKey(hWnd,2,NULL,VK_F2);
	RegisterHotKey(hWnd,3,NULL,VK_F3);
	RegisterHotKey(hWnd,4,NULL,VK_F4);
	////////Главный цикл обработки сообщений//////////////////////////////
	while (GetMessage(&msg, NULL, 0, 0)) 
	{
	  {
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	  }
	}
	return msg.wParam;
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////Диалог выбора BMP///////////////////////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK BMP_PROC(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam)
{
	switch (message)
	{
		case WM_COMMAND:
			if (LOWORD(wParam) == IDOK) 
			{
			    GetDlgItemText(hDlg,IDC_EDIT1,PCHAR(S), 255);
				EndDialog(hDlg, LOWORD(wParam));
				return TRUE;
			}
			if (LOWORD(wParam) == IDCANCEL) 
			{
				EndDialog(hDlg, LOWORD(wParam));
				return TRUE;
			}
			break;
	}
    return FALSE;
}
//////////////////////////////////////////////////////////////////////////
/////////////////Функция обработки сообщений для главного окна////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{	
  	static int cx,cy;
	switch (message) 
	{
	     case WM_COMMAND:
			switch (LOWORD(wParam))
			{
				case MENU_1:		
                   RGB_USER(); //вызываем процедуру выбора цвета для фигур
  			       UPDATE_USER(hWnd); 
				   break;     
				case MENU_2:  
			       if (FLAG_OKNO==false)
				   {	
		   	           DialogBox(hInst,(LPCTSTR)IDD_BMP,hWnd,(DLGPROC)BMP_PROC);	
					   CHILD_REG(); //Создаем окно
				       FLAG_OKNO=true; //Больше нельзя открывать
				   }
				   break;
				case MENU_3:
                   DialogBox(hInst,(LPCTSTR)IDD_VID_IZOBR,hWnd,(DLGPROC)IZOBR);	
				   FLAG_FIGUR=true; //разрешить прорисовку фигуры
				   UPDATE_USER(hWnd);             
				   break;
				case IDM_ABOUT:
				   DialogBox(hInst,(LPCTSTR)IDD_ABOUTBOX,hWnd,(DLGPROC)About);
                   break;
				case MENU_4:
				   DestroyWindow(hWnd);
                   break;
				default:
				   return DefWindowProc(hWnd, message, wParam, lParam);
			}
			break;
		case WM_PAINT:
		   PAINTSTRUCT ps;
		   HDC hdc;
           hdc = BeginPaint(hWnd, &ps); 		
           if (FLAG_FIGUR==true)
		     DRAW_BRUSH(hdc,FIGURA,-x_BUF,-y_BUF,CR);
		   UpdateWindow(child);
		   EndPaint(hWnd, &ps);
	       break;
		case WM_DESTROY:
		   PostQuitMessage(0);
		   break;
        //////////Изменяем площадь отображаемого виртуального окна - мы его 
		///////////////////просматриваем в нашем окне
        case WM_SIZE:
		   cx = LOWORD(lParam);
           cy = HIWORD(lParam);
		   if (cx>0 && cy>0)
		   {
             b=ceil((768/cy)*MAX_PLOSHAD_B);  //768 - разрешение по вертикали окна
		     a=ceil((1024/cy)*MAX_PLOSHAD_A); //1024 - разрешение по горизонтали окна	
		   };
           break;
		////////Сообщение - при создании окна////////////////////
		case WM_CREATE:			
	   	   //////////Устанавливаем диапазон прокрутки////////////
           max_x=100; 
		   max_y=max_x;
           min=0;     
           SetScrollRange(hWnd,SB_VERT,min,max_y,TRUE);
		   SetScrollRange(hWnd,SB_HORZ,min,max_x,TRUE);
           SetScrollPos (hWnd,SB_VERT,0,TRUE); 
           ///////////Дополнительные переменные//////////////////
		   y_BUF=0;
		   x_BUF=0;
		   a=MAX_PLOSHAD_A;        //длина области прокручивания 
		   b=MAX_PLOSHAD_B;        //высота области прокручивания 
		   delta_y=10;   //отступ текста сверху
		   delta_x=10;   //отступ текста слева
           FLAG_FIGUR=false;
		   FLAG_OKNO=false;
		   S = new char[255]; //Выделяем память под путь BMP
		   break;
		/////////////вертикальный скролллинг/////////////////////
        case WM_VSCROLL:
		    WM_VSCROLL_FUNC(wParam);
            break;
		/////////////горизонтальный скролллинг///////////////////
        case WM_HSCROLL:
		    WM_HSCROLL_FUNC(wParam);
            break;
		/////////////////////////////////////////////////////////
		case WM_HOTKEY:
            switch (HIWORD(lParam))
			{
			  case VK_ESCAPE:
                DestroyWindow(hWnd);
				break;
              case VK_F1:
                RGB_USER(); //вызываем процедуру выбора цвета для фигур
  			    UPDATE_USER(hWnd); 
				break;
              case VK_F2:
                if (FLAG_OKNO==false)
				   {	
		   	           DialogBox(hInst,(LPCTSTR)IDD_BMP,hWnd,(DLGPROC)BMP_PROC);	
					   CHILD_REG(); //Создаем окно
				       FLAG_OKNO=true; //Больше нельзя открывать
				   }
				break;
              case VK_F3:
                DialogBox(hInst,(LPCTSTR)IDD_VID_IZOBR,hWnd,(DLGPROC)IZOBR);	
				FLAG_FIGUR=true; //разрешить прорисовку фигуры
				UPDATE_USER(hWnd);
				break;
              case VK_F4:
                DialogBox(hInst,(LPCTSTR)IDD_ABOUTBOX,hWnd,(DLGPROC)About);
				break;
            }
            break;
		default:
		  return DefWindowProc(hWnd, message, wParam, lParam);
   }
   return 0;
}
//////////////////////////////////////////////////////////////////////////
/////////Обработка сообщений для дочернего окна - BMP/////////////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK ChildProc(HWND hwnd, UINT Message, WPARAM wparam,LPARAM lparam)
{
	switch (Message) 
	{
	    case WM_CREATE:
           hBitmap = (HBITMAP) LoadImage(hInst,PCHAR(S),IMAGE_BITMAP,0,0,LR_LOADFROMFILE);
		case WM_PAINT:
		   PAINTSTRUCT ps;
		   HDC hdc;
           hdc = BeginPaint(hwnd, &ps); 		
           DRAW_BMP(GetDC(hwnd),0,0);
		   UpdateWindow(hwnd);
		   EndPaint(hwnd, &ps);
	       break;
        case WM_DESTROY:
		   FLAG_OKNO=false; //Теперь можно открыть окно с другим BMP
		default:
		  return DefWindowProc(hwnd, Message, wparam, lparam);
   }
   return 0; 
}
//////////////////////////////////////////////////////////////////////////
///////////////Регистрация класса дочернего окна//////////////////////////
//////////////////////////////////////////////////////////////////////////
void CHILD_REG()
{
  WNDCLASS w;
  memset(&w,0,sizeof(WNDCLASS));
  w.style=CS_HREDRAW | CS_VREDRAW;
  w.lpfnWndProc = ChildProc;
  w.hInstance = hInst;
  w.hbrBackground = (HBRUSH)(COLOR_3DDKSHADOW+1);
  w.lpszClassName = "ChildWClass";
  w.hCursor=NULL; 
  RegisterClass(&w);
  child=CreateWindowEx(0,"ChildWClass",(LPCTSTR) NULL,WS_CHILDWINDOW|WS_OVERLAPPEDWINDOW, 10,10,500,200,hWnd,NULL,hInst,NULL);
  ShowWindow(child,SW_SHOWNORMAL);
  UPDATE_USER(child);
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////Диалог о программе//////////////////////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK About(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam)
{
	switch (message)
	{
		case WM_COMMAND:
			if (LOWORD(wParam) == IDOK || LOWORD(wParam) == IDCANCEL) 
			{
				EndDialog(hDlg, LOWORD(wParam));
				return TRUE;
			}
			break;
	}
    return FALSE;
}
//////////////////////////////////////////////////////////////////////////
///////////////Диалог выбора фигура для отображения///////////////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK IZOBR(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam)
{
	switch (message)
	{
		case WM_INITDIALOG:
           CheckRadioButton(hDlg, IDC_RADIO1, IDC_RADIO3, IDC_RADIO1);
		   return TRUE;
		case WM_COMMAND:
	  	   if (LOWORD(wParam) == IDCANCEL) 
		   {
			  EndDialog(hDlg, LOWORD(wParam));	 
		      return TRUE;
           };
           if (LOWORD(wParam) == IDOK) 
		   {
			  if (IsDlgButtonChecked(hDlg,IDC_RADIO1)==1)
				FIGURA=1;
			  if (IsDlgButtonChecked(hDlg,IDC_RADIO2)==1)
				FIGURA=2;
			  if (IsDlgButtonChecked(hDlg,IDC_RADIO3)==1)
				FIGURA=3;		 
			  EndDialog(hDlg, LOWORD(wParam));	 
		      return TRUE;
           };
	}
    return FALSE;
}
//////////////////////////////////////////////////////////////////////////
///////////////////Вертикальный скроллинг/////////////////////////////////
//////////////////////////////////////////////////////////////////////////
void WM_VSCROLL_FUNC(int wParam)
{
  switch(LOWORD(wParam))
		   {
              case SB_LINEUP:
                 if (pos_y>min)
				 {
                   pos_y=pos_y-1;
				   SetScrollPos (hWnd,SB_VERT,pos_y,TRUE);
				   y_BUF=ceil(pos_y*(b/max_y)); //вычисляем глобальную точку (x_BUF,y_BUF)
				 }
                 break; 
			  case SB_LINEDOWN:
				  if (pos_y<max_y)
				 {
                   pos_y=pos_y+1;
				   SetScrollPos (hWnd,SB_VERT,pos_y,TRUE);
				   y_BUF=ceil(pos_y*(b/max_y)); //вычисляем глобальную точку (x_BUF,y_BUF)
				 }
                 break; 
			  case SB_THUMBTRACK:  //Пользователь передвигает ползунок
				   pos_y=HIWORD(wParam);
				   SetScrollPos (hWnd,SB_VERT,pos_y,TRUE);
                   y_BUF=ceil(pos_y*(b/max_y));
			  default:
				   break;
		   };
  UPDATE_USER(hWnd);
}
//////////////////////////////////////////////////////////////////////////
/////////////////Горизонтальный скроллинг/////////////////////////////////
//////////////////////////////////////////////////////////////////////////
void WM_HSCROLL_FUNC(int wParam)
{
  switch(LOWORD(wParam))
		   {
              case SB_LINEUP:
                 if (pos_x>min)
				 {
                   pos_x=pos_x-1;
				   SetScrollPos (hWnd,SB_HORZ,pos_x,TRUE);
				   x_BUF=ceil(pos_x*(a/max_x)); //вычисляем глобальную точку (x_BUF,y_BUF)
				 }
                 break; 
			  case SB_LINEDOWN:
				 if (pos_x<max_x)
				 {
                   pos_x=pos_x+1;
				   SetScrollPos (hWnd,SB_HORZ,pos_x,TRUE);
				   x_BUF=ceil(pos_x*(a/max_x)); //вычисляем глобальную точку (x_BUF,y_BUF)
				 }
                 break; 
			  case SB_THUMBTRACK:  //Пользователь передвигает ползунок
			  	   pos_x=HIWORD(wParam);
				   SetScrollPos(hWnd,SB_HORZ,pos_x,TRUE);
                   x_BUF=ceil(pos_x*(a/max_x));
			  default:
				   break;
		   }; 
  UPDATE_USER(hWnd);
}
//////////////////////////////////////////////////////////////////////////
///////////////Заставляет окно обновиться/////////////////////////////////
//////////////////////////////////////////////////////////////////////////
void UPDATE_USER(HWND hw)
{
  InvalidateRect(hw,NULL,true);
  UpdateWindow(hw);
}
//////////////////////////////////////////////////////////////////////////
////////////////////////////Выбор цвета///////////////////////////////////
//////////////////////////////////////////////////////////////////////////
void RGB_USER()
{
   ///////////////////////////////////////////////////////////////////////
   HBRUSH hbrush;   
   CHOOSECOLOR cc;                 
   static COLORREF acrCustClr[16];                
   ///////////////////////////////////////////////////////////////////////
   ZeroMemory(&cc, sizeof(CHOOSECOLOR));
   cc.lStructSize = sizeof(CHOOSECOLOR);
   cc.hwndOwner = hWnd;
   cc.lpCustColors = (LPDWORD) acrCustClr;
   cc.rgbResult = CR;
   cc.Flags = CC_FULLOPEN | CC_RGBINIT; 
   ///////////////////////////////////////////////////////////////////////
   if (ChooseColor(&cc)==TRUE) 
   {
    hbrush = CreateSolidBrush(cc.rgbResult);
    CR = cc.rgbResult; 
   }
}
//////////////////////////////////////////////////////////////////////////
///////////////Рисование различных элементов графики//////////////////////
//////////////////////////////////////////////////////////////////////////
void DRAW_BRUSH(HDC hdc, int NUM, int xo, int yo, COLORREF CR)
{
    HPEN hPen;
    HBRUSH hBr;
    LOGBRUSH lb;
	/////////////////Фон закраски//////////////////////////////
    lb.lbColor=RGB(200,100,10);
    lb.lbStyle=BS_SOLID;
    lb.lbHatch=NULL;
    hBr = CreateBrushIndirect(&lb);
    SelectObject(hdc, hBr);
	/////////////////PEN///////////////////////////////////////
	hPen = CreatePen(NULL,1,CR); //CR - выбирает пользователь
	SelectObject(hdc, hPen);
	switch (NUM)
	{
		case 1:
            Arc(hdc,xo+10,yo+10,xo+150,yo+250,0,0,0,0);	    
			break;
		case 2:
            Arc(hdc,xo+10,yo+10,xo+150,yo+150,0,0,0,0);
			break;
		case 3:
            Rectangle(hdc,xo+10,yo+10,xo+450,yo+350);
			break;
	}
	DeleteObject(hPen);
    DeleteObject(hBr);
}
//////////////////////////////////////////////////////////////////////////
/////////////////////////Функция создания окна////////////////////////////
//////////////////////////////////////////////////////////////////////////
BOOL InitInstance(HINSTANCE hInstance, int nCmdShow)
{
   
   hInst = hInstance;  //hInst - глобальная переменная
   hWnd = CreateWindow(
	                   szWindowClass, 
					   szTitle, 
					   WS_OVERLAPPEDWINDOW | WS_CLIPCHILDREN | WS_VSCROLL | WS_HSCROLL,
                       CW_USEDEFAULT, 
					   0, 
					   CW_USEDEFAULT, 
					   0, 
					   NULL, 
					   NULL, 
					   hInstance, 
					   NULL
					  );
   if (!hWnd)
   {
	   return FALSE;
   }
   ShowWindow(hWnd, nCmdShow);
   return TRUE;
}
//////////////////////////////////////////////////////////////////////////
/////////////////////Функция регистрации класса окна//////////////////////
//////////////////////////////////////////////////////////////////////////
ATOM LAB4_RegisterClass(HINSTANCE hInstance)
{
	WNDCLASSEX wcex; //Объявляем переменную типа WNDCLASSEX
	wcex.cbSize = sizeof(WNDCLASSEX); 
	wcex.style	= CS_HREDRAW | CS_VREDRAW;
	wcex.lpfnWndProc = (WNDPROC)WndProc;
	wcex.cbClsExtra	= 0;
	wcex.cbWndExtra	= 0;
	wcex.hInstance = hInstance;
	wcex.hIcon = LoadIcon(hInstance, (LPCTSTR)IDI_MY100);
	wcex.hCursor = LoadCursor(NULL, IDC_ARROW);
	wcex.hbrBackground = (HBRUSH)(COLOR_3DDKSHADOW+1);
	wcex.lpszMenuName = (LPCSTR)IDC_LAB4_MENU;
	wcex.lpszClassName = szWindowClass;
	wcex.hIconSm = LoadIcon(wcex.hInstance, (LPCTSTR)IDI_SMALL);
	return RegisterClassEx(&wcex);
}
//////////////////////////////////////////////////////////////////////////
////////////Загрузка и вывод в окне файлов *.BMP//////////////////////////
//////////////////////////////////////////////////////////////////////////
void DRAW_BMP(HDC hdc, int xStart, int yStart)
{
  BITMAP bm;
  HDC hdcMem;
  POINT ptSize, ptOrg; 
  ////////////////////////////////////////////////////////////////////////
  hdcMem = CreateCompatibleDC(hdc);
  SelectObject(hdcMem, hBitmap);
  SetMapMode(hdcMem,GetMapMode(hdc));
  GetObject(hBitmap,sizeof(BITMAP),&bm);  
  ////////////////////////////////////////////////////////////////////////
  ptOrg.x = 0;
  ptOrg.y = 0;
  ptSize.x = bm.bmWidth;
  ptSize.y = bm.bmHeight;
  ////////////////////////////////////////////////////////////////////////
  DPtoLP(hdc,&ptSize,1);
  DPtoLP(hdcMem,&ptOrg,1);
  ////////////////////////////////////////////////////////////////////////
  BitBlt(hdc,xStart,yStart,ptSize.x,ptSize.y,hdcMem,ptOrg.x,ptOrg.y,SRCCOPY);
  DeleteDC(hdcMem);
}