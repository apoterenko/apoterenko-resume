.MODEL SMALL
.STACK 100H
 ;------------------------------OKNO------------------------------------------
 OKNO STRUC
 X1 DW 0                   ;[DI]
 Y1 DW 0                   ;[DI+2] 
 X2 DW 0                   ;[DI+4]     
 Y2 DW 0                   ;[DI+6]
 COLOR DW 30               ;[DI+8]                            
 NUMBER DW 0               ;[DI+10]
 CURX DW 1                 ;[DI+12] - Ž‹Ž†…ˆ… Š“‘Ž€ X ‚ ‘€ŒŽŒ €—€‹…
 CURY DW 1                 ;[DI+14] - Ž‹Ž†…ˆ… Š“‘Ž€ Y ‚ ‘€ŒŽŒ €—€‹…
 BUF DW 0                  ;[DI+16] - ‘Œ…™…ˆ… ‚ “”……
 POLOGENEI_KURSORA DW 0    ;[DI+18] - Ž‹Ž†…ˆ… Š“‘Ž€ ‚ ŽŠ…
 OPEN_OR_CLOSE_WINDOW DW 0 ;[DI+20]    
 OKNO ENDS
 ;----------------------------------------------------------------------------
.DATA
 GLOBAL MAS1:OKNO
 GLOBAL PROCEDURE_CURSOR:PROC
.CODE
 EXTRN PROCEDURE_MAS:NEAR
;-----------------------------------------------------------------------------
PROCEDURE_CURSOR PROC
                 CALL PROCEDURE_MAS
                 XOR CL,CL
                 MOV AX,[DI]
                 MOV BX,[DI+2]
                 MOV DX,[DI+18]
                 ;--------------
                 CIKL:
                        CMP DX,63
                        JLE ALLI
                        SUB DX,63
                        INC CL
                 JMP CIKL
                 ALLI:
                 ADD BL,CL
                 ADD AL,DL
                 MOV DH,BL
                 MOV DL,AL
                 MOV AX,0200H
                 XOR BX,BX
                 INT 10H
                 RET
PROCEDURE_CURSOR ENDP
;-----------------------------------------------------------------------------
END
