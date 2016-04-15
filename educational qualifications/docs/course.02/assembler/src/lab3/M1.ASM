.MODEL SMALL
.DATA
 DELETE@ DB 'DELETE............'
 KEEP@ DB 'SAVE..............'
 EXIT@ DB 'EXIT..............'
 OPEN@ DB 'OPEN..............'
 GLOBAL POLE_AH:BYTE
 GLOBAL RW:BYTE
 GLOBAL POLE_DI:WORD
 ;----------------------------------------------------------------------------
 GLOBAL FILE_POLE:PROC
.STACK 100H
.CODE
 EXTRN POLE:NEAR
;---------------------------’…‹Ž ŒŽ„“‹Ÿ---------------------------------------
FILE_POLE PROC
        MOV AX,@DATA
        MOV DS,AX
        ;---------------------------------------------------------------------
        MOV AH,RW
        MOV POLE_AH,AH
        MOV POLE_DI,484
        LEA SI,DELETE@
        CALL POLE
        ;---------------------------------------------------------------------
        MOV AH,RW
        MOV POLE_AH,AH
        MOV POLE_DI,324
        LEA SI,OPEN@
        CALL POLE
        ;---------------------------------------------------------------------
        MOV AH,RW
        MOV POLE_AH,AH
        MOV POLE_DI,644
        LEA SI,KEEP@
        CALL POLE
        ;---------------------------------------------------------------------
        MOV AH,RW
        MOV POLE_AH,AH
        MOV POLE_DI,804
        LEA SI,EXIT@
        CALL POLE
        ;---------------------------------------------------------------------
        RET
FILE_POLE ENDP
;-----------------------------------------------------------------------------
END
