;-----------------------------------------------------------------------------
;
;
;
;                  Žƒ€ŒŒ€, “‘’€€‚‹ˆ‚€ž™€Ÿ Ž‘ € „ˆ‘Š
;
;
;
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100h
.CODE
;-----------------------------------------------------------------------------
START:
    ;-------------------------------------------------------------------------
    JMP NEAR:DATA
             BUFER  DB 512 DUP (0)
             BUFER2 DB 29184 DUP (0)
             NAMER1 DB 'D:\TASM\BIN\OS.COM',0    
             NAMER2 DB 'D:\TASM\BIN\ZAGR.COM',0 
             DECK EQU 29184
             DECK2 EQU 353
             JI DB 0
             J DW 0
             CXX DW 0
    DATA:
    ;-------------------------------------------------------------------------
    MOV AX,@CODE
    MOV DS,AX        
    ;-----------
    MOV AX,3D00H
    LEA DX,CS:NAMER2
    XOR CX,CX
    INT 21H
    PUSH AX
    POP BX
    ;-----------
    MOV AX,3F00H
    MOV CX,DECK2
    LEA DX,CS:BUFER  ;‡€…‘‹ˆ ‚ “”… €‡Œ… COM-”€‰‹€
    INT 21H
    ;-------------ŽŠ€‡€‹ˆ, —’Ž ‘ „ˆ‘Š€ …Ž•Ž„ˆŒŽ ƒ“‡ˆ’‘Ÿ-------------------
    LEA SI,CS:BUFER
    ADD SI,510
    MOV AL,55h
    MOV DS:[SI],AL
    ;-----------
    LEA SI,CS:BUFER
    ADD SI,511
    MOV AL,0AAh
    MOV DS:[SI],AL
    ;-------------------------------------------------------------------------
    ;
    ;
    ;                     Žˆ‘›‚€…Œ …‚›‰ ‘…Š’Ž
    ;
    ;
    ;-------------------------------------------------------------------------
    PUSH DS
    POP ES
    ;-----
    MOV AH,03H
    MOV AL,01
    LEA BX,CS:BUFER
    MOV CH,00
    MOV CL,01
    MOV DH,00
    MOV DL,00
    INT 13H
    ;-------------------------------------------------------------------------
    ;
    ;
    ;                     Žˆ‘›‚€…Œ 8-64 ‘…Š’Ž€
    ;
    ;
    ;-------------------------------------------------------------------------
    MOV AX,3D00H
    LEA DX,CS:NAMER1
    XOR CX,CX
    INT 21H
    PUSH AX
    POP BX
    ;-----------
    MOV CS:JI,8
    MOV CS:J,0
    MOV AX,3F00H
    MOV CX,DECK
    LEA DX,CS:BUFER2  ;‡€…‘‹ˆ ‚ “”… €‡Œ… COM-”€‰‹€
    INT 21H
    MOV CX,11
    CIKL_UST:
          MOV CS:CXX,CX
            MOV AH,03H
            MOV AL,01
            LEA BX,CS:BUFER2
            ADD BX,CS:J
            MOV CH,00
            MOV CL,CS:JI
            INC CS:JI
            ADD CS:J,512
            MOV DH,00
            MOV DL,00
            INT 13H
          MOV CX,CS:CXX
    LOOP CIKL_UST
    ;-------------------------------------------------------------------------
    MOV CX,18     ;€˜€ Ž‘ ‡€ˆŒ€…’ 57 ‘…Š’ŽŽ‚ (Ÿ„Ž + €ŒŸ’œ)
    MOV JI,1
    CIKL_UST1:
          MOV CS:CXX,CX
            MOV AH,03H
            MOV AL,01
            LEA BX,CS:BUFER2
            ADD BX,CS:J
            MOV CH,01
            MOV CL,CS:JI
            INC CS:JI
            ADD CS:J,512
            MOV DH,00
            MOV DL,00
            INT 13H
          MOV CX,CS:CXX
    LOOP CIKL_UST1
    ;-------------------------------------------------------------------------
    MOV CX,18     ;€˜€ Ž‘ ‡€ˆŒ€…’ 57 ‘…Š’ŽŽ‚ (Ÿ„Ž + €ŒŸ’œ)
    MOV JI,1
    CIKL_UST2:
           MOV CS:CXX,CX
            MOV AH,03H
            MOV AL,01
            LEA BX,CS:BUFER2
            ADD BX,CS:J
            MOV CH,02
            MOV CL,CS:JI
            INC CS:JI
            ADD CS:J,512
            MOV DH,00
            MOV DL,00
            INT 13H
          MOV CX,CS:CXX
    LOOP CIKL_UST2
    ;-------------------------------------------------------------------------
    MOV CX,10     ;€˜€ Ž‘ ‡€ˆŒ€…’ 57 ‘…Š’ŽŽ‚ (Ÿ„Ž + €ŒŸ’œ)
    MOV JI,1
    CIKL_UST3:
          MOV CS:CXX,CX
            MOV AH,03H
            MOV AL,01
            LEA BX,CS:BUFER2
            ADD BX,CS:J
            MOV CH,03
            MOV CL,CS:JI
            INC CS:JI
            ADD CS:J,512
            MOV DH,00
            MOV DL,00
            INT 13H
          MOV CX,CS:CXX
    LOOP CIKL_UST3
;-----------------------------------------------------------------------------
EXIT:
    MOV AX,4C00H
    INT 21H
END START


