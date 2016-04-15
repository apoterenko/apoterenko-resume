;-----------------------------------------------------------------------------
;-------------------åéÑìãú èêéñÖÑìêõ êàëéÇÄçàü êÄåõ---------------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 GLOBAL RAM1:WORD
 GLOBAL RAM2:WORD
 GLOBAL RAM3:WORD
 GLOBAL RAMA:PROC
 RAM4 DW 0
.386
.CODE
;-------------------------------íÖãé åéÑìãü-----------------------------------
RAMA PROC
      MOV AX,0B800H
      MOV ES,AX
      MOV DI,RAM1
      ADD DI,2
      MOV CX,RAM2
      MOV AX,RAM3
      ADD AX,2
      IMUL AX,160
      MOV BX,DI
      SUB BX,160
      ADD AX,BX  
      MOV SI,AX
      ;--------------------------------PAR4-----------------------------------
      MOV AX,RAM1
      ADD AX,160
      MOV RAM4,AX
CIKL_RAMA:
      MOV AL,205
      MOV AH,7
      MOV ES:[DI],AX
      MOV ES:[SI],AX
      ADD DI,2
      ADD SI,2
LOOP CIKL_RAMA
      MOV DI,RAM4
      MOV CX,RAM3
      MOV AX,RAM2
      IMUL AX,2
      ADD AX,RAM4
      ADD AX,2
      MOV SI,AX
CIKL_RAMA@:
      MOV AL,186
      MOV AH,7
      MOV ES:[DI],AX
      MOV ES:[SI],AX
      ADD DI,160
      ADD SI,160
LOOP CIKL_RAMA@
      MOV DI,RAM1
      MOV AL,201
      MOV AH,7
      MOV ES:[DI],AX
      MOV DI,RAM2
      IMUL DI,2
      ADD DI,RAM1
      ADD DI,2
      MOV AL,187
      MOV AH,7
      MOV ES:[DI],AX
      MOV DI,RAM3
      ADD DI,2
      IMUL DI,160
      ADD DI,BX
      SUB DI,2
      MOV AL,200
      MOV AH,7
      MOV ES:[DI],AX
      MOV DI,RAM3
      ADD DI,2
      IMUL DI,160
      MOV SI,RAM2
      IMUL SI,2
      ADD DI,SI
      ADD DI,BX
      MOV AL,188
      MOV AH,7
      MOV ES:[DI],AX
      RET
RAMA ENDP
;-----------------------------------------------------------------------------
END
