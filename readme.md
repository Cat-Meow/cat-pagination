# React Salt - Pagination
适用于分页形式的列表，主要配合table使用，可配置外形大小、自定义类，根据需求以及是否具有总页码判别显示风格。

## API

Props属性如下

props | 说明 | 类型 | 默认值 | 备选 
------------ |--------------- | ------------- | ------------- | -------------
offset | 页码 | number | 0 |
totalPage | 总页数 | number | -1 |
mySize | 大小 | string | normal | large\small\normal |
myStyle | 风格 | string | omitted | fullsize\omitted\compressed |
maxSize | omitted风格下显示格数限制 | number | 10 |
className | 自定义类名 | string | ‘’ |
update | 回调函数 | func | () |
prefixName | 前缀 | string | salt |

