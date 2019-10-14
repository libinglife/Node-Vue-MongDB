<template>
    <div>
      <nav-header></nav-header>

      <!--<div style="height: 200px">-->
        <!--<span class="testSpan">你好</span>-->
      <!--</div>-->
      <bread>
        <span slot="moren">goods</span>
        <!--<span slot="second">你好2</span>-->
      </bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a class="cur" href="javascript:void(0)">All</a></dd>
                <dd v-for="(priceItem , index) in priceFilter">
                  <a href="javascript:void(0)">{{priceItem.startPrice}} - {{priceItem.endPrice}}</a>
                </dd>

              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item , index) in goods">
                    <div class="pic">
                      <a href="#"><img :src="'static/'+item.prodcutImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.prodcutPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <foot></foot>
    </div>
</template>

<script>
  import '../assets/css/base.css'
  import '../assets/css/login.css'
  import '../assets/css/checkout.css'
  import '../assets/css/product.css'

  import NavHeader from "@/components/NavHeader"
  import Foot from "@/components/Foot"
  import Bread from "@/components/Bread"
  // import axios from 'axios';
export default {
  name: "goods",
  data(){
    return {
        goods:[],
        priceFilter:[
            {
                startPrice:'0.00',
                endPrice:'100.00'
            },
            {
                startPrice:'100.00',
                endPrice:'500.00'
            },
            {
                startPrice:'500.00',
                endPrice:'1000.00'
            },
            {
                startPrice:'1000.00',
                endPrice:'5000.00'
            }
        ]
    }
  },
  components:{
    NavHeader,
    Foot,
    Bread
  },
  mounted(){
    this.getGoods();
  },
  methods:{
    getGoods(){
      this.axios.get('/api/goods',{
        userId:'123'
      }).then(res=>{
        console.log(res);
        this.goods = res.data.result;
      })
    }
  }
}
</script>

<style scoped>
  .testSpan{
    display: block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    /*border: 1px solid red;*/
    padding-left: 0;
    transition: padding-left 0.3s ease-in-out;
    margin-left: 0.3rem;
  }
  .testSpan:hover{
    padding-left: 30px;
    border-left: 3px solid red;
  }
</style>
