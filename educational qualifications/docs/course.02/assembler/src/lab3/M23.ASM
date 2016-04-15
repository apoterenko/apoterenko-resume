;-----------------------------------------------------------------------------
;-----------------Ž–…„“€ ‚‚Ž„€ ‚ Œ…ž DELETE-------------------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 KOL_SIMBOL_MENU EQU 41
 GLOBAL BUFER_DELETE:BYTE
 ;----------------------------------------------------------------------------
 GLOBAL CD:WORD
 GLOBAL RAM1:WORD
 GLOBAL RAM2:WORD
 GLOBAL RAM3:WORD
 ;----------------------------------------------------------------------------
 GLOBAL RI_TEC:WORD
 GLOBAL PAR1:WORD
 GLOBAL PAR2:WORD
 GLOBAL PAR3:WORD
 GLOBAL PAR4:WORD
 GLOBAL PAR5:BYTE
 ;----------------------------------------------------------------------------
 GLOBAL FLAG_DELETE:BYTE
 GLOBAL TEC_AH:BYTE
 GLOBAL TEC_AL:BYTE
 GLOBAL FLAG_DELETE_ESC:BYTE
 GLOBAL FLAG_DELETE_OK:BYTE
 GLOBAL BBOD_WINDOW_DELETE:PROC
.CODE
 EXTRN RAMA:PROC
 EXTRN USER:PROC
 EXTRN WINDOW_ZAGOLOBOK:PROC
;----------------------------’…‹Ž ŒŽ„“‹Ÿ--------------------------------------
BBOD_WINDOW_DELETE PROC
                 ;---------------Ž‚…Š€ € €†€’ˆ… € OK---------------------
                 CMP FLAG_DELETE_OK,1
                 JNE NET_ES_DELETE_ENTER
                 JMP NEAR:ES_DELETE_ENTER
                 NET_ES_DELETE_ENTER:
                 ;---------------Ž‚…Š€ € €†€’ˆ… € ESC--------------------
                 CMP FLAG_DELETE_ESC,1
                 JE NET_NET_ESC_MOUSE
                 JMP NEAR:NET_ESC_MOUSE
                 NET_NET_ESC_MOUSE:
                 ;---------------„€, ž‡… €†€‹ ESC Œ›˜œž---------------------
                 JMP NEAR:EXIT_DELETE@                         ;Ž‘’Ž ‚›•Ž„ˆŒ
                 ;------------------------------------------------------------
                 NET_ESC_MOUSE:
                 CMP TEC_AL,20H
                 JE EXIT
                 CMP TEC_AH,72
                 JE EXIT 
                 CMP TEC_AH,75
                 JE EXIT
                 CMP TEC_AH,77
                 JE EXIT
                 CMP TEC_AH,80
                 JE EXIT
                 JMP NET_EXIT
                 EXIT:RET
                 ;------------------------------------------------------------
                 NET_EXIT:
                 CMP TEC_AL,27
                 JE NET_NET_ESC
                 JMP NEAR:NET_ESC
                 NET_NET_ESC:
                 ;---------------„€, ž‡… €†€‹ ESC---------------------------
                 MOV FLAG_DELETE,0
                 JMP NEAR:EXIT_DELETE@                         ;Ž‘’Ž ‚›•Ž„ˆŒ
                 ;-----------------Ž‚…Š€ € ENTER--------------------------
                 NET_ESC:
                 CMP TEC_AL,13
                 JNE NET_NET_ES_DELETE_ENTER
                 JMP NEAR:ES_DELETE_ENTER
                 NET_NET_ES_DELETE_ENTER:
                 ;------------------------------------------------------------
                 ;-----------------…’, ž‡… … €†ˆŒ€‹ ENTER-----------------
                 ;-----------------Ž‚…Š€ € BS-----------------------------
                 ;------------------------------------------------------------
                 CMP TEC_AL,8
                 JNE NET_BS_DELETE
                 ;----------------„€, ž‡… €†€‹ BS---------------------------
                 CMP RI_TEC,0
                 JNE NET_EXIT_DELETE            ;…‘‹ˆ “„€‹Ÿ’œ …Š“„€, ’Ž ‚›•Ž„
                 JMP NEAR:EXIT_DELETE
                 NET_EXIT_DELETE:
                 ;------------------------------------------------------------
                 ;----------------ŽŒ€‹œŽ… “„€‹…ˆ…-------------------------
                 ;----------------‡€Ž‹ˆŒ Ž‹… ’Ž—Š€Œˆ-----------------------
                 ;------------------------------------------------------------
                 MOV CX,RI_TEC
                 MOV DI,1326
                 CIKL_DELETE_TOCH:
                          MOV AL,46
                          MOV AH,120
                          MOV ES:[DI],AX
                          ADD DI,2
                          INC SI
                 LOOP CIKL_DELETE_TOCH
                 ;------------------------------------------------------------
                 DEC RI_TEC    ;“Œ…œ˜€…Œ —ˆ‘‹Ž ‘ˆŒ‚Ž‹Ž‚ ‚ ‘’ŽŠ… BUFER_DELETE
                 LEA SI,BUFER_DELETE
                 MOV AX,RI_TEC
                 ADD SI,AX
                 MOV AH,0
                 MOV [SI],AH        ;‡€ˆ‘›‚€…Œ € Œ…‘’Ž …„›„“™…ƒŽ ‘ˆŒ‚Ž‹€ 0
                 ;--------------…‘‹ˆ ‚ŽŽ™… 0 ‘ˆŒ‚Ž‹Ž‚, ’Ž ‚›•Ž„--------------
                 CMP RI_TEC,0
                 JNE NET_NET_EXIT_DELETE
                 JMP NEAR:EXIT_DELETE
                 NET_NET_EXIT_DELETE:
                 ;----------------Ž’Ž€†€…Œ ‘’ŽŠ“ € Š€------------------
                 LEA SI,BUFER_DELETE
                 MOV CX,RI_TEC
                 MOV DI,1326                           ;‘Œ…™…ˆ… ‚ ‚ˆ„…Ž€ŒŸ’ˆ
                 CIKL_DELETE_BS:
                          MOV AL,[SI]
                          MOV AH,120
                          MOV ES:[DI],AX
                          ADD DI,2
                          INC SI
                 LOOP CIKL_DELETE_BS
                 JMP EXIT_DELETE      ;‚›•Ž„ˆŒ Ž‘‹… ‡€ˆ‘ˆ Ž—……„ŽƒŽ ‘ˆŒ‚Ž‹€
                 ;------------------------------------------------------------
                 ;-------ž‡… … €†ˆŒ€‹ BS, ŽŒ€‹œ›‰ ‚‚Ž„------------------
                 ;------------------------------------------------------------
                 NET_BS_DELETE:
                 CMP RI_TEC,KOL_SIMBOL_MENU
                 JL NET_NET_EXIT_DELETE@       ;…‘‹ˆ ‚‚Ž„ˆ’œ …Š“„€,’Ž ‚›•Ž„ˆŒ
                 JMP NEAR:EXIT_DELETE
                 NET_NET_EXIT_DELETE@:
                 ;------------------------------------------------------------
                 LEA SI,BUFER_DELETE
                 MOV AX,RI_TEC
                 ADD SI,AX
                 MOV AH,TEC_AL
                 MOV [SI],AH        ;‡€ˆ‘›‚€…Œ ‘ˆŒ‚Ž‹ ‚ “”… ‚‚Ž„€ ˆŒŸ ”€‰‹€
                 INC RI_TEC
                 ;----------------Ž’Ž€†€…Œ ‘’ŽŠ“ € Š€------------------
                 LEA SI,BUFER_DELETE
                 MOV CX,RI_TEC
                 MOV DI,1326
                 CIKL_DELETE:
                          MOV AL,[SI]
                          MOV AH,120
                          MOV ES:[DI],AX
                          ADD DI,2
                          INC SI
                 LOOP CIKL_DELETE
                 JMP EXIT_DELETE                ;‚›•Ž„ˆŒ, … ‡€’ˆ€Ÿ ŽŠ€ Œ…ž
                 ;------------------------------------------------------------
                 ;------------------------------------------------------------
                 ;------------------ž‡… €†€‹ ENTER--------------------------
                 ;------------------------------------------------------------
                 ;------------------------------------------------------------
                 ES_DELETE_ENTER:
                 ;--------------“„€‹Ÿ…Œ …Ž•Ž„ˆŒ›‰ ”€‰‹----------------------
                 MOV AX,4100H
                 LEA DX,BUFER_DELETE
                 INT 21H
                 ;----------------…‘‹ˆ Žˆ‡Ž˜‹€ Ž˜ˆŠ€-----------------------
                 JAE NET_ERROR
                 ;--------------‚›‚Ž„ Ž˜ˆŠˆ----------------------------------
                 JMP RTUT
                 ERROR DB 'ERROR'
                 RTUT:
                 PUSH DS
                 MOV AX,CS
                 MOV DS,AX
                 LEA SI,ERROR
                 MOV CX,5
                 MOV DI,1516
                 CIKL_ERROR:
                            MOV AH,120
                            MOV AL,DS:[SI]
                            MOV ES:[DI],AX
                            ADD DI,2
                            INC SI
                 LOOP CIKL_ERROR
                 POP DS
                 MOV FLAG_DELETE_OK,0
                 JMP EXIT_DELETE
                 ;------------------”‹€ƒˆ € Œ›˜œ-----------------------------
                 NET_ERROR:
                 MOV FLAG_DELETE_OK,0
                 MOV RI_TEC,0
                 ;----------------Ž—ˆ™€…Œ BUFER_DELETE------------------------
                 MOV CX,KOL_SIMBOL_MENU
                 LEA SI,BUFER_DELETE
                 CIKL_DELETE_BUFER_DELETE:
                                        MOV AX,0
                                        MOV DS:[SI],AX
                                        INC SI
                 LOOP CIKL_DELETE_BUFER_DELETE
                 ;------------------------------------------------------------
                 ;----------------Ž—ˆ™€…Œ Ž’ Œ…ž DELETE----------------------
                 ;------------------------------------------------------------
                 EXIT_DELETE@:
                 ;------------------”‹€ƒˆ € Œ›˜œ-----------------------------
                 MOV RI_TEC,0
                 MOV FLAG_DELETE_ESC,0
                 ;----------------Ž—ˆ™€…Œ BUFER_DELETE------------------------
                 MOV CX,KOL_SIMBOL_MENU
                 LEA SI,BUFER_DELETE
                 CIKL_DELETE_BUFER_DELETE_ESC:
                                        MOV AX,0
                                        MOV DS:[SI],AX
                                        INC SI
                 LOOP CIKL_DELETE_BUFER_DELETE_ESC
                 ;------------------------------------------------------------
                 MOV PAR1,3
                 MOV PAR2,25
                 MOV PAR3,1
                 MOV PAR4,80
                 MOV PAR5,0
                 CALL WINDOW_ZAGOLOBOK
                 MOV RAM1,160
                 MOV RAM2,78
                 MOV RAM3,22     
                 CALL RAMA
                 ;--------
                 CMP CD,1
                 JL NET_USER
                 CALL USER
                 NET_USER:
                 MOV FLAG_DELETE,0               ;ˆ‡€Š ‡€Š›’ˆŸ Œ…ž DELETE
                 ;------------------------------------------------------------
                 ;------------‚›•Ž„ ˆ‡ Ž–…„“› SAVE-------------------------
                 ;------------------------------------------------------------
                 EXIT_DELETE:RET
BBOD_WINDOW_DELETE ENDP
;-----------------------------------------------------------------------------
END
