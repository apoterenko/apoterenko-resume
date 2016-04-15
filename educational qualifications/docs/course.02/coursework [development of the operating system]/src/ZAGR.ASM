;-----------------------------------------------------------------------------
;        Žƒ€ŒŒ€, €•Ž„Ÿ™€Ÿ‘Ÿ ‚ …‚ŽŒ ‘…Š’Ž… - ‡€ƒ“‡—ˆŠ OSBT
;-----------------------------------------------------------------------------
.MODEL TINY
.CODE
;-----------------------------------------------------------------------------
    ORG 100H
START:
    ;-------------------------------------------------------------------------
    ;                    ‡€ƒ“‡Š€ Ÿ„€ ‚ €ŒŸ’œ
    ;-------------------------------------------------------------------------
    JMP DATA
      J   DW 0
      JI  DB 0
      STROKA DB 'LOADING OF OS, PLEASE WAIT...' ;29 ‘ˆŒ‚Ž‹Ž‚
    DATA:
    ;-------------------------------------------------------------------------
    ;                   ŽŠ€‡›‚€…Œ Ž–…‘‘ ‡€ƒ“‡Šˆ
    ;-------------------------------------------------------------------------
    MOV AH,00h
    MOV AL,02h
    INT 10h
    MOV AH,02H
    XOR AL,AL
    XOR BX,BX
    MOV DH,100
    MOV DL,0
    INT 10H
    ;-------------------‚›‚Ž„ €„ˆ‘ˆ-----------------------------------------
    MOV AX,0B800h
    MOV ES,AX
    MOV CX,29
    MOV DI,1010
    MOV SI,7B00H+OFFSET STROKA
    PUSH DS
    XOR AX,AX
    MOV DS,AX
    CIL:
        MOV AH,7
        MOV AL,DS:[SI]
        MOV ES:[DI],AX
        ADD DI,2
        INC SI
    LOOP CIL
    POP DS 
    ;-------------------------------------------------------------------------
    MOV AX,0FFFH  ;‡€ƒ“†€…Œ ‚Ž 2 ‘…ƒŒ…’ ‚ €ŒŸ’ˆ 0:10000H = 0FFFH:0010H
    MOV ES,AX
    MOV CX,11     ;€˜€ Ž‘ ‡€ˆŒ€…’ 57 ‘…Š’ŽŽ‚ (Ÿ„Ž + €ŒŸ’œ)
    MOV J,0
    MOV JI,8
    MOV DI,1140
    CIKL_UST:
          PUSH CX
            MOV AH,02H
            MOV AL,01 ;ŠŽ‹ˆ—…‘’‚Ž —ˆ’€…Œ›• ‘…Š’ŽŽ‚
            MOV BX,410H
            ADD BX,J
            ADD J,512
            MOV CH,00 ;„ŽŽ†Š€
            MOV CL,JI ;€—€‹œ›‰ ‘…Š’Ž
            INC JI
            MOV DH,00 ;ƒŽ‹Ž‚Š€
            MOV DL,00 ;„ˆ‘ŠŽ‚Ž„ 0
            INT 13H
          ;-----------------PROGRESSBAR---------------------------------------
          PUSH ES
            MOV AX,0B800h
            MOV ES,AX
            MOV AH,31
            MOV AL,20H
            MOV ES:[DI],AX
            ADD DI,2
          POP ES 
          ;-------------------------------------------------------------------
          POP CX
    LOOP CIKL_UST
    ;-------------------------------------------------------------------------
    MOV CX,18     ;€˜€ Ž‘ ‡€ˆŒ€…’ 57 ‘…Š’ŽŽ‚ (Ÿ„Ž + €ŒŸ’œ)
    MOV JI,1
    CIKL_UST1:
          PUSH CX
            MOV AH,02H
            MOV AL,01 ;ŠŽ‹ˆ—…‘’‚Ž —ˆ’€…Œ›• ‘…Š’ŽŽ‚
            MOV BX,410H
            ADD BX,J
            ADD J,512
            MOV CH,01 ;„ŽŽ†Š€
            MOV CL,JI ;€—€‹œ›‰ ‘…Š’Ž
            INC JI
            MOV DH,00 ;ƒŽ‹Ž‚Š€
            MOV DL,00 ;„ˆ‘ŠŽ‚Ž„ 0
            INT 13H
          ;-----------------PROGRESSBAR---------------------------------------
          PUSH ES
            MOV AX,0B800h
            MOV ES,AX
            MOV AH,31
            MOV AL,20H
            MOV ES:[DI],AX
            ADD DI,2
          POP ES 
          ;-------------------------------------------------------------------
          POP CX
    LOOP CIKL_UST1
    ;-------------------------------------------------------------------------
    MOV CX,18     ;€˜€ Ž‘ ‡€ˆŒ€…’ 57 ‘…Š’ŽŽ‚ (Ÿ„Ž + €ŒŸ’œ)
    MOV JI,1
    CIKL_UST2:
          PUSH CX
            MOV AH,02H
            MOV AL,01 ;ŠŽ‹ˆ—…‘’‚Ž —ˆ’€…Œ›• ‘…Š’ŽŽ‚
            MOV BX,410H
            ADD BX,J
            ADD J,512
            MOV CH,02 ;„ŽŽ†Š€
            MOV CL,JI ;€—€‹œ›‰ ‘…Š’Ž
            INC JI
            MOV DH,00 ;ƒŽ‹Ž‚Š€
            MOV DL,00 ;„ˆ‘ŠŽ‚Ž„ 0
            INT 13H
          ;-----------------PROGRESSBAR---------------------------------------
          PUSH ES
            MOV AX,0B800h
            MOV ES,AX
            MOV AH,31
            MOV AL,20H
            MOV ES:[DI],AX
            ADD DI,2
          POP ES 
          ;-------------------------------------------------------------------
          POP CX
    LOOP CIKL_UST2
    ;-------------------------------------------------------------------------
    MOV CX,10     ;€˜€ Ž‘ ‡€ˆŒ€…’ 57 ‘…Š’ŽŽ‚ (Ÿ„Ž + €ŒŸ’œ)
    MOV JI,1
    CIKL_UST3:
          PUSH CX
            MOV AH,02H
            MOV AL,01 ;ŠŽ‹ˆ—…‘’‚Ž —ˆ’€…Œ›• ‘…Š’ŽŽ‚
            MOV BX,410H
            ADD BX,J
            ADD J,512
            MOV CH,03 ;„ŽŽ†Š€
            MOV CL,JI ;€—€‹œ›‰ ‘…Š’Ž
            INC JI
            MOV DH,00 ;ƒŽ‹Ž‚Š€
            MOV DL,00 ;„ˆ‘ŠŽ‚Ž„ 0
            INT 13H
          ;-----------------PROGRESSBAR---------------------------------------
          PUSH ES
            MOV AX,0B800h
            MOV ES,AX
            MOV AH,31
            MOV AL,20H
            MOV ES:[DI],AX
            ADD DI,2
          POP ES 
          ;-------------------------------------------------------------------
          POP CX
    LOOP CIKL_UST3
    ;-------------------------------------------------------------------------
    ;                        ……•Ž„ € ‡€ƒ“‡—ˆŠ
    ;-------------------------------------------------------------------------
    DB 0EAh
    DD 0FFF0410H
END START



