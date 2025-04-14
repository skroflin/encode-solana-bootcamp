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

    pub fn update_balance(ctx: Context<UpdateBalance>) -> Result<()>{
        let account = &mut ctx.accounts.account;
        if account.balance >= 1000 {
            return Err(ErrorCode::BalanceMaximumReached.into());
        }

        account.balance = account.balance + 100;

        msg!("Balance updated to: {}", account.balance);

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

#[derive(Accounts)]
pub struct UpdateBalance<'info> {
    #[account(mut)]
    pub account: Account<'info, BalanceAccount>,
    pub user: Signer<'info>,
}

#[account]
pub struct BalanceAccount{
    pub balance: u64
}

#[error_code]
pub enum ErrorCode {
    #[msg("Balance maximum reached!")]
    BalanceMaximumReached,
}