//////////////////////////////////////////////////////////////////////////
//
//              Окончательная версия ЛР №3 по WinApi
//              Автор: Потеренко А.Г. ВТ-31 2006г.
//              Дата завершения: 4.03.2006г.
//
//////////////////////////////////////////////////////////////////////////
#include "stdafx.h"
#include "math.h "
#include "resource.h"
#define MAX_LOADSTRING 100
//Виртуальное окно - то окно, которое мы должны скроллингом просмотреть в Windows окне
#define MAX_PLOSHAD_B 5000 //Максимальная высота виртуального окна
#define MAX_PLOSHAD_A 200  //Максимальная длина виртуального окна
//////////////////////////////////////////////////////////////////////////
/////////////////////////Глобальные переменные////////////////////////////
//////////////////////////////////////////////////////////////////////////
int pos_y,pos_x;                       //дискретные положения ползунков
int max_x,max_y;                       //max диапазона прокрутки
int min;                               //min диапазона прокрутки
int x_BUF,y_BUF,a,b,delta_y,delta_x;   //вычисление глобальной нулевой точки
bool flag;                             //Флаг отвечает за прорисовку
HINSTANCE hInst;					   //Описатель экземпляра самой программы		
TCHAR szTitle[MAX_LOADSTRING];	       //Заголовок окна						
TCHAR szWindowClass[MAX_LOADSTRING];   //Указатель на зарегистрированное имя класса			
//////////////////////////////////////////////////////////////////////////
////////////////////Прототипы глобальных функций//////////////////////////
//////////////////////////////////////////////////////////////////////////
ATOM				LAB3_RegisterClass(HINSTANCE hInstance);
BOOL				InitInstance(HINSTANCE, int); 
LRESULT CALLBACK	WndProc(HWND, UINT, WPARAM, LPARAM);
LRESULT CALLBACK	About(HWND, UINT, WPARAM, LPARAM);
void                PRINT_HELLO(HDC hdc,short int R,short int G,short int B);
//////////////////////////////////////////////////////////////////////////
/////////////////Точка входа в программу//////////////////////////////////
//////////////////////////////////////////////////////////////////////////
int APIENTRY WinMain(HINSTANCE hInstance,
                     HINSTANCE hPrevInstance,
                     LPSTR     lpCmdLine,
                     int       nCmdShow)
{
    flag=false; //Нельзя писать в окне
	MSG msg;    //Структура для сообщений
	///Инициализация глобальных строк/////////////////////////////
	LoadString(hInstance,IDS_LAB3_TITLE,szTitle,MAX_LOADSTRING);
	LoadString(hInstance,IDC_LAB3_CL,szWindowClass,MAX_LOADSTRING);
	LAB3_RegisterClass(hInstance); //Регистрируем класс окна
	if (!InitInstance (hInstance, nCmdShow)) 
	{
		return FALSE;
	}
	////////Главный цикл обработки сообщений//////////////////////////////
	while (GetMessage(&msg, NULL, 0, 0)) 
	{
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
	return msg.wParam;
}
//////////////////////////////////////////////////////////////////////////
/////////////////////////Функция создания окна////////////////////////////
//////////////////////////////////////////////////////////////////////////
BOOL InitInstance(HINSTANCE hInstance, int nCmdShow)
{
   HWND hWnd;
   hInst = hInstance;  //hInst - глобальная переменная
   hWnd = CreateWindow(
	                   szWindowClass, 
					   szTitle, 
					   WS_OVERLAPPEDWINDOW | WS_VSCROLL | WS_HSCROLL,
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
ATOM LAB3_RegisterClass(HINSTANCE hInstance)
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
	wcex.lpszMenuName = (LPCSTR)IDC_LAB3_MENU;
	wcex.lpszClassName = szWindowClass;
	wcex.hIconSm = LoadIcon(wcex.hInstance, (LPCTSTR)IDI_SMALL);
	return RegisterClassEx(&wcex);
}
//////////////////////////////////////////////////////////////////////////
/////////////////Функция обработки сообщений для окна/////////////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{	
    static	int cx,cy,xo,yo;
	int wmId_LAB3;
	wmId_LAB3=LOWORD(wParam); //Идентификатор дочернего окна
	switch (message) 
	{
	     /////сообщения - посылаются дочерним окнам (меню и т.п.)//
	     case WM_COMMAND:
			switch (wmId_LAB3)
			{
				case IDM_ABOUT:
				   DialogBox(hInst,(LPCTSTR)IDD_ABOUTBOX,hWnd,(DLGPROC)About);
				   break;
				case IDM_EXIT:
				   DestroyWindow(hWnd);
                   break;
				case IDM_PASTE:
                   flag=true; //Разрешить постоянно выводить надпись              			
				   InvalidateRect(hWnd,NULL,true);
                   UpdateWindow(hWnd);
				   break;
				default:
				   return DefWindowProc(hWnd, message, wParam, lParam);
			}
			break;
		//////Значит программа должна отвечать на прорисовку окна//
		case WM_PAINT:
		   PAINTSTRUCT ps;
		   HDC hdc;
           hdc = BeginPaint(hWnd, &ps); 
		   if (flag==true)
			  PRINT_HELLO(hdc,200,100,50);
		   EndPaint(hWnd, &ps);
	       break;
		///////Уведомляет окно о том, что оно будет pазpушено////
		case WM_DESTROY:
		   //Напpавляет сообщение wm_Quit обычно в ответ на сообщение wm_Destroy
		   //Если не вызвать эту процедуру - окно закроется, а процесс висит в памяти
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
		   }
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
		   break;
		/////////////вертикальный скролллинг/////////////////////
        case WM_VSCROLL:
		   switch(LOWORD(wParam))
		   {
              case SB_LINEUP:
			     //////////////Перемещаем ползунок///////////////
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
	       //Заставляем окно обновиться//////////////////////////
		   InvalidateRect(hWnd,NULL,true);
           UpdateWindow(hWnd);
          break;
		/////////////горизонтальный скролллинг///////////////////
        case WM_HSCROLL:
		   switch(LOWORD(wParam))
		   {
              case SB_LINEUP:
			     //////////////Перемещаем ползунок///////////////
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
	       //Заставляем окно обновиться//////////////////////////
		   InvalidateRect(hWnd,NULL,true);
           UpdateWindow(hWnd);
          break;
		/////////////////////////////////////////////////////////
		default:
			//Обеспечивает стандаpтную обpаботку сообщений для сообщений, котоpые 
			//явно не обpабатываются пpикладной задачей
			return DefWindowProc(hWnd, message, wParam, lParam);
   }
   return 0;
}
//////////////////////////////////////////////////////////////////////////
////////////////////////Выводим текст на экран////////////////////////////
//////////////////////////////////////////////////////////////////////////
void PRINT_HELLO(HDC hdc,short int R,short int G,short int B)
{
  int NUM_STR=200; //количество строк в окне - можно менять для демонстрации работы
  SetBkColor(hdc,GetSysColor(COLOR_3DDKSHADOW)); //Устанавливаем цвет фона
  char * S;
  S="Hello Windows NT!";
  for (int i=0;i<NUM_STR;i++)
  {
	SetTextColor(hdc,RGB(R-i*2,G-i*2,B+i)); //Устанавливаем цвет текста
    TextOut(hdc,-x_BUF+delta_x,-y_BUF+delta_y+20*i,S,lstrlen(S));
  };
  S=NULL;
} 
//////////////////////////////////////////////////////////////////////////
///////////////////Обработка сообщений диалога////////////////////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK About(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam)
{
	switch (message)
	{
		case WM_INITDIALOG:
				return TRUE;
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