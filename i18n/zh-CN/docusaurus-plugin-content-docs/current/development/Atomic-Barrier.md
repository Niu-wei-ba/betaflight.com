# 原子屏障的实现

```
static int markme_bar = 0;
static int markme = 0;

markme++;
// (1) markme is read into register, but not changed
markme_bar++;
// markme_bar is read from memory and incremented
ATOMIC_BLOCK_NB(NVIC_PRIO_TIMER) {
   ATOMIC_BARRIER(markme_bar);
// start of ATOMIC_BLOCK_NB scope:
//  markme_bar is stored into memory (it is input/output - "+m" output operand - of asm volatile)
//  BASEPRI is saved into temporary variable
//  BASEPRI_MAX is decremented to NVIC_PRIO_TIMER (if it is higher than NVIC_PRIO_TIMER or zero; lower number means higher priority on ARM)
   markme++;
// nothing happens, markme value is not needed yet
   markme_bar++;
// (2) markme_bar re-read from memory (ATOMIC_BARRIER marked it as modified - "+m" output operand of asm volatile)
//  and incremented

// end of ATOMIC_BLOCK_NB scope:
//  markme_bar is stored into memory (cleanup function from ATOMIC_BARRIER) / input "m" operand), but kept for later use in register
//    (actually markme_bar+1 is stored and pre-increment value kept in register)
// BASEPRI value is restored
};

markme++;
// register value read in (1) is incremented by 3
markme_bar++;
// register value read in (2) is incremented (actually +=2, because register contains pre-increment value)

// markme and markme_bar are stored into memory
```

# 原子屏障警告

ATOMIC_BLOCK/ATOMIC_BARRIER 构造依赖于 gcc 扩展。我依赖 gcc 清理函数 (`attribute ((cleanup))`) 并假设在离开块时调用清理处理程序，即使关联变量已被消除。

有（有点偏执）安全警告，以确保在新的 gcc 版本上手动检查生成的程序集。假设只需要检查主要的 gcc 版本。

如果 GCC 升级并且编译时出现警告，则必须验证生成的 asm 源。

例如

```
%% serial_softserial.c
warning "Please verify that ATOMIC_BARRIER works as intended"
```

要执行验证，请按照问题 #167 的讨论进行，其中内容如下：

我希望这足以检查优化后的变量在范围末尾仍然有清理代码。

```
static int markme=0;
markme++;
ATOMIC_BLOCK_NB(0xff) {
   ATOMIC_BARRIER(markme);
   markme++;
};
markme++;
```

将 `-save-temps=obj` （或 `-save-temps=cwd` （或 `-save-temps=cwd`，但很多文件最终会在与 makefile 相同的目录中）传递到 gcc 链接步骤（LTO 正在使用），找到结果 `*.ltrans*.ltrans.s` （grep 为 `markme`，在 Linux 上它最终会在 `/tmp` 中）并且检查生成的组装顺序是否为：

```
                 MSR basepri_max, r3
# (possibly markme address load)
                # barier (markme) start

# (increment markme, load and store to memory)
        ldr     r2, [r3]
        adds    r0, r2, #1
        str     r0, [r3]

                # barier(markme)  end
                MSR basepri, r3

# (markme value should be cached in register on next increment)
```

#barrier(markme) 必须包围访问代码，并且必须位于 MSR basepri 指令内部。

avr 库中的 ATOMIC_BLOCK 使用类似的方法，因此 gcc 不应破坏此行为。

IMO 属性（清理）和 asm 易失性的定义方式应该保证这一点。

attribute(cleanup) 可能是实现原子部分的更安全的方法 - 另一种可能性是在代码中显式放置屏障，但这可能（并且最终）导致在同一路径上错过屏障/basepri 恢复，从而产生很难发现的错误。

当使用“ATOMIC_BLOCK”（具有完整内存屏障）时，可以省略“MEMORY_BARRIER()”代码，但最好明确说明哪些内存受屏障保护。 gcc 5 可以利用这些知识来极大地改进生成的代码。