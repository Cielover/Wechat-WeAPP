Page({
  data:{
      //text:"这是一个页面"
      //初始化id
      id1:"back",
      id2:"clear",
      id3:"negative",
      id4:"+",
      id5:"9",
      id6:"8",
      id7:"7",
      id8:"-",
      id9:"6",
      id10:"5",
      id11:"4",
      id12:"*",
      id13:"3",
      id14:"2",
      id15:"1",
      id16:"/",
      id17:"0",
      id18:".",
      id19:"history",
      id20:"=",
      screenData:"0",
      lastIsOperator:false,
      arr:[],
      logs: []
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  history:function(){
    wx.navigateTo({
      url: '../list/list',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //传递过来点击的事件event
  btnClick: function(event) {//自己定义点击相应事件
    //打log看输出的数据
    console.log(event.target.id);
    //获得点击的数
    var id=event.target.id;
    if(id==this.data.id1){//如果点击的是退格键操作如下
      var data=this.data.screenData;
      if(data==0){//如果值是0，什么也不做
        return ;
      }
      //如果不等于0，开始往后减少
      data=data.substring(0,data.length-1);
      if(data==""||data=="-"){//如果退到只有“”或者“-”的时候赋值为0
        data=0;
      }
      //将screenData赋值为新的data
      this.setData({screenData:data});
      //退格要减掉一个
      this.data.arr.pop();
    }else if(id==this.data.id2){//如果点击的是清屏键操作如下
      //设置当前的data=0
      this.setData({screenData:"0"});
      //清屏时候，数组设置长度为0
      this.data.arr.length=0;
    }else if(id==this.data.id3){//点击的是正负号
      var data=this.data.screenData;
      if(data==0){
        return;//如果等于0，就直接返回
      }
      //获得第一个值，判断是什么
      var firstWord=data.substring(0,1);
      if(firstWord=="-"){//得到的第一个值如果是“-”，重新赋值
        data=data.substring(1,data.length);
        //如果是-去掉第一个元素
        this.data.arr.shift();
      }else{
        data="-"+data;
        this.data.arr.unshift("-");
      }
      //将值设置回去
      this.setData({screenData:data});
    }else if(id==this.data.id20){//点击的是=号，需要得到相应的值
      var data=this.data.screenData;
      if(data==0){//如果输入框是0的情况下就不要管
        return;
      }
      //最后一个必须是数字点击“=”才有意义，所以这里要过滤下
      var lastWord=data.substring(data.length-1,data.length);
      if(isNaN(lastWord)){
        return;//说明不是数字，直接return
      }
      var num="";
      var lastOperator;
      var arr=this.data.arr;
      var optarr=[];
      for(var i in arr){
        if(isNaN(arr[i])==false||arr[i]==this.data.id18||arr[i]==this.data.id3){
          num+=arr[i];
        }else{
          lastOperator=arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num="";
        }
      }
      optarr.push(Number(num));
      var result=Number(optarr[0])*1.0;
      console.log(result+"哈哈");
      for(var i=1;i<optarr.length;i++){
        if(isNaN(optarr[i])){
          //加减乘除的处理
          if(optarr[1]==this.data.id4){
            result+=Number(optarr[i+1]);
          }else if(optarr[1]==this.data.id4){
            result+=Number(optarr[i+1]);
          }else if(optarr[1]==this.data.id8){
            result-=Number(optarr[i+1]);
          }else if(optarr[1]==this.data.id12){
            result*=Number(optarr[i+1]);
          }else if(optarr[1]==this.data.id16){
            result/=Number(optarr[i+1]);
          }
        }
      }
      //保存结果值
      this.data.logs.push(data+"="+result);
      //存每次计算的值
      wx.setStorageSync('callogs', this.data.logs);
      //取值
      console.log(wx.getStorageSync('callogs'))
      //计算完后清空数组
      this.data.arr.length=0;
      this.data.arr.push(result);
      this.setData({screenData:result+""});
    }else{
      //在叠加在后面前，先判断lastIsOperator，是否是true，且不是0
      if(id==this.data.id4||id==this.data.id8||id==this.data.id12||id==this.data.id16){
        if(this.data.lastIsOperator==true||this.data.screenData==0){
          return ;
        }
      }
      //得到全局变量中的参数值，默认是0
      var sd=this.data.screenData;
      var data;
      if(sd==0){//如果参数是0的话
          data=id;
      }else{
          data=sd+id;
      }
      //给screenData设置数据
      this.setData({screenData:data});
      this.data.arr.push(id);
      //判断是否是加减乘除，不能连续添加
      if(id==this.data.id4||id==this.data.id8||id==this.data.id12||id==this.data.id16){
        this.setData({lastIsOperator:true});
      }else{
        this.setData({lastIsOperator:false});
      }
    }
  }
})