;-----------------------------------------------------------------------------
;---------------åéÑìãú éíéÅêÄÜÖçàü ÄäíàÇçéÉé éäçÄ-----------------------------
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
 GLOBAL OTOBRAGENIE_ACTIV_WINDOW:PROC
.CODE
 EXTRN WINDOW:NEAR
;-----------------------------------------------------------------------------
OTOBRAGENIE_ACTIV_WINDOW PROC
               MOV AX,[DI]
               MOV PAR3,AX 
               MOV AX,[DI+4]
               MOV PAR4,AX 
               MOV AX,[DI+2]
               MOV PAR1,AX 
               MOV AX,[DI+6]
               MOV PAR2,AX 
               MOV AX,[DI+10]
               MOV PAR6,AX      
               ;----------------èêéÇÖêäÄ çÄ áÄäêõíéÖ éäçé---------------------
               MOV AX,2
               CMP [DI+20],AX
               JE NET_PROSMOTR
               ;-----------------çÖí, éäçé éíäêõíé----------------------------
               PUSH DI
               CALL WINDOW                                  
               POP DI
               ;--------------------------------------------------------------
               NET_PROSMOTR:RET
OTOBRAGENIE_ACTIV_WINDOW ENDP
;-----------------------------------------------------------------------------
END
