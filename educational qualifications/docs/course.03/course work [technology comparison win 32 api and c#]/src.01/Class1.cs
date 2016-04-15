using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using Microsoft.CSharp;
using System.Reflection;
namespace ConsoleApplication1
{
	class Class1
	{
		[STAThread]
		static void Main(string[] args)
		{
			CSharpCodeProvider codeProvider= new CSharpCodeProvider();
			ICodeCompiler ic= codeProvider.CreateCompiler();	
			//////////////Параметры компиляции////////////////////////////////////
			CompilerParameters cp= new CompilerParameters();
			cp.ReferencedAssemblies.Add("System.dll");
			cp.GenerateExecutable= false; //Не создаем исполняемый модуль
			cp.GenerateInMemory= true;    //Генерируем в памяти
			//////////////////Компилируем/////////////////////////////////////////
     		CompilerResults cr = ic.CompileAssemblyFromFile(cp,"test.cs"); 
            //////////Создаем сборку и компилируем ее/////////////////////////////
			Assembly My_Assembly = cr.CompiledAssembly;
            My_Assembly.GetType("TEST_Class").InvokeMember("Main", BindingFlags.InvokeMethod, null, null, new object [] {});
		}
	}
}
