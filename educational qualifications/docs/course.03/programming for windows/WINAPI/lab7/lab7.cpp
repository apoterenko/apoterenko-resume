//////////////////////////////////////////////////////////////////////////
//
//              Окончательная версия ЛР №7 по WinApi
//              Автор: Потеренко А.Г. ВТ-31 2006г.
//              Дата завершения: 15.03.2006г.
//
//////////////////////////////////////////////////////////////////////////
#include "stdafx.h"
#include "math.h "
#include "resource.h"
#include "COMMDLG.H"
#define SCREEN_X 2024   //Для загрузки HBITMAP в hdcmem - только так можно рисовать
#define SCREEN_Y 2784   //Обязательно должно выполняться условие 
                        //SCREEN_Y-MAX_PLOSHAD_B>784 (784 - разрешение по вертикали)
#define MAX_LOADSTRING 100
//Виртуальное окно - то окно, которое мы должны скроллингом просмотреть в Windows окне
#define MAX_PLOSHAD_B 2000 //Максимальная высота виртуального окна
#define MAX_PLOSHAD_A 1000  //Максимальная длина виртуального окна
//////////////////////////////////////////////////////////////////////////
/////////////////////////Глобальные переменные////////////////////////////
//////////////////////////////////////////////////////////////////////////
int pos_y,pos_x;                       //дискретные положения ползунков
int max_x,max_y;                       //max диапазона прокрутки
int min;                               //min диапазона прокрутки
int x_BUF,y_BUF,a,b,delta_y,delta_x;   //вычисление глобальной нулевой точки
HINSTANCE hInst;					   //Описатель экземпляра самой программы		
TCHAR szTitle[MAX_LOADSTRING];	       //Заголовок окна						
TCHAR szWindowClass[MAX_LOADSTRING];   //Указатель на зарегистрированное имя класса	
HWND hWnd; //Глобальный идентификатор окна
bool MOUSE_UP_HDC; //Нужны для рисования мышью
HBITMAP hb,hb2; //Только так можно рисовать в контексте памяти - загрузив hb,hb2
HDC hdcmem,      //Буфер - в котором отображается вид будущей фигуры
    hdcmem2;     //Буфер - в котором юзер рисует фигуры
int xPos,yPos,xTec,yTec; //Координаты при нажатии мыши и текущие координаты	
COLORREF CR;         //Цвет, который выбрал пользователь
int FIGURA; //1-прямоугольник,2-окружность,3-эллипс	
//////////////////////////////////////////////////////////////////////////
////////////////////Прототипы глобальных функций//////////////////////////
//////////////////////////////////////////////////////////////////////////
ATOM				LAB7_RegisterClass(HINSTANCE hInstance);
BOOL				InitInstance(HINSTANCE, int); 
LRESULT CALLBACK	WndProc(HWND, UINT, WPARAM, LPARAM);
LRESULT CALLBACK	About(HWND, UINT, WPARAM, LPARAM);
void PRINT_IMAGE(HDC hd); //Закрашиваем окно юзера
void RECT_HDCMEM();   //Рисуем прямоугольники в памяти
void RGB_USER();      //Цвет фона прямоугольников
//////////////////////////////////////////////////////////////////////////
/////////////////Точка входа в программу//////////////////////////////////
//////////////////////////////////////////////////////////////////////////
int APIENTRY WinMain(HINSTANCE hInstance,
                     HINSTANCE hPrevInstance,
                     LPSTR     lpCmdLine,
                     int       nCmdShow)
{
	MSG msg;    //Структура для сообщений
	///Инициализация глобальных строк/////////////////////////////
	LoadString(hInstance,IDS_LAB7_TITLE,szTitle,MAX_LOADSTRING);
	LoadString(hInstance,IDC_LAB7_CL,szWindowClass,MAX_LOADSTRING);
	LAB7_RegisterClass(hInstance); //Регистрируем класс окна
	if (!InitInstance (hInstance, nCmdShow)) 
	{
		return FALSE;
	}
	RegisterHotKey(hWnd,1,NULL,VK_F1);
	RegisterHotKey(hWnd,2,NULL,VK_F2);
	RegisterHotKey(hWnd,3,NULL,VK_F3);
	RegisterHotKey(hWnd,4,NULL,VK_F4);
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
ATOM LAB7_RegisterClass(HINSTANCE hInstance)
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
	wcex.lpszMenuName = (LPCSTR)IDC_LAB7_MENU;
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
	int wmId_LAB7;
	wmId_LAB7=LOWORD(wParam); //Идентификатор дочернего окна
	switch (message) 
	{
	     /////сообщения - посылаются дочерним окнам (меню и т.п.)//
	     case WM_COMMAND:
			switch (wmId_LAB7)
			{
				case IDM_ABOUT:
				   DialogBox(hInst,(LPCTSTR)IDD_ABOUTBOX,hWnd,(DLGPROC)About);
				   break;
				case IDM_EXIT:
				   DestroyWindow(hWnd);
                   break;
				case IDM_PASTE:            			
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
		   PRINT_IMAGE(hdc);
		   EndPaint(hWnd, &ps);
	       break;
		///////Уведомляет окно о том, что оно будет pазpушено////
		case WM_DESTROY:
		   //Напpавляет сообщение wm_Quit обычно в ответ на сообщение wm_Destroy
		   //Если не вызвать эту процедуру - окно закроется, а процесс висит в памяти
		   PostQuitMessage(0);
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
		   FIGURA=1; //Разрешено вначале рисовать прямоугольники
           ////////////Буфер для прорисовки//////////////////////
		   hdcmem = CreateCompatibleDC(GetDC(hWnd));
		   hdcmem2 = CreateCompatibleDC(GetDC(hWnd));	
           hb = CreateCompatibleBitmap(GetDC(hWnd),SCREEN_X,SCREEN_Y);
		   hb2 = CreateCompatibleBitmap(GetDC(hWnd),SCREEN_X,SCREEN_Y);
           SelectObject(hdcmem,hb);		   
           SelectObject(hdcmem2,hb2);   
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
		   SetWindowOrgEx(hdcmem2,-x_BUF,-y_BUF,NULL);
		   InvalidateRect(hWnd,NULL,false); //false - вот главный ключ - мы сами перерисовываем
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
           SetWindowOrgEx(hdcmem2,-x_BUF,-y_BUF,NULL);
		   InvalidateRect(hWnd,NULL,false); //false - вот главный ключ - мы сами перерисовываем
           UpdateWindow(hWnd);
          break;
		////////////Горячие клавиши///////////////////////////////////////
		case WM_HOTKEY:
            switch (HIWORD(lParam))
			{
              case VK_F1:
                RGB_USER(); //вызываем процедуру выбора цвета для фигур
  			    InvalidateRect(hWnd,NULL,false);
                UpdateWindow(hWnd);
				break;
			  case VK_F2:
                FIGURA=1;
				break;
			  case VK_F3:
                FIGURA=2;
				break;
			  case VK_F4:
                FIGURA=3;
				break;
			};
			break;
		//////////////////////////////////////////////////////////////////
		case WM_MOUSEMOVE: 
           if (wParam & MK_LBUTTON) 			
		   {//Если мы нажали на левую кнопку мыши и водим над окном
             xTec = LOWORD(lParam);  
             yTec = HIWORD(lParam);   
             RECT_HDCMEM(); //Здесь мы просто отображаем будущий вид фигуры
		   }
		   else
		   {//Не нажимали - просто записываем координаты до нажатия - они будут начальными
		     xPos = LOWORD(lParam);  
             yPos = HIWORD(lParam);
		   }
          break;
		////////////////Юзер отпустил кнопку мыши/////////////////////////
        case WM_LBUTTONUP:
          MOUSE_UP_HDC=true;
          RECT_HDCMEM(); //Здесь закрепляем результат		  
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
//////////////////////////////////////////////////////////////////////////
///////Рисуем прямоугольник во все окно - на нем юзер рисует фигуры///////
//////////////////////////////////////////////////////////////////////////
void PRINT_IMAGE(HDC hd)
{ 
 static bool ONE=false;
 if (ONE==false)
 {////Сюда попадаем в самом начале - здесь рисуется первоначальный фон////
  ////Затем на нем юзер рисует фигуры/////////////////////////////////////
  HBRUSH hBr;
  HPEN hp;
  LOGBRUSH lb;
  lb.lbColor=GetSysColor(COLOR_3DDKSHADOW); //Заливаем окно серым цветом
  lb.lbStyle=BS_SOLID;
  lb.lbHatch=NULL;
  ///////////Сначала рисуем в памяти общий вид////////////////////////////
  hBr = CreateBrushIndirect(&lb);
  hp = CreatePen(NULL,0,GetSysColor(COLOR_3DDKSHADOW));
  SelectObject(hdcmem2, hBr);
  SelectObject(hdcmem2, hp);
  Rectangle(hdcmem2,0,0,SCREEN_X,SCREEN_Y);	
  DeleteObject(hp);
  DeleteObject(hBr);
  /////Отображаем прямоугольник в окне - на нем все рисуем////////////////
  BitBlt(GetDC(hWnd), 0, 0, SCREEN_X, SCREEN_Y, hdcmem2, 0,0,SRCCOPY);
  ONE=true;
 }
 else
 {//Здесь происходит прорисовка памяти в контекст окна////////////////////
   BitBlt(GetDC(hWnd), 0, 0, SCREEN_X, SCREEN_Y, hdcmem2, 0,0,SRCCOPY);
 }
}
//////////////////////////////////////////////////////////////////////////
/////////Пользователь рисует прямоугольник - в памяти/////////////////////
//////////////////////////////////////////////////////////////////////////
void RECT_HDCMEM()
{
 HBRUSH hBr;
 HPEN hp;
 LOGBRUSH lb;
 lb.lbColor=CR; //Цвет прямоугольника
 lb.lbStyle=BS_SOLID;
 lb.lbHatch=NULL;
 /////////////////////////////////////////////////////////////////////////
 hBr = CreateBrushIndirect(&lb);
 hp = CreatePen(NULL,0,RGB(1,1,1)); //Цвет границы прямоугольника
 SelectObject(hdcmem, hBr);
 SelectObject(hdcmem, hp);
 SelectObject(hdcmem2, hBr);
 SelectObject(hdcmem2, hp);
 if (MOUSE_UP_HDC==true) 
 {//////Пользователь отпустил мышь - можно копировать в память////////////
   SelectObject(hdcmem2,hb); 
   switch (FIGURA)
   {
     case 1:
         Rectangle(hdcmem2,xPos,yPos,xTec,yTec);	 
		 break;
	 case 2:
         int D;
		 D=abs(-xTec+xPos);
		 Ellipse(hdcmem2,xPos,yPos,xPos+D,yPos+D);
		 break;
	 case 3:
         Ellipse(hdcmem2,xPos,yPos,xTec,yTec);
		 break;
   };
   BitBlt(GetDC(hWnd), 0, 0, SCREEN_X, SCREEN_Y, hdcmem2, 0,0,SRCCOPY);
   MOUSE_UP_HDC=false;
 }
 else
 {///////////Юзер отображает вид будущей фигуры - копируем hdcmem<=hdcmem2
   BitBlt(hdcmem, 0, 0, SCREEN_X, SCREEN_Y, hdcmem2, 0,0,SRCCOPY); 
   switch (FIGURA)
   {
     case 1:
         Rectangle(hdcmem,xPos,yPos,xTec,yTec);
		 break;
	 case 2:
         int D;
		 D=abs(-xTec+xPos);
		 Ellipse(hdcmem,xPos,yPos,xPos+D,yPos+D);
		 break;
	 case 3:
         Ellipse(hdcmem,xPos,yPos,xTec,yTec);
		 break;
   };
   BitBlt(GetDC(hWnd), 0, 0, SCREEN_X, SCREEN_Y, hdcmem, 0,0,SRCCOPY);
 }
 DeleteObject(hp);
 DeleteObject(hBr);
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