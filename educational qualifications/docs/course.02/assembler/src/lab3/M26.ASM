;-----------------------------------------------------------------------------
;--------------------èêéñÖÑìêÄ éíäêõíàü îÄâãÄ---------------------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 GLOBAL CD:WORD
 GLOBAL FLAG_OPEN:BYTE
 GLOBAL PAR1:WORD
 GLOBAL PAR2:WORD
 GLOBAL PAR3:WORD
 GLOBAL PAR4:WORD
 GLOBAL PAR5:BYTE
 GLOBAL RAM1:WORD
 GLOBAL RAM2:WORD
 GLOBAL RAM3:WORD
 GLOBAL OPEN_WINDOW:PROC
.386
.CODE
 EXTRN WINDOW_ZAGOLOBOK:NEAR
 EXTRN USER:NEAR
 EXTRN RAMA:NEAR
;-----------------------------------------------------------------------------
OPEN_WINDOW PROC
        MOV FLAG_OPEN,1
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
        JMP RUT
        NAME@ DB 'OPEN:[...........................................]'    
        MENU_OPEN DB 'OPEN OF THE FILE'
        ES_OR_CANCEL DB 'OK                    CANCEL'
        RUT:
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
        LEA SI,NAME@
        CIKL_OPEN_WINDOW:
                        MOV AL,DS:[SI]
                        MOV AH,120
                        MOV ES:[DI],AX
                        INC SI
                        ADD DI,2
        LOOP CIKL_OPEN_WINDOW
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
        LEA SI,MENU_OPEN
        CIKL_OPEN_WINDOW@:
                        MOV AL,DS:[SI]
                        MOV AH,7
                        MOV ES:[DI],AX
                        INC SI
                        ADD DI,2
        LOOP CIKL_OPEN_WINDOW@
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
        CIKL_OPEN_WINDOW@@:
                        MOV AL,DS:[SI]
                        MOV AH,120
                        MOV ES:[DI],AX
                        INC SI
                        ADD DI,2
        LOOP CIKL_OPEN_WINDOW@@
        POP DS
        RET
OPEN_WINDOW ENDP
;-----------------------------------------------------------------------------
END
