;-----------------------------------------------------------------------------
;-------------------------èêéñÖÑìêÄ êàëéÇÄçàü áÄÉéãéÇäÄ-----------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 GLOBAL PAR1:WORD
 GLOBAL PAR2:WORD
 GLOBAL PAR3:WORD
 GLOBAL PAR4:WORD
 GLOBAL PAR5:BYTE
 GLOBAL WINDOW_ZAGOLOBOK:PROC
 Q1 DW 0
 Q2 DW 0
.386
.CODE
;---------------------------íÖãé åéÑìãü---------------------------------------
WINDOW_ZAGOLOBOK PROC
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
CIKL_ZAGOLOBOK:
    MOV BX,WORD PTR PAR4[SI]
    SUB BX,WORD PTR PAR3[SI]  ;-------------------x2-x1-----------------------
    INC BX
    MOV WORD PTR Q1[SI],DI
    MOV WORD PTR Q2[SI],CX
    MOV CX,BX               
    CIKL@_ZAGOLOBOK:
      MOV AL,0ffh
      MOV AH,BYTE PTR PAR5[SI]
      MOV ES:[DI],AX
      ADD DI,2
    LOOP CIKL@_ZAGOLOBOK
    MOV DI,WORD PTR Q1[SI]
    MOV CX,WORD PTR Q2[SI]   
    ADD DI,160
LOOP CIKL_ZAGOLOBOK
      RET
WINDOW_ZAGOLOBOK ENDP
;-----------------------------------------------------------------------------
END
