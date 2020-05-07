<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="showList" @mouseleave="hideList">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="isShowFirst">
          <div class="all-sort-list2" @click="toSearch">
            <div
              class="item bo"
              v-for="(c1,index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="showSubCategorys(index)"
              :class="{item_on:index===currentIndex}"
            >
              <h3>
                <a
                  href="javascript:;"
                  :data-categoryname="c1.categoryName"
                  :data-category1id="c1.categoryId"
                >{{c1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a
                        href="javascript:;"
                        :data-categoryname="c2.categoryName"
                        :data-category2id="c2.categoryId"
                      >{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href="javascript:;"
                          :data-categoryname="c3.categoryName"
                          :data-category3id="c3.categoryId"
                        >{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//lodash 按需引入 只用他的函数节流功能
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //在搜索界面默认隐藏
      isShowFirst: false,
      currentIndex: -2
    };
  },
  methods: {
    //移入显示二级三级菜单 移除之后隐藏
    showList() {
      //显示函数  移入改成-1
      this.currentIndex = -1;
    },
    hideList() {
      //隐藏函数
      this.currentIndex = -2;
    },
    showSubCategorys: throttle(function(index) {
      //判断=-2 就不执行
      if (this.currentIndex === -2) return;
      this.currentIndex = index;
      console.log(this.currentIndex);
    }, 50),
    toSearch(event) {
      //利用事件委派
      //先利用解构赋值将名字和 id 解构出来
      const {
        categoryname,
        category1id,
        category2id,
        category3id
      } = event.target.dataset;
      console.log(event);
      //判断是不是有categoryname   //categoryname 有值(也就是用户点击的是不是 a标签 点击 a 标签才有)
      if (categoryname) {
        //提前准备 query 参数
        const query = {
          categoryName: categoryname
        };
        //判断是哪个菜单的 id
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //将整合好的 query 参数添加到 location 对象上,准备跳转
        const location = {
          name: "search", //使用 name 属性和 query 以及 params 配合
          query //
        };

        //query 参数准备好 接下来准备的是 params 参数
        //将header 组件搜索的地方定义的 keyword 解构 所有定义好的路由参数都在 this.$route 中
        const { keyword } = this.$route.params;
        // console.log(this.$route);
        //判断 keyword 是不是有值
        if (keyword) {
          //添加到 location 对象的 params 参数上
          location.params = { keyword };
        }
        //跳转
        this.$router.push(location);

        //还有一个需求就是跳转之后自动隐藏一级菜单 正好调用之前的方法隐藏
        this.hideList();
      }
    }
    /* 
      思路:
      之前的想法是,鼠标移入(包括移入商品列表)之后显示,鼠标离开大的 div(包括商品列表)之后隐藏(改变下结构,使商品列表的 div 和菜单 div 被同一个 div 包括),切换类名的方式显示隐藏三级菜单
          设置初始值(没有移入的时候),设置为-1,移入之后currentIndex变成对应的 div 的下标 ,这样做固然可以,但带来的问题就是快速移动造成的卡顿现象
      现在是利用 lodash 的函数节流模式延迟时间再进行切换类名,带来的问题就是鼠标已经离开大的 div 但是这个时候,延迟时间还没到,就还是会执行之前节流要生效的函数(也局势移入事件),所以我们现在的思路是
          初始值currentIndex设置为-2 (完全没移入的时候),当移入包含商品列表和菜单的 div 时,值变成-1,离开变成 -2
          当currentIndex这个值为-2 的时候 return 不去执行下面的更新下标操作,就可以解决

          变成-1 才能改变菜单下标index的值,-2的之后不能改变
    */

    //点击分类项的时候,跳转到搜索页面,并且传参数
    //思路:
    /* 
            1.首先想到的是路由对象 router-link,但是很多标hu签,就会产生很多的路由对象,效率太低
            2.其次想到编程式导航,给 a 标签绑定click 事件进行跳转,想到事件委派,但是一级菜单和二级菜单一级三级菜单对应的参数是不一样的,所以想到了标签属性传参数
                首先是给所有要进行跳转的标签对应的父标签绑定事件,利用事件委派 event.target 确定要点击的 a 标签
                指定标签属性,利用标签属性传递参数
                之后进行跳转
        */
  },
  computed: {
    //使用扩展方法遍历数据 mapstate
    ...mapState({
      categoryList: state => state.home.baseCategoryList
    })
  },
  created() {
    //判断用户是不是在搜索页 在的话隐藏一级菜单
    if (this.$route.path === "/") {
      this.isShowFirst = true;
    }
  },
  mounted() {
    // this.$store.dispatch()
    this.$store.dispatch("getBaseCategoryList");
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          &.item_on {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
