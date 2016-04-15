.MODEL SMALL
.STACK 100H
.DATA
 GLOBAL FLAGG:WORD
 GLOBAL MAS:WORD
 GLOBAL CD:WORD
 GLOBAL PROBERKA_BCE_OKNA_CLOSE:PROC
.CODE
;-----------------------------------------------------------------------------
PROBERKA_BCE_OKNA_CLOSE PROC
                         PUSH SI
                         PUSH DI
                         PUSH CX
                         MOV FLAGG,0
                         LEA SI,MAS
                         MOV CX,CD
                         CIKL_MAS_OLD:
                                  MOV DI,[SI]
                                  MOV AX,1
                                  CMP [DI+20],AX
                                  JE NET_FLAGG
                                  ADD SI,2
                         LOOP CIKL_MAS_OLD
                         MOV FLAGG,1
                         ;----------------------------------------------------
                         NET_FLAGG:
                         POP CX
                         POP DI
                         POP SI
                         RET
PROBERKA_BCE_OKNA_CLOSE ENDP
;-----------------------------------------------------------------------------
END
