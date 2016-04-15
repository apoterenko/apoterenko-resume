;-----------------------------------------------------------------------------
;-----------------ŒŽ„“‹œ ‚›„…‹…ˆŸ Ž‹…‰ ˆ ……Œ…™…ˆˆ Œ›˜ˆ-----------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 GLOBAL POLE_AH:BYTE
 GLOBAL SW:WORD
 GLOBAL POLE_DI:WORD
 GLOBAL POLE:PROC
.CODE
;-----------------------------’…‹Ž Ž–…„“›----------------------------------
POLE PROC
      ;-----------------’…‹Ž Ž–…„“›----------------------------------------
      MOV AH,POLE_AH
      MOV DI,POLE_DI
      MOV CX,SW
      POLE_CIKL:
                MOV AL,[SI]
                MOV ES:[DI],AX
                ADD DI,2
                INC SI
      LOOP POLE_CIKL
      ;-----------------------------------------------------------------------
      RET
POLE ENDP
END



