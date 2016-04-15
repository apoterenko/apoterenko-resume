//////////////////////////////////////////////////////////////////////////
//
//              Окончательная версия ЛР №5 по WinApi
//              Автор: Потеренко А.Г. ВТ-31 2006г.
//              Дата завершения: 7.03.2006г.
//
//////////////////////////////////////////////////////////////////////////
#include "stdafx.h"
#include "string.h"
#include "resource.h"
#define MAX_LOADSTRING 100
//////////////////////////////////////////////////////////////////////////
/////////////////////////Глобальные переменные////////////////////////////
//////////////////////////////////////////////////////////////////////////
HWND hwndSmaller;
HWND hWnd;
HINSTANCE hInst;					   //Описатель экземпляра самой программы		
TCHAR szTitle[MAX_LOADSTRING];	       //Заголовок окна						
TCHAR szWindowClass[MAX_LOADSTRING];   //Указатель на зарегистрированное имя класса		
//////////////////////////////////////////////////////////////////////////
////////////////////Прототипы глобальных функций//////////////////////////
//////////////////////////////////////////////////////////////////////////
ATOM				LAB5_RegisterClass(HINSTANCE hInstance);
BOOL				InitInstance(HINSTANCE, int); 
LRESULT CALLBACK	WndProc(HWND, UINT, WPARAM, LPARAM);
LRESULT CALLBACK	About(HWND, UINT, WPARAM, LPARAM);
void BUTTON_DRAW(HWND hw,int k);
//////////////////////////////////////////////////////////////////////////
///////////////////Обработка сообщений диалога////////////////////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK About(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam)
{
	LPDRAWITEMSTRUCT lpdis;
	HRGN hp;
	switch (message)
	{
		case WM_INITDIALOG:
			    //////////////Создаем кнопку в диалоге////////////////////
                hwndSmaller = CreateWindow("button", "", 
					                       WS_CHILD | WS_VISIBLE | BS_OWNERDRAW,
                                           315,45,130,50,hDlg,NULL, hInst, NULL);
			    ////////Придаем ей вид эллипса////////////////////////////
				hp=CreateEllipticRgn(0,0,130,50);
                SetWindowRgn(hwndSmaller,hp,true);
				return TRUE;
		case WM_COMMAND:
			if (LOWORD(wParam) == IDOK || LOWORD(wParam) == IDCANCEL) 
			{
				EndDialog(hDlg, LOWORD(wParam));
				return TRUE;
			}
			//////////Реакция на нажатие овальной кнопки//////////////////
            if (HIWORD(wParam) == BN_CLICKED) 
			{ 
                EndDialog(hDlg, LOWORD(wParam));
				return TRUE;
            } 
            break; 
		//////////////////Рисование овальной кнопки///////////////////////
		case WM_DRAWITEM: 
			lpdis = (LPDRAWITEMSTRUCT) lParam; 
			if (lpdis->itemState & ODS_SELECTED) 
			{
			    BUTTON_DRAW(hwndSmaller,56);
				return TRUE;
			}
			else
                BUTTON_DRAW(hwndSmaller,156);
	        break;
	}
    return FALSE;
}
//////////////////////////////////////////////////////////////////////////
///////////////////////////////Рисование кнопки///////////////////////////
//////////////////////////////////////////////////////////////////////////
void BUTTON_DRAW(HWND hw,int k)
{		   
  HPEN hPen;
  HBRUSH hBr;
  LOGBRUSH lb;
  HDC hdcc=GetDC(hw);
  //////////////////Фон кнопки////////////////////////////////////////////
  lb.lbColor=RGB(100,60,k);
  lb.lbStyle=BS_SOLID;
  lb.lbHatch=NULL;
  hBr = CreateBrushIndirect(&lb);
  SelectObject(hdcc, hBr);
  /////////////////////Контур кнопки в виде эллипса///////////////////////
  hPen = CreatePen(NULL,0,RGB(1,1,1));
  SelectObject(hdcc, hPen);
  Ellipse(hdcc,0,0,130,50);
  //////////////////////////Текст в кнопке////////////////////////////////
  char * S="Cancel";
  SetBkColor(hdcc,lb.lbColor); 
  TextOut(hdcc,42,14,S,strlen(S));
}
//////////////////////////////////////////////////////////////////////////
/////////////////Функция обработки сообщений для окна/////////////////////
//////////////////////////////////////////////////////////////////////////
LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{	
	switch (message) 
	{
	     case WM_COMMAND:
			switch (LOWORD(wParam))
			{
				case IDM_ABOUT:
				   DialogBox(hInst,(LPCTSTR)IDD_ABOUTBOX,hWnd,(DLGPROC)About);
				   break;
				case IDM_EXIT:
				   DestroyWindow(hWnd);
                   break;
				default:
				   return DefWindowProc(hWnd, message, wParam, lParam);
			}
            break; 
		case WM_DESTROY:
		   PostQuitMessage(0);
		   break;
		default:
	   	   return DefWindowProc(hWnd, message, wParam, lParam);
   }
   return 0;
}
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
	LoadString(hInstance,IDS_LAB5_TITLE,szTitle,MAX_LOADSTRING);
	LoadString(hInstance,IDC_LAB5_CL,szWindowClass,MAX_LOADSTRING);
	LAB5_RegisterClass(hInstance); //Регистрируем класс окна	
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
/////////////////////Функция регистрации класса окна//////////////////////
//////////////////////////////////////////////////////////////////////////
ATOM LAB5_RegisterClass(HINSTANCE hInstance)
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
	wcex.lpszMenuName = (LPCSTR)IDC_LAB5_MENU;
	wcex.lpszClassName = szWindowClass;
	wcex.hIconSm = LoadIcon(wcex.hInstance, (LPCTSTR)IDI_SMALL);
	return RegisterClassEx(&wcex);
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