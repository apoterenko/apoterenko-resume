;-----------------------------------------------------------------------------
;-------------ëéïêÄçÖçàÖ ëéÑÖêÜàåéÉé éäçÄ Ç îÄâãÖ-----------------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 GLOBAL CD:WORD
 GLOBAL FLAG_SAVE:BYTE
 GLOBAL PAR1:WORD
 GLOBAL PAR2:WORD
 GLOBAL PAR3:WORD
 GLOBAL PAR4:WORD
 GLOBAL PAR5:BYTE
 GLOBAL RAM1:WORD
 GLOBAL RAM2:WORD
 GLOBAL RAM3:WORD
 GLOBAL SAVE_WINDOW:PROC
.386
.CODE
 EXTRN WINDOW_ZAGOLOBOK:NEAR
 EXTRN RAMA:NEAR
 EXTRN USER:NEAR
;-----------------------------------------------------------------------------
SAVE_WINDOW PROC
        MOV FLAG_SAVE,1
        ;---------------------------------------------------------------------
        MOV AX,0B800H
        MOV ES,AX
        MOV AX,@DATA
        MOV DS,AX
        ;---------------------ëçÄóÄãÄ ÇëÖ ãàòçÖÖ ìÅàêÄÖå----------------------
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
        ;--------------êàëìÖå íé óíé çÖéÅïéÑàåé-------------------------------
        CMP CD,1
        JL NET_USER
        CALL USER
        NET_USER:
        ;---------
        MOV PAR1,8
        MOV PAR2,12
        MOV PAR3,15
        MOV PAR4,65
        MOV PAR5,120
        CALL WINDOW_ZAGOLOBOK
        ;---------------------------------------------------------------------
        MOV AX,PAR1
        DEC AX
        IMUL AX,160
        MOV BX,PAR3
        DEC BX
        IMUL BX,2
        ADD AX,BX
        ;----------
        MOV RAM1,AX
        MOV RAM2,50
        MOV RAM3,4     
        CALL RAMA
        ;---------------------------------------------------------------------
        JMP RUT@
        SAVE@ DB 'SAVE:[...........................................]'    
        ES_OR_CANCEL DB 'OK                    CANCEL'
        MENU_SAVE DB 'SAVE OF THE FILE'
        RUT@:
        ;----------------èÖóÄíú çÄ ùäêÄç àåÖçà îÄâãÄ--------------------------       
        MOV AX,PAR1
        IMUL AX,160
        MOV BX,PAR3
        IMUL BX,2
        ADD AX,BX
        MOV DI,AX
        MOV CX,50
        ;---------------------------------------------------------------------
        PUSH DS
        MOV AX,@CODE
        MOV DS,AX
        LEA SI,SAVE@
        CIKL_SAVE_WINDOW:
                        MOV AL,DS:[SI]
                        MOV AH,120
                        MOV ES:[DI],AX
                        INC SI
                        ADD DI,2
        LOOP CIKL_SAVE_WINDOW
        POP DS
        ;---------------èÖóÄíú áÄÉéãéÇäÄ éäçÄ---------------------------------
        MOV AX,PAR1
        DEC AX
        IMUL AX,160
        MOV BX,PAR3
        DEC BX
        IMUL BX,2
        ADD AX,BX
        ADD AX,36
        MOV DI,AX
        MOV CX,16
        ;---------------------------------------------------------------------
        PUSH DS
        MOV AX,@CODE
        MOV DS,AX
        LEA SI,MENU_SAVE
        CIKL_SAVE_WINDOW@:
                        MOV AL,DS:[SI]
                        MOV AH,7
                        MOV ES:[DI],AX
                        INC SI
                        ADD DI,2
        LOOP CIKL_SAVE_WINDOW@
        POP DS
        ;--------------------èÖóÄíú ÑÄ àãà éíåÖçÄ-----------------------------
        MOV AX,PAR1
        ADD AX,2
        IMUL AX,160
        MOV BX,PAR3
        DEC BX
        IMUL BX,2
        ADD AX,BX
        ADD AX,28
        MOV DI,AX
        MOV CX,28
        ;---------------------------------------------------------------------
        PUSH DS
        MOV AX,@CODE
        MOV DS,AX
        LEA SI,ES_OR_CANCEL
        CIKL_SAVE_WINDOW@@:
                        MOV AL,DS:[SI]
                        MOV AH,120
                        MOV ES:[DI],AX
                        INC SI
                        ADD DI,2
        LOOP CIKL_SAVE_WINDOW@@
        POP DS
        RET
SAVE_WINDOW ENDP
;-----------------------------------------------------------------------------
END
