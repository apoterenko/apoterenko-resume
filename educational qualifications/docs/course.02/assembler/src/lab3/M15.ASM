;-----------------------------------------------------------------------------
;-----------------åéÑìãú, éíÇÖóÄûôàâ áÄ èÖóÄíú éíäêõíõï éäéç---------------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 ;----------------------------------------------------------------------------
 GLOBAL MAS:WORD
 GLOBAL CD:WORD
 ;----------------------------------------------------------------------------
 GLOBAL PAR1:WORD
 GLOBAL PAR2:WORD
 GLOBAL PAR3:WORD
 GLOBAL PAR4:WORD
 GLOBAL PAR5:BYTE
 GLOBAL PAR6:WORD
 GLOBAL USER:PROC
 ;----------------------------------------------------------------------------
.CODE
 EXTRN WINDOW:PROC
 EXTRN TEXT:PROC
;-----------------------------------------------------------------------------
USER PROC
        MOV CX,CD
        LEA SI,MAS 
        OTOBR_ALL:
                  MOV DI,[SI]
                  ADD SI,2
                  PUSH SI
                  XOR SI,SI
                  MOV AX,[DI]
                  MOV PAR3,AX
                  MOV AX,[DI+4]
                  MOV PAR4,AX
                  MOV AX,[DI+2]
                  MOV PAR1,AX
                  MOV AX,[DI+6]
                  MOV PAR2,AX
                  MOV AX,[DI+8]
                  MOV WORD PTR PAR5[SI],AX
                  MOV AX,[DI+10]
                  MOV PAR6,AX
                  PUSH CX
                  ;-----------------èêéÇÖêäÄ çÄ áÄäêõíéÖ éäçé-----------------
                  MOV AX,2
                  CMP [DI+20],AX
                  JE NET_PROSMOTR
                  ;--------------
                  PUSH DI
                  CALL WINDOW
                  POP DI               
                  CALL TEXT
                  NET_PROSMOTR:
                  ;-----------------------------------------------------------                  
                  POP CX
                  POP SI
        LOOP OTOBR_ALL
        RET
USER ENDP
;-----------------------------------------------------------------------------
END
