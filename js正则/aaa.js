//没有vconsole版
(function (window, undefined) {
  if (window.__model_360browser_youtube) {
    console.log("已经注入了__model_360browser_youtube！");
    window.__model_360browser_youtube.initPage();
    return;
  }
  function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while (new Date().getTime() < startTime) {}
  }

  function debounce(method, delay) {
    var timer = null;
    return function () {
      var self = this,
        args = arguments;
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        method.apply(self, args);
      }, delay);
    };
  }

  //翻译状态
  var Enum_translateStatus = {
    default: -1,
    loading: 2,
    error: 0,
    success: 1,
  };

  var Common = {
    //生成随机数
    randomWord: function (randomFlag, min, max) {
      var str = "";
      var range = min;
      var arr = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      ]; //随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return "tag_" + str;
    },
    showDom: function (dom, isFlex) {
      var displayStr = isFlex ? "flex" : "block";
      if (dom) {
        if (dom.length > 0) {
          for (var i = 0; i < dom.length; i++) {
            dom[i].style.display = displayStr;
          }
        } else {
          dom.style.display = displayStr;
        }
      }
    },
    hideDom: function (dom) {
      if (dom) {
        if (dom.length > 0) {
          for (var i = 0; i < dom.length; i++) {
            dom[i].style.display = "none";
          }
        } else {
          dom.style.display = "none";
        }
      }
    },
    afterHtml: function (dom, newDom) {
      if (!dom || !newDom) return;
      var parent = dom.parentNode; // 找到指定元素的父节点
      parent.insertBefore(newDom, dom.nextSibling);
    },
    //查找最近的符合条件的祖先元素
    getParentsDom: function (dom, querySelector) {
      // querySelector = {
      //     className:'',
      //     id:''
      // }
      if (dom) {
        var item = dom;
        while (true) {
          if (!item.parentElement) {
            return null;
          } else {
            for (var key in querySelector) {
              if (item[key] == querySelector[key]) {
                return item;
              }
            }
            item = item.parentElement;
          }
        }
      }
      return null;
    },
    //查找符合条件的所有子孙元素
    getChildsDom: function (item, querySelector) {
      var result = []; //用来接收最终结果
      //获取子元素中的符合的结果
      function forFn(arr) {
        for (var i = 0; i < arr.length; i++) {
          var item1 = arr[i];
          for (var key in querySelector) {
            if (
              item1[key].toLocaleLowerCase() ==
              querySelector[key].toLocaleLowerCase()
            ) {
              result.push(item1);
              return;
            } else {
              if (item1.children && item1.children.length) {
                forFn(item1.children);
              }
            }
          }
        }
      }
      forFn(item.children);
      return result;
    },
  };

  function __360browser_youtube() {}
  __360browser_youtube.prototype = {
    intervalIndex: 0,
    obj_translate: {}, //当前翻译的一个状态树
    page: "",
    translateStatus: Enum_translateStatus.default, //翻译状态
    addEvent: function () {
      var that = this;
      window.addEventListener("popstate", function (event) {
        that.intervalIndex = 0;
        if (!that.__360browser_share_clicked) {
          window.__360browser_youtube_downloadSuccessed = false;
        }
        that.initPageFor();
      });

			document.addEventListener('DOMNodeRemoved', function(e) {
				
				if(e.target.className == '__360browser_translate_item'){
					console.log(e,123);
				}
			})
			
      //用来规避：页面点击时，追加的元素失效
      document.documentElement.addEventListener("click", function (e) {
        that.intervalIndex = 0;
        if (that.page == "details") {
          var dom = e.srcElement || e.target;
          var dom_item = Common.getParentsDom(dom, {
            className: "large-media-item-thumbnail-container",
          });
					console.log(dom_item,'dom_item');
					
          if (dom_item) {
            //点击其他视频时，下载按钮隐藏
            window.__360browser_youtube_downloadSuccessed = false;
            console.log("点击了其他视频");
          }
          //详情页：分享按钮等区域
          var dom_share =
            Common.getParentsDom(dom, {
              className: "slim-video-metadata-actions",
            }) ||
            Common.getParentsDom(dom, {
              className: "dialog",
            });
          if (dom_share) {
            that.__360browser_share_clicked = true;
          } else {
            that.__360browser_share_clicked = false;
          }
        }
				that.initPage_details();
        //that.initPageFor();
      });

      if (that.page == "home") {
        //首页中：滚动时,需要根据新创建的新闻标题渲染dom
        window.addEventListener(
          "scroll",
          debounce(function () {
            that.initPage_home();
          }, 200)
        );
      }
    },
    initPageFor: function () {
      var that = this;
      if (that.intervalId) {
        clearInterval(that.intervalId);
      }
      that.initPage();
      that.intervalId = setInterval(function () {
        if (that.intervalIndex > 8) {
          clearInterval(that.intervalId);
          return;
        }
        that.intervalIndex++;
        that.initPage();
      }, 1000);
    },
    initPage: function () {
      var that = this;
      var url = window.location.href;
      // console.log("initpage方法");
      //详情页
      if (url.indexOf("youtube.com/watch") > -1) {
        this.page = "details";
        // this.initPageDetailsFor();
        this.initPage_details();
        // console.log(new Date());
        // console.log("渲染播放页initPageDetails");
      }
      //首页
      else if (
        url == "https://m.youtube.com/" ||
        url == "http://m.youtube.com/"
      ) {
        this.page = "home";
        this.initPage_home();
        // console.log(new Date());
        console.log("渲染首页");
      }
    },
    //初始化：主页
    initPage_home: function () {
      //拼接翻译区域
      //获取页面中的所有新闻，插入对应的翻译区域
      var items = document.getElementsByClassName("details");
      if (items && items.length > 0) {
        console.log(new Date());
        console.log("主页中：新闻的个数获取为！" + items.length);
        for (var i = 0; i < items.length; i++) {
          //检测当前item是否已经创建了翻译dom
          var nextDom = items[i].nextElementSibling;
          if (nextDom && nextDom.className == "__360browser_translate_item") {
            console.log("当前item已经创建过翻译dom" + i);
          } else {
            console.log("00:当前item还未创建过翻译dom" + i);
            var newDom = document.createElement("div");
            newDom.className = "__360browser_translate_item";
            newDom.innerHTML = this.initHtml_translate();
            Common.afterHtml(items[i], newDom);
          }
        }
      } else {
        console.log(new Date());
        console.log("主页中：新闻的个数获取为空！");
      }
    },
    //初始化：播放页
    initPage_details: function () {
      if (this.page != "details") {
        return;
      }
      //console.log("渲染播放页！initPage_details");
      var html = "";
      //拼接：翻译区域
      html += this.initHtml_translate();

      //拼接：下载按钮
      html += this.initHtml_download();

      /* 创建dom  */
      //检测是否已经存在注入
      var dom_youtube = document.getElementById(
        "__360browser_youtube_download_div"
      );
      if (!dom_youtube) {
        console.log("页面中不存在dom_youtube，执行注入！");
        var dom_title = document.getElementsByClassName(
          "scwnr-content"
        )[0];
				var dom_title = document.getElementById('app')
        var newDom = document.createElement("ytm-companion-slot");
        newDom.className = "__360browser_translate_item";
				var headBarHeight = document.getElementById('header-bar').clientHeight;
				var ytpHeight =  document.getElementById('player-container-id').clientHeight;
				var badgeHeight =  document.getElementsByClassName('slim-video-metadata-standalone-badge')[0].clientHeight;
				var metadataHeight =  document.getElementsByClassName('slim-video-metadata-header')[0].clientHeight;
				var topH = headBarHeight+ytpHeight+badgeHeight+metadataHeight;
				
				newDom.style.cssText = `
				position:absolute;
				top: ${topH}px;
    		width: 100%;
				`
        newDom.innerHTML = html;
        Common.afterHtml(dom_title, newDom);

      } else {
        // console.log("页面中已经存在dom_youtube");
      }
			var css_youtube = document.getElementById(
        "__360browser_youtube_download_css"
      );
			if (!css_youtube) {
				var style = document.createElement('style');
				style.type = 'text/css';
				style.appendChild(document.createTextNode('.slim-video-metadata-actions {margin:96px 0 0}'));
				var head = document.getElementsByTagName("head")[0];
head.appendChild(style);
			}
      if (true) {
        this.__360browser_youtube_show_download(true);
      }
    },
    //拼接html-- 下载按钮
    initHtml_download: function () {
      var html = "";
      html +=
        '<div  id="__360browser_youtube_download_div"  style="display:none;margin-bottom:20px;width:100%;box-sizing: border-box;padding:0 12px;text-align: center;">';
      html +=
        '  <button onclick="__360browser_ytb_download_btn_clicked() " style="width:100%;height:44px;font-size:14px;display: flex;align-items: center;justify-content: center;border-radius:4px;background:#F7F7F7;font-weight: bold; color:#0079FF;outline: none;text-decoration: none;border:0;"> ';
      html +=
        '<img style="display:block;width:22px;height:22px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAADWklEQVR4Xu3cP27UQBQG8O8hsg1UdNCBhESRI0AFQoIODgAXQEgUEewSoQBigRRcAYkKTsABoEBIgARdKipSpglNpOwgs1nk3XiZGT8/+zn6XK5mnmd+/jzeP8kIeJgKiGl1FgeBjUNAYAIbCxiXZ4IJbCxgXJ4JJrCxgHF5JpjAxgLG5ZlgAhsLGJdngglsLGBcngkm8IHARhhgD08A3Dp45Q0GeIQN2TM2UpXvT4JH4QUC7s/NVvASY3mgEjDu3CfgXwg4vQC8jbGcMTZSle8P8DCEypk+F9dzcD24OVACq+6keGcCx41ULQis4ot3JnDcSNWCwCq+eGcCx41ULQis4ot3JnDcSNWCwCq+eGcCx41ULQis4ot3JnDcSNWCwCq+eGcCx41ULQgc4RuGSxC8AnABwBcAdzGW78noTQGvh6vYxyaAcxB8wgru4LFsJY8js2E73wevh7PYxw8AJ/6NT7ALwTU8k49JY24CeBSK3/NeI+BY6Zw/cQqrWJPfSePIbNQO8CisIfxNzfyRg6wFrsadjkdwHWN5n2mX1Lxb4Onk0pKsAf4f7pEArloiytc/BbkucAwXOAJLRIH5MNzABO8ArFTeWzHkOsBx3B0cx2U8lW9J93uNRu0sEbOBDcNNAG9rIecCp+AKrmAsX2u4JXdpF7gYVl3kHGAnuNPlvYujDnIqsCPc7oDrJDkF2Blut8C5D74YsEPc7oFzkCf4ULmaFX865RTXB3AqcsDJJW/vbld8/C033UEL7xaWPcq6echVjSb2Pnn5DCYL3y24wfWT4BlJXeRq/E6TOxuSnwQ3i+wC11+Cm0F2g+sXOOXB53hZKA/N3xJRHl3emuwquX7X4MVkpiG7xPW9RKQn2S1uf4CXr8mucfsFPEW+iAk2ITiPgM8Y4J7lL8LLPtvkvO77IZczE6dtCWx8YQhMYGMB4/JMMIGNBYzLN5/g8r4Oi/8dbzwZdXnBNoBG96FoHrhqXwf1zFsu0OA+FBbAh/d1aNlHfboiyQ3tQ0HgqqvhHPjw1i/qSLVcwPUSwYfcXBqaXyJaDpv30xHY+AoRmMDGAsblmWACGwsYl2eCCWwsYFyeCSawsYBxeSaYwMYCxuWZYAIbCxiXZ4IJbCxgXJ4JJrCxgHH5P7auWGhxSZU3AAAAAElFTkSuQmCC" /> ';
      html += '  <span style="margin-left:4px;">下载视频</span>';
      html += "</button> ";
      html += "</div>";
      return html;
    },
    //拼接html-- 翻译区域
    initHtml_translate: function () {
      var randomWord = Common.randomWord(false, 32);
      var html = "";
      //首页缩进64px，详情页缩进：12px
      if (this.page == "home") {
        html +=
          '<div style="margin-top:-24px;width: 100%; padding: 0 40px; box-sizing: border-box;"> ';
      } else {
        html += '<div style="margin-top:-16px;">';
      }
      html +=
        '   <div id="__360browser_translate_' +
        randomWord +
        '" style="margin: 4px 0 12px;"> ';
      html +=
        ' <div class="__360_ytb_translate_header"      style="width: 100%;height: 32px;padding: 0 12px;box-sizing: border-box;display: flex;justify-content: space-between;align-items: center; "    >';
      // 翻译标题
      html +=
        '<button  onclick="__360browser_translate_btn_clicked(this,&#34;' +
        randomWord +
        '&#34;)"  class="__360_ytb_translate_default"      style="text-align:left; font-size: 12px; width: 72px;height:100%;color: #0079ff;border: 0;background: transparent;outline: none;">翻译标题</button>';
      //翻译中。。
      html +=
        ' <span  class="__360_ytb_translate_loading"  style="display: none; color: #777; font-size: 12px;">翻译中...</span>';
      //翻译失败
      html +=
        ' <span  class="__360_ytb_translate_error"  style="display: none; color: #777; font-size: 12px;">翻译失败</span>';
      // 翻译结果
      html +=
        '  <div  class="__360_ytb_translate_success"    style="display: none; color: #777; font-size: 12px;">翻译结果</div>';
      html +=
        '<div class="__360_ytb_translate_result" style="display: none;justify-content: center; align-items: center;">'; //flex
      html += '  <span style="color: #999; font-size: 12px;">Powered By</span>';
      html +=
        '  <img style="display: block; width: 48px; height: 16px; margin-left: 4px;" src="data:image/png;base64,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"/>';
      html += "    </div> ";
      html += "  </div> ";

      //翻译成功
      var str_success = "";
      if (this.page == "home") {
        str_success = "margin-bottom:12px;";
      }
      html +=
        ' <div  class="__360_ytb_translate_result1"    style="display: none;' +
        str_success +
        'width: 100%;padding: 0 12px;box-sizing: border-box;color: #222;font-size: 14px;line-height: 22px;"> 这是翻译结果</div>';

      //翻译失败
      html +=
        '  <div   class="__360_ytb_translate_result0"   style="display: none;width: 100%;height: 32px;line-height: 32px;padding: 0 12px;margin: 4px 0 13px 0;box-sizing: border-box;color: #777;font-size: 12px;text-align: center;"> ';
      html +=
        '<span>连接超时，</span><span  onclick="__360browser_translate_reload_clicked(this,&#34;' +
        randomWord +
        '&#34;)"  style="display: inline-block;color: #0079ff;font-size: 12px;">点此重试</span> ';
      html += "</div>";

      html += "</div>  ";

      //最外层div
      html += " </div>";

      return html;
    },
    //翻译
    __360browser_translate_btn_clicked: function (dom, word) {
      var that = this;
      var title = "";
      //主页
      Common.hideDom(dom);
      Common.hideDom(dom.nextElementSibling.nextElementSibling);
      Common.showDom(dom.nextElementSibling);
      if (this.page == "home") {
        //获取标题
        var dom_item = Common.getParentsDom(dom, {
          className: "__360browser_translate_item",
        });
        var h3 = Common.getChildsDom(dom_item.previousElementSibling, {
          tagName: "h3",
        });

        if (!h3 || h3.length == 0) {
          console.log("dom树结构发生变化！");
          return;
        }
        title = h3[0].children[0].innerHTML;
      } else {
        //详情页
        var dom_title = document.getElementsByClassName(
          "slim-video-metadata-title"
        );
        if (!dom_title || dom_title.length == 0) {
          console.log("播放页：dom树发生改变！");
          return;
        }
        title = dom_title[0].innerHTML;
      }

      var params = {
        txt: title, //标题
        tag: word,
        callback: "callback_translate",
      };
      //   console.log(params);
      console.log(
        "$a3youtubecustom_cmd:A3Msg_YoutubeCustom_translate_clicked:" +
          JSON.stringify(params)
      );
      //将当前tag标记一下，2.5s后还没有返回结果，默认失败
      this.obj_translate[word] = Enum_translateStatus.loading;
      setTimeout(function () {
        //不是成功状态，则失败
        if (that.obj_translate[word] != Enum_translateStatus.success) {
          Common.hideDom(dom.nextElementSibling);
          Common.showDom(dom.nextElementSibling.nextElementSibling); //翻译失败
          Common.showDom(
            Common.getChildsDom(dom.parentElement, {
              className: "__360_ytb_translate_result",
            }),
            true
          );
          Common.showDom(
            Common.getChildsDom(dom.parentElement.parentElement, {
              className: "__360_ytb_translate_result0",
            }),
            false
          );
        }
      }, 2500);
    },
    //点此重试
    __360browser_translate_reload_clicked: function (dom, word) {
      var dom_item = Common.getParentsDom(dom, {
        className: "__360browser_translate_item",
      });
      var dom_btn = Common.getChildsDom(dom_item, {
        tagName: "button",
      });
      __360browser_translate_btn_clicked(dom_btn[0], word);
    },
    callback_translate: function (res) {
      //console.log("翻译回调");
      // callback_translate({
      //   val: "哈哈哈哈或或",
      //   tag: "tag_dc5d4e2cfa29545b22a8abb458c52129",
      // });
      if (!res.tag || !res.val) {
        return;
      }
      this.obj_translate[res.tag] = Enum_translateStatus.success; //成功状态
      //主页
      var dom_item = document.getElementById(
        "__360browser_translate_" + res.tag
      );
      if (dom_item) {
        var item_childs = dom_item.children[0].children;
        //显示对应的UI
        for (var i = 0; i <= 3; i++) {
          if (i == 3) {
            Common.showDom(item_childs[i]);
          } else {
            Common.hideDom(item_childs[i]);
          }
        }
        Common.hideDom(dom_item.children[2]); //翻译失败
        dom_item.children[1].innerHTML = res.val;
        Common.showDom(
          Common.getChildsDom(dom_item.parentElement, {
            className: "__360_ytb_translate_result",
          }),
          true
        );
        Common.showDom(dom_item.children[1]); //翻译成功
      }

      if (this.page == "home") {
      } else {
        //播放页
      }
    },

    __360browser_youtube_show_download: function (isShow) {
      window.__360browser_youtube_downloadSuccessed = isShow;
      var dom = document.getElementById("__360browser_youtube_download_div");
      Common.showDom(dom);
    },
    //下载按钮点击
    __360browser_ytb_download_btn_clicked: function () {
      var dom_video = document.getElementsByTagName("video");
      if (dom_video && dom_video.length) {
        var video_url = dom_video[0].getAttribute("src");
        console.log(
          "$a3youtubecustom_cmd:A3Msg_Host_YoutubeCustom_download_clicked:" +
            video_url
        );
      }
    },
    init: function () {
      // var vConsole = new VConsole();
      //初始化页面
      this.initPage();
      //绑定事件
      this.addEvent();
      //公共函数
      window.__360browser_youtube_show_download = this.__360browser_youtube_show_download.bind(
        this
      );
      window.__360browser_ytb_download_btn_clicked = this.__360browser_ytb_download_btn_clicked.bind(
        this
      );
      window.callback_translate = this.callback_translate.bind(this);
      window.__360browser_translate_btn_clicked = this.__360browser_translate_btn_clicked.bind(
        this
      );
      window.__360browser_translate_reload_clicked = this.__360browser_translate_reload_clicked.bind(
        this
      );
    },
  };

  //  begin exec:

  var onReady = function (cb) {
    if (document.readyState == "loading") {
      var t = function () {
        document.removeEventListener("DOMContentLoaded", t, false);
        cb(document.readyState);
      };
      document.addEventListener("DOMContentLoaded", t, false);
    } else {
      cb(document.readyState);
    }
  };
  onReady(function (state) {
    var delayTime = 1500;
    setTimeout(function () {
      console.log("首次注入__model_360browser_youtube！");
      window.__model_360browser_youtube = new __360browser_youtube();
      window.__model_360browser_youtube.init();
    }, delayTime);
  });
})(window, undefined);
