use anchor_lang::prelude::*;

declare_id!("5Vc5B3psSFCPS9Szgudse8U3PN5wKjpRYBLUVpC5G2GG");

#[program]
pub mod voting_system {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
