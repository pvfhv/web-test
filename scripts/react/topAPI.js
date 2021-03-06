/**
 * Created by anchao on 2016/2/22.
 */

import ReactDOMServer from 'react-dom/server';

class TopAPI extends React.Component{
    render(){
        let child = React.createElement('div',{style:{color:'red',background:'yellow'},id:'div100'},'<p>abc</p>');
        let temp1 = React.DOM.div(null,'hello');
        let b = React.isValidElement(child);//true
        console.log(b);

        //let fnNew = React.createFactory('div');
        //let child = fnNew({x:1});

        let fnNew = React.createFactory(TestEle);
        let newChild = fnNew({x:100});

        return (
            <div>
                {child}{newChild}
                <span>
                    {temp1}
                </span>
                <TestMap>
                    <div>第一项</div>
                    <div>第二项</div>
                    <div>第三项</div>
                </TestMap>
            </div>
        );
    }
}

var TestMap = React.createClass({
    componentDidMount :function(){
       var oUl = ReactDOM.findDOMNode(this);
       $(oUl).find('li').eq (0).css('background','red');
   },
   render:function(){
       let arr = [];
       return (
           <ul>
               {
                   //React.Children.map(this.props.children,function(obj){
                   //    return (
                   //        <li>{obj}</li>
                   //    );
                   //})
                   React.Children.forEach(this.props.children,function(obj,index){
                       //console.log(React.isValidElement(obj));  //true
                       //console.log($.isPlainObject(obj.props));

                       for(var prop in obj.props){
                            arr.push(obj.props[prop]);
                       }
                   })
               }
               {arr.map((obj,index)=>{
                   var sText = "";

                   if(index==React.Children.count(this.props.children)-1){
                       sText = <li key={index}>{obj}{index}</li>;
                   }else{
                       sText = <li key={index}>{obj}</li>;
                   }

                   return sText;
               })}
               {
                   //React.Children.only(this.props.children)

                   React.Children.toArray(this.props.children).splice(1,1)
               }
               {
                   ReactDOMServer.renderToString(<div id="div2">服务器端的字符串渲染</div>)
               }
               {
                   ReactDOMServer.renderToStaticMarkup(<div id="div3">服务器端的字符串渲染没有多余的代码</div>)
               }
           </ul>
       );
   }
});

var TestEle = React.createClass({
   render:function(){
       return (
           <div>{this.props.x}</div>
       );
   }
});

TopAPI.PropTypes={
    x:React.PropTypes.number
};

export default TopAPI;