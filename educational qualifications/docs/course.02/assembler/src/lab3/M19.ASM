;-----------------------------------------------------------------------------
;--------------ŒŽ„“‹œ, ‘Ž‡„€ž™ˆ‰ Žš…Š’ - ŽŠŽ--------------------------------
;-----------------------------------------------------------------------------
.MODEL SMALL
.STACK 100H
.DATA
 ;----------------------------------------------------------------------------
 Xo1 EQU 3
 Yo1 EQU 3
 Xo2 EQU 67
 Yo2 EQU 15
 MASS EQU 693 
 DELTAX EQU 1
 DELTAY EQU 1
 ;----------------------------------------------------------------------------
 GLOBAL CD:WORD
 GLOBAL XYMAS:WORD
 GLOBAL BUFQ:WORD
 GLOBAL MAS:WORD
 GLOBAL CD1:WORD
 GLOBAL CD2:WORD
 GLOBAL R:WORD
 GLOBAL NEW_WINDOW:PROC
.CODE
;----------------------’…‹Ž ŒŽ„“‹Ÿ--------------------------------------------
NEW_WINDOW PROC
            ;---------------‡€Ž‘ˆŒ ‘Œ…™…ˆ… Ž’Ž‘ˆ’…‹œŽ €—€‹€ ‘…ƒŒ…’€-----
            MOV DI,R        
            ;---------------‡€Ž‹…ˆ… ŠŽŽ„ˆ€’€Œˆ ŽŠŽ----------------------
            MOV AX,CD1
            ADD AX,Xo1
            MOV [DI],AX     
            ;------------
            MOV AX,CD2
            ADD AX,Yo1
            MOV [DI+2],AX   
            ;------------
            MOV AX,CD1
            ADD AX,Xo2
            MOV [DI+4],AX   
            ;------------
            MOV AX,CD2
            ADD AX,Yo2
            MOV [DI+6],AX   
            ;------------
            MOV AX,CD
            MOV [DI+10],AX  
            ;------------
            MOV AX,1
            MOV [DI+20],AX ;ŽŒ…—€…Œ ŽŠŽ Š€Š Ž’Š›’Ž… 
            ;------------
            MOV AX,BUFQ
            MOV [DI+16],AX
            ADD BUFQ,MASS
            ;--------------‡€…‘…ˆ… ‘Œ…™…ˆŸ ‚ Œ€‘‘ˆ‚ ˆŽˆ’…’Ž‚------------
            XOR BP,BP
            LEA SI,MAS                  
            ADD SI,XYMAS             
            MOV [SI],DI
            ;-----------------------------------------------------------------
            ADD XYMAS,2                 
            ;---------------…Ž€‡“…Œ ŠŽŽ„ˆ€’›----------------------------
            MOV AX,CD1
            ADD AX,DELTAX
            MOV CD1,AX
            MOV AX,CD2
            ADD AX,DELTAY
            MOV CD2,AX
            XOR SI,SI
            RET
NEW_WINDOW ENDP
;-----------------------------------------------------------------------------
END
