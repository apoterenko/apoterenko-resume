;-----------------------------------------------------------------------------
;-----------------------------------------------------------------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 ;----------------------------------------------------------------------------
 GLOBAL PAR1:WORD
 GLOBAL PAR2:WORD
 GLOBAL PAR3:WORD
 GLOBAL PAR4:WORD
 GLOBAL PAR5:BYTE
 GLOBAL PAR6:WORD
 ;----------------------------------------------------------------------------
 Q1 DW 0
 Q2 DW 0
 ;----------------------------------------------------------------------------
 GLOBAL WINDOW_STIR:PROC
 ;----------------------------------------------------------------------------
.386
.CODE
;------------------------------’…‹Ž ŒŽ„“‹Ÿ------------------------------------
WINDOW_STIR PROC
    PUSH DI
    MOV AX,0B800H
    MOV ES,AX
    MOV AX,@DATA
    MOV DS,AX
    MOV BX,PAR2
    INC BX
    SUB BX,PAR1  
    MOV CX,BX
    ;----------
    MOV DI,PAR1
    DEC DI
    IMUL DI,160
    MOV BX,PAR3
    IMUL BX,2
    ADD DI,BX
    SUB DI,2
CIKL:
     MOV BX,PAR4
     SUB BX,PAR3 
     INC BX
     MOV Q1,DI
     MOV Q2,CX
     MOV CX,BX               
     CIKL@:
          MOV AL,0FFh
          MOV AH,0
          MOV ES:[DI],AX
          ADD DI,2
     LOOP CIKL@
     MOV DI,Q1
     MOV CX,Q2  
     ADD DI,160
LOOP CIKL
    POP DI
    RET
WINDOW_STIR ENDP
;-----------------------------------------------------------------------------
END
