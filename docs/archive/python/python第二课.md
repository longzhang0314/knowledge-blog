---
title: "python第二课"
description: "python第二课 的历史学习笔记。"
date: 2026-05-21
tags: ["Python", "历史归档"]
keywords: ["Python", "历史归档", "python第二课"]
legacy_source: "python/python第二课.md"
---
#### python第二课

**if控制语句**
```python
is_hot = True
is_cold = True

if is_hot:
    print("It's a hot dat!")
    print("Drink water")
elif is_cold:
    print("It's a cold day")
else:
    print("It's a lovely day")
print("Enjoy you day")
#--------------------------
has_high_income = True
has_good_credit = False
has_criminal = False

if has_high_income and has_good_credit:
    print("loan")
elif has_high_income or has_good_credit:
    print("loan too")

if has_high_income and not has_criminal:
    print("enjoy for loan")
#---------------------------------
temperature = 30

if temperature > 30:
    print("haha")
else:
    print("hihihi")

print('------------------------------')

name = 'J'

if len(name) &lt; 3:
    print('name is haha')
```

**if小练习**

```python
weight = int(input('Weight: '))
unit = input('L(bs) or K(g): ')

if unit.upper() == 'L':
    covert = weight * 0.45
    print(f"You are &#123;covert&#125; kilos")
else:
    covert = weight / 0.45
    print(f"You are &#123;covert&#125; Kg")
```

**while循环**

注意while..else的使用

```python
i  = 1

while i &lt;= 10:
    print('*' * i)
    i += 1
    if i == 8:
        print("haha dao 8 le")
        break
# while执行完执行else，遇到break就失效
else:
    print('9999999')
print("Done")

print('------------------------------')
```

**for循环**

```python
for item in 'Python':
    print(item)

print('-----------------------')

for item in [2, 1, 3, 4]:
    print(item)

print('-----------------------')

for item in range(10):
    print(item)

print('----------------')

for item in range(4,6):
    print(item)
print('-------------------------')

for item in range(5, 10, 2):
    print(item)
```

**一维数组（长度可变）**

```python
prices = [10, 20, 30]
print(prices)
sum = 0
for i in prices:
    sum += i
print(sum)

print('------------------')

for i in range(4):
    for j in range(5):
        print(f"&#123;i&#125;,&#123;j&#125;")
```

**二维数组**

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[0])

for i in matrix:
    for j in i:
        print(j)
```

**数组基本操作**

```python
numbers = [5, 2, 1, 7, 2, 4]
numbers.append(20)
numbers.insert(0, 10)
print(numbers)
numbers.remove(5)
print(numbers)
print(numbers.index(2))
print(numbers.pop())
print(numbers.count(2))
numbers.sort()
numbers.reverse()
print(numbers)

numbers2 = numbers.copy()

numbers.clear()
print(numbers)
```

**元组（不能修改）**

```python
# 元组：不能修改
numbers = (1, 2, 3)
print(numbers[0])
print('-----------------------------')
# 解压缩特性
coor = (1, 2, 3)
# x = coor[0]
# y = coor[1]
# z = coor[2]
# 等价于上面的写法，这个特性也可以用于数组
x, y, z = coor
```

**字典**

```python
customers = &#123;
    "name": "zhanglong",
    "age": 18,
    "is_verfied": True
&#125;
# 如果不存在key会抛异常
print(customers['name'])
# 如果不存在key不会抛异常
print(customers.get('Name'))
# 如果不存在就赋默认值
print(customers.get("birthday", "Jan 1 1994"))
# 更新值
customers["name"] = "令狐冲"
print(customers["name"])

#----------------------------------

phone = input("Phone: ")
digits_mapping = &#123;
    '1': 'One',
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
&#125;
output = ""
for ch in phone:
    output += digits_mapping.get(ch, "!") + " "
print(output)
```

**math**

```python
import math

print(math.ceil(2.9))
print(math.floor(2.9))

x = 2.9
print(round(2.9))
print(abs(-2.9))
```
