;-----------------------------------------------------------------------------
;------------------Ž‘Ž‚Ž‰ ŒŽ„“‹œ ‚‚Ž„€ ’…Š‘’€ ‚ €Ž—…… ŽŠŽ----------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
 ;----------------------------------------------------------------------------
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
 GLOBAL KAX:WORD
 GLOBAL MAS1:OKNO
 GLOBAL PRED_AL:BYTE
 GLOBAL TEC_AH:BYTE
 GLOBAL TEC_AL:BYTE
 GLOBAL BUFER:WORD
 GLOBAL BBOD_WINDOW_USER:PROC
 ;-------Œ€Š‘ˆŒ€‹œŽ… ŠŽ‹ˆ—…‘’‚Ž ‘ˆŒ‚Ž‹Ž‚ ‚‚Ž„ˆŒ›• ‚ €Ž—…… ŽŠŽ-------------
 KOL_SIMBOLOV_STROKA_MAX EQU 63           
.CODE
 EXTRN PROCEDURE_MAS:NEAR
 EXTRN PROCEDURE_CURSOR:NEAR
 EXTRN TEXT:NEAR
;-----------------------------------------------------------------------------
BBOD_WINDOW_USER PROC
                     ;--------------------------------------------------------
                     CALL PROCEDURE_MAS
                     LEA SI,BUFER
                     ADD SI,[DI+16]                         ;[DI+16]=ŠŽ‘’€’€
                     ;--------------------------------------------------------
                     ;---------…‘‹ˆ ž‡… €†€‹ ESC----------------------------
                     ;--------------------------------------------------------
                     CMP TEC_AL,27
                     JNE NET_27
                     JMP NEAR:EXIT_USER
                     NET_27:
                     ;--------------------------------------------------------
                     ;---------…‘‹ˆ ž‡… €†€‹ ENTER--------------------------
                     ;--------------------------------------------------------
                     CMP TEC_AH,72
                     JE EXT1
                     CMP TEC_AH,75
                     JE EXT2
                     CMP TEC_AH,77
                     JE EXT3
                     CMP TEC_AH,80
                     JE EXT4
                     JMP OK_USER
                     ;------------------ž‡… €†€‹ Š‹€‚ˆ˜“ ‚ˆ‡---------------
                     EXT4:
                     MOV AX,[DI+18]
                     ADD AX,63
                     CMP AX,693
                     JGE NET_DOWN
                     MOV [DI+18],AX
                     NET_DOWN:
                     JMP NEAR:EXIT_USER
                     ;------------------ž‡… €†€‹ Š‹€‚ˆ˜“ ‚‚…•--------------
                     EXT1:
                     MOV AX,[DI+18]
                     SUB AX,63
                     CMP AX,0
                     JL NET_UP
                     MOV [DI+18],AX
                     NET_UP:
                     JMP NEAR:EXIT_USER
                     ;------------------ž‡… €†€‹ Š‹€‚ˆ˜“ ‚‹…‚Ž--------------
                     EXT2:
                     MOV AX,[DI+18]
                     DEC AX
                     CMP AX,0
                     JL NET_BLEBO
                     MOV [DI+18],AX
                     NET_BLEBO:
                     JMP NEAR:EXIT_USER
                     ;------------------ž‡… €†€‹ Š‹€‚ˆ˜“ ‚€‚Ž-------------
                     EXT3:
                     MOV AX,[DI+18]
                     INC AX
                     CMP AX,693
                     JGE NET_BPRABO
                     MOV [DI+18],AX
                     NET_BPRABO:
                     JMP NEAR:EXIT_USER
                     ;--------------------ŽŒ€‹œ›‰ ‚‚Ž„---------------------
                     OK_USER:
                     CMP TEC_AL,13
                     JNE NET_ENTER
                     ;--------------------------------------------------------
                     MOV AX,[DI+18]
                     PUSH AX
                     CIKL_FTOR:
                               CMP AX,KOL_SIMBOLOV_STROKA_MAX
                               JE ES_STOR
                               CMP AX,KOL_SIMBOLOV_STROKA_MAX
                               JL ES_FTOR
                               SUB AX,KOL_SIMBOLOV_STROKA_MAX
                     JMP CIKL_FTOR
                     ;----------Š“‘Ž ŽŠ€‡€‹‘Ÿ ‚ ŠŽ–… ŽŠ€ ˆ‹ˆ ‚€—€‹…------
                     ES_STOR:
                     POP AX
                     MOV KAX,AX
                     ;---------
                     MOV AL,TEC_AL
                     CMP PRED_AL,AL
                     JNE NET_PRED_AL
                     ;---------------Š“‘Ž ŽŠ€‡€‹‘Ÿ ‚€—€‹…------------------
                     MOV AX,KAX
                     ADD AX,KOL_SIMBOLOV_STROKA_MAX
                     ;-----------…‘‹ˆ … ‚›•Ž„ˆ’ ˆ‡ „ˆ€€‡Ž€-----------------
                     CMP AX,693
                     JGE NET_FTOR@
                     MOV [DI+18],AX
                     NET_FTOR@:
                     ;-----------
                     NET_PRED_AL:
                     JMP NEAR:ES_BS
                     ;-----‚‘… Ž‘’€‹œ›… ‘‹“—€ˆ €‘Ž‹Ž†…ˆŸ Š“‘Ž€----------
                     ES_FTOR:
                     MOV BX,AX          ;BX=€‡ˆ–€ Œ…†„“ Ž‹Ž†…ˆ…Œ Š“‘Ž€ ˆ
                             ;€—€‹ŽŒ ‘’ŽŠˆ (’…Š“™…‰ ‘’ŽŠˆ 2 ˆ‹ˆ 4 €ˆŒ…)                     
                     POP AX
                     MOV DX,KOL_SIMBOLOV_STROKA_MAX
                     SUB DX,BX
                     ADD AX,DX
                     ;-----------…‘‹ˆ … ‚›•Ž„ˆ’ ˆ‡ „ˆ€€‡Ž€-----------------
                     CMP AX,693
                     JGE NET_FTOR
                     MOV [DI+18],AX
                     NET_FTOR:
                     ;--------
                     JMP ES_BS
                     ;-----------------Ž‚…Š€ € BS-------------------------
                     NET_ENTER:
                     CMP TEC_AL,8
                     JNE NET_BS
                     ;--------------------------------------------------------
                     ;---------…‘‹ˆ ž‡… €†€‹ BS-----------------------------
                     ;--------------------------------------------------------
                     MOV AX,[DI+18]
                     CMP AX,1
                     JL ES_BS                 ;…‘‹ˆ “„€‹Ÿ’œ …Š“„€-“‘’Ž… ŽŠŽ
                     ;--------------------------------------------------------
                     ADD SI,[DI+18]
                     DEC SI
                     ;-------------
                     MOV AL,20H
                     MOV DS:[SI],AL                    
                     ;-------------
                     MOV AX,[DI+18]
                     DEC AX
                     MOV [DI+18],AX
                     ;-------------
                     JMP ES_BS
                     ;--------------------------------------------------------
                     ;--------------------------------------------------------
                     ;--------------------------------------------------------
                     NET_BS:
                     MOV AX,[DI+18]
                     CMP AX,693
                     JE ES_BS
                     ;--------------------------------------------------------
                     ADD SI,[DI+18]                  ;[DI+18]=ŒŽ†…’ ˆ‡Œ…Ÿ’œ‘Ÿ
                     MOV AX,[DI+18]
                     INC AX
                     MOV [DI+18],AX
                     ;-------------
                     MOV AL,TEC_AL
                     MOV DS:[SI],AL                    
                     ;--------------------------------------------------------
                     ES_BS:CALL TEXT
                           MOV AL,TEC_AL
                           MOV PRED_AL,AL
                     EXIT_USER:
                     CALL PROCEDURE_CURSOR
                     RET
BBOD_WINDOW_USER ENDP
;-----------------------------------------------------------------------------
END
