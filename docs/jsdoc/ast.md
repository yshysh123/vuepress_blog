---
title: ast
sidebar: true
categories:
  - jsoc
date: 2020-07-28
tags:
  - js
---

:::tip
抽象语法树 (Abstract Syntax Tree)，简称 AST，它是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。
:::

<!-- more -->

# AST 介绍

AST 官方介绍

It is a hierarchical program representation that presents source code structure according to the grammar of a programming language, each AST node corresponds to an item of a source code.

如果你查看目前任何主流的项目中的 devDependencies，会发现前些年的不计其数的插件诞生。我们归纳一下有：javascript 转译、代码压缩、css 预处理器、elint、pretiier，等。有很多 js 模块我们不会在生产环境用到，但是它们在我们的开发过程中充当着重要的角色。所有的上述工具，不管怎样，都建立在了 AST 这个巨人的肩膀上。

# AST 有什么用

- 代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等
  - 如 JSLint、JSHint 对代码错误或风格的检查，发现一些潜在的错误
  - IDE 的错误提示、格式化、高亮、自动补全等等
- 代码混淆压缩
  - UglifyJS2 等
- 优化变更代码，改变代码结构使达到想要的结构
  - 代码打包工具 webpack、rollup 等等
  - CommonJS、AMD、CMD、UMD 等代码规范之间的转化
  - CoffeeScript、TypeScript、JSX 等转化为原生 Javascript

# AST 如何生成

js 执行的第一步是读取 js 文件中的字符流，然后通过词法分析生成 token，之后再通过语法分析( Parser )生成 AST，最后生成机器码执行。
整个解析过程主要分为以下两个步骤：

- 词法分析：将整个代码字符串分割成最小语法单元数组
- 语法分析：在分词基础上建立分析语法单元之间的关系

JS Parser 是 js 语法解析器，它可以将 js 源码转成 AST，常见的 Parser 有 esprima、traceur、acorn、shift 等。

## 词法分析

词法分析，也称之为扫描（scanner），简单来说就是调用 next() 方法，一个一个字母的来读取字符，然后与定义好的 JavaScript 关键字符做比较，生成对应的 Token。Token 是一个不可分割的最小单元:

> 例如 var 这三个字符，它只能作为一个整体，语义上不能再被分解，因此它是一个 Token。

词法分析器里，每个关键字是一个 Token ，每个标识符是一个 Token，每个操作符是一个 Token，每个标点符号也都是一个 Token。除此之外，还会过滤掉源程序中的注释和空白字符（换行符、空格、制表符等。
最终，整个代码将被分割进一个 tokens 列表（或者说一维数组）。

```
n * n;

[
  { type: { ... }, value: "n",  loc: { ... } },
  { type: { ... }, value: "*",  loc: { ... } },
  { type: { ... }, value: "n",  loc: { ... } },
  ...
]
```

每一个 type 有一组属性来描述该令牌：

```
{
  type: {
    label: 'name',
    keyword: undefined,
    beforeExpr: false,
    startsExpr: true,
    rightAssociative: false,
    isLoop: false,
    isAssign: false,
    prefix: false,
    postfix: false,
    binop: null,
    updateContext: null
  },
  ...
}
```

## 语法分析

语法分析会将词法分析出来的 Token 转化成有语法含义的抽象语法树结构。同时，验证语法，语法如果有错的话，抛出语法错误。

- 可以去 [AST explorer](https://astexplorer.net/) 可以在线看到不同的 parser 解析 js 代码后得到的 AST。
- github 上看所有的 [ESTree](https://github.com/estree/estree) ESTree
- 关于属性介绍的文档 抽象语法树 [AST](http://www.goyth.com/2018/12/23/AST/#Expressions) 介绍

# AST 解析过程

1. 词法分析，也叫扫描 scanner

它读取我们的代码，然后把它们按照预定的规则合并成一个个的标识 tokens。同时，它会移除空白符、注释等。最后，整个代码将被分割进一个 tokens 列表（或者说一维数组）。

```javascript
const a = 5;
// 转换成
[{value: 'const', type: 'keyword'}, {value: 'a', type: 'identifier'}, ...]
```

当词法分析源代码的时候，它会一个一个字母地读取代码，所以很形象地称之为扫描 - scans。当它遇到空格、操作符，或者特殊符号的时候，它会认为一个话已经完成了。

2.语法分析，也称解析器

它会将词法分析出来的数组转换成树形的形式，同时，验证语法。语法如果有错的话，抛出语法错误。

```javascript
[{value: 'const', type: 'keyword'}, {value: 'a', type: 'identifier'}, ...]

// 语法分析后的树形形式

{
  type: "VariableDeclarator",
  id: {
    type: "Identifier",
    name: "a"
  },
  ...
}
```

当生成树的时候，解析器会删除一些没必要的标识 tokens（比如：不完整的括号），因此 AST 不是 100% 与源码匹配的。

> 解析器 100%覆盖所有代码结构生成树叫做 CST（具体语法树）。

# AST 实战

人生第一次拆解 Javascript

小时候，当我们拿到一个螺丝刀和一台机器，人生中最令人怀念的梦幻时刻便开始了：

我们把机器，拆成一个一个小零件，一个个齿轮与螺钉，用巧妙的机械原理衔接在一起…

当我们把它重新照不同的方式组装起来，这时，机器重新又跑动了起来——世界在你眼中如获新生。

通过抽象语法树解析，我们可以像童年时拆解玩具一样，透视 Javascript 这台机器的运转，并且重新按着你的意愿来组装。

现在，我们拆解一个简单的 add 函数

```javascrtip
function add(a, b) {
  return a + b
}
```

首先，我们拿到的这个语法块，是一个 FunctionDeclaration(函数定义)对象。

用力拆开，它成了三块：

一个 id，就是它的名字，即 add

两个 params，就是它的参数，即[a, b]

一块 body，也就是大括号内的一堆东西

add 没办法继续拆下去了，它是一个最基础 Identifier（标志）对象，用来作为函数的唯一标志，就像人的姓名一样。

```json
{
  name: 'add'
  type: 'identifier'
  ...
}
```

params 继续拆下去，其实是两个 Identifier 组成的数组。之后也没办法拆下去了。

```json
[
  {
    name: 'a'
    type: 'identifier'
    ...
  },
  {
    name: 'b'
    type: 'identifier'
    ...
  }
]
```

接下来，我们继续拆开 body

我们发现，body 其实是一个 BlockStatement（块状域）对象，用来表示是{return a + b}

打开 Blockstatement，里面藏着一个 ReturnStatement（Return 域）对象，用来表示 return a + b

继续打开 ReturnStatement,里面是一个 BinaryExpression(二项式)对象，用来表示 a + b

继续打开 BinaryExpression，它成了三部分，left，operator，right

operator 即+

left 里面装的，是 Identifier 对象 a

right 里面装的，是 Identifer 对象 b

就这样，我们把一个简单的 add 函数拆解完毕，用图表示就是

看！抽象语法树(Abstract Syntax Tree)，的确是一种标准的树结构。

那么，上面我们提到的 Identifier、Blockstatement、ReturnStatement、BinaryExpression， 见附录

## babel 实战

babel 是一个 javascript 编译器，用来将 es6 语法编译成 es5

![babel解析过程](./image/babel.png)

babel 的工作可以分为 3 个阶段：

第 1 步 解析（Parse）

- @babel/parser：将字符串转换成 AST，Babylon( 现在是@babel/parser ) 是 Babel 中使用的 JavaScript 解析器
- 解析过程分为两个阶段
  - 语法分析：字符流 -> token 流
  - 词法分析：token 流 -> AST
- [@babel/parser](https://babeljs.io/docs/en/babel-parser#docsNav)

第 2 步 转换（TransForm）

- @babel/traverse：主要用于遍历 AST
- Babel 接收解析得到的 AST 并通过 ( babel-traverse ) 对其进行 ( 深度优先遍历 )
  - 在此遍历过程中对节点进行 ( 添加 )、( 更新 ) 及 ( 移除 ) 操作
- @babel/types：主要用来操作 AST，比如 ( 添加 )、( 更新 ) 及 ( 移除 ) 操作
- 除了手动替换，可以使用@babel/types 更加房便快捷.相当于作用于 AST 的类 lodash 库

第 3 步 生成（Generate）

- @babel/generator：来将转换后的抽象语法树转化为 Javascript 字符串
  - 将经过转换的 AST 通过 babel-generator 再转换为 js 代码过程及时深度遍历整个 AST,然后构建转换后的代码字符串。
- @babel/generator

## Vue 实战

![Vue解析过程](./image/vue.png)

## ESlint 实战

[在 Eslint 中开发禁用 console.time()](https://juejin.im/post/6844903961804161031)

# 总结

AST 的作用大致分为几类

1. IDE 使用，如代码风格检测(eslint 等)、代码的格式化，代码高亮，代码错误等等

2. 代码的混淆压缩

3. 转换代码的工具。如 webpack，rollup，各种代码规范之间的转换，ts，jsx 等转换为原生 js

了解 AST，最终还是为了让我们了解我们使用的工具，当然也让我们更了解 JavaScript，更靠近 JavaScript。

# 附录

## AST 常用节点介绍

### Identifier

标识符，就是我们写 JS 时自定义的名称，如变量名，函数名，属性名，都归为标识符。相应的接口是这样的：

```
interface Identifier <: Expression, Pattern {
  type: "Identifier";
  name: string;
}
```

一个标识符可能是一个表达式，或者是解构的模式（ES6 中的解构语法）。我们等会会看到 Expression 和 Pattern 相关的内容的。

### Literal

字面量，这里不是指 [] 或者 {} 这些，而是本身语义就代表了一个值的字面量，如 1，“hello”, true 这些，还有正则表达式（有一个扩展的 Node 来表示正则表达式），如 /\d?/。我们看一下文档的定义：

```
interface Literal <: Expression {
  type: "Literal";
  value: string | boolean | null | number | RegExp;
}
```

这里即对应了字面量的值，我们可以看出字面量值的类型，字符串，布尔，数值，null 和正则。

### RegExpLiteral

这个针对正则字面量的，为了更好地来解析正则表达式的内容，添加多一个 regex 字段，里边会包括正则本身，以及正则的 flags。

```
interface RegExpLiteral <: Literal {
  regex: {
    pattern: string;
    flags: string;
  };
}
```

### Programs

一般这个是作为跟节点的，即代表了一棵完整的程序代码树。

```
interface Program <: Node {
  type: "Program";
  body: [ Statement ];
}
```

body 属性是一个数组，包含了多个 Statement（即语句）节点。

### Functions

函数声明或者函数表达式节点。

```
interface Function <: Node {
  id: Identifier | null;
  params: [ Pattern ];
  body: BlockStatement;
}
```

id 是函数名，params 属性是一个数组，表示函数的参数。body 是一个块语句。

### BlockStatement

块语句节点，举个例子：if (...) { // 这里是块语句的内容 }，块里边可以包含多个其他的语句，所以有一个 body 属性，是一个数组，表示了块里边的多个语句。

```
interface BlockStatement <: Statement {
  type: "BlockStatement";
  body: [ Statement ];
}
```

### DebuggerStatement

debugger，就是表示这个，没有其他了。

```
interface DebuggerStatement <: Statement {
  type: "DebuggerStatement";
}

```

### WithStatement

with 语句节点，里边有两个特别的属性，object 表示 with 要使用的那个对象（可以是一个表达式），body 则是对应 with 后边要执行的语句，一般会是一个块语句。

```
interface WithStatement <: Statement {
  type: "WithStatement";
  object: Expression;
  body: Statement;
}
```

---

**下边是控制流的语句：**

### ReturnStatement

返回语句节点，argument 属性是一个表达式，代表返回的内容。

```
interface ReturnStatement <: Statement {
  type: "ReturnStatement";
  argument: Expression | null;
}
```

### BreakStatement

break 语句节点，会有一个 label 属性表示需要的 label 名称，当不需要 label 的时候（通常都不需要），便是 null。

```
interface BreakStatement <: Statement {
  type: "BreakStatement";
  label: Identifier | null;
}
```

### ContinueStatement

continue 语句节点，和 break 类似。

```
interface ContinueStatement <: Statement {
  type: "ContinueStatement";
  label: Identifier | null;
}
```

---

**下边是条件语句：**

### IfStatement

if 语句节点，很常见，会带有三个属性，test 属性表示 if (...) 括号中的表达式。
consequent 属性是表示条件为 true 时的执行语句，通常会是一个块语句。
alternate 属性则是用来表示 else 后跟随的语句节点，通常也会是块语句，但也可以又是一个 if 语句节点，即类似这样的结构：if (a) { //... } else if (b) { // ... }。alternate 当然也可以为 null。

```
interface IfStatement <: Statement {
  type: "IfStatement";
  test: Expression;
  consequent: Statement;
  alternate: Statement | null;
}
```

### SwitchStatement

switch 语句节点，有两个属性，discriminant 属性表示 switch 语句后紧随的表达式，通常会是一个变量，cases 属性是一个 case 节点的数组，用来表示各个 case 语句。

```
interface SwitchStatement <: Statement {
  type: "SwitchStatement";
  discriminant: Expression;
  cases: [ SwitchCase ];
}
```

### SwitchCase

switch 的 case 节点。test 属性代表这个 case 的判断表达式，consequent 则是这个 case 的执行语句。
当 test 属性是 null 时，则是表示 default 这个 case 节点。

```
interface SwitchCase <: Node {
  type: "SwitchCase";
  test: Expression | null;
  consequent: [ Statement ];
}
```

---

**下边是异常相关的语句：**

### ThrowStatement

throw 语句节点，argument 属性用以表示 throw 后边紧跟的表达式。

```
interface ThrowStatement <: Statement {
  type: "ThrowStatement";
  argument: Expression;
}
```

### TryStatement

try 语句节点，block 属性表示 try 的执行语句，通常是一个块语句。
hanlder 属性是指 catch 节点，finalizer 是指 finally 语句节点，当 hanlder 为 null 时，finalizer 必须是一个块语句节点。

```
interface TryStatement <: Statement {
  type: "TryStatement";
  block: BlockStatement;
  handler: CatchClause | null;
  finalizer: BlockStatement | null;
}
```

### CatchClause

catch 节点，param 用以表示 catch 后的参数，body 则表示 catch 后的执行语句，通常是一个块语句。

```
interface CatchClause <: Node {
  type: "CatchClause";
  param: Pattern;
  body: BlockStatement;
}
```

---

**_下边是循环语句：_**

### WhileStatement

while 语句节点，test 表示括号中的表达式，body 是表示要循环执行的语句。

```
interface WhileStatement <: Statement {
  type: "WhileStatement";
  test: Expression;
  body: Statement;
}
```

### DoWhileStatement

do/while 语句节点，和 while 语句类似。

```
interface DoWhileStatement <: Statement {
  type: "DoWhileStatement";
  body: Statement;
  test: Expression;
}

```

### ForStatement

for 循环语句节点，属性 init/test/update 分别表示了 for 语句括号中的三个表达式，初始化值，循环判断条件，每次循环执行的变量更新语句（init 可以是变量声明或者表达式）。这三个属性都可以为 null，即 for(;;){}。body 属性用以表示要循环执行的语句。

```
interface ForStatement <: Statement {
  type: "ForStatement";
  init: VariableDeclaration | Expression | null;
  test: Expression | null;
  update: Expression | null;
  body: Statement;
}
```

### ForInStatement

for/in 语句节点，left 和 right 属性分别表示在 in 关键词左右的语句（左侧可以是一个变量声明或者表达式）。body 依旧是表示要循环执行的语句。

```
interface ForInStatement <: Statement {
  type: "ForInStatement";
  left: VariableDeclaration | Pattern;
  right: Expression;
  body: Statement;
}
```

### VariableDeclaration

变量声明，kind 属性表示是什么类型的声明，因为 ES6 引入了 const/let。declarations 表示声明的多个描述，因为我们可以这样：let a = 1, b = 2;。

```
interface VariableDeclaration <: Declaration {
  type: "VariableDeclaration";
  declarations: [ VariableDeclarator ];
  kind: "var";
}
```

### VariableDeclarator

变量声明的描述，id 表示变量名称节点，init 表示初始值的表达式，可以为 null。

```
interface VariableDeclarator <: Node {
  type: "VariableDeclarator";
  id: Pattern;
  init: Expression | null;
}
```

### ThisExpression

表示 this。

```
interface ThisExpression <: Expression {
  type: "ThisExpression";
}
```

### ArrayExpression

数组表达式节点，elements 属性是一个数组，表示数组的多个元素，每一个元素都是一个表达式节点。

```
interface ArrayExpression <: Expression {
  type: "ArrayExpression";
  elements: [ Expression | null ];
}
```

### ObjectExpression

对象表达式节点，property 属性是一个数组，表示对象的每一个键值对，每一个元素都是一个属性节点。

```
interface ObjectExpression <: Expression {
  type: "ObjectExpression";
  properties: [ Property ];
}
```

### Property

对象表达式中的属性节点。key 表示键，value 表示值，由于 ES5 语法中有 get/set 的存在，所以有一个 kind 属性，用来表示是普通的初始化，或者是 get/set。

```
interface Property <: Node {
  type: "Property";
  key: Literal | Identifier;
  value: Expression;
  kind: "init" | "get" | "set";
}
```

### FunctionExpression

函数表达式节点。

```
interface FunctionExpression <: Function, Expression {
  type: "FunctionExpression";
}
```

---

**下边是一元运算符相关的表达式部分：**

### UnaryOperator

一元运算符，枚举类型，所有值如下：

```
enum UnaryOperator {
  "-" | "+" | "!" | "~" | "typeof" | "void" | "delete"
}
```

### UpdateOperator

update 运算符，值为 ++ 或 --，配合 update 表达式节点的 prefix 属性来表示前后。

```
enum UpdateOperator {
  "++" | "--"
}
```

---

**下边是二元运算符相关的表达式部分：**

### BinaryExpression

二元运算表达式节点，left 和 right 表示运算符左右的两个表达式，operator 表示一个二元运算符。

```
interface BinaryExpression <: Expression {
  type: "BinaryExpression";
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
}

```

### BinaryOperator

二元运算符，所有值如下：

```
enum BinaryOperator {
  "==" | "!=" | "===" | "!=="
  | "<" | "<=" | ">" | ">="
  | "<<" | ">>" | ">>>"
  | "+" | "-" | "\*" | "/" | "%"
  | "|" | "^" | "&" | "in"
  | "instanceof"
}
```

### AssignmentExpression

赋值表达式节点，operator 属性表示一个赋值运算符，left 和 right 是赋值运算符左右的表达式。

```
interface AssignmentExpression <: Expression {
  type: "AssignmentExpression";
  operator: AssignmentOperator;
  left: Pattern | Expression;
  right: Expression;
}
```

### AssignmentOperator

赋值运算符，所有值如下：（常用的并不多）

```
enum AssignmentOperator {
  "=" | "+=" | "-=" | "\*=" | "/=" | "%="
  | "<<=" | ">>=" | ">>>="
  | "|=" | "^=" | "&="
}
```

### LogicalOperator

逻辑运算符，两种值，即与 或。

```
enum LogicalOperator {
  "||" | "&&"
}

```

### ConditionalExpression

条件表达式，通常我们称之为三元运算表达式，即 boolean ? true : false。属性参考条件语句。

```
interface ConditionalExpression <: Expression {
  type: "ConditionalExpression";
  test: Expression;
  alternate: Expression;
  consequent: Expression;
}
```

### CallExpression

函数调用表达式，即表示了 func(1, 2) 这一类型的语句。callee 属性是一个表达式节点，表示函数，arguments 是一个数组，元素是表达式节点，表示函数参数列表。

```
interface CallExpression <: Expression {
  type: "CallExpression";
  callee: Expression;
  arguments: [ Expression ];
}
```

### NewExpression

new 表达式。

```
interface NewExpression <: CallExpression {
  type: "NewExpression";
}

```
