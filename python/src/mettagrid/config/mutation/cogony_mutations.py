"""Cogony-specific mutation configs for custom C++ mutations."""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from mettagrid.config.mutation.mutation import Mutation


class CogonyAttackMutation(Mutation):
    """Multi-channel attack with optional strike-back, damage tracking, and death drops."""

    mutation_type: Literal["cogony_attack"] = "cogony_attack"
    channels: list[tuple[str, str]] = Field(description="(attack_resource, defend_resource) pairs")
    health: str = Field(default="coherence")
    damage_tracking: list[str] = Field(default_factory=list)
    strike_back: bool = Field(default=True)
    drop_resource: str = Field(default="", description="Resource to drop on target when killed")
    drop_level: str = Field(default="level", description="Level resource for scaling drop amount")
    drop_multiplier: int = Field(default=10, description="Max drop = level * multiplier")


class CogonyCogRebootMutation(Mutation):
    """Cog reboot: clear reboot, lose one random gear, fill coherence."""

    mutation_type: Literal["cogony_cog_reboot"] = "cogony_cog_reboot"
    health: str = Field(default="coherence")
    reboot: str = Field(default="reboot")
    gear_stats: list[str] = Field(default_factory=list)


class CogonyExtractorRebootMutation(Mutation):
    """Extractor reboot: level up, stat recompute, fill coherence."""

    mutation_type: Literal["cogony_extractor_reboot"] = "cogony_extractor_reboot"
    health: str = Field(default="coherence")
    reboot: str = Field(default="reboot")
    level: str = Field(default="level")
    resist_stats: list[str] = Field(default_factory=list)
    dmg_stats: list[str] = Field(default_factory=list)
    sys_damage_stats: list[str] = Field(default_factory=list)
    coherence_per_level: int = Field(default=20)
    dmg_level_offset: int = Field(default=-3)


class CogonyJunctionRebootMutation(Mutation):
    """Junction reboot: level up, stat recompute, fill coherence."""

    mutation_type: Literal["cogony_junction_reboot"] = "cogony_junction_reboot"
    health: str = Field(default="coherence")
    reboot: str = Field(default="reboot")
    level: str = Field(default="level")
    resist_stats: list[str] = Field(default_factory=list)
    dmg_stats: list[str] = Field(default_factory=list)
    sys_damage_stats: list[str] = Field(default_factory=list)
    coherence_per_level: int = Field(default=20)
    dmg_level_offset: int = Field(default=-3)


class CogonyLootMutation(Mutation):
    """Transfer listed resources from target to actor."""

    mutation_type: Literal["cogony_loot"] = "cogony_loot"
    resources: list[str] = Field(default_factory=list)


class CogonyHealMutation(Mutation):
    """Heal: target.health += actor.patch."""

    mutation_type: Literal["cogony_heal"] = "cogony_heal"
    patch: str = Field(default="patch")
    health: str = Field(default="coherence")


class CogonyStakeMutation(Mutation):
    """Bonding curve stake operation: CLAIM, MINT, or BURN."""

    mutation_type: Literal["cogony_stake"] = "cogony_stake"
    stake: str = Field(description="Agent's stake resource for this team")
    invested: str = Field(default="", description="Agent's cumulative invested creds resource")
    dividends: str = Field(default="", description="Agent's cumulative dividends received resource")
    creds: str = Field(default="creds")
    total_stake: str = Field(default="total_stake")
    stake_buy_price: str = Field(default="stake_buy_price")
    stake_sell_price: str = Field(default="stake_sell_price")
    hub_tag: str = Field(default="")
    k: int = Field(default=10)
    mode: Literal["claim", "mint", "burn"] = Field(default="claim")


class CogonyHubIncomeMutation(Mutation):
    """Hub income: count junctions, pay champion %, distribute rest to stakers."""

    mutation_type: Literal["cogony_hub_income"] = "cogony_hub_income"
    creds: str = Field(default="creds")
    dividends: str = Field(default="")
    total_stake: str = Field(default="total_stake")
    stake: str = Field(description="Per-agent stake resource for this team")
    stake_buy_price: str = Field(default="stake_buy_price")
    stake_sell_price: str = Field(default="stake_sell_price")
    team_tag: str = Field(description="Team tag for counting aligned nodes")
    k: int = Field(default=10)
    creds_per_junction: int = Field(default=10)
    creds_per_observatory: int = Field(default=50)
    creds_per_datacenter: int = Field(default=100)
    champion_pct: int = Field(default=30)


class CogonyTrapTriggerMutation(Mutation):
    """Trap trigger: damage + scramble actor, move actor to target cell, remove target."""

    mutation_type: Literal["cogony_trap_trigger"] = "cogony_trap_trigger"
    coherence: str = Field(default="coherence")
    scrambled: str = Field(default="scrambled")
    mobile: str = Field(default="mobile")
    damage: int = Field(default=5)
    scramble_ticks: int = Field(default=10)


class CogonyTrapDropMutation(Mutation):
    """Relocate actor to target, spawn trap at old location, reset vibe."""

    mutation_type: Literal["cogony_trap_drop"] = "cogony_trap_drop"
    object_type: str = Field(description="Object type to spawn as trap")
    initial_resources: dict[str, int] = Field(default_factory=dict, description="Resources to set on spawned object")


class CogonyJumpMutation(Mutation):
    """Jump: move 2 cells if open, else 1, reset vibe."""

    mutation_type: Literal["cogony_jump"] = "cogony_jump"


class CogonyMarketMutation(Mutation):
    """Market: sell actor's elements for creds based on market prices.

    Prices are stored on the market (target) and recalculated after each sale.
    Rarest element = 4 creds, most common = 1 cred.
    """

    mutation_type: Literal["cogony_market"] = "cogony_market"
    elements: list[str] = Field(description="Element resource names (COGS order)")
    price_resources: list[str] = Field(description="Price resource names on market, same order")
    sold_resources: list[str] = Field(description="Sold-count resource names on market, same order")
    creds: str = Field(default="creds")
    history_window: int = Field(default=10)
    tax_percent: int = Field(default=0)
