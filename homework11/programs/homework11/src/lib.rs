use anchor_lang::prelude::*;

declare_id!("TgPJsUrHrbJuXbwgQwnwNYe56qSLBE19wFpuytgPdvM");

#[program]
pub mod homework11 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.account;
        account.balance = 100;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub account: Account<'info, BalanceAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct BalanceAccount{
    pub balance: u64
}