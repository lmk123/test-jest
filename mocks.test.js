let originFn
let obj

let normalMockFn
let spyOnMockFn

beforeEach(() => {
    originFn = () => '原函数返回值'
    obj = {
        method: originFn
    }

    // 通过 jest.fn() 产生的 mock 函数，且带有函数定义
    normalMockFn = jest.fn(() => '有函数定义')
    // 通过 jest.spyOn() 产生的 mock 函数，且带有函数定义
    spyOnMockFn = jest.spyOn(obj, 'method').mockImplementation(() => 'spyOn 后产生的 mock 函数的返回值')

    // 分别调用一次这俩函数，让它们产生调用数据
    normalMockFn()
    obj.method()
})

test('jest.resetAllMocks() 对 jest.fn() 和 jest.spyOn() 产生的 mock 函数的影响', () => {
    jest.resetAllMocks()

    expect(normalMockFn).toHaveBeenCalledTimes(0) // resetAllMocks() 清除了 jest.fn() 产生的 mock 函数的调用数据
    expect(normalMockFn()).toBeUndefined() // resetAllMocks() 清除了 jest.fn() 产生的 mock 函数的函数定义

    expect(obj.method === originFn).toBe(false) // resetAllMocks() 没有把 obj.method 还原为原函数
    expect(obj.method).toHaveBeenCalledTimes(0) // resetAllMocks() **清除了** spyOn 产生的 mock 函数的调用数据
    expect(obj.method()).toBeUndefined() // resetAllMocks() **清除了** spyOn 产生的 mock 函数的函数定义
})

test('jest.restoreAllMocks() 对 jest.fn() 和 jest.spyOn() 产生的 mock 函数的影响', () => {
    jest.restoreAllMocks()

    expect(normalMockFn).toHaveBeenCalledTimes(1) // restoreAllMocks() **没有清除** jest.fn() 产生的 mock 函数的调用数据
    expect(normalMockFn()).toBe('有函数定义') // restoreAllMocks() **没有清除** jest.fn() 产生的 mock 函数的函数定义

    expect(obj.method === originFn).toBe(true) // restoreAllMocks() 将 obj.method 还原为了原函数
    // 由于 obj.method 已经被还原为原函数，所以下方只能用变量来引用 spyOn 产生的 mock 函数
    expect(spyOnMockFn).toHaveBeenCalledTimes(1) // resetAllMocks() **没有清除** spyOn 产生的 mock 函数的调用数据
    expect(spyOnMockFn()).toBe('spyOn 后产生的 mock 函数的返回值') // resetAllMocks() **没有清除** spyOn 产生的 mock 函数的函数定义
})
