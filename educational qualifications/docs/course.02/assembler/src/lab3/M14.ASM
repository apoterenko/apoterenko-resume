;-----------------------------------------------------------------------------
;-------------------åéÑìãú, éíÇÖóÄûôàâ áÄ áÄäêõíàÖ ÄäíàÇçéÉé éäçÄ-------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 ;----------------------------------------------------------------------------
 GLOBAL ANTICD:WORD
 GLOBAL RAM1:WORD
 GLOBAL RAM2:WORD
 GLOBAL RAM3:WORD
 ;----------------------------------------------------------------------------
 GLOBAL PAR1:WORD
 GLOBAL PAR2:WORD
 GLOBAL PAR3:WORD
 GLOBAL PAR4:WORD
 GLOBAL PAR5:BYTE
 ;----------------------------------------------------------------------------
 GLOBAL FLEG:WORD
 GLOBAL TUTOR:PROC
.CODE
 EXTRN RAMA:NEAR
 EXTRN WINDOW_ZAGOLOBOK:NEAR
 EXTRN USER:NEAR
;-----------------------íÖãé åéÑìãü-------------------------------------------
TUTOR PROC
         ;--------------------------------------------------------------------
         MOV FLEG,0
         PUSH BX
         ADD BX,4
         CMP BX,[DI+4]
         POP BX
         JLE NET_CLOSE_WINDOW
         ;-------------------
         PUSH BX
         CMP BX,[DI+4]
         POP BX
         JGE NET_CLOSE_WINDOW
         ;-------------------
         CMP DX,[DI+2]
         JL NET_CLOSE_WINDOW
         ;------------------
         CMP DX,[DI+2]
         JG NET_CLOSE_WINDOW
         ;---------------------ÑÄ, áÄäêõÇÄÖå éäçé-----------------------------
         DEC ANTICD
         MOV AX,2  ;éáçÄóÄÖí,óíé åõ áÄäêõãà éäçé
         MOV [DI+20],AX
         MOV FLEG,1
         PUSH DI
         MOV PAR1,3
         MOV PAR2,24
         MOV PAR3,2
         MOV PAR4,79
         MOV PAR5,0
         CALL WINDOW_ZAGOLOBOK
         MOV RAM1,160
         MOV RAM2,78
         MOV RAM3,22     
         CALL RAMA
         CALL USER
         POP DI
         ;--------------------------------------------------------------------
         NET_CLOSE_WINDOW:RET
TUTOR ENDP
;-----------------------------------------------------------------------------
END
