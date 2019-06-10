$(function(){
  //所有信息
  var USER = {
    security: {
      security1_luggage: 1,//打包行李
      security2_inspect: 1,//检查车辆
      security3_overtake: 1,//超车
      security4_trafficJam: 1,//堵车
      security5_tollGate: 1,//过了收费站
      security6_rightFoot: 1,//放松右脚
      security7_rest: 1//去服务区
    }
  }
  var ISVIDEOPLAY = true;
  //进度条
  if (getUrlParameter("again") == 1) {
    $("#app .loading .start").fadeIn(200);
  } else {
    $("#app .loading h2").show();
    loading("#app .loading h2", "#app .loading .progress", 1000, function(){
      $("#app .loading h2").fadeOut(100);
      $("#app .loading .start").fadeIn(200);
    });
  }
  //开始
  $("#app .loading .start img").on("click", function(){
    $("ul li.page1").show();
    $(".page2 .subject_four img,.subject_four img,.subject_box .fix_box,.page3 .subject_six .imgList,.subject_seven .imgList").addClass("fadeShow");
    var pauseList = [
      {second: 13, ele: "#subject1"}, 
      {second: 18, ele: "#subject3"}, 
      {second: 25, ele: "#subject4"}, 
      {second: 33, ele: "#subject5"}, 
      {second: 36, ele: "#subject6"}, 
      {second: 40, ele: "#subject7"}, 
    ]
    videoPlay("video1");
    videoPause("video1", pauseList);
  })
    //视频播放
  function videoPlay(video, callback){
    var _video = document.getElementById(video);
    //调用 <_videoio> 元素提供的方法 play()
    _video.play();
    //判斷 WeixinJSBridge 是否存在
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        _video.play();
    } else {
      //監聽客户端抛出事件"WeixinJSBridgeReady"
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", function() {
            _video.play();
        }, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", function() {
          _video.play();
        });
        document.attachEvent("onWeixinJSBridgeReady", function() {
          _video.play();
        });
      }
    }
    setTimeout(function(){$("#app .loading").fadeOut(100);}, 500);
    if (callback) {
      _video.onended = function() {$(".videoPage").hide();callback();}; 
    }
  }
  //视频暂停
  function videoPause(video, pauseList){
    var _video = document.getElementById(video);
    var _curPauseTime;
    //使用事件监听方式捕捉事件
    _video.addEventListener("timeupdate",function(){
      var timeDisplay;
      //用秒数来显示当前播放进度
      timeDisplay = Math.floor(_video.currentTime);
      //timeDisplay = _video.currentTime;
      if (timeDisplay > _curPauseTime + 1) {ISVIDEOPLAY = true;}
      for (var i = 0; i < pauseList.length; i++) {
        if (timeDisplay == pauseList[i].second && ISVIDEOPLAY) {
          _curPauseTime = timeDisplay;
          ISVIDEOPLAY = false;
          _video.pause();
          $(pauseList[i].ele).fadeIn(200).addClass("on");
        }
      }
    },false);
  }
  //选择性别
  $("#subject1 .subject_two img").on("click", function(){
    $(this).parent(".img").addClass("on").siblings(".img").removeClass("on");
    USER.sex = $(this).parent(".img").index();
  })
  //开启国庆自驾之旅
  $("#subject1 .subject_three .btn1").on("click", function(){
    var _self = this;
    confirms(this, 100, function(){
      $(".page1").fadeOut(200);
      $(".page2").show();
      setTimeout(function(){$(".page2 .guide").fadeOut(200);}, 1500)
      setTimeout(function(){$("#hand").fadeOut(200);}, 6000)
    }) 
  })
  $(".page1 .subject_four, .page2 .guide,.page2 .subject_four").on("click", function(){$(this).fadeOut(200);});
  //整理行李箱
  $(".page2  dd").on("click", function(){
    $(this).toggleClass("on");
  })
  $(".page2 .btn1").on("click", function(){
    confirms(this, 100, function(){
      var _num = $(".page2 dd.card.on").length;
      if (_num !== 4) {
        USER.security.security1_luggage = 0;
        $(".page2 .subject_four,.page2 .subject_four img").fadeIn(200);
      } else {
        $(".page2").fadeOut(200);
        $(".page3, #subject2").show();
      }
    })
  })
  //检查车辆
  $(".page3 .subject_three .btn1").on("click", function(){
    confirms(this, 100, function(){
      $(".page3 .subject_three").hide();
      $(".subject_seven").fadeIn(200);
    })
  }) 
  $(".page3 .subject_seven .btn5").on("click", function(){
    confirms(this, 100, function(){
      $(".subject_seven").fadeOut(200);
      $(".page3 .people .img").addClass("checked");
      $(".page3 .point,.page3 .subject_five").fadeIn(200).addClass("on");
      $(".page3 .hand").fadeIn(200);
      setTimeout(function(){$(".page3 .hand").fadeOut(200);}, 4000);
    })
  })
  $(".page3 .subject_three .btn2").on("click", function(){
    confirms(this, 100, function(){
      USER.security.security2_inspect = 0;
      $(".page3 .subject_four,.page3 .subject_four img").fadeIn(200);
    })
  })
  $(".page3 .subject_four").on("click", function(){
    $(".page3 .subject_four").hide();
  }) 
  $(".page3 .subject_five .imgList .img").on("click", function(){
    if ($(this).hasClass('on')) {return;}
    var _index = $(this).index();
    console.log(_index);
    //$(this).hide();
    $(".page3 .subject_six .img img").data("index", _index)
    $(".page3 .subject_six").fadeIn(200);
    $(".page3 .subject_six .imgList img:eq("+_index+")").show();
  })
  $(".page3 .subject_six .btn4").on("click", function(){
    confirms(this, 100, function(){
      $(".page3 .point .imgP:eq("+$(".page3 .subject_six .img img").data('index')+")").hide();
      $(".page3 .subject_six,.page3 .subject_six .imgList>img").fadeOut(50);
      $(".page3 .subject_five .imgList .img:eq("+$(".page3 .subject_six .img img").data('index')+")").addClass("on");   
    })
  })
  $(".page3 .subject_five .btn3").on("click", function(){
    confirms(this, 100, function(){
      if ($(".page3 .subject_five .imgList .img.on").length !== 3) {
        USER.security.security2_inspect = 0;
        $(".page3 .subject_four,.page3 .subject_four img").fadeIn(200);
      } else {
        videoPlay("video1");
        setTimeout(function(){
          $(".page3").fadeOut(200);
          $(".page4").show();
        }, 500);
      }
    })
  })
  //超车答题
  $("#subject3 .subject_two .btn1,#subject3 .btn3").on("click", function(){
    confirms(this, 100, function(){
      $(".page4").fadeOut(200);
      $(".page5").show();
      videoPlay("video1");
    })
  }) 
  $("#subject3 .subject_two .btn2").on("click", function(){
    confirms(this, 100, function(){
      USER.security.security3_overtake = 0;
      $("#subject3 .fix_box").fadeIn(200);
      $("#subject3 .subject_three").fadeIn(200);
    })
  }) 
  //堵车答题
  $("#subject4 .subject_two .btn2,#subject4 .btn3").on("click", function(){
    confirms(this, 100, function(){
      $(".page5").fadeOut(200);
      $(".page6").show();
      videoPlay("video1");
    })
  }) 
  $("#subject4 .subject_two .btn1").on("click", function(){
    confirms(this, 100, function(){
      USER.security4_trafficJam = 0;
      $("#subject4 .fix_box").fadeIn(200);
      $("#subject4 .subject_three").fadeIn(200);
    });
  }) 
  //收费站答题
  $("#subject5 .subject_two .btn2,#subject5 .btn3").on("click", function(){
    confirms(this, 100, function(){
      $(".page6").fadeOut(200);
      $(".page7").show();
      videoPlay("video1");
    });
  }) 
  $("#subject5 .subject_two .btn1").on("click", function(){
    confirms(this, 100, function(){
      USER.security.security5_tollGate = 0;
      $("#subject5 .fix_box").fadeIn(200);
      $("#subject5 .subject_three").fadeIn(200);
    });
  }) 
  //过了收费站是否放松右脚答题
  $("#subject6 .subject_two .btn2,#subject6 .btn3").on("click", function(){
    confirms(this, 100, function(){
      $(".page7").fadeOut(200);
      $(".page8").show();
      videoPlay("video1");
    });
  }) 
  $("#subject6 .subject_two .btn1").on("click", function(){
    confirms(this, 100, function(){
      USER.security.security6_rightFoot = 0;
      $("#subject6 .fix_box").fadeIn(200);
      $("#subject6 .subject_three").fadeIn(200);
    });
  }) 
  //考虑要不要去服务区休息答题
  $("#subject7 .subject_two .btn1,#subject7 .btn3").on("click", function(){
    confirms(this, 100, function(){
      $(".page8").fadeOut(200);
      videoPlay("video1", function(){
        $(".page9").show();
        calculation(USER, function(res){
          console.log(res)
          var _index;
          if (res.no === 0) {
            _index = 0;  
          } else if (res.no <= 3) {
            _index = 1;
          } else {
            _index = 2;
          }
          $(".share .share_top img:eq("+_index+"), .poster img:eq("+_index+")").show();
          $(".page9").fadeOut(200);
          $(".share").show();
        });
      });
    });
  }) 
  $("#subject7 .subject_two .btn2").on("click", function(){
    confirms(this, 100, function(){
      USER.security.security7_rest = 0;
      $("#subject7 .fix_box").fadeIn(200);
      $("#subject7 .subject_three").fadeIn(200);
    });
  }) 
  //再玩一次
  //$(".share_canvas a").on("click", function(){window.history.go(0);});
  $(".share_canvas a").on("click", function(){
    if (getUrlParameter("again") === 1) {
      window.history.go(0);
    } else {
      if (window.location.href.indexOf("?") != -1) {
        window.location.replace(window.location.href + "&again=1");
      } else {
        window.location.replace(window.location.href + "?again=1");
      }
    }
  });
  //计算安全系数
  function calculation(obj, callback){
    obj = obj.security
    var i = 0;
    var j = 0;
    for (var x in obj) {
      i++;
      if (obj[x] === 1) {
        j++;
      }
    }
    callback({total: i, yes: j, no: i - j})
  }
  //重置
  function reset(){
    $(".on").removeClass("on");
    $(".page3 .subject_three,.page3 .point .imgP").show();
    $(".page3 .subject_five,.page3 .point,.subject_box .subject_three").hide();
    $(".checked").removeClass("checked");
    videoReset();
  }
  //点击确定按钮
  function confirms(_this, delay, callback){
    $(_this).addClass('checked');
    setTimeout(function(){
      callback();
      $(_this).removeClass('checked');
    }, delay)
  }
  function confirm(_this, delay, callback){
    $(_this).hide().siblings().show();
    setTimeout(function(){
      callback();
      $(_this).show().siblings().hide();
    }, delay)
  }
  function cancel(_this){
    $(_this).hide().siblings().show();
  }
  //加载进度条
  function loading(ele, ele2, speed, callback){
    $(ele2).animate({ 'width': '0%' }, 0).animate({ 'width': '33%' }, speed * 2).animate({ 'width': '66%' }, speed * 2).animate({ 'width': '100%' }, speed * 3);
    setTimeout(function () {
        var timer = setInterval(function () {
            var wtg2 = $(ele2).attr("style").split(".")[0];
            var wtg = parseInt(wtg2.replace(/[^0-9]/ig, "")) + 1;
            if ( wtg <= 100) { $(ele).text(wtg + "%");}
            if (wtg == 101) {
              clearInterval(timer);
              callback();
            }
        }, 50);
    }, 1);
  }
  function audioControls(audio, callback){
    var _audio = document.getElementById(audio);
    if (_audio.paused) {
      _audio.play();
      callback({status: 1});
    } else { 
      _audio.pause(); 
      callback({status: 0});
    } 
  }
  //视频重置
  function videoReset(){
    var _allVideo = document.getElementsByTagName("video");
    for (var i in _allVideo){
      console.log(_allVideo[i]);
      _allVideo[i].currentTime = 0;
      _allVideo[i].controls = false;
    }
  }
  /*从地址栏获取传参*/
  function getUrlParameter(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var URL =  decodeURI(window.location.search);
    var r = URL.substr(1).match(reg);
    if(r!=null){
        //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
        return  decodeURI(r[2]);
    };
    return null;
  }
  /*判断当前手机系统（Android/ios）*/  
  function isSystem(callback) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    callback({isAndroid: isAndroid, isiOS: isiOS});  
  }
  /*h5生成图片*/  
  function canvasImg(options, callback) {
    var P_W = window.innerWidth;
    var P_H = window.innerHeight;
    var PSD_W = options.psd_w;
    var PSD_H = options.psd_h;
    var canvas = document.getElementById(options.canvasId);
    var ctx = canvas.getContext("2d");  
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;
    canvas.width = P_W * ratio;
    canvas.height = P_H  * ratio;
    canvas.style.width = P_W + "px";
    canvas.style.height = P_H + "px";
    ctx.scale(ratio, ratio);
    options.imgList.unshift({url: options.bgImg,imgW2: PSD_W,imgH2: PSD_H,imgX: 0,imgY: 0});
    var vars = {};
    for (var m in options.imgList) {
      vars["newImg" + m] = new Image();
      vars["newImg" + m].setAttribute("crossOrigin",'anonymous');
      vars["newImg" + m].src = options.imgList[m].url;
    }
    vars["newImg" + (options.imgList.length - 1)].onload = function() {
      //绘制图片  
      for (var n in options.imgList) {
        ctx.drawImage(vars["newImg" + n], 0, 0, vars["newImg" + n].width, n != 0 ? vars["newImg" + n].height : PSD_H,P_W * (options.imgList[n].imgX / PSD_W),P_H * (options.imgList[n].imgY / PSD_H), P_W * (options.imgList[n].imgW2 / PSD_W), P_H * (options.imgList[n].imgH2 / PSD_H));
      }
      //绘制文字
      if (options.textList.length !== 0) {
        for (var k in options.textList) {
          ctx.fillStyle = options.textList[k].color;
          ctx.font = options.textList[k].fontSize + ' ' + options.textList[k].fontFamily;
          ctx.textBaseline = 'hanging';
          isSystem(function(res){
            if (res.isiOS) {options.textList[k].textY -= 10;} 
          });
          ctx.fillText(options.textList[k].string, P_W * (options.textList[k].textX / PSD_W), P_H * (options.textList[k].textY / PSD_H)); 
        }
      }
      //生成的图片base64路径
      //setTimeout(function(){callback(canvas.toDataURL("image/png"));}, 1000);
      callback(canvas.toDataURL("image/png"));
    }
  }
  /*背景音乐*/
  isSystem(function(res){
    if (res.isAndroid) {
      var audioContext;
      var audioBufferSourceNode;
      var analyser;
      var decodecFile = function(fileContent) {
        audioContext.decodeAudioData(fileContent, function(buffer) {
          start(buffer);
        });
      }
      var start = function(buffer) {
        if(audioBufferSourceNode) {
            audioBufferSourceNode.stop();
        }
        audioBufferSourceNode = audioContext.createBufferSource();
        audioBufferSourceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        audioBufferSourceNode.buffer = buffer;
        audioBufferSourceNode.loop = true;
        audioBufferSourceNode.start(0);
        $("#musio_btn").show();
      }
      //window.onload = function() {
        //audioContext = new AudioContext() || window.webkitAudioContext;
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        audioContext = new window.AudioContext();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        loadAudioFile('./images/music.mp3');
      //}
      function loadAudioFile(url) {
        var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(e) { //下载完成
          console.log(this.response);
          decodecFile(this.response);
        };
        xhr.send();
      }
      $("#musio_btn").on("click", function(){
        if (audioContext.state == "suspended") {
          audioContext.resume();
          $(this).removeClass("on");
        } else if (audioContext.state == "running") {
          audioContext.suspend();
          $(this).addClass("on"); 
        }
      });
    } else {
        //背景音乐播放、暂停
        audioAutoPlay();
        autoPlayMusic();
        function audioAutoPlay() {
          var audio = document.getElementById('myAudio');
          audio.play();
          document.addEventListener("WeixinJSBridgeReady", function () {
              audio.play();
          }, false);
          $("#musio_btn").show();
        }
        // 音乐播放
        function autoPlayMusic() {
            // 自动播放音乐效果，解决浏览器或者APP自动播放问题
            function musicInBrowserHandler() {
                musicPlay(true);
                document.body.removeEventListener('touchstart', musicInBrowserHandler);
            }
            document.body.addEventListener('touchstart', musicInBrowserHandler);
            // 自动播放音乐效果，解决微信自动播放问题
            function musicInWeixinHandler() {
                musicPlay(true);
                document.addEventListener("WeixinJSBridgeReady", function () {
                    musicPlay(true);
                }, false);
                document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
            }
            document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
        }
        function musicPlay(isPlay) {
            var media = document.querySelector('#myAudio');
            if (isPlay && media.paused) {
                media.play();
            }
            if (!isPlay && !media.paused) {
                media.pause();
            }
        }
        $(".backMusic .musio_btn").on("click", function(){
          var _self = this;
          audioControls("myAudio", function(res){
            if (res.status === 0) {
              $(_self).addClass("on");
            } else {
              $(_self).removeClass("on");
            }
          });
        });
    }
  });
  
})