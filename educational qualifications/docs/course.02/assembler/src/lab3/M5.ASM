;-----------------------------------------------------------------------------
;------------------èêéñÖÑìêÄ åéÑìãü êàëéÇÄçàü êÄÅéóÖÉé éäçÄ-------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 GLOBAL PAR1:WORD
 GLOBAL PAR2:WORD
 GLOBAL PAR3:WORD
 GLOBAL PAR4:WORD
 GLOBAL PAR5:BYTE
 GLOBAL PAR6:WORD
 Q1 DW 0
 Q2 DW 0
 FILE_OKNO DB 'NUMBER OF THE WINDOW:'
 GLOBAL WINDOW:PROC
.386
.CODE
 EXTRN SCROLLING:NEAR
 EXTRN CLOSE_WINDOW:NEAR
;--------------------íÖãé åéÑìãü----------------------------------------------
WINDOW PROC
    MOV AX,0B800H
    MOV ES,AX
    MOV AX,@DATA
    MOV DS,AX
    MOV SI,0
    MOV BX,WORD PTR PAR2[SI]  ;----------------------Y2-----------------------
    INC BX
    SUB BX,WORD PTR PAR1[SI]  ;----------------------Y1-----------------------
    MOV CX,BX
    ;-------------------------------------------------------------------------
    MOV DI,WORD PTR PAR1[SI]  ;----------------------Y1-----------------------
    DEC DI
    IMUL DI,160
    MOV BX,WORD PTR PAR3[SI]
    IMUL BX,2
    ADD DI,BX
    SUB DI,2
CIKL:
    MOV BX,WORD PTR PAR4[SI]
    SUB BX,WORD PTR PAR3[SI]  ;-------------------x2-x1-----------------------
    INC BX
    MOV WORD PTR Q1[SI],DI
    MOV WORD PTR Q2[SI],CX
    MOV CX,BX               
    CIKL@:
      MOV AL,0ffh
      MOV AH,BYTE PTR PAR5[SI]
      MOV ES:[DI],AX
      ADD DI,2
    LOOP CIKL@
    MOV DI,WORD PTR Q1[SI]
    MOV CX,WORD PTR Q2[SI]   
    ADD DI,160
LOOP CIKL
;----------------------êàëéÇÄçàÖ êÄåõ Ç éäçÖ----------------------------------
XOR SI,SI
XOR DI,DI
MOV AX,WORD PTR PAR5[SI]
CMP AX,0
JE NET_RAM
;------------------------
MOV AX,WORD PTR PAR1[SI]
DEC AX
IMUL AX,160
;-----------------------
MOV BX,WORD PTR PAR3[SI]
IMUL BX,2
ADD AX,BX
MOV DI,AX
;-----------------------
MOV CX,WORD PTR PAR4[SI]
SUB CX,WORD PTR PAR3[SI]
SUB CX,1
;-----------------------
MOV BX,WORD PTR PAR2[SI]
DEC BX
IMUL BX,160
MOV AX,WORD PTR PAR3[SI]
IMUL AX,2
ADD AX,BX
MOV SI,AX
CIKL_RAMA_WINDOW:
      MOV AL,177  
      MOV AH,7
      MOV ES:[DI],AX
      MOV AL,196
      MOV ES:[SI],AX
      ADD DI,2
      ADD SI,2
LOOP CIKL_RAMA_WINDOW
;-----------------------------------------------------------------------------
XOR SI,SI
XOR DI,DI
MOV AX,WORD PTR PAR1[SI]
IMUL AX,160
MOV BX,WORD PTR PAR3[SI]
DEC BX
IMUL BX,2
ADD AX,BX
MOV DI,AX
;-----------------------
MOV CX,WORD PTR PAR2[SI]
SUB CX,WORD PTR PAR1[SI]
SUB CX,1
;-----------------------
MOV AX,WORD PTR PAR1[SI]
IMUL AX,160
MOV BX,WORD PTR PAR4[SI]
DEC BX
IMUL BX,2
ADD AX,BX
MOV SI,AX
;-----------------------
CIKL_RAMA_WINDOW@:
      MOV AL,179
      MOV AH,7
      MOV ES:[DI],AX
      MOV ES:[SI],AX
      ADD DI,160
      ADD SI,160
LOOP CIKL_RAMA_WINDOW@
;-----------------------------------------------------------------------------
      XOR SI,SI
      XOR DI,DI
      MOV DI,WORD PTR PAR1[SI]
      DEC DI
      IMUL DI,160
      MOV AX,WORD PTR PAR3[SI]
      DEC AX
      IMUL AX,2
      ADD DI,AX
      MOV AL,177
      MOV AH,7
      MOV ES:[DI],AX
      MOV DI,WORD PTR PAR1[SI]
      DEC DI
      IMUL DI,160
      MOV AX,WORD PTR PAR4[SI]
      DEC AX
      IMUL AX,2
      ADD DI,AX
      MOV AL,177  
      MOV AH,7
      MOV ES:[DI],AX
      MOV DI,WORD PTR PAR2[SI]
      DEC DI
      IMUL DI,160
      MOV AX,WORD PTR PAR3[SI]
      DEC AX
      IMUL AX,2
      ADD DI,AX
      MOV AL,192
      MOV AH,7
      MOV ES:[DI],AX
      MOV DI,WORD PTR PAR2[SI]
      DEC DI
      IMUL DI,160
      MOV AX,WORD PTR PAR4[SI]
      DEC AX
      IMUL AX,2
      ADD DI,AX
      MOV AL,217
      MOV AH,7
      MOV ES:[DI],AX
;---------------------áÄÉéãéÇéä Ç éäçÖ----------------------------------------
      XOR SI,SI
      XOR DI,DI
      MOV DI,WORD PTR PAR1[SI]
      DEC DI
      IMUL DI,160
      MOV AX,WORD PTR PAR3[SI]
      DEC AX
      IMUL AX,2
      ADD DI,AX
      ADD DI,42 ;ëåÖôÖçàÖ ìÜÖ éí çÄóÄãÄ íÖäìôÖÉé éäçÄ
      MOV CX,21
      LEA SI,FILE_OKNO
      FILE_OKNO_CIKL:                 
                     MOV AL,BYTE PTR [SI]
                     MOV AH,7
                     MOV ES:[DI],AX
                     ADD DI,2
                     INC SI
      LOOP FILE_OKNO_CIKL
      XOR SI,SI
      MOV AL,BYTE PTR PAR6[SI]
      OR AL,30H
      MOV AH,7
      MOV ES:[DI],AX
NET_RAM:    
      ;-------------------èêéêàëéÇäÄ èêéäêìíäà--------------------------------
      CALL CLOSE_WINDOW
RET
WINDOW ENDP
;-----------------------------------------------------------------------------
END
