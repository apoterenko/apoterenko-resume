cd %2/resources/
del /F Workflow-all*
sencha --cwd %2 app build development
