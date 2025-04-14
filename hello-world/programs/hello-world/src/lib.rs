use anchor_lang::prelude::*;

declare_id!("6XE588tEtwBez4M7TZrM5VDoVu1x97bkWeQQk3nhi6at");

#[program]
pub mod hello_world {
    use super::*;

    pub fn hello_world(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello world, from Solana smart contract!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
