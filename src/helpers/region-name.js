const regionName = [
    {value:1, name:'Europe'},
    {value:2, name:'North America'},
    {value:3, name:'Australia'},
    {value:4, name:'New Zealand'},
    {value:5, name:'Japan'},
    {value:6, name:'China'},
    {value:7, name:'Asia'},
    {value:8, name:'Worldwide'},
    {value:9, name:'Korea'},
    {value:10, name:'Brazil'},

]

const getRegionName = (value) => regionName[value -1].name

export {getRegionName}