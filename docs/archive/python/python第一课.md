---
title: "python第一课"
description: "python第一课 的历史学习笔记。"
date: 2026-05-21
tags: ["Python", "历史归档"]
keywords: ["Python", "历史归档", "python第一课"]
legacy_source: "python/python第一课.md"
---
#### python第一课

**变量定义，输入**

```python
print("zhanglong")
print('*' * 10)
#---------------------------------------
price = 10
price = 20
rating = 2.9
name = 'zhanglong'
is_publish = True
print(price)
#---------------------------------------
name = input('What is your name?\n')
print('Hi, ' + name)
#---------------------------------------
birth_year = input('Birth year: ')
print(type(birth_year))
age = 2020 - int(birth_year)
print(type(age))
int()
float()
print(age)
weight_lbs = input('Weight (lbs): ')
weight_kg = float(weight_lbs) * 0.45
print(weight_kg)
```
**字符串，格式化**
```python
course = "Python's course"
print(course)
course = 'Python "course"'
print(course)
print(course[0]+'---'+course[-2])
print(course[0:3])
print(course[1:])
print(course[:5])
print(course[1:-1])
email = ''' 
Hi long.
Thank you

I am leaning python
'''
print(email)
#---------------------------------------
first = 'John'
last = 'Smith'
message = first + ' [' + last +'] is a coder'
print(message)
msg = f'&#123;first&#125; [&#123;last&#125;] is a coder'
print(msg)
```

**字符串API，数学运算**
```python
course = 'Python for Beginners'
print(len(course))
print(course.upper())
print(course.lower())
print(course)
print('----------------------------')

print(course.find('P'))
print(course.find('Beg'))

print('-------------------------------')

print(course.replace('Beginners', 'Absolute Begginners'))

print('Python' in course)
#---------------------------------------
print(10 / 3)
print(10 // 3)
print(10 % 3)
# 10的3次幂
print(10 ** 3)
#---------------------------------------
x = 10
x = x + 3
x += 3
print(x)

y = 10 + 3 * 2 ** 2
print(y)
```
