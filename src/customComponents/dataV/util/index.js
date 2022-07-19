export function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}

/**
 * @description                       将函数转成防抖动函数
 * @param  {Function}                 需要转成防抖动函数的函数
 * @param  {number}                   延迟时间（毫秒数）
 * @param  {boolean}                  是否执行第一次
 * @return {undefined}                无返回值
 */
export function debounce(fn, delay = 600, runFirstFn = true) {
  let timer = null

  return function(...rest) {
    // 清除定时器
    clearTimeout(timer)
    if (runFirstFn) {
      fn.apply(this, rest)
      runFirstFn = false
      return
    }

    // 设置定时器
    timer = setTimeout(fn.bind(this, ...rest), delay)
  }
}

export function observerDomResize(dom, callback) {
  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true
  })

  return observer
}

export function getPointDistance(pointOne, pointTwo) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0])

  const minusY = Math.abs(pointOne[1] - pointTwo[1])

  return Math.sqrt(minusX * minusX + minusY * minusY)
}

export function co(gen) {
  let destroyed = false

  // 处理 return 之后 resume 的问题
  let stop = false

  let val = null

  if (typeof gen === 'function') gen = gen()

  if (!gen || typeof gen.next !== 'function') return () => ({})

  Promise.resolve().then(() => {
    destroyed || next(gen.next())
  })

  return {
    end () {
      destroyed = true

      Promise.resolve().then(() => {
        gen.return()

        gen = null
      })
    },
    pause () {
      if (!destroyed) { stop = true }
    },
    resume () {
      const oldVal = val

      if (!destroyed && stop) {
        stop = false

        Promise.resolve(val).then(function () {
          if (!destroyed && !stop && oldVal === val) { next(gen.next()) }
        })
      }
    }
  }

  function next(ret) {
    if (ret.done) return ret.value

    val = ret.value

    return Promise.resolve(ret.value).then(() => {
      (!destroyed && !stop) && next(gen.next())
    })
  }
}

export function uuid (hasHyphen) {
  return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
