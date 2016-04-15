;-----------------------------------------------------------------------------
;-----------------------------------------------------------------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 GLOBAL RAM1:WORD
 GLOBAL RAM2:WORD
 GLOBAL RAM3:WORD
 GLOBAL STIR_FILE:PROC
.CODE
 EXTRN RAMA:NEAR
;-----------------------------------------------------------------------------
STIR_FILE PROC
           MOV AX,0B800H
           MOV ES,AX
           MOV DI,162
           MOV CX,7
           CIKL_STIR_FILE:
                  PUSH CX
                  MOV CX,20
                  PUSH DI
                  CIKL_STIR_FILE@:
                             MOV AL,20H
                             MOV AH,0H
                             MOV ES:[DI],AX
                             INC SI
                             ADD DI,2
                  LOOP CIKL_STIR_FILE@
                  POP DI
                  ADD DI,160
                  POP CX
           LOOP CIKL_STIR_FILE
           ;----------------ÑéêàëéÇäÄ êÄåõ------------------------------------
           MOV RAM1,160
           MOV RAM2,78
           MOV RAM3,22     
           CALL RAMA
           RET
STIR_FILE ENDP
;-----------------------------------------------------------------------------
END
