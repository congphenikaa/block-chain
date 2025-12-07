module game_guess::guess {
    use std::bcs;

    // 1. Định nghĩa struct giống Pizza (Dùng u16)
    public struct GuessAttempt has store {
        number1: u16,
        number2: u16,
        number3: u16,
        number4: u16,
    }

    public struct GuessBox has key, store {
        id: UID,
        guess: GuessAttempt,
    }

    public struct Flag has key, store {
        id: UID,
        user: address,
        solved_at: u64,
    }

    const EIncorrectGuess: u64 = 0;

    // 2. Hàm Submit (Nhận vào u16)
    #[allow(lint(self_transfer))]
    public fun submit_guess(
        number1: u16, 
        number2: u16, 
        number3: u16, 
        number4: u16, 
        ctx: &mut tx_context::TxContext
    ) {
        let sender = tx_context::sender(ctx);

        let attempt = GuessAttempt {
            number1,
            number2,
            number3,
            number4,
        };
    
        transfer::public_transfer(
            GuessBox { 
                id: object::new(ctx), 
                guess: attempt 
            }, 
            sender
        );
    }

    // 3. Hàm Check (So sánh chuỗi Hex như Pizza)
    #[allow(lint(self_transfer))]
    public fun check_guess(guessbox: &GuessBox, ctx: &mut tx_context::TxContext) {
        // So sánh chuỗi bytes của GuessAttempt với chuỗi bí mật
        // Đáp án: 10, 20, 30, 40 -> x"0a0014001e002800"
        assert!(
            bcs::to_bytes(&guessbox.guess) == x"0a0014001e002800", 
            EIncorrectGuess
        );
        
        transfer::public_transfer(
            Flag {
                id: object::new(ctx),
                user: tx_context::sender(ctx),
                solved_at: tx_context::epoch(ctx),
            }, 
            tx_context::sender(ctx)
        );
    }
}