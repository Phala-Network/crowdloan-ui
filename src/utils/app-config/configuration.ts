import { RegistryTypes } from '@polkadot/types/types/registry'

export interface EthereumNetworkOptions {
  /**
   * Contract address of ChainBridge
   */
  bridge: string

  /**
   * Contract address of ERC-20 token
   */
  erc20: string

  /**
   * Contract address of ERC-20 asset handler
   */
  erc20AssetHandler: string

  /**
   * Resource Id of ERC-20 transfers
   */
  erc20ResourceId: string

  /**
   * Configured remote chain Ids
   */
  peerChainIds: Record<number | string, number>

  graph: {
    endpoint: string
  }
}

export type EthereumNetworks = Record<number, EthereumNetworkOptions>

export interface SubstrateNetworkOptions {
  /**
   * WebSocket endpoint of Substrate node
   */
  endpoint: string

  /**
   * Configured remote chain Ids
   */
  peerChainIds: Record<number | string, number>

  /**
   * Type definitions of connected Substrate chain
   */
  typedefs: RegistryTypes

  graph?: {
    endpoint: string
  }
}

export type SubstrateNetwork = Record<string, SubstrateNetworkOptions>
