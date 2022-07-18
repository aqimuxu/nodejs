const user = {
    name:'<script />' //这里引号或者飘飘符号都可以
}

const result = `<h2>${user.name}</h2>`
const vm = require('vm')

const templateMap = {
    'templateA': '`<h2>${include("templateB")}</h2>`', //这里templateB必须写双引号
    templateB: '`<p>hahahaha</p>`'
}

const context = {
    include(name) {
        return templateMap[name]()
    },
    _: function(markup) {
        if (!markup) return '';
        return String(markup)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;')
    }
}

Object.keys(templateMap).forEach(key=>{
    const temp = templateMap[key];

    templateMap[key] = vm.runInNewContext(
        `(function (){return ${temp}})` //debug发现templateMap[key]=function() { return `<h2>${include("templateB")}</h2>`}
        ,context) //templateMap[key]=function() { return `<p>hahahaha</p>`}
})

console.log(templateMap['templateA']())
