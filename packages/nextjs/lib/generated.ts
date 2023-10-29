import {
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
  useContractRead,
  UseContractReadConfig,
} from 'wagmi'
import { WriteContractMode, PrepareWriteContractResult, ReadContractResult } from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Recommendoor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const recommendoorABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'ipfsHash', internalType: 'string', type: 'string', indexed: false },
      { name: 'action', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'InteractData',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'ipfsHash', internalType: 'string', type: 'string', indexed: false },
      { name: 'channel', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'UploadData',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'ipfsHash', internalType: 'string', type: 'string' },
      { name: 'action', internalType: 'string', type: 'string' },
    ],
    name: 'interactContent',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'ipfsHash', internalType: 'string', type: 'string' },
      { name: 'channel', internalType: 'string', type: 'string' },
    ],
    name: 'uploadData',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'operator', type: 'address', indexed: true },
      { name: 'approved', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', type: 'bool' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'id', type: 'uint256' },
      { name: 'data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', type: 'address' },
      { name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'index', type: 'uint256' },
    ],
    name: 'tokenByIndex',
    outputs: [{ name: 'tokenId', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'tokeId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link recommendoorABI}__.
 */
export function useRecommendoorWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof recommendoorABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof recommendoorABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof recommendoorABI, TFunctionName, TMode>({ abi: recommendoorABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link recommendoorABI}__ and `functionName` set to `"interactContent"`.
 */
export function useRecommendoorInteractContent<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof recommendoorABI, 'interactContent'>['request']['abi'],
        'interactContent',
        TMode
      > & { functionName?: 'interactContent' }
    : UseContractWriteConfig<typeof recommendoorABI, 'interactContent', TMode> & {
        abi?: never
        functionName?: 'interactContent'
      } = {} as any,
) {
  return useContractWrite<typeof recommendoorABI, 'interactContent', TMode>({
    abi: recommendoorABI,
    functionName: 'interactContent',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link recommendoorABI}__ and `functionName` set to `"uploadData"`.
 */
export function useRecommendoorUploadData<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof recommendoorABI, 'uploadData'>['request']['abi'],
        'uploadData',
        TMode
      > & { functionName?: 'uploadData' }
    : UseContractWriteConfig<typeof recommendoorABI, 'uploadData', TMode> & {
        abi?: never
        functionName?: 'uploadData'
      } = {} as any,
) {
  return useContractWrite<typeof recommendoorABI, 'uploadData', TMode>({
    abi: recommendoorABI,
    functionName: 'uploadData',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link recommendoorABI}__.
 */
export function usePrepareRecommendoorWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof recommendoorABI, TFunctionName>, 'abi'> = {} as any,
) {
  return usePrepareContractWrite({ abi: recommendoorABI, ...config } as UsePrepareContractWriteConfig<
    typeof recommendoorABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link recommendoorABI}__ and `functionName` set to `"interactContent"`.
 */
export function usePrepareRecommendoorInteractContent(
  config: Omit<
    UsePrepareContractWriteConfig<typeof recommendoorABI, 'interactContent'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: recommendoorABI,
    functionName: 'interactContent',
    ...config,
  } as UsePrepareContractWriteConfig<typeof recommendoorABI, 'interactContent'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link recommendoorABI}__ and `functionName` set to `"uploadData"`.
 */
export function usePrepareRecommendoorUploadData(
  config: Omit<UsePrepareContractWriteConfig<typeof recommendoorABI, 'uploadData'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: recommendoorABI,
    functionName: 'uploadData',
    ...config,
  } as UsePrepareContractWriteConfig<typeof recommendoorABI, 'uploadData'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link recommendoorABI}__.
 */
export function useRecommendoorEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof recommendoorABI, TEventName>, 'abi'> = {} as any,
) {
  return useContractEvent({ abi: recommendoorABI, ...config } as UseContractEventConfig<
    typeof recommendoorABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link recommendoorABI}__ and `eventName` set to `"InteractData"`.
 */
export function useRecommendoorInteractDataEvent(
  config: Omit<UseContractEventConfig<typeof recommendoorABI, 'InteractData'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: recommendoorABI, eventName: 'InteractData', ...config } as UseContractEventConfig<
    typeof recommendoorABI,
    'InteractData'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link recommendoorABI}__ and `eventName` set to `"UploadData"`.
 */
export function useRecommendoorUploadDataEvent(
  config: Omit<UseContractEventConfig<typeof recommendoorABI, 'UploadData'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: recommendoorABI, eventName: 'UploadData', ...config } as UseContractEventConfig<
    typeof recommendoorABI,
    'UploadData'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({ abi: erc721ABI, ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc721ABI, functionName: 'balanceOf', ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc721ABI, functionName: 'getApproved', ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc721ABI, functionName: 'isApprovedForAll', ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"name"`.
 */
export function useErc721Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc721ABI, functionName: 'name', ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc721ABI, functionName: 'ownerOf', ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc721ABI, functionName: 'symbol', ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useErc721TokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc721ABI, functionName: 'tokenByIndex', ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721TokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc721ABI, functionName: 'tokenURI', ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc721TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc721ABI, functionName: 'totalSupply', ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, TFunctionName, TMode>({ abi: erc721ABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'approve', TMode>({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721SafeTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, 'safeTransferFrom'>['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'safeTransferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721SetApprovalForAll<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, 'setApprovalForAll'>['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof erc721ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'setApprovalForAll', TMode>({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721TransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, 'transferFrom'>['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'transferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function usePrepareErc721Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>, 'abi'> = {} as any,
) {
  return usePrepareContractWrite({ abi: erc721ABI, ...config } as UsePrepareContractWriteConfig<
    typeof erc721ABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721SafeTransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof erc721ABI, TEventName>, 'abi'> = {} as any,
) {
  return useContractEvent({ abi: erc721ABI, ...config } as UseContractEventConfig<typeof erc721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof erc721ABI, 'Approval'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: erc721ABI, eventName: 'Approval', ...config } as UseContractEventConfig<
    typeof erc721ABI,
    'Approval'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721ApprovalForAllEvent(
  config: Omit<UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: erc721ABI, eventName: 'ApprovalForAll', ...config } as UseContractEventConfig<
    typeof erc721ABI,
    'ApprovalForAll'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721TransferEvent(
  config: Omit<UseContractEventConfig<typeof erc721ABI, 'Transfer'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: erc721ABI, eventName: 'Transfer', ...config } as UseContractEventConfig<
    typeof erc721ABI,
    'Transfer'
  >)
}
