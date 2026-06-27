---
layout: post
title: 中文Markdown写作指南
subtitle: 学习如何使用Markdown编写漂亮的博客文章
gh-repo: 694426204/beautiful-jekyll.study
gh-badge: [star, fork, follow]
tags: [中文, Markdown, 教程]
comments: true
author: 您的名字
---

{: .box-success}
这是一篇演示文章，帮助您学习如何使用Markdown编写博客文章。Markdown是一种轻量级标记语言，让您可以专注于内容本身，而不用关心复杂的排版问题。

## 基础语法

### 文本格式化

**这是粗体文本**

*这是斜体文本*

***这是粗斜体文本***

~~这是删除线~~

### 列表

无序列表：
- 项目一
- 项目二
- 项目三

有序列表：
1. 第一步
2. 第二步
3. 第三步

### 链接和图片

[这是一个链接](https://github.com/694426204/beautiful-jekyll.study)

![示例图片](https://beautifuljekyll.com/assets/img/crepe.jpg)

图片居中显示：

![示例图片](https://beautifuljekyll.com/assets/img/crepe.jpg){: .mx-auto.d-block :}

## 表格示例

| 功能 | 描述 | 示例 |
| :--- | :---: | ---: |
| 文本格式 | 加粗、斜体等 | **粗体** |
| 列表 | 有序和无序 | 1. 项目 |
| 链接 | 超链接 | [链接](url) |
| 图片 | 插入图片 | ![图片](url) |

## 代码展示

行内代码：使用 `console.log()` 输出信息

代码块：

```javascript
function greeting(name) {
    return `你好，${name}！`;
}

console.log(greeting('世界'));
```

Python 示例：

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 打印前10个斐波那契数
for i in range(10):
    print(fibonacci(i), end=' ')
```

带行号的代码：

{% highlight python linenos %}
# 快速排序算法
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
{% endhighlight %}

## 数学公式

使用 MathJax 编写 LaTeX 数学公式：

行内公式：质能方程 \\(E = mc^2\\)

独立公式：

$$
f(x) = \int_{-\infty}^{\infty} e^{-x^2} dx
$$

二次方程求根公式：

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

## 提示框

### 通知

{: .box-note}
**提示：** 这是一个通知框，用于显示重要信息。

### 警告

{: .box-warning}
**警告：** 这是一个警告框，提醒用户注意潜在问题。

### 错误

{: .box-error}
**错误：** 这是一个错误框，用于显示错误信息。

## 引用

> 生活不止眼前的代码，还有诗和远方。
>
> — 程序员的座右铭

## 折叠内容

<details markdown="1">
<summary>点击展开查看更多内容</summary>

这里是可以折叠隐藏的内容，用户点击标题后才会显示。

- 可以包含列表
- 可以包含**格式化文本**
- 甚至可以包含代码块

```bash
echo "Hello, Markdown!"
```

</details>

## 写作建议

1. **保持简洁**：好的文章应该直奔主题，避免冗余
2. **结构清晰**：使用适当的标题层级组织内容
3. **图文并茂**：适当添加图片和代码示例增强可读性
4. **定期更新**：保持内容的时效性

---

希望这篇指南对您有所帮助！开始您的Markdown写作之旅吧！