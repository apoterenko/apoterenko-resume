;-----------------------------------------------------------------------------
;---------------------èêéñÖÑìêÄ Ñãü êÄÅéíõ ë èéãüåà---------------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 GLOBAL POLE_AH:BYTE
 GLOBAL POLE_DI:WORD
 GLOBAL POLE_K:WORD
 GLOBAL ACTIV_POLE:PROC 
 GLOBAL PW:BYTE
 CX_POLE DW 0
 OPEN@ DB 'OPEN..............'
 DELETE@ DB 'DELETE............'
 KEEP@ DB 'SAVE..............'
 EXIT@ DB 'EXIT..............'
.CODE
 EXTRN FILE_POLE:NEAR
 EXTRN POLE:NEAR
;-----------------------íÖãé åéÑìãü-------------------------------------------
ACTIV_POLE PROC
        ;---------------------------------------------------------------------
        PUSH CX
        MOV POLE_K,3
        MOV CX_POLE,CX
        MOV CX,4
        CIKL_POLE:
                 CMP CX_POLE,3                                                       
                 JL NET_K
                 CMP CX_POLE,20
                 JG NET_K
                 CMP DX,POLE_K                       
                 JL NET_K
                 CMP DX,POLE_K
                 JG NET_K
                 ;----------ÑÄ - åõ èéèÄãà àåÖççé Ç çìÜçéÖ èéãÖ---------------
                 JMP OK_K
                 NET_K:INC POLE_K
        LOOP CIKL_POLE       
        OK_K:POP CX
        ;---------------------------------------------------------------------
        CMP POLE_K,3
        JNE NET_K3
        ;------------------ÑÄ, ÇõÑÖãüÖå OPEN----------------------------------
        CALL FILE_POLE
        MOV AH,PW
        MOV POLE_AH,AH
        MOV POLE_DI,324
        LEA SI,OPEN@
        CALL POLE
        ;---------------------------------------------------------------------
        NET_K3:
        CMP POLE_K,4
        JNE NET_K4
        ;------------------ÑÄ, ÇõÑÖãüÖå DELETE--------------------------------
        CALL FILE_POLE
        MOV AH,PW
        MOV POLE_AH,AH
        MOV POLE_DI,484
        LEA SI,DELETE@
        CALL POLE
        ;---------------------------------------------------------------------
        NET_K4:
        CMP POLE_K,5
        JNE NET_K5
        ;------------------ÑÄ, ÇõÑÖãüÖå SAVE----------------------------------
        CALL FILE_POLE
        MOV AH,PW
        MOV POLE_AH,AH
        MOV POLE_DI,644
        LEA SI,KEEP@
        CALL POLE
        ;---------------------------------------------------------------------
        NET_K5:
        CMP POLE_K,6
        JNE NET_ONE_PROC
        ;------------------ÑÄ, ÇõÑÖãüÖå EXIT----------------------------------
        CALL FILE_POLE
        MOV AH,PW
        MOV POLE_AH,AH
        MOV POLE_DI,804
        LEA SI,EXIT@
        CALL POLE
        ;---------------------------------------------------------------------
        NET_ONE_PROC:RET
ACTIV_POLE ENDP
;-----------------------------------------------------------------------------
END
