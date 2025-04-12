use anchor_lang::prelude::*;

declare_id!("G1tPAmtbiMY2Mso1iK9txUxVAJYxkhoLU9JdTP9pEKDd");

#[program]
pub mod hello_world_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
