//////////////////////////////////////////////////////////////////////////
//
//              Окончательная версия ЛР №1 по WinApi
//              Автор: Потеренко А.Г. ВТ-31 2006г.
//              Дата завершения: 2.03.2006г.
//
//////////////////////////////////////////////////////////////////////////
#include "stdafx.h"
#include "resource.h"
#define MAX_LOADSTRING 100
//////////////////////////////////////////////////////////////////////////
/////////////////////////Глобальные переменные////////////////////////////
//////////////////////////////////////////////////////////////////////////
bool flag;                             //Флаг отвечает за прорисовку
HINSTANCE hInst;					   //Описатель экземпляра самой программы		
TCHAR szTitle[MAX_LOADSTRING];	       //Заголовок окна						
TCHAR szWindowClass[MAX_LOADSTRING];   //Указатель на зарегистрированное имя класса			
//////////////////////////////////////////////////////////////////////////
////////////////////Прототипы глобальных функций//////////////////////////
//////////////////////////////////////////////////////////////////////////
ATOM				LAB1_RegisterClass(HINSTANCE hInstance);
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
	LoadString(hInstance,IDS_LAB1_TITLE,szTitle,MAX_LOADSTRING);
	LoadString(hInstance,IDC_LAB1_CL,szWindowClass,MAX_LOADSTRING);
	LAB1_RegisterClass(hInstance); //Регистрируем класс окна
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
					   WS_OVERLAPPEDWINDOW,
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
ATOM LAB1_RegisterClass(HINSTANCE hInstance)
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
	wcex.lpszMenuName = (LPCSTR)IDC_LAB1_MENU;
	wcex.lpszClassName = szWindowClass;
	wcex.hIconSm = LoadIcon(wcex.hInstance, (LPCTSTR)IDI_SMALL);
	return RegisterClassEx(&wcex);
}
//////////////////////////////////////////////////////////////////////////
/////////////////Функция обработки сообщений для окна/////////////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{	
	int wmId_LAB1;
	wmId_LAB1=LOWORD(wParam); //Идентификатор дочернего окна
	switch (message) 
	{
		case WM_COMMAND:
			switch (wmId_LAB1)
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
  SetBkColor(hdc,GetSysColor(COLOR_3DDKSHADOW)); //Устанавливаем цвет фона
  char * S;
  S="Hello Windows NT!";
  for (int i=0;i<10;i++)
  {
	SetTextColor(hdc,RGB(R-i*20,G-i*7,B+i)); //Устанавливаем цвет текста
    TextOut(hdc,10,10+20*i,S,lstrlen(S));
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